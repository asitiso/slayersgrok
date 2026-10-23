import json,sys,collections
tr=json.load(open(sys.argv[1]));ev=tr['traceEvents'] if isinstance(tr,dict) else tr
# renderer main thread = thread named CrRendererMain with most events
names={(e['pid'],e['tid']):e['args']['name'] for e in ev if e.get('ph')=='M' and e.get('name')=='thread_name'}
mains=[k for k,v in names.items() if v=='CrRendererMain']
cnt=collections.Counter((e.get('pid'),e.get('tid')) for e in ev if (e.get('pid'),e.get('tid')) in mains)
M=cnt.most_common(1)[0][0]
E=[e for e in ev if (e.get('pid'),e.get('tid'))==M and e.get('ph') in('X','B','E')]
# convert B/E to X
st={};X=[]
for e in sorted(E,key=lambda e:e['ts']):
  if e['ph']=='X':X.append((e['ts'],e['ts']+e.get('dur',0),e['name'],e.get('args',{})))
  elif e['ph']=='B':st.setdefault(e['name'],[]).append(e)
  elif e['ph']=='E' and st.get(e['name']):b=st[e['name']].pop();X.append((b['ts'],e['ts'],b['name'],b.get('args',{})))
X.sort(key=lambda x:(x[0],-x[1]))
CAT={}
for n in ['FunctionCall','TimerFire','FireAnimationFrame','FireIdleCallback','EventDispatch','EvaluateScript','v8.compile','v8.run','RunMicrotasks','V8.Execute','v8.callFunction','CompileScript','V8.CompileCode','v8.produceCache','ParseHTML','XHRReadyStateChange','ResourceReceivedData']:CAT[n]='script'
for n in ['UpdateLayoutTree','Layout','RecalculateStyles','ScheduleStyleRecalculation','InvalidateLayout','HitTest','IntersectionObserverController::computeIntersections','ParseAuthorStyleSheet']:CAT[n]='style/layout'
for n in ['Paint','PrePaint','Layerize','UpdateLayer','UpdateLayerTree','CompositeLayers','Commit','PaintImage','RasterTask','Rasterize','PaintSetup','ScrollLayer','Animation']:CAT[n]='paint'
def cat(n):
  if n in CAT:return CAT[n]
  if 'GC' in n or n.startswith('BlinkGC') or 'Scavenge' in n or 'Mark' in n and 'V8' in n:return 'GC'
  if 'Decode' in n or 'decode' in n:return 'decode'
  return None
# self time per event (stack)
stack=[];self=[]
for s,e,n,a in X:
  while stack and stack[-1][1]<=s:stack.pop()
  rec=[s,e,n,0]
  if stack:pass
  stack.append((s,e,n,len(self)));self.append([s,e,n,e-s])
# subtract children durations
stack=[]
for i,(s,e,n,a) in enumerate(X):
  while stack and X[stack[-1]][1]<=s:stack.pop()
  if stack:self[stack[-1]][3]-=min(e,X[stack[-1]][1])-s
  stack.append(i)
# frame starts
fa=[x[0] for x in X if x[2]=='FireAnimationFrame']
marks=sorted([(e['ts'],e['name'][5:]) for e in ev if str(e.get('name','')).startswith('step:')])
saves=[(e['ts'],e['ts']+e.get('dur',0)) for e in ev if e.get('name')=='probe-save' and e.get('ph') in('X','b')]
def step(t):
  r='pre'
  for ts,n in marks:
    if ts<=t:r=n
  return r
t_end=marks[-1][0] if marks else 1e30; t_beg=marks[0][0] if marks else 0
# bucket self time by category in windows; sweep
import bisect
SS=sorted(self,key=lambda x:x[0]);starts=[x[0] for x in SS]
long=[];tot=collections.Counter();per=collections.defaultdict(collections.Counter);cats=collections.defaultdict(collections.Counter)
n=0
for i in range(1,len(fa)):
  a,b=fa[i-1],fa[i]
  if a<t_beg or b>t_end:continue
  n+=1;d=(b-a)/1000
  if d<=16.7:continue
  c=collections.Counter()
  j=bisect.bisect_left(starts,a-200000)
  while j<len(SS) and SS[j][0]<b:
    s,e,nm,sf=SS[j];j+=1
    if e<=a or sf<=0:continue
    k=cat(nm) or ('other:'+nm)
    ov=max(0,min(e,b)-max(s,a))
    c[k]+=min(sf,ov)
  if any(s<b and e>a for s,e in saves):c['save']+=1e9
  # top attribution (collapse 'other:' into other)
  cc=collections.Counter()
  for k,v in c.items():cc['other' if k.startswith('other:') else k]+=v
  top=cc.most_common(1)[0][0] if cc else 'idle/gpu'
  if cc and cc[top]<2000:top='idle/gpu'  # <2ms main-thread work: frame lost off main thread
  bk='>33' if d>33.4 else '>16.7'
  long.append((d,step(a),top,c.most_common(4)))
  tot[(bk,top)]+=1;per[step(a)][bk]+=1;cats[step(a)][top]+=1
print('frames',n)
print('long>16.7',sum(1 for x in long),'long>33',sum(1 for x in long if x[0]>33.4))
print('by cause',sorted(tot.items()))
for k in [m[1] for m in marks]:
  if k in per:print(' step',k,dict(per[k]),dict(cats[k]))
for d,s,t,c in sorted(long,reverse=True)[:14]:print(' %.1fms %s %s %s'%(d,s,t,[(k,round(v/1000,1)) for k,v in c]))

# r313: forced style/layout inside script (FunctionCall/TimerFire/rAF) - the layout-thrash cost
fc=sorted([(x[0],x[1]) for x in X if x[2] in('FunctionCall','TimerFire','FireAnimationFrame','EventDispatch','FireIdleCallback')])
fs=[a for a,b in fc];fz=0;fn=0;allS=0
for s0,e0,nm,a in X:
  if nm not in('UpdateLayoutTree','Layout'):continue
  if not(t_beg<=s0<=t_end):continue
  allS+=e0-s0
  j=bisect.bisect_right(fs,s0)-1
  for k in range(j,max(-1,j-40),-1):
    if fc[k][0]<=s0<=fc[k][1]:fz+=e0-s0;fn+=1;break
print('forced style/layout in script: %d x, %.0f ms ; all style/layout %.0f ms'%(fn,fz/1000,allS/1000))

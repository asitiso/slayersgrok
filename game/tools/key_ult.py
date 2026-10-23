# r316: generic soft-alpha key for companion ult cut-ins: python3 tools/key_ult.py <k> [x0] [pocket] [lines] [silver] [burst]
#  white -> alpha (colour-to-alpha), figure core hole-filled, big enclosed pure-white pockets stay background,
#  saturated glow (gold/cyan) boosted, optional removal of black manga speed lines outside the figure silhouette.
import sys;from PIL import Image;import numpy as np
from scipy import ndimage as nd
k=sys.argv[1];x0=int(sys.argv[2]) if len(sys.argv)>2 else 31;PK=int(sys.argv[3]) if len(sys.argv)>3 else 1500;FL=sys.argv[4:];LN='lines' in FL;SV='silver' in FL;BC='burst' in FL
a=np.asarray(Image.open(f'/workspace/art/{k}_ult_src.jpg').convert('RGB')).astype(float)
mn=a.min(2);sat=a.max(2)-mn
al=(255-mn)/255.0;al[al<0.03]=0
core=al>=0.6
if SV:core=core|((al>=0.15)&(sat<28))   # pale low-saturation fills (silver hair) count as figure
if LN:
  # silhouette = big blobs that survive an opening (thin speed lines vanish), grown back by 10px
  nw=al>=0.12;op=nd.binary_opening(nw,structure=np.ones((3,3)),iterations=5)
  lab,n=nd.label(op);sz=nd.sum(op,lab,range(1,n+1));keep=np.isin(lab,1+np.nonzero(sz>4000)[0])
  near=nd.binary_dilation(nd.binary_fill_holes(keep),iterations=10)
  core=core&near
core=nd.binary_closing(core,iterations=2)
pad=np.vstack([core,np.ones((1,core.shape[1]),bool)]);filled=nd.binary_fill_holes(pad)[:-1];holes=filled&~core
wh=holes&(mn>=240);lab,n=nd.label(wh);sz=nd.sum(wh,lab,range(1,n+1));print('pockets',sorted(sz.astype(int))[-8:])
big=np.isin(lab,1+np.nonzero(sz>PK)[0])
fig=nd.binary_erosion(filled&~nd.binary_dilation(big,iterations=1),iterations=1)
chroma=np.clip((sat-10)/30,0,1)
ab=1-(1-al)**(3.5+5*chroma)
gl=chroma*((al>0.1)&(al<0.7)&~nd.binary_dilation(fig,iterations=3));wl=np.maximum(nd.gaussian_filter(gl,5),nd.gaussian_filter(gl,16)*1.3)
gc=np.clip(wl*2.2,0,0.95)*(mn>=200)
if LN:
  out=~nd.binary_dilation(fig,iterations=2)
  ab=np.where(out,ab*np.clip((sat-12)/25,0,1),ab)   # outside the figure keep only coloured glow, drop grey/black lines
if BC:
  # white heart of a glow burst: whitest spot with the densest coloured glow around it gets a soft opaque disc
  W=(mn>=235)&~fig;D=nd.gaussian_filter(chroma*(al>0.05),30);DT=nd.distance_transform_edt(W);S=D*np.minimum(DT,80);cy,cx=np.unravel_index(np.argmax(S),S.shape);R=DT[cy,cx]
  yy,xx=np.mgrid[:a.shape[0],:a.shape[1]];dd=np.hypot(yy-cy,xx-cx);print('burst',cx,cy,round(R,1))
  gc=np.maximum(gc,np.clip((R*1.35-dd)/(R*.5),0,1)*.97)
A=np.clip(np.maximum.reduce([ab,gc,nd.gaussian_filter(fig.astype(float),0.7)]),0,1)
C=np.clip(255-(255-a)/np.maximum(A,1e-4)[...,None],0,255)
im=Image.fromarray(np.dstack([C,A*255]).astype(np.uint8),'RGBA').crop((x0,0,x0+1249,720)).resize((720,415),Image.LANCZOS)
o=np.asarray(im).astype(float);fade=46;r=np.ones(415);r[-fade:]=np.linspace(1,0,fade)**1.3;o[...,3]*=r[:,None]
Image.fromarray(o.astype(np.uint8),'RGBA').save(f'assets/cut/{k}_ult.png',optimize=True)
g=Image.open(f'assets/cut/{k}_ult.png')
for c,nm in [((40,60,90),'d'),((255,80,200),'m')]:
  bg=Image.new('RGB',g.size,c);bg.paste(g,(0,0),g);bg.save(f'/workspace/tmpv/{k}_cut_{nm}.png')
Image.fromarray((fig*255).astype(np.uint8)).resize((640,360)).save(f'/workspace/tmpv/{k}_fig.png')

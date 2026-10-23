from PIL import Image;import numpy as np
from scipy import ndimage as nd
a=np.asarray(Image.open('/workspace/art/gourry_ult_src.jpg').convert('RGB')).astype(float)
al=(255-a.min(2))/255.0;al[al<0.03]=0
core=nd.binary_closing(al>=0.6,iterations=2)
filled=nd.binary_fill_holes(core);holes=filled&~core
wh=holes&(a.min(2)>=240);lab,n=nd.label(wh);sz=nd.sum(wh,lab,range(1,n+1));print(sorted(sz.astype(int))[-8:])
big=np.isin(lab,1+np.nonzero(sz>1500)[0])
fig=nd.binary_erosion(filled&~nd.binary_dilation(big,iterations=1),iterations=1)
warm=np.clip(((a[...,0]-a[...,2])-10)/30,0,1)
ab=1-(1-al)**(3.5+5*warm)
# glow core: pale pixels inside a warm-lit area (blade centre) get the surrounding glow's opacity
gl=warm*((al>0.1)&(al<0.7)&~nd.binary_dilation(fig,iterations=3));wl=nd.gaussian_filter(gl,5)
gc=np.clip(wl*2.2,0,0.95)*(a.min(2)>=200)
A=np.clip(np.maximum.reduce([ab,gc,nd.gaussian_filter(fig.astype(float),0.7)]),0,1)
C=np.clip(255-(255-a)/np.maximum(A,1e-4)[...,None],0,255)
im=Image.fromarray(np.dstack([C,A*255]).astype(np.uint8),'RGBA').crop((31,0,1280,720)).resize((720,415),Image.LANCZOS)
o=np.asarray(im).astype(float);fade=46;r=np.ones(415);r[-fade:]=np.linspace(1,0,fade)**1.3;o[...,3]*=r[:,None]
Image.fromarray(o.astype(np.uint8),'RGBA').save('assets/cut/gourry_ult.png',optimize=True)
g=Image.open('assets/cut/gourry_ult.png')
for c,n in [((40,60,90),'d4'),((255,80,200),'m4')]:
  bg=Image.new('RGB',g.size,c);bg.paste(g,(0,0),g);bg.save('/workspace/tmpv/g_cut_%s.png'%n)

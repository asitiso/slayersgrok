# r319: bake a light rim glow behind dark effect shapes in a keyed cut-in PNG: python3 tools/rim_glow.py <k> <xmin> [r,g,b]
import sys;from PIL import Image;import numpy as np
from scipy import ndimage as nd
k=sys.argv[1];xm=int(sys.argv[2]);col=np.array([int(v) for v in (sys.argv[3] if len(sys.argv)>3 else '205,175,255').split(',')],float)
p=f'assets/cut/{k}_ult.png';o=np.asarray(Image.open(p).convert('RGBA')).astype(float)
c=o[...,:3];a=o[...,3]/255;lum=c@[.3,.59,.11]
sp=(a>.45)&(lum<115)&(c[...,2]-c[...,1]>12);sp[:,:xm]=0
H,Wd=a.shape;fx=np.clip((np.arange(Wd)-xm)/40,0,1)[None,:];fy=np.ones(H);fy[-46:]=np.linspace(1,0,46)**1.3;fy=fy[:,None]
rim=nd.gaussian_filter(nd.binary_dilation(sp,iterations=3).astype(float),1.4)*1.0
g=np.clip(np.maximum(rim,nd.gaussian_filter(sp.astype(float),7)*.9),0,.9)*fx*fy
# glow sits behind the art (art over glow)
A=a+g*(1-a);C=(c*a[...,None]+col*(g*(1-a))[...,None])/np.maximum(A,1e-4)[...,None]
Image.fromarray(np.dstack([np.clip(C,0,255),A*255]).astype(np.uint8),'RGBA').save(p,optimize=True)
print('spike px',int(sp.sum()))

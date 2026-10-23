# r321: firm up pale figure parts (e.g. white/silver hair) inside the main figure blob, x < xmax.
# python3 tools/solidify.py <k> <xmax> [thr=.10] [x0=31] [hole=1500]   (re-fills from the source over white; keeps the bottom fade)
import sys;from PIL import Image;import numpy as np
from scipy import ndimage as nd
k=sys.argv[1];xm=int(sys.argv[2]);thr=float(sys.argv[3]) if len(sys.argv)>3 else .10;x0=int(sys.argv[4]) if len(sys.argv)>4 else 31;HOLE=int(sys.argv[5]) if len(sys.argv)>5 else 1500
p=f'assets/cut/{k}_ult.png';o=np.asarray(Image.open(p).convert('RGBA')).astype(float)
S=np.asarray(Image.open(f'/workspace/art/{k}_ult_src.jpg').convert('RGB').crop((x0,0,x0+1249,720)).resize((720,415),Image.LANCZOS)).astype(float)
c=o[...,:3];a=o[...,3]/255;H,W=a.shape
m=a>thr;m[:,xm:]=0;lb,n=nd.label(m);big=1+int(np.argmax(nd.sum(m,lb,range(1,n+1))));m=lb==big
# no hole fill (gaps between strands stay clear): remap partial alpha [lo,lo+.4] -> [0,1] inside the figure blob
lo=thr;mf=np.clip((a-lo)/.4,0,1)*nd.gaussian_filter(m.astype(float),.8)
# small enclosed holes of the figure (hair/cloth interiors) become solid; big gaps stay clear
hm=a>.45;hm[:,xm:]=0;hl,hn=nd.label(nd.binary_fill_holes(hm)&~hm);hs=nd.sum(np.ones_like(a),hl,range(1,hn+1))
ks=np.zeros(hn+1,bool);ks[1:]=hs<HOLE;mf=np.maximum(mf,nd.gaussian_filter((ks[hl]).astype(float),.8))
fy=np.ones(H);fy[-46:]=np.linspace(1,0,46);mf*=fy[:,None]
A=np.maximum(a,mf);C=(c*a[...,None]+S*(A-a)[...,None])/np.maximum(A,1e-4)[...,None]
Image.fromarray(np.dstack([np.clip(C,0,255),A*255]).astype(np.uint8),'RGBA').save(p,optimize=True);print('filled',int((A-a).sum()))

# r343: cut relic_books_src.jpg (4x2 grid on white) -> assets/rl_b1..8.png; edge flood-fill bg key (keeps white covers)
import numpy as np,sys
from PIL import Image
from scipy import ndimage as nd
src=Image.open(sys.argv[1] if len(sys.argv)>1 else '/workspace/art/relic_books_src.jpg').convert('RGB');W,H=src.size
out=sys.argv[2] if len(sys.argv)>2 else 'assets'
for r in range(2):
 for c in range(4):
  i=r*4+c+1;cell=np.asarray(src.crop((c*W//4,r*H//2,(c+1)*W//4,(r+1)*H//2))).astype(np.float32)
  mn=cell.min(2);mx=cell.max(2);near=(mn>222)&(mx-mn<22)          # candidate white
  lab,_=nd.label(near);edge=set(np.unique(np.r_[lab[0],lab[-1],lab[:,0],lab[:,-1]]))-{0}
  bg=np.isin(lab,list(edge))
  bg=nd.binary_opening(bg,iterations=1)|bg&~nd.binary_dilation(~bg,iterations=2)
  fg=~bg;fg=nd.binary_fill_holes(fg)
  # keep largest component (drop specks)
  l2,n=nd.label(fg);
  if n>1:sz=nd.sum(fg,l2,range(1,n+1));fg=l2==(1+int(np.argmax(sz)))
  a=fg.astype(np.float32)
  # soft edge: on 2px band, alpha from whiteness
  band=fg&~nd.binary_erosion(fg,iterations=2)
  wh=np.clip((255-mn)/60,0,1);a[band]=np.maximum(wh[band],0.0)*1.0
  a=nd.gaussian_filter(a,0.6)*fg+0*a;a=np.clip(a,0,1)
  # un-blend white from edge colours
  rgb=cell.copy();aa=np.maximum(a[...,None],1e-3);rgb=np.where(a[...,None]<0.999,np.clip((rgb-255*(1-aa))/aa,0,255),rgb)
  im=Image.fromarray(np.dstack([rgb,a*255]).astype(np.uint8),'RGBA');bb=im.getchannel('A').point(lambda v:255 if v>8 else 0).getbbox();im=im.crop(bb)
  s=max(im.size);pad=int(s*0.06);cv=Image.new('RGBA',(s+2*pad,s+2*pad),(0,0,0,0));cv.paste(im,((s+2*pad-im.size[0])//2,(s+2*pad-im.size[1])//2),im)
  cv.resize((256,256),Image.LANCZOS).save(f'{out}/rl_b{i}.png');print(i,bb)

import numpy as np
from PIL import Image
from scipy import ndimage as nd
im=np.asarray(Image.open('/workspace/art/tower_plaque_src.jpg').convert('RGB')).astype(np.float32)
mn=im.min(2); mx=im.max(2)
# background: near white, low saturation
bgc=(mn>228)&((mx-mn)<14)
lab,n=nd.label(bgc)
edge=set(np.unique(np.r_[lab[0],lab[-1],lab[:,0],lab[:,-1]]))-{0}
bg=np.isin(lab,list(edge))
fg=~bg
lab2,n2=nd.label(fg);sz=nd.sum(fg,lab2,range(1,n2+1));big=np.argmax(sz)+1;fg=lab2==big
fg=nd.binary_fill_holes(fg)
# soft alpha at border: distance-based 1px feather
d=nd.distance_transform_edt(fg)
a=np.clip(d/1.5,0,1)
# unpremultiply edge against white for partial pixels
rgb=im.copy()
part=(a>0)&(a<1)
for c in range(3):
    ch=rgb[...,c];ch[part]=np.clip((ch[part]-255*(1-a[part]))/np.maximum(a[part],.05),0,255)
ys,xs=np.where(a>0);y0,y1,x0,x1=ys.min(),ys.max()+1,xs.min(),xs.max()+1
print('bbox',x0,x1,y0,y1)
out=np.dstack([rgb,a*255]).astype(np.uint8)[y0:y1,x0:x1]
Image.fromarray(out,'RGBA').save('/tmp/c292/full.png')

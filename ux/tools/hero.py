from rembg import remove, new_session
from PIL import Image
import numpy as np
from scipy import ndimage
s=new_session('isnet-general-use')
img=Image.open(__import__('os').path.join(__import__('os').path.dirname(__file__),'../assets/hd/src_hero.jpg')).convert('RGB'); full=np.array(img).astype(float)
H,W=full.shape[:2]; yy,xx=np.mgrid[0:H,0:W]
B=np.where(((np.floor((xx+1)/11.96)+np.floor(yy/11.96))%2==0),213.,255.)[...,None]
al=np.clip(((B-full)/B).max(2)*1.15,0,1); al=np.clip((al-0.35)/0.65,0,1)
F=np.clip((full-(1-al[...,None])*B)/np.maximum(al[...,None],1e-3),0,255)
a=np.array(remove(img,session=s)).astype(float)
inner=ndimage.binary_erosion(ndimage.binary_fill_holes(a[...,3]>128),iterations=4)
y0,y1,x0,x1=100,360,300,500
body=a[y0:y1,x0:x1,3]>250
a[y0:y1,x0:x1,3]=np.where(body,a[y0:y1,x0:x1,3],al[y0:y1,x0:x1]*255)
a[y0:y1,x0:x1,:3]=np.where(body[...,None],a[y0:y1,x0:x1,:3],F[y0:y1,x0:x1])
m=a[y0:y1,x0:x1,3]>200; f=ndimage.binary_fill_holes(m); hole=ndimage.binary_dilation(f&~m,iterations=1)&f
sub=a[y0:y1,x0:x1]; sub[...,3][hole]=255; sub[...,:3][hole]=full[y0:y1,x0:x1][hole]*0.3+np.array([255,236,170])*0.7
inner[y0:y1,x0:x1]|=hole
# edge cleanup outside inner region, outside flame box
c=a[...,:3]; sat=c.max(2)-c.min(2); edge=(~inner)&(a[...,3]<250)
fl=np.zeros((H,W),bool); fl[y0:y1,x0:x1]=True
kill=edge&~fl&(sat<35)&(c.min(2)>150); a[...,3][kill]=0
e2=edge&~fl&~kill; a[...,3][e2]*=np.clip((a[...,3][e2]/255-0.15)/0.85,0,1)
a[:,:280,3]=0
o=Image.fromarray(a.astype('uint8')); o=o.crop(o.getbbox()); o.save(__import__('os').path.join(__import__('os').path.dirname(__file__),'../assets/hd/hero_lina.png'))
for n,col in [('f5',(30,20,50,255)),('f6',(235,235,235,255))]:
  bg=Image.new('RGBA',o.size,col); bg.alpha_composite(o); bg.save('/tmp/%s.png'%n)

import { extrudeLogo, rotatePoint, faceNormal } from './logo-geometry.mjs';

const canvas = document.querySelector('#logo-canvas');
const ctx = canvas.getContext('2d');
if (!ctx) {
  canvas.hidden = true;
} else {
  const buffer = document.createElement('canvas');
  const surface = buffer.getContext('2d', {willReadFrequently: true});
  const faces = extrudeLogo(48);
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const CYCLE_MS = 12000;
  let elapsed = 0;
  let previous = 0;
  let lastDraw = 0;
  let inView = true;
  let paused = reducedMotion.matches;
  let raf = 0;
  let exporting = false;

  function resize() {
    // Fixed internal pixel budget keeps the halftone crisp without retina overdraw.
    const rect = canvas.getBoundingClientRect();
    const width = Math.min(600, Math.round(rect.width || 520));
    canvas.width = buffer.width = width;
    canvas.height = buffer.height = Math.round(width * 0.62);
    renderAt(elapsed);
  }

  function renderAt(milliseconds) {
    const {width:w,height:h} = canvas;
    if (!w || !h) return;
    const angle = 0.42 + (milliseconds / CYCLE_MS) * Math.PI * 2;
    const scale = w / 340;
    const camera = 780;
    const light = [-0.35,-0.5,0.79];
    surface.clearRect(0,0,w,h);
    ctx.clearRect(0,0,w,h);
    const transformed = faces.map(face => {
      const vertices = face.vertices.map(v => rotatePoint(v,angle));
      const n = face.kind === 'front' ? rotatePoint([0,0,1],angle)
        : face.kind === 'back' ? rotatePoint([0,0,-1],angle)
        : faceNormal(vertices);
      const center=vertices.reduce((sum,v)=>sum.map((x,i)=>x+v[i]/vertices.length),[0,0,0]);
      return {...face,vertices,normal:n,center};
    }).filter(face => face.normal[0]*-face.center[0] + face.normal[1]*-face.center[1] + face.normal[2]*(camera-face.center[2]) > 0)
      .sort((a,b)=>a.center[2]-b.center[2]);
    for (const face of transformed) {
      const diffuse=Math.max(0,face.normal.reduce((sum,v,i)=>sum+v*light[i],0));
      const shade=Math.round((0.26+0.74*diffuse)*255);
      surface.beginPath();
      face.vertices.forEach(([x,y,z],i)=>{
        const perspective=camera/(camera-z);
        const px=w/2+x*scale*perspective, py=h/2+y*scale*perspective;
        if(i===0) surface.moveTo(px,py); else surface.lineTo(px,py);
      });
      surface.closePath();
      surface.fillStyle=`rgb(${shade},${shade},${shade})`;
      surface.fill();
    }
    const pixels=surface.getImageData(0,0,w,h).data;
    // A dense green underprint holds the real silhouette, then luminance drives dots.
    ctx.globalAlpha=0.15;
    ctx.drawImage(buffer,0,0);
    ctx.globalCompositeOperation='source-in';
    ctx.fillStyle='#a3ff12';ctx.fillRect(0,0,w,h);
    ctx.globalCompositeOperation='source-over';ctx.globalAlpha=1;
    const spacing = w < 380 ? 3 : 3.4;
    ctx.fillStyle='#a3ff12';ctx.beginPath();
    let dots=0;
    for(let y=spacing/2;y<h;y+=spacing) {
      for(let x=spacing/2;x<w;x+=spacing) {
        const offset=(Math.floor(y)*w+Math.floor(x))*4;
        if(pixels[offset+3]<150) continue;
        const luminance=pixels[offset]/255;
        const radius=spacing*(0.16+0.34*luminance);
        ctx.moveTo(x+radius,y);ctx.arc(x,y,radius,0,Math.PI*2);dots++;
      }
    }
    ctx.fill();
    canvas.dataset.rendered='true';
    canvas.dataset.dots=String(dots);
  }

  function loop(timestamp) {
    raf=0;
    if(paused || !inView || document.hidden || exporting) {previous=0;return;}
    if(previous) elapsed+=Math.min(timestamp-previous,100);
    previous=timestamp;
    if(timestamp-lastDraw>=1000/30) {renderAt(elapsed);lastDraw=timestamp;}
    raf=requestAnimationFrame(loop);
  }
  function wake() {if(!raf&&!paused&&inView&&!document.hidden&&!exporting)raf=requestAnimationFrame(loop);}
  function setPaused(value) {
    paused=value;previous=0;
    if(paused&&raf) {cancelAnimationFrame(raf);raf=0;} else wake();
  }
  reducedMotion.addEventListener('change',()=>setPaused(reducedMotion.matches));
  document.addEventListener('visibilitychange',()=>{previous=0;wake();});
  new IntersectionObserver(([entry])=>{inView=entry.isIntersecting;previous=0;wake();},{threshold:0.05}).observe(canvas);
  new ResizeObserver(resize).observe(canvas);

  // Deterministic capture interface used by regression tests and local video export.
  window.mcodeLogo={
    cycleMs:CYCLE_MS,
    renderAt,
    setPaused,
    get paused(){return paused;},
    get time(){return elapsed;},
    setExportMode(value){exporting=value;previous=0;if(value&&raf){cancelAnimationFrame(raf);raf=0;}else wake();},
  };
  resize();wake();
}

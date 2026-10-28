import { extrudeLogo, rotatePoint, faceNormal } from './logo-geometry.mjs';

const canvas = document.querySelector('#logo-canvas');
const ctx = canvas.getContext('2d');
if (!ctx) {
  canvas.hidden = true;
} else {
  const buffer = document.createElement('canvas');
  const surface = buffer.getContext('2d', {willReadFrequently: true});
  const faces = extrudeLogo(48);
  const CYCLE_MS = 12000;
  let elapsed = 0;
  let previous = 0;
  let lastDraw = 0;
  let raf = 0;
  let exporting = false;

  function resize() {
    // Fixed pixel budget keeps the ASCII grid crisp without retina overdraw.
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
    const cellWidth = Math.max(6, Math.round(w / 70));
    const cellHeight = cellWidth * 1.5;
    const columns = Math.floor(w / cellWidth);
    const rows = Math.floor(h / cellHeight);
    const phase = ((milliseconds % CYCLE_MS) + CYCLE_MS) % CYCLE_MS;
    const tick = Math.floor(phase / 120);
    const alphabet = '01MCD<>/{}[]=+:#';
    const density = '.:+*#%@';
    ctx.font = `${Math.round(cellHeight * 0.92)}px Consolas, monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    let glyphs = 0;
    for (let column = 0; column < columns; column++) {
      const seed = (column * 7919 + 104729) % 65521;
      const head = (phase / CYCLE_MS * (rows + 18) * (1 + column % 3) + seed % (rows + 18)) % (rows + 18);
      for (let row = 0; row < rows; row++) {
        const x = (column + 0.5) * cellWidth;
        const y = (row + 0.5) * cellHeight;
        const offset = (Math.floor(y) * w + Math.floor(x)) * 4;
        const onLogo = pixels[offset + 3] > 150;
        const trail = (head - row + rows + 18) % (rows + 18);
        const rain = trail < 14 ? 1 - trail / 14 : 0;
        if (!onLogo && !rain) continue;
        const noise = (seed + row * 31 + tick * (1 + column % 4)) % alphabet.length;
        const luminance = pixels[offset] / 255;
        const character = onLogo && (row + column) % 3 === 0
          ? density[Math.round(luminance * (density.length - 1))]
          : alphabet[noise];
        ctx.globalAlpha = onLogo ? 0.55 + luminance * 0.35 + rain * 0.1 : rain * 0.25;
        ctx.fillStyle = onLogo && rain > 0.9 ? '#e1ffc4' : '#a3ff12';
        ctx.fillText(character, x, y);
        glyphs++;
      }
    }
    ctx.globalAlpha = 1;
    canvas.dataset.rendered='true';
    canvas.dataset.glyphs=String(glyphs);
  }

  function loop(timestamp) {
    raf=0;
    if(exporting) {previous=0;return;}
    if(previous) elapsed+=Math.min(timestamp-previous,100);
    previous=timestamp;
    if(timestamp-lastDraw>=1000/30) {renderAt(elapsed);lastDraw=timestamp;}
    raf=requestAnimationFrame(loop);
  }
  function wake() {if(!raf&&!exporting)raf=requestAnimationFrame(loop);}
  new ResizeObserver(resize).observe(canvas);

  // Deterministic capture interface used by regression tests and local video export.
  window.mcodeLogo={
    cycleMs:CYCLE_MS,
    renderAt,
    get time(){return elapsed;},
    setExportMode(value){exporting=value;previous=0;if(value&&raf){cancelAnimationFrame(raf);raf=0;}else wake();},
  };
  resize();wake();
}

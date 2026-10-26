// Coordinates copied exactly from the approved MCode symbol's two SVG subpaths.
export const LOGO_CONTOURS = [
  [[24,208],[24,48],[56,48],[104,96],[152,48],[232,48],[232,88],[168,88],[124,132],[84,132],[64,112],[64,208]],
  [[84,168],[232,168],[232,208],[84,208]],
];

export function extrudeLogo(depth = 48) {
  const faces = [];
  for (const contour of LOGO_CONTOURS) {
    const front = contour.map(([x,y]) => [x-128,y-128,depth/2]);
    const back = contour.map(([x,y]) => [x-128,y-128,-depth/2]);
    faces.push({kind:'front',vertices:front});
    faces.push({kind:'back',vertices:[...back].reverse()});
    for (let i=0;i<contour.length;i++) {
      const j=(i+1)%contour.length;
      faces.push({kind:'side',vertices:[front[i],back[i],back[j],front[j]]});
    }
  }
  return faces;
}

export function rotatePoint([x,y,z], angle, tilt = -0.18) {
  const cy=Math.cos(angle), sy=Math.sin(angle);
  const cx=Math.cos(tilt), sx=Math.sin(tilt);
  const xx=x*cy+z*sy;
  const zz=-x*sy+z*cy;
  return [xx, y*cx-zz*sx, y*sx+zz*cx];
}

export function faceNormal(vertices) {
  const a=vertices[0],b=vertices[1],c=vertices[2];
  const u=b.map((n,i)=>n-a[i]),v=c.map((n,i)=>n-a[i]);
  const n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];
  const length=Math.hypot(...n)||1;
  return n.map(value=>value/length);
}

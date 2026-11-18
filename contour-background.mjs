// Fundo em curvas de nível: linhas topográficas finas em tom de pérola sobre um preto
// mesclado (o mesmo #080b09 dos botões). O cursor levanta um morro: as linhas em volta
// dele se juntam e acendem em pérola com um reflexo iridescente. Sem o ponteiro, o morro
// passeia sozinho devagar, então a animação nunca para (pedido explícito, inclusive com
// movimento reduzido). Sem WebGL fica só a cor de fundo do CSS.
const canvas = document.querySelector('#contour-background');
const gl = canvas && (canvas.getContext('webgl2', { antialias: false, alpha: false, powerPreference: 'low-power' })
  || canvas.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' }));

if (gl) {
  const v2 = typeof WebGL2RenderingContext !== 'undefined' && gl instanceof WebGL2RenderingContext;
  if (!v2) gl.getExtension('OES_standard_derivatives');
  const head = v2
    ? '#version 300 es\nprecision highp float;\nout vec4 outColor;\n#define FRAG outColor\n'
    : '#extension GL_OES_standard_derivatives : enable\nprecision highp float;\n#define FRAG gl_FragColor\n';
  const vertex = v2
    ? '#version 300 es\nin vec2 p;void main(){gl_Position=vec4(p,0.,1.);}'
    : 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
  const fragment = head + `
uniform vec2 uRes;uniform float uTime;uniform vec2 uHill;uniform float uLift;uniform float uScale;
float h(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float n(vec2 p){vec2 i=floor(p),f=fract(p);vec2 u=f*f*(3.-2.*f);
  return mix(mix(h(i),h(i+vec2(1,0)),u.x),mix(h(i+vec2(0,1)),h(i+vec2(1,1)),u.x),u.y);}
void main(){
  vec2 px=gl_FragCoord.xy; float s=min(uRes.x,uRes.y)*uScale; vec2 q=px/s;
  float t=uTime;
  float field=n(q*1.25+vec2(t*.012,-t*.008))*.68+n(q*2.9-vec2(t*.009,t*.006))*.32;
  vec2 d=(px-uHill)/s; float r2=dot(d,d);
  float hill=exp(-r2*7.)*.42*uLift; field+=hill;
  float v=field*13.; float w=fwidth(v);
  float k=min(fract(v),1.-fract(v));
  float line=1.-smoothstep(.0,w*1.35,k);
  float uv=px.y/uRes.y;
  vec3 ink=vec3(.022,.028,.025);
  vec3 graphite=vec3(.055,.062,.06);
  float blend=smoothstep(.1,.95,n(q*.55+t*.006))*.55+.25*(1.-uv);
  vec3 base=mix(ink,graphite,blend*.55);
  float vig=smoothstep(1.25,.25,length((px/uRes-.5)*vec2(1.25,1.)));
  base*=.72+.28*vig;
  float glow=exp(-r2*5.)*uLift;
  vec3 film=.5+.5*cos(6.2831*(field*.9+vec3(0.,.33,.67)));
  vec3 pearl=mix(vec3(.86,.89,.9),film,.22);
  vec3 lineCol=mix(vec3(.6,.64,.64)*.11,pearl*.5,glow);
  vec3 col=base+lineCol*line*(.55+.45*vig)+pearl*glow*.035;
  col+=(h(px+fract(t)*91.)-.5)*.012;
  FRAG=vec4(col,1.);
}`;

  const compile = (type, source) => {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) console.warn('contour-background:', gl.getShaderInfoLog(shader));
    return shader;
  };
  const program = gl.createProgram();
  gl.attachShader(program, compile(gl.VERTEX_SHADER, vertex));
  gl.attachShader(program, compile(gl.FRAGMENT_SHADER, fragment));
  gl.linkProgram(program);
  gl.useProgram(program);
  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const position = gl.getAttribLocation(program, 'p');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const u = name => gl.getUniformLocation(program, name);
  const uRes = u('uRes'), uTime = u('uTime'), uHill = u('uHill'), uLift = u('uLift'), uScale = u('uScale');

  let dpr = 1, width = 0, height = 0;
  const resize = () => {
    dpr = Math.min(1.5, window.devicePixelRatio || 1);
    width = Math.round(window.innerWidth * dpr);
    height = Math.round(window.innerHeight * dpr);
    canvas.width = width;
    canvas.height = height;
    gl.viewport(0, 0, width, height);
  };
  resize();
  window.addEventListener('resize', resize);

  // Ponteiro em px CSS; o morro segue com atraso suave. Sem ponteiro, passeia sozinho.
  const pointer = { x: 0, y: 0, active: false, last: -1e9 };
  const hill = { x: window.innerWidth * 0.7, y: window.innerHeight * 0.45 };
  let lift = 0;
  document.addEventListener('pointermove', (event) => {
    pointer.x = event.clientX; pointer.y = event.clientY; pointer.active = true; pointer.last = performance.now();
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', () => { pointer.active = false; });

  let frame = 0;
  const start = performance.now();
  const draw = (now) => {
    frame = requestAnimationFrame(draw);
    const t = (now - start) / 1000;
    const idle = !pointer.active || now - pointer.last > 4000;
    const tx = idle ? window.innerWidth * (0.5 + 0.32 * Math.sin(t * 0.11)) : pointer.x;
    const ty = idle ? window.innerHeight * (0.45 + 0.22 * Math.sin(t * 0.17 + 1.3)) : pointer.y;
    const ease = idle ? 0.02 : 0.12;
    hill.x += (tx - hill.x) * ease;
    hill.y += (ty - hill.y) * ease;
    lift += ((idle ? 0.55 : 1) - lift) * 0.04;
    gl.uniform2f(uRes, width, height);
    gl.uniform1f(uTime, t);
    gl.uniform2f(uHill, hill.x * dpr, height - hill.y * dpr);
    gl.uniform1f(uLift, lift);
    gl.uniform1f(uScale, window.innerWidth < 768 ? 1.4 : 1);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };
  frame = requestAnimationFrame(draw);
  // Aba escondida: o navegador já segura o rAF; ao voltar, retoma do ponto certo.
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && !frame) frame = requestAnimationFrame(draw);
  });
}

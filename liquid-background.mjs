// Fundo líquido perolado: shader WebGL2 com fluxo de ruído deformado,
// iridescência em película fina e um rastro do ponteiro que mexe o líquido.
// Por pedido explícito do usuário, o fluxo é contínuo mesmo com movimento reduzido.
const canvas = document.querySelector('#liquid-background');
const gl = canvas?.getContext('webgl2', { alpha: false, antialias: false, depth: false, powerPreference: 'low-power' });

const TRAIL = 16;

const vertexSource = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;

const fragmentSource = `#version 300 es
precision highp float;
#define TRAIL ${TRAIL}
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform float uIntensity;
uniform float uPulse;
uniform vec2 uClick;
uniform vec4 uTrail[TRAIL]; // xy = posição (px GL), z = força, w = livre
uniform vec2 uTrailVel[TRAIL];
out vec4 outColor;

float hash(vec2 p) { p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p) {
  vec2 i = floor(p), f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i), hash(i + vec2(1, 0)), u.x), mix(hash(i + vec2(0, 1)), hash(i + vec2(1, 1)), u.x), u.y);
}
float fbm(vec2 p) {
  float v = 0.0, a = 0.5;
  mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
  for (int i = 0; i < 4; i++) { v += a * noise(p); p = r * p * 2.03 + 11.7; a *= 0.5; }
  return v;
}

void main() {
  float scale = min(uRes.x, uRes.y);
  vec2 uv = gl_FragCoord.xy / scale;

  // Rastro do ponteiro: cada ponto gira e arrasta o líquido ao redor
  float stir = 0.0;
  for (int i = 0; i < TRAIL; i++) {
    float s = uTrail[i].z;
    if (s <= 0.001) continue;
    vec2 d = uv - uTrail[i].xy / scale;
    float k = s * exp(-dot(d, d) * 26.0);
    uv += vec2(-d.y, d.x) * k * 1.6;   // redemoinho
    uv -= uTrailVel[i] * k * 0.10;     // arrasto na direção do movimento
    stir += k;
  }

  // Lente sob o ponteiro
  vec2 d = uv - uMouse / scale;
  float lens = exp(-dot(d, d) * 14.0) * uIntensity;
  uv -= d * lens * 0.35;

  // Onda do clique
  vec2 c = uv - uClick / scale;
  float cd = length(c);
  float wave = sin(cd * 34.0 - (1.0 - uPulse) * 18.0) * uPulse * exp(-cd * 3.0);
  uv += c / max(cd, 1e-3) * wave * 0.02;

  // Fluxo de domínio deformado, em movimento contínuo
  float t = uTime * 0.11;
  vec2 p = uv * 0.7;
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t * 0.8));
  vec2 r = vec2(fbm(p + 3.2 * q + vec2(1.7, 9.2) + t * 1.3), fbm(p + 3.2 * q + vec2(8.3, 2.8) - t * 0.9));
  float h = fbm(p + 3.0 * r + t * 0.3);

  // Normal aproximada pela derivada da altura
  vec3 n = normalize(vec3(-dFdx(h) * 110.0, -dFdy(h) * 110.0, 1.0));
  vec3 light = normalize(vec3(-0.4, 0.6, 0.7));
  float diffuse = max(dot(n, light), 0.0);
  float spec = pow(max(reflect(-light, n).z, 0.0), 28.0);
  float fresnel = pow(1.0 - n.z, 1.5);

  // Iridescência: fase da película fina varia com altura, fluxo, ângulo e mexida
  float phase = h * 1.6 + r.x * 0.9 + fresnel * 2.2 + lens * 0.5 + stir * 0.8 + uTime * 0.02;
  vec3 pearl = 0.55 + 0.45 * cos(6.28318 * (phase + vec3(0.0, 0.28, 0.58)));
  pearl = mix(pearl, vec3(0.78, 1.0, 0.62), 0.25); // puxa levemente para o verde da marca

  vec3 base = vec3(0.043, 0.063, 0.051); // #0B100D
  float sheen = smoothstep(0.35, 0.85, h) * 0.6 + fresnel * 0.9;
  vec3 col = base + pearl * (0.04 + sheen * 0.085 + diffuse * 0.02);
  col += pearl * spec * 0.18;
  col += pearl * (lens * 0.06 + min(stir, 1.0) * 0.07) * (1.0 + spec * 3.0);
  col += vec3(0.64, 1.0, 0.07) * abs(wave) * 0.06;

  // Vinheta para manter o conteúdo legível nas bordas
  vec2 sv = gl_FragCoord.xy / uRes - 0.5;
  col = mix(base, col, 1.0 - dot(sv, sv) * 0.9);

  // Granulação sutil contra banding
  col += (hash(gl_FragCoord.xy + fract(uTime)) - 0.5) / 255.0;
  outColor = vec4(col, 1.0);
}`;

function compile(type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.warn('liquid-background:', gl.getShaderInfoLog(shader));
    return null;
  }
  return shader;
}

function createProgram() {
  const vs = compile(gl.VERTEX_SHADER, vertexSource);
  const fs = compile(gl.FRAGMENT_SHADER, fragmentSource);
  if (!vs || !fs) return null;
  const program = gl.createProgram();
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  return gl.getProgramParameter(program, gl.LINK_STATUS) ? program : null;
}

const program = gl && createProgram();

if (program) {
  const finePointer = matchMedia('(hover: hover) and (pointer: fine)');
  const RENDER_SCALE = 0.5; // líquido é suave: meia resolução economiza GPU sem perda visível
  const TRAIL_LIFE = 1.4;   // segundos que um ponto do rastro leva para sumir
  const TRAIL_STEP = 18;    // px entre pontos do rastro

  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(program, 'aPos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
  const u = name => gl.getUniformLocation(program, name);
  const uniforms = {
    res: u('uRes'), time: u('uTime'), mouse: u('uMouse'), intensity: u('uIntensity'),
    pulse: u('uPulse'), click: u('uClick'), trail: u('uTrail'), trailVel: u('uTrailVel'),
  };

  const trail = [];            // { x, y, vx, vy, age, power }
  const trailData = new Float32Array(TRAIL * 4);
  const trailVelData = new Float32Array(TRAIL * 2);

  let width = 0, height = 0, ratio = RENDER_SCALE, frame = 0, previous = 0, clock = 0;
  let x = -1e4, y = -1e4, targetX = x, targetY = y, lastX = null, lastY = null;
  let intensity = 0, targetIntensity = 0, pulse = 0, clickX = -1e4, clickY = -1e4;
  let lastInput = -1e4;

  function addTrailPoint(px, py) {
    if (lastX === null) { lastX = px; lastY = py; return; }
    const dx = px - lastX, dy = py - lastY;
    const distance = Math.hypot(dx, dy);
    if (distance < TRAIL_STEP) return;
    const unit = Math.min(width, height) || 1;
    const power = Math.min(distance / 60, 1) * 0.55;
    trail.push({ x: px, y: py, vx: dx / unit * 8, vy: dy / unit * 8, age: 0, power });
    if (trail.length > TRAIL) trail.shift();
    lastX = px; lastY = py;
  }

  function paint() {
    gl.uniform2f(uniforms.res, canvas.width, canvas.height);
    gl.uniform1f(uniforms.time, clock);
    // WebGL usa origem no canto inferior esquerdo
    gl.uniform2f(uniforms.mouse, x * ratio, (height - y) * ratio);
    gl.uniform1f(uniforms.intensity, intensity);
    gl.uniform1f(uniforms.pulse, pulse);
    gl.uniform2f(uniforms.click, clickX * ratio, (height - clickY) * ratio);
    trailData.fill(0);
    trailVelData.fill(0);
    trail.forEach((point, i) => {
      const fade = Math.max(0, 1 - point.age / TRAIL_LIFE);
      trailData[i * 4] = point.x * ratio;
      trailData[i * 4 + 1] = (height - point.y) * ratio;
      trailData[i * 4 + 2] = point.power * fade * fade;
      trailVelData[i * 2] = point.vx;
      trailVelData[i * 2 + 1] = -point.vy;
    });
    gl.uniform4fv(uniforms.trail, trailData);
    gl.uniform2fv(uniforms.trailVel, trailVelData);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  function draw(time) {
    frame = 0;
    if (document.hidden) return;
    const delta = previous ? Math.min(time - previous, 64) : 16;
    previous = time;
    clock += delta / 1000;
    if (time - lastInput > 160) targetIntensity = 0;
    const follow = 1 - Math.exp(-delta / 80);
    x += (targetX - x) * follow;
    y += (targetY - y) * follow;
    intensity += (targetIntensity - intensity) * follow;
    pulse = Math.max(0, pulse - delta / 1300);
    for (const point of trail) point.age += delta / 1000;
    while (trail.length && trail[0].age > TRAIL_LIFE) trail.shift();
    paint();
    frame = requestAnimationFrame(draw);
  }

  function wake() {
    if (!frame && !document.hidden) frame = requestAnimationFrame(draw);
  }

  function release() {
    targetIntensity = 0;
    lastX = lastY = null;
  }

  function onVisibility() {
    cancelAnimationFrame(frame);
    frame = 0;
    previous = 0;
    wake();
  }

  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    ratio = Math.min(window.devicePixelRatio || 1, 2) * RENDER_SCALE;
    canvas.width = Math.max(1, Math.round(width * ratio));
    canvas.height = Math.max(1, Math.round(height * ratio));
    gl.viewport(0, 0, canvas.width, canvas.height);
    paint();
  }

  document.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || !finePointer.matches) return;
    targetX = event.clientX;
    targetY = event.clientY;
    if (intensity < 0.01) { x = targetX; y = targetY; }
    targetIntensity = 1;
    lastInput = performance.now();
    addTrailPoint(targetX, targetY);
    wake();
  }, { passive: true });
  document.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'mouse' || !finePointer.matches) return;
    clickX = event.clientX;
    clickY = event.clientY;
    pulse = 1;
    lastInput = performance.now();
    wake();
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', release);
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('blur', release);
  window.addEventListener('resize', resize);
  finePointer.addEventListener('change', release);
  canvas.addEventListener('webglcontextlost', event => { event.preventDefault(); cancelAnimationFrame(frame); frame = 0; });
  resize();
  wake();
}

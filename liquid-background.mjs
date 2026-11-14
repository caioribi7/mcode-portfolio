// Fundo líquido perolado: shader WebGL2 com fluxo de ruído deformado,
// iridescência em película fina e lente/ondulação que seguem o ponteiro.
const canvas = document.querySelector('#liquid-background');
const gl = canvas?.getContext('webgl2', { alpha: false, antialias: false, depth: false, powerPreference: 'low-power' });

const vertexSource = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;

const fragmentSource = `#version 300 es
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uVel;
uniform float uIntensity;
uniform float uPulse;
uniform vec2 uClick;
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
  vec2 m = uMouse / scale;

  // Lente e arrasto do ponteiro
  vec2 d = uv - m;
  float dist = length(d);
  float lens = exp(-dist * dist * 9.0) * uIntensity;
  uv -= d * lens * 0.45;
  uv -= uVel * lens * 0.6;

  // Onda do clique
  vec2 c = uv - uClick / scale;
  float cd = length(c);
  float wave = sin(cd * 38.0 - (1.0 - uPulse) * 16.0) * uPulse * exp(-cd * 3.5);
  uv += c / max(cd, 1e-3) * wave * 0.012;

  // Fluxo de domínio deformado
  float t = uTime * 0.035;
  vec2 p = uv * 0.7;
  vec2 q = vec2(fbm(p + vec2(0.0, t)), fbm(p + vec2(5.2, 1.3) - t));
  vec2 r = vec2(fbm(p + 3.2 * q + vec2(1.7, 9.2) + t * 1.4), fbm(p + 3.2 * q + vec2(8.3, 2.8) - t * 0.9));
  float h = fbm(p + 3.0 * r);

  // Normal aproximada pela derivada da altura
  vec3 n = normalize(vec3(-dFdx(h) * 110.0, -dFdy(h) * 110.0, 1.0));
  vec3 light = normalize(vec3(-0.4, 0.6, 0.7));
  vec3 view = vec3(0.0, 0.0, 1.0);
  float diffuse = max(dot(n, light), 0.0);
  float spec = pow(max(dot(reflect(-light, n), view), 0.0), 28.0);
  float fresnel = pow(1.0 - n.z, 1.5);

  // Iridescência: fase da película fina varia com altura, fluxo e ângulo
  float phase = h * 1.6 + r.x * 0.9 + fresnel * 2.2 + lens * 0.6;
  vec3 pearl = 0.55 + 0.45 * cos(6.28318 * (phase + vec3(0.0, 0.28, 0.58)));
  pearl = mix(pearl, vec3(0.78, 1.0, 0.62), 0.25); // puxa levemente para o verde da marca

  vec3 base = vec3(0.043, 0.063, 0.051); // #0B100D
  float sheen = smoothstep(0.35, 0.85, h) * 0.55 + fresnel * 0.9;
  vec3 col = base + pearl * (0.035 + sheen * 0.075 + diffuse * 0.02);
  col += pearl * spec * 0.16;
  col += pearl * lens * (0.05 + spec * 0.25);
  col += vec3(0.64, 1.0, 0.07) * abs(wave) * 0.05;

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
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const RENDER_SCALE = 0.5; // líquido é suave: meia resolução economiza GPU sem perda visível

  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(program, 'aPos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);
  const u = name => gl.getUniformLocation(program, name);
  const uniforms = {
    res: u('uRes'), time: u('uTime'), mouse: u('uMouse'), vel: u('uVel'),
    intensity: u('uIntensity'), pulse: u('uPulse'), click: u('uClick'),
  };

  let width = 0, height = 0, ratio = RENDER_SCALE, frame = 0, previous = 0, clock = 0;
  let x = -1e4, y = -1e4, targetX = x, targetY = y, vx = 0, vy = 0;
  let intensity = 0, targetIntensity = 0, pulse = 0, clickX = -1e4, clickY = -1e4;
  let lastInput = 0;

  function paint() {
    gl.uniform2f(uniforms.res, canvas.width, canvas.height);
    gl.uniform1f(uniforms.time, clock);
    // WebGL usa origem no canto inferior esquerdo
    gl.uniform2f(uniforms.mouse, x * ratio, (height - y) * ratio);
    gl.uniform2f(uniforms.vel, vx, -vy);
    gl.uniform1f(uniforms.intensity, intensity);
    gl.uniform1f(uniforms.pulse, pulse);
    gl.uniform2f(uniforms.click, clickX * ratio, (height - clickY) * ratio);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }

  function draw(time) {
    frame = 0;
    if (document.hidden) return;
    const delta = previous ? Math.min(time - previous, 64) : 16;
    previous = time;
    clock += delta / 1000;
    if (time - lastInput > 140) targetIntensity = 0;
    const follow = 1 - Math.exp(-delta / 110);
    const nx = x + (targetX - x) * follow;
    const ny = y + (targetY - y) * follow;
    const unit = Math.min(width, height) || 1;
    // velocidade normalizada e suavizada, usada para "arrastar" o líquido
    vx += (((nx - x) / unit) * 6 - vx) * 0.2;
    vy += (((ny - y) / unit) * 6 - vy) * 0.2;
    x = nx; y = ny;
    intensity += (targetIntensity - intensity) * follow;
    pulse = Math.max(0, pulse - delta / 1100);
    paint();
    if (!reducedMotion.matches) frame = requestAnimationFrame(draw);
    else previous = 0;
  }

  function wake() {
    if (!frame && !document.hidden) frame = requestAnimationFrame(draw);
  }

  function release() {
    targetIntensity = 0;
    vx = vy = 0;
    wake();
  }

  function restart() {
    cancelAnimationFrame(frame);
    frame = 0;
    previous = 0;
    if (reducedMotion.matches) { intensity = targetIntensity = pulse = 0; paint(); }
    else wake();
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
    if (!intensity) { x = targetX; y = targetY; }
    targetIntensity = 1;
    lastInput = performance.now();
    if (reducedMotion.matches) {
      x = targetX; y = targetY; intensity = 1;
      paint();
      return;
    }
    wake();
  }, { passive: true });
  document.addEventListener('pointerdown', event => {
    if (event.pointerType !== 'mouse' || !finePointer.matches || reducedMotion.matches) return;
    clickX = event.clientX;
    clickY = event.clientY;
    pulse = 1;
    lastInput = performance.now();
    wake();
  }, { passive: true });
  document.documentElement.addEventListener('pointerleave', release);
  document.addEventListener('visibilitychange', restart);
  window.addEventListener('blur', release);
  window.addEventListener('resize', resize);
  finePointer.addEventListener('change', release);
  reducedMotion.addEventListener('change', restart);
  canvas.addEventListener('webglcontextlost', event => { event.preventDefault(); cancelAnimationFrame(frame); frame = 0; });
  resize();
  wake();
}

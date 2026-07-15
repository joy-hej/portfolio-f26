const VERT_SRC = `
attribute vec2 a_pos;
varying vec2 v_uv;
void main() {
  v_uv = a_pos * 0.5 + 0.5;
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

const FRAG_SRC = `
precision mediump float;
varying vec2 v_uv;

uniform vec2 u_drift;
uniform vec2 u_brightOffset;
uniform float u_warpAmpX;
uniform float u_warpAmpY;
uniform float u_bandScaleX;
uniform float u_bandScaleY;
uniform float u_bandMix;
uniform float u_topLeftX;
uniform float u_topLeftY;
uniform float u_topLeftRadius;
uniform float u_topLeftWeight;
uniform float u_lowerStart;
uniform float u_lowerEnd;
uniform float u_lowerWeight;
uniform float u_brightX;
uniform float u_brightY;
uniform float u_brightRadius;
uniform float u_brightWeight;
uniform float u_bandWeight;
uniform float u_grainScale;
uniform float u_grainAmp;
uniform float u_seedX;
uniform float u_seedY;
uniform float u_colorLift;
uniform vec3 u_c0;
uniform vec3 u_c1;
uniform vec3 u_c2;
uniform vec3 u_c3;
uniform vec3 u_c4;

float hash2(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float vsmooth(float t) {
  return t * t * (3.0 - 2.0 * t);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = vec2(vsmooth(f.x), vsmooth(f.y));
  float v00 = hash2(i);
  float v10 = hash2(i + vec2(1.0, 0.0));
  float v01 = hash2(i + vec2(0.0, 1.0));
  float v11 = hash2(i + vec2(1.0, 1.0));
  return mix(mix(v00, v10, f.x), mix(v01, v11, f.x), f.y);
}

float fbm2(vec2 p) {
  return 0.5 * valueNoise(p) + 0.25 * valueNoise(p * 2.0);
}

float fbm3(vec2 p) {
  return 0.5 * valueNoise(p) + 0.25 * valueNoise(p * 2.0) + 0.125 * valueNoise(p * 4.0);
}

float fbm4(vec2 p) {
  return 0.5 * valueNoise(p) + 0.25 * valueNoise(p * 2.0) + 0.125 * valueNoise(p * 4.0) + 0.0625 * valueNoise(p * 8.0);
}

float fbm5(vec2 p) {
  return 0.5 * valueNoise(p)
    + 0.25 * valueNoise(p * 2.0)
    + 0.125 * valueNoise(p * 4.0)
    + 0.0625 * valueNoise(p * 8.0)
    + 0.03125 * valueNoise(p * 16.0);
}

float smoothstepRange(float e0, float e1, float x) {
  float t = clamp((x - e0) / (e1 - e0), 0.0, 1.0);
  return t * t * (3.0 - 2.0 * t);
}

vec3 lerp3(vec3 a, vec3 b, float t) {
  return mix(a, b, t);
}

float sampleWash(vec2 uv) {
  float ox = u_seedX + u_drift.x;
  float oy = u_seedY + u_drift.y;
  float bx = u_brightX + u_brightOffset.x;
  float by = u_brightY + u_brightOffset.y;

  float w1 = fbm4(vec2(uv.x * 1.2 + ox, uv.y * 1.1 + oy));
  float w2 = fbm4(vec2(uv.x * 1.1 + 2.7 + ox, uv.y * 1.3 + 1.4 + oy));
  float x = uv.x + (w1 - 0.5) * u_warpAmpX;
  float y = uv.y + (w2 - 0.5) * u_warpAmpY;

  float band =
    fbm5(vec2(x * u_bandScaleX + ox, y * u_bandScaleY + oy)) * u_bandMix +
    fbm4(vec2(x * 0.7 + 3.1 + ox, y * 0.9 + oy)) * (1.0 - u_bandMix);

  float topLeft = smoothstepRange(
    0.55,
    0.15,
    length(uv - vec2(u_topLeftX, u_topLeftY)) * u_topLeftRadius
  );
  float lower =
    smoothstepRange(u_lowerStart, u_lowerEnd, uv.y) *
    (0.55 + 0.45 * fbm3(vec2(uv.x * 2.0 + ox, uv.y * 1.5 + oy)));
  float brightCenter =
    1.0 -
    smoothstepRange(
      0.15,
      0.65,
      length(uv - vec2(bx, by)) * u_brightRadius
    );

  float pigment =
    band * u_bandWeight + topLeft * u_topLeftWeight + lower * u_lowerWeight;
  pigment -= brightCenter * u_brightWeight;

  float grain =
    (fbm2(vec2(uv.x * u_grainScale + ox, uv.y * u_grainScale + oy)) - 0.5) *
    u_grainAmp;

  return clamp(pigment + grain, 0.0, 1.0);
}

vec3 colorAt(float pigment) {
  if (pigment < 0.28) {
    return lerp3(u_c0, u_c1, smoothstepRange(0.0, 0.28, pigment));
  }
  if (pigment < 0.5) {
    return lerp3(u_c1, u_c2, smoothstepRange(0.28, 0.5, pigment));
  }
  if (pigment < 0.72) {
    return lerp3(u_c2, u_c3, smoothstepRange(0.5, 0.72, pigment));
  }
  return lerp3(u_c3, u_c4, smoothstepRange(0.72, 1.0, pigment));
}

void main() {
  float pigment = sampleWash(v_uv);
  pigment = mix(pigment, pigment * (1.0 - u_colorLift * 0.68) + 0.05, u_colorLift);
  vec3 rgb = colorAt(pigment) / 255.0;
  gl_FragColor = vec4(rgb, 1.0);
}
`

function compileShader(gl, type, src) {
  const shader = gl.createShader(type)
  gl.shaderSource(shader, src)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader)
    gl.deleteShader(shader)
    throw new Error(log || 'Shader compile failed')
  }
  return shader
}

function createProgram(gl, vertSrc, fragSrc) {
  const vert = compileShader(gl, gl.VERTEX_SHADER, vertSrc)
  const frag = compileShader(gl, gl.FRAGMENT_SHADER, fragSrc)
  const program = gl.createProgram()
  gl.attachShader(program, vert)
  gl.attachShader(program, frag)
  gl.linkProgram(program)
  gl.deleteShader(vert)
  gl.deleteShader(frag)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const log = gl.getProgramInfoLog(program)
    gl.deleteProgram(program)
    throw new Error(log || 'Program link failed')
  }
  return program
}

/** GPU renderer — same wash math, one draw call per frame. */
export function createWashRenderer(canvas) {
  const gl =
    canvas.getContext('webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      preserveDrawingBuffer: false,
      powerPreference: 'low-power',
    }) ||
    canvas.getContext('experimental-webgl', {
      alpha: false,
      antialias: false,
      depth: false,
      stencil: false,
    })

  if (!gl) return null

  const program = createProgram(gl, VERT_SRC, FRAG_SRC)
  gl.useProgram(program)

  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
    gl.STATIC_DRAW,
  )

  const aPos = gl.getAttribLocation(program, 'a_pos')
  gl.enableVertexAttribArray(aPos)
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

  const uni = {
    drift: gl.getUniformLocation(program, 'u_drift'),
    brightOffset: gl.getUniformLocation(program, 'u_brightOffset'),
    warpAmpX: gl.getUniformLocation(program, 'u_warpAmpX'),
    warpAmpY: gl.getUniformLocation(program, 'u_warpAmpY'),
    bandScaleX: gl.getUniformLocation(program, 'u_bandScaleX'),
    bandScaleY: gl.getUniformLocation(program, 'u_bandScaleY'),
    bandMix: gl.getUniformLocation(program, 'u_bandMix'),
    topLeftX: gl.getUniformLocation(program, 'u_topLeftX'),
    topLeftY: gl.getUniformLocation(program, 'u_topLeftY'),
    topLeftRadius: gl.getUniformLocation(program, 'u_topLeftRadius'),
    topLeftWeight: gl.getUniformLocation(program, 'u_topLeftWeight'),
    lowerStart: gl.getUniformLocation(program, 'u_lowerStart'),
    lowerEnd: gl.getUniformLocation(program, 'u_lowerEnd'),
    lowerWeight: gl.getUniformLocation(program, 'u_lowerWeight'),
    brightX: gl.getUniformLocation(program, 'u_brightX'),
    brightY: gl.getUniformLocation(program, 'u_brightY'),
    brightRadius: gl.getUniformLocation(program, 'u_brightRadius'),
    brightWeight: gl.getUniformLocation(program, 'u_brightWeight'),
    bandWeight: gl.getUniformLocation(program, 'u_bandWeight'),
    grainScale: gl.getUniformLocation(program, 'u_grainScale'),
    grainAmp: gl.getUniformLocation(program, 'u_grainAmp'),
    seedX: gl.getUniformLocation(program, 'u_seedX'),
    seedY: gl.getUniformLocation(program, 'u_seedY'),
    colorLift: gl.getUniformLocation(program, 'u_colorLift'),
    c0: gl.getUniformLocation(program, 'u_c0'),
    c1: gl.getUniformLocation(program, 'u_c1'),
    c2: gl.getUniformLocation(program, 'u_c2'),
    c3: gl.getUniformLocation(program, 'u_c3'),
    c4: gl.getUniformLocation(program, 'u_c4'),
  }

  let width = 0
  let height = 0

  function setColors(colors) {
    const c = colors ?? {}
    gl.uniform3f(uni.c0, c.c0[0], c.c0[1], c.c0[2])
    gl.uniform3f(uni.c1, c.c1[0], c.c1[1], c.c1[2])
    gl.uniform3f(uni.c2, c.c2[0], c.c2[1], c.c2[2])
    gl.uniform3f(uni.c3, c.c3[0], c.c3[1], c.c3[2])
    gl.uniform3f(uni.c4, c.c4[0], c.c4[1], c.c4[2])
  }

  function setCfg(cfg, ambient) {
    const a = ambient ?? {}
    gl.uniform2f(uni.drift, a.driftX ?? 0, a.driftY ?? 0)
    gl.uniform2f(uni.brightOffset, a.brightX ?? 0, a.brightY ?? 0)
    gl.uniform1f(uni.warpAmpX, cfg.warpAmpX + (a.warpAmpX ?? 0))
    gl.uniform1f(uni.warpAmpY, cfg.warpAmpY + (a.warpAmpY ?? 0))
    gl.uniform1f(uni.bandScaleX, cfg.bandScaleX)
    gl.uniform1f(uni.bandScaleY, cfg.bandScaleY)
    gl.uniform1f(uni.bandMix, cfg.bandMix + (a.bandMix ?? 0))
    gl.uniform1f(uni.topLeftX, cfg.topLeftX)
    gl.uniform1f(uni.topLeftY, cfg.topLeftY)
    gl.uniform1f(uni.topLeftRadius, cfg.topLeftRadius)
    gl.uniform1f(uni.topLeftWeight, cfg.topLeftWeight + (a.topLeftWeight ?? 0))
    gl.uniform1f(uni.lowerStart, cfg.lowerStart)
    gl.uniform1f(uni.lowerEnd, cfg.lowerEnd)
    gl.uniform1f(uni.lowerWeight, cfg.lowerWeight + (a.lowerWeight ?? 0))
    gl.uniform1f(uni.brightX, cfg.brightX)
    gl.uniform1f(uni.brightY, cfg.brightY)
    gl.uniform1f(uni.brightRadius, cfg.brightRadius + (a.brightRadius ?? 0))
    gl.uniform1f(uni.brightWeight, cfg.brightWeight + (a.brightWeight ?? 0))
    gl.uniform1f(uni.bandWeight, cfg.bandWeight + (a.bandWeight ?? 0))
    gl.uniform1f(uni.grainScale, cfg.grainScale)
    gl.uniform1f(uni.grainAmp, cfg.grainAmp + (a.grainAmp ?? 0))
    gl.uniform1f(uni.seedX, cfg.seedX)
    gl.uniform1f(uni.seedY, cfg.seedY)
    gl.uniform1f(uni.colorLift, a.colorLift ?? 0)
  }

  return {
    resize(w, h) {
      if (w === width && h === height) return
      width = w
      height = h
      canvas.width = w
      canvas.height = h
      gl.viewport(0, 0, w, h)
    },

    render(cfg, colors, ambient = null) {
      setCfg(cfg, ambient)
      setColors(colors)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    },

    destroy() {
      gl.deleteBuffer(buf)
      gl.deleteProgram(program)
    },
  }
}

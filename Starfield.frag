precision mediump float;
uniform float time;
uniform vec2 resolution;

#define NUM_LAYERS 4.0

mat2 Rotate(float a) {
  float s = sin(a) , c = cos(a);
  return mat2(c, -s, s, c);
}

float Star(vec2 uv, float flare) {
  float d = length(uv);
  float m = 0.05/d;

  float rays = max(0.0, 1.0 - abs(uv.x*uv.y*1000.0));
  m += rays * flare;

  uv *= Rotate(3.1415/4.0);
  rays = max(0.0, 1.0 - abs(uv.x*uv.y*1000.0));
  m+=rays*.3*flare;

  m *= smoothstep(1.0, .2, d);

  return m;
}

float Hash21(vec2 p) {
  p = fract(p *vec2(123.34, 456.21));
  p += dot(p, p+45.32);

  return fract(p.x*p.y);
}

vec3 StarLayer(vec2 uv) {
  vec3 col = vec3(0);

  vec2 gv = fract(uv) - 0.5;
  vec2 id = floor(uv);

  for(int y = -1; y<=1; y++) {
    for(int x = -1; x<=1; x++) {
      vec2 offset = vec2(x,y);

      float n = Hash21(id + offset);
      float size = fract(n*345.32);

      float star = Star(gv - offset - vec2(n, fract(n*34.0))+0.5, smoothstep(0.75, 1.0, size));

      col += star*size;
    }
  }
  return col;
}

void main(void) {
  vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / resolution.y;
  uv *= 4.0;

  float t = time * .05;

  vec3 col = vec3(0);
  for(float i = 0.0; i<1.0; i+=1.0/NUM_LAYERS) {
    float depth = fract(i+t);
    float scale = mix(20.0,0.5, depth);
    col += StarLayer(uv*scale+i*453.2)*depth;
  }

  gl_FragColor = vec4(col, 1.);
}

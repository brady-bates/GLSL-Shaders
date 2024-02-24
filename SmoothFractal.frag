precision mediump float;
uniform float time;
uniform vec2 resolution;

void main(void) {
  //vec2 uv = (gl_FragCoord.xy / resolution.y);
  vec2 uv = gl_FragCoord.xy / resolution.xy * 2.0 - 1.0;

  for(int i=0; i<32;i++) {
    uv = abs(uv);
    uv -= 0.4;
    uv *= .15 *sin(time * .3)  + 1.2;
    // uv *= .1 * smoothstep(1.1, 1.3, uv) + 1.2;

    uv *= mat2(cos(0.2), -sin(0.2), sin(0.2), cos(0.2));
  }

  gl_FragColor = vec4(length(uv), length(uv + vec2(0.5, 0.6)), length(uv + vec2(0.3 * sin(time), -0.5)), 1.0);
  // gl_FragColor = vec4(length(uv), length(uv + vec2(0.5, 0.6)), length(uv + vec2(0.2, -0.5)), 1.0);
}

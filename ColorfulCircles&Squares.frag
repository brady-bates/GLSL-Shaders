precision mediump float;
uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

// void main(void) {
//   vec2 position = (gl_FragCoord.xy / resolution.xy) + mouse / 4.0;
//
//   float color = 0.0;
//   color += sin(position.x * cos(time / 15.0) * 80.0) + cos(position.y * cos(time / 15.0) * 10.0);
//   color += sin(position.y * sin( time / 10.0) * 40.0) + cos(position.x * sin(time / 25.0) * 40.0);
//   color += sin(position.x * sin( time / 5.0) * 10.0) + sin(position.y * sin(time / 35.0) * 80.0);
//   color *= sin(time / 10.0) * 0.5;
//
//   gl_FragColor = vec4(vec3(color, color * 0.5, sin(color + time / 3.0) * 0.75), 1.0);
// }

vec3 palette(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.0, 0.333, 0.667);

    return a + b*cos( 5.0*(c*t+d) );
}

void main(void)
{
    vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / resolution.y;

    vec2 uv0 = uv;

    uv *= 1.6;
    uv = fract(uv);
    uv -= 0.5;

    float d = sin(length(uv));

    vec3 col = palette(length(uv0) + (time / 3.0));

    d = abs( (sin(d * 8.0 + time) / 8.0) );

    d = .05 / d;

    col *= d;

    // Output to screen
    gl_FragColor = vec4(col, 1.0);
}

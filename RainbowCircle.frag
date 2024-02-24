precision mediump float;
uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

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

    float dist = length(uv);

    vec3 col = palette(length(uv) + time);

    gl_FragColor = vec4(col, 1.0);
}

precision mediump float;

varying float vRandow;

void main()
{
    gl_FragColor = vec4(1.0 * vRandow , 0.0, 0.0, 1.0);
}
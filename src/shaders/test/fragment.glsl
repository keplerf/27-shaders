precision mediump float;

uniform sampler2D uTexture;
uniform vec3 uColor;

varying vec2 vUv; 
varying float vElevation;



void main()
{
    vec4 textureColor = texture2D(uTexture , vUv);
    textureColor.rgb += vElevation * 1.9; ;
    // gl_FragColor = vec4(1.0 * vRandow , 0.0, 0.0, 1.0);
    gl_FragColor = vec4(textureColor);
    
}
uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;
uniform float uLevels;
uniform vec2 uFrequency;

attribute vec3 position;
attribute float aRandow;


varying float vRandow;


void main(){

  // float test = 1.0;
  // float test2 = test + 1.8;
  // int test3 = int(test2);
  // float test4 = float(test3);

  // vec2 foo = vec2(1.0, 2.0);
  // foo.x = 2.0;
  // foo *= 2.0; 

  // vec4 foo2 = vec4(foo, foo);

  vec4 modelPositions = modelMatrix * vec4(position, 1.0);
  // modelPositions.z += aRandow * uLevels;
  modelPositions.z += sin(position.x * uFrequency.x ) *  uFrequency.y;

  vec4 viewPositions = viewMatrix * modelPositions;
  vec4 projectPositions = projectionMatrix * viewPositions;

  vRandow = aRandow;
  gl_Position = projectPositions;
}

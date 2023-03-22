import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import * as dat from "lil-gui";
import testVertexShader from "./shaders/test/vertex.glsl";
import testFragmentShader from "./shaders/test/fragment.glsl";
/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

// Create the room
// var roomGeometry = new THREE.BoxGeometry(3, 3, 3);
// var roomMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
// var room = new THREE.Mesh(roomGeometry, roomMaterial);
// scene.add(room);

// // Add a door to the room
// var doorGeometry = new THREE.BoxGeometry(1, 2, 0.1);
// var doorMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
// var door = new THREE.Mesh(doorGeometry, doorMaterial);
// door.position.set(1.5, 0, -1.5);
// scene.add(door);

// // Add a window to the room
// var windowGeometry = new THREE.BoxGeometry(1, 1, 0.1);
// var windowMaterial = new THREE.MeshBasicMaterial({ color: 0xadd8e6 });
// var window2 = new THREE.Mesh(windowGeometry, windowMaterial);
// window2.position.set(-1.5, 0, -1.5);
// scene.add(window2);

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();

/**
 * Test mesh
 */
// Geometry
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);

const light = new THREE.AmbientLight(0xffffff, 1, 100);
light.position.set(10, 10, 10);
scene.add(light);

const count = geometry.attributes.position.count;
const randows = new Float32Array(count);

for (var i = 0; i < count; i++) {
  randows[i] = Math.random();
}

geometry.setAttribute("aRandow", new THREE.BufferAttribute(randows, 1));

// Material
// const material = new THREE.MeshBasicMaterial();
const material = new THREE.RawShaderMaterial({
  vertexShader: testVertexShader,
  fragmentShader: testFragmentShader,
  side: THREE.DoubleSide,
  uniforms: {
    uLevels: { value: 0.2 },
  },
});

gui.add(material.uniforms.uLevels, "value").min(0).max(2).step(0.001);

// Mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0.25, -0.25, 1);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();

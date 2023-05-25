import * as THREE from 'three';
import './style.css';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();
const texture = new THREE.TextureLoader().load('/earth.jpg')
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material  = new THREE.MeshPhongMaterial();
material.map = texture
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

var light1 = new THREE.AmbientLight( 0xffffff );
light1.position.set(100, 50, 100);
scene.add(light1);

const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);

const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(2);
renderer.render(scene, camera);

const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 2;

window.addEventListener('resize', function(){ 
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  camera.updateProjectionMatrix();
  camera.aspect = sizes.width/sizes.height;
  renderer.setSize(sizes.width, sizes.height);
})

const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
}
loop();

// let mouseDown = false;
// window.addEventListener('mousedown', () => {
//   mouseDown = true;
// })
// window.addEventListener('mouseup', () => {
//   mouseDown = false;
// })

// window.addEventListener('mousemove', function(e){
//   if(mouseDown){

//   }
// })
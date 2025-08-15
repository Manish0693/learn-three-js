import './style.css'
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/Addons.js';
// import chess from "./images/chess.png";
import * as dat from "dat.gui";

const root = document.querySelector<HTMLDivElement>('#app');
const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

root?.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const orbit = new OrbitControls(camera, renderer.domElement);

const axesHelper = new THREE.AxesHelper(10);
scene.add(axesHelper);

// camera.position.z = 5;
// camera.position.x = 0;
// camera.position.y = 2;
camera.position.set(2, 5, 20);
camera.rotation.x = -0.2;
orbit.update();

const boxgeo = new THREE.BoxGeometry(3,3,3);
const boxmat = new THREE.MeshBasicMaterial({color: 0x0000FF});
const box = new THREE.Mesh(boxgeo, boxmat);
scene.add(box)

const planegeo = new THREE.PlaneGeometry(20,20,20);
const planemat = new THREE.MeshBasicMaterial({
  color: "white",
  side: THREE.DoubleSide,
  // map: THREE.TextureLoader(chess)
});
const plane = new THREE.Mesh(planegeo, planemat);
plane.rotation.x = - Math.PI / 2;
scene.add(plane);

const spheregeo = new THREE.SphereGeometry(2,15,15);
const spheremat = new THREE.MeshBasicMaterial({
  color: 0xFF0000,
  wireframe: false  //  true => mesh form 
})
const sphere = new THREE.Mesh(spheregeo, spheremat);
sphere.position.set(4,4,4);
scene.add(sphere);


const gridhelp = new THREE.GridHelper(20);
scene.add(gridhelp);

const gui = new dat.GUI();

const options = {
  sphereColor: '#ff0000',
  // boxColor: '#0000ff'
}

gui.addColor(options, 'sphereColor').onChange(function(e){
  sphere.material.color.set(e);
})

function animate(){
  box.rotation.x += 0.01;
  box.rotation.y += 0.01;
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);








import './style.css'
import * as THREE from "three";
import { OrbitControls } from 'three/examples/jsm/Addons.js';
// import chess from "./images/chess.png";
import { options } from "./guiset";
import { amblight, recthelper, rectlight, spotlight } from './lights';
import stars from "./images/stars.jpg";
import nebula from "./images/nebula.jpg";
import dominicFlag from "./images/dominica-flag.webp";

import fragmentShader from "./shaders/first/fragment.glsl"
import vertexShader from "./shaders/first/vertex.glsl"







const root = document.querySelector<HTMLDivElement>('#app');



const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

//        Renderer Background
renderer.setClearColor(0x444444);

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






const boxgeo = new THREE.BoxGeometry(3,3,3);
const boxmat = new THREE.MeshStandardMaterial({color: 0x0000FF});
const box = new THREE.Mesh(boxgeo, boxmat);
box.name = "Box1";
box.castShadow = true;
scene.add(box);





const planegeo = new THREE.PlaneGeometry(100,100,100);
const planemat = new THREE.MeshStandardMaterial({
  color: "white",
  side: THREE.DoubleSide,
  // map: THREE.TextureLoader(chess)
});
const plane = new THREE.Mesh(planegeo, planemat);
plane.rotation.x = - Math.PI / 2;
plane.name = "Plane1";
scene.add(plane);
plane.receiveShadow = true;






const spheregeo = new THREE.SphereGeometry(2,15,15);
const spheremat = new THREE.MeshPhongMaterial({
  color: 0xFF0000,
  wireframe: false    //  true => mesh form 
})
const sphere = new THREE.Mesh(spheregeo, spheremat);
sphere.position.set(4,4,4);
sphere.name = "Sphere1"
scene.add(sphere);
sphere.castShadow = true;




const mesh = new THREE.Mesh(
  // new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
  // new THREE.SphereGeometry(0.5, 32, 32),
  // new THREE.TorusGeometry(0.7, 0.2, 16, 100),
  // new THREE.TorusKnotGeometry(0.3, 0.1, 100, 16),
  new THREE.IcosahedronGeometry(3, 1),
  // new THREE.TetrahedronGeometry(0.5, 1),
  // new THREE.OctahedronGeometry(0.5, 1),
  // new THREE.DodecahedronGeometry(0.5, 1),
  // new THREE.ConeGeometry(0.5, 1, 32),
  // new THREE.CylinderGeometry(0.5, 0.5, 1, 32),
  // new THREE.PlaneGeometry(1, 1, 100, 100),
  // new THREE.CircleGeometry(0.5, 32),
  // new THREE.RingGeometry(0.5, 1, 32),
  // new THREE.TorusGeometry(0.7, 0.2, 16, 100),

  new THREE.MeshStandardMaterial({ color: 0x00ee00 })
);
mesh.position.set(0, 8, 0);
mesh.castShadow = true;
scene.add(mesh);





const gridhelp = new THREE.GridHelper(100,50);
scene.add(gridhelp);





//      A D D    L I G H T S
scene.add(spotlight);
scene.add(rectlight);
scene.add(recthelper);





// the scene is essentially a cube 

const textureLoader = new THREE.TextureLoader();   //  unifrom pattern for all the six sides of the scene
scene.background = textureLoader.load(stars);

// const cubeTextureLoader = new THREE.CubeTextureLoader();    //  different images for different faces of the scene like a cube
// scene.background = cubeTextureLoader.load([
//     nebula,
//     nebula,
//     stars,
//     stars,
//     stars,
//     stars
// ]);

const box2geo = new THREE.BoxGeometry(3,3,3);
// const box2mat = new THREE.MeshStandardMaterial({
//   // color: 0x00FF00,     //  Provides a tint to the textures being added to the faces
//   map: textureLoader.load(nebula)
// })
const box2mulmat = [
  new THREE.MeshStandardMaterial({map: textureLoader.load(stars)}),   //  + X  (right)
  new THREE.MeshStandardMaterial({map: textureLoader.load(stars)}),   //  - X  (left)
  new THREE.MeshStandardMaterial({map: textureLoader.load(nebula)}),    //  + Y  (top)
  new THREE.MeshStandardMaterial({map: textureLoader.load(nebula)}),    //  - Y  (bottom)
  new THREE.MeshStandardMaterial({map: textureLoader.load(nebula)}),    //  + Z  (front)
  new THREE.MeshStandardMaterial({map: textureLoader.load(stars)}),   //  - Z  (back)
]
// const box2 = new THREE.Mesh(box2geo, box2mat);
const box2 = new THREE.Mesh(box2geo, box2mulmat);
box2.name = "Box2";
scene.add(box2);
box2.position.set(-8,4,4);





// Shader Material

const flagTexture = textureLoader.load(dominicFlag);
const plane2 = new THREE.PlaneGeometry(1,1,32,32);
const material = new THREE.ShaderMaterial({
  vertexShader,
  fragmentShader,
  uniforms: {
    uFrequency: {value: new THREE.Vector2(10,5)},
    uTime: {value: 0},
    uColor: { value: new THREE.Color('black') },
    uTexture: { value: flagTexture }
  }
})
const mesh1 = new THREE.Mesh(plane2, material);
mesh1.scale.y = 1/2;
mesh1.position.set(2,2,2);
scene.add(mesh);


export { box, sphere, plane, gridhelp }






const mousePosition = new THREE.Vector2();

const raycaster = new THREE.Raycaster();    //  creates an imaginary ray form the camera to a specified point





function hasColorMaterial(
  material: THREE.Material
): material is THREE.MeshStandardMaterial | THREE.MeshBasicMaterial {
  return (material as any).color !== undefined;
}





window.addEventListener("click", (e)=>{
  mousePosition.x = ( e.clientX / window.innerWidth ) * 2 - 1;    //  Normalizing from normal coords
  mousePosition.y = - ( e.clientY / window.innerHeight ) * 2 + 1;   //  to a system of  -1  to  1

  // console.log(mousePosition);

  raycaster.setFromCamera(mousePosition, camera);
  const intersects = raycaster.intersectObjects(scene.children);    // all the objects that intersect the ray from camera to the mouse Position
  
  for(let i = 0; i<intersects.length; i++){
    if(intersects[i].object instanceof THREE.Mesh){
      if(intersects[i].object.name === "Box1") {
        const material = ((intersects[i].object as THREE.Mesh).material as THREE.Material);
        if(!Array.isArray(material))
        //   material.forEach(m=>{
        //     if(hasColorMaterial(m)) m.color.set(0x0FF000);
        //   })
        // }
        // else if(hasColorMaterial(material)) 
          if(hasColorMaterial(material)) material.color.set(0x0FF000);
      }
    }
  }
})







let step: number = 0;
// let speed: number = 0.01;
let clock = new THREE.Clock();



function animate(){
  const elapsedTime = clock.getElapsedTime();

  box.rotation.x += 0.01;
  box.rotation.y += 0.01;

  // spotlight.intensity = options.spotintensity;
  // spotlight.penumbra = options.spotpenumbra;
  // spotlight.angle = options.spotangle;
  // spothelp.update()

  step += options.sphereSpeed;
  sphere.position.x = 4*Math.sin(elapsedTime);
  sphere.position.y = 5*Math.abs(Math.sin(step)) + 2;
  sphere.position.z = 4*Math.cos(elapsedTime);

  material.uniforms.uTime.value = elapsedTime;
  
  orbit.update(); 
  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);








//      Renderer Resize on Window Resize
let resizeTimeout: any;
window.addEventListener('resize', () => {
  if (!resizeTimeout) {
    resizeTimeout = setTimeout(() => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      resizeTimeout = null;
    }, 500);
  }
});

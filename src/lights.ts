import * as THREE from "three";
import { RectAreaLightHelper } from 'three/examples/jsm/helpers/RectAreaLightHelper.js';





//                     A M B I E N T    L I G H T
const amblight = new THREE.AmbientLight(0xCCCCCC, 3);
export { amblight };





let dirx = -15, diry = 15;

//                     D I R E C T I O N A L     L I G H T
const dirlight = new THREE.DirectionalLight(0x888888, 0.8);

dirlight.position.set(dirx,diry,0);
// scene.add(dirlight);
dirlight.castShadow = true;
dirlight.shadow.camera.bottom = -10 * Math.abs(diry / Math.sqrt(dirx**2 + diry**2));
dirlight.shadow.camera.top = 10 * Math.abs(diry / Math.sqrt(dirx**2 + diry**2));
dirlight.shadow.camera.left = -10 ;
dirlight.shadow.camera.right = 10 ;


const dirlighthelp = new THREE.DirectionalLightHelper(dirlight, 5);
// scene.add(dirlighthelp);

const dirshadowhelp = new THREE.CameraHelper(dirlight.shadow.camera);
// scene.add(dirshadowhelp);

export { dirlight, dirlighthelp, dirshadowhelp };





//                     R E C T A R E A    L I G H T  ( WINDOW LIGHT )
const rectlight = new THREE.RectAreaLight(0x44DDDD, 10, 10, 8);
rectlight.position.set( 0, diry , dirx);
rectlight.lookAt(0, 0, 0);
rectlight.castShadow = true;
// scene.add(rectlight);

const recthelper = new RectAreaLightHelper(rectlight);
// scene.add(recthelper);

export { rectlight, recthelper };





//                      S P O T      L I G H T
const spotlight = new THREE.SpotLight(0x886644, 1000);
spotlight.position.set(dirx, diry,0);
spotlight.angle = 0.4;       //  to help better shadow formation
spotlight.castShadow = true;
// scene.add(spotlight);

const spothelp = new THREE.SpotLightHelper(spotlight);
// scene.add(spothelp);

export { spotlight, spothelp };





//                F     O     G
const linearfog =  new THREE.Fog(0xDDDDDD, 0, 200);
const expfog = new THREE.FogExp2(0x0000FF, 0.01);

export { linearfog, expfog };

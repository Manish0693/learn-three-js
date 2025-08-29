import * as dat from "dat.gui";
import { sphere } from "./main";

//                    G       U       I
const gui = new dat.GUI();

export const options = {
  sphereColor: '#ff0000',
  spheremesh: false,
  // boxColor: '#0000ff',
  sphereSpeed: 0.02,
  spotangle: 0.5,
  spotpenumbra: 0.1,
  spotintensity: 1,
}

gui.addColor(options, 'sphereColor').onChange(function(e){
  sphere.material.color.set(e);
})

gui.add(options, 'spheremesh').onChange(function(e){
  sphere.material.wireframe = e;
})

gui.add(options, 'sphereSpeed', 0.02, 0.06);

// gui.add(options, 'spotangle', 0, 1);
// gui.add(options, 'spotintensity', 0, 2);
// gui.add(options, 'spotpenumbra', 0, 1);

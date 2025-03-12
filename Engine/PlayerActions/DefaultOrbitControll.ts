import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { CSS3DRenderer } from "three/examples/jsm/Addons.js";

interface Angles {
  min: number;
  max: number;
}

export const DefaultOrbitControll = (
  renderer: THREE.WebGLRenderer | CSS3DRenderer,
  camera: THREE.PerspectiveCamera,
  pAngle:Angles = {
    min: 30,
    max: 70,
  }
): OrbitControls => {
  const action = new OrbitControls(camera, renderer.domElement);
  action.enableDamping = true;
  action.dampingFactor = 0.25;
  action.enablePan = false;
  action.minPolarAngle = THREE.MathUtils.degToRad(pAngle.min);
  action.maxPolarAngle = THREE.MathUtils.degToRad(pAngle.max);

  return action;
};

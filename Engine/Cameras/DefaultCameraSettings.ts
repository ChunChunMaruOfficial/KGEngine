import * as THREE from "three";
import { CameraPerspective, CameraPosition } from "./Cameras.interface.js";

export const DefaultCameraSettings = (
  position: CameraPosition = { x: 0, y: 0.25, z: 1 },
  perspective: CameraPerspective = {
    fov: 75,
    aspect: window.innerWidth / window.innerHeight,
    near: 0.01,
    far: 1000,
  }
): THREE.PerspectiveCamera => {
  const camera = new THREE.PerspectiveCamera(
    perspective.fov != undefined ? perspective.fov : 75,
    perspective.aspect != undefined
      ? perspective.aspect
      : window.innerWidth / window.innerHeight,
    perspective.near != undefined ? perspective.near : 0.01,
    perspective.far != undefined ? perspective.far : 1000
  );
  camera.position.x = position.x;
  camera.position.y = position.y;
  camera.position.z = position.z;

  return camera;
};

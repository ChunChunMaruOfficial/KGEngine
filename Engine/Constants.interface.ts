import * as THREE from "three";
export interface PositionObject3D {
  x: number;
  y: number;
  z: number;
}

export type LightingTypes =
  | THREE.AmbientLight
  | THREE.DirectionalLight
  | THREE.HemisphereLight
  | THREE.PointLight
  | THREE.SpotLight
  | THREE.Mesh;

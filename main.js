import * as THREE from "three";

import { DefaultCameraSettings } from "./Engine/Cameras/DefaultCameraSettings.js";
import { DefaultOrbitControll } from "./Engine/PlayerActions/DefaultOrbitControll.js";
import { DefaultViEnConfig } from "./Engine/VisualEngineConfigs/DefaultViEnConfig.js";
import { CameraLimitSquare } from "./Engine/Cameras/CameraLimitSquare.js";

import { PointLightCfg } from "./Engine/Lighting/PointLightCfg.js";
import { DirectionalLightCfg } from "./Engine/Lighting/DirectionalLightCfg.js";
import { AmbientLightCfg } from "./Engine/Lighting/AmbientLightCfg.js";
import { ShadowCfg } from "./Engine/Lighting/ShadowCfg.js";

import { ModelsLoader } from "./Engine/OtherScripts/ModelsLoader.js";

import { BoxGeometry } from "./Engine/Objects/Geometry/BoxGeometry.js";
import { TextOnGeometry } from "./Engine/OtherScripts/TextOnGeometry.js";
import { BasicMaterial } from "./Engine/Objects/Materials/BasicMaterial.js";
import { LambertMaterial } from "./Engine/Objects/Materials/LambertMaterial.js";
import { PhongMaterial } from "./Engine/Objects/Materials/PhongMaterial.js";
import { PhysicalMaterial } from "./Engine/Objects/Materials/PhysicalMaterial.js";
import { StandardMaterial } from "./Engine/Objects/Materials/StandardMaterial.js";

// дефолтные переменные для рендера сцены и картинки + камера с ее управлением
const visualEngine = DefaultViEnConfig();
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111111);
const camera = DefaultCameraSettings({ x: 0, y: 1, z: 5 }, { far: 1000 });
const playerControlls = DefaultOrbitControll(visualEngine, camera, {
  min: 0,
  max: 360,
});

const light1 = DirectionalLightCfg(
  scene,
  { x: 1, y: 1, z: 1 },
  { intensity: 0.5 }
);
// const light2 = DirectionalLightCfg(
//   scene,
//   { x: -1, y: -1, z: -1 },
//   { intensity: 0.2 }
// );
light1.lookAt(0, 0, 0);
//light2.lookAt(0, 0, 0);

ShadowCfg(scene);

let text = "none";

await TextOnGeometry(
  "Hello World!",
  { size: 0.5, depth: 0.05, curveSegments: 1 },
  { bevelSegments: 1 },
  (geometry) => {
    let textMesh = new THREE.Mesh(
      geometry,
      PhongMaterial({ color: 0xffffff, opacity: 1 })
    );
    scene.add(textMesh);
    textMesh.position.set(-2, 0, 0);
    text = textMesh;
    textMesh.castShadow = true;
    textMesh.receiveShadow = true;
  }
);

setInterval(() => {
  console.log(text);
}, 1000);

const animate = (time) => {
  playerControlls.update();
  visualEngine.render(scene, camera);
  //CameraLimitSquare(camera, 5);
};

visualEngine.setAnimationLoop(animate);
animate();

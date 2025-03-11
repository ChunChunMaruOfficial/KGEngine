import * as THREE from "three";

// добавть куб окружения и дефолт текстуры по типу дерева envMap + map
// alphaMap - места прозрч черные проз белые норм png
// combine THREE.AddOperation .MultiplyOperation .MixOperation

interface MaterialBasicParams {
  color?: number;
  visible?: boolean;
  opacity?: number;
}

interface MaterialOtherParams {
  fog?: boolean;
  map?: THREE.Texture | undefined;
  envMap?: THREE.Texture | undefined;
  alphaMap?: THREE.Texture | undefined;
  normalMap?: THREE.Texture | undefined;
  displacementMap?: THREE.Texture | undefined;
  displacementScale?: number;
  combine?: THREE.Combine;
  reflectivity?: number;
  refractionRatio?: number;
  wireframe?: boolean;
  vertexColors?: boolean;
}

interface MaterialAdmin {
  alphaTest: number;
  alphaHash: boolean;
  depthTest: boolean;
  depthWrite: boolean;
}

export const BasicMaterial = (
  basicParams: MaterialBasicParams = {
    color: 0x121212,
    visible: true,
    opacity: 1,
  },
  CustomParams: MaterialOtherParams = {
    fog: true,
    map: undefined,
    envMap: undefined,
    alphaMap: undefined,
    combine: THREE.AddOperation,
    reflectivity: 0.5,
    refractionRatio: 0.5,
    wireframe: false,
    vertexColors: false,
  },
  admin: MaterialAdmin = {
    alphaTest: 0,
    alphaHash: false,
    depthTest: true,
    depthWrite: true,
  }
) =>
  new THREE.MeshBasicMaterial({
    color: basicParams.color,
    visible: basicParams.visible,
    transparent:
      basicParams.opacity != undefined ? basicParams.opacity < 1 : true,
    opacity: basicParams.opacity,

    fog: CustomParams.fog,
    map: CustomParams.map,
    envMap: CustomParams.envMap,
    alphaMap: CustomParams.alphaMap,
    combine: CustomParams.combine,
    reflectivity: CustomParams.reflectivity,
    refractionRatio: CustomParams.refractionRatio,
    wireframe: CustomParams.wireframe,
    vertexColors: CustomParams.vertexColors,

    alphaTest: admin.alphaTest,
    alphaHash: admin.alphaHash,
    depthTest: admin.depthTest,
    depthWrite: admin.depthWrite,
  });

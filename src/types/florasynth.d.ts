declare module 'florasynth' {
  import * as THREE from 'three';

  export interface TreeMeshes {
    mesh: THREE.Mesh | null;
    foliageMesh: THREE.Mesh | null;
    fruitMesh: THREE.Mesh | null;
  }

  export interface TextureMap {
    barkDiffuse?: string;
    barkNormal?: string;
    barkRoughness?: string;
    foliageDiffuse?: string;
    foliageNormal?: string;
    foliageRoughness?: string;
    foliageOpacity?: string;
    fruitDiffuse?: string;
    fruitNormal?: string;
    fruitRoughness?: string;
  }

  export class Properties {
    constructor(data: any);
    getEmbeddedData(): Promise<TextureMap>;
  }

  export class Tree {
    constructor(properties: Properties | any);
    generate(): Promise<TreeMeshes>;
    static applyTextures(meshes: TreeMeshes, textures: TextureMap): Promise<void>;
    static applyAtlases(meshes: TreeMeshes, atlases: any): Promise<THREE.Mesh>;
  }

  export namespace Presets {
    export const ASH: any;
    export const OAK: any;
    export const PINE: any;
  }

  export namespace TexturingUtils {
    export function createAtlases(textures: TextureMap): Promise<any>;
  }
}
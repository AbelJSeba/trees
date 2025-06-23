# Florasynth Tree Generation and Material Application

## Overview

This document explains the implementation of Florasynth tree generation in the React Three.js component, focusing on tree generation workflow and texture/material application methods.

## Core Architecture

### Component Structure
- **File**: `src/components/sections/FlorasynthTree.tsx`
- **Framework**: React + Three.js + Florasynth NPM package
- **Rendering**: WebGL with Three.js renderer
- **Interaction**: Mouse/touch rotation controls

### Dependencies
```typescript
import * as THREE from 'three';
import * as FLORASYNTH from 'florasynth';
```

## Tree Generation Workflow

### 1. Florasynth Initialization
```typescript
// Fix global Materials reference bug
(globalThis as any).Materials = (FLORASYNTH as any).Materials;
```

### 2. Tree Properties Loading
Two approaches available:

**Option A: Custom JSON Properties**
```typescript
const response = await fetch('/src/data/customTree.json');
const customTreeData = await response.json();
const customProperties = new FLORASYNTH.Properties(customTreeData);
const tree = new FLORASYNTH.Tree(customProperties);
```

**Option B: Preset Properties**
```typescript
const tree = new FLORASYNTH.Tree(FLORASYNTH.Presets.ASH);
```

### 3. Mesh Generation
```typescript
let meshes = await tree.generate();
// Returns object with: { mesh, foliageMesh, fruitMesh }
```

## Material Application Methods

### Current Implementation: Embedded Textures

**Step 1: Extract Embedded Data**
```typescript
const embeddedTextures = await customProperties.getEmbeddedData();
// Returns object with texture data URLs: { barkDiffuse, foliageDiffuse }
```

**Step 2: Apply Textures**
```typescript
await FLORASYNTH.Tree.applyTextures(meshes, embeddedTextures);
```

### Alternative Method: Custom Materials (Experimental)

**Manual Texture Loading**
```typescript
const textureLoader = new THREE.TextureLoader();
const barkTexture = await new Promise((resolve, reject) => {
  textureLoader.load(embeddedTextures.barkDiffuse, resolve, undefined, reject);
});
```

**Direct Material Assignment**
```typescript
const barkMaterial = new THREE.MeshLambertMaterial({ map: barkTexture });
meshes.mesh.material = barkMaterial;
```

## Scene Integration

### Mesh Addition to Scene
```typescript
if (meshes.mesh && treeGroupRef.current) {
  meshes.mesh.scale.setScalar(0.6);
  treeGroupRef.current.add(meshes.mesh);
}
```

### Scaling and Positioning
```typescript
// Group-level transformations
treeGroupRef.current.scale.setScalar(0.35);
treeGroupRef.current.position.y = -3;
```

## Key Technical Details

### Texture Parameter Names
- Correct: `barkDiffuse`, `foliageDiffuse`
- Incorrect: `bark`, `foliage`

### Mesh Types
- `meshes.mesh`: Tree trunk and branches
- `meshes.foliageMesh`: Leaves and foliage
- `meshes.fruitMesh`: Optional fruit elements

### Error Handling
```typescript
try {
  await FLORASYNTH.Tree.applyTextures(meshes, embeddedTextures);
} catch (textureError) {
  console.warn('Failed to apply embedded textures:', textureError);
}
```

## Embedded Texture Workflow

### JSON Structure
The `customTree.json` file contains:
- Tree generation parameters
- Base64-encoded texture data
- Material properties

### Extraction Process
1. Load JSON file with embedded textures
2. Create Properties object from JSON
3. Generate tree meshes
4. Extract texture data using `getEmbeddedData()`
5. Apply textures using Florasynth's built-in method

## Advanced Material Features (Optional)

### Wind Animation Shaders
Custom materials can include:
- Vertex shader modifications for wind sway
- Time-based uniforms for animation
- Height-based movement scaling

### Translucency Effects
Fragment shader modifications for:
- Subsurface scattering on leaves
- Backlit transparency effects
- Light transmission through foliage

## Performance Considerations

### Renderer Configuration
```typescript
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
powerPreference: "high-performance"
```

### Context Loss Handling
```typescript
renderer.domElement.addEventListener('webglcontextlost', (event) => {
  event.preventDefault();
  // Regenerate tree when context restored
});
```

## Common Issues and Solutions

### Materials Global Reference Bug
**Problem**: `Materials is not defined`
**Solution**: `(globalThis as any).Materials = (FLORASYNTH as any).Materials;`

### Texture Parameter Names
**Problem**: Textures not applying
**Solution**: Use `barkDiffuse`/`foliageDiffuse` instead of `bark`/`foliage`

### Missing Embedded Data
**Problem**: No textures in generated tree
**Solution**: Ensure JSON was exported with "embed textures" option enabled

## Branch Strategy

- **3rd-tree**: Stable implementation with working embedded textures
- **wind-effects**: Experimental branch for shader enhancements
- Fallback: Switch to stable branch if experiments fail

## File Locations

- Component: `src/components/sections/FlorasynthTree.tsx`
- Tree data: `src/data/customTree.json`
- Working directory: `/Users/abelseba/Documents/GitHub/trees` 
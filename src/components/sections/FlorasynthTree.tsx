import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import * as FLORASYNTH from 'florasynth';

interface FlorasynthTreeProps {
  className?: string;
}

export function FlorasynthTree({ className = "" }: FlorasynthTreeProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const treeGroupRef = useRef<THREE.Group | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });
  
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;
    
    // Debug: Check what Florasynth exports
    console.log('Florasynth exports:', {
      Tree: !!FLORASYNTH.Tree,
      Properties: !!FLORASYNTH.Properties,
      Presets: !!FLORASYNTH.Presets,
      TexturingUtils: !!FLORASYNTH.TexturingUtils,
      allKeys: Object.keys(FLORASYNTH)
    });

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB); // Sky blue background
    scene.fog = new THREE.Fog(0x87CEEB, 30, 100);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 10, 25);
    camera.lookAt(0, 6, 0);
    cameraRef.current = camera;

    // Renderer setup with WebGL error handling
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: false, // Better performance
      powerPreference: "high-performance"
    });
    renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Handle WebGL context loss
    renderer.domElement.addEventListener('webglcontextlost', (event) => {
      event.preventDefault();
      console.warn('WebGL context lost');
    });
    
    renderer.domElement.addEventListener('webglcontextrestored', () => {
      console.log('WebGL context restored');
      // Regenerate tree when context is restored
      generateTree();
    });
    
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(20, 30, 10);
    directionalLight.castShadow = true;
    directionalLight.shadow.camera.left = -50;
    directionalLight.shadow.camera.right = 50;
    directionalLight.shadow.camera.top = 50;
    directionalLight.shadow.camera.bottom = -50;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    scene.add(directionalLight);
    
    // Add a second light from the opposite direction
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.3);
    directionalLight2.position.set(-10, 20, -10);
    scene.add(directionalLight2);

    // Ground plane
    const groundGeometry = new THREE.CircleGeometry(15, 32);
    const groundMaterial = new THREE.MeshStandardMaterial({ 
      color: 0x3d2817,
      roughness: 0.9
    });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.receiveShadow = true;
    scene.add(ground);

    // Tree group
    const treeGroup = new THREE.Group();
    scene.add(treeGroup);
    treeGroupRef.current = treeGroup;

    // Generate initial tree
    generateTree();

    // Animation loop
    const animate = () => {
      animationIdRef.current = requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();

    // Mouse interaction handlers
    const handleMouseDown = (event: MouseEvent) => {
      isDraggingRef.current = true;
      previousMousePositionRef.current = {
        x: event.clientX,
        y: event.clientY
      };
    };

    const handleMouseMove = (event: MouseEvent) => {
      if (!isDraggingRef.current || !treeGroupRef.current) return;

      const deltaX = event.clientX - previousMousePositionRef.current.x;
      const deltaY = event.clientY - previousMousePositionRef.current.y;

      treeGroupRef.current.rotation.y += deltaX * 0.01;
      treeGroupRef.current.rotation.x += deltaY * 0.01;

      // Clamp vertical rotation
      treeGroupRef.current.rotation.x = Math.max(
        -Math.PI / 4,
        Math.min(Math.PI / 4, treeGroupRef.current.rotation.x)
      );

      previousMousePositionRef.current = {
        x: event.clientX,
        y: event.clientY
      };
    };

    const handleMouseUp = () => {
      isDraggingRef.current = false;
    };

    // Touch interaction handlers for mobile
    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 1) {
        isDraggingRef.current = true;
        previousMousePositionRef.current = {
          x: event.touches[0].clientX,
          y: event.touches[0].clientY
        };
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (!isDraggingRef.current || !treeGroupRef.current || event.touches.length !== 1) return;

      const deltaX = event.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY = event.touches[0].clientY - previousMousePositionRef.current.y;

      treeGroupRef.current.rotation.y += deltaX * 0.01;
      treeGroupRef.current.rotation.x += deltaY * 0.01;

      // Clamp vertical rotation
      treeGroupRef.current.rotation.x = Math.max(
        -Math.PI / 4,
        Math.min(Math.PI / 4, treeGroupRef.current.rotation.x)
      );

      previousMousePositionRef.current = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY
      };
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    // Add event listeners
    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    renderer.domElement.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;
      
      camera.aspect = mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current.clientWidth, mountRef.current.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      renderer.domElement.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Generate tree with Florasynth
  const generateTree = async () => {
    try {
      setIsLoading(true);
      
      // Fix Florasynth bug: Materials is referenced globally instead of FLORASYNTH.Materials
      (globalThis as any).Materials = (FLORASYNTH as any).Materials;
      
      // Clear existing tree with proper disposal
      if (treeGroupRef.current) {
        const disposeObject = (object: THREE.Object3D) => {
          object.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              // Dispose geometry
              if (child.geometry) {
                child.geometry.dispose();
              }
              
              // Dispose materials
              if (child.material) {
                if (Array.isArray(child.material)) {
                  child.material.forEach(material => {
                    if (material.map) material.map.dispose();
                    if (material.normalMap) material.normalMap.dispose();
                    if (material.roughnessMap) material.roughnessMap.dispose();
                    material.dispose();
                  });
                } else {
                  if (child.material.map) child.material.map.dispose();
                  if (child.material.normalMap) child.material.normalMap.dispose();
                  if (child.material.roughnessMap) child.material.roughnessMap.dispose();
                  child.material.dispose();
                }
              }
            }
          });
        };

        // Dispose all children
        treeGroupRef.current.children.forEach(child => {
          disposeObject(child);
          treeGroupRef.current!.remove(child);
        });
        
        // Clear the group
        treeGroupRef.current.clear();
      }

      // Try to load custom properties, fallback to ASH preset
      let tree;
      let properties;
      try {
        const response = await fetch('/src/data/customTree.json');
        const customTreeProperties = await response.json();
        properties = new FLORASYNTH.Properties(customTreeProperties);
        tree = new FLORASYNTH.Tree(properties);
      } catch (error) {
        console.log('Using ASH preset instead of custom properties');
        tree = new FLORASYNTH.Tree(FLORASYNTH.Presets.ASH);
        properties = null;
      }
      
      // Fixed tree size - smaller to fit viewport
      const growthFactor = 0.6; // Smaller tree that fits in view
      
      // Generate tree
      const meshes = await tree.generate();

      // Attempt to apply textures, fallback to default materials on failure
      try {
        console.log('Attempting to apply custom textures...');
        
        // Load textures with callbacks to ensure they're loaded
        const textureLoader = new THREE.TextureLoader();
        
        const barkTexture = textureLoader.load(
          '/textures/bark.jpg',
          (texture) => {
            console.log('Bark texture loaded successfully:', texture.image.width, 'x', texture.image.height);
          },
          undefined,
          (error) => {
            console.error('Failed to load bark texture:', error);
          }
        );
        
        const foliageTexture = textureLoader.load(
          '/textures/foliage.jpg',
          (texture) => {
            console.log('Foliage texture loaded successfully:', texture.image.width, 'x', texture.image.height);
          },
          undefined,
          (error) => {
            console.error('Failed to load foliage texture:', error);
          }
        );
        
        // Configure textures
        barkTexture.wrapS = barkTexture.wrapT = THREE.RepeatWrapping;
        barkTexture.repeat.set(2, 2); // Adjust tiling
        foliageTexture.wrapS = foliageTexture.wrapT = THREE.RepeatWrapping;
        foliageTexture.repeat.set(1, 1);
        
        // Store textures for later application
        (window as any).barkTexture = barkTexture;
        (window as any).foliageTexture = foliageTexture;
        console.log('Textures loaded and stored for manual application');
        
      } catch (error) {
        console.warn('Failed to apply textures, using default materials:', error);
        console.log('Using default black and white materials');
      }

      // Add tree meshes to scene
      if (meshes.mesh && treeGroupRef.current) {
        meshes.mesh.scale.setScalar(growthFactor);
        treeGroupRef.current.add(meshes.mesh);
        
        // Apply shadows
        meshes.mesh.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
      }

      if (meshes.foliageMesh && treeGroupRef.current) {
        meshes.foliageMesh.scale.setScalar(growthFactor);
        treeGroupRef.current.add(meshes.foliageMesh);
        
        // Apply shadows
        meshes.foliageMesh.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });
      }

      if (meshes.fruitMesh && treeGroupRef.current) {
        meshes.fruitMesh.scale.setScalar(growthFactor);
        treeGroupRef.current.add(meshes.fruitMesh);
        
        meshes.fruitMesh.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow = true;
          }
        });
      }

      // Scale the entire tree group smaller for better viewport fit
      if (treeGroupRef.current) {
        treeGroupRef.current.scale.setScalar(0.6);
      }

      // Apply textures manually after meshes are in scene
      setTimeout(() => {
        const barkTex = (window as any).barkTexture;
        const foliageTex = (window as any).foliageTexture;
        
        if (barkTex && foliageTex && treeGroupRef.current) {
          console.log('Applying textures to tree in scene...');
          
          treeGroupRef.current.traverse((child) => {
            if (child instanceof THREE.Mesh && child.material) {
              console.log('Found mesh with material type:', child.material.constructor.name);
              
              // Check if it's a trunk/branch or foliage mesh by examining geometry or name
              const isFoliage = child.name?.includes('foliage') || child.name?.includes('leaf') || 
                               child.geometry?.attributes?.position?.count > 1000; // Foliage typically has more vertices
              
              if (child.material instanceof THREE.MeshStandardMaterial || 
                  child.material instanceof THREE.MeshBasicMaterial ||
                  child.material instanceof THREE.MeshLambertMaterial) {
                
                child.material.map = isFoliage ? foliageTex : barkTex;
                child.material.needsUpdate = true;
                console.log(`Applied ${isFoliage ? 'foliage' : 'bark'} texture to mesh`);
              }
            }
          });
          
          console.log('Finished applying textures to all meshes');
        }
      }, 500);

      console.log('Tree added to scene with', treeGroupRef.current?.children.length, 'objects');

      setIsLoading(false);
    } catch (error) {
      console.error('Error generating tree:', error);
      setIsLoading(false);
    }
  };

  // Handle scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Use 400vh for scrollytelling distance
      const scrollytellingHeight = windowHeight * 4;
      
      // Calculate progress (0 to 1)
      let progress = scrollY / scrollytellingHeight;
      progress = Math.max(0, Math.min(1, progress));
      
      setScrollProgress(progress);
      
      // Calculate stage (0-6)
      const stageIndex = Math.min(Math.floor(progress * 7), 6);
      setCurrentStage(stageIndex);
    };

    // Throttle scroll events
    let ticking = false;
    const scrollListener = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', scrollListener, { passive: true });
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  // Generate tree only once on mount
  // No scroll-based regeneration

  const stageNames = [
    'Rich Soil',
    'Planted Seed',
    'First Sprout',
    'Young Sapling',
    'Growing Tree',
    'Mature Tree',
    'Ancient Wisdom'
  ];

  return (
    <div className={`relative w-full h-full ${className}`}>
      <div 
        ref={mountRef} 
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
        style={{ minHeight: '100%' }}
      />
      
      {/* Loading indicator */}
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-background/80">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-2"></div>
            <p className="text-sm text-muted-foreground">Growing tree...</p>
          </div>
        </div>
      )}

      {/* Interaction hint */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="text-center">
          <div className="text-xs text-muted-foreground/70">Click and drag to rotate</div>
        </div>
      </div>
    </div>
  );
}
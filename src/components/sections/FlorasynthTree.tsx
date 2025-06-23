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
    
    // Debug ASH preset structure
    console.log('ASH Preset:', FLORASYNTH.Presets.ASH);
    
    // Debug Tree constructor and methods
    if (FLORASYNTH.Tree) {
      console.log('Tree methods:', Object.getOwnPropertyNames(FLORASYNTH.Tree));
      console.log('Tree.applyTextures:', typeof FLORASYNTH.Tree.applyTextures);
    }

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x6b6b6b); // Dark grey background to match your image
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 8, 20);
    camera.lookAt(0, 4, 0);
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

    // Lighting optimized for clean background
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(20, 30, 10);
    directionalLight.castShadow = false; // Disable shadows for cleaner look
    scene.add(directionalLight);
    
    // Add a second light from the opposite direction for even lighting
    const directionalLight2 = new THREE.DirectionalLight(0xffffff, 0.4);
    directionalLight2.position.set(-10, 20, -10);
    scene.add(directionalLight2);

    // No ground plane - clean background

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

  // Store meshes for removal
  const meshesRef = useRef<any>(null);

  // Create ASH variations for variety while keeping textures working
  const createAshVariation = async () => {
    try {
      // Load the custom tree JSON with embedded textures
      const response = await fetch('/src/data/customTree.json');
      const customTreeData = await response.json();
      
      // Add small random variations to the ASH-based parameters
      if (customTreeData.branchingAngle) {
        customTreeData.branchingAngle += (Math.random() - 0.5) * 20; // ±10 degrees variation
      }
      if (customTreeData.branchLength) {
        customTreeData.branchLength *= 0.8 + Math.random() * 0.4; // 80% to 120% variation
      }
      if (customTreeData.foliageDensity) {
        customTreeData.foliageDensity *= 0.7 + Math.random() * 0.6; // 70% to 130% variation
      }
      
      // Add random seed for natural variation
      customTreeData.randomSeed = Math.floor(Math.random() * 10000);
      
      console.log('Created ASH variation with embedded textures');
      return customTreeData;
    } catch (error) {
      console.log('Failed to load custom tree, using ASH preset');
      return FLORASYNTH.Presets.ASH;
    }
  };

  // Generate tree with Florasynth
  const generateTree = async () => {
    try {
      setIsLoading(true);
      
      // Fix Florasynth bug: Materials is referenced globally instead of FLORASYNTH.Materials
      (globalThis as any).Materials = (FLORASYNTH as any).Materials;
      
      // Remove tree from scene (exact documentation format)
      if (meshesRef.current) {
        if (meshesRef.current.mesh && treeGroupRef.current) {
          treeGroupRef.current.remove(meshesRef.current.mesh);
        }
        if (meshesRef.current.foliageMesh && treeGroupRef.current) {
          treeGroupRef.current.remove(meshesRef.current.foliageMesh);
        }
        if (meshesRef.current.fruitMesh && treeGroupRef.current) {
          treeGroupRef.current.remove(meshesRef.current.fruitMesh);
        }
      }

      // Create ASH variation with embedded textures
      const ashVariationData = await createAshVariation();
      const customProperties = new FLORASYNTH.Properties(ashVariationData);
      const tree = new FLORASYNTH.Tree(customProperties);
      
      // Generate meshes
      let meshes = await tree.generate();
      
      console.log('Generated ASH variation meshes:', {
        mesh: !!meshes.mesh,
        foliageMesh: !!meshes.foliageMesh,
        fruitMesh: !!meshes.fruitMesh
      });
      
      // Apply embedded textures using Jacopo's method
      if (customProperties) {
        try {
          // Extract embedded texture data from the JSON
          const embeddedTextures = await customProperties.getEmbeddedData();
          console.log('Got embedded textures:', embeddedTextures);
          
          // Apply textures using the embedded data
          await FLORASYNTH.Tree.applyTextures(meshes, embeddedTextures);
          console.log('Applied embedded textures successfully');
        } catch (textureError) {
          console.warn('Failed to apply embedded textures:', textureError);
        }
      }

      // Store meshes reference
      meshesRef.current = meshes;

      // Add new tree to scene (exact documentation format)
      if (meshes.mesh && treeGroupRef.current) {
        meshes.mesh.scale.setScalar(0.6); // Scale for viewport
        treeGroupRef.current.add(meshes.mesh);
      }
      
      if (meshes.foliageMesh && treeGroupRef.current) {
        meshes.foliageMesh.scale.setScalar(0.6); // Scale for viewport
        treeGroupRef.current.add(meshes.foliageMesh);
      }
      
      if (meshes.fruitMesh && treeGroupRef.current) {
        meshes.fruitMesh.scale.setScalar(0.6); // Scale for viewport
        treeGroupRef.current.add(meshes.fruitMesh);
      }

      // Scale and position the entire tree group for better viewport fit
      if (treeGroupRef.current) {
        treeGroupRef.current.scale.setScalar(0.35);
        treeGroupRef.current.position.y = -3; // Move tree down
      }

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

      {/* Generate New Tree Button */}
      <div className="absolute top-4 right-4">
        <button
          onClick={generateTree}
          disabled={isLoading}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 disabled:bg-white/5 text-white text-sm rounded-lg backdrop-blur-sm border border-white/20 transition-all duration-200 hover:scale-105 disabled:cursor-not-allowed disabled:scale-100"
        >
          {isLoading ? 'Growing...' : 'New Tree'}
        </button>
      </div>

      {/* Interaction hint */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="text-center">
          <div className="text-xs text-muted-foreground/70">Click and drag to rotate</div>
        </div>
      </div>
    </div>
  );
}
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import * as FLORASYNTH from "florasynth";
import { TREE_CONFIG } from "../../data";

interface FlorasynthTreeProps {
  className?: string;
}
let cachedCustomTree: unknown | null = null;

const cloneTreeConfig = <T,>(config: T): T =>
  JSON.parse(JSON.stringify(config));

const loadCustomTreeConfig = async () => {
  if (!cachedCustomTree) {
    cachedCustomTree = TREE_CONFIG;
  }

  return cloneTreeConfig(cachedCustomTree);
};

const applyRandomVariations = (config: any) => {
  const treeConfig = cloneTreeConfig(config);
  const parameters = treeConfig.parameters ?? treeConfig;

  if (parameters) {
    if (typeof parameters.branchDensity === "number") {
      const densityVariance = 0.6 + Math.random() * 1.2; // 0.6x - 1.8x
      parameters.branchDensity = Math.max(
        0,
        parameters.branchDensity * densityVariance,
      );
    }

    if (typeof parameters.branchJointAngle === "number") {
      parameters.branchJointAngle += (Math.random() - 0.5) * 30; // ±15°
    }

    if (typeof parameters.foliageSize === "number") {
      const foliageVariance = 0.7 + Math.random() * 0.8; // 0.7x - 1.5x
      parameters.foliageSize = Math.max(
        0.5,
        parameters.foliageSize * foliageVariance,
      );
    }

    if (typeof parameters.thicknessGrowthFactor === "number") {
      const thicknessVariance = 0.75 + Math.random() * 0.7; // 0.75x - 1.45x
      parameters.thicknessGrowthFactor = Math.max(
        0.005,
        parameters.thicknessGrowthFactor * thicknessVariance,
      );
    }

    if (typeof parameters.segmentLength === "number") {
      const lengthVariance = 0.85 + Math.random() * 0.4; // 0.85x - 1.25x
      parameters.segmentLength = Math.max(
        0.5,
        parameters.segmentLength * lengthVariance,
      );
    }

    if (typeof parameters.gnarl === "number") {
      const gnarlVariance = 0.5 + Math.random() * 1.5; // 0.5x - 2x
      parameters.gnarl = Math.max(0, parameters.gnarl * gnarlVariance);
    }
  }

  treeConfig.randomSeed = Math.floor(Math.random() * 100_000);
  return treeConfig;
};

const createRandomTreeConfig = async () => {
  try {
    const customConfig = await loadCustomTreeConfig();
    return applyRandomVariations(customConfig);
  } catch (error) {
    console.warn(
      "Falling back to ASH preset after custom config failure",
      error,
    );
    return applyRandomVariations(cloneTreeConfig(FLORASYNTH.Presets.ASH));
  }
};

function FlorasynthTreeComponent({ className = "" }: FlorasynthTreeProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<any>(null);
  const rendererRef = useRef<any>(null);
  const cameraRef = useRef<any>(null);
  const treeGroupRef = useRef<any>(null);
  const animationIdRef = useRef<number | null>(null);
  const isDraggingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  const [, setScrollProgress] = useState(0);
  const [, setCurrentStage] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Initialize Three.js scene
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x6b6b6b); // Dark grey background to match your image
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      45,
      mountRef.current.clientWidth / mountRef.current.clientHeight,
      0.1,
      1000,
    );
    camera.position.set(0, 8, 20);
    camera.lookAt(0, 4, 0);
    cameraRef.current = camera;

    // Renderer setup with WebGL error handling
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: false, // Better performance
      powerPreference: "high-performance",
    });
    renderer.setSize(
      mountRef.current.clientWidth,
      mountRef.current.clientHeight,
    );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limit pixel ratio

    // Handle WebGL context loss
    renderer.domElement.addEventListener("webglcontextlost", (event: Event) => {
      event.preventDefault();
      console.warn("WebGL context lost");
    });

    renderer.domElement.addEventListener("webglcontextrestored", () => {
      console.log("WebGL context restored");
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
        y: event.clientY,
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
        Math.min(Math.PI / 4, treeGroupRef.current.rotation.x),
      );

      previousMousePositionRef.current = {
        x: event.clientX,
        y: event.clientY,
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
          y: event.touches[0].clientY,
        };
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (
        !isDraggingRef.current ||
        !treeGroupRef.current ||
        event.touches.length !== 1
      )
        return;

      const deltaX =
        event.touches[0].clientX - previousMousePositionRef.current.x;
      const deltaY =
        event.touches[0].clientY - previousMousePositionRef.current.y;

      treeGroupRef.current.rotation.y += deltaX * 0.01;
      treeGroupRef.current.rotation.x += deltaY * 0.01;

      // Clamp vertical rotation
      treeGroupRef.current.rotation.x = Math.max(
        -Math.PI / 4,
        Math.min(Math.PI / 4, treeGroupRef.current.rotation.x),
      );

      previousMousePositionRef.current = {
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      };
    };

    const handleTouchEnd = () => {
      isDraggingRef.current = false;
    };

    // Add event listeners
    renderer.domElement.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    renderer.domElement.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleTouchEnd);

    // Handle resize
    const handleResize = () => {
      if (!mountRef.current || !camera || !renderer) return;

      camera.aspect =
        mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight,
      );
    };
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      renderer.domElement.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      if (animationIdRef.current) {
        cancelAnimationFrame(animationIdRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  const meshesRef = useRef<FLORASYNTH.TreeMeshes | null>(null);

  const disposeObject = (object: any) => {
    object.traverse((child: any) => {
      if (!(child as any).isMesh) return;

      const mesh = child as any;
      mesh.geometry.dispose();
      const materials = Array.isArray(mesh.material)
        ? mesh.material
        : [mesh.material];

      materials.forEach((material: any) => {
        if (!material) return;
        if (typeof material.dispose === "function") {
          material.dispose();
        }
      });
    });
  };

  const clearExistingTree = () => {
    if (!treeGroupRef.current) {
      return;
    }

    const children = [...treeGroupRef.current.children];
    children.forEach((child) => {
      disposeObject(child);
      treeGroupRef.current?.remove(child);
    });

    meshesRef.current = null;
  };

  // Generate tree with Florasynth
  const generateTree = async () => {
    try {
      setIsLoading(true);

      // Check if Florasynth is properly loaded
      if (!FLORASYNTH || !FLORASYNTH.Tree) {
        console.warn("Florasynth not properly loaded");
        setIsLoading(false);
        return;
      }

      // Remove previous tree before generating a new one
      clearExistingTree();

      // Randomize base preset and apply variations
      const treeConfig = await createRandomTreeConfig();

      // Create properties using Florasynth API
      const customProperties = new FLORASYNTH.Properties(treeConfig);

      const tree = new FLORASYNTH.Tree(customProperties);

      // Generate meshes
      let meshes = await tree.generate();

      console.log("Generated tree meshes:", {
        mesh: !!meshes.mesh,
        foliageMesh: !!meshes.foliageMesh,
        fruitMesh: !!meshes.fruitMesh,
      });

      // Apply embedded textures using Jacopo's method
      if (customProperties) {
        try {
          // Extract embedded texture data from the JSON
          const embeddedTextures = await customProperties.getEmbeddedData();
          console.log("Got embedded textures:", embeddedTextures);

          // Apply textures using the embedded data
          await FLORASYNTH.Tree.applyTextures(meshes, embeddedTextures);
          console.log("Applied embedded textures successfully");
        } catch (textureError) {
          console.warn("Failed to apply embedded textures:", textureError);
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

      console.log(
        "Tree added to scene with",
        treeGroupRef.current?.children.length,
        "objects",
      );

      setIsLoading(false);
    } catch (error) {
      console.error("Error generating tree:", error);
      setHasError(true);
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

    window.addEventListener("scroll", scrollListener, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", scrollListener);
    };
  }, []);

  // Generate tree only once on mount
  // No scroll-based regeneration

  // Show fallback if there's an error
  if (hasError) {
    return (
      <div
        className={`relative aspect-square bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center ${className}`}
      >
        <div className="text-center p-6">
          <div className="text-6xl mb-4">🌳</div>
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Digital Tree
          </h3>
          <p className="text-sm text-green-600">
            A beautiful tree grows here, representing the organic growth of
            knowledge and ideas.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative w-full h-full ${className}`}>
      <div
        ref={mountRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
        style={{ minHeight: "100%" }}
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
          {isLoading ? "Growing..." : "New Tree"}
        </button>
      </div>

      {/* Interaction hint */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
        <div className="text-center">
          <div className="text-xs text-muted-foreground/70">
            Click and drag to rotate
          </div>
        </div>
      </div>
    </div>
  );
}

export function FlorasynthTree({ className = "" }: FlorasynthTreeProps) {
  return <FlorasynthTreeComponent className={className} />;
}

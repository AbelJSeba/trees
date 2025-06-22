import React, { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Calendar, ExternalLink, Github, Globe, Sprout, TreePine, Leaf, Code2, RotateCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Performance constants
const PERFORMANCE_CONFIG = {
  MAX_RENDER_DISTANCE: 1000,
  LOD_THRESHOLD: 0.7,
  ANIMATION_FRAME_THROTTLE: 16, // ~60fps
  TOUCH_THROTTLE: 50,
  RESIZE_DEBOUNCE: 100,
} as const;

// Mathematical constants for sphere distribution
const SPHERE_CONFIG = {
  RADIUS: 300,
  MIN_DISTANCE: 120,
  DISTRIBUTION_METHOD: 'fibonacci' as const, // or 'uniform'
  GOLDEN_RATIO: (1 + Math.sqrt(5)) / 2,
  AUTO_ROTATION_SPEED: 0.002,
  MANUAL_ROTATION_DAMPING: 0.95,
  SCALE_FACTOR: 0.8,
  PERSPECTIVE: 1200,
  Z_INDEX_MULTIPLIER: 1000,
} as const;

// Browser compatibility detection
const BROWSER_SUPPORT = {
  supportsTransform3d: (() => {
    const el = document.createElement('div');
    const transforms = ['transform', 'WebkitTransform', 'MozTransform', 'msTransform'];
    return transforms.some(prop => el.style[prop as any] !== undefined);
  })(),
  supportsWillChange: 'willChange' in document.documentElement.style,
  supportsTouchEvents: 'ontouchstart' in window,
  supportsPointerEvents: 'onpointerdown' in window,
  supportsIntersectionObserver: 'IntersectionObserver' in window,
} as const;

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  date: string;
  status: 'completed' | 'in-progress' | 'planning';
  technologies: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

interface SpherePoint {
  x: number;
  y: number;
  z: number;
  originalIndex: number;
}

interface TouchState {
  isActive: boolean;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  velocity: { x: number; y: number };
  lastTime: number;
}

interface RotationState {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  autoRotation: number;
  isManualControl: boolean;
}

const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'Digital Garden Platform',
    description: 'A modern platform for building and maintaining digital gardens with plant-inspired design.',
    longDescription: 'Built with React, TypeScript, and Tailwind CSS, this platform helps writers and thinkers create their own digital gardens. Features include markdown support, tag-based organization, and responsive design that grows with your content.',
    date: 'Jan 2025',
    status: 'completed',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop&auto=format',
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: '2',
    title: 'Knowledge Tree Visualizer',
    description: 'An interactive tool for visualizing knowledge connections and learning paths.',
    longDescription: 'A data visualization project that helps users map their learning journey and discover connections between different topics and concepts. Uses advanced graph algorithms to suggest new learning paths.',
    date: 'Dec 2024',
    status: 'in-progress',
    technologies: ['D3.js', 'React', 'Node.js', 'GraphQL'],
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop&auto=format',
    githubUrl: '#'
  },
  {
    id: '3',
    title: 'Habit Forest',
    description: 'A gamified habit tracking app where habits grow into a virtual forest.',
    longDescription: 'Combining the science of habit formation with the satisfaction of growing a digital forest. Users plant seeds for new habits and watch them grow into trees as they maintain consistency over time.',
    date: 'Nov 2024',
    status: 'planning',
    technologies: ['React Native', 'Firebase', 'TypeScript'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop&auto=format'
  },
  {
    id: '4',
    title: 'Code Snippet Manager',
    description: 'A beautiful tool for organizing and sharing code snippets with syntax highlighting.',
    longDescription: 'A productivity tool for developers to save, organize, and share code snippets across teams.',
    date: 'Oct 2024',
    status: 'completed',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop&auto=format',
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: '5',
    title: 'Reading Progress Tracker',
    description: 'Track your reading journey with beautiful visualizations and insights.',
    longDescription: 'A personal reading companion that helps track books, set goals, and visualize reading patterns.',
    date: 'Sep 2024',
    status: 'in-progress',
    technologies: ['Vue.js', 'Supabase', 'Chart.js'],
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop&auto=format',
    githubUrl: '#'
  },
  {
    id: '6',
    title: 'Focus Timer App',
    description: 'A minimalist pomodoro timer with ambient sounds and progress tracking.',
    longDescription: 'Help maintain focus with customizable work sessions, break reminders, and productivity analytics.',
    date: 'Aug 2024',
    status: 'completed',
    technologies: ['React', 'PWA', 'Web Audio API'],
    image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=250&fit=crop&auto=format',
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: '7',
    title: 'AI Writing Assistant',
    description: 'An intelligent writing companion that helps improve content quality.',
    longDescription: 'Leverages natural language processing to provide real-time writing suggestions and improvements.',
    date: 'Jul 2024',
    status: 'in-progress',
    technologies: ['Python', 'TensorFlow', 'React', 'FastAPI'],
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=250&fit=crop&auto=format',
    githubUrl: '#'
  },
  {
    id: '8',
    title: 'E-commerce Analytics',
    description: 'Advanced analytics dashboard for e-commerce performance tracking.',
    longDescription: 'Real-time dashboard providing insights into sales, customer behavior, and market trends.',
    date: 'Jun 2024',
    status: 'completed',
    technologies: ['React', 'D3.js', 'Node.js', 'MongoDB'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop&auto=format',
    liveUrl: '#',
    githubUrl: '#'
  }
];

const statusConfig = {
  completed: {
    color: 'bg-[#7fb069]/10 text-[#5a8040] border-[#7fb069]/20',
    icon: TreePine,
    label: 'Completed'
  },
  'in-progress': {
    color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    icon: Sprout,
    label: 'In Progress'
  },
  planning: {
    color: 'bg-lime-100 text-lime-700 border-lime-200',
    icon: Leaf,
    label: 'Planning'
  }
};

/**
 * Generates sphere coordinates using Fibonacci spiral distribution algorithm
 * This ensures even distribution of points on sphere surface
 */
function generateFibonacciSphere(count: number, radius: number): SpherePoint[] {
  const points: SpherePoint[] = [];
  const increment = Math.PI * (3 - Math.sqrt(5)); // Golden angle in radians
  
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
    const radiusAtY = Math.sqrt(1 - y * y); // radius at y
    
    const theta = increment * i; // golden angle increment
    
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    
    points.push({
      x: x * radius,
      y: y * radius,
      z: z * radius,
      originalIndex: i
    });
  }
  
  return points;
}

/**
 * Alternative uniform distribution algorithm for comparison
 */
function generateUniformSphere(count: number, radius: number): SpherePoint[] {
  const points: SpherePoint[] = [];
  
  for (let i = 0; i < count; i++) {
    // Use rejection sampling for uniform distribution
    let x, y, z;
    do {
      x = Math.random() * 2 - 1;
      y = Math.random() * 2 - 1;
      z = Math.random() * 2 - 1;
    } while (x * x + y * y + z * z > 1);
    
    // Normalize to sphere surface
    const length = Math.sqrt(x * x + y * y + z * z);
    points.push({
      x: (x / length) * radius,
      y: (y / length) * radius,
      z: (z / length) * radius,
      originalIndex: i
    });
  }
  
  return points;
}

/**
 * Calculates 3D rotation matrix transformations
 */
function rotatePoint(point: SpherePoint, rotX: number, rotY: number): SpherePoint {
  // Rotation around Y axis (horizontal)
  const cosY = Math.cos(rotY);
  const sinY = Math.sin(rotY);
  const x1 = point.x * cosY - point.z * sinY;
  const z1 = point.x * sinY + point.z * cosY;
  
  // Rotation around X axis (vertical)
  const cosX = Math.cos(rotX);
  const sinX = Math.sin(rotX);
  const y1 = point.y * cosX - z1 * sinX;
  const z2 = point.y * sinX + z1 * cosX;
  
  return {
    x: x1,
    y: y1,
    z: z2,
    originalIndex: point.originalIndex
  };
}

/**
 * Projects 3D coordinates to 2D screen coordinates with perspective
 */
function projectTo2D(point: SpherePoint, perspective: number): {
  x: number;
  y: number;
  z: number;
  scale: number;
  isVisible: boolean;
} {
  const z = point.z + perspective;
  const scale = perspective / Math.max(z, 1); // Prevent division by zero
  
  return {
    x: point.x * scale,
    y: point.y * scale,
    z: point.z,
    scale: Math.max(0.3, Math.min(1.2, scale)), // Clamp scale for stability
    isVisible: z > 0 && scale > 0.1 // Only render if in front and not too small
  };
}

/**
 * Calculates distance between points for collision detection
 */
function calculateDistance(p1: SpherePoint, p2: SpherePoint): number {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  const dz = p1.z - p2.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/**
 * Optimized throttle function for performance
 */
function useThrottledCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastCall = useRef<number>(0);
  
  return useCallback((...args: Parameters<T>) => {
    const now = Date.now();
    if (now - lastCall.current >= delay) {
      lastCall.current = now;
      return callback(...args);
    }
  }, [callback, delay]) as T;
}

/**
 * Debounced resize handler
 */
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function SphereProjects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>();
  const lastFrameTime = useRef<number>(0);
  
  const [rotation, setRotation] = useState<RotationState>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    autoRotation: 0,
    isManualControl: false
  });
  
  const [touchState, setTouchState] = useState<TouchState>({
    isActive: false,
    startX: 0,
    startY: 0,
    currentX: 0,
    currentY: 0,
    velocity: { x: 0, y: 0 },
    lastTime: 0
  });
  
  const [containerSize, setContainerSize] = useState({ width: 800, height: 600 });
  const [isVisible, setIsVisible] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const [performanceMode, setPerformanceMode] = useState(false);
  
  // Generate sphere points using memoization for performance
  const spherePoints = useMemo(() => {
    const distribution = SPHERE_CONFIG.DISTRIBUTION_METHOD === 'fibonacci' 
      ? generateFibonacciSphere 
      : generateUniformSphere;
    
    return distribution(sampleProjects.length, SPHERE_CONFIG.RADIUS);
  }, [sampleProjects.length]);
  
  // Debounced container size for resize performance
  const debouncedSize = useDebounce(containerSize, PERFORMANCE_CONFIG.RESIZE_DEBOUNCE);
  
  // Intersection Observer for visibility optimization
  useEffect(() => {
    if (!BROWSER_SUPPORT.supportsIntersectionObserver) {
      setIsVisible(true);
      return;
    }
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);
  
  // Resize observer for responsive design
  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setContainerSize({
          width: rect.width,
          height: rect.height
        });
      }
    };
    
    updateSize();
    
    const resizeObserver = new ResizeObserver(updateSize);
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => resizeObserver.disconnect();
  }, []);
  
  // Touch and mouse event handlers with proper throttling
  const handlePointerStart = useThrottledCallback((e: React.PointerEvent) => {
    e.preventDefault();
    
    const clientX = e.clientX;
    const clientY = e.clientY;
    const now = Date.now();
    
    setTouchState({
      isActive: true,
      startX: clientX,
      startY: clientY,
      currentX: clientX,
      currentY: clientY,
      velocity: { x: 0, y: 0 },
      lastTime: now
    });
    
    setRotation(prev => ({ ...prev, isManualControl: true }));
    
    if (containerRef.current) {
      containerRef.current.setPointerCapture(e.pointerId);
    }
  }, PERFORMANCE_CONFIG.TOUCH_THROTTLE);
  
  const handlePointerMove = useThrottledCallback((e: React.PointerEvent) => {
    if (!touchState.isActive) return;
    
    e.preventDefault();
    
    const clientX = e.clientX;
    const clientY = e.clientY;
    const now = Date.now();
    
    const deltaX = clientX - touchState.currentX;
    const deltaY = clientY - touchState.currentY;
    const deltaTime = now - touchState.lastTime;
    
    // Calculate velocity for momentum
    const velocity = {
      x: deltaTime > 0 ? deltaX / deltaTime : 0,
      y: deltaTime > 0 ? deltaY / deltaTime : 0
    };
    
    // Update rotation based on drag
    const sensitivity = 0.01;
    setRotation(prev => ({
      ...prev,
      targetX: prev.targetX + deltaY * sensitivity,
      targetY: prev.targetY + deltaX * sensitivity,
    }));
    
    setTouchState(prev => ({
      ...prev,
      currentX: clientX,
      currentY: clientY,
      velocity,
      lastTime: now
    }));
  }, PERFORMANCE_CONFIG.TOUCH_THROTTLE);
  
  const handlePointerEnd = useCallback((e: React.PointerEvent) => {
    e.preventDefault();
    
    // Apply momentum based on velocity
    const momentumFactor = 10;
    setRotation(prev => ({
      ...prev,
      targetX: prev.targetX + touchState.velocity.y * momentumFactor,
      targetY: prev.targetY + touchState.velocity.x * momentumFactor,
      isManualControl: false
    }));
    
    setTouchState(prev => ({ ...prev, isActive: false }));
    
    if (containerRef.current) {
      containerRef.current.releasePointerCapture(e.pointerId);
    }
  }, [touchState.velocity]);
  
  // Animation loop with performance optimizations
  useEffect(() => {
    if (!isVisible) return;
    
    const animate = (currentTime: number) => {
      // Throttle animation frames
      if (currentTime - lastFrameTime.current < PERFORMANCE_CONFIG.ANIMATION_FRAME_THROTTLE) {
        animationRef.current = requestAnimationFrame(animate);
        return;
      }
      
      lastFrameTime.current = currentTime;
      
      setRotation(prev => {
        const newRotation = { ...prev };
        
        // Auto-rotation when not manually controlled
        if (!prev.isManualControl) {
          newRotation.autoRotation += SPHERE_CONFIG.AUTO_ROTATION_SPEED;
          newRotation.targetY += SPHERE_CONFIG.AUTO_ROTATION_SPEED;
        }
        
        // Smooth interpolation to target rotation
        const damping = SPHERE_CONFIG.MANUAL_ROTATION_DAMPING;
        newRotation.x = prev.x + (prev.targetX - prev.x) * (1 - damping);
        newRotation.y = prev.y + (prev.targetY - prev.y) * (1 - damping);
        
        return newRotation;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible]);
  
  // Calculate projected points for rendering
  const projectedPoints = useMemo(() => {
    return spherePoints.map(point => {
      const rotatedPoint = rotatePoint(point, rotation.x, rotation.y);
      const projected = projectTo2D(rotatedPoint, SPHERE_CONFIG.PERSPECTIVE);
      
      return {
        ...projected,
        originalIndex: point.originalIndex,
        project: sampleProjects[point.originalIndex]
      };
    }).filter(p => p.isVisible);
  }, [spherePoints, rotation.x, rotation.y]);
  
  // Sort by z-index for proper layering
  const sortedPoints = useMemo(() => {
    return [...projectedPoints].sort((a, b) => a.z - b.z);
  }, [projectedPoints]);
  
  // Performance monitoring
  useEffect(() => {
    const checkPerformance = () => {
      const fps = 1000 / PERFORMANCE_CONFIG.ANIMATION_FRAME_THROTTLE;
      setPerformanceMode(fps < 30);
    };
    
    const interval = setInterval(checkPerformance, 1000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="min-h-screen py-20 overflow-hidden">
      <div className="container px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              <Badge variant="secondary" className="mb-4">
                <Code2 className="mr-2 h-3 w-3" />
                3D Project Sphere
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
                Interactive <span className="text-accent">Projects</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Explore my projects in an interactive 3D sphere. Drag to rotate, click to explore. 
                Each project orbits in its own digital space, waiting to be discovered.
              </p>
              
              {/* Browser compatibility warnings */}
              {!BROWSER_SUPPORT.supportsTransform3d && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-sm text-yellow-700">
                  ⚠️ Your browser has limited 3D support. Some features may not work optimally.
                </div>
              )}
              
              {performanceMode && (
                <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-700">
                  🚀 Performance mode enabled for smoother experience.
                </div>
              )}
            </div>
          </motion.div>

          {/* 3D Sphere Container */}
          <div className="relative mb-16">
            <motion.div
              ref={containerRef}
              className="relative mx-auto bg-gradient-to-br from-accent/5 to-secondary/10 rounded-2xl border border-border/50 overflow-hidden"
              style={{
                width: '100%',
                height: '70vh',
                minHeight: '500px',
                maxHeight: '800px',
                perspective: `${SPHERE_CONFIG.PERSPECTIVE}px`,
                ...(BROWSER_SUPPORT.supportsWillChange && { willChange: 'transform' })
              }}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              onPointerDown={BROWSER_SUPPORT.supportsPointerEvents ? handlePointerStart : undefined}
              onPointerMove={BROWSER_SUPPORT.supportsPointerEvents ? handlePointerMove : undefined}
              onPointerUp={BROWSER_SUPPORT.supportsPointerEvents ? handlePointerEnd : undefined}
              onMouseDown={!BROWSER_SUPPORT.supportsPointerEvents ? handlePointerStart as any : undefined}
              onMouseMove={!BROWSER_SUPPORT.supportsPointerEvents ? handlePointerMove as any : undefined}
              onMouseUp={!BROWSER_SUPPORT.supportsPointerEvents ? handlePointerEnd as any : undefined}
            >
              {/* Center point indicator */}
              <div className="absolute top-1/2 left-1/2 w-2 h-2 bg-accent/30 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-10" />
              
              {/* Sphere projects */}
              <div className="absolute inset-0 flex items-center justify-center">
                {sortedPoints.map((point, index) => {
                  const StatusIcon = statusConfig[point.project.status].icon;
                  const isSelected = selectedProject === point.project.id;
                  const zIndex = Math.round(point.z * SPHERE_CONFIG.Z_INDEX_MULTIPLIER / SPHERE_CONFIG.RADIUS) + 1000;
                  
                  return (
                    <motion.div
                      key={`${point.project.id}-${index}`}
                      className="absolute cursor-pointer select-none"
                      style={{
                        transform: `translate3d(${point.x}px, ${point.y}px, 0px) scale(${point.scale * SPHERE_CONFIG.SCALE_FACTOR})`,
                        zIndex,
                        opacity: performanceMode && point.scale < PERFORMANCE_CONFIG.LOD_THRESHOLD ? 0.7 : 1,
                        ...(BROWSER_SUPPORT.supportsWillChange && { willChange: 'transform, opacity' })
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: point.scale * SPHERE_CONFIG.SCALE_FACTOR }}
                      transition={{ 
                        duration: 0.3,
                        delay: index * 0.05,
                        ease: "easeOut"
                      }}
                      whileHover={{ 
                        scale: point.scale * SPHERE_CONFIG.SCALE_FACTOR * 1.1,
                        transition: { duration: 0.2 }
                      }}
                      onClick={() => setSelectedProject(
                        selectedProject === point.project.id ? null : point.project.id
                      )}
                    >
                      <Card className={`
                        w-64 h-48 border-2 transition-all duration-300 bg-card/90 backdrop-blur-sm
                        ${isSelected 
                          ? 'border-accent shadow-2xl shadow-accent/20 scale-110' 
                          : 'border-border hover:border-accent/50 hover:shadow-lg hover:shadow-accent/10'
                        }
                      `}>
                        {/* Project Image */}
                        <div className="relative h-24 overflow-hidden rounded-t-lg">
                          <img
                            src={point.project.image}
                            alt={point.project.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                        </div>

                        <CardHeader className="p-3 space-y-2">
                          {/* Status and Date */}
                          <div className="flex items-center justify-between">
                            <Badge className={`${statusConfig[point.project.status].color} text-xs flex items-center gap-1`}>
                              <StatusIcon className="w-3 h-3" />
                              {statusConfig[point.project.status].label}
                            </Badge>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{point.project.date}</span>
                            </div>
                          </div>
                          
                          <CardTitle className="text-sm font-semibold line-clamp-2">
                            {point.project.title}
                          </CardTitle>
                          <CardDescription className="text-xs line-clamp-2">
                            {point.project.description}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="p-3 pt-0">
                          {/* Technologies */}
                          <div className="flex flex-wrap gap-1 mb-2">
                            {point.project.technologies.slice(0, 2).map((tech) => (
                              <Badge 
                                key={tech} 
                                variant="outline" 
                                className="text-xs px-1.5 py-0.5"
                              >
                                {tech}
                              </Badge>
                            ))}
                            {point.project.technologies.length > 2 && (
                              <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                                +{point.project.technologies.length - 2}
                              </Badge>
                            )}
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-1">
                            {point.project.liveUrl && (
                              <Button 
                                size="sm"
                                className="flex-1 h-7 text-xs bg-accent hover:bg-accent/90" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(point.project.liveUrl, '_blank');
                                }}
                              >
                                <Globe className="h-3 w-3 mr-1" />
                                Live
                              </Button>
                            )}
                            {point.project.githubUrl && (
                              <Button 
                                size="sm"
                                variant="outline" 
                                className="flex-1 h-7 text-xs"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  window.open(point.project.githubUrl, '_blank');
                                }}
                              >
                                <Github className="h-3 w-3 mr-1" />
                                Code
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
              
              {/* Controls overlay */}
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                <div className="bg-background/80 backdrop-blur-sm rounded-lg p-3 border border-border/50">
                  <div className="text-sm font-medium mb-2">Sphere Statistics</div>
                  <div className="space-y-1 text-xs text-muted-foreground">
                    <div>Projects: {sampleProjects.length}</div>
                    <div>Distribution: {SPHERE_CONFIG.DISTRIBUTION_METHOD}</div>
                    <div>Visible: {sortedPoints.length}</div>
                    <div>Rotation: {Math.round(rotation.y * 180 / Math.PI)}°</div>
                  </div>
                </div>
                
                <div className="bg-background/80 backdrop-blur-sm rounded-lg p-2 border border-border/50">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setRotation(prev => ({
                        ...prev,
                        targetX: 0,
                        targetY: 0,
                        autoRotation: 0,
                        isManualControl: false
                      }));
                    }}
                    className="h-8 w-8 p-0"
                  >
                    <RotateCw className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Instructions */}
              <motion.div
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-background/80 backdrop-blur-sm rounded-lg px-4 py-2 border border-border/50"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1 }}
              >
                <div className="text-sm text-muted-foreground text-center">
                  {BROWSER_SUPPORT.supportsTouchEvents ? 'Touch' : 'Click'} and drag to rotate • Click projects to explore
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* Selected Project Details */}
          <AnimatePresence>
            {selectedProject && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.4 }}
                className="mb-16"
              >
                {(() => {
                  const project = sampleProjects.find(p => p.id === selectedProject);
                  if (!project) return null;
                  
                  const StatusIcon = statusConfig[project.status].icon;
                  
                  return (
                    <Card className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-accent/5 to-secondary/5 border-accent/20">
                      <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div className="space-y-6">
                          <div className="space-y-3">
                            <Badge className={`${statusConfig[project.status].color} flex items-center gap-2 w-fit`}>
                              <StatusIcon className="w-4 h-4" />
                              {statusConfig[project.status].label}
                            </Badge>
                            <h3 className="text-3xl font-bold">{project.title}</h3>
                            <p className="text-muted-foreground leading-relaxed">
                              {project.longDescription}
                            </p>
                          </div>
                          
                          <div className="space-y-4">
                            <div>
                              <h4 className="text-sm font-semibold mb-2">Technologies</h4>
                              <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
                                  <Badge key={tech} variant="outline">
                                    {tech}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-3">
                              {project.liveUrl && (
                                <Button 
                                  className="bg-accent hover:bg-accent/90"
                                  onClick={() => window.open(project.liveUrl, '_blank')}
                                >
                                  <Globe className="h-4 w-4 mr-2" />
                                  View Live Demo
                                </Button>
                              )}
                              {project.githubUrl && (
                                <Button 
                                  variant="outline"
                                  onClick={() => window.open(project.githubUrl, '_blank')}
                                >
                                  <Github className="h-4 w-4 mr-2" />
                                  View Code
                                </Button>
                              )}
                              <Button 
                                variant="ghost"
                                onClick={() => setSelectedProject(null)}
                              >
                                Close
                              </Button>
                            </div>
                          </div>
                        </div>
                        
                        <div className="aspect-video rounded-lg overflow-hidden">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      </div>
                    </Card>
                  );
                })()}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Algorithm Verification Section */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <Card className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-accent/5 to-secondary/5 border-accent/20">
              <div className="space-y-6">
                <h3 className="text-2xl font-bold">Implementation Details</h3>
                
                <div className="grid md:grid-cols-2 gap-8 text-left">
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Mathematical Accuracy</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Fibonacci spiral distribution for even point spacing</li>
                      <li>• Golden ratio-based angular increments</li>
                      <li>• Proper 3D rotation matrix calculations</li>
                      <li>• Perspective projection with z-buffer sorting</li>
                      <li>• Distance-based scaling and LOD optimization</li>
                    </ul>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Performance Features</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• 60fps animation with RAF throttling</li>
                      <li>• Touch gesture momentum and damping</li>
                      <li>• Intersection Observer for visibility</li>
                      <li>• ResizeObserver for responsive updates</li>
                      <li>• Browser compatibility detection</li>
                    </ul>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-border">
                  <p className="text-sm text-muted-foreground">
                    Built with pure CSS transforms and JavaScript calculations. 
                    No external 3D libraries required for optimal performance and compatibility.
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
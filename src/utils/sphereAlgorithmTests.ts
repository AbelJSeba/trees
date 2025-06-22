/**
 * Comprehensive test suite for sphere distribution algorithms
 * and 3D mathematical calculations in SphereProjects.tsx
 */

interface Point3D {
  x: number;
  y: number;
  z: number;
}

interface TestResult {
  algorithm: string;
  passed: boolean;
  details: string;
  metrics?: Record<string, number>;
}

/**
 * Fibonacci Sphere Distribution Algorithm
 * Based on the golden ratio for optimal point distribution
 */
export function generateFibonacciSphere(count: number, radius: number): Point3D[] {
  const points: Point3D[] = [];
  const increment = Math.PI * (3 - Math.sqrt(5)); // Golden angle ≈ 2.399963 radians
  
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2; // Linear y distribution from 1 to -1
    const radiusAtY = Math.sqrt(1 - y * y); // Circle radius at height y
    
    const theta = increment * i; // Spiral angle
    
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    
    points.push({
      x: x * radius,
      y: y * radius,
      z: z * radius
    });
  }
  
  return points;
}

/**
 * Uniform Random Sphere Distribution (for comparison)
 * Uses rejection sampling for true uniform distribution
 */
export function generateUniformSphere(count: number, radius: number): Point3D[] {
  const points: Point3D[] = [];
  
  for (let i = 0; i < count; i++) {
    let x, y, z;
    
    // Rejection sampling: generate points in unit cube until we get one in unit sphere
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
      z: (z / length) * radius
    });
  }
  
  return points;
}

/**
 * Calculate distance between two points
 */
function distance(p1: Point3D, p2: Point3D): number {
  const dx = p1.x - p2.x;
  const dy = p1.y - p2.y;
  const dz = p1.z - p2.z;
  return Math.sqrt(dx * dx + dy * dy + dz * dz);
}

/**
 * Test 1: Verify all points lie on sphere surface
 */
export function testPointsOnSphere(points: Point3D[], expectedRadius: number): TestResult {
  const tolerance = 0.0001;
  let maxError = 0;
  let validPoints = 0;
  
  for (const point of points) {
    const actualRadius = Math.sqrt(point.x * point.x + point.y * point.y + point.z * point.z);
    const error = Math.abs(actualRadius - expectedRadius);
    maxError = Math.max(maxError, error);
    
    if (error <= tolerance) {
      validPoints++;
    }
  }
  
  const accuracy = validPoints / points.length;
  const passed = accuracy >= 0.99; // 99% of points should be on sphere surface
  
  return {
    algorithm: 'Sphere Surface Accuracy',
    passed,
    details: `${validPoints}/${points.length} points on sphere surface (${(accuracy * 100).toFixed(2)}%)`,
    metrics: {
      accuracy,
      maxError,
      tolerance
    }
  };
}

/**
 * Test 2: Measure distribution uniformity using nearest neighbor distances
 */
export function testDistributionUniformity(points: Point3D[]): TestResult {
  const nearestDistances: number[] = [];
  
  // Calculate nearest neighbor distance for each point
  for (let i = 0; i < points.length; i++) {
    let minDistance = Infinity;
    
    for (let j = 0; j < points.length; j++) {
      if (i !== j) {
        const dist = distance(points[i], points[j]);
        minDistance = Math.min(minDistance, dist);
      }
    }
    
    nearestDistances.push(minDistance);
  }
  
  // Calculate statistics
  const mean = nearestDistances.reduce((sum, d) => sum + d, 0) / nearestDistances.length;
  const variance = nearestDistances.reduce((sum, d) => sum + Math.pow(d - mean, 2), 0) / nearestDistances.length;
  const stdDev = Math.sqrt(variance);
  const coefficientOfVariation = stdDev / mean;
  
  // Lower coefficient of variation indicates more uniform distribution
  const passed = coefficientOfVariation < 0.5; // Arbitrary threshold for "good" uniformity
  
  return {
    algorithm: 'Distribution Uniformity',
    passed,
    details: `CV: ${coefficientOfVariation.toFixed(4)} (lower is better)`,
    metrics: {
      mean,
      stdDev,
      coefficientOfVariation,
      minDistance: Math.min(...nearestDistances),
      maxDistance: Math.max(...nearestDistances)
    }
  };
}

/**
 * Test 3: Verify mathematical constants
 */
export function testMathematicalConstants(): TestResult {
  const goldenRatio = (1 + Math.sqrt(5)) / 2;
  const goldenAngle = Math.PI * (3 - Math.sqrt(5));
  const expectedGoldenRatio = 1.618033988749895;
  const expectedGoldenAngle = 2.39996322972865332;
  
  const ratioError = Math.abs(goldenRatio - expectedGoldenRatio);
  const angleError = Math.abs(goldenAngle - expectedGoldenAngle);
  
  const tolerance = 1e-10;
  const passed = ratioError < tolerance && angleError < tolerance;
  
  return {
    algorithm: 'Mathematical Constants',
    passed,
    details: `Golden ratio: ${goldenRatio.toFixed(15)}, Golden angle: ${goldenAngle.toFixed(15)}`,
    metrics: {
      goldenRatio,
      goldenAngle,
      ratioError,
      angleError,
      tolerance
    }
  };
}

/**
 * Test 4: 3D Rotation Matrix Accuracy
 */
export function testRotationMatrix(): TestResult {
  const originalPoint = { x: 1, y: 0, z: 0 };
  const rotationAngle = Math.PI / 4; // 45 degrees
  
  // Rotate around Y-axis
  function rotateY(point: Point3D, angle: number): Point3D {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);
    
    return {
      x: point.x * cos - point.z * sin,
      y: point.y,
      z: point.x * sin + point.z * cos
    };
  }
  
  const rotatedPoint = rotateY(originalPoint, rotationAngle);
  
  // Expected values for 45-degree rotation
  const expectedX = Math.cos(rotationAngle); // ≈ 0.707
  const expectedZ = Math.sin(rotationAngle); // ≈ 0.707
  
  const errorX = Math.abs(rotatedPoint.x - expectedX);
  const errorZ = Math.abs(rotatedPoint.z - expectedZ);
  const errorY = Math.abs(rotatedPoint.y - 0); // Should remain 0
  
  const tolerance = 1e-10;
  const passed = errorX < tolerance && errorZ < tolerance && errorY < tolerance;
  
  return {
    algorithm: '3D Rotation Matrix',
    passed,
    details: `Rotated (1,0,0) by 45° → (${rotatedPoint.x.toFixed(6)}, ${rotatedPoint.y.toFixed(6)}, ${rotatedPoint.z.toFixed(6)})`,
    metrics: {
      errorX,
      errorY,
      errorZ,
      tolerance
    }
  };
}

/**
 * Test 5: Perspective Projection Accuracy
 */
export function testPerspectiveProjection(): TestResult {
  const perspective = 1000;
  const point3D = { x: 100, y: 50, z: 200 };
  
  function projectTo2D(point: Point3D, perspective: number) {
    const z = point.z + perspective;
    const scale = perspective / Math.max(z, 1);
    
    return {
      x: point.x * scale,
      y: point.y * scale,
      scale,
      isVisible: z > 0
    };
  }
  
  const projected = projectTo2D(point3D, perspective);
  
  // Manual calculation for verification
  const expectedScale = perspective / (point3D.z + perspective);
  const expectedX = point3D.x * expectedScale;
  const expectedY = point3D.y * expectedScale;
  
  const errorX = Math.abs(projected.x - expectedX);
  const errorY = Math.abs(projected.y - expectedY);
  const errorScale = Math.abs(projected.scale - expectedScale);
  
  const tolerance = 1e-10;
  const passed = errorX < tolerance && errorY < tolerance && errorScale < tolerance && projected.isVisible;
  
  return {
    algorithm: 'Perspective Projection',
    passed,
    details: `Point (${point3D.x},${point3D.y},${point3D.z}) → Screen (${projected.x.toFixed(2)},${projected.y.toFixed(2)})`,
    metrics: {
      scale: projected.scale,
      projectedX: projected.x,
      projectedY: projected.y,
      errorX,
      errorY,
      errorScale
    }
  };
}

/**
 * Test 6: Performance Benchmark
 */
export function benchmarkAlgorithms(pointCount: number = 100): TestResult {
  const iterations = 100;
  
  // Benchmark Fibonacci algorithm
  const startFib = performance.now();
  for (let i = 0; i < iterations; i++) {
    generateFibonacciSphere(pointCount, 300);
  }
  const fibTime = performance.now() - startFib;
  
  // Benchmark Uniform algorithm
  const startUniform = performance.now();
  for (let i = 0; i < iterations; i++) {
    generateUniformSphere(pointCount, 300);
  }
  const uniformTime = performance.now() - startUniform;
  
  const fibAvg = fibTime / iterations;
  const uniformAvg = uniformTime / iterations;
  
  // Fibonacci should be faster as it's deterministic
  const passed = fibAvg < uniformAvg;
  
  return {
    algorithm: 'Performance Benchmark',
    passed,
    details: `Fibonacci: ${fibAvg.toFixed(3)}ms, Uniform: ${uniformAvg.toFixed(3)}ms per ${pointCount} points`,
    metrics: {
      fibonacciTime: fibAvg,
      uniformTime: uniformAvg,
      speedupRatio: uniformAvg / fibAvg,
      iterations,
      pointCount
    }
  };
}

/**
 * Test 7: Browser Compatibility Detection
 */
export function testBrowserCompatibility(): TestResult {
  const features = {
    transform3d: (() => {
      const el = document.createElement('div');
      const transforms = ['transform', 'WebkitTransform', 'MozTransform', 'msTransform'];
      return transforms.some(prop => el.style[prop as any] !== undefined);
    })(),
    willChange: 'willChange' in document.documentElement.style,
    touchEvents: 'ontouchstart' in window,
    pointerEvents: 'onpointerdown' in window,
    intersectionObserver: 'IntersectionObserver' in window,
    resizeObserver: 'ResizeObserver' in window,
    requestAnimationFrame: 'requestAnimationFrame' in window,
    performance: 'performance' in window
  };
  
  const supportedFeatures = Object.values(features).filter(Boolean).length;
  const totalFeatures = Object.keys(features).length;
  const compatibilityScore = supportedFeatures / totalFeatures;
  
  const passed = compatibilityScore >= 0.75; // At least 75% feature support
  
  return {
    algorithm: 'Browser Compatibility',
    passed,
    details: `${supportedFeatures}/${totalFeatures} features supported (${(compatibilityScore * 100).toFixed(1)}%)`,
    metrics: {
      ...features,
      compatibilityScore,
      supportedFeatures,
      totalFeatures
    }
  };
}

/**
 * Run comprehensive test suite
 */
export function runComprehensiveTests(): {
  results: TestResult[];
  summary: {
    totalTests: number;
    passed: number;
    failed: number;
    passRate: number;
  };
} {
  console.log('🧪 Running SphereProjects.tsx Algorithm Test Suite...\n');
  
  const results: TestResult[] = [];
  
  // Generate test data
  const fibonacciPoints = generateFibonacciSphere(50, 300);
  const uniformPoints = generateUniformSphere(50, 300);
  
  // Run all tests
  results.push(testMathematicalConstants());
  results.push(testRotationMatrix());
  results.push(testPerspectiveProjection());
  results.push(testPointsOnSphere(fibonacciPoints, 300));
  results.push(testDistributionUniformity(fibonacciPoints));
  results.push(benchmarkAlgorithms(50));
  results.push(testBrowserCompatibility());
  
  // Calculate summary
  const passed = results.filter(r => r.passed).length;
  const failed = results.length - passed;
  const passRate = passed / results.length;
  
  // Log results
  console.log('📊 Test Results:');
  console.log('================');
  
  results.forEach((result, index) => {
    const status = result.passed ? '✅' : '❌';
    console.log(`${index + 1}. ${status} ${result.algorithm}: ${result.details}`);
    
    if (result.metrics) {
      Object.entries(result.metrics).forEach(([key, value]) => {
        console.log(`   ${key}: ${typeof value === 'number' ? value.toFixed(6) : value}`);
      });
    }
    console.log('');
  });
  
  console.log('📈 Summary:');
  console.log(`   Total Tests: ${results.length}`);
  console.log(`   Passed: ${passed}`);
  console.log(`   Failed: ${failed}`);
  console.log(`   Pass Rate: ${(passRate * 100).toFixed(1)}%`);
  
  return {
    results,
    summary: {
      totalTests: results.length,
      passed,
      failed,
      passRate
    }
  };
}

/**
 * Comparative Analysis: Fibonacci vs Uniform Distribution
 */
export function compareDistributionAlgorithms(pointCount: number = 100): {
  fibonacci: {
    points: Point3D[];
    uniformity: TestResult;
    performance: number;
  };
  uniform: {
    points: Point3D[];
    uniformity: TestResult;
    performance: number;
  };
  recommendation: string;
} {
  console.log(`🔍 Comparing Distribution Algorithms (${pointCount} points)...\n`);
  
  // Generate points
  const startFib = performance.now();
  const fibonacciPoints = generateFibonacciSphere(pointCount, 300);
  const fibTime = performance.now() - startFib;
  
  const startUniform = performance.now();
  const uniformPoints = generateUniformSphere(pointCount, 300);
  const uniformTime = performance.now() - startUniform;
  
  // Test uniformity
  const fibUniformity = testDistributionUniformity(fibonacciPoints);
  const uniformUniformity = testDistributionUniformity(uniformPoints);
  
  // Determine recommendation
  let recommendation: string;
  if (fibUniformity.metrics!.coefficientOfVariation < uniformUniformity.metrics!.coefficientOfVariation) {
    recommendation = "Fibonacci distribution recommended: More uniform distribution with predictable performance";
  } else if (uniformTime < fibTime * 2) {
    recommendation = "Uniform distribution acceptable: Similar uniformity with reasonable performance";
  } else {
    recommendation = "Fibonacci distribution recommended: Better balance of uniformity and performance";
  }
  
  console.log('📊 Distribution Comparison Results:');
  console.log('===================================');
  console.log(`Fibonacci - CV: ${fibUniformity.metrics!.coefficientOfVariation.toFixed(4)}, Time: ${fibTime.toFixed(3)}ms`);
  console.log(`Uniform   - CV: ${uniformUniformity.metrics!.coefficientOfVariation.toFixed(4)}, Time: ${uniformTime.toFixed(3)}ms`);
  console.log(`\n💡 ${recommendation}\n`);
  
  return {
    fibonacci: {
      points: fibonacciPoints,
      uniformity: fibUniformity,
      performance: fibTime
    },
    uniform: {
      points: uniformPoints,
      uniformity: uniformUniformity,
      performance: uniformTime
    },
    recommendation
  };
}

// Export for browser console testing
if (typeof window !== 'undefined') {
  (window as any).SphereTests = {
    runComprehensiveTests,
    compareDistributionAlgorithms,
    generateFibonacciSphere,
    generateUniformSphere
  };
}
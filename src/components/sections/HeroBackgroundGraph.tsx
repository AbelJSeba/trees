import { useEffect, useRef } from 'react';

interface HeroBackgroundGraphProps {
  className?: string;
}

export function HeroBackgroundGraph({ className }: HeroBackgroundGraphProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number>();
  const sizeRef = useRef({ width: 0, height: 0 });
  const transformRef = useRef({
    scale: 1,
    offsetX: 0,
    offsetY: 0,
    initialized: false,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const a = 0.003;
    const b = 0.06;
    const u = -0.8;
    let t = 0;

    const updateCanvasSize = () => {
      const parent = canvas.parentElement;
      if (!parent) {
        return;
      }

      const rect = parent.getBoundingClientRect();
      const deviceRatio = window.devicePixelRatio || 1;
      sizeRef.current = { width: rect.width, height: rect.height };

      canvas.width = Math.max(1, Math.floor(rect.width * deviceRatio));
      canvas.height = Math.max(1, Math.floor(rect.height * deviceRatio));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(deviceRatio, deviceRatio);
    };

    updateCanvasSize();

    const resizeObserver = new ResizeObserver(updateCanvasSize);
    resizeObserver.observe(canvas.parentElement ?? canvas);

    const baseColor = { r: 132, g: 199, b: 153 };
    const tipColor = { r: 248, g: 226, b: 124 };
    const colorCache = Array.from({ length: 256 }, (_, index) => {
      const t = index / 255;
      const r = Math.round(baseColor.r + (tipColor.r - baseColor.r) * t);
      const g = Math.round(baseColor.g + (tipColor.g - baseColor.g) * t);
      const bChannel = Math.round(baseColor.b + (tipColor.b - baseColor.b) * t);
      const alpha = 0.65 + (1 - t) * 0.25;
      return `rgba(${r}, ${g}, ${bChannel}, ${alpha.toFixed(3)})`;
    });

    const drawFrame = () => {
      const { width, height } = sizeRef.current;
      if (!width || !height) {
        animationRef.current = requestAnimationFrame(drawFrame);
        return;
      }

      t += Math.PI / 90;

      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = 1;

      const iterations = 40000;
      const points = new Float32Array(iterations * 2);

      let x = 1;
      let y = 1;

      const curve = (value: number) =>
        u * value + (2 * (1 - u) * value * value) / (1 + value * value);

      let minX = Infinity;
      let maxX = -Infinity;
      let minY = Infinity;
      let maxY = -Infinity;

      for (let i = 0; i < iterations; i += 1) {
        const nextX = y + (1 - b * y * y) * a * y + curve(x);
        const nextY = curve(nextX) - x;
        x = nextX;
        y = nextY;

        const magnitude = Math.hypot(x, y);
        const c = t - magnitude / 4;

        const baseX = y * (5 * Math.sin(c) + 11) + 5;
        const baseY = x * (2 * Math.cos(c) + 7) + 9 * Math.sin(y / 4 + t) - 20;

        points[i * 2] = baseX;
        points[i * 2 + 1] = baseY;

        if (baseX < minX) minX = baseX;
        if (baseX > maxX) maxX = baseX;
        if (baseY < minY) minY = baseY;
        if (baseY > maxY) maxY = baseY;
      }

      const rangeX = maxX - minX || 1;
      const rangeY = maxY - minY || 1;

      const paddingRatio = 0.08;
      const effectiveWidth = width * (1 - paddingRatio * 2);
      const effectiveHeight = height * (1 - paddingRatio * 2);

      const targetScale = Math.min(effectiveWidth / rangeX, effectiveHeight / rangeY);

      const targetOffsetX =
        width / 2 - ((minX + maxX) / 2) * targetScale - width * 0.06;
      const targetOffsetY =
        height / 2 - ((minY + maxY) / 2) * targetScale + height * 0.03;

      const smoothing = 0.08;
      const transform = transformRef.current;

      if (!transform.initialized) {
        transform.scale = targetScale;
        transform.offsetX = targetOffsetX;
        transform.offsetY = targetOffsetY;
        transform.initialized = true;
      } else {
        transform.scale += (targetScale - transform.scale) * smoothing;
        transform.offsetX += (targetOffsetX - transform.offsetX) * smoothing;
        transform.offsetY += (targetOffsetY - transform.offsetY) * smoothing;
      }

      const centerX = width / 2;
      const centerY = height / 2;
      const minDimension = Math.min(width, height);
      const radiusTarget = minDimension * 0.48;

      let lastColor = '';

      for (let i = 0; i < iterations; i += 1) {
        const rawX = points[i * 2];
        const rawY = points[i * 2 + 1];

        const px = rawX * transform.scale + transform.offsetX;
        const py = rawY * transform.scale + transform.offsetY;

        const dx = px - centerX;
        const dy = py - centerY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const normalized = Math.min(1, Math.max(0, (distance - radiusTarget * 0.35) / (radiusTarget * 0.75)));
        const mixIndex = Math.min(255, Math.max(0, Math.round(Math.pow(normalized, 1.8) * 255)));
        const color = colorCache[mixIndex];

        if (color !== lastColor) {
          ctx.fillStyle = color;
          lastColor = color;
        }
        ctx.fillRect(px, py, 1.2, 1.2);
      }

      animationRef.current = requestAnimationFrame(drawFrame);
    };

    animationRef.current = requestAnimationFrame(drawFrame);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      resizeObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className={className} />;
}

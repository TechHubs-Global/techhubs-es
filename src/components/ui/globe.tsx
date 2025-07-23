"use client";

import createGlobe, { COBEOptions } from "cobe";
import { memo, useCallback, useEffect, useRef, useState, useMemo } from "react";

import { cn } from "@/lib/utils";

// Memoized default configuration - prevents recreation on every render
const DEFAULT_GLOBE_CONFIG: COBEOptions = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.3,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1],
  markerColor: [251 / 255, 100 / 255, 21 / 255],
  glowColor: [1, 1, 1],
  markers: [
    { location: [51.5074, -0.1278], size: 0.08 }, // London, UK
    { location: [48.8566, 2.3522], size: 0.07 },  // Paris, France
    { location: [40.7128, -74.0060], size: 0.09 }, // New York, USA
    { location: [35.6762, 139.6503], size: 0.08 }, // Tokyo, Japan
    { location: [39.9042, 116.4074], size: 0.08 }, // Beijing, China
    { location: [-23.5505, -46.6333], size: 0.07 }, // São Paulo, Brazil
    { location: [52.5200, 13.4050], size: 0.06 }, // Berlin, Germany
    { location: [1.3521, 103.8198], size: 0.06 },  // Singapore
    { location: [-34.6037, -58.3816], size: 0.06 }, // Buenos Aires, Argentina
    { location: [38.9072, -77.0369], size: 0.07 }, // Washington DC, USA
  ],
} as const;

interface GlobeProps {
  className?: string;
  config?: Partial<COBEOptions>;
}

const Globe = memo(({ className, config }: GlobeProps) => {
  const phiRef = useRef(0);
  const widthRef = useRef(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerInteracting = useRef<number | null>(null);
  const pointerInteractionMovement = useRef(0);
  const globeRef = useRef<ReturnType<typeof createGlobe> | null>(null);
  const [r, setR] = useState(0);

  // Memoize the final config to prevent recreation
  const finalConfig = useMemo(
    () => ({
      ...DEFAULT_GLOBE_CONFIG,
      ...config,
    }),
    [config],
  );

  const updatePointerInteraction = useCallback((value: number | null) => {
    pointerInteracting.current = value;
    if (canvasRef.current) {
      canvasRef.current.style.cursor = value ? "grabbing" : "grab";
    }
  }, []);

  const updateMovement = useCallback((clientX: number) => {
    if (pointerInteracting.current !== null) {
      const delta = clientX - pointerInteracting.current;
      pointerInteractionMovement.current = delta;
      setR(delta / 200);
    }
  }, []);

  const onRender = useCallback(
    (state: Record<string, number>) => {
      if (!pointerInteracting.current) phiRef.current += 0.005;
      state.phi = phiRef.current + r;
      state.width = widthRef.current * 2;
      state.height = widthRef.current * 2;
    },
    [r],
  );

  const onResize = useCallback(() => {
    if (canvasRef.current) {
      widthRef.current = canvasRef.current.offsetWidth;
    }
  }, []);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setR((prev) => prev - 0.1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setR((prev) => prev + 0.1);
    }
  }, []);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      updateMovement(e.clientX);
    },
    [updateMovement],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (e.touches[0]) {
        updateMovement(e.touches[0].clientX);
      }
    },
    [updateMovement],
  );

  const handlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      updatePointerInteraction(e.clientX - pointerInteractionMovement.current);
    },
    [updatePointerInteraction],
  );

  const handlePointerUp = useCallback(() => {
    updatePointerInteraction(null);
  }, [updatePointerInteraction]);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Add resize listener with cleanup
    window.addEventListener("resize", onResize);
    onResize();

    // Create globe with memoized config
    globeRef.current = createGlobe(canvasRef.current, {
      ...finalConfig,
      width: widthRef.current * 2,
      height: widthRef.current * 2,
      onRender,
    });

    // Fade in animation
    const timer = setTimeout(() => {
      if (canvasRef.current) {
        canvasRef.current.style.opacity = "1";
      }
    }, 100);

    // Cleanup function
    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(timer);
      if (globeRef.current) {
        globeRef.current.destroy();
        globeRef.current = null;
      }
    };
  }, [finalConfig, onRender, onResize]);

  return (
    <div
      className={cn(
        "absolute inset-0 mx-auto aspect-[1/1] w-full max-w-[600px]",
        className,
      )}
      role="img"
      aria-label="Interactive 3D globe showing global tech community locations"
    >
      <canvas
        className="size-full opacity-0 transition-opacity duration-500 [contain:layout_paint_size]"
        ref={canvasRef}
        aria-label="Interactive globe visualization - Use arrow keys to rotate"
        tabIndex={0}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerOut={handlePointerUp}
        onMouseMove={handleMouseMove}
        onTouchMove={handleTouchMove}
        onKeyDown={handleKeyDown}
      />
    </div>
  );
});

Globe.displayName = "Globe";

export { Globe, DEFAULT_GLOBE_CONFIG };
export type { GlobeProps };

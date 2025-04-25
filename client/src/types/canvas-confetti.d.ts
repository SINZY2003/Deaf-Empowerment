declare module 'canvas-confetti' {
  export type Options = {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    origin?: { x: number; y: number };
    colors?: string[];
    shapes?: ('square' | 'circle')[];
    scalar?: number;
    zIndex?: number;
    disableForReducedMotion?: boolean;
  };

  function canvasConfetti(options?: Options): Promise<null>;
  
  namespace canvasConfetti {
    function reset(): void;
    function create(canvas: HTMLCanvasElement, options?: { resize?: boolean }): (options?: Options) => Promise<null>;
  }
  
  export default canvasConfetti;
}
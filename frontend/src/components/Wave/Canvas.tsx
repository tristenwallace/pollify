import { useRef, useEffect, useState } from 'react';
import { CanvasContext } from '../../hooks/useCanvas';
import useResponsiveSize from '../../hooks/useResponsiveSize';
import Wave from './Wave';

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { width } = useResponsiveSize();
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);

  // Set canvas height based on screen width
  const canvasHeight = width < 768 ? 150 : 220;

  useEffect(() => {
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      setContext(ctx);
    }
  }, []);

  return (
    <CanvasContext.Provider value={{ context }}>
      <canvas
        id="canvas"
        ref={canvasRef}
        width={width}
        height={canvasHeight}
        style={{ display: 'block', width: '100%', height: 'auto' }}
      ></canvas>
      <Wave />
    </CanvasContext.Provider>
  );
};

export default Canvas;

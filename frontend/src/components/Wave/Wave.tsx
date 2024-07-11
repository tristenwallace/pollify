import { useEffect, useRef, useMemo } from 'react';
import { useCanvasContext } from '../../hooks/useCanvas';
import useResponsiveSize from '../../hooks/useResponsiveSize';
import WaveObj from '../../utils/wave';

const Wave: React.FC = () => {
  const { context } = useCanvasContext();
  const { width } = useResponsiveSize();
  const height = 600; // Adjust height as needed
  const startTimeRef = useRef<number | null>(null); // Reference to track the start time

  // Memoize waves to prevent recreation on every render
  const waves = useMemo(
    () => ({
      frontWave: new WaveObj(
        [0.0211, 0.028, 0.015],
        'rgba(196, 190, 171, 0.2)',
      ),
      backWave: new WaveObj([0.0122, 0.018, 0.005], 'rgba(252, 219, 111, 0.2)'),
    }),
    [],
  );

  useEffect(() => {
    const render = (timestamp: number) => {
      if (context) {
        if (!startTimeRef.current) {
          startTimeRef.current = timestamp;
        }
        const elapsedTime = (timestamp - startTimeRef.current) / 1000; // Elapsed time in seconds

        context.clearRect(0, 0, width, height); // Clear the canvas for each frame
        Object.values(waves).forEach(wave =>
          wave.draw(context, width, height, elapsedTime),
        ); // Draw each wave

        requestAnimationFrame(render); // Request the next animation frame
      }
    };

    const animationFrameId = requestAnimationFrame(render); // Start the animation

    return () => {
      cancelAnimationFrame(animationFrameId); // Clean up the animation frame
      startTimeRef.current = null; // Reset start time when component unmounts
    };
  }, [context, width, height, waves]);

  return null;
};

export default Wave;

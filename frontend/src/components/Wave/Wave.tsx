import { useEffect, useRef, useMemo } from 'react';
import { useCanvasContext } from '../../hooks/useCanvas';
import useResponsiveSize from '../../hooks/useResponsiveSize';
import WaveObj from '../../utils/wave';

const Wave = () => {
  const { context } = useCanvasContext();
  const { width } = useResponsiveSize();
  const height = 600; // Adjust height as needed
  const startTimeRef = useRef<number | null>(null); // Reference to keep track of the start time

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

        context.clearRect(0, 0, width, height);
        Object.values(waves).forEach(wave =>
          wave.draw(context, width, height, elapsedTime),
        );

        requestAnimationFrame(render);
      }
    };

    const animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      startTimeRef.current = null; // Reset start time when component unmounts
    };
  }, [context, width, height, waves]);

  return null;
};

export default Wave;

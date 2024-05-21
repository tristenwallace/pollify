import { createContext, useContext } from 'react';

export const CanvasContext = createContext<{
  context: CanvasRenderingContext2D | null;
}>({
  context: null,
});

export const useCanvasContext = () => {
  return useContext(CanvasContext);
};

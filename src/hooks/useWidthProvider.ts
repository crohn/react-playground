import { useState, useCallback, RefObject } from 'react';
import { useWindowResize } from './useWindowResize';

interface Props {
  containerRef: RefObject<HTMLElement>;
  windowResizeThrottle?: number;
}

export const useWidthProvider = ({ containerRef, windowResizeThrottle = 250 }: Props): number => {
  const [width, setWidth] = useState<number>(0);

  const onWindowResize = useCallback(() => {
    if (!containerRef.current) return;

    setWidth(containerRef.current.offsetWidth);
  }, [containerRef]);

  useWindowResize({ onWindowResize, windowResizeThrottle });

  return width;
};

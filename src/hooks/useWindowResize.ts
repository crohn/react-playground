import { useCallback, useLayoutEffect, useRef } from 'react';

interface Props {
  onWindowResize: () => void;
  windowResizeThrottle?: number;
}

export const useWindowResize = ({ onWindowResize, windowResizeThrottle = 250 }: Props): void => {
  const mounted = useRef(false);
  const timer = useRef<number>();

  const handleWindowResize = useCallback(() => {
    if (!mounted.current) return;

    if (timer.current) window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      onWindowResize();
    }, windowResizeThrottle);
  }, [onWindowResize, windowResizeThrottle]);

  useLayoutEffect(() => {
    mounted.current = true;
    window.addEventListener('resize', handleWindowResize);
    handleWindowResize();

    return () => {
      mounted.current = false;
      window.removeEventListener('resize', handleWindowResize);
    };
  }, [handleWindowResize]);
};

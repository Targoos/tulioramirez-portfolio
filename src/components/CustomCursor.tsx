import { useState, useEffect, useRef } from 'react';

const LERP_FACTOR = 0.12;

export const CustomCursor = () => {
  const [isTouch, setIsTouch] = useState(false);

  const dotRef = useRef<HTMLDivElement>(null);
  const ringDomRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    setIsTouch(isTouchDevice);

    if (isTouchDevice) {
      document.body.style.cursor = 'auto';
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
    };

    const animate = () => {
      ringPos.current.x += (mouseRef.current.x - ringPos.current.x) * LERP_FACTOR;
      ringPos.current.y += (mouseRef.current.y - ringPos.current.y) * LERP_FACTOR;

      if (ringDomRef.current) {
        ringDomRef.current.style.left = `${ringPos.current.x}px`;
        ringDomRef.current.style.top = `${ringPos.current.y}px`;
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] w-2 h-2 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2"
      />
      <div
        ref={ringDomRef}
        className="fixed pointer-events-none z-[9998] w-8 h-8 border border-primary rounded-full bg-transparent opacity-50 -translate-x-1/2 -translate-y-1/2"
      />
    </>
  );
};

import { useState, useEffect, useRef } from 'react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [ringPosition, setRingPosition] = useState({ x: 0, y: 0 });
  const [isTouch, setIsTouch] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;
    setIsTouch(isTouchDevice);

    if (isTouchDevice) {
      document.body.style.cursor = 'auto';
      return;
    }

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      setPosition({ x: clientX, y: clientY });

      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setRingPosition({ x: clientX, y: clientY });
      }, 80);
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  if (isTouch) return null;

  return (
    <>
      <div
        className="fixed pointer-events-none z-[9999] w-2 h-2 bg-primary rounded-full -translate-x-1/2 -translate-y-1/2"
        style={{ left: position.x, top: position.y }}
      />
      <div
        className="fixed pointer-events-none z-[9998] w-8 h-8 border border-primary rounded-full bg-transparent opacity-50 -translate-x-1/2 -translate-y-1/2 transition-[left,top] duration-150 ease-out"
        style={{ left: ringPosition.x, top: ringPosition.y }}
      />
    </>
  );
};

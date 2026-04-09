import { useState, useEffect } from "react";

export function useScrollThreshold(threshold: number): boolean {
  const [isPast, setIsPast] = useState(() => window.scrollY > threshold);

  useEffect(() => {
    const handler = () => setIsPast(window.scrollY > threshold);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, [threshold]);

  return isPast;
}

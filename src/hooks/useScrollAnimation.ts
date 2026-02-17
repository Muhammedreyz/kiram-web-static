import { useEffect, useRef, useState, useCallback } from "react";

export function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isInView };
}

export function useActiveStep(stepCount: number) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const containerTop = rect.top;
    const containerHeight = rect.height;

    const scrollProgress = Math.max(
      0,
      Math.min(1, (viewportHeight * 0.4 - containerTop) / containerHeight)
    );

    const step = Math.min(
      stepCount - 1,
      Math.floor(scrollProgress * stepCount)
    );
    setActiveStep(step);
  }, [stepCount]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return { containerRef, activeStep };
}

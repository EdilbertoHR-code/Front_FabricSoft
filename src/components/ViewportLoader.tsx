import React, { useState, useEffect, useRef } from "react";

interface ViewportLoaderProps {
  children: React.ReactNode;
  height?: number | string;
}

export default function ViewportLoader({ children, height = 400 }: ViewportLoaderProps) {
  const [isInView, setIsInView] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: "300px 0px", // Carga anticipadamente a 300px del viewport
        threshold: 0,
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={ref}
      style={!isInView ? { minHeight: height } : undefined}
      className="w-full"
    >
      {isInView ? children : null}
    </div>
  );
}

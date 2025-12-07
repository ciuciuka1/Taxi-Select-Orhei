import React, { useEffect, useRef, useState } from 'react';

const Spotlight: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  const mousePos = useRef({ x: 0, y: 0 });
  const cursorPos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Only enable on desktop
    const isDesktop = window.matchMedia("(pointer: fine)").matches;
    if (!isDesktop) return;

    const onMouseMove = (e: MouseEvent) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);
    };

    const onMouseLeave = () => setIsVisible(false);
    const onMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    let rafId: number;
    const animate = () => {
      // Smooth follow logic (Lerp)
      const lerp = (start: number, end: number, factor: number) => {
        return start + (end - start) * factor;
      };

      // Factor 0.2 for a snappy but smooth feel
      cursorPos.current.x = lerp(cursorPos.current.x, mousePos.current.x, 0.2);
      cursorPos.current.y = lerp(cursorPos.current.y, mousePos.current.y, 0.2);

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${cursorPos.current.x}px, ${cursorPos.current.y}px)`;
      }

      rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      cancelAnimationFrame(rafId);
    };
  }, [isVisible]);

  if (typeof window !== 'undefined' && !window.matchMedia("(pointer: fine)").matches) {
    return null;
  }

  return (
    <div 
      ref={cursorRef}
      className={`pointer-events-none fixed top-0 left-0 z-[9999] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{ 
        willChange: 'transform',
        // Offset to align the tip of the arrow with the actual mouse coordinates
        marginLeft: '-2px', 
        marginTop: '-2px'
      }}
    >
      {/* Custom SVG Arrow Cursor - Gold Outline, Dark Fill */}
      <svg 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        className="drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
      >
        <path 
          d="M3 3L10.07 19.97L12.58 12.58L19.97 10.07L3 3Z" 
          fill="#020617" 
          fillOpacity="0.8"
          stroke="#F5C45E" 
          strokeWidth="1.5" 
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
};

export default Spotlight;
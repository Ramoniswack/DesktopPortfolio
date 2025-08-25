import React, { useEffect, useRef, useState } from 'react';

interface CursorTrail {
  x: number;
  y: number;
  opacity: number;
  id: number;
}

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [trails, setTrails] = useState<CursorTrail[]>([]);
  const trailIdRef = useRef(0);

  useEffect(() => {
    let animationFrame: number;

    const updateCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      const isClickable = window.getComputedStyle(target).cursor === 'pointer' || 
                          target.tagName === 'BUTTON' || 
                          target.tagName === 'A' ||
                          target.getAttribute('role') === 'button' ||
                          target.classList.contains('cursor-pointer');
      
      setIsPointer(isClickable);

      // Add trail point (reduced frequency for better performance)
      if (Math.random() > 0.7) {
        setTrails(prev => {
          const newTrail: CursorTrail = {
            x: e.clientX,
            y: e.clientY,
            opacity: 0.8,
            id: trailIdRef.current++
          };
          return [...prev.slice(-5), newTrail]; // Reduced trail length
        });
      }
    };

    const animate = () => {
      setTrails(prev => 
        prev.map(trail => ({
          ...trail,
          opacity: trail.opacity * 0.85
        })).filter(trail => trail.opacity > 0.05)
      );
      animationFrame = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', updateCursor);
    animationFrame = requestAnimationFrame(animate);

    // Set default cursor style for desktop container
    const desktopContainer = document.querySelector('.desktop-container');
    if (desktopContainer) {
      (desktopContainer as HTMLElement).style.cursor = 'none';
    }

    return () => {
      window.removeEventListener('mousemove', updateCursor);
      cancelAnimationFrame(animationFrame);
      // Restore cursor when component unmounts
      const desktopContainer = document.querySelector('.desktop-container');
      if (desktopContainer) {
        (desktopContainer as HTMLElement).style.cursor = 'auto';
      }
    };
  }, []);

  // Hide on mobile
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) return null;

  return (
    <>
      {/* Main Cursor */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none z-[10000]"
        style={{
          left: position.x - 6,
          top: position.y - 6,
          transform: isPointer ? 'scale(1.5)' : 'scale(1)',
          transition: 'transform 0.15s ease-out',
        }}
      >
        <div
          className="w-3 h-3 rounded-full border"
          style={{
            backgroundColor: isPointer ? 'var(--sky-blue)' : 'white',
            borderColor: isPointer ? 'var(--steel-blue)' : 'var(--ocean-blue)',
            borderWidth: '1px',
          }}
        />
      </div>

      {/* Trail particles */}
      {trails.map((trail, index) => (
        <div
          key={trail.id}
          className="fixed pointer-events-none w-1 h-1 rounded-full"
          style={{
            left: trail.x - 2,
            top: trail.y - 2,
            opacity: trail.opacity,
            backgroundColor: 'var(--sky-blue)',
            transform: `scale(${1 - index * 0.1})`,
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;
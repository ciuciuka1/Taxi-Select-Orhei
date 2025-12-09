import React, { useMemo } from 'react';
import Galaxy from './Galaxy';

const HyperCanvas: React.FC = () => {
  const options = useMemo(() => ({
    hueShift: 20, // Gold/Orange tone
    density: 2.0, // Reduced density for performance
    size: 5.0,    // Large particles to compensate for no aura
    glowIntensity: 0.2, // Balanced intensity: visible but not a blurry aura
    starSpeed: 2.5, // Increased speed for faster movement
    rotationSpeed: 0.05,
    transparent: true,
    saturation: 0.6,
    // Disable heavy mouse interaction calculations for ultra-smoothness
    mouseInteraction: false, 
    mouseRepulsion: false,
  }), []);

  return (
    <div className="absolute inset-0 w-full h-full bg-[#020617] pointer-events-none transform-gpu">
      <Galaxy {...options} />
    </div>
  );
};

export default HyperCanvas;
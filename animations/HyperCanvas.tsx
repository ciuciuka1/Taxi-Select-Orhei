
import React, { useMemo } from 'react';
import Galaxy from './Galaxy';

const HyperCanvas: React.FC = () => {
  const options = useMemo(() => ({
    hueShift: 20, // Gold/Orange tone
    density: 1.5,
    glowIntensity: 0.8,
    starSpeed: 0.5,
    rotationSpeed: 0.05,
    transparent: true,
    saturation: 0.8,
    // Explicitly disable mouse interaction for performance stability
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

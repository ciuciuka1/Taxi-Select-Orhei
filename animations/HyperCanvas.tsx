import React from 'react';
import Galaxy from './Galaxy';

const HyperCanvas: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#020617] pointer-events-none">
      <Galaxy 
        hueShift={20} // Adjusted for Orange/Gold tone (approx 20-30 hue shift from blue base)
        density={1.5}
        glowIntensity={0.8}
        starSpeed={0.5}
        rotationSpeed={0.05}
        transparent={true}
        saturation={0.8}
        mouseInteraction={false}
        mouseRepulsion={false}
      />
    </div>
  );
};

export default HyperCanvas;
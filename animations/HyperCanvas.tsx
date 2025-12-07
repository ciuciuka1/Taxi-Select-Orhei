import React from 'react';
import Galaxy from './Galaxy';

const HyperCanvas: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full bg-[#020617]">
      <Galaxy 
        // hueShift around 30-40 gives a golden/orange tint usually if base is bluish
        // Default base in shader seems to mix RGB. 
        // Trying 20 to shift towards Gold/Orange. 
        hueShift={20} 
        density={1.5}
        glowIntensity={0.8}
        starSpeed={0.5}
        rotationSpeed={0.05}
        transparent={true}
        saturation={0.8} // Increase saturation for vibrant gold
      />
    </div>
  );
};

export default HyperCanvas;
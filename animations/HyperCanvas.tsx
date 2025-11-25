import React, { useMemo, useState, useEffect } from 'react';
import Hyperspeed from './Hyperspeed';

const HyperCanvas: React.FC = () => {
  // Detect mobile screen width to optimize object count
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const options = useMemo(() => ({
    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    // MOBILE OPTIMIZATION:
    // Reduce geometry count significantly on mobile to allow for High-DPI rendering (Anti-Aliasing).
    // On desktop: 40 pairs. On mobile: 16 pairs.
    // This keeps 60FPS even with SMAA enabled.
    lightPairsPerRoadWay: isMobile ? 16 : 40, 
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.03, 400 * 0.2],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.8, 0.8],
    carFloorSeparation: [0, 5],
    colors: {
      roadColor: 0x080808, 
      islandColor: 0x0a0a0a, 
      background: 0x020617, 
      leftCars: [0xFFFFFF, 0xE2E8F0, 0xF5C45E], 
      rightCars: [0xDC2626, 0x991B1B, 0x7F1D1D], 
    }
  }), [isMobile]);

  return (
    <Hyperspeed effectOptions={options} />
  );
};

export default HyperCanvas;
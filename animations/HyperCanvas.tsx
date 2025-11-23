import React, { useMemo } from 'react';
import Hyperspeed from './Hyperspeed';

const HyperCanvas: React.FC = () => {
  const options = useMemo(() => ({
    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    lightPairsPerRoadWay: 40,
    movingAwaySpeed: [60, 80],
    movingCloserSpeed: [-120, -160],
    carLightsLength: [400 * 0.03, 400 * 0.2],
    carLightsRadius: [0.05, 0.14],
    carWidthPercentage: [0.3, 0.5],
    carShiftX: [-0.8, 0.8],
    carFloorSeparation: [0, 5],
    colors: {
      roadColor: 0x080808, // Pitch Black Asphalt
      islandColor: 0x0a0a0a, // Dark Grey separation
      background: 0x020617, // Brand Dark
      leftCars: [0xFFFFFF, 0xE2E8F0, 0xF5C45E], // White, Silver, Gold
      rightCars: [0xDC2626, 0x991B1B, 0x7F1D1D], // Red shades
    }
  }), []);

  return (
    <Hyperspeed effectOptions={options} />
  );
};

export default HyperCanvas;
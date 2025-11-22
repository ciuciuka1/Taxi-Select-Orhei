import React, { useMemo } from 'react';
import Hyperspeed from './Hyperspeed';

const HyperCanvas: React.FC = () => {
  // Memoize options to prevent re-rendering the heavy 3D scene on every parent update
  const options = useMemo(() => ({
    onSpeedUp: () => { },
    onSlowDown: () => { },
    distortion: 'turbulentDistortion',
    length: 400,
    roadWidth: 10,
    islandWidth: 2,
    lanesPerRoad: 3,
    fov: 90,
    fovSpeedUp: 150,
    speedUp: 2,
    carLightsFade: 0.4,
    totalSideLightSticks: 20,
    lightPairsPerRoadWay: 40,
    shoulderLinesWidthPercentage: 0.05,
    brokenLinesWidthPercentage: 0.1,
    brokenLinesLengthPercentage: 0.5,
    lightStickWidth: [0.12, 0.5],
    lightStickHeight: [1.3, 1.7],
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
      shoulderLines: 0x334155, // Slate Grey
      brokenLines: 0x475569, // Steel Grey
      leftCars: [0xFFFFFF, 0xE2E8F0, 0xF5C45E], // White, Silver, Gold
      rightCars: [0xDC2626, 0x991B1B, 0x7F1D1D], // Red shades
      sticks: 0xF5C45E, // Brand Gold
    }
  }), []);

  return (
    <Hyperspeed effectOptions={options} />
  );
};

export default HyperCanvas;
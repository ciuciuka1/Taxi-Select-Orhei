import React from 'react';
import Hyperspeed from './Hyperspeed';

const HyperCanvas: React.FC = () => {
  return (
    <Hyperspeed
      effectOptions={{
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
          // Adjusted environment colors to blend seamlessly with the #102E50 background
          roadColor: 0x081424, // Deep Navy Black (instead of pure black) for smoother transition
          islandColor: 0x0a1a2a, // Dark Navy Island
          background: 0x102E50, // Brand Dark (Main Background)
          
          // Road markings
          shoulderLines: 0xF5C45E, // Brand Gold
          brokenLines: 0xA5B5C5, // Light Blue-Grey (Subtle contrast)
          
          // Traffic Colors - Logical & Branded
          // Left side (Oncoming): Headlights - White & Gold
          leftCars: [0xFFFFFF, 0xF5C45E, 0xF8E3A0], 
          
          // Right side (Departing): Taillights - Brand Red & Orange
          rightCars: [0xBE3D2A, 0xE78B48, 0xD35400],
          
          // Vertical Sticks - Defining the tunnel with Brand Gold
          sticks: 0xF5C45E, 
        }
      }}
    />
  );
};

export default HyperCanvas;
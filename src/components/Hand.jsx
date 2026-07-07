import React from 'react';
import { useControls, folder } from 'leva';
import { Palm } from './Palm';
import { Finger } from './Finger';

export function Hand({ setControlsEnabled }) {
  const [thumbAngles, setThumbAngles] = useControls(() => ({
    Thumb: folder({
      mcp: { value: 0, min: -Math.PI/2, max: Math.PI/4, step: 0.01 },
      pip: { value: 0, min: -Math.PI/2, max: 0, step: 0.01 },
      dip: { value: 0, min: -Math.PI/2, max: 0, step: 0.01 }
    })
  }));

  const [indexAngles, setIndexAngles] = useControls(() => ({
    'Index Finger': folder({
      mcp: { value: 0, min: -Math.PI/2, max: Math.PI/4, step: 0.01 },
      pip: { value: 0, min: -Math.PI/2, max: 0, step: 0.01 },
      dip: { value: 0, min: -Math.PI/2, max: 0, step: 0.01 }
    })
  }));

  const [middleAngles, setMiddleAngles] = useControls(() => ({
    'Middle Finger': folder({
      mcp: { value: 0, min: -Math.PI/2, max: Math.PI/4, step: 0.01 },
      pip: { value: 0, min: -Math.PI/2, max: 0, step: 0.01 },
      dip: { value: 0, min: -Math.PI/2, max: 0, step: 0.01 }
    })
  }));

  const [ringAngles, setRingAngles] = useControls(() => ({
    'Ring Finger': folder({
      mcp: { value: 0, min: -Math.PI/2, max: Math.PI/4, step: 0.01 },
      pip: { value: 0, min: -Math.PI/2, max: 0, step: 0.01 },
      dip: { value: 0, min: -Math.PI/2, max: 0, step: 0.01 }
    })
  }));

  const [pinkyAngles, setPinkyAngles] = useControls(() => ({
    'Pinky Finger': folder({
      mcp: { value: 0, min: -Math.PI/2, max: Math.PI/4, step: 0.01 },
      pip: { value: 0, min: -Math.PI/2, max: 0, step: 0.01 },
      dip: { value: 0, min: -Math.PI/2, max: 0, step: 0.01 }
    })
  }));

  const color = "#fcd4b8";

  const handleChangeAngle = (setAngles) => (jointIndex, newValue) => {
    const keys = ['mcp', 'pip', 'dip'];
    const key = keys[jointIndex];
    
    // Clamp the value
    const max = jointIndex === 0 ? Math.PI/4 : 0;
    const min = -Math.PI/2;
    if (newValue > max) newValue = max;
    if (newValue < min) newValue = min;
    
    setAngles({ [key]: newValue });
  };

  return (
    <group>
      <Palm color={color} />
      
      {/* Index */}
      <Finger 
        position={[-1.1, 0, 1.5]} 
        jointAngles={[indexAngles.mcp, indexAngles.pip, indexAngles.dip]} 
        color={color} 
        onChangeAngle={handleChangeAngle(setIndexAngles)}
        setControlsEnabled={setControlsEnabled}
      />
      {/* Middle */}
      <Finger 
        position={[-0.3, 0, 1.5]} 
        jointAngles={[middleAngles.mcp, middleAngles.pip, middleAngles.dip]} 
        color={color} 
        scale={1.1} 
        onChangeAngle={handleChangeAngle(setMiddleAngles)}
        setControlsEnabled={setControlsEnabled}
      />
      {/* Ring */}
      <Finger 
        position={[0.5, 0, 1.5]} 
        jointAngles={[ringAngles.mcp, ringAngles.pip, ringAngles.dip]} 
        color={color} 
        scale={0.95}
        onChangeAngle={handleChangeAngle(setRingAngles)}
        setControlsEnabled={setControlsEnabled}
      />
      {/* Pinky */}
      <Finger 
        position={[1.3, 0, 1.5]} 
        jointAngles={[pinkyAngles.mcp, pinkyAngles.pip, pinkyAngles.dip]} 
        color={color} 
        scale={0.8}
        onChangeAngle={handleChangeAngle(setPinkyAngles)}
        setControlsEnabled={setControlsEnabled}
      />
      
      {/* Thumb */}
      <Finger 
        position={[-1.7, 0, 0]} 
        rotation={[0, -Math.PI/3.5, 0]} 
        jointAngles={[thumbAngles.mcp, thumbAngles.pip, thumbAngles.dip]} 
        color={color} 
        scale={0.9}
        onChangeAngle={handleChangeAngle(setThumbAngles)}
        setControlsEnabled={setControlsEnabled}
      />
    </group>
  );
}

import React, { useRef } from 'react';
import { useDrag } from '@use-gesture/react';

function SegmentSpikes({ segL, segR, scale }) {
  const spikeH = 0.2 * scale;
  const spikeR = 0.05 * scale;
  const numSpikes = 3;
  const spikes = [];
  
  for (let i = 1; i <= numSpikes; i++) {
    const zPos = (segL / (numSpikes + 1)) * i;
    for (let j = 0; j < 4; j++) {
      const angle = (j * Math.PI) / 2;
      const x = -Math.sin(angle) * (segR + spikeH / 2 - 0.02);
      const y = Math.cos(angle) * (segR + spikeH / 2 - 0.02);
      
      spikes.push(
        <mesh key={`${i}-${j}`} position={[x, y, zPos]} rotation={[0, 0, angle]}>
          <coneGeometry args={[spikeR, spikeH, 8]} />
          <meshStandardMaterial color="#8b0000" />
        </mesh>
      );
    }
  }
  return <>{spikes}</>;
}

export function Finger({ position, rotation=[0,0,0], jointAngles = [0, 0, 0], color = "orange", scale = 1, onChangeAngle, setControlsEnabled }) {
  const segL = 1.2 * scale;
  const segR = 0.25 * scale;
  
  const initialAngles = useRef([0, 0, 0]);

  const bindJoint = (index) => useDrag(({ movement: [dx, dy], first, last, event }) => {
    event.stopPropagation();
    if (first) {
      if (setControlsEnabled) setControlsEnabled(false);
      initialAngles.current[index] = jointAngles[index];
    }
    if (last) {
      if (setControlsEnabled) setControlsEnabled(true);
    }
    
    // Use the larger movement (x or y) so it works regardless of camera angle
    const movementVal = Math.abs(dx) > Math.abs(dy) ? -dx : -dy;
    
    // Increased sensitivity for mobile (60px = 90 degrees)
    const deltaAngle = movementVal * (Math.PI / 2 / 60); 
    
    if (onChangeAngle) {
      onChangeAngle(index, initialAngles.current[index] + deltaAngle);
    }
  }, { pointerEvents: true });

  // A larger invisible radius for easier touch on mobile
  const hitRadius = segR * 3.5;

  return (
    <group position={position} rotation={rotation}>
      {/* Base Joint */}
      <group rotation={[jointAngles[0], 0, 0]}>
        <mesh position={[0, 0, segL / 2]} rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[segR, segR, segL, 16]} />
          <meshStandardMaterial color={color} />
        </mesh>
        {/* Hitbox */}
        <mesh position={[0, 0, segL / 2]} rotation={[Math.PI / 2, 0, 0]} {...bindJoint(0)}>
          <cylinderGeometry args={[hitRadius, hitRadius, segL, 8]} />
          <meshBasicMaterial visible={false} />
        </mesh>
        
        <SegmentSpikes segL={segL} segR={segR} scale={scale} />
        
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[segR * 1.1, 16, 16]} />
          <meshStandardMaterial color="#888" />
        </mesh>
        {/* Hitbox */}
        <mesh position={[0, 0, 0]} {...bindJoint(0)}>
          <sphereGeometry args={[hitRadius, 16, 16]} />
          <meshBasicMaterial visible={false} />
        </mesh>

        {/* Middle Joint */}
        <group position={[0, 0, segL]} rotation={[jointAngles[1], 0, 0]}>
          <mesh position={[0, 0, segL / 2]} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[segR, segR, segL, 16]} />
            <meshStandardMaterial color={color} />
          </mesh>
          {/* Hitbox */}
          <mesh position={[0, 0, segL / 2]} rotation={[Math.PI / 2, 0, 0]} {...bindJoint(1)}>
            <cylinderGeometry args={[hitRadius, hitRadius, segL, 8]} />
            <meshBasicMaterial visible={false} />
          </mesh>
          
          <SegmentSpikes segL={segL} segR={segR} scale={scale} />
          
          <mesh position={[0, 0, 0]}>
            <sphereGeometry args={[segR * 1.1, 16, 16]} />
            <meshStandardMaterial color="#888" />
          </mesh>
          {/* Hitbox */}
          <mesh position={[0, 0, 0]} {...bindJoint(1)}>
            <sphereGeometry args={[hitRadius, 16, 16]} />
            <meshBasicMaterial visible={false} />
          </mesh>

          {/* Distal Joint */}
          <group position={[0, 0, segL]} rotation={[jointAngles[2], 0, 0]}>
            <mesh position={[0, 0, segL * 0.4]} rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[segR * 0.9, segR, segL * 0.8, 16]} />
              <meshStandardMaterial color={color} />
            </mesh>
            {/* Hitbox */}
            <mesh position={[0, 0, segL * 0.4]} rotation={[Math.PI / 2, 0, 0]} {...bindJoint(2)}>
              <cylinderGeometry args={[hitRadius, hitRadius, segL * 0.8, 8]} />
              <meshBasicMaterial visible={false} />
            </mesh>
            
            <SegmentSpikes segL={segL * 0.8} segR={segR * 0.9} scale={scale} />
            
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[segR * 1.1, 16, 16]} />
              <meshStandardMaterial color="#888" />
            </mesh>
            {/* Hitbox */}
            <mesh position={[0, 0, 0]} {...bindJoint(2)}>
              <sphereGeometry args={[hitRadius, 16, 16]} />
              <meshBasicMaterial visible={false} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
}

import React from 'react';

export function Palm({ position = [0, 0, 0], color = "#ffcc99" }) {
  return (
    <mesh position={position}>
      <boxGeometry args={[3.2, 0.5, 3]} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

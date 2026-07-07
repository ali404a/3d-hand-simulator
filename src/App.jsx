import React, { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Hand } from './components/Hand';
import './index.css';

function App() {
  const [controlsEnabled, setControlsEnabled] = useState(true);

  return (
    <div style={{ width: '100vw', height: '100vh', background: '#202020' }}>
      <Canvas camera={{ position: [0, 5, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        
        <Hand setControlsEnabled={setControlsEnabled} />
        
        <OrbitControls enabled={controlsEnabled} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

export default App;

import React, {FunctionComponent, useEffect, useRef} from 'react';
import startSoundWaves from './startSoundWaves';

export const SoundWaves: FunctionComponent = () => {
  const canvasRef = useRef(null as null|HTMLCanvasElement)

  useEffect(() => {
    const canvas = canvasRef.current;
    if(canvas) {
      startSoundWaves(canvas)
    }
  }, [])

  return <canvas width="1000px" height="500px" className="SoundWaves" ref={canvasRef}/>
}

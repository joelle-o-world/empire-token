import React, {FunctionComponent, useEffect, useRef} from 'react';

import './Countdown.sass'

const PHI = 2 * Math.PI;
const halfPI = Math.PI/2

export const Countdown: FunctionComponent = () => {
  return <div className="Countdown">
    <div>
      <CountdownClock fromTime={new Date(2021, 1,1)} interval={24*60*60*1000} modulo={Infinity} />
      <h3>Days</h3>
    </div>
    <div>
      <CountdownClock fromTime={new Date(2021, 1,1)} interval={60*60*1000} modulo={24} />
      <h3>Hours</h3>
    </div>
    <div>
      <CountdownClock fromTime={new Date(2021, 1,1)} interval={60*1000} modulo={60} />
      <h3>Minutes</h3>
    </div>
  </div>
}
export default Countdown

export interface CountdownClockProps {
  fromTime: Date;
  interval: number;
  modulo?: number
}
export const CountdownClock: FunctionComponent<CountdownClockProps> = ({fromTime, interval, modulo = 1}) => {

  const zeroTimestamp = fromTime.getTime()

  const radius = 50
  const width = 2 * radius + 10
  const height = 2 * radius + 10;

  const canvasRef = useRef(null as null|HTMLCanvasElement)

  useEffect(() => {
    const canvas = canvasRef.current;
    if(canvas) {
      const ctx = canvas.getContext('2d')
      if(ctx) {
        const gradient = ctx.createLinearGradient(width/2, 0, width/2, height)
        gradient.addColorStop(0, "#18E9D9");
        gradient.addColorStop(0.45, "#4FA4E1");
        gradient.addColorStop(1, "#875FEA");

        const draw = () => {
          ctx.clearRect(0,0,width, height)

          let cx = width / 2;
          let cy = height / 2;

          ctx.beginPath();
          ctx.arc(cx, cy, radius, 0, PHI)
          ctx.strokeStyle = "#707070"
          ctx.lineWidth = 1
          ctx.stroke();

          let now = Date.now()
          let elapsed = now-zeroTimestamp
          let n = Math.floor(elapsed / interval)
          let angle = PHI * (elapsed-n*interval)/interval - halfPI

          ctx.beginPath();
          ctx.arc(cx, cy, radius, -halfPI,angle)
          ctx.strokeStyle = gradient
          ctx.lineWidth = 3
          ctx.stroke();

          let x = cx + Math.cos(angle) * radius
          let y = cx + Math.sin(angle) * radius

          ctx.beginPath();
          ctx.arc(x,y, 5, 0, PHI)
          ctx.fillStyle = '#18E9D9'
          ctx.fill()

          ctx.fillStyle = 'white'
          ctx.textAlign = 'center'
          ctx.font = '30px sans-serif'
          ctx.textBaseline = 'middle'
          ctx.fillText(String(n % modulo), cx,cy, radius*2-10)

          window.requestAnimationFrame(draw);
        }

        draw()
      }
    }
  }, [canvasRef.current])

  return <div className="CountdownClock">
    <canvas width={width+'px'} height={height+'px'} ref={canvasRef} />
  </div>
}

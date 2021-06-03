import getWebGLContext from '../gl/getWebGLContext';
import quickCompileProgram from '../gl/quickCompileProgram';


const SoundWavesVShader = `
precision mediump float;

uniform vec4 wavesIntensity;

attribute float position;
attribute vec4 waves;
void main() {
  float x = position;
  float y = (
    waves[0] * wavesIntensity[0] 
    + waves[1] * wavesIntensity[1] 
    + waves[2] * wavesIntensity[2] 
    + waves[3] * wavesIntensity[3] 
  ) - 1.0;
   
  gl_Position = vec4(
    x + sin(y*10.0) * .005,
    y,
    0.5, 
    1.0
  );
}
`

const SoundWavesFShader = `
precision mediump float;

void main() {
  //gl_FragColor = vec4(.27, .29, .31, 0.5);
  gl_FragColor = vec4(.11, .13, .38, .5);
}
`

const PHI = 2 * Math.PI
const sq = (x:number) => x*x
/**
  Sets up rendering of sine waves on a canvas using WebGL.
  Be sure to handle exceptions when calling this function.
 */
export function startSoundWaves(canvas: HTMLCanvasElement):void {

  const gl = getWebGLContext(canvas)

  const program = quickCompileProgram(
    gl, SoundWavesVShader, SoundWavesFShader
  );
  gl.useProgram(program);

  const randomSineFunction = () => {
    let frequency = 2*Math.random() * PHI
    let phase = Math.random() * PHI    
    return (x:number) => sq(Math.sin(frequency * (x-phase))) 
  }

  const {vertexData, numberOfVertices, elementsPerVertex} = makeWaveVertices({
    width: 2,
    xShift: -1,
    waveFunctions: [
      randomSineFunction(),
      randomSineFunction(),
      randomSineFunction(),
      randomSineFunction(),
    ],
  });
  const bufferObject = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferObject);
  gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);


  const positionAttribLocation = gl.getAttribLocation(program, 'position');
  gl.vertexAttribPointer(
    positionAttribLocation, // location
    1, // number of elements
    gl.FLOAT, // element type
    false, // Normalised
    elementsPerVertex * Float32Array.BYTES_PER_ELEMENT, // stride
    0,
  )
  gl.enableVertexAttribArray(positionAttribLocation);

  const wavesAttribLocation = gl.getAttribLocation(program, 'waves');
  gl.vertexAttribPointer(
    wavesAttribLocation, // location
    elementsPerVertex-1 , // number of elements
    gl.FLOAT, // element types
    false, // normalised
    elementsPerVertex * Float32Array.BYTES_PER_ELEMENT, // stride
    1 * Float32Array.BYTES_PER_ELEMENT
  )
  gl.enableVertexAttribArray(wavesAttribLocation)

  // Expose uniforms
  //const phaseUniform = gl.getUniformLocation(program, 'phase');
  //let phase = 0

  // Wave intensity uniforms
  const wavesIntensity = [0, 0, 0, 0]
  const wavesIntensityUniform = gl.getUniformLocation(program, 'wavesIntensity');
  gl.uniform4fv(wavesIntensityUniform, wavesIntensity)
  let intensityFrequencys = [
    .7 + .3*Math.random(),
    .5 + .5*Math.random(),
    .3 + .7*Math.random(),
    .1 + .9*Math.random(),
  ].map(f => f * .002)

  const loop = () => {
    //phase += 0.01
    //gl.uniform1f(phaseUniform, phase)
    const t = Date.now()
    for(let i=0; i < wavesIntensity.length; ++i) {
      wavesIntensity[i] = sq(Math.sin(t * intensityFrequencys[i]))
    }
    gl.uniform4fv(wavesIntensityUniform, wavesIntensity)

    gl.clearColor(0,0,0,0);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    gl.drawArrays( gl.LINE_STRIP, 0, numberOfVertices)

    window.requestAnimationFrame(loop)
  }

  loop();
}


//function makeGridBuffer({
  //rows=50,
  //cols=50,
  //xShift=0, yShift=0,
  //width=1,
  //height=1,
  //elementsPerVertex=2,
//}={}) {
  //const size = elementsPerVertex * rows * cols
  //const buffer = new Float32Array(size);
  //for(let row=0; row < rows; ++row)
    //for(let col=0; col < cols; ++col) {
      //buffer[ 
        //elementsPerVertex * (col * rows + row) 
      //] = width * row / (rows-1) + xShift 
      //buffer[ 
        //elementsPerVertex * (col * rows + row)+1 
      //] = height * col / (cols-1) + yShift 
    //}

  //return {
    //vertexData: buffer,
    //numberOfVertices: rows*cols,
    //elementsPerVertex,

  //};
//}

function makeWaveVertices({
  rows=20,
  cols=100,
  width=1,
  xShift=0,
  waveFunctions = [] as ((x:number) => number)[]
}) {
  const elementsPerVertex = waveFunctions.length + 1
  const numberOfVertices = rows * cols
  const size = elementsPerVertex * numberOfVertices
  const buffer = new Float32Array(size);
  const colWidth = width / (cols-1)
  for(let row=0; row < rows; ++row) { 
    // Zig zag column loops (To eliminate lines)
    for(let d=0; d < cols; ++d) {
      let col = (row % 2 === 0) ? d : cols - d - 1;
      let x = colWidth * col + xShift
      let vertexIndex = elementsPerVertex * (row * cols + d)
      buffer[vertexIndex] = x
      for(let i=0; i < waveFunctions.length; ++ i) {
        let y = waveFunctions[i](x)
        y *= Math.abs(i / waveFunctions.length - row/rows) *  2
        y *= (1.5 - Math.abs(x))/1.5
        y *= (1+row/rows)/2
        y *= .7
        buffer[vertexIndex + 1 + i] = y 
      }
    }
  }

  //console.log("sound waves memory:", buffer.length * Float32Array.BYTES_PER_ELEMENT, "bytes")

  return { 
    vertexData: buffer,
    elementsPerVertex,
    numberOfVertices,
  }
}

export default startSoundWaves;



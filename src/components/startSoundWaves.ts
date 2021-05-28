import getWebGLContext from '../gl/getWebGLContext';
import quickCompileProgram from '../gl/quickCompileProgram';


const SoundWavesVShader = `
precision mediump float;

uniform float phase;

float y1, y2;

attribute vec2 position;
void main() {
  y1 = -sin(-position.x + 0.1 +phase);
  y2 = abs(0.5 - position.x) * sin(position.x * 7.0 + 0.5 * position.y - phase * 3.0);
  y1 = y1 * y1;
  y2 = y2 * y2;
  gl_Position = vec4(
    position.x, 
    (position.y * y2 + (1.0-position.y) * y1) - 1.0,
    0.5, 
    1.0
  );
}
`

const SoundWavesFShader = `
precision mediump float;

void main() {
  gl_FragColor = vec4(.27, .29, .31, 1.0);
}
`

/**
  Sets up rendering of sine waves on a canvas using WebGL.
  Be sure to handle exceptions when calling this function.
 */
export function startSoundWaves(canvas: HTMLCanvasElement):void {
  console.log('startingSoundWaves');

  const gl = getWebGLContext(canvas)

  const program = quickCompileProgram(
    gl, SoundWavesVShader, SoundWavesFShader
  );
  gl.useProgram(program);

  const {vertexData, numberOfVertices, elementsPerVertex} = makeGridBuffer({
    width: 2,
    xShift: -1,
  });
  const bufferObject = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, bufferObject);
  gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);

  const positionAttribLocation = gl.getAttribLocation(program, 'position');
  gl.vertexAttribPointer(
    positionAttribLocation, // location
    2, // number of elements
    gl.FLOAT, // element type
    false, // Normalised
    elementsPerVertex * Float32Array.BYTES_PER_ELEMENT, // stride
    0,
  )
  gl.enableVertexAttribArray(positionAttribLocation);

  // Expose uniforms
  const phaseUniform = gl.getUniformLocation(program, 'phase');
  let phase = 0

  const loop = () => {
    phase += 0.01
    gl.uniform1f(phaseUniform, phase)

    gl.clearColor(0,0,0,0);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    gl.drawArrays( gl.LINE_STRIP, 0, numberOfVertices)

    window.requestAnimationFrame(loop)
  }

  loop();
}


function makeGridBuffer({
  rows=50,
  cols=50,
  xShift=0, yShift=0,
  width=1,
  height=1,
  elementsPerVertex=2,
}={}) {
  const size = elementsPerVertex * rows * cols
  const buffer = new Float32Array(size);
  for(let row=0; row < rows; ++row)
    for(let col=0; col < cols; ++col) {
      buffer[ 
        elementsPerVertex * (col * rows + row) 
      ] = width * row / (rows-1) + xShift 
      buffer[ 
        elementsPerVertex * (col * rows + row)+1 
      ] = height * col / (cols-1) + yShift 
    }

  return {
    vertexData: buffer,
    numberOfVertices: rows*cols,
    elementsPerVertex,

  };
}

function makeWaveVertices({
  rows=50,
  cols=50,
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
      let vertexIndex = elementsPerVertex * (col * rows + row)
      buffer[vertexIndex] = x
      for(let i=0; i < waveFunctions.length; ++ i) {
        let y = waveFunctions[i](x)
        buffer[vertexIndex + 1 + i] = y
      }
    }
  }

  console.log("sound waves memory:", buffer.length * 4, "bytes")

  return { 
    vertexData: buffer,
    elementsPerVertex,
    numberOfVertices,
  }
}

export default startSoundWaves;



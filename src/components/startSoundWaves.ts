import getWebGLContext from '../gl/getWebGLContext';
import quickCompileProgram from '../gl/quickCompileProgram';


const SoundWavesVShader = `
precision mediump float;

uniform float phase;

float y1, y2;

attribute vec2 position;
void main() {
  y1 = -sin(-position.x + 0.1 +phase);
  y2 = sin(position.x * 7.0 + 0.5 * position.y - phase * 3.0);
  gl_Position = vec4(
    position.x, 
    position.y * y2 + (1.0-position.y) * y1,
    0.5, 
    1.0
  );
}
`

const SoundWavesFShader = `
precision mediump float;

void main() {
  gl_FragColor = vec4(1.0, 1.0, 1.0, .1);
}
`

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
  rows=30,
  cols=10,
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

export default startSoundWaves;



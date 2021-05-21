import getWebGLContext from '../gl/getWebGLContext';
import quickCompileProgram from '../gl/quickCompileProgram';


const SoundWavesVShader = `
precision mediump float;

attribute vec2 position;

void main() {
  gl_Position = vec4(
    position,
    0.5, 
    1.0
  );
}
`

const SoundWavesFShader = `
precision mediump float;

uniform vec2 screenSize;
uniform float phase;

vec4 white = vec4(1.0, 1.0, 1.0, 1.0);
vec4 transparent = vec4(1.0, 1.0,1.0 , 0.0);

void main() {
  float x = gl_FragCoord.x / screenSize.x;
  float y = 2.0 * gl_FragCoord.y / screenSize.y - 1.0;
  float A = sin(x);
  if(abs(y) < abs(A))
    gl_FragColor = sin(y*200.0) * white;
}
`

const fillScreenBuffer = new Float32Array([
  -1, -1, 
  1, -1, 
  1, 1,
  -1, 1
]);

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

  const vertexData = fillScreenBuffer;
  const elementsPerVertex = 2
  const numberOfVertices = 4;

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

  const screenSizeUniform = gl.getUniformLocation(program, 'screenSize');
  gl.uniform2f(screenSizeUniform, canvas.width, canvas.height);

  const loop = () => {
    phase += 0.01
    gl.uniform1f(phaseUniform, phase)

    gl.clearColor(0,0,0,0);
    gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);
    gl.drawArrays( gl.TRIANGLE_FAN, 0, numberOfVertices)

    window.requestAnimationFrame(loop)
  }

  loop();
}


export default startSoundWaves;



export function quickCompileProgram(
  gl: WebGLRenderingContext, 
  vertexShaderSource:string, 
  fragmentShaderSource: string,
) {

  const vertexShader = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragmentShader = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

  const program = gl.createProgram();
  if(!program)
    throw "Unable to create GL program";
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if(!gl.getProgramParameter(program, gl.LINK_STATUS))
    throw `Error linking GL program: ${gl.getProgramInfoLog(program)}`;
  gl.validateProgram(program);
  if(!gl.getProgramParameter(program, gl.VALIDATE_STATUS))
    throw `Error validating program: ${gl.getProgramInfoLog(program)}`;

  return program;
}

export default quickCompileProgram

export function compileShader(
  gl: WebGLRenderingContext,
  shaderType: number,
  shaderSource: string
) {
  const shader = gl.createShader(shaderType);
  if(!shader)
    throw "Unable to create vertex shader";
  gl.shaderSource(shader, shaderSource);
  gl.compileShader(shader);
  if(!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
    throw `Error compiling ${
      shaderType === gl.VERTEX_SHADER ? "vertex" : "fragment"
    } shader: ${gl.getShaderInfoLog(shader)}`

  return shader
}

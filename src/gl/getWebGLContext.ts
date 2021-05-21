export function getWebGLContext(canvas: HTMLCanvasElement):WebGLRenderingContext {
  let gl:WebGLRenderingContext|null

  // Modern browsers
  gl = canvas.getContext('webgl');

  // IE & Edge
  if(!gl)
    // @ts-ignore
    gl = canvas.getContext('experimental-webgl');
  
  if(gl !== null && gl !== undefined)
    return gl
  else
    throw new Error("Your browser does not support WebGL")
}

export default getWebGLContext;

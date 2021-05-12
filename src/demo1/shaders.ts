
  // Vertex shader program

export const VertexShader = `#version 100
attribute vec4 aVertexPosition;
attribute vec4 aVertexColor;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying lowp vec4 vColor;

void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    vColor = aVertexColor;
}
`

  // Fragment shader program

export const FragmentShader = `#version 100
varying lowp vec4 vColor;

void main(void) {
    gl_FragColor = vColor;
}
`


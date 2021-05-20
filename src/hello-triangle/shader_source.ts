
  // Vertex shader program

export const vertexShaderSource = `#version 300 es 
precision mediump float;
layout (location = 0) in vec3 aPos;
    void main()
    {
       gl_Position = vec4(aPos.x, aPos.y, aPos.z, 1.0);
    }`

  // Fragment shader program

export const fragmentShaderSource = `#version 300 es 
precision mediump float;
out vec4 FragColor;
void main()
{
    FragColor = vec4(1.0f, 0.5f, 0.2f, 1.0f);
}`


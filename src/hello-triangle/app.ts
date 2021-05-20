export { }
import { vertexShaderSource, fragmentShaderSource } from './shader_source'
import { Shader } from "../common/shader"

// This code is a javascript translation of code originally written by Joey de Vries under the CC BY-NC 4.0 licence. 
// For more information please visit https://learnopengl.com/About

// settings
const sizeFloat = 4;

// global variables
let canvas: HTMLCanvasElement;
let gl: WebGL2RenderingContext;
let VAO: WebGLVertexArrayObject;
let shaderProgram: WebGLProgram;
let shader: Shader;

// let main = function () {
function main() {
    // canvas creation and initializing OpenGL context
    canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    gl = canvas.getContext('webgl2');
    if (!gl) {
        console.log("WebGL 2 needed"); return;
    }
    window.onresize = () => { framebufferSizeCallback(window.innerWidth, window.innerHeight) }

    shader = new Shader(gl, vertexShaderSource, fragmentShaderSource)

    // set up vertex data (and buffer(s)) and configure vertex attributes
    // ------------------------------------------------------------------
    let vertices = new Float32Array([
        - 0.5, -0.5, 0.0, // left  
        0.5, -0.5, 0.0, // right 
        0.0, 0.5, 0.0  // top   
    ]);


    VAO = gl.createVertexArray();
    let VBO = gl.createBuffer();
    // bind the Vertex Array Object first, then bind and set vertex buffer(s), and then configure vertex attributes(s).
    gl.bindVertexArray(VAO);

    gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 3 * sizeFloat, 0);
    gl.enableVertexAttribArray(0);

    // note that this is allowed, the call to glVertexAttribPointer registered VBO as the vertex attribute's bound vertex buffer object so afterwards we can safely unbind
    gl.bindBuffer(gl.ARRAY_BUFFER, null);

    // You can unbind the VAO afterwards so other VAO calls won't accidentally modify this VAO, but this rarely happens. Modifying other
    // VAOs requires a call to glBindVertexArray anyways so we generally don't unbind VAOs (nor VBOs) when it's not directly necessary.
    gl.bindVertexArray(null);

    requestAnimationFrame(render);
}//();

window.onload = () => {
    console.log("window loaded")
    main()
}

// render loop
// -----------
function render() {
    // input
    // -----
    processInput();

    // render
    // ------
    gl.clearColor(0.2, 0.3, 0.3, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // draw our first triangle
    shader.use(gl)
    gl.bindVertexArray(VAO); // seeing as we only have a single VAO there's no need to bind it every time, but we'll do so to keep things a bit more organized
    gl.drawArrays(gl.TRIANGLES, 0, 3);

}


// process all input: query GLFW whether relevant keys are pressed/released this frame and react accordingly
// ---------------------------------------------------------------------------------------------------------
function processInput() {
    // if (glfwGetKey(window, GLFW_KEY_ESCAPE) == GLFW_PRESS)
    //     glfwSetWindowShouldClose(window, true);
}

// glfw: whenever the window size changed (by OS or user resize) this callback function executes
// ---------------------------------------------------------------------------------------------
function framebufferSizeCallback(width: number, height: number) {
    // make sure the viewport matches the new window dimensions; note that width and 
    // height will be significantly larger than specified on retina displays.
    canvas.width = width; canvas.height = height;
    gl.viewport(0, 0, width, height);
    requestAnimationFrame(render);
}

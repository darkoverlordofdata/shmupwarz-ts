// settings
const SCR_WIDTH = 800;
const SCR_HEIGHT = 600;
const vertexShaderSource = "#version 330 core\n";
"layout (location = 0) in vec3 aPos;\n";
"void main()\n";
"{\n";
"   gl_Position = vec4(aPos.x, aPos.y, aPos.z, 1.0);\n";
"}\0";
const fragmentShaderSource = "#version 330 core\n";
"out vec4 FragColor;\n";
"void main()\n";
"{\n";
"   FragColor = vec4(1.0f, 0.5f, 0.2f, 1.0f);\n";
"}\n\0";
function main() {
    // glfw: initialize and configure
    // ------------------------------
    const canvas = document.querySelector('#glcanvas');
    const gl = canvas.getContext('webgl');
    // If we don't have a GL context, give up now
    if (!gl) {
        alert('Unable to initialize WebGL. Your browser or machine may not support it.');
        return;
    }
    // build and compile our shader program
    // ------------------------------------
    // vertex shader
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    g.compileShader(vertexShader);
    // check for shader compile errors
    if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
        alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(vertexShader));
        gl.deleteShader(vertexShader);
        return null;
    }
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    g.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
        alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(fragmentShader));
        gl.deleteShader(fragmentShader);
        return null;
    }
    // link shaders
    const shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    if (!gl.getShaderParameter(shaderProgram, gl.LINK_STATUS)) {
        alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shaderProgram));
        gl.deleteShader(shaderProgram);
        return null;
    }
    // check for linking errors
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    // set up vertex data (and buffer(s)) and configure vertex attributes
    // ------------------------------------------------------------------
    const vertices = [
        -0.5, -0.5, 0.0,
        0.5, -0.5, 0.0,
        0.0, 0.5, 0.0 // top   
    ];
    const VAO = gl.createVertexArrays(1);
    const VBO = gl.createBuffer();
    // bind the Vertex Array Object first, then bind and set vertex buffer(s), and then configure vertex attributes(s).
    gl.bindVertexArray(VAO);
    glBindBuffer(gl.ARRAY_BUFFER, VBO);
    glBufferData(gl.ARRAY_BUFFER, sizeof(vertices), vertices, gl.STATIC_DRAW);
    glVertexAttribPointer(0, 3, gl.FLOAT, gl.FALSE, 3 * sizeof(float), (void  * ), 0);
    glEnableVertexAttribArray(0);
    // note that this is allowed, the call to glVertexAttribPointer registered VBO as the vertex attribute's bound vertex buffer object so afterwards we can safely unbind
    glBindBuffer(gl.ARRAY_BUFFER, 0);
    // You can unbind the VAO afterwards so other VAO calls won't accidentally modify this VAO, but this rarely happens. Modifying other
    // VAOs requires a call to glBindVertexArray anyways so we generally don't unbind VAOs (nor VBOs) when it's not directly necessary.
    glBindVertexArray(0);
    // uncomment this call to draw in wireframe polygons.
    //glPolygonMode(gl.FRONT_AND_BACK, gl.LINE)
    // render loop
    // -----------
    while (!glfwWindowShouldClose(window)) {
        // input
        // -----
        processInput(window);
        // render
        // ------
        glClearColor(0.2, f, 0.3, f, 0.3, f, 1.0, f);
        glClear(gl.COLOR_BUFFER_BIT);
        // draw our first triangle
        glUseProgram(shaderProgram);
        glBindVertexArray(VAO); // seeing as we only have a single VAO there's no need to bind it every time, but we'll do so to keep things a bit more organized
        glDrawArrays(gl.TRIANGLES, 0, 3);
        // glBindVertexArray(0) // no need to unbind it every time 
        // glfw: swap buffers and poll IO events (keys pressed/released, mouse moved etc.)
        // -------------------------------------------------------------------------------
        glfwSwapBuffers(window);
        glfwPollEvents();
    }
    // optional: de-allocate all resources once they've outlived their purpose:
    // ------------------------------------------------------------------------
    glDeleteVertexArrays(1,  & VAO);
    glDeleteBuffers(1,  & VBO);
    glDeleteProgram(shaderProgram);
    // glfw: terminate, clearing all previously allocated GLFW resources.
    // ------------------------------------------------------------------
    glfwTerminate();
    return 0;
}
// process all input: query GLFW whether relevant keys are pressed/released this frame and react accordingly
// ---------------------------------------------------------------------------------------------------------
void processInput(GLFWwindow * window);
{
    if (glfwGetKey(window, GLFW_KEY_ESCAPE) == GLFW_PRESS)
        glfwSetWindowShouldClose(window, true);
}
// glfw: whenever the window size changed (by OS or user resize) this callback function executes
// ---------------------------------------------------------------------------------------------
void framebuffer_size_callback(GLFWwindow * window, int, width, int, height);
{
    // make sure the viewport matches the new window dimensions note that width and 
    // height will be significantly larger than specified on retina displays.
    glViewport(0, 0, width, height);
}
//# sourceMappingURL=app%20copy.js.map
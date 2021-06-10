"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DemoGame = void 0;
const dna_1 = require("../common/dna");
class DemoGame extends dna_1.Game {
    constructor() {
        super();
        dna_1.ResourceManager.Preload(() => this.ContentLoaded());
        // this.canvas = document.createElement('canvas')
        // this.canvas.width = window.innerWidth 
        // this.canvas.height = window.innerHeight
        // document.body.appendChild(this.canvas)
        // Object.defineProperty(window, 'gl', { 
        //     value: this.canvas.getContext('webgl2'), 
        //     writable: false 
        // })
        // // gl = this.canvas.getContext('webgl2')
        // if (!gl) {
        //     console.log("WebGL 2 needed") 
        //     return
        // }
        // // Event handler to resize the canvas when the document view is changed
        // window.onresize = () => { this.FramebufferSizeCallback(window.innerWidth, window.innerHeight) }
    }
    Initialize() {
        console.log('Initialize');
    }
    ContentLoaded() {
        console.log('ContentLoaded');
        // build and compile our shader zprogram
        // ------------------------------------
        var vertexShaderSource = dna_1.ResourceManager.Fetched.get('demo_vs');
        var fragmentShaderSource = dna_1.ResourceManager.Fetched.get('demo_frag');
        this.shader = new dna_1.Shader(gl, vertexShaderSource, fragmentShaderSource);
        // set up vertex data (and buffer(s)) and configure vertex attributes
        // ------------------------------------------------------------------
        const vertices = new Float32Array([
            // positions          // texture coords
            0.5, 0.5, 0.0, 1.0, 1.0,
            0.5, -0.5, 0.0, 1.0, 0.0,
            -0.5, -0.5, 0.0, 0.0, 0.0,
            -0.5, 0.5, 0.0, 0.0, 1.0 // top left 
        ]);
        const indices = new Uint16Array([
            0, 1, 3,
            1, 2, 3 // second triangle
        ]);
        this.VAO = gl.createVertexArray();
        const VBO = gl.createBuffer();
        const EBO = gl.createBuffer();
        gl.bindVertexArray(this.VAO);
        gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, EBO);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
        const sizeFloat = 4;
        // position attribute
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 5 * sizeFloat, 0);
        gl.enableVertexAttribArray(0);
        // texture coord attribute
        gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 5 * sizeFloat, (3 * sizeFloat));
        gl.enableVertexAttribArray(1);
        // load and create a texture 
        // -------------------------
        this.texture1 = gl.createTexture();
        // init the blue pixel
        this.initTexture(gl, this.texture1);
        const image1 = dna_1.ResourceManager.Images.get("container");
        gl.bindTexture(gl.TEXTURE_2D, this.texture1);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image1);
        // set the texture wrapping parameters
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        // set texture filtering parameters
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.generateMipmap(gl.TEXTURE_2D);
        // texture 2
        // ---------
        this.texture2 = gl.createTexture();
        // init the blue pixel
        this.initTexture(gl, this.texture2);
        const image2 = dna_1.ResourceManager.Images.get("awesomeface");
        gl.bindTexture(gl.TEXTURE_2D, this.texture2);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image2);
        // set the texture wrapping parameters
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        // set texture filtering parameters
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.generateMipmap(gl.TEXTURE_2D);
        // tell opengl for each sampler to which texture unit it belongs to (only has to be done once)
        // -------------------------------------------------------------------------------------------
        this.shader.use(gl);
        this.shader.setInt(gl, "texture1", 0);
        this.shader.setInt(gl, "texture2", 1);
        this.Start();
    }
    Start() {
        console.log('Start');
        requestAnimationFrame(this.Render.bind(this));
    }
    Render() {
        // input
        // -----
        // this.ProcessInput()
        // render
        // ------
        gl.clearColor(0.2, 0.3, 0.3, 1.0);
        gl.clear(gl.COLOR_BUFFER_BIT);
        // bind textures on corresponding texture units
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.texture1);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.texture2);
        // create transformations
        // glm:: mat4 transform = glm:: mat4(1.0) // make sure to initialize matrix to identity matrix first
        // transform = glm:: translate(transform, glm:: vec3(0.5, -0.5, 0.0))
        // transform = glm:: rotate(transform, (float)glfwGetTime(), glm:: vec3(0.0, 0.0, 1.0))
        const transform = dna_1.Mat4.Identity();
        // Mat4.Translate(transform, transform, new Float32Array([0.5, -0.5, 0.0]))
        dna_1.Mat4.Translate(transform, transform, dna_1.Vec3.Create(0.5, -0.5, 0.0));
        dna_1.Mat4.RotateZ(transform, transform, performance.now() / 1000);
        // let transform = mat4.create()
        // mat4.translate(transform, transform, vec3.fromValues(0.5, -0.5, 0.0))
        // mat4.rotateZ(transform, transform, performance.now() / 1000)
        // get matrix's uniform location and set matrix
        this.shader.use(gl);
        const transformLoc = gl.getUniformLocation(this.shader.Id, "transform");
        gl.uniformMatrix4fv(transformLoc, false, transform);
        // render container
        gl.bindVertexArray(this.VAO);
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
        // here  requestAnimationFrame needed: animation of texture in time
        requestAnimationFrame(this.Render.bind(this));
    }
    Update() {
        console.log("Game Update!");
    }
    // process all input: query GLFW whether relevant keys are pressed/released this frame and react accordingly
    // ---------------------------------------------------------------------------------------------------------
    ProcessInput() {
        // if (glfwGetKey(window, GLFW_KEY_ESCAPE) == GLFW_PRESS)
        //     glfwSetWindowShouldClose(window, true)
    }
    //
    // Initialize a texture and load an image.
    // When the image finished loading copy it into the texture.
    //
    initTexture(gl, texture) {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        // Because images have to be download over the internet
        // they might take a moment until they are ready.
        // Until then put a single pixel in the texture so we can
        // use it immediately. When the image has finished downloading
        // we'll update the texture with the contents of the image.
        const width = 1;
        const height = 1;
        const pixel = new Uint8Array([0, 0, 255]); // opaque blue
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, width, height, 0, gl.RGB, gl.UNSIGNED_BYTE, pixel);
    }
}
exports.DemoGame = DemoGame;
//# sourceMappingURL=DemoGame.js.map
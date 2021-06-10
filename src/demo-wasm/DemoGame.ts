import { Vec3, Mat4, Game, ResourceManager, Shader } from "../common/dna"

// settings
declare var gl: WebGL2RenderingContext



export class DemoGame extends Game {

    canvas: HTMLCanvasElement
    VAO: WebGLVertexArrayObject
    shader: Shader
    texture1: WebGLTexture
    texture2: WebGLTexture

    constructor() {

        super()
        ResourceManager.Preload( () => this.ContentLoaded() )
    }

    Initialize() {
        console.log('Initialize')

    }

    ContentLoaded() {


        console.log('ContentLoaded')
        ResourceManager.LoadShader("demo_vs", "demo_frag", "demo")
        ResourceManager.LoadTexture("container")
        ResourceManager.LoadTexture("awesomeface")


        // set up vertex data (and buffer(s)) and configure vertex attributes
        // ------------------------------------------------------------------
        const vertices = new Float32Array([
            // positions          // texture coords
            0.5, 0.5, 0.0, 1.0, 1.0, // top right
            0.5, - 0.5, 0.0, 1.0, 0.0, // bottom right
            -0.5, -0.5, 0.0, 0.0, 0.0, // bottom left
            -0.5, 0.5, 0.0, 0.0, 1.0  // top left 

        ])

        const indices = new Uint16Array([
            0, 1, 3, // first triangle
            1, 2, 3  // second triangle

        ])

        this.VAO = gl.createVertexArray()
        const VBO = gl.createBuffer()
        const EBO = gl.createBuffer()

        gl.bindVertexArray(this.VAO)

        gl.bindBuffer(gl.ARRAY_BUFFER, VBO)
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)

        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, EBO)
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW)

        const sizeFloat = 4
        // position attribute
        gl.vertexAttribPointer(0, 3, gl.FLOAT, false, 5 * sizeFloat, 0)
        gl.enableVertexAttribArray(0)
        // texture coord attribute
        gl.vertexAttribPointer(1, 2, gl.FLOAT, false, 5 * sizeFloat, (3 * sizeFloat))
        gl.enableVertexAttribArray(1)


        this.shader = ResourceManager.GetShader("demo")
        // load and create a texture 
        // -------------------------

        this.texture1 = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, this.texture1)
        
        const image1 = ResourceManager.GetTexture("container")
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image1.data)

        // set the texture wrapping parameters
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT)
        // set texture filtering parameters
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.generateMipmap(gl.TEXTURE_2D)


        // texture 2
        // ---------
        this.texture2 = gl.createTexture()
        gl.bindTexture(gl.TEXTURE_2D, this.texture2)

        const image2 = ResourceManager.GetTexture("awesomeface")
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image2.data)

        // set the texture wrapping parameters
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT)
        // set texture filtering parameters
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.generateMipmap(gl.TEXTURE_2D)


        // tell opengl for each sampler to which texture unit it belongs to (only has to be done once)
        // -------------------------------------------------------------------------------------------
        this.shader.Use()
        this.shader.SetInt("texture1", 0)
        this.shader.SetInt("texture2", 1)

        this.Start()
    }

    Start() {
        console.log('Start')
        requestAnimationFrame(this.Render.bind(this))

    }

    Render() {
        gl.clearColor(0.2, 0.3, 0.3, 1.0)
        gl.clear(gl.COLOR_BUFFER_BIT)

        // bind textures on corresponding texture units
        gl.activeTexture(gl.TEXTURE0)
        gl.bindTexture(gl.TEXTURE_2D, this.texture1)
        // gl.activeTexture(gl.TEXTURE1)
        // gl.bindTexture(gl.TEXTURE_2D, this.texture2)

        // create transformations
        const transform = Mat4.Identity()

        Mat4.Translate(transform, transform, Vec3.Create(0.5, -0.5, 0.0))
        Mat4.RotateZ(transform, transform, performance.now() / 1000)

        this.shader.SetMatrix("transform", transform)

        // render container
        gl.bindVertexArray(this.VAO)
        gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0)

        // here  requestAnimationFrame needed: animation of texture in time
        requestAnimationFrame(this.Render.bind(this))
        
    }

    Update(){
        console.log("Game Update!")
    }

    // process all input: query GLFW whether relevant keys are pressed/released this frame and react accordingly
    // ---------------------------------------------------------------------------------------------------------
    ProcessInput() {
    }
}

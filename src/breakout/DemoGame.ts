import { 
    ArrayRenderer, 
    Game, 
    Mat4, 
    Rect, 
    ResourceManager, 
    Shader, 
    Texture2D,
    Vec3, 
    Vec4,
} from "../common/dna"

declare var gl: WebGL2RenderingContext

export class DemoGame extends Game {

    canvas: HTMLCanvasElement
    VAO: WebGLVertexArrayObject
    shader: Shader
    image1: Texture2D
    renderer: ArrayRenderer
    width: number
    height: number
    title: string

    constructor(width: number, height:number, title: string) {
        super()
        this.width = width
        this.height = height
        this.title = title
        ResourceManager.Preload( () => this.ContentLoaded() )
    }

    Initialize() {
        console.log('Initialize - host ready')
    }

    ContentLoaded() {
        console.log('ContentLoaded - resource manager ready')
        ResourceManager.LoadShader("sprite_vs", "sprite_frag", "sprite")
        ResourceManager.LoadTexture("container")
        ResourceManager.LoadTexture("awesomeface")

        this.shader = ResourceManager.GetShader("sprite")
        this.renderer = new ArrayRenderer(this.shader)

        this.image1 = ResourceManager.GetTexture("container")
        this.shader.Use()
        var projection = Mat4.Create()
        Mat4.Ortho(projection, 0, this.width, this.height, 0, -1, 1)
        this.shader.SetMatrix("projection", projection)

        this.Start()
    }

    Start() {
        console.log('Start game!')
        requestAnimationFrame(this.Render.bind(this))
    }

    Render() {
        this.render_lock = true
        gl.clearColor(0.2, 0.3, 0.3, 1.0)
        gl.clear(gl.COLOR_BUFFER_BIT)

        this.renderer.Draw(this.image1, new Rect(100, 100, 200, 100))

        requestAnimationFrame(this.Render.bind(this))
        this.render_lock = false
        this.Update()
    }

    Update(){
        if (this.render_lock) return
    }

    ProcessInput() {
    }
}

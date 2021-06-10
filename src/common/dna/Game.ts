
declare var gl: WebGL2RenderingContext

export abstract class Game {

    canvas: HTMLCanvasElement
    render_lock:boolean = false

    /**
     * Create the webgl canvas and declare a 
     * global WebGL2RenderingContext named 'gl'
     * @returns 
     */
    constructor() {
        this.canvas = document.createElement('canvas')
        this.canvas.width = window.innerWidth 
        this.canvas.height = window.innerHeight
        document.body.appendChild(this.canvas)
        Object.defineProperty(window, 'gl', { value: this.canvas.getContext('webgl2') } )
        if (!gl) console.log("WebGL 2 needed") 
        
        window.onresize = () => { this.FramebufferSizeCallback(window.innerWidth, window.innerHeight) }
    }

    abstract Initialize(): void     // signal from host (wasm)
    abstract ContentLoaded(): void  // ResourceManager has preloaded assets
    abstract Start(): void          // start game logic
    abstract Render(): void         // render game state
    abstract Update(): void         // update game state
    abstract ProcessInput(): void   // user interaction

    FramebufferSizeCallback(width: number, height: number) {
        // make sure the viewport matches the new window dimensions note that width and 
        // height will be significantly larger than specified on retina displays.
        console.log(`new width ${width} and height ${height}`)
        this.canvas.width = width 
        this.canvas.height = height
        gl.viewport(0, 0, width, height)
        requestAnimationFrame(this.Render.bind(this))
    }



}
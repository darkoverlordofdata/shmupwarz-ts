import { Shader } from './Shader'
import { Texture2D } from './Texture2D'
import { Vec3, Mat4 } from './tglm'

declare var gl: WebGL2RenderingContext;

const WHITE: Float32Array = Vec3.Create(1, 1, 1)

export class Rect {
    x: number
    y: number
    width: number
    height: number
    
    public constructor(x: number, y:number, width:number, height:number) {
        this.x = x
        this.y = y
        this.width = width
        this.height = height
    }
}

export class ArrayRenderer {

        shader: Shader
        VAO: WebGLVertexArrayObject
        VBO: WebGLBuffer

        /**
         * 
         * @param shader 
         */
        public constructor(shader: Shader) {
            this.shader = shader
            const vertices = new Float32Array([
                // Pos      // Tex
                0.0, 1.0, 0.0, 1.0,
                1.0, 0.0, 1.0, 0.0,
                0.0, 0.0, 0.0, 0.0,
        
                0.0, 1.0, 0.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
                1.0, 0.0, 1.0, 0.0
    
            ])
    
            this.VAO = gl.createVertexArray()
            this.VBO = gl.createBuffer()
            
            gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO)
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
        
            gl.bindVertexArray(this.VAO)
            gl.enableVertexAttribArray(0)
            gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 4 * 4, 0)
            gl.bindBuffer(gl.ARRAY_BUFFER, null)
            gl.bindVertexArray(null)
        

        }

        public Draw(texture: Texture2D, bounds:Rect, rotate: number=0, color:Float32Array=WHITE) {

            this.shader.Use()
            var model = Mat4.Create(1)

            /**
             * transformations are: 
             *  scale happens first, 
             *  then rotation and 
             *  then finally translation happens;
             * 
             *  reversed the order to get:
             */

            // 1) translate position:
            Mat4.Translate(model, model, Vec3.Create(bounds.x, bounds.y, 0))

            // 2) rotate:
            //  a. Move origin of rotation to center of quad
            Mat4.Translate(model, model, Vec3.Create(0.5*bounds.width, 0.5*bounds.height, 0))
            //  b. Then rotate
            Mat4.Rotate(model, model, rotate, Vec3.Create(0, 0, 1))
            //  c. Move origin back
            Mat4.Translate(model, model, Vec3.Create(-0.5*bounds.width, -0.5*bounds.height, 0))

            // 3) scale
            Mat4.Scale(model, model, Vec3.Create(bounds.width, bounds.height, 1))

            this.shader.SetMatrix("model", model)
            this.shader.SetVector3("spriteColor", color)

            gl.activeTexture(gl.TEXTURE0)
            texture.Bind()

            gl.bindVertexArray(this.VAO)
            gl.drawArrays(gl.TRIANGLES, 0, 6)
            gl.bindVertexArray(null)
        }
}


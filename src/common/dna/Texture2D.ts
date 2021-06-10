declare var gl: WebGL2RenderingContext;

export class Texture2D {
    Id: WebGLTexture
    Width: number
    Height: number
    InternalFormat: number
    ImageFormat: number
    data: any
    private wrapS: number
    private wrapT: number
    private filterMin: number
    private filterMag: number
    private path: string

    /**
     * Makes a new Texture2D that is ready to recieve image data
     * 
     * @param file 
     * @param internalFormat 
     * @param imageFormat 
     * @param path 
     */
    public constructor(path: string, internalFormat: number = gl.RGB, imageFormat: number = gl.RGB) {
        this.path = path
        this.Width = 0
        this.Height = 0
        this.wrapS = gl.REPEAT
        this.wrapT = gl.REPEAT
        this.filterMin = gl.LINEAR
        this.filterMag = gl.LINEAR
        this.InternalFormat = internalFormat
        this.ImageFormat = imageFormat
        // this.Id = gl.GenTextures(1)
        this.Id = gl.createTexture()
    }

    /**
     * After loading the image data, generate the texture
     * 
     * @param width 
     * @param height 
     * @param data 
     */
    public Generate(width: number, height: number, data:any) {

        this.data = data

        gl.bindTexture(gl.TEXTURE_2D, this.Id)
        gl.texImage2D(gl.TEXTURE_2D, 0, this.InternalFormat, this.ImageFormat, gl.UNSIGNED_BYTE, data)

        // glTexImage2D(GL_TEXTURE_2D, 0, this->InternalFormat, width, height, 0, this->ImageFormat, GL_UNSIGNED_BYTE, data);

        // set the texture wrapping parameters
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT)
        // set texture filtering parameters
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)
        gl.generateMipmap(gl.TEXTURE_2D)

    }
    
    /**
     * Binds our texture to the webgl at display time
     */
    public Bind() {
        gl.bindTexture(gl.TEXTURE_2D, this.Id)
    }
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Texture2D = void 0;
class Texture2D {
    /**
     * Makes a new Texture2D that is ready to recieve image data
     *
     * @param file
     * @param internalFormat
     * @param imageFormat
     * @param path
     */
    Texture2D(path, internalFormat = gl.RGB, imageFormat = gl.RGB) {
        this.path = path;
        this.Width = 0;
        this.Height = 0;
        this.wrapS = gl.REPEAT;
        this.wrapT = gl.REPEAT;
        this.filterMin = gl.LINEAR;
        this.filterMag = gl.LINEAR;
        this.InternalFormat = internalFormat;
        this.ImageFormat = imageFormat;
        // this.Id = gl.GenTextures(1)
        this.Id = gl.createTexture();
    }
    /**
     * After loading the image data, generate the texture
     *
     * @param width
     * @param height
     * @param data
     */
    Generate(width, height, data) {
        gl.bindTexture(gl.TEXTURE_2D, this.Id);
        gl.texImage2D(gl.TEXTURE_2D, 0, this.InternalFormat, this.ImageFormat, gl.UNSIGNED_BYTE, data);
        // glTexImage2D(GL_TEXTURE_2D, 0, this->InternalFormat, width, height, 0, this->ImageFormat, GL_UNSIGNED_BYTE, data);
        // set the texture wrapping parameters
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        // set texture filtering parameters
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.generateMipmap(gl.TEXTURE_2D);
    }
}
exports.Texture2D = Texture2D;
//# sourceMappingURL=Texture2D.js.map
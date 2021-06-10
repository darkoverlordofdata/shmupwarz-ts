/**
 * define amd module
 *
 * @param {dict} modules
 *
 */
const define = ((modules) => {
    const readFile = (name) => {
        return modules[name].exports;
    };
    require.cache = Object.create(null);
    /**
     * require - fetch a module
     *
     * @param {string}      name    string name of module
     */
    function require(name) {
        if (!(name in require.cache)) {
            const code = readFile(name);
            const module = { exports: {} };
            require.cache[name] = module;
            const wrapper = Function("require, exports, module", code);
            wrapper(require, module.exports, module);
        }
        return require.cache[name].exports;
    }
    /**
     * define amd module
     *
     * @param {string}      name    string name of module
     * @param {string[]}    deps    list of dependency names
     * @param {function}    module  definition of module
     *
     */
    return (name, deps, module) => {
        modules[name] = {
            id: name,
            exports: {}
        };
        const exports = modules[name].exports;
        // const args = [(_) => modules[_].exports, exports]
        const args = [require, exports];
        for (let i = 2; i < deps.length; i++)
            args.push(modules[deps[i]].exports);
        /*
        * this invokes the module, initializing it with
        * exports table and args
        */
        module.apply(exports, args);
    };
})({
/*
 *
 * module table -- link legacy modules here:
 * 'Liquid.Coffee': { id: 'Liquid.Coffee', exports: liquid },
 *
 * use:
 * liquid = require('Liquid.Coffee')
 *
 */
});
define.amd = true;
define.version = '0.0.1';
define("common/dna/tglm", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Scale = exports.Rotate = exports.Mat4 = exports.Vec4 = exports.Vec3 = void 0;
    /*******************************************************************
    ** This code is part of the Dark Overload Framework.
    **
    MIT License
    
    Copyright (c) 2021 Dark Overlord of Data
    
    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:
    
    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.
    
    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    ******************************************************************/
    /**
     * tglm is Tiny GLM for typescript
     *
     * opengl math helpers inspired by GLM.
     *
     */
    exports.Vec3 = {
        Create: (x, y, z) => new Float32Array([x, y, z])
    };
    /**
     * ??Create should use a single linear memory model, and create vectors as views on that
     * model which can then be shared with wasm??
     */
    exports.Vec4 = {
        Create: (w, x, y, z) => new Float32Array([w, x, y, z])
    };
    exports.Mat4 = {
        Create: (e = 0) => new Float32Array([e, 0, 0, 0, 0, e, 0, 0, 0, 0, e, 0, 0, 0, 0, e]),
        Translate: Translate,
        RotateZ: RotateZ,
        Rotate: Rotate,
        Scale: Scale,
        Ortho: Ortho,
    };
    /**
     * Generates a orthogonal projection matrix with the given bounds.
     * The near/far clip planes correspond to a normalized device coordinate Z range of [-1, 1],
     * which matches WebGL/OpenGL's clip volume.
     *
     * @param {mat4} out mat4 frustum matrix will be written into
     * @param {number} left Left bound of the frustum
     * @param {number} right Right bound of the frustum
     * @param {number} bottom Bottom bound of the frustum
     * @param {number} top Top bound of the frustum
     * @param {number} near Near bound of the frustum
     * @param {number} far Far bound of the frustum
     * @returns {mat4} out
     */
    function Ortho(out, left, right, bottom, top, nearVal, farVal) {
        const lr = 1 / (left - right);
        const bt = 1 / (bottom - top);
        const nf = 1 / (nearVal - farVal);
        out[0] = -2 * lr;
        out[1] = 0;
        out[2] = 0;
        out[3] = 0;
        out[4] = 0;
        out[5] = -2 * bt;
        out[6] = 0;
        out[7] = 0;
        out[8] = 0;
        out[9] = 0;
        out[10] = 2 * nf;
        out[11] = 0;
        out[12] = (left + right) * lr;
        out[13] = (top + bottom) * bt;
        out[14] = (farVal + nearVal) * nf;
        out[15] = 1;
        return out;
        // out[0]  = 1; out[1]  = 0; out[2]  = 0; out[3]  = 0
        // out[4]  = 0; out[5]  = 1; out[6]  = 0; out[7]  = 0
        // out[8]  = 0; out[9]  = 0; out[10] = 1; out[11] = 0
        // out[12] = 0; out[13] = 0; out[14] = 0; out[15] = 1
        // out[0] = 2 / (right - left);
        // out[5] = 2 / (top - bottom);
        // out[10] = -1;
        // out[12] = -(right + left) / (right - left);
        // out[13] = -(top + bottom) / (top - bottom);
        // out[14] = -nearVal / (farVal - nearVal);
        // return out;
    }
    // export const MatIdentity = () => new Float32Array([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1])
    /**
     * Translate a mat4 by the given vector
     *
     * @param {mat4} out the receiving matrix
     * @param {ReadonlyMat4} a the matrix to translate
     * @param {ReadonlyVec3} v vector to translate by
     * @returns {mat4} out
     */
    function Translate(out, a, v) {
        var x = v[0], y = v[1], z = v[2];
        var a00, a01, a02, a03;
        var a10, a11, a12, a13;
        var a20, a21, a22, a23;
        if (a === out) {
            out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
            out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
            out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
            out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
        }
        else {
            a00 = a[0];
            a01 = a[1];
            a02 = a[2];
            a03 = a[3];
            a10 = a[4];
            a11 = a[5];
            a12 = a[6];
            a13 = a[7];
            a20 = a[8];
            a21 = a[9];
            a22 = a[10];
            a23 = a[11];
            out[0] = a00;
            out[1] = a01;
            out[2] = a02;
            out[3] = a03;
            out[4] = a10;
            out[5] = a11;
            out[6] = a12;
            out[7] = a13;
            out[8] = a20;
            out[9] = a21;
            out[10] = a22;
            out[11] = a23;
            out[12] = a00 * x + a10 * y + a20 * z + a[12];
            out[13] = a01 * x + a11 * y + a21 * z + a[13];
            out[14] = a02 * x + a12 * y + a22 * z + a[14];
            out[15] = a03 * x + a13 * y + a23 * z + a[15];
        }
        return out;
    }
    /**
     * Rotates a matrix by the given angle around the Z axis
     *
     * @param {mat4} out the receiving matrix
     * @param {ReadonlyMat4} a the matrix to rotate
     * @param {Number} rad the angle to rotate the matrix by
     * @returns {mat4} out
     */
    function RotateZ(out, a, rad) {
        var s = Math.sin(rad);
        var c = Math.cos(rad);
        var a00 = a[0];
        var a01 = a[1];
        var a02 = a[2];
        var a03 = a[3];
        var a10 = a[4];
        var a11 = a[5];
        var a12 = a[6];
        var a13 = a[7];
        if (a !== out) {
            // If the source and destination differ, copy the unchanged last row
            out[8] = a[8];
            out[9] = a[9];
            out[10] = a[10];
            out[11] = a[11];
            out[12] = a[12];
            out[13] = a[13];
            out[14] = a[14];
            out[15] = a[15];
        } // Perform axis-specific matrix multiplication
        out[0] = a00 * c + a10 * s;
        out[1] = a01 * c + a11 * s;
        out[2] = a02 * c + a12 * s;
        out[3] = a03 * c + a13 * s;
        out[4] = a10 * c - a00 * s;
        out[5] = a11 * c - a01 * s;
        out[6] = a12 * c - a02 * s;
        out[7] = a13 * c - a03 * s;
        return out;
    }
    /**
   * rotate existing transform matrix around given axis by angle
   *
   * @param  m      affine transfrom
   * @param  angle  angle (radians)
   * @param  axis   axis
   */
    /**
     * Rotates a mat4 by the given angle around the given axis
     *
     * @param {mat4} out the receiving matrix
     * @param {ReadonlyMat4} a the matrix to rotate
     * @param {Number} rad the angle to rotate the matrix by
     * @param {ReadonlyVec3} axis the axis to rotate around
     * @returns {mat4} out
     */
    function Rotate(out, a, rad, axis) {
        let x = axis[0], y = axis[1], z = axis[2];
        let len = Math.hypot(x, y, z);
        let s, c, t;
        let a00, a01, a02, a03;
        let a10, a11, a12, a13;
        let a20, a21, a22, a23;
        let b00, b01, b02;
        let b10, b11, b12;
        let b20, b21, b22;
        if (len < 0.000001) {
            return null;
        }
        len = 1 / len;
        x *= len;
        y *= len;
        z *= len;
        s = Math.sin(rad);
        c = Math.cos(rad);
        t = 1 - c;
        a00 = a[0];
        a01 = a[1];
        a02 = a[2];
        a03 = a[3];
        a10 = a[4];
        a11 = a[5];
        a12 = a[6];
        a13 = a[7];
        a20 = a[8];
        a21 = a[9];
        a22 = a[10];
        a23 = a[11];
        // Construct the elements of the rotation matrix
        b00 = x * x * t + c;
        b01 = y * x * t + z * s;
        b02 = z * x * t - y * s;
        b10 = x * y * t - z * s;
        b11 = y * y * t + c;
        b12 = z * y * t + x * s;
        b20 = x * z * t + y * s;
        b21 = y * z * t - x * s;
        b22 = z * z * t + c;
        // Perform rotation-specific matrix multiplication
        out[0] = a00 * b00 + a10 * b01 + a20 * b02;
        out[1] = a01 * b00 + a11 * b01 + a21 * b02;
        out[2] = a02 * b00 + a12 * b01 + a22 * b02;
        out[3] = a03 * b00 + a13 * b01 + a23 * b02;
        out[4] = a00 * b10 + a10 * b11 + a20 * b12;
        out[5] = a01 * b10 + a11 * b11 + a21 * b12;
        out[6] = a02 * b10 + a12 * b11 + a22 * b12;
        out[7] = a03 * b10 + a13 * b11 + a23 * b12;
        out[8] = a00 * b20 + a10 * b21 + a20 * b22;
        out[9] = a01 * b20 + a11 * b21 + a21 * b22;
        out[10] = a02 * b20 + a12 * b21 + a22 * b22;
        out[11] = a03 * b20 + a13 * b21 + a23 * b22;
        if (a !== out) {
            // If the source and destination differ, copy the unchanged last row
            out[12] = a[12];
            out[13] = a[13];
            out[14] = a[14];
            out[15] = a[15];
        }
        return out;
    }
    exports.Rotate = Rotate;
    /**
     * scales existing transform matrix by v vector
     * and stores result in same matrix
     *
     * @param  m  affine transfrom
     * @param  v  scale vector [x, y, z]
     * @returns scaled Vec3
     */
    /**
     * Scales the mat4 by the dimensions in the given vec3 not using vectorization
     *
     * @param {mat4} out the receiving matrix
     * @param {ReadonlyMat4} a the matrix to scale
     * @param {ReadonlyVec3} v the vec3 to scale the matrix by
     * @returns {mat4} out
     **/
    function Scale(out, a, v) {
        let x = v[0], y = v[1], z = v[2];
        out[0] = a[0] * x;
        out[1] = a[1] * x;
        out[2] = a[2] * x;
        out[3] = a[3] * x;
        out[4] = a[4] * y;
        out[5] = a[5] * y;
        out[6] = a[6] * y;
        out[7] = a[7] * y;
        out[8] = a[8] * z;
        out[9] = a[9] * z;
        out[10] = a[10] * z;
        out[11] = a[11] * z;
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
        return out;
    }
    exports.Scale = Scale;
});
define("common/dna/Game", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Game = void 0;
    class Game {
        /**
         * Create the webgl canvas and declare a
         * global WebGL2RenderingContext named 'gl'
         * @returns
         */
        constructor() {
            this.render_lock = false;
            this.canvas = document.createElement('canvas');
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            document.body.appendChild(this.canvas);
            Object.defineProperty(window, 'gl', { value: this.canvas.getContext('webgl2') });
            if (!gl)
                console.log("WebGL 2 needed");
            window.onresize = () => { this.FramebufferSizeCallback(window.innerWidth, window.innerHeight); };
        }
        FramebufferSizeCallback(width, height) {
            // make sure the viewport matches the new window dimensions note that width and 
            // height will be significantly larger than specified on retina displays.
            console.log(`new width ${width} and height ${height}`);
            this.canvas.width = width;
            this.canvas.height = height;
            gl.viewport(0, 0, width, height);
            requestAnimationFrame(this.Render.bind(this));
        }
    }
    exports.Game = Game;
});
define("common/dna/Shader", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Shader = void 0;
    class Shader {
        constructor(vertexCode, fragmentCode) {
            this.createShader = function (source, type) {
                const shader = gl.createShader(type);
                gl.shaderSource(shader, source);
                gl.compileShader(shader);
                return shader;
            };
            const program = gl.createProgram();
            const vshader = this.createShader(vertexCode, gl.VERTEX_SHADER);
            const fshader = this.createShader(fragmentCode, gl.FRAGMENT_SHADER);
            gl.attachShader(program, vshader);
            gl.deleteShader(vshader);
            gl.attachShader(program, fshader);
            gl.deleteShader(fshader);
            gl.linkProgram(program);
            let log = gl.getProgramInfoLog(program);
            if (log) {
                console.log(log);
            }
            log = gl.getShaderInfoLog(vshader);
            if (log) {
                console.log(log);
            }
            log = gl.getShaderInfoLog(fshader);
            if (log) {
                console.log(log);
            }
            this.Id = program;
        }
        ;
        // activate the shader
        // ------------------------------------------------------------------------
        Use() {
            gl.useProgram(this.Id);
            return this;
        }
        // utility uniform functions
        // ------------------------------------------------------------------------
        SetBoolean(name, value, useShader = true) {
            if (useShader)
                this.Use();
            gl.uniform1i(gl.getUniformLocation(this.Id, name), value ? 1 : 0);
        }
        // ------------------------------------------------------------------------
        SetInt(name, value, useShader = true) {
            if (useShader)
                this.Use();
            gl.uniform1i(gl.getUniformLocation(this.Id, name), value);
        }
        // ------------------------------------------------------------------------
        SetFloat(name, value, useShader = true) {
            if (useShader)
                this.Use();
            gl.uniform1f(gl.getUniformLocation(this.Id, name), value);
        }
        // ------------------------------------------------------------------------
        SetFloat2(name, value1, value2, useShader = true) {
            if (useShader)
                this.Use();
            gl.uniform2f(gl.getUniformLocation(this.Id, name), value1, value2);
        }
        SetFloat3(name, value1, value2, value3, useShader = true) {
            if (useShader)
                this.Use();
            gl.uniform3f(gl.getUniformLocation(this.Id, name), value1, value2, value3);
        }
        SetFloat4(name, value1, value2, value3, value4, useShader = true) {
            if (useShader)
                this.Use();
            gl.uniform4f(gl.getUniformLocation(this.Id, name), value1, value2, value3, value4);
        }
        SetVector3(name, value, useShader = true) {
            if (useShader)
                this.Use();
            gl.uniform3fv(gl.getUniformLocation(this.Id, name), value);
        }
        SetVector4(name, value, useShader = true) {
            if (useShader)
                this.Use();
            gl.uniform4fv(gl.getUniformLocation(this.Id, name), value);
        }
        SetMatrix(name, value, useShader = true) {
            if (useShader)
                this.Use();
            gl.uniformMatrix4fv(gl.getUniformLocation(this.Id, name), false, value);
        }
    }
    exports.Shader = Shader;
});
define("common/dna/Texture2D", ["require", "exports"], function (require, exports) {
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
        constructor(path, internalFormat = gl.RGB, imageFormat = gl.RGB) {
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
            this.data = data;
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
        /**
         * Binds our texture to the webgl at display time
         */
        Bind() {
            gl.bindTexture(gl.TEXTURE_2D, this.Id);
        }
    }
    exports.Texture2D = Texture2D;
});
define("common/dna/ResourceManager", ["require", "exports", "common/dna/Shader", "common/dna/Texture2D"], function (require, exports, Shader_1, Texture2D_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ResourceManager = void 0;
    class ResourceManager {
        /**
         *
         * @param source url to resource
         * @param type fetch | type
         * @param name store as name
         */
        static DefineAsset(source, type, name) {
            switch (type) {
                case 'fetch':
                    ResourceManager.Assets.set(name, { name: name, source: source, type: type });
                    break;
                case 'image':
                    ResourceManager.Assets.set(name, { name: name, source: source, type: type });
                    break;
            }
        }
        /**
         *
         * @param done callback when done loading
         */
        static Preload(done) {
            var x;
            var assets = new Array();
            /* Look for any preload links - load these first */
            const links = document.getElementsByTagName("link");
            for (var i = 0; i < links.length; i++) {
                const asset = links[i];
                const url = new URL(asset.href);
                if (url.pathname.indexOf('/assets/') >= 0 && asset.getAttribute('rel') == 'preload') {
                    const name = asset.getAttribute('name');
                    const type = asset.getAttribute('as');
                    assets.push({ name: name, source: asset.href, type: type });
                }
            }
            /* Next get assets provided via DefineAsset */
            ResourceManager.Assets.forEach(asset => { assets.push(asset); });
            var count = assets.length;
            assets.forEach(asset => {
                switch (asset.type) {
                    case 'fetch':
                        x = new XMLHttpRequest();
                        x.onload = function () {
                            ResourceManager.Fetched.set(asset.name, this.responseText);
                            count--;
                            if (count <= 0)
                                done();
                        };
                        x.open("GET", asset.source);
                        x.send();
                        break;
                    case 'image':
                        const image = new Image();
                        image.onload = function () {
                            ResourceManager.Images.set(asset.name, image);
                            count--;
                            if (count <= 0)
                                done();
                        };
                        image.src = asset.source;
                        break;
                }
            });
        }
        static LoadShader(vShader, fShader, name) {
            var vertexShaderSource = ResourceManager.Fetched.get(vShader);
            var fragmentShaderSource = ResourceManager.Fetched.get(fShader);
            var shader = new Shader_1.Shader(vertexShaderSource, fragmentShaderSource);
            ResourceManager.Shaders.set(name, shader);
        }
        static LoadTexture(name) {
            var t = new Texture2D_1.Texture2D(name);
            var i = ResourceManager.Images.get(name);
            t.Generate(i.width, i.height, i);
            ResourceManager.Textures.set(name, t);
        }
        // Retrieves a stored sader
        static GetShader(name) {
            return ResourceManager.Shaders.get(name);
        }
        // Retrieves a stored texture
        static GetTexture(name) {
            return ResourceManager.Textures.get(name);
        }
        // Properly de-allocates all loaded resources
        static Clear() {
            // (Properly) delete all shaders	
            ResourceManager.Shaders.forEach((s) => gl.deleteProgram(s.Id));
            // (Properly) delete all textures
            ResourceManager.Textures.forEach((t) => gl.deleteTexture(t.Id));
        }
    }
    exports.ResourceManager = ResourceManager;
    ResourceManager.Shaders = new Map();
    ResourceManager.Textures = new Map();
    ResourceManager.Assets = new Map();
    ResourceManager.Images = new Map();
    ResourceManager.Fetched = new Map();
});
define("common/dna/ArrayRenderer", ["require", "exports", "common/dna/tglm"], function (require, exports, tglm_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.ArrayRenderer = exports.Rect = void 0;
    const WHITE = tglm_1.Vec3.Create(1, 1, 1);
    class Rect {
        constructor(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;
        }
    }
    exports.Rect = Rect;
    class ArrayRenderer {
        /**
         *
         * @param shader
         */
        constructor(shader) {
            this.shader = shader;
            const vertices = new Float32Array([
                // Pos      // Tex
                0.0, 1.0, 0.0, 1.0,
                1.0, 0.0, 1.0, 0.0,
                0.0, 0.0, 0.0, 0.0,
                0.0, 1.0, 0.0, 1.0,
                1.0, 1.0, 1.0, 1.0,
                1.0, 0.0, 1.0, 0.0
            ]);
            this.VAO = gl.createVertexArray();
            this.VBO = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
            gl.bindVertexArray(this.VAO);
            gl.enableVertexAttribArray(0);
            gl.vertexAttribPointer(0, 4, gl.FLOAT, false, 4 * 4, 0);
            gl.bindBuffer(gl.ARRAY_BUFFER, null);
            gl.bindVertexArray(null);
        }
        Draw(texture, bounds, rotate = 0, color = WHITE) {
            this.shader.Use();
            var model = tglm_1.Mat4.Create(1);
            /**
             * transformations are:
             *  scale happens first,
             *  then rotation and
             *  then finally translation happens;
             *
             *  reversed the order to get:
             */
            // 1) translate position:
            tglm_1.Mat4.Translate(model, model, tglm_1.Vec3.Create(bounds.x, bounds.y, 0));
            // 2) rotate:
            //  a. Move origin of rotation to center of quad
            tglm_1.Mat4.Translate(model, model, tglm_1.Vec3.Create(0.5 * bounds.width, 0.5 * bounds.height, 0));
            //  b. Then rotate
            tglm_1.Mat4.Rotate(model, model, rotate, tglm_1.Vec3.Create(0, 0, 1));
            //  c. Move origin back
            tglm_1.Mat4.Translate(model, model, tglm_1.Vec3.Create(-0.5 * bounds.width, -0.5 * bounds.height, 0));
            // 3) scale
            tglm_1.Mat4.Scale(model, model, tglm_1.Vec3.Create(bounds.width, bounds.height, 1));
            this.shader.SetMatrix("model", model);
            this.shader.SetVector3("spriteColor", color);
            gl.activeTexture(gl.TEXTURE0);
            texture.Bind();
            gl.bindVertexArray(this.VAO);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            gl.bindVertexArray(null);
        }
    }
    exports.ArrayRenderer = ArrayRenderer;
});
define("common/dna/index", ["require", "exports", "common/dna/tglm", "common/dna/Game", "common/dna/ResourceManager", "common/dna/Shader", "common/dna/ArrayRenderer", "common/dna/Texture2D"], function (require, exports, tglm_2, Game_1, ResourceManager_1, Shader_2, ArrayRenderer_1, Texture2D_2) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Vec4 = exports.Vec3 = exports.Texture2D = exports.Shader = exports.ResourceManager = exports.Rect = exports.Mat4 = exports.Game = exports.ArrayRenderer = void 0;
    Object.defineProperty(exports, "Mat4", { enumerable: true, get: function () { return tglm_2.Mat4; } });
    Object.defineProperty(exports, "Vec3", { enumerable: true, get: function () { return tglm_2.Vec3; } });
    Object.defineProperty(exports, "Vec4", { enumerable: true, get: function () { return tglm_2.Vec4; } });
    Object.defineProperty(exports, "Game", { enumerable: true, get: function () { return Game_1.Game; } });
    Object.defineProperty(exports, "ResourceManager", { enumerable: true, get: function () { return ResourceManager_1.ResourceManager; } });
    Object.defineProperty(exports, "Shader", { enumerable: true, get: function () { return Shader_2.Shader; } });
    Object.defineProperty(exports, "ArrayRenderer", { enumerable: true, get: function () { return ArrayRenderer_1.ArrayRenderer; } });
    Object.defineProperty(exports, "Rect", { enumerable: true, get: function () { return ArrayRenderer_1.Rect; } });
    Object.defineProperty(exports, "Texture2D", { enumerable: true, get: function () { return Texture2D_2.Texture2D; } });
});
define("breakout/DemoGame", ["require", "exports", "common/dna/index"], function (require, exports, dna_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.DemoGame = void 0;
    class DemoGame extends dna_1.Game {
        constructor(width, height, title) {
            super();
            this.width = width;
            this.height = height;
            this.title = title;
            dna_1.ResourceManager.Preload(() => this.ContentLoaded());
        }
        Initialize() {
            console.log('Initialize - host ready');
        }
        ContentLoaded() {
            console.log('ContentLoaded - resource manager ready');
            dna_1.ResourceManager.LoadShader("sprite_vs", "sprite_frag", "sprite");
            dna_1.ResourceManager.LoadTexture("container");
            dna_1.ResourceManager.LoadTexture("awesomeface");
            this.shader = dna_1.ResourceManager.GetShader("sprite");
            this.renderer = new dna_1.ArrayRenderer(this.shader);
            this.image1 = dna_1.ResourceManager.GetTexture("container");
            this.shader.Use();
            var projection = dna_1.Mat4.Create();
            dna_1.Mat4.Ortho(projection, 0, this.width, this.height, 0, -1, 1);
            this.shader.SetMatrix("projection", projection);
            this.Start();
        }
        Start() {
            console.log('Start game!');
            requestAnimationFrame(this.Render.bind(this));
        }
        Render() {
            this.render_lock = true;
            gl.clearColor(0.2, 0.3, 0.3, 1.0);
            gl.clear(gl.COLOR_BUFFER_BIT);
            this.renderer.Draw(this.image1, new dna_1.Rect(100, 100, 200, 100));
            requestAnimationFrame(this.Render.bind(this));
            this.render_lock = false;
            this.Update();
        }
        Update() {
            if (this.render_lock)
                return;
        }
        ProcessInput() {
        }
    }
    exports.DemoGame = DemoGame;
});
define("breakout/Program", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Program = void 0;
    class Program {
        constructor(vtable) {
            this.vtable = vtable;
        }
        Run(entry) {
            this.vtable[entry]();
            const t1 = this.vtable['add'](1, 2);
            const t2 = this.vtable['sub'](1, 2);
            console.log(`t1 = ${t1} t2 = ${t2}`);
        }
    }
    exports.Program = Program;
});
define("breakout/Bindings", ["require", "exports", "breakout/DemoGame", "breakout/Program"], function (require, exports, DemoGame_1, Program_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.WasmRun = void 0;
    // var vtable:any
    /**
     * WasmRun
     *
     * @param file wasm file to load
     * @param entry entry point
     */
    function WasmRun(file, entry) {
        const reference = [];
        WebAssembly.instantiateStreaming(fetch(file), {
            'game': {
                'create': () => {
                    reference.push(new DemoGame_1.DemoGame(600, 400, "Demo"));
                    return reference.length - 1;
                },
                'update': (id) => reference[id].Update(),
                'initialize': (id) => reference[id].Initialize()
            }
        }).then((result) => {
            var main = new Program_1.Program(result.instance.exports);
            main.Run(entry);
        }).catch((e) => console.error(e));
    }
    exports.WasmRun = WasmRun;
});
define("breakout/main", ["require", "exports", "breakout/Bindings"], function (require, exports, Bindings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Bindings_1.WasmRun('main.wasm', 'main');
});
//# sourceMappingURL=app.js.map
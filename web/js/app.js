/**
 * define amd module
 *
 * @param {dict} modules
 *
 */
const define = ((modules) => {
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
        const args = [(_) => modules[_].exports, exports];
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
define("common/tglm", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.RotateZ = exports.Translate = exports.MatIdentity = exports.Mat4 = exports.Vec3 = void 0;
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
    exports.Mat4 = {
        Identity: () => new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]),
        Translate: Translate,
        RotateZ: RotateZ,
    };
    const MatIdentity = () => new Float32Array([1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1]);
    exports.MatIdentity = MatIdentity;
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
    exports.Translate = Translate;
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
    exports.RotateZ = RotateZ;
});
define("common/shader", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Shader = void 0;
    class Shader {
        constructor(gl, vertexCode, fragmentCode) {
            this.createShader = function (gl, source, type) {
                const shader = gl.createShader(type);
                gl.shaderSource(shader, source);
                gl.compileShader(shader);
                return shader;
            };
            const program = gl.createProgram();
            const vshader = this.createShader(gl, vertexCode, gl.VERTEX_SHADER);
            const fshader = this.createShader(gl, fragmentCode, gl.FRAGMENT_SHADER);
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
            this.programId = program;
        }
        ;
        // activate the shader
        // ------------------------------------------------------------------------
        use(gl) {
            gl.useProgram(this.programId);
            return this;
        }
        // utility uniform functions
        // ------------------------------------------------------------------------
        setBoolean(gl, name, value) {
            gl.uniform1i(gl.getUniformLocation(this.programId, name), value ? 1 : 0);
        }
        // ------------------------------------------------------------------------
        setInt(gl, name, value) {
            gl.uniform1i(gl.getUniformLocation(this.programId, name), value);
        }
        // ------------------------------------------------------------------------
        setFloat(gl, name, value) {
            gl.uniform1f(gl.getUniformLocation(this.programId, name), value);
        }
        // ------------------------------------------------------------------------
        setFloat2(gl, name, value1, value2) {
            gl.uniform2f(gl.getUniformLocation(this.programId, name), value1, value2);
        }
        setFloat3(gl, name, value1, value2, value3) {
            gl.uniform3f(gl.getUniformLocation(this.programId, name), value1, value2, value3);
        }
        setFloat4(gl, name, value1, value2, value3, value4) {
            gl.uniform4f(gl.getUniformLocation(this.programId, name), value1, value2, value3, value4);
        }
    }
    exports.Shader = Shader;
});
// private:
// // utility function for checking shader compilation/linking errors.
// // ------------------------------------------------------------------------
// void checkCompileErrors(GLuint shader, std:: string type)
// {
//     GLint success;
//     GLchar infoLog[1024];
//     if (type != "PROGRAM") {
//         glGetShaderiv(shader, GL_COMPILE_STATUS, & success);
//         if (!success) {
//             glGetShaderInfoLog(shader, 1024, NULL, infoLog);
//             std:: cout << "ERROR::SHADER_COMPILATION_ERROR of type: " << type << "\n" << infoLog << "\n -- --------------------------------------------------- -- " << std:: endl;
//         }
//     }
//     else {
//         glGetProgramiv(shader, GL_LINK_STATUS, & success);
//         if (!success) {
//             glGetProgramInfoLog(shader, 1024, NULL, infoLog);
//             std:: cout << "ERROR::PROGRAM_LINKING_ERROR of type: " << type << "\n" << infoLog << "\n -- --------------------------------------------------- -- " << std:: endl;
//         }
//     }
// }
// };
// #endif
// Vertex shader program
define("wasm/shader_source", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.fragmentShaderSource = exports.vertexShaderSource = void 0;
    exports.vertexShaderSource = `#version 300 es
layout (location = 0) in vec3 aPos;
layout (location = 1) in vec2 aTexCoord;

out vec2 TexCoord;

uniform mat4 transform;

void main()
{
	gl_Position = transform * vec4(aPos, 1.0);
	TexCoord = vec2(aTexCoord.x, aTexCoord.y);
}`;
    // Fragment shader program
    exports.fragmentShaderSource = `#version 300 es 
precision mediump float;
out vec4 FragColor;

in vec2 TexCoord;

// texture samplers
uniform sampler2D texture1;
uniform sampler2D texture2;

void main()
{
	// linearly interpolate between both textures (80% container, 20% awesomeface)
	FragColor = mix(texture(texture1, TexCoord), texture(texture2, TexCoord), 0.2);
}`;
});
define("wasm/Game", ["require", "exports", "common/tglm", "common/shader", "wasm/shader_source"], function (require, exports, tglm_1, shader_1, shader_source_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Game = void 0;
    // settings
    const sizeFloat = 4;
    var gl;
    class Game {
        constructor() {
            // canvas creation and initializing OpenGL context 
            this.canvas = document.createElement('canvas');
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
            document.body.appendChild(this.canvas);
            gl = this.canvas.getContext('webgl2');
            if (!gl) {
                console.log("WebGL 2 needed");
                return;
            }
            // Event handler to resize the canvas when the document view is changed
            window.onresize = () => { this.framebufferSizeCallback(window.innerWidth, window.innerHeight); };
            // this.Initialize.bind(this)
            // this.Render.bind(this)
            // this.Update.bind(this)
            // this.ProcessInput.bind(this)
        }
        Initialize() {
            // build and compile our shader zprogram
            // ------------------------------------
            this.ourShader = new shader_1.Shader(gl, shader_source_1.vertexShaderSource, shader_source_1.fragmentShaderSource);
            // set up vertex data (and buffer(s)) and configure vertex attributes
            // ------------------------------------------------------------------
            let vertices = new Float32Array([
                // positions          // texture coords
                0.5, 0.5, 0.0, 1.0, 1.0,
                0.5, -0.5, 0.0, 1.0, 0.0,
                -0.5, -0.5, 0.0, 0.0, 0.0,
                -0.5, 0.5, 0.0, 0.0, 1.0 // top left 
            ]);
            let indices = new Uint16Array([
                0, 1, 3,
                1, 2, 3 // second triangle
            ]);
            this.VAO = gl.createVertexArray();
            let VBO = gl.createBuffer();
            let EBO = gl.createBuffer();
            gl.bindVertexArray(this.VAO);
            gl.bindBuffer(gl.ARRAY_BUFFER, VBO);
            gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, EBO);
            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);
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
            const image1 = new Image();
            image1.onload = () => {
                gl.bindTexture(gl.TEXTURE_2D, this.texture1);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image1);
                // set the texture wrapping parameters
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
                // set texture filtering parameters
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.generateMipmap(gl.TEXTURE_2D);
            };
            image1.src = "textures/container.jpg";
            // texture 2
            // ---------
            this.texture2 = gl.createTexture();
            // init the blue pixel
            this.initTexture(gl, this.texture2);
            const image2 = new Image();
            image2.onload = () => {
                gl.bindTexture(gl.TEXTURE_2D, this.texture2);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image2);
                // set the texture wrapping parameters
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
                // set texture filtering parameters
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
                gl.generateMipmap(gl.TEXTURE_2D);
            };
            image2.src = "textures/awesomeface.png";
            // tell opengl for each sampler to which texture unit it belongs to (only has to be done once)
            // -------------------------------------------------------------------------------------------
            this.ourShader.use(gl);
            this.ourShader.setInt(gl, "texture1", 0);
            this.ourShader.setInt(gl, "texture2", 1);
            requestAnimationFrame(this.Render.bind(this));
        }
        Render() {
            // input
            // -----
            // this.ProcessInput();
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
            // glm:: mat4 transform = glm:: mat4(1.0); // make sure to initialize matrix to identity matrix first
            // transform = glm:: translate(transform, glm:: vec3(0.5, -0.5, 0.0));
            // transform = glm:: rotate(transform, (float)glfwGetTime(), glm:: vec3(0.0, 0.0, 1.0));
            const transform = tglm_1.Mat4.Identity();
            // Mat4.Translate(transform, transform, new Float32Array([0.5, -0.5, 0.0]))
            tglm_1.Mat4.Translate(transform, transform, tglm_1.Vec3.Create(0.5, -0.5, 0.0));
            tglm_1.Mat4.RotateZ(transform, transform, performance.now() / 1000);
            // let transform = mat4.create();
            // mat4.translate(transform, transform, vec3.fromValues(0.5, -0.5, 0.0));
            // mat4.rotateZ(transform, transform, performance.now() / 1000);
            // get matrix's uniform location and set matrix
            this.ourShader.use(gl);
            let transformLoc = gl.getUniformLocation(this.ourShader.programId, "transform");
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
            //     glfwSetWindowShouldClose(window, true);
        }
        framebufferSizeCallback(width, height) {
            // make sure the viewport matches the new window dimensions; note that width and 
            // height will be significantly larger than specified on retina displays.
            this.canvas.width = width;
            this.canvas.height = height;
            gl.viewport(0, 0, width, height);
            requestAnimationFrame(this.Render.bind(this));
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
    exports.Game = Game;
});
define("wasm/Program", ["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.Program = void 0;
    class Program {
        constructor(vtable) {
            this.vtable = vtable;
        }
        run(entry) {
            this.vtable[entry]();
            const t1 = this.vtable['add'](1, 2);
            const t2 = this.vtable['sub'](1, 2);
            console.log(`t1 = ${t1} t2 = ${t2}`);
            // let g = new Game()
            // g.Initialize()
        }
    }
    exports.Program = Program;
});
define("wasm/Bindings", ["require", "exports", "wasm/Game", "wasm/Program"], function (require, exports, Game_1, Program_1) {
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
                    reference.push(new Game_1.Game());
                    return reference.length - 1;
                },
                'update': (id) => reference[id].Update(),
                'initialize': (id) => reference[id].Initialize()
            }
        }).then((result) => {
            var main = new Program_1.Program(result.instance.exports);
            main.run(entry);
        }).catch((e) => console.error(e));
    }
    exports.WasmRun = WasmRun;
});
define("wasm/main", ["require", "exports", "wasm/Bindings"], function (require, exports, Bindings_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    Bindings_1.WasmRun('main.wasm', 'main');
});
//# sourceMappingURL=app.js.map
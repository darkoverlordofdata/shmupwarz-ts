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
        this.Id = program;
    }
    ;
    // activate the shader
    // ------------------------------------------------------------------------
    use(gl) {
        gl.useProgram(this.Id);
        return this;
    }
    // utility uniform functions
    // ------------------------------------------------------------------------
    setBoolean(gl, name, value) {
        gl.uniform1i(gl.getUniformLocation(this.Id, name), value ? 1 : 0);
    }
    // ------------------------------------------------------------------------
    setInt(gl, name, value) {
        gl.uniform1i(gl.getUniformLocation(this.Id, name), value);
    }
    // ------------------------------------------------------------------------
    setFloat(gl, name, value) {
        gl.uniform1f(gl.getUniformLocation(this.Id, name), value);
    }
    // ------------------------------------------------------------------------
    setFloat2(gl, name, value1, value2) {
        gl.uniform2f(gl.getUniformLocation(this.Id, name), value1, value2);
    }
    setFloat3(gl, name, value1, value2, value3) {
        gl.uniform3f(gl.getUniformLocation(this.Id, name), value1, value2, value3);
    }
    setFloat4(gl, name, value1, value2, value3, value4) {
        gl.uniform4f(gl.getUniformLocation(this.Id, name), value1, value2, value3, value4);
    }
}
exports.Shader = Shader;
//# sourceMappingURL=Shader.js.map
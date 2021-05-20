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
//# sourceMappingURL=shader.js.map
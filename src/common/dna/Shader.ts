
declare var gl: WebGL2RenderingContext

export class Shader {
    Id: WebGLProgram;

    private createShader = function (source: string, type: number) {
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        return shader;
    }

    constructor(vertexCode: string, fragmentCode: string) {
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
    };

    // activate the shader
    // ------------------------------------------------------------------------
    Use(): Shader {
        gl.useProgram(this.Id);
        return this;
    }

    // utility uniform functions
    // ------------------------------------------------------------------------
    SetBoolean(name: string, value: boolean, useShader: boolean = true) {
        if (useShader) this.Use()
        gl.uniform1i(gl.getUniformLocation(this.Id, name), value ? 1 : 0);
    }
    // ------------------------------------------------------------------------
    SetInt(name: string, value: number, useShader: boolean = true) {
        if (useShader) this.Use()
        gl.uniform1i(gl.getUniformLocation(this.Id, name), value);
    }
    // ------------------------------------------------------------------------
    SetFloat(name: string, value: number, useShader: boolean = true) {
        if (useShader) this.Use()
        gl.uniform1f(gl.getUniformLocation(this.Id, name), value);
    }
    // ------------------------------------------------------------------------
    SetFloat2(name: string, value1: number, value2: number, useShader: boolean = true) {
        if (useShader) this.Use()
        gl.uniform2f(gl.getUniformLocation(this.Id, name), value1, value2);
    }
    SetFloat3(name: string, value1: number, value2: number, value3: number, useShader: boolean = true) {
        if (useShader) this.Use()
        gl.uniform3f(gl.getUniformLocation(this.Id, name),
            value1, value2, value3);
    }
    SetFloat4(name: string, value1: number, value2: number, value3: number, value4: number, useShader: boolean = true) {
        if (useShader) this.Use()
        gl.uniform4f(gl.getUniformLocation(this.Id, name),
            value1, value2, value3, value4);
    }

    SetVector3(name: string, value:Float32Array, useShader: boolean = true) {
        if (useShader) this.Use()
        gl.uniform3fv(gl.getUniformLocation(this.Id, name), value)
    }

    SetVector4(name: string, value:Float32Array, useShader: boolean = true) {
        if (useShader) this.Use()
        gl.uniform4fv(gl.getUniformLocation(this.Id, name), value)
    }

    SetMatrix(name: string, value:Float32Array, useShader: boolean = true) {
        if (useShader) this.Use()
        gl.uniformMatrix4fv(gl.getUniformLocation(this.Id, name), false, value)
    }



}




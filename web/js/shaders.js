"use strict";
// Vertex shader program
Object.defineProperty(exports, "__esModule", { value: true });
exports.fragment_shader = exports.vertex_shader = void 0;
exports.vertex_shader = `
attribute vec4 aVertexPosition;
attribute vec4 aVertexColor;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying lowp vec4 vColor;

void main(void) {
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
    vColor = aVertexColor;
}
`;
// Fragment shader program
exports.fragment_shader = `
varying lowp vec4 vColor;

void main(void) {
    gl_FragColor = vColor;
}
`;
//# sourceMappingURL=shaders.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
class Game {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        document.body.appendChild(this.canvas);
        Object.defineProperty(window, 'gl', {
            value: this.canvas.getContext('webgl2'),
            writable: false
        });
        // gl = this.canvas.getContext('webgl2')
        if (!gl) {
            console.log("WebGL 2 needed");
            return;
        }
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
//# sourceMappingURL=Game.js.map
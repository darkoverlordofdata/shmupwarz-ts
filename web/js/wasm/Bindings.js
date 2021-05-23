"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WasmRun = void 0;
/**
 * Bindings for interop,
 *
 * binds Game api in wasm
 */
const Game_1 = require("./Game");
const Program_1 = require("./Program");
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
            'update': (id) => reference[id].Update()
        }
    }).then((result) => {
        var main = new Program_1.Program(result.instance.exports);
        main.run(entry);
    }).catch((e) => console.error(e));
}
exports.WasmRun = WasmRun;
//# sourceMappingURL=Bindings.js.map
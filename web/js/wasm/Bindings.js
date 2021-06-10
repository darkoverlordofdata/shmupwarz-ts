"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WasmRun = void 0;
/**
 * Bindings for interop,
 *
 * binds Game api in wasm
 */
const DemoGame_1 = require("./DemoGame");
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
                reference.push(new DemoGame_1.DemoGame());
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
//# sourceMappingURL=Bindings.js.map
const inputWat = `src/wasm/main.wat`
const outputWasm = `web/main.wasm`
require("./build").then((builder) => builder(inputWat, outputWasm))

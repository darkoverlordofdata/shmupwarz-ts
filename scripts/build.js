const { readFileSync, writeFileSync } = require("fs");

module.exports = require("wabt")().then((wabt) => {
  return (inputWat, outputWasm) => {
    console.log("building");
    const wasmModule = wabt.parseWat(inputWat, readFileSync(inputWat, "utf8"));
    const { buffer } = wasmModule.toBinary({ write_debug_names: true });
    writeFileSync(outputWasm, Buffer.from(buffer));

    var wast = wasmModule.toText({ foldExprs: false, inlineExport: false });

    console.log(wast);    
    // writeFileSync(outputWasm, new Buffer(buffer));
  };
});

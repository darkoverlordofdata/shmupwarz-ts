function b(){};var c=[];WebAssembly.instantiateStreaming(fetch("main.wasm"),{game:{createGame:function(){var a=c.length;c.push(new b);return a},update:function(){console.log("Game Update!")}}}).then(function(a){(0,a.instance.exports.main)()}).catch(function(a){console.error(a)});
//# sourceMappingURL=app.js.map

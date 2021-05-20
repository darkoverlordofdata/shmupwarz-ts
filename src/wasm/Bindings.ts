/**
 * Bindings for interop,
 * 
 * binds Game api in wasm
 */
import { Game } from './Game'

const imports = {
    'game': {
        'createGame': function() {
            return addObject(new Game())
        },
        'update': function(id:number) {
            lookupObject(id).Update()
        }
    }
};


// interop data references
var interop:any = []

// This creates a new id, puts the object into the dictionary, then returns the new id
function addObject(obj:any):number {
    const id = interop.length
    interop.push(obj)
    return id
}

// This looks up the JS object based upon its id
function lookupObject(id:number):any {
    return interop[id];
}

// This cleans up the memory for the JS object (by allowing it to be garbage collected)
function deleteObject(id:number) {
    delete interop[id];
}

export function StartUp() { 
    WebAssembly.instantiateStreaming(fetch('main.wasm'), imports).then(function (result) {
        var main:any = result.instance.exports['main'];
        main();
    }).catch(function (e) {
        console.error(e);
    });
}


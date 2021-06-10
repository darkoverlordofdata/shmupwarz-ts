/**
 * Bindings for interop,
 * 
 * binds Game api in wasm
 */
import { DemoGame } from './DemoGame'
import { Program } from './Program'
// var vtable:any

/**
 * WasmRun
 * 
 * @param file wasm file to load
 * @param entry entry point
 */
export function WasmRun(file:string, entry:string) { 
    const reference:any = []
    
    WebAssembly.instantiateStreaming(fetch(file), {
        'game': {
            'create': ():number => {
                reference.push(new DemoGame(600, 400, "Demo"))
                return reference.length-1
            },
            'update': (id:number):any => reference[id].Update(),
            'initialize': (id:number):any => reference[id].Initialize()
        }
    } ).then ( (result) => {

        var main = new Program(result.instance.exports)
        main.Run(entry)

    } ).catch ( (e) => console.error(e) )
}


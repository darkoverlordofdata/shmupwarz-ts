/**
 * define amd module
 * 
 * @param {dict} modules 
 *  
 */
const define = ((modules) => {
    /**
     * define amd module
     * 
     * @param {string}      name    string name of module
     * @param {string[]}    deps    list of dependency names
     * @param {function}    module  definition of module
     *  
     */
    return (name, deps, module) => {

        modules[name] = { 
            id: name, 
            exports: {} 
        }
        const exports = modules[name].exports;
        const args = [(_) => modules[_].exports, exports]
        for (let i = 2; i < deps.length; i++) 
            args.push(modules[deps[i]].exports)
        
        /*
        * this invokes the module, initializing it with
        * exports table and args
        */
        module.apply(exports, args)

    }
})(
    {
    /*
     *
     * module table -- link legacy modules here:
     * 'Liquid.Coffee': { id: 'Liquid.Coffee', exports: liquid },
     *
     * use:
     * liquid = require('Liquid.Coffee')
     *
     */
    }
  )

define.amd = true
define.version = '0.0.1'


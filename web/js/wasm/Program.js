"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Program = void 0;
class Program {
    constructor(vtable) {
        this.vtable = vtable;
    }
    Run(entry) {
        this.vtable[entry]();
        const t1 = this.vtable['add'](1, 2);
        const t2 = this.vtable['sub'](1, 2);
        console.log(`t1 = ${t1} t2 = ${t2}`);
    }
}
exports.Program = Program;
//# sourceMappingURL=Program.js.map
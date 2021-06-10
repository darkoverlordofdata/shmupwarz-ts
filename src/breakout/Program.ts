
export class Program
{
    vtable:any    
    constructor(vtable:any) {
        this.vtable = vtable
    }

    Run(entry:string) {
        <() => void>this.vtable[entry]()

        const t1 = this.vtable['add'](1,2)
        const t2 = this.vtable['sub'](1,2)

        console.log(`t1 = ${t1} t2 = ${t2}`)

    }

}

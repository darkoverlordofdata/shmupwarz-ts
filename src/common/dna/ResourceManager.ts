import { Shader } from './Shader'
import { Texture2D } from './Texture2D'

export interface IAsset {
    name: string
    source: string, 
    type: string    
}

declare var gl: WebGL2RenderingContext;
export class ResourceManager 
{
    static Shaders: Map<string, Shader> = new Map<string, Shader>()
    static Textures: Map<string, Texture2D> = new Map<string, Texture2D>()
    private static Assets: Map<string, any> = new Map<string, IAsset>()

    private static Images: Map<string, HTMLImageElement> = new Map<string, any>()
    private static Fetched: Map<string, string> = new Map<string, string>()
    
    /**
     * 
     * @param source url to resource
     * @param type fetch | type
     * @param name store as name
     */
    static DefineAsset(source:string, type:string, name:string) {

        switch(type) {
            case 'fetch':
                ResourceManager.Assets.set(name, { name: name, source: source, type: type })
                break

            case 'image':
                ResourceManager.Assets.set(name, { name:name, source: source, type: type })
                break
        }
    }

    /**
     * 
     * @param done callback when done loading
     */
    static Preload(done:any) {

        var x:XMLHttpRequest
        var assets = new Array<IAsset>()

        /* Look for any preload links - load these first */
        const links = document.getElementsByTagName("link")
        for (var i=0; i<links.length; i++) {
            const asset = links[i]
            const url = new URL(asset.href)
            if (url.pathname.indexOf('/assets/') >=0 && asset.getAttribute('rel') == 'preload' ) {
                const name = asset.getAttribute('name')
                const type = asset.getAttribute('as')
                assets.push({ name: name, source: asset.href, type: type })
            }
        }
        /* Next get assets provided via DefineAsset */
        ResourceManager.Assets.forEach( asset => { assets.push(asset) })

        var count = assets.length
        assets.forEach( asset => {

            switch (asset.type) {
                case 'fetch':
                    x = new XMLHttpRequest()
                    x.onload = function() {
                        ResourceManager.Fetched.set(asset.name, this.responseText)
                        count--;
                        if (count <=0 ) done()
                    }
                    x.open("GET", asset.source)
                    x.send();
                    break

                case 'image':
                    const image = new Image()
                    image.onload = function() {
                        ResourceManager.Images.set(asset.name, image)
                        count--;
                        if (count <=0 ) done()
                    }
                    image.src = asset.source
    
                break
            }
        })
    }


    static LoadShader(vShader: string, fShader: string, name: string) {
        var vertexShaderSource = ResourceManager.Fetched.get(vShader)
        var fragmentShaderSource = ResourceManager.Fetched.get(fShader)
        var shader = new Shader(vertexShaderSource, fragmentShaderSource)
        ResourceManager.Shaders.set(name, shader)
    }

    static LoadTexture(name: string) {
        var t = new Texture2D(name)
        var i = ResourceManager.Images.get(name)
        t.Generate(i.width, i.height, i)
        ResourceManager.Textures.set(name, t)    
    }

    // Retrieves a stored sader
    static GetShader(name:string):Shader {
        return ResourceManager.Shaders.get(name)
    }


    // Retrieves a stored texture
    static GetTexture(name: string): Texture2D {
        return ResourceManager.Textures.get(name)
    }

    // Properly de-allocates all loaded resources
    static Clear() {
        // (Properly) delete all shaders	
        ResourceManager.Shaders.forEach((s) => gl.deleteProgram(s.Id))
        // (Properly) delete all textures
        ResourceManager.Textures.forEach((t) => gl.deleteTexture(t.Id))
    }


}
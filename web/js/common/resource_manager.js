"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ResourceManager = void 0;
const texture2d_1 = require("./texture2d");
class ResourceManager {
    /**
     *
     * @param source url to resource
     * @param type fetch | type
     * @param name store as name
     */
    static DefineAsset(source, type, name) {
        switch (type) {
            case 'fetch':
                ResourceManager.Assets.set(name, { name: name, source: source, type: type });
                break;
            case 'image':
                ResourceManager.Assets.set(name, { name: name, source: source, type: type });
                break;
        }
    }
    /**
     *
     * @param done callback when done loading
     */
    static Preload(done) {
        var x;
        var assets = new Array();
        /* Look for any preload links - load these first */
        const links = document.getElementsByTagName("link");
        for (var i = 0; i < links.length; i++) {
            const asset = links[i];
            const url = new URL(asset.href);
            if (url.pathname.indexOf('/assets/') >= 0 && asset.getAttribute('rel') == 'preload') {
                const name = asset.getAttribute('name');
                const type = asset.getAttribute('as');
                assets.push({ name: name, source: asset.href, type: type });
            }
        }
        /* Next get assets provided via DefineAsset */
        ResourceManager.Assets.forEach(asset => { assets.push(asset); });
        var count = assets.length;
        assets.forEach(asset => {
            switch (asset.type) {
                case 'fetch':
                    x = new XMLHttpRequest();
                    x.onload = function () {
                        ResourceManager.Fetched.set(asset.name, this.responseText);
                        count--;
                        if (count <= 0)
                            done();
                    };
                    x.open("GET", asset.source);
                    x.send();
                    break;
                case 'image':
                    const image = new Image();
                    image.onload = function () {
                        ResourceManager.Images.set(asset.name, image);
                        count--;
                        if (count <= 0)
                            done();
                    };
                    image.src = asset.source;
                    break;
            }
        });
    }
    // Loads (and generates) a shader program from file loading vertex, fragment (and geometry) shader's source code. If gShaderFile is not nullptr, it also loads a geometry shader
    static LoadShader(vShaderFile, fShaderFile, gShaderFile, name) {
        ResourceManager.Shaders.set(name, ResourceManager.LoadShaderFromFile(vShaderFile, fShaderFile, gShaderFile));
        return ResourceManager.Shaders.get(name);
    }
    // Retrieves a stored sader
    static GetShader(name) {
        return ResourceManager.Shaders.get(name);
    }
    // Loads (and generates) a texture from file
    static LoadTexture(file, alpha, name) {
        ResourceManager.Textures.set(name, ResourceManager.LoadTextureFromFile(file, alpha));
        return ResourceManager.Textures.get(name);
    }
    // Retrieves a stored texture
    static GetTexture(name) {
        return ResourceManager.Textures.get(name);
    }
    // Properly de-allocates all loaded resources
    static Clear() {
        // (Properly) delete all shaders	
        ResourceManager.Shaders.forEach((s) => gl.deleteProgram(s.Id));
        // (Properly) delete all textures
        ResourceManager.Textures.forEach((t) => gl.deleteTexture(t.Id));
    }
    static LoadShaderFromFile(vShaderFile, fShaderFile, gShaderFile) {
        console.log("vertex %s\n", vShaderFile);
        console.log("fragment %s\n", fShaderFile);
        // 1. Retrieve the vertex/fragment source code from filePath
        // const shader = new Shader(gl, Shaders[vShaderFile], Shaders[fShaderFile])
        // return shader;
        return null;
    }
    /**
     * Load from preload cache
     *
     * @param file
     * @param alpha
     * @returns
     */
    static LoadTextureFromFile(file, alpha) {
        const texture = new texture2d_1.Texture2D(); //file, alpha)
        // Create Texture object
        // Texture2D texture((char*)file, alpha);
        // SDL_Surface * surface = IMG_Load(file);
        // if (SDL_MUSTLOCK(surface)) 
        //     SDL_LockSurface(surface);
        // // Now generate texture
        // console.log("%s: (%d,%d)\n", file, surface->w, surface->h);
        // texture.Generate(surface->w, surface->h, (unsigned char*)surface->pixels);
        // if (SDL_MUSTLOCK(surface)) 
        //     SDL_UnlockSurface(surface);
        // // And finally free image data
        // SDL_FreeSurface(surface);
        return texture;
    }
}
exports.ResourceManager = ResourceManager;
ResourceManager.Assets = new Map();
ResourceManager.Images = new Map();
ResourceManager.Fetched = new Map();
//# sourceMappingURL=resource_manager.js.map
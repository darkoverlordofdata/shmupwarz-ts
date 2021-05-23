# shmupwarz-ts


compile using https://github.com/theseanl/tscc

in tsconfig.json:
```
  "include": [
    "./src/hello-triangle/**/*",
  ]
```

in tscc.config.js:
```
    "modules": {
        "web/js/app": "src/hello-triangle/app.ts" 
    }
```

then use tsc for debug, tscc for release

@see https://webgl2fundamentals.org/webgl/lessons/webgl2-whats-new.html

see https://d3q3.github.io/LearnOpenGl/learnOpenGL2_p1B/part1/js/Ch8/transformations.html


currently pointed at src/wasm, interop typescript with wasm, and build with closure compiler

to build wasm: npm run build 

javascript was slow and getting slower 5 years ago. Recently, it's running much faster, thamks a lot to google's 'new' AOT compilation. Sometimes, good things come in old packages. Chromebook helps alot too - my new lenovo duet is faster than this old inspiron i3, especially the browser.

To take advantage of this, I'm using typescript to google closure compiler along with wasm interop.
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
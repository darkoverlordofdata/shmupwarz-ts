#pragma once
#include <stdlib.h>
#include <stdint.h>
#include <string.h>
#include <errno.h>
#include <time.h>
#include <unistd.h>
#include <time.h>
#include <assert.h>
#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#define GL_GLEXT_PROTOTYPES
#define EGL_EGLEXT_PROTOTYPES
#else
#include <glad/glad.h>
#endif
#include <GLFW/glfw3.h>
#include <corefw/corefw.h>
#include <dna.h>

#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#endif

#define IsDemo(object) _Generic((object), Demo * \
                                : true, default  \
                                : false)
#define AsDemo(object) _Generic((object),        \
                                Demo *           \
                                : (Demo*)object, \
                                default          \
                                : NULL)


typedef struct Demo Demo;
extern const CFWClass *DemoClass;
struct DemoVtbl;

extern DNAResourceManager* ResourceManager;

typedef enum {
    GAME_ACTIVE,
    GAME_MENU,
    GAME_WIN
} GameState;


extern void* New(Demo* this, char* title, int width, int height);
extern method void Initialize(Demo* this);
extern method void LoadContent(Demo* this);
extern method void Update(Demo* this);
extern method void Draw(Demo* this);
extern method void Run(Demo* this);

extern method void SetKey(Demo* this, int key, bool value);

extern method void SetState(Demo* this, GameState state);

extern method void Start(Demo* this);

extern method void ResetLevel(Demo* this);

extern method void ResetPlayer(Demo* this);

extern method void Dispose(Demo* this);

extern method void DoCollisions(Demo* this);

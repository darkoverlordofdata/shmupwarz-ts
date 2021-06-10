/*******************************************************************
** This code is part of Breakout.
**
** Breakout is free software: you can redistribute it and/or modify
** it under the terms of the CC BY 4.0 license as published by
** Creative Commons, either version 4 of the License, or (at your
** option) any later version.
******************************************************************/
#pragma once
#include <stdlib.h>
#include <stdio.h>
#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#define GL_GLEXT_PROTOTYPES
#define EGL_EGLEXT_PROTOTYPES
#else
#include <glad/glad.h>
#endif
#include <GLFW/glfw3.h>
#include <cfw.h>
#include <dna.h>


#define IsGameLevel(object) _Generic((object), GameLevel*: true, default: false)
#define AsGameLevel(object) _Generic((object),                          \
                            GameLevel*: (GameLevel *)object,            \
                            default: NULL)

typedef struct GameLevel GameLevel;
extern const CFWClass* GameLevelClass;

/**
 * GameLevel
 */
extern method GameLevel* New(GameLevel* this, GLchar *file, int levelWidth, int levelHeight);

extern method GameLevel* Load(GameLevel* this, GLchar *file, int levelWidth, int levelHeight);

extern method void Draw(GameLevel* this, DNAArrayRenderer* renderer);

extern method bool IsCompleted(GameLevel* this);

extern method void init(GameLevel* this, CFWArray* tileData, GLuint levelWidth, GLuint levelHeight);

extern method char* ToString(GameLevel* this);


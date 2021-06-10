/*******************************************************************
** This code is part of Breakout.
**
** Breakout is free software: you can redistribute it and/or modify
** it under the terms of the CC BY 4.0 license as published by
** Creative Commons, either version 4 of the License, or (at your
** option) any later version.
******************************************************************/
#pragma once
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

#define IsGameObject(object) _Generic((object), GameObject*: true, default: false)
#define AsGameObject(object) _Generic((object),                          \
                            GameObject*: (GameObject *)object,           \
                            default: NULL)

typedef struct GameObject GameObject;
extern const CFWClass* GameObjectClass;

extern method GameObject* New(GameObject* this, char* name, Vec2 Position, Vec2 Size, DNATexture2D* Sprite, Vec3 Color);

extern method void Draw(GameObject* this, DNAArrayRenderer* renderer);

extern method char* ToString(GameObject* this);



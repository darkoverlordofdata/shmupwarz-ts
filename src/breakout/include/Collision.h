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

#define IsCollision(object) _Generic((object), Collision * \
                                     : true, default       \
                                     : false)
#define AsCollision(object) _Generic((object),             \
                                     Collision *           \
                                     : (Collision*)object, \
                                     default               \
                                     : NULL)

typedef struct Collision Collision;
extern const CFWClass* CollisionClass;

// Represents the four possible (collision) directions
typedef enum {
    UP,
    RIGHT,
    DOWN,
    LEFT
} Direction;

extern method void* New(Collision* this, bool first, Direction second, Vec2 third);
extern method char* ToString(Collision* this);

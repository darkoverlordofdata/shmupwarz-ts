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

#define IsBallObject(object) _Generic((object), BallObject*: true, default: false)
#define AsBallObject(object) _Generic((object),                         \
                            BallObject*: (BallObject *)object,          \
                            default: NULL)

typedef struct BallObject BallObject;
extern const CFWClass* BallObjectClass;

extern method void* New(BallObject* this, Vec2 Position, float Radius, Vec2 Velocity, DNATexture2D* Sprite);

extern method void Draw(BallObject* this, DNAArrayRenderer* renderer);

extern method void Move(BallObject* this, GLfloat dt, GLuint window_width);

extern method void Reset(BallObject* this, Vec2 position, Vec2 velocity);

extern method char* ToString(BallObject*  this);

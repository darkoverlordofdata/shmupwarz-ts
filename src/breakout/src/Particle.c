/*******************************************************************
** This code is part of Breakout.
**
** Breakout is free software: you can redistribute it and/or modify
** it under the terms of the CC BY 4.0 license as published by
** Creative Commons, either version 4 of the License, or (at your
** option) any later version.
******************************************************************/
#include "GameObject-private.h"
#include "GameObject.h"
#include "ParticleGenerator-private.h"
#include "ParticleGenerator.h"

corefw(Particle);
/**
 * Create new game
 */
static bool ctor(void* self, va_list args) { return true; }
static bool equal(void* ptr1, void* ptr2) { return ptr1 == ptr2; }
static uint32_t hash(void* self) { return (uint32_t)self; }
static void* copy(void* self) { return NULL; }
static void dtor(void* self) {}

/**
 * Particle Result Tuple
 * 
 * @param isTrue collided?
 * @param dir direction from
 * @param Vec2 difference point
 */
method void* New(Particle* this, Vec2 position, Vec2 velocity, Vec4 color, GLfloat life)
{
    this->Color = color;
    this->Life = life;
    this->Position = position;
    this->Velocity = velocity;
    return this;
}

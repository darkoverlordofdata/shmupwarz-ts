/*******************************************************************
** This code is part of Breakout.
**
** Breakout is free software: you can redistribute it and/or modify
** it under the terms of the CC BY 4.0 license as published by
** Creative Commons, either version 4 of the License, or (at your
** option) any later version.
******************************************************************/
#include "cfw.h"
#include "GameObject.h"
#include "GameObject-private.h"

/** Default values */
static const Vec2 GAME_OBJECT_POSITION = { 0.0f, 0.0f };
static const Vec2 GAME_OBJECT_SIZE = { 1.0f, 1.0f };
static const Vec2 GAME_OBJECT_VELOCITY = { 0.0f, 0.0f };
static const Vec3 GAME_OBJECT_COLOR = { 1.0f, 1.0f, 1.0f };

corefw(GameObject);
/**
 * Create new game
 */
static bool ctor(void* self, va_list args) { return true; }
static bool equal(void* ptr1, void* ptr2) { return ptr1 == ptr2; }
static uint32_t hash(void* self) { return (uint32_t)self; }
static void* copy(void* self) { return NULL; }
static void dtor(void* self) {}

/**
 * Constructor
 * 
 * @param Position initial placement
 * @param Size sprite size
 * @param Sprite to display
 * @param Color tiniting color
 */
method GameObject* New(
    GameObject* this,
    char* name,
    Vec2 Position,
    Vec2 Size,
    DNATexture2D* Sprite,
    Vec3 Color)
{
    this->IsSolid = false;
    this->Destroyed = false;
    this->Position = Position;
    this->Size = Size;
    this->Rotation = 0;
    this->Sprite = Sprite;
    this->Color = Color;
    this->Name = cfw_strdup(name);

    return this;
}

/**
 * Draw
 * 
 * @param renderer to draw sprite with
 */
method void Draw(
    GameObject* this,
    DNAArrayRenderer* renderer)
{
    DNARect bounds = { this->Position.x, this->Position.y,
        this->Size.x, this->Size.y };

    Draw(renderer, this->Sprite, this->Position, this->Size, this->Rotation, this->Color);
}

/**
 * ToString
 */
method char* ToString(GameObject* this)
{
    return "GameObject";
}

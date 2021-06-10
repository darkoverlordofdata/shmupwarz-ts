/*******************************************************************
** This code is part of Breakout.
**
** Breakout is free software: you can redistribute it and/or modify
** it under the terms of the CC BY 4.0 license as published by
** Creative Commons, either version 4 of the License, or (at your
** option) any later version.
******************************************************************/
#include "GameLevel.h"
#include "Demo.h"
#include "GameLevel-private.h"
#include "GameObject-private.h"
#include "GameObject.h"

/**
 * BlockType tint color
 */
static const Vec3 COLOR0 = { 0.8f, 0.8f, 0.7f };
static const Vec3 COLOR1 = { 0.2f, 0.6f, 1.0f };
static const Vec3 COLOR2 = { 0.0f, 0.7f, 0.0f };
static const Vec3 COLOR3 = { 0.8f, 0.8f, 0.4f };
static const Vec3 COLOR4 = { 1.0f, 0.5f, 0.0f };
static const Vec3 COLOR5 = { 1.0f, 1.0f, 1.0f };

corefw(GameLevel);
/**
 * Create new game
 */
static bool ctor(void* self, va_list args) { return true; }
static bool equal(void* ptr1, void* ptr2) { return ptr1 == ptr2; }
static uint32_t hash(void* self) { return (uint32_t)self; }
static void* copy(void* self) { return NULL; }
static void dtor(void* self) {}

/**
 * GameLevel
 */
method GameLevel* New(
    GameLevel* this,
    GLchar* file,
    int levelWidth,
    int levelHeight)
{
    this->Bricks = cfw_create(cfw_array, NULL);
    Load(this, file, levelWidth, levelHeight);
    return this;
}

/**
 * Load 
 * 
 * @oaram file  text file with level data
 * @param levelWidth of level in tiles
 * @param levelHeight of level in tiles
 * 
 */
method GameLevel* Load(
    GameLevel* this,
    GLchar* file,
    int levelWidth,
    int levelHeight)
{
    // Clear old data
    Clear(this->Bricks);
    // Load from file
    GLuint tileCode;
    GameLevel* level;

    FILE* fstream = fopen(file, "r");

    // CFWFile* handle = cfw_new(cfw_file, file, "r");
    // if (!handle) {
    //     printf("Unable to open %s\n", file);
    //     return this;
    // }

    // printf("===============================================\n");
    // while (!cfw_stream_at_end(handle)) {
    //     CFWStream* line = cfw_stream_read_line(handle);
    //     printf("%s\n", cfw_string_c(line));
    // }
    // cfw_stream_close(handle);
    // printf("===============================================\n");


    CFWArray* tileData = cfw_create(cfw_array, NULL);
    CFWArray* row = cfw_create(cfw_array, NULL);
    int i;
    char c;
    if (fstream) {
        while (fscanf(fstream, "%d%c", &i, &c) != EOF) {
            Add(row, cfw_create(cfw_int, i));
            if (c == '\n') {
                Add(tileData, row);
                row = cfw_create(cfw_array, NULL);
            }
        }

        if (Length(tileData) > 0) {
            init(this, tileData, levelWidth, levelHeight);
        }
        fclose(fstream);
    }
    return this;
}

/**
 * Draw
 * 
 * @param renderer to use
 * 
 */
method void Draw(
    GameLevel* this,
    DNAArrayRenderer* renderer)
{
    for (int i = 0; i < Length(this->Bricks); i++) {
        GameObject* tile = Get(this->Bricks, i);
        if (!tile->Destroyed)
            Draw(tile, renderer);
    }
}

/**
 * IsCompleted
 * 
 * @returns true when complete
 * 
 */
method bool IsCompleted(GameLevel* this)
{
    for (int i = 0; i < Length(this->Bricks); i++) {
        GameObject* tile = Get(this->Bricks, i);
        if (tile->IsSolid && !tile->Destroyed)
            return false;
    }
    return true;
}

/**
 * init
 * 
 * @param tileData array of tiles
 * @param levelWidth of level in tiles
 * @param levelHeight of level in tiles
 *  
 */
method void init(
    GameLevel* this,
    CFWArray* tileData,
    GLuint levelWidth,
    GLuint levelHeight)
{
    // Calculate dimensions
    GLuint height = Length(tileData);
    CFWArray* row = Get(tileData, 0);
    GLuint width = Length(row); // Note we can index vector at [0] since this static inline is only called if height > 0
    GLfloat unit_width = levelWidth / (GLfloat)width, unit_height = levelHeight / height;
    // Initialize level tiles based on tileData
    for (GLuint y = 0; y < height; ++y) {
        for (GLuint x = 0; x < width; ++x) {
            // Check block type from level data (2D level array)
            CFWArray* row = Get(tileData, y);
            int blockType = cfw_int_value((Get(row, x)));

            Vec2 pos = { unit_width * x, unit_height * y };
            Vec2 size = { unit_width, unit_height };
            Vec3 color = {};
            switch (blockType) {
            case 1:
                color = COLOR1;
                break;
            case 2:
                color = COLOR2;
                break;
            case 3:
                color = COLOR3;
                break;
            case 4:
                color = COLOR4;
                break;
            case 5:
                color = COLOR5;
                break;
            default:
                color = COLOR0;
            }

            if (blockType == 1) // Solid
            {
                DNATexture2D* tex = GetTexture(ResourceManager, "block_solid");
                GameObject* obj = new (GameObject, "tile", pos, size, tex, color);
                obj->IsSolid = true;
                Add(this->Bricks, obj);
            } else if (blockType > 1) // Non-solid; now determine its color based on level data
            {
                DNATexture2D* tex = GetTexture(ResourceManager, "block");
                GameObject* obj = new (GameObject, "tile", pos, size, tex, color);
                Add(this->Bricks, obj);
            }
        }
    }
}

/**
 * ToString
 */
method char* ToString(GameLevel* this)
{
    return "GameLevel";
}

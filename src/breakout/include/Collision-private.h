/*******************************************************************
** This code is part of Breakout.
**
** Breakout is free software: you can redistribute it and/or modify
** it under the terms of the CC BY 4.0 license as published by
** Creative Commons, either version 4 of the License, or (at your
** option) any later version.
******************************************************************/
#pragma once

#include "Demo.h"
#include "Collision.h"

/** Defines a Collision Result Tuple */
struct Collision {
    bool IsTrue;
    Direction Dir;
    Vec2 Vec;
};


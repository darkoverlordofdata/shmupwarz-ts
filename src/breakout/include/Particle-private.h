/*******************************************************************
** This code is part of Breakout.
**
** Breakout is free software: you can redistribute it and/or modify
** it under the terms of the CC BY 4.0 license as published by
** Creative Commons, either version 4 of the License, or (at your
** option) any later version.
******************************************************************/
#pragma once

#include "Particle.h"

// Represents a single particle and its state
struct Particle {
    Vec2 Position;
    Vec2 Velocity;
    Vec4 Color;
    GLfloat Life;
};

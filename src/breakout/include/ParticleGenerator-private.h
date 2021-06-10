/*******************************************************************
** This code is part of Breakout.
**
** Breakout is free software: you can redistribute it and/or modify
** it under the terms of the CC BY 4.0 license as published by
** Creative Commons, either version 4 of the License, or (at your
** option) any later version.
******************************************************************/
#pragma once

#include "GameObject.h"
#include "ParticleGenerator.h"
#include "Particle.h"
#include "Particle-private.h"

// ParticleGenerator acts as a container for rendering a large number of
// particles by repeatedly spawning and updating particles and killing
// them after a given amount of time.
struct ParticleGenerator {
    CFWObject obj;
    Particle* particles;
    GLuint amount;
    DNAShader* shader;
    DNATexture2D* texture;
    GLuint VAO;
};

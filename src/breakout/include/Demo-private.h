#pragma once
#include <game-private.h>
#include "cfw.h"
#include "Demo.h"
#include "BallObject-private.h"
#include "BallObject.h"
#include "Collision-private.h"
#include "Collision.h"
#include "GameLevel-private.h"
#include "GameLevel.h"
#include "GameObject-private.h"
#include "GameObject.h"
#include "Particle-private.h"
#include "Particle.h"

struct Demo {
    CFWObject obj;
    void* subclass;
    struct DNAGameVtbl const* override;
    GLFWwindow* window;
    char* title;
    int len;
    bool* keys;
    double delta;
    double factor;
    uint64_t targetElapsedTime;
    uint64_t accumulatedElapsedTime;
    uint64_t maxElapsedTime;
    uint64_t totalGameTime;
    uint64_t elapsedGameTime;
    uint64_t currentTime;
    long previousTicks;
    int x;
    int y;
    int width;
    int height;
    uint32_t flags;
    int mouseX;
    int mouseY;
    bool mouseDown;
    int sdlVersion;
    int frameSkip;
    int gl_major_version;
    int gl_minor_version;
    bool isRunning;
    int ticks;
    int fps;
    bool isFixedTimeStep;
    bool isRunningSlowly;
    int updateFrameLag;
    bool shouldExit;
    bool suppressDraw;

    GameState State;
    CFWArray* Levels;
    GLuint Level;
};


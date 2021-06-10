#ifdef __EMSCRIPTEN__
#include <emscripten.h>
#define GL_GLEXT_PROTOTYPES
#define EGL_EGLEXT_PROTOTYPES
#else
#include <glad/glad.h>
#endif
#include <GLFW/glfw3.h>

#include "BallObject.h"
#include "Collision.h"
#include "Demo.h"
#include "GameLevel.h"
#include "GameObject.h"
#include "Particle.h"
#include "ParticleGenerator.h"

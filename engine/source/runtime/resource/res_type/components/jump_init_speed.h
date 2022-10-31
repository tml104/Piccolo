#pragma once
#include "runtime/core/meta/reflection/reflection.h"

#include "runtime/core/math/vector2.h"
#include "runtime/core/math/vector3.h"

namespace Piccolo
{
    REFLECTION_TYPE(JumpInitSpeed)
    CLASS(JumpInitSpeed, Fields)
    {
        REFLECTION_BODY(JumpInitSpeed);

    public:
        float jump_init_speed {1.0f};
    };
} // namespace Piccolo
#version 310 es

#extension GL_GOOGLE_include_directive : enable

#include "constants.h"

layout(input_attachment_index = 0, set = 0, binding = 0) uniform highp subpassInput in_color;

layout(set = 0, binding = 1) uniform sampler2D color_grading_lut_texture_sampler;

layout(location = 0) out highp vec4 out_color;

void main()
{
    highp ivec2 lut_tex_size = textureSize(color_grading_lut_texture_sampler, 0);
    highp float _COLORS      = float(lut_tex_size.y);
    highp vec4 color = subpassLoad(in_color).rgba;

    // transfer lut_tex_size to float
    highp vec2 lutTexSize = vec2(lut_tex_size.x, lut_tex_size.y);
    highp float blockNum = lutTexSize.x / lutTexSize.y;
    highp float blockIdL = floor(color.b * blockNum);
    highp float blockIdR = blockIdL + 1.0;

    highp float colorCoordXL = (blockIdL + color.r) * lutTexSize.y / lutTexSize.x;
    highp float colorCoordXR = (blockIdR + color.r) * lutTexSize.y / lutTexSize.x;
    highp float colorCoordY  = color.g;

    highp vec2 colorCoordL = vec2(colorCoordXL,colorCoordY);
    highp vec2 colorCoordR = vec2(colorCoordXR,colorCoordY);
    highp vec4 colorL = texture(color_grading_lut_texture_sampler, colorCoordL);
    highp vec4 colorR = texture(color_grading_lut_texture_sampler, colorCoordR);

    // w = color.b * blockNum - floor(color.b * blockNum);
    highp float w = color.b * blockNum - blockIdL;
    out_color = mix(colorL, colorR, w);
}
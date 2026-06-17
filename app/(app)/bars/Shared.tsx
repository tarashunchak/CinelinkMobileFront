/*import React from "react";
import type {
  SkImageFilter,
  SkRuntimeEffect,
  SkShader,
} from "@shopify/react-native-skia";
import {
  BackdropFilter,
  Canvas,
  convertToColumnMajor3,
  ImageFilter,
  processTransform2d,
  processUniforms,
  Skia,
  TileMode,
  useCanvasSize,
} from "@shopify/react-native-skia";
import {
  ReduceMotion,
  useDerivedValue,
  withSpring,
} from "react-native-reanimated";
import { View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";

import { ButtonGroup, useButtonGroup } from "./ButtonGroup";
import { Pattern } from "./Pattern";

type Value = string | number;
type Values = Value[];

export const glsl = (source: TemplateStringsArray, ...values: Values) => {
  const processed = source.flatMap((s, i) => [s, values[i]]).filter(Boolean);
  return processed.join("");
};

export const frag = (source: TemplateStringsArray, ...values: Values) => {
  const code = glsl(source, ...values);
  const rt = Skia.RuntimeEffect.Make(code);
  if (rt === null) {
    throw new Error("Couln't Compile Shader");
  }
  return rt;
};

export const baseUniforms = glsl`
uniform float progress;
uniform vec2 c1;
uniform vec4 box;
uniform float r;
`;

const source = frag`
${baseUniforms}

vec2 sdCircle(vec2 p, vec2 center, float radius) {
  vec2 offset = p - center;
  float d = length(offset) - radius;
  float t = atan(offset.y, offset.x) / (2.0 * 3.14159265) + 0.5;
  return vec2(d, t);
}

vec2 sdRoundedBox( in vec2 p, in vec2 b, in vec4 r ) {
  r.xy = (p.x>0.0) ? r.xy : r.zw;
  r.x  = (p.y>0.0) ? r.x  : r.y;
  vec2 q = abs(p)-b+r.x;
  float d = min(max(q.x,q.y),0.0) + length(max(q,0.0)) - r.x;
  
  // Approximate arc length using ellipse parameterization
  vec2 ellipseB = b + vec2(r.x); // Ellipse semi-axes matching rounded rect
  vec2 normalizedP = p / ellipseB;
  float t = atan(normalizedP.y, normalizedP.x) / (2.0 * 3.14159265) + 0.5;
  
  return vec2(d, t);
}

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5*(a-b)/k, 0.0, 1.0);
  return mix(a, b, h) - k*h*(1.0-h);
}

half4 main(float2 p) {
  float circleRadius = r * (1.0 - smoothstep(0.8, 1.0, progress));
  vec2 sdf1 = sdCircle(p + vec2(0, -r), c1, circleRadius);
  vec2 sdf2 = sdRoundedBox(p - box.xy - box.zw * 0.5, box.zw * 0.5, vec4(r));
  float k = 20 + 20 * (1.0 - abs(2.0 * progress - 1.0));
  float d = smin(sdf1.x, sdf2.x, k);
  
  // Calculate the blend factor used in smin to interpolate t
  float h = clamp(0.5 + 0.5*(sdf1.x - sdf2.x)/k, 0.0, 1.0);
  float t = mix(sdf1.y, sdf2.y, h);

  if (d > 0.0) {
     return vec4(0.0);
  }

  // Create gradient from yellow center to alternating red/green edge
  float patternFreq = 1.0; // Frequency of the alternating pattern
  float centerFactor = clamp(-d / r, 0.0, 1.0); // 0 at edge, 1 at center
  float edgePattern = sin(t * 2.0 * 3.14159265 * patternFreq) * 0.5 + 0.5; // Alternating pattern
  
  vec3 yellow = vec3(0.5, 0.5, 0.0);
  vec3 red = vec3(0.5, 0.0, 0.0);
  vec3 green = vec3(0.0, 0.5, 0.0);
  vec3 edgeColor = mix(red, green, edgePattern);
  
  vec3 color = mix(edgeColor, yellow, centerFactor);
  return vec4(color, 1.0);
}
`;

const r = 55;

interface SceneProps {
  filter?: (shader: SkShader) => SkImageFilter;
  shader?: SkRuntimeEffect;
}

export const Scene = ({
  filter: filterCB,
  shader: shaderFilter,
}: SceneProps) => {
  const { ref, size } = useCanvasSize();
  const { width, height } = size;
  const props = useButtonGroup({ width, height }, r);
  const { progress, c1, box, bounds } = props;
  const uniforms = useDerivedValue(() => {
    return {
      progress: progress.value,
      c1: c1.value,
      box: box,
      boxRadius: r,
      r,
    };
  });
  const filter = useDerivedValue(() => {
    const localMatrix = processTransform2d([
      { translateX: bounds.x },
      { translateY: bounds.y },
    ]);
    if (filterCB) {
      const shader = source.makeShader(
        processUniforms(source, uniforms.value),
        localMatrix
      );
      return filterCB(shader);
    } else if (shaderFilter) {
      const builder = Skia.RuntimeShaderBuilder(shaderFilter);
      const transform = convertToColumnMajor3(localMatrix.get());
      processUniforms(
        shaderFilter,
        {
          ...uniforms.value,
          transform,
          resolution: [width, height],
        },
        builder
      );
      return Skia.ImageFilter.MakeRuntimeShaderWithChildren(
        builder,
        0,
        ["blurredImage"],
        [Skia.ImageFilter.MakeBlur(8, 8, TileMode.Clamp)]
      );
    } else {
      throw new Error("No filter or shader provided");
    }
  });
  const gesture = Gesture.Tap().onEnd(() => {
    progress.value = withSpring(progress.value === 0 ? 1 : 0, {
      duration: 1000,
      dampingRatio: 0.5,
      overshootClamping: false,
      reduceMotion: ReduceMotion.System,
    });
  });
  return (
    <View style={{ flex: 1 }}>
      <GestureDetector gesture={gesture}>
        <Canvas style={{ flex: 1 }} ref={ref}>
          <Pattern />
          <BackdropFilter filter={<ImageFilter filter={filter} />} />
          <ButtonGroup {...props} />
        </Canvas>
      </GestureDetector>
    </View>
  );
};

const shader = frag`
${baseUniforms}
uniform mat3 transform;
uniform vec2 resolution;
uniform shader image;
uniform shader blurredImage;

float sdCircle(vec2 p, vec2 center, float radius) {
  vec2 offset = p - center;
  float d = length(offset) - radius;
  return d;
}

float sdRoundedBox( in vec2 p, in vec2 b, in vec4 r ) {
  r.xy = (p.x>0.0) ? r.xy : r.zw;
  r.x  = (p.y>0.0) ? r.x  : r.y;
  vec2 q = abs(p)-b+r.x;
  float d = min(max(q.x,q.y),0.0) + length(max(q,0.0)) - r.x;
  return d;
}

float smin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5*(a-b)/k, 0.0, 1.0);
  return mix(a, b, h) - k*h*(1.0-h);
}

vec2 project(vec2 p, mat3 m) {
  vec3 result =  inverse(m) * vec3(p, 1.0);
  return result.xy;
}

float sdf(vec2 xy) {
  vec2 p = project(xy, transform);
  float circleRadius = r * (1.0 - smoothstep(0.8, 1.0, progress));
  float sdf1 = sdCircle(p + vec2(0, -r), c1, circleRadius);
  float sdf2 = sdRoundedBox(p - box.xy - box.zw * 0.5, box.zw * 0.5, vec4(r));
  float k = 20 + 20 * (1.0 - abs(2.0 * progress - 1.0));
  float d = smin(sdf1, sdf2, k);
  return d;
}


// Gradient calculation using finite differences
vec2 calculateGradient(vec2 p) {
    const float epsilon = 0.001;
    float dx = sdf(p + vec2(epsilon, 0.0)) - sdf(p - vec2(epsilon, 0.0));
    float dy = sdf(p + vec2(0.0, epsilon)) - sdf(p - vec2(0.0, epsilon));
    return vec2(dx, dy) / (2.0 * epsilon);
}


// Thickness is the t in the doc.
vec3 getNormal(float sd, vec2 gradient, float thickness)
{
    float dx = gradient.x;
    float dy = gradient.y;
    // The cosine and sine between normal and the xy plane.
    float n_cos = max(thickness + sd, 0.0) / thickness;
    float n_sin = sqrt(1.0 - n_cos * n_cos);
    return normalize(vec3(dx * n_cos, dy * n_cos, n_sin));
}

// The height (z component) of the pad surface at sd.
float height(float sd, float thickness)
{
    if(sd >= 0.0)
    {
        return 0.0;
    }
    if(sd < -thickness)
    {
        return thickness;
    }
    float x = thickness + sd;
    return sqrt(thickness * thickness - x * x);
}


// Isolated liquid glass effect calculation
vec4 calculateLiquidGlass(float sd, vec2 g, vec2 fragCoord)
{
   float thickness = 14.0;
    float transmission = 0.9;          // Transmission strength
    float roughness = 0.1;             // Surface roughness
    float ior = 1.5;                   // Index of refraction
    float chromaticAberration = 0.03;  // Chromatic aberration strength
    float distortionScale = 1.0;       // Distortion multiplier
    
    vec3 normal = getNormal(sd, g * distortionScale, thickness);
    vec3 incident = vec3(0.0, 0.0, -1.0);
    
    // Fresnel effect - more reflection at grazing angles
    float fresnel = pow(1.0 - abs(dot(incident, normal)), 3.0);
    
    // Base refraction
    vec3 refract_vec = refract(incident, normal, 1.0/ior);
    float h = height(sd, thickness);
    float base_height = thickness * 8.0;
    float refract_length = (h + base_height) / dot(vec3(0.0, 0.0, -1.0), refract_vec);
    
    // Chromatic aberration - sample RGB channels separately
    vec2 base_coord = fragCoord + refract_vec.xy * refract_length;
    vec2 uv_base = base_coord / resolution.xy;
    
    // Offset each color channel slightly for dispersion
    vec2 offset = refract_vec.xy * chromaticAberration;
    float r = blurredImage.eval((uv_base - offset) * resolution).r;
    float g_channel = blurredImage.eval(uv_base * resolution).g;
    float b = blurredImage.eval((uv_base + offset) * resolution).b;
    vec4 refract_color = vec4(r, g_channel, b, 1.0);
    
    // Roughness-based reflection blur (simplified)
    vec3 reflect_vec = reflect(incident, normal);
    vec4 reflect_color = vec4(0.0);
    
    // Mix reflection and refraction based on fresnel and transmission
    vec4 glass_color = mix(refract_color, reflect_color, fresnel * (1.0 - transmission));
    
    return glass_color;
}

vec4 render(vec2 xy) {
  vec2 p = project(xy, transform);
  float d = sdf(xy);
  float2 g = calculateGradient(p);
  if (d > 0.0) {
    return image.eval(xy);
  } else {
    return calculateLiquidGlass(d, g, xy);
  }
}

vec4 main(vec2 fragCoord) {
  // Anti-aliasing settings
  const int samples = 4;
  float sampleStrength = 1.0/float(samples*samples);
  vec4 finalColor = vec4(0.0);
  
  // Perform supersampling
  for(int m = 0; m < samples; m++) {
    for(int n = 0; n < samples; n++) {
      // Calculate offset for this sample (only if using AA)
      vec2 offset = (samples > 1) ? 
          (vec2(float(m), float(n)) / float(samples) - 0.5/float(samples)) : 
          vec2(0.0);
      
      // Get pixel position with the offset
      vec2 p = fragCoord + offset;
      
      // Render this sample
      vec4 color = render(p);
      // Accumulate color
      finalColor += color * sampleStrength;
    }
  }
  
  return finalColor;
}`;

export const Shader2 = () => {
  return <Scene shader={shader} />;
};*/
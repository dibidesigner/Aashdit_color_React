import type { ColorScale } from '../types/color';
import { hexToRgb, rgbToOklch, oklchToRgb, rgbToHex } from './colorUtils';

/* ======================================
   PERCEPTUAL COLOR SCALE GENERATOR
   Uses OKLCH for perceptually uniform interpolation
   ====================================== */

interface ScaleConfig {
  steps: number[];
  lightnessRange: [number, number];
  chromaScale: number;
}

const SCALE_CONFIG: ScaleConfig = {
  steps: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  // Lightness: 100=brightest (0.97), 900=darkest (0.15)
  lightnessRange: [0.97, 0.15],
  chromaScale: 1.0,
};

/**
 * Generate a perceptually balanced 100–900 color scale from a base hex color.
 * The base color is mapped approximately to step 500–600.
 * Uses OKLCH color space for uniform perception.
 */
export function generateColorScale(baseHex: string): ColorScale {
  const rgb = hexToRgb(baseHex);
  const oklch = rgbToOklch(rgb);
  const closestStep = findClosestStep(baseHex);

  const lightnessMap: Record<number, number> = {
    100: 0.965,
    200: 0.92,
    300: 0.85,
    400: 0.76,
    500: 0.65,
    600: 0.535,
    700: 0.43,
    800: 0.32,
    900: 0.20,
  };

  const chromaMap: Record<number, number> = {
    100: 0.35,
    200: 0.55,
    300: 0.75,
    400: 0.88,
    500: 0.96,
    600: 1.0,
    700: 0.95,
    800: 0.85,
    900: 0.70,
  };

  const scale: Partial<ColorScale> = {};

  for (const step of SCALE_CONFIG.steps) {
    if (step === closestStep || step === 600) {
      scale[step as keyof ColorScale] = baseHex.toUpperCase();
    } else {
      const targetL = lightnessMap[step];
      const chromaFactor = chromaMap[step];
      const targetC = Math.max(0, oklch.c * chromaFactor);
      const targetH = oklch.h;
      const generated = oklchToRgb({ l: targetL, c: targetC, h: targetH });
      scale[step as keyof ColorScale] = rgbToHex(generated);
    }
  }

  return scale as ColorScale;
}

/**
 * Generate a gray scale from a base hex (tints the gray slightly with the color's hue)
 */
export function generateGrayScale(baseHex: string): ColorScale {
  const rgb = hexToRgb(baseHex);
  const oklch = rgbToOklch(rgb);

  // Gray scale has very low chroma (slight tint only)
  const lightnessMap: Record<number, number> = {
    100: 0.97,
    200: 0.92,
    300: 0.85,
    400: 0.73,
    500: 0.60,
    600: 0.47,
    700: 0.36,
    800: 0.26,
    900: 0.16,
  };

  const scale: Partial<ColorScale> = {};

  for (const step of SCALE_CONFIG.steps) {
    const targetL = lightnessMap[step];
    // Very low chroma — nearly neutral with slight hue tint
    const targetC = Math.max(0, oklch.c * 0.08);
    const targetH = oklch.h;

    const generated = oklchToRgb({ l: targetL, c: targetC, h: targetH });
    scale[step as keyof ColorScale] = rgbToHex(generated);
  }

  return scale as ColorScale;
}

/**
 * Get a single step from a color scale
 */
export function getScaleStep(scale: ColorScale, step: keyof ColorScale): string {
  return scale[step];
}

/**
 * Determine which step a base color most closely matches
 */
export function findClosestStep(baseHex: string, _scale?: ColorScale): keyof ColorScale {
  const rgb = hexToRgb(baseHex);
  const oklch = rgbToOklch(rgb);
  const l = oklch.l;

  // Based on lightness, find closest step
  if (l > 0.94) return 100;
  if (l > 0.88) return 200;
  if (l > 0.80) return 300;
  if (l > 0.70) return 400;
  if (l > 0.59) return 500;
  if (l > 0.48) return 600;
  if (l > 0.37) return 700;
  if (l > 0.26) return 800;
  return 900;
}

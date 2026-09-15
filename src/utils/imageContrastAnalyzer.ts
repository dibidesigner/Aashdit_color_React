import { getContrastRatio } from './contrast';

export interface DetectedColorPair {
  id: string;
  label: string;
  fg: string;
  bg: string;
  ratio: number;
  wcagAA: boolean;
  wcagAAA: boolean;
  wcagAALarge: boolean;
  wcagAAALarge: boolean;
  percentage: number;
  status: 'excellent' | 'good' | 'warning' | 'fail';
  suggestion?: string;
}

export interface FullDesignContrastReport {
  overallScore: number; // 0 - 100
  statusLabel: 'WCAG Compliant (AA)' | 'WCAG Compliant (AAA)' | 'Needs Review' | 'Accessibility Fail';
  dominantBg: string;
  totalPairs: number;
  passedCount: number;
  failedCount: number;
  pairs: DetectedColorPair[];
}

// Convert RGB to HEX
function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()}`;
}

// Color distance helper in RGB space
function colorDistance(hex1: string, hex2: string): number {
  const r1 = parseInt(hex1.slice(1, 3), 16);
  const g1 = parseInt(hex1.slice(3, 5), 16);
  const b1 = parseInt(hex1.slice(5, 7), 16);

  const r2 = parseInt(hex2.slice(1, 3), 16);
  const g2 = parseInt(hex2.slice(3, 5), 16);
  const b2 = parseInt(hex2.slice(5, 7), 16);

  return Math.sqrt((r1 - r2) ** 2 + (g1 - g2) ** 2 + (b1 - b2) ** 2);
}

/**
 * Automatically analyze full design screenshot contrast from an HTML Canvas element
 */
export function analyzeFullDesignContrast(canvas: HTMLCanvasElement): FullDesignContrastReport {
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return createFallbackReport('#FFFFFF', '#0F172A');
  }

  const width = canvas.width;
  const height = canvas.height;

  if (width === 0 || height === 0) {
    return createFallbackReport('#FFFFFF', '#0F172A');
  }

  const imageData = ctx.getImageData(0, 0, width, height).data;

  // 1. Color Frequency Bucket Map
  const colorCounts: { [hex: string]: number } = {};
  const totalPixels = width * height;
  const sampleStep = Math.max(1, Math.floor(Math.sqrt(totalPixels / 2500))); // Sample ~2500 points for speed & accuracy

  for (let y = 0; y < height; y += sampleStep) {
    for (let x = 0; x < width; x += sampleStep) {
      const idx = (y * width + x) * 4;
      const alpha = imageData[idx + 3];
      if (alpha < 128) continue; // Skip transparent pixels

      // Quantize slightly to group similar colors (round RGB to nearest 8)
      const r = Math.round(imageData[idx] / 8) * 8;
      const g = Math.round(imageData[idx + 1] / 8) * 8;
      const b = Math.round(imageData[idx + 2] / 8) * 8;

      const hex = rgbToHex(Math.min(255, r), Math.min(255, g), Math.min(255, b));
      colorCounts[hex] = (colorCounts[hex] || 0) + 1;
    }
  }

  // 2. Find Dominant Colors (Backgrounds & Foregrounds)
  const sortedColors = Object.entries(colorCounts)
    .map(([hex, count]) => ({ hex, count }))
    .sort((a, b) => b.count - a.count);

  if (sortedColors.length === 0) {
    return createFallbackReport('#FFFFFF', '#0F172A');
  }

  // Primary dominant background color (most frequent color)
  const dominantBg = sortedColors[0].hex;

  // Filter distinct candidate colors (minimum distance from each other)
  const distinctColors: { hex: string; count: number }[] = [];
  for (const item of sortedColors) {
    const isTooClose = distinctColors.some((existing) => colorDistance(existing.hex, item.hex) < 35);
    if (!isTooClose) {
      distinctColors.push(item);
    }
    if (distinctColors.length >= 8) break;
  }

  // 3. Form Pairs & Evaluate Contrast
  const detectedPairs: DetectedColorPair[] = [];
  const primaryBg = distinctColors[0]?.hex || '#0B1626';

  // Pair distinct foreground candidate colors with primary background & secondary backgrounds
  let pairIndex = 1;
  for (let i = 1; i < distinctColors.length; i++) {
    const fg = distinctColors[i].hex;
    const bg = primaryBg;

    const ratio = Math.round(getContrastRatio(fg, bg) * 100) / 100;
    const wcagAA = ratio >= 4.5;
    const wcagAAA = ratio >= 7.0;
    const wcagAALarge = ratio >= 3.0;
    const wcagAAALarge = ratio >= 4.5;

    let status: DetectedColorPair['status'] = 'fail';
    if (ratio >= 7.0) status = 'excellent';
    else if (ratio >= 4.5) status = 'good';
    else if (ratio >= 3.0) status = 'warning';
    else status = 'fail';

    let label = `UI Element ${pairIndex} on Main Background`;
    if (i === 1) label = 'Primary Text / Headings on Background';
    else if (i === 2) label = 'Secondary Text / Subtitles on Surface';
    else if (i === 3) label = 'Action Button / Badge Text on Surface';
    else if (i === 4) label = 'Muted / Secondary UI Details';

    let suggestion: string | undefined = undefined;
    if (ratio < 4.5 && ratio >= 3.0) {
      suggestion = 'Passes large text only (3:1). Increase text weight or darken/lighten color for body text.';
    } else if (ratio < 3.0) {
      suggestion = 'Fails WCAG 2.1 minimum. Needs higher contrast difference between text and background.';
    }

    detectedPairs.push({
      id: `pair-${pairIndex}`,
      label,
      fg,
      bg,
      ratio,
      wcagAA,
      wcagAAA,
      wcagAALarge,
      wcagAAALarge,
      percentage: Math.round((distinctColors[i].count / (totalPixels / (sampleStep * sampleStep))) * 100),
      status,
      suggestion,
    });

    pairIndex++;
  }

  // If design is monochromatic or only 1 distinct color detected, add fallback pair
  if (detectedPairs.length === 0) {
    const secondaryColor = sortedColors[1]?.hex || '#1683FF';
    const ratio = Math.round(getContrastRatio(secondaryColor, dominantBg) * 100) / 100;
    detectedPairs.push({
      id: 'pair-1',
      label: 'Main Accent / Text on Surface',
      fg: secondaryColor,
      bg: dominantBg,
      ratio,
      wcagAA: ratio >= 4.5,
      wcagAAA: ratio >= 7.0,
      wcagAALarge: ratio >= 3.0,
      wcagAAALarge: ratio >= 4.5,
      percentage: 15,
      status: ratio >= 4.5 ? 'good' : 'fail',
    });
  }

  // 4. Calculate Overall Full Design Score & Status
  const passedCount = detectedPairs.filter((p) => p.wcagAA || p.wcagAALarge).length;
  const totalPairs = detectedPairs.length;
  const passedAACount = detectedPairs.filter((p) => p.wcagAA).length;
  const passedAAACount = detectedPairs.filter((p) => p.wcagAAA).length;

  const overallScore = Math.round(
    (detectedPairs.reduce((acc, p) => {
      if (p.ratio >= 7.0) return acc + 100;
      if (p.ratio >= 4.5) return acc + 85;
      if (p.ratio >= 3.0) return acc + 60;
      return acc + 20;
    }, 0) / (totalPairs * 100)) * 100
  );

  let statusLabel: FullDesignContrastReport['statusLabel'] = 'Needs Review';
  if (passedAAACount === totalPairs) {
    statusLabel = 'WCAG Compliant (AAA)';
  } else if (passedAACount >= Math.ceil(totalPairs * 0.75)) {
    statusLabel = 'WCAG Compliant (AA)';
  } else if (overallScore < 50) {
    statusLabel = 'Accessibility Fail';
  }

  return {
    overallScore,
    statusLabel,
    dominantBg,
    totalPairs,
    passedCount,
    failedCount: totalPairs - passedCount,
    pairs: detectedPairs,
  };
}

function createFallbackReport(fg: string, bg: string): FullDesignContrastReport {
  const ratio = Math.round(getContrastRatio(fg, bg) * 100) / 100;
  return {
    overallScore: ratio >= 4.5 ? 90 : 40,
    statusLabel: ratio >= 4.5 ? 'WCAG Compliant (AA)' : 'Accessibility Fail',
    dominantBg: bg,
    totalPairs: 1,
    passedCount: ratio >= 4.5 ? 1 : 0,
    failedCount: ratio >= 4.5 ? 0 : 1,
    pairs: [
      {
        id: 'fallback-1',
        label: 'Sample Color Pair',
        fg,
        bg,
        ratio,
        wcagAA: ratio >= 4.5,
        wcagAAA: ratio >= 7.0,
        wcagAALarge: ratio >= 3.0,
        wcagAAALarge: ratio >= 4.5,
        percentage: 100,
        status: ratio >= 4.5 ? 'good' : 'fail',
      },
    ],
  };
}

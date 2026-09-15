import { hexToRgb, rgbToHex } from './colorUtils';

export interface ExtractedColor {
  hex: string;
  rgb: string;
  hsl: string;
  percentage: number;
  saturation: number;
}

/**
 * Calculate HSL values from RGB
 */
function getHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  const nr = r / 255;
  const ng = g / 255;
  const nb = b / 255;
  const max = Math.max(nr, ng, nb);
  const min = Math.min(nr, ng, nb);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case nr: h = (ng - nb) / d + (ng < nb ? 6 : 0); break;
      case ng: h = (nb - nr) / d + 2; break;
      case nb: h = (nr - ng) / d + 4; break;
    }
    h /= 6;
  }

  return { h: Math.round(h * 360), s: Math.round(s * 100), l: Math.round(l * 100) };
}

/**
 * Extract dominant vibrant logo colors from an image file or Data URL
 */
export async function extractColorsFromImage(fileOrUrl: File | string): Promise<ExtractedColor[]> {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'Anonymous';

    img.onload = () => {
      const colors = extractFromCanvas(img);
      resolve(colors);
    };

    img.onerror = () => {
      if (typeof fileOrUrl !== 'string' && (fileOrUrl.type === 'image/svg+xml' || fileOrUrl.name.endsWith('.svg'))) {
        extractColorsFromSvgText(fileOrUrl).then(resolve);
      } else {
        resolve(getDefaultFallbackColors());
      }
    };

    if (typeof fileOrUrl === 'string') {
      img.src = fileOrUrl;
    } else {
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target?.result as string;
      };
      reader.onerror = () => resolve(getDefaultFallbackColors());
      reader.readAsDataURL(fileOrUrl);
    }
  });
}

/**
 * Canvas pixel extraction prioritizing vibrant brand colors over dull grays/shadows
 */
function extractFromCanvas(img: HTMLImageElement): ExtractedColor[] {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  if (!ctx) return getDefaultFallbackColors();

  const width = 120;
  const height = Math.max(1, Math.round((img.height / (img.width || 1)) * 120));
  canvas.width = width;
  canvas.height = height;

  ctx.drawImage(img, 0, 0, width, height);
  const imageData = ctx.getImageData(0, 0, width, height).data;

  const colorBuckets: Record<string, { sumR: number; sumG: number; sumB: number; count: number }> = {};
  let totalValidPixels = 0;

  for (let i = 0; i < imageData.length; i += 4) {
    const r = imageData[i];
    const g = imageData[i + 1];
    const b = imageData[i + 2];
    const a = imageData[i + 3];

    // Ignore transparent or near-transparent background pixels
    if (a < 35) continue;

    // Quantize into 16-level color space
    const qr = Math.floor(r / 16) * 16;
    const qg = Math.floor(g / 16) * 16;
    const qb = Math.floor(b / 16) * 16;
    const key = `${qr},${qg},${qb}`;

    if (!colorBuckets[key]) {
      colorBuckets[key] = { sumR: 0, sumG: 0, sumB: 0, count: 0 };
    }

    colorBuckets[key].sumR += r;
    colorBuckets[key].sumG += g;
    colorBuckets[key].sumB += b;
    colorBuckets[key].count++;
    totalValidPixels++;
  }

  const buckets = Object.values(colorBuckets).map(b => {
    const avgR = Math.round(b.sumR / b.count);
    const avgG = Math.round(b.sumG / b.count);
    const avgB = Math.round(b.sumB / b.count);
    const hsl = getHsl(avgR, avgG, avgB);

    // Calculate score: weight by saturation so vibrant logo colors beat dull background grays!
    // Non-gray colors get a high multiplier
    const saturationWeight = (hsl.s / 100) * 3.5 + 0.2;
    // Penalize extreme black (<10 lightness) or extreme white (>92 lightness)
    const lightnessWeight = hsl.l > 92 || hsl.l < 10 ? 0.2 : 1.0;

    const score = b.count * saturationWeight * lightnessWeight;

    return {
      r: avgR,
      g: avgG,
      b: avgB,
      count: b.count,
      score,
      hsl,
    };
  });

  // Sort by vibrant brand score first
  const sortedByVibrancy = [...buckets].sort((a, b) => b.score - a.score);

  // Filter out colors that are too similar to each other
  const distinctColors: typeof sortedByVibrancy = [];

  for (const item of sortedByVibrancy) {
    const isTooSimilar = distinctColors.some(existing => {
      const diffR = Math.abs(existing.r - item.r);
      const diffG = Math.abs(existing.g - item.g);
      const diffB = Math.abs(existing.b - item.b);
      return (diffR + diffG + diffB) < 50;
    });

    if (!isTooSimilar) {
      distinctColors.push(item);
    }

    if (distinctColors.length >= 8) break;
  }

  if (distinctColors.length === 0) {
    return getDefaultFallbackColors();
  }

  return distinctColors.map((bucket) => {
    const hex = rgbToHex({ r: bucket.r, g: bucket.g, b: bucket.b });
    const percentage = totalValidPixels > 0 ? Math.round((bucket.count / totalValidPixels) * 100) : 0;

    return {
      hex,
      rgb: `rgb(${bucket.r}, ${bucket.g}, ${bucket.b})`,
      hsl: `hsl(${bucket.hsl.h}, ${bucket.hsl.s}%, ${bucket.hsl.l}%)`,
      percentage,
      saturation: bucket.hsl.s,
    };
  });
}

/**
 * Text SVG fallback parser
 */
async function extractColorsFromSvgText(file: File): Promise<ExtractedColor[]> {
  try {
    const text = await file.text();
    const hexRegex = /#(?:[0-9a-fA-F]{3}){1,2}\b/g;
    const matches = text.match(hexRegex) || [];

    const uniqueHexes = Array.from(new Set(matches.map(h => h.toUpperCase())))
      .filter(h => h !== '#FFFFFF' && h !== '#000000');

    if (uniqueHexes.length === 0) {
      return getDefaultFallbackColors();
    }

    return uniqueHexes.slice(0, 8).map((hex) => {
      const rgbObj = hexToRgb(hex);
      const hsl = getHsl(rgbObj.r, rgbObj.g, rgbObj.b);
      return {
        hex,
        rgb: `rgb(${rgbObj.r}, ${rgbObj.g}, ${rgbObj.b})`,
        hsl: `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`,
        percentage: 25,
        saturation: hsl.s,
      };
    });
  } catch {
    return getDefaultFallbackColors();
  }
}

function getDefaultFallbackColors(): ExtractedColor[] {
  return [
    { hex: '#1683FF', rgb: 'rgb(22, 131, 255)', hsl: 'hsl(212, 100%, 54%)', percentage: 40, saturation: 100 },
    { hex: '#FDB813', rgb: 'rgb(253, 184, 19)', hsl: 'hsl(42, 98%, 53%)', percentage: 30, saturation: 98 },
    { hex: '#12B8C4', rgb: 'rgb(18, 184, 196)', hsl: 'hsl(184, 83%, 42%)', percentage: 20, saturation: 83 },
    { hex: '#8B5CF6', rgb: 'rgb(139, 92, 246)', hsl: 'hsl(258, 90%, 66%)', percentage: 10, saturation: 90 },
  ];
}

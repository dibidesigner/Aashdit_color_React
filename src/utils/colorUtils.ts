import type { RGBColor, HSLColor, OKLCHColor } from '../types/color';

/* ======================================
   HEX ↔ RGB CONVERSIONS
   ====================================== */

export function hexToRgb(hex: string): RGBColor {
  const clean = hex.replace('#', '');
  const full = clean.length === 3
    ? clean.split('').map(c => c + c).join('')
    : clean;
  const num = parseInt(full, 16);
  return {
    r: (num >> 16) & 255,
    g: (num >> 8) & 255,
    b: num & 255,
  };
}

export function rgbToHex({ r, g, b }: RGBColor): string {
  return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('').toUpperCase();
}

export function rgbToString({ r, g, b }: RGBColor): string {
  return `${r}, ${g}, ${b}`;
}

/* ======================================
   RGB ↔ HSL CONVERSIONS
   ====================================== */

export function rgbToHsl({ r, g, b }: RGBColor): HSLColor {
  const rn = r / 255, gn = g / 255, bn = b / 255;
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn);
  let h = 0, s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case rn: h = ((gn - bn) / d + (gn < bn ? 6 : 0)) / 6; break;
      case gn: h = ((bn - rn) / d + 2) / 6; break;
      case bn: h = ((rn - gn) / d + 4) / 6; break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
  };
}

export function hslToRgb({ h, s, l }: HSLColor): RGBColor {
  const hn = h / 360, sn = s / 100, ln = l / 100;
  let r, g, b;

  if (sn === 0) {
    r = g = b = ln;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };
    const q = ln < 0.5 ? ln * (1 + sn) : ln + sn - ln * sn;
    const p = 2 * ln - q;
    r = hue2rgb(p, q, hn + 1/3);
    g = hue2rgb(p, q, hn);
    b = hue2rgb(p, q, hn - 1/3);
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
  };
}

export function hslToString({ h, s, l }: HSLColor): string {
  return `${h}°, ${s}%, ${l}%`;
}

export function hexToHsl(hex: string): HSLColor {
  return rgbToHsl(hexToRgb(hex));
}

export function hexToHslString(hex: string): string {
  return hslToString(hexToHsl(hex));
}

export function hexToRgbString(hex: string): string {
  return rgbToString(hexToRgb(hex));
}

/* ======================================
   LINEAR RGB (sRGB → linear)
   ====================================== */

function toLinear(c: number): number {
  const v = c / 255;
  return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
}

function fromLinear(v: number): number {
  const c = v <= 0.0031308 ? 12.92 * v : 1.055 * Math.pow(v, 1 / 2.4) - 0.055;
  return Math.round(Math.max(0, Math.min(1, c)) * 255);
}

/* ======================================
   RGB → OKLCH
   ====================================== */

export function rgbToOklch({ r, g, b }: RGBColor): OKLCHColor {
  // sRGB → linear
  const rl = toLinear(r), gl = toLinear(g), bl = toLinear(b);

  // linear sRGB → OKLab (via LMS)
  const l = 0.4122214708 * rl + 0.5363325363 * gl + 0.0514459929 * bl;
  const m = 0.2119034982 * rl + 0.6806995451 * gl + 0.1073969566 * bl;
  const s = 0.0883024619 * rl + 0.2817188376 * gl + 0.6299787005 * bl;

  const lc = Math.cbrt(l), mc = Math.cbrt(m), sc = Math.cbrt(s);

  const L = 0.2104542553 * lc + 0.7936177850 * mc - 0.0040720468 * sc;
  const A = 1.9779984951 * lc - 2.4285922050 * mc + 0.4505937099 * sc;
  const B = 0.0259040371 * lc + 0.7827717662 * mc - 0.8086757660 * sc;

  const C = Math.sqrt(A * A + B * B);
  let H = Math.atan2(B, A) * (180 / Math.PI);
  if (H < 0) H += 360;

  return { l: L, c: C, h: H };
}

export function oklchToRgb({ l, c, h }: OKLCHColor): RGBColor {
  const A = c * Math.cos(h * (Math.PI / 180));
  const B = c * Math.sin(h * (Math.PI / 180));

  const lc = l + 0.3963377774 * A + 0.2158037573 * B;
  const mc = l - 0.1055613458 * A - 0.0638541728 * B;
  const sc = l - 0.0894841775 * A - 1.2914855480 * B;

  const lv = lc ** 3, mv = mc ** 3, sv = sc ** 3;

  const rl =  4.0767416621 * lv - 3.3077115913 * mv + 0.2309699292 * sv;
  const gl = -1.2684380046 * lv + 2.6097574011 * mv - 0.3413193965 * sv;
  const bl = -0.0041960863 * lv - 0.7034186147 * mv + 1.7076147010 * sv;

  return {
    r: fromLinear(rl),
    g: fromLinear(gl),
    b: fromLinear(bl),
  };
}

/* ======================================
   COLOR FORMAT DISPLAY
   ====================================== */

export function getColorFormats(hex: string) {
  const rgb = hexToRgb(hex);
  const hsl = rgbToHsl(rgb);
  return {
    hex: hex.toUpperCase(),
    rgb: `${rgb.r}, ${rgb.g}, ${rgb.b}`,
    hsl: `${hsl.h}°, ${hsl.s}%, ${hsl.l}%`,
  };
}

/* ======================================
   COLOR RELATIONSHIPS
   ====================================== */

export function getComplementary(hex: string): string {
  const hsl = hexToHsl(hex);
  return hslToHex({ h: (hsl.h + 180) % 360, s: hsl.s, l: hsl.l });
}

export function getAnalogous(hex: string): string[] {
  const hsl = hexToHsl(hex);
  return [
    hslToHex({ h: (hsl.h - 30 + 360) % 360, s: hsl.s, l: hsl.l }),
    hslToHex({ h: (hsl.h + 30) % 360, s: hsl.s, l: hsl.l }),
  ];
}

export function getTriadic(hex: string): string[] {
  const hsl = hexToHsl(hex);
  return [
    hslToHex({ h: (hsl.h + 120) % 360, s: hsl.s, l: hsl.l }),
    hslToHex({ h: (hsl.h + 240) % 360, s: hsl.s, l: hsl.l }),
  ];
}

export function hslToHex(hsl: HSLColor): string {
  return rgbToHex(hslToRgb(hsl));
}

/* ======================================
   LUMINANCE & BRIGHTNESS
   ====================================== */

export function getRelativeLuminance(hex: string): number {
  const { r, g, b } = hexToRgb(hex);
  return 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
}

export function isLight(hex: string): boolean {
  return getRelativeLuminance(hex) > 0.179;
}

export function getReadableTextColor(bgHex: string): string {
  return isLight(bgHex) ? '#111827' : '#F9FAFB';
}

/* ======================================
   COLOR VALIDATION
   ====================================== */

export function isValidHex(hex: string): boolean {
  return /^#?([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(hex);
}

export function normalizeHex(hex: string): string {
  const clean = hex.replace('#', '');
  if (clean.length === 3) {
    return '#' + clean.split('').map(c => c + c).join('').toUpperCase();
  }
  return '#' + clean.toUpperCase();
}

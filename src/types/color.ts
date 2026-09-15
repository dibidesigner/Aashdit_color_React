export type ColorFormat = 'hex' | 'rgb' | 'hsl';

export interface RGBColor {
  r: number;
  g: number;
  b: number;
}

export interface HSLColor {
  h: number;
  s: number;
  l: number;
}

export interface OKLCHColor {
  l: number;
  c: number;
  h: number;
}

export interface ColorSwatch {
  name: string;
  hex: string;
  rgb: RGBColor;
  hsl: HSLColor;
  usage?: string[];
}

export interface ColorScale {
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
}

export interface GeneratedPalette {
  primary: ColorScale;
  secondary: ColorScale;
  gray: ColorScale;
  baseColors: {
    primary: string;
    secondary: string;
    gray: string;
  };
  generatedAt: number;
}

export interface ColorRelationship {
  type: 'complementary' | 'analogous' | 'triadic' | 'split-complementary' | 'monochromatic';
  colors: string[];
  label: string;
  description: string;
}

export interface ContrastResult {
  ratio: number;
  wcagAA: boolean;
  wcagAAA: boolean;
  wcagAALarge: boolean;
  wcagAAALarge: boolean;
}

export interface DesignToken {
  name: string;
  value: string;
  category: 'color' | 'spacing' | 'typography' | 'shadow' | 'radius' | 'border';
}

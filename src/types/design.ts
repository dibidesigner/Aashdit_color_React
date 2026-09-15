export interface DesignToken {
  name: string;
  value: string;
  description?: string;
  category: 'color' | 'spacing' | 'typography' | 'shadow' | 'radius' | 'border' | 'animation';
}

export interface SemanticToken {
  name: string;
  value: string;
  description?: string;
}

export interface SpacingScale {
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: string;
  8: string;
  10: string;
  12: string;
  16: string;
  20: string;
  24: string;
}

export interface TypographyToken {
  family: string;
  size: string;
  lineHeight: string;
  weight: string | number;
  letterSpacing?: string;
}

export interface ComponentShowcase {
  id: string;
  name: string;
  category: string;
  variants: ComponentVariant[];
}

export interface ComponentVariant {
  name: string;
  state: 'default' | 'hover' | 'active' | 'focus' | 'disabled' | 'loading' | 'error' | 'success';
  description?: string;
}

export interface LayoutBreakpoint {
  name: string;
  minWidth: number;
  maxWidth?: number;
  columns: number;
  gutter: string;
  margin: string;
}

export interface GridSystem {
  breakpoints: LayoutBreakpoint[];
  containerMaxWidth: string;
  baseUnit: number;
}

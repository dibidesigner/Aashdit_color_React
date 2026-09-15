import type { ColorScale, GeneratedPalette } from '../types/color';

/**
 * Generate CSS custom properties from a generated palette
 */
export function generateCSSVariables(palette: GeneratedPalette): string {
  const steps = [100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

  const primaryVars = steps
    .map(s => `  --primary-color-${s}: ${palette.primary[s]};`)
    .join('\n');

  const secondaryVars = steps
    .map(s => `  --secondary-color-${s}: ${palette.secondary[s]};`)
    .join('\n');

  const grayVars = steps
    .map(s => `  --gray-${s}: ${palette.gray[s]};`)
    .join('\n');

  const semanticVars = `
  /* Semantic Tokens */
  --color-primary: var(--primary-color-600);
  --color-primary-hover: var(--primary-color-700);
  --color-primary-active: var(--primary-color-800);
  --color-primary-subtle: var(--primary-color-100);

  --color-secondary: var(--secondary-color-600);
  --color-secondary-hover: var(--secondary-color-700);
  --color-secondary-subtle: var(--secondary-color-100);

  --color-background: var(--gray-100);
  --color-surface: #ffffff;
  --color-surface-raised: var(--gray-100);

  --color-text-primary: var(--gray-900);
  --color-text-secondary: var(--gray-700);
  --color-text-muted: var(--gray-500);
  --color-text-disabled: var(--gray-400);

  --color-border: var(--gray-200);
  --color-border-strong: var(--gray-300);

  --color-success: #16803C;
  --color-success-subtle: #DCFCE7;
  --color-warning: #B7791F;
  --color-warning-subtle: #FEF3C7;
  --color-error: #C53030;
  --color-error-subtle: #FEE2E2;
  --color-info: #2563EB;
  --color-info-subtle: #DBEAFE;`;

  return `:root {\n${primaryVars}\n\n${secondaryVars}\n\n${grayVars}\n${semanticVars}\n}`;
}

/**
 * Generate a single scale block
 */
export function generateScaleCSS(_name: string, scale: ColorScale, prefix: string): string {
  const steps = [100, 200, 300, 400, 500, 600, 700, 800, 900] as const;
  return steps.map(s => `  --${prefix}-${s}: ${scale[s]};`).join('\n');
}

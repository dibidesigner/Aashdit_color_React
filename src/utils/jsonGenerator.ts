import type { GeneratedPalette, ColorScale } from '../types/color';

interface TokenGroup {
  [key: string]: string;
}

interface DesignTokensJSON {
  $schema: string;
  metadata: {
    generatedAt: string;
    version: string;
    tool: string;
  };
  color: {
    primary: TokenGroup;
    secondary: TokenGroup;
    gray: TokenGroup;
    semantic: TokenGroup;
  };
}

/**
 * Generate design tokens JSON from a palette
 */
export function generateDesignTokensJSON(palette: GeneratedPalette): DesignTokensJSON {
  const steps = [100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

  const scaleToTokens = (scale: ColorScale, prefix: string): TokenGroup => {
    const tokens: TokenGroup = {};
    steps.forEach(s => {
      tokens[`${prefix}-${s}`] = scale[s];
    });
    return tokens;
  };

  return {
    $schema: 'https://design-tokens.github.io/community-group/format/',
    metadata: {
      generatedAt: new Date().toISOString(),
      version: '1.0.0',
      tool: 'DesignAtlas Color System Generator',
    },
    color: {
      primary: scaleToTokens(palette.primary, 'primary'),
      secondary: scaleToTokens(palette.secondary, 'secondary'),
      gray: scaleToTokens(palette.gray, 'gray'),
      semantic: {
        'color-primary': palette.primary[600],
        'color-primary-hover': palette.primary[700],
        'color-primary-active': palette.primary[800],
        'color-primary-subtle': palette.primary[100],
        'color-secondary': palette.secondary[600],
        'color-secondary-hover': palette.secondary[700],
        'color-secondary-subtle': palette.secondary[100],
        'color-background': palette.gray[100],
        'color-surface': '#ffffff',
        'color-text-primary': palette.gray[900],
        'color-text-secondary': palette.gray[700],
        'color-text-muted': palette.gray[500],
        'color-border': palette.gray[200],
        'color-border-strong': palette.gray[300],
        'color-success': '#16803C',
        'color-warning': '#B7791F',
        'color-error': '#C53030',
        'color-info': '#2563EB',
      },
    },
  };
}

/**
 * Format JSON for display / download
 */
export function formatTokensJSON(palette: GeneratedPalette): string {
  return JSON.stringify(generateDesignTokensJSON(palette), null, 2);
}

/**
 * Client-side file download helper
 */
export function downloadFile(content: string, filename: string, mimeType: string): void {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

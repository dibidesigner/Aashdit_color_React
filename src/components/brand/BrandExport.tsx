import React, { useState } from 'react';
import { CopyButton } from '../common/CopyButton';
import { Button } from '../common/Button';
import { Download, FileCode, FileJson } from 'lucide-react';
import type { GeneratedPalette } from '../../types/color';
import type { Sector } from '../../types/sector';

interface BrandExportProps {
  palette: GeneratedPalette;
  sector: Sector | null;
  brandName?: string;
}

export const BrandExport: React.FC<BrandExportProps> = ({
  palette,
  sector,
  brandName = 'BrandSpace',
}) => {
  const [activeTab, setActiveTab] = useState<'css' | 'json'>('css');

  const steps = [100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

  // Generate Brand CSS string
  const generateBrandCSS = (): string => {
    const primaryVars = steps
      .map(s => `  --brand-primary-${s}: ${palette.primary[s]};`)
      .join('\n');

    const secondaryVars = steps
      .map(s => `  --brand-secondary-${s}: ${palette.secondary[s]};`)
      .join('\n');

    const grayVars = steps
      .map(s => `  --gray-${s}: ${palette.gray[s]};`)
      .join('\n');

    const semanticVars = `
  /* Semantic Tokens for ${brandName} (${sector ? sector.name : 'General'}) */
  --color-primary: var(--brand-primary-600);
  --color-primary-hover: var(--brand-primary-700);
  --color-primary-active: var(--brand-primary-800);
  --color-primary-subtle: var(--brand-primary-100);

  --color-secondary: var(--brand-secondary-500);
  --color-secondary-hover: var(--brand-secondary-600);
  --color-secondary-subtle: var(--brand-secondary-100);

  --color-background: var(--gray-100);
  --color-surface: #ffffff;
  --color-surface-elevated: var(--gray-100);

  --color-text-primary: var(--gray-900);
  --color-text-secondary: var(--gray-700);
  --color-text-muted: var(--gray-500);

  --color-border: var(--gray-200);
  --color-border-strong: var(--gray-300);

  --color-success: #16803C;
  --color-warning: #B7791F;
  --color-error: #C53030;
  --color-info: #2563EB;`;

    return `:root {\n  /* ${brandName} Design Tokens */\n${primaryVars}\n\n${secondaryVars}\n\n${grayVars}\n${semanticVars}\n}`;
  };

  // Generate Brand JSON string
  const generateBrandJSON = (): string => {
    const jsonObject = {
      brandName,
      sector: sector ? sector.id : 'general',
      sectorName: sector ? sector.name : 'General',
      character: sector ? sector.character : ['Modern', 'Accessible'],
      colors: {
        base: palette.baseColors,
        primaryScale: palette.primary,
        secondaryScale: palette.secondary,
        grayScale: palette.gray,
      },
      typography: {
        fontFamily: sector?.typography.body || 'Inter, sans-serif',
        headingFont: sector?.typography.heading || 'Inter, sans-serif',
      },
      layout: {
        borderRadius: sector?.shapes.cardRadius || '8px',
        shadow: sector?.shapes.shadowStyle || '0 4px 6px -1px rgba(0,0,0,0.1)',
      },
    };

    return JSON.stringify(jsonObject, null, 2);
  };

  const cssContent = generateBrandCSS();
  const jsonContent = generateBrandJSON();

  const handleDownload = () => {
    const content = activeTab === 'css' ? cssContent : jsonContent;
    const filename = `${brandName.toLowerCase().replace(/\s+/g, '-')}-design-tokens.${activeTab}`;
    const blob = new Blob([content], { type: activeTab === 'css' ? 'text/css' : 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-[#101F31] border border-[#20344A] rounded-2xl p-6 space-y-4">
      {/* Header and Toggles */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 bg-[#0B1626] p-1 rounded-xl border border-[#20344A]">
          <button
            type="button"
            onClick={() => setActiveTab('css')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'css'
                ? 'bg-[#1683FF] text-white'
                : 'text-[#64748B] hover:text-[#F4F7FB]'
            }`}
          >
            <FileCode size={14} />
            CSS Custom Properties
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('json')}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${
              activeTab === 'json'
                ? 'bg-[#1683FF] text-white'
                : 'text-[#64748B] hover:text-[#F4F7FB]'
            }`}
          >
            <FileJson size={14} />
            JSON Design Tokens
          </button>
        </div>

        <div className="flex items-center gap-2">
          <CopyButton value={activeTab === 'css' ? cssContent : jsonContent} size="sm" />
          <Button
            variant="secondary"
            size="sm"
            onClick={handleDownload}
            leftIcon={<Download size={14} />}
          >
            Download {activeTab.toUpperCase()}
          </Button>
        </div>
      </div>

      {/* Code Display */}
      <div className="relative bg-[#070E18] border border-[#20344A] rounded-xl p-4 max-h-[320px] overflow-y-auto font-mono text-xs text-[#94A3B8]">
        <pre className="whitespace-pre-wrap leading-relaxed">
          {activeTab === 'css' ? cssContent : jsonContent}
        </pre>
      </div>
    </div>
  );
};

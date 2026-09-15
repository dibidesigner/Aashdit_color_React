import React, { useState } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { ColorGenerator } from '../components/colors/ColorGenerator';
import { ColorScale } from '../components/colors/ColorScale';
import { GeneratedCSS } from '../components/colors/GeneratedCSS';
import { LiveUIPreview } from '../components/colors/LiveUIPreview';
import { ContrastChecker } from '../components/colors/ContrastChecker';
import { Palette, Sparkles, Download } from 'lucide-react';
import type { GeneratedPalette } from '../types/color';
import { generateColorScale, generateGrayScale } from '../utils/colorScale';

const defaultPalette: GeneratedPalette = {
  primary: generateColorScale('#1683FF'),
  secondary: generateColorScale('#12B8C4'),
  gray: generateGrayScale('#64748B'),
  baseColors: { primary: '#1683FF', secondary: '#12B8C4', gray: '#64748B' },
  generatedAt: Date.now(),
};

export const ColorGeneratorPage: React.FC = () => {
  const [palette, setPalette] = useState<GeneratedPalette>(defaultPalette);
  const [generated, setGenerated] = useState(false);

  const handleGenerate = (p: GeneratedPalette) => {
    setPalette(p);
    setGenerated(true);
  };

  return (
    <div className="min-h-screen py-8">
      <PageContainer maxWidth="xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[rgba(22,131,255,0.1)] border border-[rgba(22,131,255,0.2)] rounded-full mb-4">
            <Palette size={12} className="text-[#1683FF]" />
            <span className="text-[#1683FF] text-xs font-medium">OKLCH Perceptual Color Scale</span>
          </div>
          <h1 className="text-[#F4F7FB] text-4xl font-bold mb-3">Generate Your Color System</h1>
          <p className="text-[#94A3B8] text-base max-w-2xl mx-auto">
            Choose your primary, secondary and gray colors to generate a complete 100–900 design token scale
            using perceptually uniform OKLCH color space.
          </p>
        </div>

        {/* Generator */}
        <div className="max-w-3xl mx-auto mb-12">
          <ColorGenerator
            onGenerate={handleGenerate}
            initialPrimary={palette.baseColors.primary}
            initialSecondary={palette.baseColors.secondary}
            initialGray={palette.baseColors.gray}
          />
        </div>

        {/* Generated scales */}
        <div className="space-y-6 mb-10">
          <h2 className="text-[#F4F7FB] font-bold text-xl flex items-center gap-2">
            {generated && <Sparkles size={18} className="text-[#1683FF]" />}
            Generated Color Scales
          </h2>
          <ColorScale name="Primary" scale={palette.primary} />
          <ColorScale name="Secondary" scale={palette.secondary} />
          <ColorScale name="Gray" scale={palette.gray} />
        </div>

        {/* Live preview */}
        <div className="mb-10">
          <h2 className="text-[#F4F7FB] font-bold text-xl mb-4">Live UI Preview</h2>
          <LiveUIPreview palette={palette} />
        </div>

        {/* CSS Export */}
        <div className="mb-10">
          <h2 className="text-[#F4F7FB] font-bold text-xl mb-4 flex items-center gap-2">
            <Download size={18} className="text-[#64748B]" />
            Export Design Tokens
          </h2>
          <GeneratedCSS palette={palette} />
        </div>

        {/* Contrast checker */}
        <div className="mb-10">
          <h2 className="text-[#F4F7FB] font-bold text-xl mb-4">Contrast Checker</h2>
          <div className="w-full">
            <ContrastChecker
              initialFg={palette.primary[600]}
              initialBg={palette.gray[100]}
            />
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default ColorGeneratorPage;

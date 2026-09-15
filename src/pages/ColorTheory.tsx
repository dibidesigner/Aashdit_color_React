import React, { useState } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import {
  getColorFormats, getComplementary, getAnalogous, getTriadic,
  isLight, hexToHsl, hslToHex
} from '../utils/colorUtils';
import { CopyButton } from '../components/common/CopyButton';
import { Palette } from 'lucide-react';

const colorTheoryConcepts = [
  { id: 'complementary', label: 'Complementary', desc: 'Colors opposite on the color wheel. High contrast, vibrant.' },
  { id: 'analogous', label: 'Analogous', desc: 'Colors adjacent on the wheel. Harmonious and pleasing.' },
  { id: 'triadic', label: 'Triadic', desc: 'Three colors equally spaced. Vibrant and balanced.' },
  { id: 'monochromatic', label: 'Monochromatic', desc: 'Tints and shades of one hue. Elegant and cohesive.' },
];

const ColorSwatch: React.FC<{ hex: string; label: string }> = ({ hex, label }) => {
  const formats = getColorFormats(hex);
  const light = isLight(hex);
  return (
    <div className="flex flex-col">
      <div className="h-20 rounded-xl flex items-end p-2" style={{ backgroundColor: hex }}>
        <span className="text-xs font-mono opacity-70" style={{ color: light ? '#000' : '#fff' }}>
          {hex}
        </span>
      </div>
      <div className="pt-2 flex items-center justify-between">
        <span className="text-[#64748B] text-xs">{label}</span>
        <CopyButton value={formats.hex} size="sm" />
      </div>
    </div>
  );
};

export const ColorTheory: React.FC = () => {
  const [baseColor, setBaseColor] = useState('#1683FF');
  const [activeRelation, setActiveRelation] = useState('complementary');

  const getMonochromatic = (hex: string): string[] => {
    const { h, s } = hexToHsl(hex);
    return [90, 70, 55, 40, 25].map(l => hslToHex({ h, s, l }));
  };

  const relationsMap: Record<string, string[]> = {
    complementary: [baseColor, getComplementary(baseColor)],
    analogous: [baseColor, ...getAnalogous(baseColor)],
    triadic: [baseColor, ...getTriadic(baseColor)],
    monochromatic: getMonochromatic(baseColor),
  };

  const currentColors = relationsMap[activeRelation];
  const formats = getColorFormats(baseColor);

  return (
    <div className="min-h-screen py-8">
      <PageContainer>
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.2)] flex items-center justify-center">
            <Palette size={18} className="text-[#8B5CF6]" />
          </div>
          <div>
            <h1 className="text-[#F4F7FB] text-2xl font-bold">Color Theory</h1>
            <p className="text-[#64748B] text-sm">Color relationships and harmony</p>
          </div>
        </div>

        {/* Base color picker */}
        <div className="bg-[#101F31] border border-[#20344A] rounded-2xl p-6 mb-8">
          <h2 className="text-[#F4F7FB] font-semibold mb-4">Select Base Color</h2>
          <div className="flex items-center gap-4">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden border border-[#20344A]">
              <input
                type="color"
                value={baseColor}
                onChange={e => setBaseColor(e.target.value)}
                className="absolute inset-0 w-[150%] h-[150%] -translate-x-[10%] -translate-y-[10%] cursor-pointer"
                aria-label="Select base color"
              />
            </div>
            <div>
              <p className="text-[#F4F7FB] font-mono text-xl font-bold">{baseColor.toUpperCase()}</p>
              <p className="text-[#64748B] text-sm">Click the swatch to change the base color</p>
              <p className="text-[#94A3B8] text-xs mt-1">
                RGB: {formats.rgb} · HSL: {formats.hsl}
              </p>
            </div>
            <div className="ml-auto">
              <CopyButton value={baseColor.toUpperCase()} label="Copy HEX" />
            </div>
          </div>
        </div>

        {/* Relationship selector */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          {colorTheoryConcepts.map(concept => (
            <button
              key={concept.id}
              onClick={() => setActiveRelation(concept.id)}
              className={`
                p-4 text-left rounded-xl border transition-all duration-200
                ${activeRelation === concept.id
                  ? 'bg-[rgba(22,131,255,0.1)] border-[rgba(22,131,255,0.3)] text-[#1683FF]'
                  : 'bg-[#101F31] border-[#20344A] text-[#64748B] hover:border-[#2D4A68] hover:text-[#94A3B8]'
                }
              `}
              aria-pressed={activeRelation === concept.id}
            >
              <p className="font-semibold text-sm mb-1">{concept.label}</p>
              <p className="text-[10px] opacity-70 leading-relaxed">{concept.desc}</p>
            </button>
          ))}
        </div>

        {/* Color preview */}
        <div className="bg-[#101F31] border border-[#20344A] rounded-2xl p-6 mb-8">
          <h3 className="text-[#F4F7FB] font-semibold mb-2">
            {colorTheoryConcepts.find(c => c.id === activeRelation)?.label} Palette
          </h3>
          <p className="text-[#64748B] text-sm mb-6 leading-relaxed">
            {colorTheoryConcepts.find(c => c.id === activeRelation)?.desc}
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
            {currentColors.map((color, i) => (
              <ColorSwatch
                key={i}
                hex={color}
                label={i === 0 ? 'Base' : `Color ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Primary / Secondary / Tertiary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            {
              title: 'Primary Colors',
              colors: ['#FF0000', '#FFFF00', '#0000FF'],
              desc: 'The three basic colors that cannot be created by mixing.',
            },
            {
              title: 'Secondary Colors',
              colors: ['#FF7F00', '#00FF00', '#8B00FF'],
              desc: 'Created by mixing two primary colors together.',
            },
            {
              title: 'Tertiary Colors',
              colors: ['#FF3F00', '#FF9F00', '#7FFF00', '#00FF7F', '#007FFF', '#3F00FF'],
              desc: 'Created by mixing a primary and adjacent secondary color.',
            },
          ].map(({ title, colors, desc }) => (
            <div key={title} className="bg-[#101F31] border border-[#20344A] rounded-xl p-5">
              <h3 className="text-[#F4F7FB] font-semibold text-sm mb-2">{title}</h3>
              <p className="text-[#64748B] text-xs mb-4 leading-relaxed">{desc}</p>
              <div className="flex flex-wrap gap-2">
                {colors.map(c => (
                  <div key={c} className="w-8 h-8 rounded-lg border border-[#20344A]" style={{ backgroundColor: c }} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </PageContainer>
    </div>
  );
};

export default ColorTheory;

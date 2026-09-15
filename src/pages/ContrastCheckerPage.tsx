import React, { useState } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { ContrastChecker } from '../components/colors/ContrastChecker';
import { CheckCircle2, Shield, Eye, Info, Sparkles } from 'lucide-react';

const PRESET_COMBINATIONS = [
  { name: 'Dark Mode (Navy)', fg: '#F4F7FB', bg: '#0B1626' },
  { name: 'Light Mode (Clean)', fg: '#0F172A', bg: '#FFFFFF' },
  { name: 'High Contrast (Yellow/Dark)', fg: '#F59E0B', bg: '#070E18' },
  { name: 'Primary Blue on White', fg: '#1683FF', bg: '#FFFFFF' },
  { name: 'White on Primary Blue', fg: '#FFFFFF', bg: '#1683FF' },
  { name: 'Muted Gray on Dark', fg: '#94A3B8', bg: '#101F31' },
];

export const ContrastCheckerPage: React.FC = () => {
  const [selectedPreset, setSelectedPreset] = useState(PRESET_COMBINATIONS[0]);

  return (
    <div className="min-h-screen py-8">
      <PageContainer>
        {/* Page Header */}
        <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[rgba(22,131,255,0.1)] border border-[rgba(22,131,255,0.2)] flex items-center justify-center text-[#1683FF]">
              <Eye size={20} />
            </div>
            <div>
              <h1 className="text-[#F4F7FB] text-2xl font-bold">WCAG Contrast Checker</h1>
              <p className="text-[#64748B] text-sm">
                Inspect contrast via design screenshot (CTRL + V) or test manual color pairings against WCAG 2.1 standards
              </p>
            </div>
          </div>
        </div>

        {/* Quick Presets Bar */}
        <div className="bg-[#101F31] border border-[#20344A] rounded-2xl p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <label className="text-[#64748B] text-xs font-semibold uppercase tracking-wider flex items-center gap-1.5 shrink-0">
              <Sparkles size={14} className="text-[#1683FF]" />
              Quick Presets:
            </label>
            <div className="flex flex-wrap gap-2">
              {PRESET_COMBINATIONS.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => setSelectedPreset(preset)}
                  className={`
                    px-3 py-1.5 rounded-lg text-xs font-medium border transition-all flex items-center gap-2
                    ${selectedPreset.name === preset.name
                      ? 'bg-[#1683FF] text-white border-transparent shadow-sm'
                      : 'bg-[#0B1626] text-[#94A3B8] border-[#20344A] hover:border-[#2D4A68] hover:text-[#F4F7FB]'
                    }
                  `}
                >
                  <div
                    className="w-3 h-3 rounded-full border border-black/30 shrink-0"
                    style={{ backgroundColor: preset.fg }}
                  />
                  {preset.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Priority Functionalities (Row Layout: Screenshot Inspector & Live Evaluator) */}
        <div className="mb-8">
          <ContrastChecker
            key={`${selectedPreset.fg}-${selectedPreset.bg}`}
            initialFg={selectedPreset.fg}
            initialBg={selectedPreset.bg}
          />
        </div>

        {/* Educational Guidelines Section below */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* WCAG Standards Explanation */}
          <div className="bg-[#101F31] border border-[#20344A] rounded-2xl p-6 space-y-4">
            <h3 className="text-[#F4F7FB] font-bold text-base flex items-center gap-2">
              <Shield size={18} className="text-[#12B8C4]" />
              WCAG 2.1 Accessibility Requirements
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-[#0B1626] border border-[#20344A] rounded-xl space-y-1">
                <div className="flex items-center justify-between font-bold text-[#F4F7FB]">
                  <span>Level AA Normal</span>
                  <span className="text-[#10B981]">4.5:1</span>
                </div>
                <p className="text-[#94A3B8] leading-relaxed text-[11px]">
                  Body text & small UI labels (&lt;18pt / 24px).
                </p>
              </div>

              <div className="p-3 bg-[#0B1626] border border-[#20344A] rounded-xl space-y-1">
                <div className="flex items-center justify-between font-bold text-[#F4F7FB]">
                  <span>Level AA Large</span>
                  <span className="text-[#10B981]">3.0:1</span>
                </div>
                <p className="text-[#94A3B8] leading-relaxed text-[11px]">
                  Large headings (18pt+) & primary action UI elements.
                </p>
              </div>

              <div className="p-3 bg-[#0B1626] border border-[#20344A] rounded-xl space-y-1">
                <div className="flex items-center justify-between font-bold text-[#F4F7FB]">
                  <span>Level AAA Enhanced</span>
                  <span className="text-[#38BDF8]">7.0:1</span>
                </div>
                <p className="text-[#94A3B8] leading-relaxed text-[11px]">
                  Highest accessibility standards for low-vision legibility.
                </p>
              </div>
            </div>
          </div>

          {/* Design Tips */}
          <div className="bg-[#101F31] border border-[#20344A] rounded-2xl p-6 space-y-3">
            <h3 className="text-[#F4F7FB] font-bold text-base flex items-center gap-2">
              <Info size={18} className="text-[#F59E0B]" />
              Accessibility Best Practices
            </h3>

            <ul className="space-y-2.5 text-xs text-[#94A3B8] leading-relaxed">
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-[#10B981] shrink-0 mt-0.5" />
                <span>Never rely solely on color to convey state; use icons or clear text labels alongside color indicators.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-[#10B981] shrink-0 mt-0.5" />
                <span>Ensure interactive buttons, form fields, and icons maintain minimum 3:1 contrast against background cards.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 size={14} className="text-[#10B981] shrink-0 mt-0.5" />
                <span>Always test brand colors on both light and dark mode container backgrounds.</span>
              </li>
            </ul>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default ContrastCheckerPage;

import React from 'react';
import { Lock, Unlock, Sparkles, Pipette } from 'lucide-react';
import type { ExtractedColor } from '../../utils/colorExtractor';
import type { Sector } from '../../types/sector';
import { CopyButton } from '../common/CopyButton';

interface BrandColorSelectorProps {
  extractedColors: ExtractedColor[];
  primary: string;
  secondary: string;
  accent: string;
  sector: Sector | null;
  locked: { primary: boolean; secondary: boolean; accent: boolean };
  autoRecommend: boolean;
  onPrimaryChange: (hex: string) => void;
  onSecondaryChange: (hex: string) => void;
  onAccentChange: (hex: string) => void;
  onToggleLock: (key: 'primary' | 'secondary' | 'accent') => void;
  onToggleAutoRecommend: (enabled: boolean) => void;
}

export const BrandColorSelector: React.FC<BrandColorSelectorProps> = ({
  extractedColors,
  primary,
  secondary,
  accent,
  sector,
  locked,
  autoRecommend,
  onPrimaryChange,
  onSecondaryChange,
  onAccentChange,
  onToggleLock,
  onToggleAutoRecommend,
}) => {

  // Native EyeDropper API support
  const handleEyeDropper = async (target: 'primary' | 'secondary' | 'accent') => {
    if ('EyeDropper' in window) {
      try {
        // @ts-expect-error EyeDropper is supported in modern browsers
        const eyeDropper = new window.EyeDropper();
        const result = await eyeDropper.open();
        if (result && result.sRGBHex) {
          const hex = result.sRGBHex.toUpperCase();
          if (target === 'primary') onPrimaryChange(hex);
          if (target === 'secondary') onSecondaryChange(hex);
          if (target === 'accent') onAccentChange(hex);
        }
      } catch {
        // User canceled eyedropper selection
      }
    }
  };

  const hasEyeDropper = typeof window !== 'undefined' && 'EyeDropper' in window;

  return (
    <div className="space-y-6">
      {/* Extracted Logo Colors Swatches */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-[#F4F7FB] font-bold text-base flex items-center gap-2">
            <Sparkles size={16} className="text-[#1683FF]" />
            Brand Colors Detected from Logo
          </h3>
          <span className="text-[#64748B] text-xs font-mono">
            {extractedColors.length} colors found
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {extractedColors.map((col, idx) => {
            const isPrimary = primary.toLowerCase() === col.hex.toLowerCase();
            const isSecondary = secondary.toLowerCase() === col.hex.toLowerCase();
            const isAccent = accent.toLowerCase() === col.hex.toLowerCase();

            return (
              <div
                key={idx}
                className={`
                  bg-[#101F31] border rounded-xl p-2.5 flex flex-col items-center gap-2 group transition-all relative
                  ${isPrimary ? 'border-[#1683FF] shadow-[0_0_12px_rgba(22,131,255,0.3)]' :
                    isSecondary ? 'border-[#12B8C4] shadow-[0_0_12px_rgba(18,184,196,0.3)]' :
                    isAccent ? 'border-[#F4B942] shadow-[0_0_12px_rgba(244,185,66,0.3)]' :
                    'border-[#20344A] hover:border-[#2D4A68]'
                  }
                `}
              >
                {/* Color preview box — click directly to set as primary */}
                <div
                  className="w-full h-12 rounded-lg shadow-inner border border-black/20 cursor-pointer relative group/box transition-transform hover:scale-105"
                  style={{ backgroundColor: col.hex }}
                  onClick={() => !locked.primary && onPrimaryChange(col.hex)}
                  title="Click to set as Primary Color"
                >
                  {/* Badges for active assignment */}
                  {isPrimary && (
                    <span className="absolute top-1 left-1 bg-[#1683FF] text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                      PRI
                    </span>
                  )}
                  {isSecondary && (
                    <span className="absolute top-1 right-1 bg-[#12B8C4] text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                      SEC
                    </span>
                  )}
                  {isAccent && (
                    <span className="absolute bottom-1 right-1 bg-[#F4B942] text-black text-[9px] font-bold px-1.5 py-0.5 rounded shadow">
                      ACC
                    </span>
                  )}
                </div>

                <div className="w-full flex items-center justify-between text-[11px] font-mono text-[#F4F7FB]">
                  <span>{col.hex}</span>
                  <CopyButton value={col.hex} size="sm" />
                </div>

                {/* Quick assignment buttons */}
                <div className="flex gap-1 w-full pt-1">
                  <button
                    type="button"
                    onClick={() => !locked.primary && onPrimaryChange(col.hex)}
                    disabled={locked.primary}
                    className={`flex-1 text-[10px] py-1 rounded font-bold border transition-colors ${
                      isPrimary
                        ? 'bg-[#1683FF] text-white border-transparent'
                        : 'bg-[#0B1626] text-[#94A3B8] border-[#20344A] hover:bg-[#1683FF]/20 hover:text-white'
                    } ${locked.primary ? 'opacity-40 cursor-not-allowed' : ''}`}
                    title="Set as Primary Color"
                  >
                    Pri
                  </button>
                  <button
                    type="button"
                    onClick={() => !locked.secondary && onSecondaryChange(col.hex)}
                    disabled={locked.secondary}
                    className={`flex-1 text-[10px] py-1 rounded font-bold border transition-colors ${
                      isSecondary
                        ? 'bg-[#12B8C4] text-white border-transparent'
                        : 'bg-[#0B1626] text-[#94A3B8] border-[#20344A] hover:bg-[#12B8C4]/20 hover:text-white'
                    } ${locked.secondary ? 'opacity-40 cursor-not-allowed' : ''}`}
                    title="Set as Secondary Color"
                  >
                    Sec
                  </button>
                  <button
                    type="button"
                    onClick={() => !locked.accent && onAccentChange(col.hex)}
                    disabled={locked.accent}
                    className={`flex-1 text-[10px] py-1 rounded font-bold border transition-colors ${
                      isAccent
                        ? 'bg-[#F4B942] text-black border-transparent'
                        : 'bg-[#0B1626] text-[#94A3B8] border-[#20344A] hover:bg-[#F4B942]/20 hover:text-white'
                    } ${locked.accent ? 'opacity-40 cursor-not-allowed' : ''}`}
                    title="Set as Accent Color"
                  >
                    Acc
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Auto Recommend Checkbox */}
      <div className="bg-[#101F31] border border-[#20344A] rounded-xl p-4 flex items-center justify-between">
        <label className="flex items-center gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={autoRecommend}
            onChange={(e) => onToggleAutoRecommend(e.target.checked)}
            className="w-4 h-4 rounded border-[#20344A] bg-[#0B1626] text-[#1683FF] focus:ring-[#1683FF]"
          />
          <div>
            <span className="text-[#F4F7FB] text-sm font-semibold flex items-center gap-1.5">
              <Sparkles size={14} className="text-[#12B8C4]" />
              Automatically select recommended colors based on sector & brand logo
            </span>
            <p className="text-[#64748B] text-xs mt-0.5">
              Harmonizes logo colors with {sector ? sector.name : 'the selected sector\'s'} visual personality
            </p>
          </div>
        </label>
      </div>

      {/* Primary, Secondary, Accent Pickers with Lock Controls & Eyedropper */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Primary Color Picker */}
        <div className="bg-[#101F31] border border-[#20344A] rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[#F4F7FB] text-sm font-bold flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: primary }} />
              Primary Color
            </span>
            <div className="flex items-center gap-1.5">
              {hasEyeDropper && (
                <button
                  type="button"
                  onClick={() => !locked.primary && handleEyeDropper('primary')}
                  disabled={locked.primary}
                  className="p-1.5 rounded-lg border border-[#20344A] bg-[#0B1626] text-[#1683FF] hover:bg-[#1683FF]/10 transition-colors"
                  title="Pick color from screen / logo"
                >
                  <Pipette size={14} />
                </button>
              )}
              <button
                type="button"
                onClick={() => onToggleLock('primary')}
                className={`p-1.5 rounded-lg border transition-colors ${
                  locked.primary
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                    : 'bg-[#0B1626] text-[#64748B] border-[#20344A] hover:text-[#94A3B8]'
                }`}
                title={locked.primary ? 'Primary color locked' : 'Lock primary color'}
              >
                {locked.primary ? <Lock size={14} /> : <Unlock size={14} />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="color"
              value={primary}
              onChange={(e) => !locked.primary && onPrimaryChange(e.target.value)}
              disabled={locked.primary}
              className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent"
            />
            <input
              type="text"
              value={primary}
              onChange={(e) => !locked.primary && onPrimaryChange(e.target.value)}
              disabled={locked.primary}
              className="flex-1 h-10 px-3 bg-[#0B1626] border border-[#20344A] rounded-lg text-[#F4F7FB] font-mono text-sm uppercase focus:outline-none focus:border-[#1683FF]"
            />
          </div>
        </div>

        {/* Secondary Color Picker */}
        <div className="bg-[#101F31] border border-[#20344A] rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[#F4F7FB] text-sm font-bold flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: secondary }} />
              Secondary Color
            </span>
            <div className="flex items-center gap-1.5">
              {hasEyeDropper && (
                <button
                  type="button"
                  onClick={() => !locked.secondary && handleEyeDropper('secondary')}
                  disabled={locked.secondary}
                  className="p-1.5 rounded-lg border border-[#20344A] bg-[#0B1626] text-[#12B8C4] hover:bg-[#12B8C4]/10 transition-colors"
                  title="Pick color from screen / logo"
                >
                  <Pipette size={14} />
                </button>
              )}
              <button
                type="button"
                onClick={() => onToggleLock('secondary')}
                className={`p-1.5 rounded-lg border transition-colors ${
                  locked.secondary
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                    : 'bg-[#0B1626] text-[#64748B] border-[#20344A] hover:text-[#94A3B8]'
                }`}
                title={locked.secondary ? 'Secondary color locked' : 'Lock secondary color'}
              >
                {locked.secondary ? <Lock size={14} /> : <Unlock size={14} />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="color"
              value={secondary}
              onChange={(e) => !locked.secondary && onSecondaryChange(e.target.value)}
              disabled={locked.secondary}
              className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent"
            />
            <input
              type="text"
              value={secondary}
              onChange={(e) => !locked.secondary && onSecondaryChange(e.target.value)}
              disabled={locked.secondary}
              className="flex-1 h-10 px-3 bg-[#0B1626] border border-[#20344A] rounded-lg text-[#F4F7FB] font-mono text-sm uppercase focus:outline-none focus:border-[#1683FF]"
            />
          </div>
        </div>

        {/* Accent Color Picker */}
        <div className="bg-[#101F31] border border-[#20344A] rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[#F4F7FB] text-sm font-bold flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded-full border border-white/20" style={{ backgroundColor: accent }} />
              Accent Color
            </span>
            <div className="flex items-center gap-1.5">
              {hasEyeDropper && (
                <button
                  type="button"
                  onClick={() => !locked.accent && handleEyeDropper('accent')}
                  disabled={locked.accent}
                  className="p-1.5 rounded-lg border border-[#20344A] bg-[#0B1626] text-[#F4B942] hover:bg-[#F4B942]/10 transition-colors"
                  title="Pick color from screen / logo"
                >
                  <Pipette size={14} />
                </button>
              )}
              <button
                type="button"
                onClick={() => onToggleLock('accent')}
                className={`p-1.5 rounded-lg border transition-colors ${
                  locked.accent
                    ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                    : 'bg-[#0B1626] text-[#64748B] border-[#20344A] hover:text-[#94A3B8]'
                }`}
                title={locked.accent ? 'Accent color locked' : 'Lock accent color'}
              >
                {locked.accent ? <Lock size={14} /> : <Unlock size={14} />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="color"
              value={accent}
              onChange={(e) => !locked.accent && onAccentChange(e.target.value)}
              disabled={locked.accent}
              className="w-10 h-10 rounded-lg cursor-pointer border-0 bg-transparent"
            />
            <input
              type="text"
              value={accent}
              onChange={(e) => !locked.accent && onAccentChange(e.target.value)}
              disabled={locked.accent}
              className="flex-1 h-10 px-3 bg-[#0B1626] border border-[#20344A] rounded-lg text-[#F4F7FB] font-mono text-sm uppercase focus:outline-none focus:border-[#1683FF]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

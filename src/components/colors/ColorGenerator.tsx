import React, { useState, useCallback } from 'react';
import type { GeneratedPalette } from '../../types/color';
import { generateColorScale, generateGrayScale } from '../../utils/colorScale';
import { isValidHex, normalizeHex } from '../../utils/colorUtils';
import { Sparkles, RefreshCw } from 'lucide-react';

interface ColorGeneratorProps {
  onGenerate: (palette: GeneratedPalette) => void;
  initialPrimary?: string;
  initialSecondary?: string;
  initialGray?: string;
}

interface ColorInput {
  value: string;
  label: string;
  key: 'primary' | 'secondary' | 'gray';
  defaultValue: string;
}

export const ColorGenerator: React.FC<ColorGeneratorProps> = ({
  onGenerate,
  initialPrimary = '#1683FF',
  initialSecondary = '#12B8C4',
  initialGray = '#6B7280',
}) => {
  const [primary, setPrimary] = useState(initialPrimary);
  const [secondary, setSecondary] = useState(initialSecondary);
  const [gray, setGray] = useState(initialGray);
  const [generating, setGenerating] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const inputs: ColorInput[] = [
    { value: primary, label: 'Primary Color', key: 'primary', defaultValue: initialPrimary },
    { value: secondary, label: 'Secondary Color', key: 'secondary', defaultValue: initialSecondary },
    { value: gray, label: 'Gray Base', key: 'gray', defaultValue: initialGray },
  ];

  const setters = { primary: setPrimary, secondary: setSecondary, gray: setGray };

  const handleColorChange = (key: 'primary' | 'secondary' | 'gray', val: string) => {
    setters[key](val);
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  const handleHexInput = (key: 'primary' | 'secondary' | 'gray', val: string) => {
    const normalized = val.startsWith('#') ? val : `#${val}`;
    setters[key](normalized);
    if (!isValidHex(normalized) && val.length > 3) {
      setErrors(prev => ({ ...prev, [key]: 'Invalid HEX color' }));
    } else {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  const handleGenerate = useCallback(async () => {
    const newErrors: Record<string, string> = {};
    if (!isValidHex(primary)) newErrors.primary = 'Invalid HEX color';
    if (!isValidHex(secondary)) newErrors.secondary = 'Invalid HEX color';
    if (!isValidHex(gray)) newErrors.gray = 'Invalid HEX color';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setGenerating(true);

    // Small delay for UX
    await new Promise(r => setTimeout(r, 300));

    try {
      const palette: GeneratedPalette = {
        primary: generateColorScale(normalizeHex(primary)),
        secondary: generateColorScale(normalizeHex(secondary)),
        gray: generateGrayScale(normalizeHex(gray)),
        baseColors: {
          primary: normalizeHex(primary),
          secondary: normalizeHex(secondary),
          gray: normalizeHex(gray),
        },
        generatedAt: Date.now(),
      };
      onGenerate(palette);
    } finally {
      setGenerating(false);
    }
  }, [primary, secondary, gray, onGenerate]);

  return (
    <div className="bg-[#101F31] border border-[#20344A] rounded-2xl p-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        {inputs.map(({ value, label, key }) => (
          <div key={key}>
            <label className="block text-[#94A3B8] text-xs font-medium mb-2">
              {label}
            </label>
            <div className="flex gap-2">
              {/* Color picker */}
              <div className="relative w-10 h-10 shrink-0 rounded-lg overflow-hidden border border-[#20344A] cursor-pointer">
                <input
                  type="color"
                  value={isValidHex(value) ? value : '#1683FF'}
                  onChange={e => handleColorChange(key, e.target.value)}
                  className="absolute inset-0 w-[150%] h-[150%] -translate-x-[10%] -translate-y-[10%] cursor-pointer"
                  aria-label={`${label} color picker`}
                />
              </div>

              {/* HEX input */}
              <div className="flex-1">
                <input
                  type="text"
                  value={value}
                  onChange={e => handleHexInput(key, e.target.value)}
                  placeholder="#1683FF"
                  maxLength={7}
                  className={`
                    w-full h-10 px-3 bg-[#0B1626] border rounded-lg
                    text-[#F4F7FB] text-sm font-mono placeholder-[#64748B]
                    focus:outline-none transition-all
                    ${errors[key]
                      ? 'border-[#EF4444] focus:border-[#EF4444] focus:shadow-[0_0_8px_rgba(239,68,68,0.25)]'
                      : 'border-[#20344A] focus:border-[#1683FF] focus:shadow-[0_0_8px_rgba(22,131,255,0.25)]'
                    }
                  `}
                  aria-label={`${label} HEX value`}
                  aria-invalid={!!errors[key]}
                  aria-describedby={errors[key] ? `error-${key}` : undefined}
                />
                {errors[key] && (
                  <p id={`error-${key}`} className="text-[#EF4444] text-xs mt-1">{errors[key]}</p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={handleGenerate}
        disabled={generating}
        className={`
          w-full flex items-center justify-center gap-2 py-3 px-6
          bg-gradient-to-r from-[#1683FF] to-[#12B8C4] text-white
          font-semibold rounded-xl text-sm
          hover:opacity-90 active:opacity-80 transition-all duration-200
          focus-visible:outline-2 focus-visible:outline-[#1683FF] focus-visible:outline-offset-2
          disabled:opacity-60 disabled:cursor-not-allowed
          shadow-[0_4px_16px_rgba(22,131,255,0.3)]
        `}
        aria-label="Generate color system"
      >
        {generating ? (
          <RefreshCw size={16} className="animate-spin" />
        ) : (
          <Sparkles size={16} />
        )}
        {generating ? 'Generating...' : 'Generate Color System'}
      </button>
    </div>
  );
};

export default ColorGenerator;

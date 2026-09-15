import React from 'react';
import type { ColorScale as ColorScaleType } from '../../types/color';
import { isLight } from '../../utils/colorUtils';
import { CopyButton } from '../common/CopyButton';

interface ColorScaleProps {
  name: string;
  scale: ColorScaleType;
  className?: string;
}

const steps = [100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

export const ColorScale: React.FC<ColorScaleProps> = ({ name, scale, className = '' }) => {
  return (
    <div className={className}>
      <h4 className="text-[#94A3B8] text-sm font-semibold mb-3 capitalize">{name} Scale</h4>
      <div className="grid grid-cols-9 rounded-xl overflow-hidden border border-[#20344A]">
        {steps.map(step => {
          const hex = scale[step];
          const light = isLight(hex);
          return (
            <div
              key={step}
              className="group relative flex flex-col"
              style={{ backgroundColor: hex }}
            >
              {/* Swatch body */}
              <div className="h-12 sm:h-16 flex items-center justify-center">
                <span
                  className="text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{ color: light ? '#000' : '#fff' }}
                >
                  {step}
                </span>
              </div>

              {/* Step label below */}
              <div
                className="px-1 py-1 text-center"
                style={{ backgroundColor: hex }}
              >
                <p
                  className="text-[10px] font-semibold leading-none mb-0.5"
                  style={{ color: light ? 'rgba(0,0,0,0.6)' : 'rgba(255,255,255,0.6)' }}
                >
                  {step}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* HEX values below */}
      <div className="grid grid-cols-9 gap-0 mt-1">
        {steps.map(step => {
          const hex = scale[step];
          return (
            <div key={step} className="flex flex-col items-center gap-1">
              <p className="text-[9px] font-mono text-[#64748B] text-center leading-none">{hex}</p>
              <CopyButton value={hex} size="sm" className="text-[9px] !px-1 !py-0.5" />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ColorScale;

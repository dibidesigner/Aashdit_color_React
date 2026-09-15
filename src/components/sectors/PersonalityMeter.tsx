import React from 'react';
import type { Sector } from '../../types/sector';

interface PersonalityMeterProps {
  personality: Sector['personality'];
}

const personalityLabels: Record<string, string> = {
  trust: 'Trust',
  professional: 'Professional',
  modern: 'Modern',
  friendly: 'Friendly',
  playful: 'Playful',
  luxury: 'Luxury',
  calm: 'Calm',
  bold: 'Bold',
  minimal: 'Minimal',
  creative: 'Creative',
  energetic: 'Energetic',
  serious: 'Serious',
};

const getBarColor = (value: number): string => {
  if (value >= 80) return '#1683FF';
  if (value >= 60) return '#12B8C4';
  if (value >= 40) return '#8B5CF6';
  return '#64748B';
};

export const PersonalityMeter: React.FC<PersonalityMeterProps> = ({ personality }) => {
  const entries = Object.entries(personality)
    .filter(([, v]) => v !== undefined)
    .sort(([, a], [, b]) => (b as number) - (a as number));

  return (
    <div className="space-y-3">
      {entries.map(([key, value]) => {
        const val = value as number;
        return (
          <div key={key} className="flex items-center gap-3">
            <span className="text-[#94A3B8] text-xs font-medium w-24 shrink-0">
              {personalityLabels[key] || key}
            </span>
            <div className="flex-1 h-2 bg-[#162237] rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700 ease-out"
                style={{
                  width: `${val}%`,
                  backgroundColor: getBarColor(val),
                }}
                role="progressbar"
                aria-valuenow={val}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${personalityLabels[key] || key}: ${val}%`}
              />
            </div>
            <span className="text-[#64748B] text-xs font-mono w-8 text-right">{val}%</span>
          </div>
        );
      })}
    </div>
  );
};

export default PersonalityMeter;

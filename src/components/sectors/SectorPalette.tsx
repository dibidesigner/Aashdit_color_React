import React, { useState } from 'react';
import type { SectorColor } from '../../types/sector';
import { getColorFormats } from '../../utils/colorUtils';
import { isLight } from '../../utils/colorUtils';
import { CopyButton } from '../common/CopyButton';
import { ColorDetailModal } from '../colors/ColorDetailModal';

interface SectorPaletteProps {
  colors: SectorColor;
  sectorName: string;
}

const colorLabels: Partial<Record<keyof SectorColor, string>> = {
  primary: 'Primary',
  secondary: 'Secondary',
  accent: 'Accent',
  background: 'Background',
  surface: 'Surface',
  text: 'Text',
  success: 'Success',
  warning: 'Warning',
  error: 'Error',
  info: 'Info',
};

const colorUsageMap: Partial<Record<keyof SectorColor, string[]>> = {
  primary: ['Primary buttons', 'Navigation active', 'Links', 'Key highlights'],
  secondary: ['Secondary buttons', 'Badges', 'Hover states', 'Accents'],
  accent: ['Call-to-action', 'Special highlights', 'Notifications'],
  background: ['Page background', 'Large areas'],
  surface: ['Cards', 'Panels', 'Modals'],
  text: ['Body text', 'Headings', 'Labels'],
  success: ['Success messages', 'Completion states', 'Green data'],
  warning: ['Warning alerts', 'Caution states'],
  error: ['Error messages', 'Destructive actions'],
  info: ['Info alerts', 'Help text', 'Links'],
};

interface ColorSwatchItemProps {
  colorKey: keyof SectorColor;
  hex: string;
  customName?: string;
}

const ColorSwatchItem: React.FC<ColorSwatchItemProps> = ({ colorKey, hex, customName }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const formats = getColorFormats(hex);
  const light = isLight(hex);
  const label = customName || colorLabels[colorKey] || String(colorKey);
  const usage = colorUsageMap[colorKey] || [];

  return (
    <>
      <div
        className="group cursor-pointer"
        onClick={() => setModalOpen(true)}
        role="button"
        tabIndex={0}
        onKeyDown={e => e.key === 'Enter' && setModalOpen(true)}
        aria-label={`${label}: ${hex} - click to view details`}
      >
        {/* Swatch */}
        <div
          className="h-16 rounded-t-xl flex items-end p-2 transition-all duration-200 group-hover:opacity-90"
          style={{ backgroundColor: hex }}
        >
          <span
            className="text-xs font-semibold opacity-70 group-hover:opacity-100 transition-opacity"
            style={{ color: light ? '#000' : '#fff' }}
          >
            {label}
          </span>
        </div>

        {/* Info */}
        <div className="bg-[#0B1626] border border-t-0 border-[#20344A] rounded-b-xl px-3 py-2.5">
          <div className="flex items-center justify-between gap-2">
            <div>
              <p className="text-[#F4F7FB] text-xs font-mono font-medium">{formats.hex}</p>
              <p className="text-[#64748B] text-[10px] mt-0.5">{customName || label}</p>
            </div>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <CopyButton value={formats.hex} size="sm" />
            </div>
          </div>
        </div>
      </div>

      <ColorDetailModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        color={{ name: label, hex, usage }}
      />
    </>
  );
};

export const SectorPalette: React.FC<SectorPaletteProps> = ({ colors }) => {
  const primaryColors: Array<keyof SectorColor> = ['primary', 'secondary', 'accent'];
  const semanticColors: Array<keyof SectorColor> = ['success', 'warning', 'error', 'info'];
  const neutralColors: Array<keyof SectorColor> = ['background', 'surface', 'text'];

  const renderGroup = (keys: Array<keyof SectorColor>, label: string) => {
    const available = keys.filter(k => colors[k]);
    if (available.length === 0) return null;

    return (
      <div className="mb-6">
        <h4 className="text-[#64748B] text-xs font-semibold uppercase tracking-wider mb-3">{label}</h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
          {available.map(key => (
            <ColorSwatchItem
              key={key}
              colorKey={key}
              hex={colors[key] as string}
              customName={
                key === 'primary' ? colors.primaryName :
                key === 'secondary' ? colors.secondaryName :
                key === 'accent' ? colors.accentName :
                undefined
              }
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      {renderGroup(primaryColors, 'Brand Colors')}
      {renderGroup(neutralColors, 'Neutral Colors')}
      {renderGroup(semanticColors, 'Semantic Colors')}
    </div>
  );
};

export default SectorPalette;

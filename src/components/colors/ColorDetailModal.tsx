import React from 'react';
import Modal from '../common/Modal';
import { CopyButton } from '../common/CopyButton';
import { getColorFormats, isLight } from '../../utils/colorUtils';

interface ColorDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  color: {
    name: string;
    hex: string;
    usage?: string[];
  };
}

export const ColorDetailModal: React.FC<ColorDetailModalProps> = ({
  isOpen,
  onClose,
  color,
}) => {
  const formats = getColorFormats(color.hex);
  const light = isLight(color.hex);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="sm">
      {/* Color preview */}
      <div
        className="h-32 flex items-center justify-center"
        style={{ backgroundColor: color.hex }}
      >
        <span
          className="text-2xl font-bold opacity-80"
          style={{ color: light ? '#111' : '#fff' }}
        >
          {formats.hex}
        </span>
      </div>

      {/* Details */}
      <div className="p-6 space-y-4">
        <h3 className="text-[#F4F7FB] font-semibold text-lg">{color.name}</h3>

        {/* Color formats */}
        <div className="space-y-2">
          {[
            { label: 'HEX', value: formats.hex },
            { label: 'RGB', value: formats.rgb },
            { label: 'HSL', value: formats.hsl },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between bg-[#0B1626] border border-[#20344A] rounded-lg px-3 py-2.5">
              <div>
                <span className="text-[#64748B] text-xs font-medium mr-3">{label}</span>
                <span className="text-[#F4F7FB] text-sm font-mono">{value}</span>
              </div>
              <CopyButton value={value} label="Copy" size="sm" />
            </div>
          ))}
        </div>

        {/* Usage */}
        {color.usage && color.usage.length > 0 && (
          <div>
            <h4 className="text-[#64748B] text-xs font-semibold uppercase tracking-wider mb-2">Recommended Usage</h4>
            <ul className="space-y-1.5">
              {color.usage.map((item, i) => (
                <li key={i} className="flex items-center gap-2 text-[#94A3B8] text-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1683FF] shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default ColorDetailModal;

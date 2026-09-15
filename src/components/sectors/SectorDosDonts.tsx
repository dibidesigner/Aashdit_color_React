import React from 'react';
import type { Sector } from '../../types/sector';
import { CheckCircle, XCircle } from 'lucide-react';

interface SectorDosDontsProps {
  dosDonts: Sector['dosDonts'];
}

export const SectorDosDonts: React.FC<SectorDosDontsProps> = ({ dosDonts }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Do */}
      <div className="bg-[rgba(16,185,129,0.05)] border border-[rgba(16,185,129,0.2)] rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle size={18} className="text-[#10B981]" />
          <h4 className="text-[#10B981] font-semibold">Do</h4>
        </div>
        <ul className="space-y-2.5">
          {dosDonts.do.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] mt-2 shrink-0" aria-hidden="true" />
              <span className="text-[#94A3B8] text-sm leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Don't */}
      <div className="bg-[rgba(239,68,68,0.05)] border border-[rgba(239,68,68,0.2)] rounded-xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <XCircle size={18} className="text-[#EF4444]" />
          <h4 className="text-[#EF4444] font-semibold">Don&apos;t</h4>
        </div>
        <ul className="space-y-2.5">
          {dosDonts.dont.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] mt-2 shrink-0" aria-hidden="true" />
              <span className="text-[#94A3B8] text-sm leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SectorDosDonts;

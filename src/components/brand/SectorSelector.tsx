import React, { useState } from 'react';
import { Search, Check } from 'lucide-react';
import { sectors } from '../../data/sectors';
import type { Sector } from '../../types/sector';

interface SectorSelectorProps {
  selectedSectorId: string | null;
  onSelectSector: (sector: Sector) => void;
}

export const SectorSelector: React.FC<SectorSelectorProps> = ({
  selectedSectorId,
  onSelectSector,
}) => {
  const [search, setSearch] = useState('');

  const filtered = sectors.filter(
    s =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      (s.category && s.category.toLowerCase().includes(search.toLowerCase())) ||
      s.shortDescription.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="w-full">
      {/* Search Input */}
      <div className="relative mb-4">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none"
        />
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="🔍 Search sector (e.g. Healthcare, Government, Finance)..."
          className="w-full h-11 pl-10 pr-4 bg-[#0B1626] border border-[#20344A] rounded-xl text-[#F4F7FB] placeholder-[#64748B] text-sm focus:outline-none focus:border-[#1683FF] transition-all"
        />
      </div>

      {/* Grid of Sector Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[320px] overflow-y-auto pr-1">
        {filtered.map(sec => {
          const isSelected = sec.id === selectedSectorId;

          return (
            <div
              key={sec.id}
              onClick={() => onSelectSector(sec)}
              className={`
                p-3.5 rounded-xl border cursor-pointer transition-all duration-200 flex items-start gap-3 relative
                ${isSelected
                  ? 'bg-[rgba(22,131,255,0.12)] border-[#1683FF] shadow-[0_0_15px_rgba(22,131,255,0.2)]'
                  : 'bg-[#101F31] border-[#20344A] hover:border-[#2D4A68] hover:bg-[#13253A]'
                }
              `}
            >
              <div className="w-10 h-10 rounded-lg bg-[#0B1626] border border-[#20344A] flex items-center justify-center text-xl shrink-0">
                {sec.icon}
              </div>

              <div className="flex-1 min-w-0 pr-5">
                <div className="flex items-center gap-2 mb-0.5">
                  <h4 className="text-[#F4F7FB] font-semibold text-sm truncate">
                    {sec.name}
                  </h4>
                </div>
                <p className="text-[#64748B] text-xs line-clamp-1">
                  {sec.shortDescription}
                </p>
                <span className="inline-block mt-1.5 px-2 py-0.5 bg-[#0B1626] text-[#38BDF8] text-[10px] rounded border border-[#20344A]">
                  {sec.category}
                </span>
              </div>

              {isSelected && (
                <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-[#1683FF] flex items-center justify-center text-white">
                  <Check size={12} />
                </div>
              )}
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-full py-8 text-center text-[#64748B] text-sm">
            No sectors found matching &quot;{search}&quot;
          </div>
        )}
      </div>
    </div>
  );
};

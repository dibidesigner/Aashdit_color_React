import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import type { Sector } from '../../types/sector';
import { Badge } from '../common/Badge';

interface SectorCardProps {
  sector: Sector;
  className?: string;
}

export const SectorCard: React.FC<SectorCardProps> = ({ sector, className = '' }) => {
  const navigate = useNavigate();

  const colorPreviews = [
    { label: 'Primary', hex: sector.colors.primary },
    { label: 'Secondary', hex: sector.colors.secondary },
    { label: 'Accent', hex: sector.colors.accent },
    { label: 'Surface', hex: sector.colors.surface || '#FFFFFF' },
  ];

  return (
    <div
      className={`
        group relative bg-gradient-to-b from-[#102136] to-[#0B1728] border border-[#20364F] rounded-2xl p-5
        hover:border-[#1683FF]/60 hover:shadow-[0_12px_40px_rgba(22,131,255,0.18)] hover:-translate-y-1.5
        transition-all duration-300 cursor-pointer flex flex-col justify-between h-full overflow-hidden
        ${className}
      `}
      onClick={() => navigate(`/sectors/${sector.id}`)}
      role="article"
      aria-label={`${sector.name} sector design guide`}
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(`/sectors/${sector.id}`)}
    >
      <div>
        {/* Top: Icon + Color Swatches */}
        <div className="flex items-center justify-between gap-2 mb-4">
          {/* Sector Icon */}
          <div className="w-12 h-12 rounded-xl bg-[#070E18] border border-[#243A54] flex items-center justify-center text-2xl shadow-inner shrink-0 group-hover:scale-105 group-hover:border-[#1683FF]/40 transition-all duration-300">
            {sector.icon}
          </div>

          {/* Color Swatches with tooltips */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#070E18]/80 border border-[#1E334D] shrink-0">
            {colorPreviews.map((c, i) => (
              <div
                key={i}
                className="relative group/swatch"
              >
                <div
                  className="w-6 h-6 rounded-md border border-[#0B1728] shadow-md hover:scale-125 hover:z-10 transition-transform duration-200 cursor-pointer"
                  style={{ backgroundColor: c.hex }}
                  aria-label={`${c.label} color: ${c.hex}`}
                />
                {/* Tooltip on swatch hover */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover/swatch:flex flex-col items-center z-20 pointer-events-none">
                  <div className="bg-[#040911] text-[#F4F7FB] text-[10px] font-mono px-2 py-1 rounded border border-[#20344A] whitespace-nowrap shadow-lg">
                    {c.hex}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sector Name / Title */}
        <h3 className="text-[#F4F7FB] font-bold text-lg mb-1.5 group-hover:text-[#38BDF8] transition-colors flex items-center gap-2">
          {sector.name}
        </h3>

        {/* Short description */}
        <p className="text-[#94A3B8] text-xs mb-3.5 leading-relaxed line-clamp-2">
          {sector.shortDescription}
        </p>

        {/* Character tags */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {sector.character.slice(0, 4).map(tag => (
            <Badge key={tag} variant="default" size="sm" className="bg-[#13253B] text-[#38BDF8] border-[#1E3A5F] px-2 py-0.5 text-[11px]">
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Explore button footer */}
      <div className="flex items-center justify-between pt-3.5 border-t border-[#1C314A] gap-2">
        <span className="text-[#64748B] text-xs font-medium whitespace-nowrap">
          {sector.sampleUI.length} sample UI{sector.sampleUI.length !== 1 ? 's' : ''}
        </span>
        <span className="flex items-center gap-1.5 text-[#1683FF] text-xs font-semibold group-hover:text-[#38BDF8] group-hover:gap-2 transition-all duration-200 whitespace-nowrap shrink-0">
          Explore Guide
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform duration-200 shrink-0" />
        </span>
      </div>
    </div>
  );
};

export default SectorCard;

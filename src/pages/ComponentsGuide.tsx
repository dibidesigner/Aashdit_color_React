import React, { useState } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { componentsData } from '../data/components';
import { Boxes } from 'lucide-react';

const stateColors: Record<string, string> = {
  default: 'bg-[#101F31] border-[#20344A] text-[#F4F7FB]',
  hover: 'bg-[#13253A] border-[#2D4A68] text-[#F4F7FB]',
  active: 'bg-[#1A2F48] border-[#2D4A68] text-[#F4F7FB]',
  focus: 'bg-[#101F31] border-[#1683FF] text-[#F4F7FB] ring-1 ring-[#1683FF]/30',
  disabled: 'bg-[#0B1626] border-[#162237] text-[#3D566E] opacity-60',
  loading: 'bg-[#101F31] border-[#20344A] text-[#64748B]',
  error: 'bg-[rgba(239,68,68,0.08)] border-[#EF4444] text-[#F4F7FB]',
  success: 'bg-[rgba(16,185,129,0.08)] border-[#10B981] text-[#F4F7FB]',
};

const variantBadge: Record<string, string> = {
  Primary: 'bg-[#1683FF] text-white',
  Secondary: 'bg-[#13253A] border border-[#20344A] text-[#94A3B8]',
  Outline: 'border border-[#1683FF] text-[#1683FF] bg-transparent',
  Ghost: 'text-[#94A3B8] bg-transparent',
  Destructive: 'bg-[#EF4444] text-white',
  Link: 'text-[#1683FF] underline bg-transparent',
  On: 'bg-[#10B981] text-white',
  Off: 'bg-[#20344A] text-[#64748B]',
  Checked: 'bg-[#1683FF] text-white',
  Unchecked: 'border border-[#20344A] bg-transparent',
  Info: 'bg-[rgba(22,131,255,0.12)] text-[#1683FF]',
  Success: 'bg-[rgba(16,185,129,0.12)] text-[#10B981]',
  Warning: 'bg-[rgba(245,158,11,0.12)] text-[#F59E0B]',
  Error: 'bg-[rgba(239,68,68,0.12)] text-[#EF4444]',
};

export const ComponentsGuide: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState(componentsData[0].category);
  const categories = componentsData.map(c => c.category);
  const activeData = componentsData.find(c => c.category === activeCategory);

  return (
    <div className="min-h-screen py-8">
      <PageContainer>
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[rgba(22,131,255,0.1)] border border-[rgba(22,131,255,0.2)] flex items-center justify-center">
            <Boxes size={18} className="text-[#1683FF]" />
          </div>
          <div>
            <h1 className="text-[#F4F7FB] text-2xl font-bold">Component Guide</h1>
            <p className="text-[#64748B] text-sm">UI components with states and variants</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Category sidebar */}
          <div className="lg:w-48 shrink-0">
            <div className="bg-[#101F31] border border-[#20344A] rounded-xl p-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-all duration-150
                    ${activeCategory === cat
                      ? 'bg-[rgba(22,131,255,0.1)] text-[#1683FF]'
                      : 'text-[#64748B] hover:text-[#94A3B8] hover:bg-[#0B1626]'
                    }
                  `}
                  aria-pressed={activeCategory === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Component display */}
          <div className="flex-1 space-y-6">
            {activeData?.components.map(comp => (
              <div key={comp.id} className="bg-[#101F31] border border-[#20344A] rounded-xl overflow-hidden">
                <div className="px-5 py-4 border-b border-[#20344A]">
                  <h2 className="text-[#F4F7FB] font-semibold">{comp.name}</h2>
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-3 mb-4">
                    {comp.variants.map(variant => (
                      <div
                        key={variant}
                        className={`
                          px-4 py-2 rounded-lg border text-sm font-medium cursor-default
                          ${variantBadge[variant] || stateColors.default}
                        `}
                      >
                        {variant}
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {comp.variants.map(variant => (
                      <span key={variant} className="px-2 py-0.5 bg-[#0B1626] border border-[#20344A] text-[#64748B] text-xs rounded font-mono">
                        {variant}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default ComponentsGuide;

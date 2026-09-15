import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { typographyData } from '../data/typography';
import { Type } from 'lucide-react';

export const TypographyGuide: React.FC = () => {
  return (
    <div className="min-h-screen py-8">
      <PageContainer>
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[rgba(139,92,246,0.1)] border border-[rgba(139,92,246,0.2)] flex items-center justify-center">
            <Type size={18} className="text-[#8B5CF6]" />
          </div>
          <div>
            <h1 className="text-[#F4F7FB] text-2xl font-bold">Typography Guide</h1>
            <p className="text-[#64748B] text-sm">Font families, scales, and pairings</p>
          </div>
        </div>

        {/* Font Families */}
        <section className="mb-10">
          <h2 className="text-[#F4F7FB] font-semibold text-lg mb-4">Recommended Font Families</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {typographyData.fontFamilies.map(font => (
              <div key={font.name} className="bg-[#101F31] border border-[#20344A] rounded-xl p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3
                      className="text-[#F4F7FB] text-2xl font-bold mb-1"
                      style={{ fontFamily: font.name + ', sans-serif' }}
                    >
                      {font.name}
                    </h3>
                    <div className="flex gap-2">
                      <span className="px-2 py-0.5 bg-[#0B1626] border border-[#20344A] text-[#94A3B8] text-xs rounded">
                        {font.category}
                      </span>
                    </div>
                  </div>
                </div>
                <p
                  className="text-[#94A3B8] text-sm leading-relaxed mb-3"
                  style={{ fontFamily: font.name + ', sans-serif' }}
                >
                  The quick brown fox jumps over the lazy dog. 0123456789.
                </p>
                <p className="text-[#64748B] text-xs">{font.usage}</p>
                <div className="flex flex-wrap gap-1 mt-2">
                  {font.weights.map(w => (
                    <span key={w} className="text-[#64748B] text-xs px-2 py-0.5 bg-[#0B1626] border border-[#20344A] rounded font-mono">{w}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Type Scale */}
        <section className="mb-10">
          <h2 className="text-[#F4F7FB] font-semibold text-lg mb-4">Type Scale</h2>
          <div className="bg-[#101F31] border border-[#20344A] rounded-xl overflow-hidden">
            <div className="grid grid-cols-4 px-5 py-3 border-b border-[#20344A] text-[#64748B] text-xs font-semibold uppercase tracking-wider">
              <span>Style</span>
              <span>Size / Weight</span>
              <span>Preview</span>
              <span>Usage</span>
            </div>
            {typographyData.typeScale.map((item) => (
              <div
                key={item.name}
                className="grid grid-cols-4 items-center px-5 py-4 border-b border-[#162237] last:border-0 hover:bg-[#13253A] transition-colors"
              >
                <span className="text-[#94A3B8] text-sm font-medium">{item.name}</span>
                <div>
                  <span className="text-[#F4F7FB] text-sm font-mono">{item.size}</span>
                  <span className="text-[#64748B] text-xs ml-2">/ {item.weight}</span>
                </div>
                <span
                  className="text-[#F4F7FB] truncate"
                  style={{ fontSize: Math.min(parseInt(item.size), 28) + 'px', fontWeight: item.weight }}
                >
                  Aa
                </span>
                <span className="text-[#64748B] text-xs">{item.usage}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Font Pairings */}
        <section>
          <h2 className="text-[#F4F7FB] font-semibold text-lg mb-4">Recommended Pairings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {typographyData.fontPairings.map((pair, i) => (
              <div key={i} className="bg-[#101F31] border border-[#20344A] rounded-xl p-5">
                <div className="mb-4">
                  <p className="text-[#64748B] text-xs uppercase tracking-wider mb-1">Heading</p>
                  <p className="text-[#F4F7FB] text-xl font-bold" style={{ fontFamily: pair.heading }}>{pair.heading}</p>
                  <p className="text-[#64748B] text-xs uppercase tracking-wider mt-3 mb-1">Body</p>
                  <p className="text-[#94A3B8] text-sm" style={{ fontFamily: pair.body }}>
                    {pair.body} — The quick brown fox jumps over the lazy dog.
                  </p>
                </div>
                <div className="flex flex-wrap gap-1 pt-3 border-t border-[#162237]">
                  {pair.sectors.map(s => (
                    <span key={s} className="text-[#64748B] text-xs px-2 py-0.5 bg-[#0B1626] border border-[#20344A] rounded">{s}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </PageContainer>
    </div>
  );
};

export default TypographyGuide;

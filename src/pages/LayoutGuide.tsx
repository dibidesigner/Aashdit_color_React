import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { layoutData } from '../data/layouts';
import { Layout } from 'lucide-react';

export const LayoutGuide: React.FC = () => {
  return (
    <div className="min-h-screen py-8">
      <PageContainer>
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-[rgba(18,184,196,0.1)] border border-[rgba(18,184,196,0.2)] flex items-center justify-center">
            <Layout size={18} className="text-[#12B8C4]" />
          </div>
          <div>
            <h1 className="text-[#F4F7FB] text-2xl font-bold">Layout Guide</h1>
            <p className="text-[#64748B] text-sm">Grid systems, breakpoints, and spacing</p>
          </div>
        </div>

        {/* Breakpoints */}
        <section className="mb-10">
          <h2 className="text-[#F4F7FB] font-semibold text-lg mb-4">Responsive Breakpoints</h2>
          <div className="bg-[#101F31] border border-[#20344A] rounded-xl overflow-hidden">
            <div className="grid grid-cols-5 px-5 py-3 border-b border-[#20344A] text-[#64748B] text-xs font-semibold uppercase tracking-wider">
              <span>Name</span>
              <span>Width</span>
              <span>Columns</span>
              <span>Gutter</span>
              <span>Margin</span>
            </div>
            {layoutData.breakpoints.map(bp => (
              <div key={bp.name} className="grid grid-cols-5 items-center px-5 py-3 border-b border-[#162237] last:border-0 hover:bg-[#13253A] transition-colors">
                <span className="text-[#F4F7FB] text-sm font-medium">{bp.name}</span>
                <span className="text-[#94A3B8] text-sm font-mono">{bp.width}</span>
                <span className="text-[#1683FF] text-sm font-semibold">{bp.columns}</span>
                <span className="text-[#94A3B8] text-sm font-mono">{bp.gutter}</span>
                <span className="text-[#94A3B8] text-sm font-mono">{bp.margin}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Grid visual */}
        <section className="mb-10">
          <h2 className="text-[#F4F7FB] font-semibold text-lg mb-4">12-Column Grid</h2>
          <div className="bg-[#101F31] border border-[#20344A] rounded-xl p-6">
            <div className="grid grid-cols-12 gap-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="h-10 rounded flex items-center justify-center text-xs font-bold text-[#1683FF]"
                  style={{ backgroundColor: 'rgba(22,131,255,0.1)', border: '1px solid rgba(22,131,255,0.2)' }}
                >
                  {i + 1}
                </div>
              ))}
            </div>
            <p className="text-[#64748B] text-xs mt-3 text-center">12 equal columns · 24px gutter · flexible margin</p>
          </div>
        </section>

        {/* Spacing Scale */}
        <section className="mb-10">
          <h2 className="text-[#F4F7FB] font-semibold text-lg mb-4">Spacing Scale</h2>
          <div className="space-y-2">
            {layoutData.spacingScale.map(({ token, value, usage }) => (
              <div key={token} className="flex items-center gap-4 p-3 bg-[#101F31] border border-[#20344A] rounded-lg hover:bg-[#13253A] transition-colors">
                <code className="text-[#1683FF] text-xs font-mono w-36 shrink-0">{token}</code>
                <div
                  className="bg-[#1683FF] rounded shrink-0"
                  style={{ width: value, height: '16px' }}
                />
                <code className="text-[#94A3B8] text-xs font-mono w-14 shrink-0">{value}</code>
                <span className="text-[#64748B] text-xs">{usage}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Border Radius */}
        <section>
          <h2 className="text-[#F4F7FB] font-semibold text-lg mb-4">Border Radius Scale</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {layoutData.radiusScale.map(({ token, value, usage }) => (
              <div key={token} className="bg-[#101F31] border border-[#20344A] rounded-xl p-4 text-center">
                <div
                  className="w-12 h-12 bg-[#1683FF]/20 border-2 border-[#1683FF] mx-auto mb-3"
                  style={{ borderRadius: value }}
                />
                <code className="text-[#94A3B8] text-xs font-mono block mb-1">{value}</code>
                <p className="text-[#64748B] text-xs leading-tight">{usage}</p>
              </div>
            ))}
          </div>
        </section>
      </PageContainer>
    </div>
  );
};

export default LayoutGuide;

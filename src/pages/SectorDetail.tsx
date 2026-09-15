import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  Image, Monitor, Tablet, Smartphone,
  ChevronRight
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';

import { Badge } from '../components/common/Badge';
import { PersonalityMeter } from '../components/sectors/PersonalityMeter';
import { SectorPalette } from '../components/sectors/SectorPalette';
import { SectorDosDonts } from '../components/sectors/SectorDosDonts';
import { sectors } from '../data/sectors';
import { getSectorById } from '../utils/search';
import NotFound from './NotFound';


const sectionTabs = [
  { id: 'overview', label: 'Overview' },
  { id: 'colors', label: 'Colors' },
  { id: 'layout', label: 'Layout' },
  { id: 'typography', label: 'Typography' },
  { id: 'shapes', label: 'Shapes' },
  { id: 'components', label: 'Components' },
  { id: 'sample-ui', label: 'Sample UI' },
  { id: 'accessibility', label: 'Accessibility' },
];

export const SectorDetail: React.FC = () => {
  const { sectorId } = useParams<{ sectorId: string }>();
  const [activeTab, setActiveTab] = useState('overview');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const sector = getSectorById(sectors, sectorId || '');

  if (!sector) return <NotFound />;

  const colors = sector.colors;
  const primaryHex = colors.primary;

  return (
    <div className="min-h-screen">
      {/* Breadcrumb + Hero */}
      <div
        className="relative border-b border-[#20344A] py-8"
        style={{
          background: `linear-gradient(135deg, ${primaryHex}15 0%, ${primaryHex}05 100%)`,
        }}
      >
        <PageContainer>
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm mb-6" aria-label="Breadcrumb">
            <Link to="/sectors" className="text-[#64748B] hover:text-[#94A3B8] transition-colors">
              Sectors
            </Link>
            <ChevronRight size={14} className="text-[#20344A]" />
            <span className="text-[#F4F7FB]">{sector.name}</span>
          </nav>

          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left: Info */}
            <div className="flex-1">
              <div className="flex items-start gap-4 mb-4">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border"
                  style={{ borderColor: `${primaryHex}40`, backgroundColor: `${primaryHex}15` }}
                >
                  {sector.icon}
                </div>
                <div>
                  <h1 className="text-[#F4F7FB] text-3xl font-bold mb-1">{sector.name}</h1>
                  <p className="text-[#94A3B8] text-sm font-medium">
                    {sector.name} UI/UX Design Guide
                  </p>
                </div>
              </div>

              <p className="text-[#94A3B8] text-sm leading-relaxed max-w-lg mb-4">
                {sector.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {sector.character.map(tag => (
                  <Badge key={tag} variant="default" size="sm">{tag}</Badge>
                ))}
              </div>
            </div>

            {/* Right: Quick palette */}
            <div className="lg:w-72">
              <div className="bg-[#0B1626]/60 border border-[#20344A] rounded-xl p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-[#94A3B8] text-xs font-semibold uppercase tracking-wider">
                    Recommended Color Palette
                  </h3>
                </div>
                <div className="flex gap-1.5 mb-3">
                  {[colors.primary, colors.secondary, colors.accent, colors.background, colors.surface, colors.text]
                    .filter(Boolean)
                    .map((c, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-lg border border-[#20344A] shadow-sm"
                        style={{ backgroundColor: c }}
                        title={c}
                      />
                    ))}
                </div>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  {[
                    { label: 'Primary', value: colors.primary },
                    { label: 'Secondary', value: colors.secondary },
                    { label: 'Accent', value: colors.accent },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-[#07111F] border border-[#20344A] rounded-lg p-2">
                      <div className="w-4 h-4 rounded mb-1" style={{ backgroundColor: value }} />
                      <p className="text-[#64748B] text-[9px]">{label}</p>
                      <p className="text-[#F4F7FB] font-mono text-[10px]">{value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </PageContainer>
      </div>

      {/* Tabs */}
      <div className="sticky top-16 z-[150] bg-[#07111F]/95 backdrop-blur-md border-b border-[#20344A]">
        <PageContainer>
          <div className="overflow-x-auto">
            <div className="flex gap-0 min-w-max">
              {sectionTabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    px-4 py-3.5 text-sm font-medium transition-all duration-150 border-b-2 whitespace-nowrap
                    ${activeTab === tab.id
                      ? 'text-[#1683FF] border-[#1683FF]'
                      : 'text-[#64748B] border-transparent hover:text-[#94A3B8]'
                    }
                  `}
                  role="tab"
                  aria-selected={activeTab === tab.id}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </PageContainer>
      </div>

      {/* Content */}
      <div className="py-8">
        <PageContainer>
          {/* OVERVIEW TAB */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-fade-in">
              {/* Character */}
              <div className="bg-[#101F31] border border-[#20344A] rounded-xl p-6">
                <h2 className="text-[#F4F7FB] font-semibold text-lg mb-4">Sector Character</h2>
                <div className="flex flex-wrap gap-2 mb-6">
                  {sector.character.map(c => (
                    <div
                      key={c}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg border"
                      style={{
                        backgroundColor: `${primaryHex}10`,
                        borderColor: `${primaryHex}30`,
                      }}
                    >
                      <span className="text-[#F4F7FB] text-sm font-medium">{c}</span>
                    </div>
                  ))}
                </div>
                <p className="text-[#64748B] text-sm leading-relaxed">{sector.description}</p>
              </div>

              {/* Personality */}
              <div className="bg-[#101F31] border border-[#20344A] rounded-xl p-6">
                <h2 className="text-[#F4F7FB] font-semibold text-lg mb-4">Personality Profile</h2>
                <PersonalityMeter personality={sector.personality} />
              </div>

              {/* Quick color preview */}
              <div className="bg-[#101F31] border border-[#20344A] rounded-xl p-6">
                <h2 className="text-[#F4F7FB] font-semibold text-lg mb-4">Quick Preview</h2>
                <div
                  className="rounded-xl p-4 border"
                  style={{ backgroundColor: colors.background, borderColor: `${primaryHex}20` }}
                >
                  <div
                    className="h-8 rounded-lg mb-3 flex items-center justify-between px-3"
                    style={{ backgroundColor: colors.primary }}
                  >
                    <span className="text-white text-xs font-bold">{sector.name}</span>
                    <span className="text-white text-xs opacity-70">Header</span>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mb-2">
                    {[1, 2, 3].map(i => (
                      <div
                        key={i}
                        className="h-12 rounded-lg"
                        style={{ backgroundColor: colors.surface, border: `1px solid ${colors.primary}20` }}
                      />
                    ))}
                  </div>
                  <div
                    className="h-6 rounded px-2 flex items-center justify-center text-xs font-semibold w-fit"
                    style={{ backgroundColor: colors.primary, color: '#fff' }}
                  >
                    Primary Button
                  </div>
                </div>
              </div>

              {/* Imagery */}
              <div className="bg-[#101F31] border border-[#20344A] rounded-xl p-6">
                <h2 className="text-[#F4F7FB] font-semibold text-lg mb-4 flex items-center gap-2">
                  <Image size={18} className="text-[#64748B]" />
                  Imagery Guidelines
                </h2>
                <div className="space-y-3">
                  <div>
                    <p className="text-[#10B981] text-xs font-semibold mb-2 uppercase tracking-wider">✓ Recommended</p>
                    <ul className="space-y-1">
                      {sector.imagery.recommended.map(r => (
                        <li key={r} className="text-[#94A3B8] text-sm flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981] shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="text-[#EF4444] text-xs font-semibold mb-2 uppercase tracking-wider">✗ Avoid</p>
                    <ul className="space-y-1">
                      {sector.imagery.avoid.map(r => (
                        <li key={r} className="text-[#94A3B8] text-sm flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#EF4444] shrink-0" />
                          {r}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* COLORS TAB */}
          {activeTab === 'colors' && (
            <div className="animate-fade-in">
              <SectorPalette colors={sector.colors} sectorName={sector.name} />
            </div>
          )}

          {/* LAYOUT TAB */}
          {activeTab === 'layout' && (
            <div className="animate-fade-in grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(sector.layout).map(([key, value]) => {
                if (!value || key === 'notes') return null;
                const labels: Record<string, string> = {
                  style: 'Layout Style', density: 'Density', grid: 'Grid System',
                  gutter: 'Gutter', container: 'Container Width', sectionSpacing: 'Section Spacing',
                  cardSpacing: 'Card Spacing',
                };
                return (
                  <div key={key} className="bg-[#101F31] border border-[#20344A] rounded-xl p-5">
                    <p className="text-[#64748B] text-xs font-medium uppercase tracking-wider mb-2">{labels[key] || key}</p>
                    <p className="text-[#F4F7FB] text-lg font-semibold">{String(value)}</p>
                  </div>
                );
              })}
              {sector.layout.notes && (
                <div className="md:col-span-2 bg-[rgba(22,131,255,0.05)] border border-[rgba(22,131,255,0.2)] rounded-xl p-5">
                  <p className="text-[#94A3B8] text-sm">{sector.layout.notes}</p>
                </div>
              )}
            </div>
          )}

          {/* TYPOGRAPHY TAB */}
          {activeTab === 'typography' && (
            <div className="animate-fade-in space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { label: 'Heading Font', value: sector.typography.heading },
                  { label: 'Body Font', value: sector.typography.body },
                  { label: 'Weights', value: sector.typography.weights?.join(', ') || 'Regular, Medium, SemiBold, Bold' },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-[#101F31] border border-[#20344A] rounded-xl p-5">
                    <p className="text-[#64748B] text-xs font-medium uppercase tracking-wider mb-2">{label}</p>
                    <p className="text-[#F4F7FB] font-semibold text-base">{value}</p>
                  </div>
                ))}
              </div>
              {/* Type scale preview */}
              <div className="bg-[#101F31] border border-[#20344A] rounded-xl p-6">
                <h3 className="text-[#64748B] text-xs font-semibold uppercase tracking-wider mb-4">Typography Scale Preview</h3>
                <div className="space-y-3 border-l-2 border-[#20344A] pl-4">
                  {[
                    { label: 'Display', size: '48px', weight: 800 },
                    { label: 'H1', size: '36px', weight: 700 },
                    { label: 'H2', size: '28px', weight: 700 },
                    { label: 'H3', size: '22px', weight: 600 },
                    { label: 'Body', size: '16px', weight: 400 },
                    { label: 'Caption', size: '12px', weight: 400 },
                  ].map(({ label, size, weight }) => (
                    <div key={label} className="flex items-baseline gap-4">
                      <span className="text-[#64748B] text-xs w-16 shrink-0">{label}</span>
                      <span
                        className="text-[#F4F7FB] leading-none"
                        style={{ fontSize: size, fontWeight: weight, fontFamily: sector.typography.heading }}
                      >
                        {sector.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              {sector.typography.notes && (
                <div className="bg-[rgba(22,131,255,0.05)] border border-[rgba(22,131,255,0.2)] rounded-xl p-4">
                  <p className="text-[#94A3B8] text-sm">{sector.typography.notes}</p>
                </div>
              )}
            </div>
          )}

          {/* SHAPES TAB */}
          {activeTab === 'shapes' && (
            <div className="animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {[
                  { label: 'Card Radius', value: sector.shapes.cardRadius, demo: 'card' },
                  { label: 'Button Radius', value: sector.shapes.buttonRadius, demo: 'button' },
                  { label: 'Input Radius', value: sector.shapes.inputRadius, demo: 'input' },
                  { label: 'Modal Radius', value: sector.shapes.modalRadius || 'N/A', demo: 'modal' },
                  { label: 'Border Style', value: sector.shapes.borderStyle, demo: 'border' },
                  { label: 'Shadow Style', value: sector.shapes.shadowStyle, demo: 'shadow' },
                ].map(({ label, value, demo }) => (
                  <div key={label} className="bg-[#101F31] border border-[#20344A] rounded-xl p-5">
                    <p className="text-[#64748B] text-xs font-medium uppercase tracking-wider mb-3">{label}</p>
                    {/* Visual demo */}
                    <div className="flex items-center justify-center h-14 mb-3">
                      {demo === 'card' && (
                        <div
                          className="w-24 h-12 border border-[#2D4A68] bg-[#13253A]"
                          style={{ borderRadius: value }}
                        />
                      )}
                      {demo === 'button' && (
                        <div
                          className="px-4 py-2 bg-[#1683FF] text-white text-xs font-medium"
                          style={{ borderRadius: value }}
                        >
                          Button
                        </div>
                      )}
                      {demo === 'input' && (
                        <div
                          className="w-24 h-8 border border-[#2D4A68] bg-[#0B1626]"
                          style={{ borderRadius: value }}
                        />
                      )}
                      {(demo === 'modal' || demo === 'border' || demo === 'shadow') && null}
                    </div>
                    <p className="text-[#94A3B8] text-sm font-mono">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* COMPONENTS TAB */}
          {activeTab === 'components' && (
            <div className="animate-fade-in grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {sector.components.map((comp, i) => (
                <div key={i} className="bg-[#101F31] border border-[#20344A] rounded-xl p-5">
                  <h3 className="text-[#F4F7FB] font-semibold text-sm mb-2">{comp.name}</h3>
                  <p className="text-[#64748B] text-sm leading-relaxed">{comp.notes}</p>
                </div>
              ))}
            </div>
          )}

          {/* SAMPLE UI TAB */}
          {activeTab === 'sample-ui' && (
            <div className="animate-fade-in">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-[#F4F7FB] font-bold text-xl">Sample UI Designs</h2>
                  <p className="text-[#64748B] text-sm mt-1">Real-world examples using the {sector.name.toLowerCase()} color palette</p>
                </div>

                {/* Device picker */}
                <div className="flex bg-[#0B1626] border border-[#20344A] rounded-xl p-1 gap-1">
                  {([
                    { id: 'desktop', icon: <Monitor size={14} /> },
                    { id: 'tablet', icon: <Tablet size={14} /> },
                    { id: 'mobile', icon: <Smartphone size={14} /> },
                  ] as const).map(({ id, icon }) => (
                    <button
                      key={id}
                      onClick={() => setPreviewDevice(id)}
                      className={`
                        p-2 rounded-lg transition-all duration-150
                        ${previewDevice === id ? 'bg-[#13253A] text-[#F4F7FB]' : 'text-[#64748B] hover:text-[#94A3B8]'}
                      `}
                      aria-label={`${id} preview`}
                      aria-pressed={previewDevice === id}
                    >
                      {icon}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sample UI display */}
              <div className="space-y-8">
                {sector.sampleUI.map((ui, i) => (
                  <div key={ui.id} className="bg-[#101F31] border border-[#20344A] rounded-2xl overflow-hidden">
                    {/* Sample UI header */}
                    <div className="flex items-center justify-between px-5 py-3 border-b border-[#20344A]">
                      <div>
                        <span className="text-[#F4F7FB] font-semibold text-sm">{String(i + 1).padStart(2, '0')}</span>
                        <span className="text-[#64748B] text-sm ml-2">{ui.title}</span>
                      </div>
                      <div className="flex gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
                        <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
                      </div>
                    </div>

                    {/* Preview frame */}
                    <div
                      className="overflow-x-auto"
                      style={{
                        maxWidth: previewDevice === 'mobile' ? '390px' : previewDevice === 'tablet' ? '768px' : '100%',
                        margin: previewDevice !== 'desktop' ? '0 auto' : undefined,
                      }}
                    >
                      <SectorSamplePreview sector={sector} uiType={ui.type} />
                    </div>

                    {/* Info bar */}
                    <div className="px-5 py-3 border-t border-[#20344A] flex items-center justify-between">
                      <p className="text-[#64748B] text-xs">{ui.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ACCESSIBILITY TAB */}
          {activeTab === 'accessibility' && (
            <div className="animate-fade-in space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  { label: 'Minimum Contrast', value: sector.accessibility.minContrast, icon: '👁️' },
                  { label: 'Keyboard Navigation', value: sector.accessibility.keyboardNav, icon: '⌨️' },
                  { label: 'Screen Reader', value: sector.accessibility.screenReader, icon: '🔊' },
                  { label: 'Color Blindness', value: sector.accessibility.colorBlindness, icon: '🎨' },
                  { label: 'Focus State', value: sector.accessibility.focusState, icon: '🎯' },
                ].map(({ label, value, icon }) => (
                  <div key={label} className="bg-[#101F31] border border-[#20344A] rounded-xl p-5">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-lg">{icon}</span>
                      <h3 className="text-[#F4F7FB] font-semibold text-sm">{label}</h3>
                    </div>
                    <p className="text-[#94A3B8] text-sm leading-relaxed">{value}</p>
                  </div>
                ))}
              </div>
              {sector.accessibility.notes && (
                <div className="bg-[rgba(22,131,255,0.05)] border border-[rgba(22,131,255,0.2)] rounded-xl p-5">
                  <p className="text-[#94A3B8] text-sm leading-relaxed">{sector.accessibility.notes}</p>
                </div>
              )}

              {/* Do's and Don'ts */}
              <SectorDosDonts dosDonts={sector.dosDonts} />
            </div>
          )}
        </PageContainer>
      </div>
    </div>
  );
};

// Generic sample preview component
const SectorSamplePreview: React.FC<{ sector: ReturnType<typeof getSectorById> & {}; uiType: string }> = ({ sector, uiType }) => {
  if (!sector) return null;
  const colors = sector.colors;

  if (uiType === 'dashboard') {
    return (
      <div style={{ backgroundColor: colors.background, minHeight: '320px', padding: '16px', fontFamily: 'Inter, sans-serif' }}>
        <div style={{ display: 'flex', gap: '12px', height: '100%' }}>
          {/* Sidebar */}
          <div style={{ width: '140px', backgroundColor: colors.primary, borderRadius: '12px', padding: '16px', flexShrink: 0 }}>
            <div style={{ color: '#fff', fontWeight: 700, fontSize: '12px', marginBottom: '16px', borderBottom: '1px solid rgba(255,255,255,0.2)', paddingBottom: '8px' }}>
              {sector.name}
            </div>
            {['Dashboard', 'Patients', 'Reports', 'Settings'].map((item, i) => (
              <div key={item} style={{ color: i === 0 ? '#fff' : 'rgba(255,255,255,0.6)', fontSize: '11px', padding: '6px 8px', borderRadius: '6px', marginBottom: '2px', backgroundColor: i === 0 ? 'rgba(255,255,255,0.2)' : 'transparent' }}>
                {item}
              </div>
            ))}
          </div>

          {/* Main */}
          <div style={{ flex: 1 }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '12px' }}>
              {['Total', 'Active', 'Pending', 'Completed'].map((label, i) => (
                <div key={label} style={{ backgroundColor: colors.surface, borderRadius: '8px', padding: '10px', border: `1px solid ${colors.primary}15` }}>
                  <div style={{ color: colors.text, fontSize: '16px', fontWeight: 700 }}>{[1247, 83, 21, 94][i]}</div>
                  <div style={{ color: colors.text + '70', fontSize: '10px' }}>{label}</div>
                </div>
              ))}
            </div>
            <div style={{ backgroundColor: colors.surface, borderRadius: '8px', padding: '12px', border: `1px solid ${colors.primary}15`, height: '120px' }}>
              <div style={{ color: colors.text, fontSize: '11px', fontWeight: 600, marginBottom: '8px' }}>Overview Chart</div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '80px' }}>
                {[40, 65, 50, 80, 45, 70, 55, 60, 75, 85].map((h, i) => (
                  <div key={i} style={{ flex: 1, height: `${h}%`, backgroundColor: i === 7 ? colors.primary : colors.primary + '40', borderRadius: '3px 3px 0 0' }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Portal type
  return (
    <div style={{ backgroundColor: colors.background, minHeight: '320px', fontFamily: 'Inter, sans-serif' }}>
      {/* Header */}
      <div style={{ backgroundColor: colors.surface, borderBottom: `1px solid ${colors.primary}20`, padding: '12px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ color: colors.primary, fontWeight: 700, fontSize: '14px' }}>{sector.name}</div>
        <div style={{ display: 'flex', gap: '16px' }}>
          {['Home', 'Services', 'About', 'Contact'].map(item => (
            <span key={item} style={{ color: colors.text + '80', fontSize: '11px' }}>{item}</span>
          ))}
        </div>
        <div style={{ backgroundColor: colors.primary, color: '#fff', padding: '6px 14px', borderRadius: '6px', fontSize: '11px', fontWeight: 600 }}>
          Get Started
        </div>
      </div>

      {/* Hero */}
      <div style={{ padding: '40px 24px', textAlign: 'center', background: `linear-gradient(135deg, ${colors.primary}10, ${colors.secondary}08)` }}>
        <h2 style={{ color: colors.text, fontSize: '24px', fontWeight: 800, marginBottom: '8px' }}>
          {sector.name} Services
        </h2>
        <p style={{ color: colors.text + '70', fontSize: '12px', marginBottom: '16px' }}>
          Professional {sector.name.toLowerCase()} solutions for everyone
        </p>
        <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
          <div style={{ backgroundColor: colors.primary, color: '#fff', padding: '8px 20px', borderRadius: '8px', fontSize: '12px', fontWeight: 600 }}>
            Explore Services
          </div>
          <div style={{ backgroundColor: 'transparent', color: colors.primary, border: `1.5px solid ${colors.primary}`, padding: '8px 20px', borderRadius: '8px', fontSize: '12px', fontWeight: 600 }}>
            Learn More
          </div>
        </div>
      </div>

      {/* Service cards */}
      <div style={{ padding: '0 24px 24px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        {sector.components.slice(0, 3).map(comp => (
          <div key={comp.name} style={{ backgroundColor: colors.surface, borderRadius: '8px', padding: '12px', border: `1px solid ${colors.primary}15` }}>
            <div style={{ width: '28px', height: '28px', backgroundColor: colors.primary + '20', borderRadius: '8px', marginBottom: '8px' }} />
            <div style={{ color: colors.text, fontSize: '11px', fontWeight: 600, marginBottom: '4px' }}>{comp.name}</div>
            <div style={{ color: colors.text + '60', fontSize: '10px' }}>{comp.notes.slice(0, 50)}...</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectorDetail;

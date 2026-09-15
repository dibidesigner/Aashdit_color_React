import React, { useState } from 'react';
import {
  Monitor, Tablet, Smartphone, RefreshCw, Sun, Moon,
  LayoutDashboard, Globe, Search, Bell, User, ArrowUpRight,
  TrendingUp, Users, CheckCircle
} from 'lucide-react';
import type { Sector } from '../../types/sector';
import type { GeneratedPalette } from '../../types/color';
import { Button } from '../common/Button';

interface BrandSampleUIProps {
  logoUrl: string | null;
  brandName?: string;
  sector?: Sector | null;
  palette: GeneratedPalette;
  onRegenerate: () => void;
}

export const BrandSampleUI: React.FC<BrandSampleUIProps> = ({
  logoUrl,
  brandName = 'BrandSpace',
  palette,
  onRegenerate,
}) => {
  const [viewType, setViewType] = useState<'dashboard' | 'portal'>('dashboard');
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [sampleTheme, setSampleTheme] = useState<'dark' | 'light'>('light');

  // Strict Brand Color Tokens derived directly from uploaded logo & palette
  const primaryColor = palette.primary[600] || palette.baseColors.primary;
  const secondaryColor = palette.secondary[500] || palette.baseColors.secondary;

  // Header & Sidebar background derived from uploaded image primary color
  const headerBg = sampleTheme === 'dark'
    ? (palette.primary[900] || primaryColor + '25')
    : (palette.primary[100] || primaryColor + '12');

  const sidebarBg = sampleTheme === 'dark'
    ? (palette.primary[900] || primaryColor + '20')
    : (palette.primary[100] || primaryColor + '08');

  const headerBorder = sampleTheme === 'dark'
    ? (palette.primary[700] || primaryColor + '40')
    : (palette.primary[200] || primaryColor + '25');

  // Surface & card background tokens (Pure white theme default)
  const surfaceBg = sampleTheme === 'dark' ? '#09090B' : '#FFFFFF';
  const cardBg = sampleTheme === 'dark' ? '#18181B' : '#F8FAFC';
  const textColor = sampleTheme === 'dark' ? '#FAFAFA' : '#09090B';
  const mutedText = sampleTheme === 'dark' ? '#A1A1AA' : '#64748B';
  const borderColor = sampleTheme === 'dark' ? '#27272A' : '#E2E8F0';

  const brandDisplayName = brandName || 'Brand UI';

  const kpis = [
    { label: 'Total Volume', val: '48,250', change: '+15.2%', icon: <TrendingUp size={16} /> },
    { label: 'Active Users', val: '12,840', change: '+8.4%', icon: <Users size={16} /> },
    { label: 'Completed Tasks', val: '1,420', change: '+92%', icon: <CheckCircle size={16} /> },
  ];

  // Container width based on device preview selection
  const deviceWidthClass = {
    desktop: 'w-full max-w-full',
    tablet: 'w-full max-w-[768px] mx-auto',
    mobile: 'w-full max-w-[390px] mx-auto',
  }[device];

  return (
    <div className="space-y-4">
      {/* Preview Toolbar */}
      <div className="bg-[#101F31] border border-[#20344A] rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        {/* View mode switcher */}
        <div className="flex items-center gap-2 bg-[#0B1626] p-1 rounded-xl border border-[#20344A]">
          <button
            type="button"
            onClick={() => setViewType('dashboard')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={
              viewType === 'dashboard'
                ? { backgroundColor: primaryColor, color: '#FFFFFF' }
                : { color: '#64748B' }
            }
          >
            <LayoutDashboard size={14} />
            Dashboard View
          </button>
          <button
            type="button"
            onClick={() => setViewType('portal')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
            style={
              viewType === 'portal'
                ? { backgroundColor: primaryColor, color: '#FFFFFF' }
                : { color: '#64748B' }
            }
          >
            <Globe size={14} />
            Public Portal
          </button>
        </div>

        {/* Responsive device switcher */}
        <div className="flex items-center gap-1 bg-[#0B1626] p-1 rounded-xl border border-[#20344A]">
          <button
            type="button"
            onClick={() => setDevice('desktop')}
            className="p-1.5 rounded-lg text-xs font-semibold transition-colors"
            style={
              device === 'desktop'
                ? { backgroundColor: primaryColor, color: '#FFFFFF' }
                : { color: '#64748B' }
            }
            title="Desktop view"
          >
            <Monitor size={16} />
          </button>
          <button
            type="button"
            onClick={() => setDevice('tablet')}
            className="p-1.5 rounded-lg text-xs font-semibold transition-colors"
            style={
              device === 'tablet'
                ? { backgroundColor: primaryColor, color: '#FFFFFF' }
                : { color: '#64748B' }
            }
            title="Tablet view"
          >
            <Tablet size={16} />
          </button>
          <button
            type="button"
            onClick={() => setDevice('mobile')}
            className="p-1.5 rounded-lg text-xs font-semibold transition-colors"
            style={
              device === 'mobile'
                ? { backgroundColor: primaryColor, color: '#FFFFFF' }
                : { color: '#64748B' }
            }
            title="Mobile view"
          >
            <Smartphone size={16} />
          </button>
        </div>

        {/* Theme mode toggle & Regenerate button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setSampleTheme(sampleTheme === 'dark' ? 'light' : 'dark')}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0B1626] border border-[#20344A] text-[#F4F7FB] text-xs font-medium rounded-xl hover:border-[#2D4A68] transition-colors"
          >
            {sampleTheme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            {sampleTheme === 'dark' ? 'Light Theme' : 'Dark Theme'}
          </button>

          <Button
            variant="secondary"
            size="sm"
            onClick={onRegenerate}
            leftIcon={<RefreshCw size={14} />}
          >
            Regenerate UI
          </Button>
        </div>
      </div>

      {/* Frame Container */}
      <div className="bg-[#040810] border border-[#20344A] rounded-2xl p-4 min-h-[500px] overflow-hidden transition-all duration-300">
        <div
          className={`${deviceWidthClass} rounded-xl border shadow-2xl overflow-hidden transition-all duration-300`}
          style={{ backgroundColor: surfaceBg, borderColor: borderColor, color: textColor }}
        >
          {/* BRAND HEADER WITH UPLOADED LOGO */}
          <header
            className="px-5 py-3.5 border-b flex items-center justify-between gap-4"
            style={{ borderColor: headerBorder, backgroundColor: headerBg }}
          >
            <div className="flex items-center gap-3">
              {logoUrl ? (
                <img src={logoUrl} alt="Brand Logo" className="h-9 max-w-[140px] object-contain" />
              ) : (
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-white text-base shadow-sm"
                  style={{ backgroundColor: primaryColor }}
                >
                  B
                </div>
              )}
              <span className="font-bold text-base tracking-tight" style={{ color: textColor }}>
                {brandDisplayName}
              </span>
              <span
                className="text-[10px] px-2.5 py-0.5 rounded-full font-bold uppercase tracking-wider border"
                style={{
                  backgroundColor: primaryColor + '25',
                  color: sampleTheme === 'dark' ? '#FFFFFF' : primaryColor,
                  borderColor: primaryColor + '50',
                }}
              >
                BRAND UI
              </span>
            </div>

            <div className="flex items-center gap-3">
              {device !== 'mobile' && (
                <div
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs"
                  style={{ backgroundColor: surfaceBg, borderColor: headerBorder, color: mutedText }}
                >
                  <Search size={14} />
                  <span>Search...</span>
                </div>
              )}

              <button
                type="button"
                className="w-8 h-8 rounded-lg flex items-center justify-center border"
                style={{ borderColor: headerBorder, color: mutedText }}
              >
                <Bell size={15} />
              </button>
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center text-white font-bold text-xs shadow-sm"
                style={{ backgroundColor: primaryColor }}
              >
                <User size={15} />
              </div>
            </div>
          </header>

          {/* DASHBOARD VIEW */}
          {viewType === 'dashboard' && (
            <div className="flex min-h-[460px]">
              {/* Sidebar */}
              {device !== 'mobile' && (
                <aside
                  className="w-48 p-4 border-r flex flex-col justify-between shrink-0"
                  style={{ borderColor: headerBorder, backgroundColor: sidebarBg }}
                >
                  <div className="space-y-1.5">
                    {/* Uploaded logo thumbnail inside sidebar */}
                    {logoUrl && (
                      <div className="pb-3 border-b mb-3 flex items-center justify-center" style={{ borderColor: borderColor }}>
                        <img src={logoUrl} alt="Logo" className="max-h-9 max-w-full object-contain" />
                      </div>
                    )}

                    {['Overview', 'Projects', 'Analytics', 'Records', 'Settings'].map((item, idx) => (
                      <div
                        key={item}
                        className="px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
                        style={
                          idx === 0
                            ? { backgroundColor: primaryColor, color: '#FFFFFF' }
                            : { color: mutedText }
                        }
                      >
                        {item}
                      </div>
                    ))}
                  </div>

                  <div
                    className="p-3 rounded-xl border text-xs space-y-1.5"
                    style={{ borderColor: borderColor, backgroundColor: surfaceBg }}
                  >
                    <div className="font-bold" style={{ color: textColor }}>
                      Brand Identity
                    </div>
                    <p className="text-[11px] leading-snug" style={{ color: mutedText }}>
                      Styled exclusively with logo colors &amp; typography.
                    </p>
                  </div>
                </aside>
              )}

              {/* Main Content Area */}
              <main className="flex-1 p-5 space-y-5">
                {/* Title */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <h2 className="text-xl font-bold" style={{ color: textColor }}>
                      Brand Dashboard
                    </h2>
                    <p className="text-xs mt-0.5" style={{ color: mutedText }}>
                      Tailored UI components using your uploaded brand color system.
                    </p>
                  </div>

                  <button
                    type="button"
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5 shadow-md"
                    style={{ backgroundColor: primaryColor }}
                  >
                    New Action
                    <ArrowUpRight size={14} />
                  </button>
                </div>

                {/* KPI Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {kpis.map((kpi, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border flex flex-col justify-between"
                      style={{ backgroundColor: cardBg, borderColor: borderColor }}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium" style={{ color: mutedText }}>
                          {kpi.label}
                        </span>
                        <div
                          className="w-7 h-7 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: primaryColor + '18', color: primaryColor }}
                        >
                          {kpi.icon}
                        </div>
                      </div>
                      <div>
                        <span className="text-2xl font-extrabold" style={{ color: textColor }}>
                          {kpi.val}
                        </span>
                        <span
                          className="ml-2 text-xs font-bold px-1.5 py-0.5 rounded"
                          style={{ backgroundColor: primaryColor + '20', color: primaryColor }}
                        >
                          {kpi.change}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Chart & Activity Cards */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Chart Mockup */}
                  <div
                    className="lg:col-span-2 p-4 rounded-xl border space-y-3"
                    style={{ backgroundColor: cardBg, borderColor: borderColor }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold" style={{ color: textColor }}>
                        Brand Performance Metrics
                      </span>
                      <span className="text-[10px] font-mono" style={{ color: mutedText }}>
                        Real-time
                      </span>
                    </div>

                    {/* Bar chart mockup using brand primary & secondary */}
                    <div className="h-32 flex items-end gap-3 pt-4">
                      {[45, 70, 85, 55, 95, 75, 90, 65, 92].map((h, i) => (
                        <div key={i} className="flex-1 flex flex-col items-center gap-1">
                          <div
                            className="w-full rounded-t-md transition-all duration-300"
                            style={{
                              height: `${h}%`,
                              backgroundColor: i % 2 === 0 ? primaryColor : secondaryColor,
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Brand Guidelines */}
                  <div
                    className="p-4 rounded-xl border flex flex-col justify-between"
                    style={{ backgroundColor: cardBg, borderColor: borderColor }}
                  >
                    <div>
                      <span className="text-xs font-bold" style={{ color: textColor }}>
                        Color Tokens Applied
                      </span>
                      <div className="mt-3 space-y-2">
                        {[
                          { name: 'Primary Scale', hex: primaryColor },
                          { name: 'Secondary Scale', hex: secondaryColor },
                          { name: 'Neutral Gray', hex: borderColor },
                        ].map((rule, idx) => (
                          <div
                            key={idx}
                            className="p-2 rounded-lg border text-xs flex items-center justify-between font-mono"
                            style={{ borderColor: borderColor, backgroundColor: surfaceBg }}
                          >
                            <div className="flex items-center gap-2">
                              <div className="w-3 h-3 rounded-full border border-white/20" style={{ backgroundColor: rule.hex }} />
                              <span style={{ color: textColor }}>{rule.name}</span>
                            </div>
                            <span style={{ color: mutedText }}>{rule.hex}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </main>
            </div>
          )}

          {/* PUBLIC PORTAL VIEW */}
          {viewType === 'portal' && (
            <div className="space-y-6">
              {/* Hero Banner with Uploaded Logo */}
              <section
                className="p-8 sm:p-12 text-center relative overflow-hidden"
                style={{
                  background: `linear-gradient(135deg, ${primaryColor}25 0%, ${secondaryColor}15 100%)`,
                  borderBottom: `1px solid ${borderColor}`,
                }}
              >
                <div className="max-w-xl mx-auto space-y-4">
                  {logoUrl ? (
                    <div className="p-3 bg-white/10 backdrop-blur rounded-2xl inline-block mb-2 shadow-lg">
                      <img src={logoUrl} alt="Brand Logo" className="h-14 mx-auto object-contain" />
                    </div>
                  ) : (
                    <div
                      className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center font-bold text-white text-2xl shadow-lg mb-2"
                      style={{ backgroundColor: primaryColor }}
                    >
                      B
                    </div>
                  )}

                  <h1 className="text-2xl sm:text-3xl font-extrabold" style={{ color: textColor }}>
                    {brandDisplayName} Portal
                  </h1>
                  <p className="text-xs sm:text-sm leading-relaxed" style={{ color: mutedText }}>
                    Delivering excellence with brand identity integrated seamlessly into clean, modern user experiences.
                  </p>

                  <div className="flex justify-center gap-3 pt-2">
                    <button
                      type="button"
                      className="px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-lg"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Get Started
                    </button>
                    <button
                      type="button"
                      className="px-5 py-2.5 rounded-xl text-xs font-bold border"
                      style={{ borderColor: borderColor, color: textColor, backgroundColor: cardBg }}
                    >
                      Learn More
                    </button>
                  </div>
                </div>
              </section>

              {/* Service Cards */}
              <section className="p-6 max-w-4xl mx-auto">
                <h3 className="text-center text-base font-bold mb-6" style={{ color: textColor }}>
                  Brand Solutions &amp; Offerings
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { title: 'Brand Portal', desc: 'Interactive digital portal styled with your logo palette.' },
                    { title: 'Design System', desc: 'Perceptual 100-900 OKLCH color token scales.' },
                    { title: 'Responsive UI', desc: 'Desktop, tablet, and mobile interface preview.' },
                  ].map((card, i) => (
                    <div
                      key={i}
                      className="p-5 rounded-2xl border text-center space-y-2"
                      style={{ backgroundColor: cardBg, borderColor: borderColor }}
                    >
                      <div
                        className="w-10 h-10 rounded-xl mx-auto flex items-center justify-center font-bold text-white"
                        style={{ backgroundColor: i === 0 ? primaryColor : secondaryColor }}
                      >
                        {i + 1}
                      </div>
                      <h4 className="font-bold text-sm" style={{ color: textColor }}>
                        {card.title}
                      </h4>
                      <p className="text-xs leading-relaxed" style={{ color: mutedText }}>
                        {card.desc}
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BrandSampleUI;

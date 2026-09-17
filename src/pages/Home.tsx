import React, { useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Sparkles, Layers, Palette, Layout, Type, Grid, Shield } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { SectorGrid } from '../components/sectors/SectorGrid';
import { ColorGenerator } from '../components/colors/ColorGenerator';
import { ColorScale } from '../components/colors/ColorScale';
import { GeneratedCSS } from '../components/colors/GeneratedCSS';
import { LiveUIPreview } from '../components/colors/LiveUIPreview';
import { Button } from '../components/common/Button';
import { sectors } from '../data/sectors';
import type { GeneratedPalette } from '../types/color';
import { generateColorScale, generateGrayScale } from '../utils/colorScale';

// Default palette preview
const defaultPalette: GeneratedPalette = {
  primary: generateColorScale('#1683FF'),
  secondary: generateColorScale('#12B8C4'),
  gray: generateGrayScale('#64748B'),
  baseColors: { primary: '#1683FF', secondary: '#12B8C4', gray: '#64748B' },
  generatedAt: Date.now(),
};

const popularSectors = sectors.slice(0, 10);

const designConcepts = [
  { icon: <Palette size={20} />, label: 'Color', path: '/color-theory', desc: 'Theory & Relationships' },
  { icon: <Layout size={20} />, label: 'Layout', path: '/layout', desc: 'Grid & Spacing' },
  { icon: <Type size={20} />, label: 'Typography', path: '/typography', desc: 'Fonts & Scale' },
  { icon: <Grid size={20} />, label: 'Components', path: '/components', desc: 'UI Building Blocks' },
  { icon: <Shield size={20} />, label: 'Accessibility', path: '/accessibility', desc: 'WCAG Standards' },
  { icon: <Layers size={20} />, label: 'Sectors', path: '/sectors', desc: 'Design Guides' },
];

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [generatedPalette, setGeneratedPalette] = useState<GeneratedPalette>(defaultPalette);

  const handleSearch = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  }, [searchQuery, navigate]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch(e as unknown as React.FormEvent);
  };

  return (
    <div className="min-h-screen">
      {/* ===== HERO SECTION ===== */}
      <section className="relative overflow-hidden py-8 md:py-12 lg:py-16">
        {/* Mesh gradient background */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
          style={{
            background: `
              radial-gradient(ellipse at 20% 50%, rgba(22, 131, 255, 0.08) 0%, transparent 60%),
              radial-gradient(ellipse at 80% 20%, rgba(139, 92, 246, 0.06) 0%, transparent 60%),
              radial-gradient(ellipse at 50% 80%, rgba(18, 184, 196, 0.06) 0%, transparent 60%)
            `,
          }}
        />

        <PageContainer>
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[rgba(22,131,255,0.1)] border border-[rgba(22,131,255,0.25)] rounded-full mb-4">
              <Sparkles size={12} className="text-[#1683FF]" />
              <span className="text-[#1683FF] text-xs font-medium">UI/UX Design Intelligence Platform</span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-[1.15] mb-4 tracking-tight">
              <span className="text-[#F4F7FB]">Design Better.</span>
              <br />
              <span
                style={{
                  background: 'linear-gradient(135deg, #1683FF, #12B8C4)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Design with Purpose.
              </span>
            </h1>

            <p className="text-[#94A3B8] text-base md:text-lg max-w-2xl mx-auto mb-6 leading-relaxed">
              Explore UI/UX design guidelines, color palettes, layout systems and real examples
              for every industry and sector.
            </p>

            {/* Hero search */}
            <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto mb-6">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none z-10"
                aria-hidden="true"
              />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search any sector... e.g. healthcare, education, government"
                className="w-full h-12 pl-11 pr-36 bg-[#0B1626] border border-[#20344A] rounded-xl text-[#F4F7FB] placeholder-[#64748B] text-sm focus:outline-none focus:border-[#1683FF] focus:shadow-[0_0_10px_rgba(22,131,255,0.25)] transition-all shadow-[0_4px_20px_rgba(0,0,0,0.25)]"
                aria-label="Search sectors"
                id="hero-search"
              />
              <button
                type="submit"
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#1683FF] hover:bg-[#0F6EE0] text-white text-xs font-semibold rounded-lg transition-all duration-200"
                aria-label="Search"
              >
                Search
              </button>
            </form>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button
                variant="primary"
                size="md"
                onClick={() => navigate('/sectors')}
                rightIcon={<ArrowRight size={15} />}
              >
                Explore Sectors
              </Button>
              <Button
                variant="secondary"
                size="md"
                onClick={() => navigate('/color-generator')}
                leftIcon={<Palette size={15} />}
              >
                Generate Color System
              </Button>
            </div>

            {/* Floating quote card */}
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 bg-[#101F31] border border-[#20344A] rounded-xl max-w-sm text-left">
              <span className="text-xl text-[#1683FF]">"</span>
              <p className="text-[#94A3B8] text-xs leading-relaxed">
                Good design creates clarity, trust and impact.
              </p>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ===== POPULAR SECTORS ===== */}
      <section className="py-16 border-t border-[#20344A]">
        <PageContainer>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-[#F4F7FB] text-2xl font-bold mb-1">Popular Sectors</h2>
              <p className="text-[#64748B] text-sm">Complete design guides for every industry</p>
            </div>
            <Button
              variant="ghost"
              onClick={() => navigate('/sectors')}
              rightIcon={<ArrowRight size={14} />}
            >
              View All
            </Button>
          </div>

          <SectorGrid sectors={popularSectors} columns={5} />
        </PageContainer>
      </section>

      {/* ===== CREATE YOUR DESIGN SECTION ===== */}
      <section className="py-16 border-t border-[#20344A] relative overflow-hidden bg-gradient-to-r from-[#0B1626] via-[#102136] to-[#0B1626]">
        <PageContainer>
          <div className="max-w-4xl mx-auto bg-[#101F31] border border-[#20344A] rounded-3xl p-8 md:p-12 relative overflow-hidden shadow-[0_16px_50px_rgba(0,0,0,0.4)] flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Background Glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#1683FF]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-4 max-w-xl text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[rgba(22,131,255,0.12)] border border-[rgba(22,131,255,0.25)] rounded-full">
                <Sparkles size={14} className="text-[#1683FF]" />
                <span className="text-[#1683FF] text-xs font-semibold">New Automated Brand Feature</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F4F7FB] tracking-tight">
                Create Your Design
              </h2>

              <p className="text-[#94A3B8] text-base leading-relaxed">
                Upload your logo and create a personalized UI design system based on your brand and sector.
              </p>
            </div>

            <div className="shrink-0">
              <Button
                variant="primary"
                size="lg"
                onClick={() => navigate('/create-design')}
                rightIcon={<ArrowRight size={18} />}
                className="px-8 py-4 text-base shadow-[0_0_25px_rgba(22,131,255,0.35)]"
              >
                Create My Design →
              </Button>
            </div>
          </div>
        </PageContainer>
      </section>

      {/* ===== SAMPLE UI DESIGNS ===== */}
      <section className="py-16 border-t border-[#20344A]">
        <PageContainer>
          <div className="mb-8">
            <h2 className="text-[#F4F7FB] text-2xl font-bold mb-1">Sample UI Designs</h2>
            <p className="text-[#64748B] text-sm">Real-world UI previews built with sector-specific design systems</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              {
                sector: 'government',
                title: 'Government Dashboard',
                desc: 'Official and trustworthy admin interface',
                color: '#123B63',
                accent: '#C9972B',
                icon: '🏛️',
              },
              {
                sector: 'healthcare',
                title: 'Healthcare Portal',
                desc: 'Clean patient management interface',
                color: '#1677B7',
                accent: '#159A9C',
                icon: '🏥',
              },
              {
                sector: 'education',
                title: 'Education Platform',
                desc: 'Student learning management system',
                color: '#2457A6',
                accent: '#F4B942',
                icon: '🎓',
              },
              {
                sector: 'finance',
                title: 'Banking Dashboard',
                desc: 'Secure and precise financial interface',
                color: '#0F3460',
                accent: '#16A07D',
                icon: '🏦',
              },
            ].map(item => (
              <div
                key={item.sector}
                className="group relative bg-[#101F31] border border-[#20344A] rounded-2xl overflow-hidden cursor-pointer hover:border-[#2D4A68] transition-all duration-250"
                onClick={() => navigate(`/sectors/${item.sector}`)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && navigate(`/sectors/${item.sector}`)}
                aria-label={`View ${item.title} design`}
              >
                {/* Preview area */}
                <div
                  className="h-48 p-4 relative overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, ${item.color}15 0%, ${item.color}05 100%)`,
                    borderBottom: `1px solid ${item.color}30`,
                  }}
                >
                  {/* Mini UI mockup */}
                  <div className="flex gap-2 h-full">
                    {/* Sidebar mockup */}
                    <div
                      className="w-20 rounded-lg flex flex-col p-2 gap-1"
                      style={{ backgroundColor: item.color + '20', border: `1px solid ${item.color}30` }}
                    >
                      <div className="h-5 rounded" style={{ backgroundColor: item.color + '60' }} />
                      {['', '', '', ''].map((_, i) => (
                        <div
                          key={i}
                          className="h-3 rounded"
                          style={{ backgroundColor: i === 0 ? item.color + '80' : item.color + '20', width: `${[80, 65, 75, 60][i]}%` }}
                        />
                      ))}
                    </div>
                    {/* Content mockup */}
                    <div className="flex-1 flex flex-col gap-2">
                      <div className="grid grid-cols-3 gap-1">
                        {[1, 2, 3].map(j => (
                          <div key={j} className="h-12 rounded-lg" style={{ backgroundColor: item.color + '15', border: `1px solid ${item.color}25` }}>
                            <div className="p-1.5">
                              <div className="h-1.5 rounded w-3/4 mb-1" style={{ backgroundColor: item.color + '40' }} />
                              <div className="h-3 rounded w-1/2" style={{ backgroundColor: item.color + '60' }} />
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="flex-1 rounded-lg" style={{ backgroundColor: item.color + '10', border: `1px solid ${item.color}20` }} />
                    </div>
                  </div>

                  {/* Emoji badge */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-[#0B1626]/80 flex items-center justify-center text-base">
                    {item.icon}
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-[#F4F7FB] font-semibold text-sm group-hover:text-white transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-[#64748B] text-xs mt-0.5">{item.desc}</p>
                  </div>
                  <div className="flex items-center gap-1 text-[#1683FF] text-xs font-medium">
                    View
                    <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform duration-200" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* ===== COLOR SYSTEM GENERATOR ===== */}
      <section className="py-16 border-t border-[#20344A]">
        <PageContainer>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[rgba(18,184,196,0.1)] border border-[rgba(18,184,196,0.25)] rounded-full mb-4">
              <Palette size={12} className="text-[#12B8C4]" />
              <span className="text-[#12B8C4] text-xs font-medium">OKLCH-powered color generation</span>
            </div>
            <h2 className="text-[#F4F7FB] text-3xl font-bold mb-3">Generate Your Color System</h2>
            <p className="text-[#94A3B8] text-base max-w-xl mx-auto">
              Choose your primary, secondary and gray colors to generate a complete 100–900 design token scale.
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <ColorGenerator
              onGenerate={setGeneratedPalette}
              initialPrimary={defaultPalette.baseColors.primary}
              initialSecondary={defaultPalette.baseColors.secondary}
              initialGray={defaultPalette.baseColors.gray}
            />
          </div>

          {/* Generated scales */}
          <div className="mt-10 space-y-8">
            <ColorScale name="Primary" scale={generatedPalette.primary} />
            <ColorScale name="Secondary" scale={generatedPalette.secondary} />
            <ColorScale name="Gray" scale={generatedPalette.gray} />
          </div>

          {/* Live preview */}
          <div className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[#F4F7FB] font-semibold text-lg">Live UI Preview</h3>
              <Button variant="ghost" size="sm" onClick={() => navigate('/color-generator')}>
                Full Generator →
              </Button>
            </div>
            <LiveUIPreview palette={generatedPalette} />
          </div>

          {/* CSS export */}
          <div className="mt-8">
            <GeneratedCSS palette={generatedPalette} />
          </div>
        </PageContainer>
      </section>

      {/* ===== DESIGN CONCEPTS ===== */}
      <section className="py-16 border-t border-[#20344A]">
        <PageContainer>
          <div className="text-center mb-8">
            <h2 className="text-[#F4F7FB] text-2xl font-bold mb-2">Design Concepts</h2>
            <p className="text-[#64748B] text-sm">Master every aspect of UI/UX design</p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {designConcepts.map((concept, i) => (
              <div
                key={concept.label}
                className="group flex flex-col items-center text-center p-5 bg-[#101F31] border border-[#20344A] rounded-xl hover:border-[#2D4A68] hover:bg-[#13253A] cursor-pointer transition-all duration-200"
                onClick={() => navigate(concept.path)}
                role="button"
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && navigate(concept.path)}
                style={{ animationDelay: `${i * 50}ms` }}
                aria-label={`Go to ${concept.label}`}
              >
                <div className="w-10 h-10 rounded-xl bg-[rgba(22,131,255,0.1)] border border-[rgba(22,131,255,0.2)] flex items-center justify-center text-[#1683FF] mb-3 group-hover:scale-110 transition-transform duration-200">
                  {concept.icon}
                </div>
                <span className="text-[#F4F7FB] text-sm font-semibold">{concept.label}</span>
                <span className="text-[#64748B] text-xs mt-0.5">{concept.desc}</span>
              </div>
            ))}
          </div>
        </PageContainer>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-5 border-t border-[#20344A]">
        <PageContainer>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <p className="text-[#64748B] text-xs">UI/UX Design Reference Platform</p>
            </div>
            <p className="text-[#64748B] text-xs text-center">
              Better Interfaces · Brighter Societies · v1.0.0
            </p>
            <Link to="https://aashdit.com" target="_blank" className="text-[#64748B] text-xs text-center">
              © 2026 Aashdit Technologies LLP
            </Link>
          </div>
        </PageContainer>
      </footer>
    </div>
  );
};

export default Home;

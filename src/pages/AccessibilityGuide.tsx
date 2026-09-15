import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { ContrastChecker } from '../components/colors/ContrastChecker';
import { Shield, Keyboard, Eye, Speaker, Monitor } from 'lucide-react';

const principles = [
  {
    icon: <Eye size={20} />,
    title: 'Color Contrast',
    desc: 'WCAG AA requires 4.5:1 for normal text, 3:1 for large text. AAA requires 7:1 and 4.5:1.',
    items: ['Use the contrast checker below', 'Prefer AAA for body text', 'Never rely on color alone'],
  },
  {
    icon: <Keyboard size={20} />,
    title: 'Keyboard Navigation',
    desc: 'Every interactive element must be reachable and operable via keyboard.',
    items: ['Tab through all links and buttons', 'Enter/Space for activation', 'Escape to close modals', 'Arrow keys for menus and lists'],
  },
  {
    icon: <Speaker size={20} />,
    title: 'Screen Readers',
    desc: 'Screen readers need proper semantic HTML and ARIA to describe the interface.',
    items: ['Use semantic HTML5 elements', 'Provide alt text for all images', 'Use aria-label for icon-only buttons', 'Implement aria-live for dynamic content'],
  },
  {
    icon: <Monitor size={20} />,
    title: 'Focus States',
    desc: 'Visible focus indicators are essential for keyboard and assistive technology users.',
    items: ['Never remove :focus-visible outlines', 'High contrast focus rings', 'Focus order must match visual order', 'Skip to main content link'],
  },
];

const wcagLevels = [
  { level: 'A', color: '#EF4444', desc: 'Minimum — basic accessibility for most users' },
  { level: 'AA', color: '#F59E0B', desc: 'Standard — required by most accessibility laws' },
  { level: 'AAA', color: '#10B981', desc: 'Enhanced — highest accessibility standard' },
];

export const AccessibilityGuide: React.FC = () => {
  return (
    <div className="min-h-screen py-8">
      <PageContainer>
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-xl bg-[rgba(16,185,129,0.1)] border border-[rgba(16,185,129,0.2)] flex items-center justify-center">
              <Shield size={18} className="text-[#10B981]" />
            </div>
            <div>
              <h1 className="text-[#F4F7FB] text-2xl font-bold">Accessibility Guide</h1>
              <p className="text-[#64748B] text-sm">WCAG 2.1 standards and accessibility best practices</p>
            </div>
          </div>
        </div>

        {/* WCAG Levels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {wcagLevels.map(({ level, color, desc }) => (
            <div key={level} className="bg-[#101F31] border border-[#20344A] rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: color }}
                >
                  {level}
                </div>
                <span className="text-[#F4F7FB] font-semibold">WCAG {level}</span>
              </div>
              <p className="text-[#94A3B8] text-sm">{desc}</p>
            </div>
          ))}
        </div>

        {/* Principles */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          {principles.map(({ icon, title, desc, items }) => (
            <div key={title} className="bg-[#101F31] border border-[#20344A] rounded-xl p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-9 h-9 rounded-lg bg-[rgba(22,131,255,0.1)] border border-[rgba(22,131,255,0.2)] flex items-center justify-center text-[#1683FF]">
                  {icon}
                </div>
                <h2 className="text-[#F4F7FB] font-semibold">{title}</h2>
              </div>
              <p className="text-[#94A3B8] text-sm mb-4 leading-relaxed">{desc}</p>
              <ul className="space-y-1.5">
                {items.map(item => (
                  <li key={item} className="flex items-center gap-2 text-[#94A3B8] text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1683FF] shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contrast Checker */}
        <div className="mb-10">
          <h2 className="text-[#F4F7FB] font-bold text-xl mb-4">Contrast Checker</h2>
          <div className="w-full">
            <ContrastChecker />
          </div>
        </div>

        {/* Additional guidelines */}
        <div className="mt-10">
          <h2 className="text-[#F4F7FB] font-bold text-xl mb-4">Additional Guidelines</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'Text Size', desc: 'Minimum 16px for body text. Allow browser zoom to 200% without breaking layout.' },
              { label: 'Color Blindness', desc: 'Test with Deuteranopia, Protanopia, and Tritanopia simulators. Never rely only on color.' },
              { label: 'Semantic HTML', desc: 'Use <nav>, <main>, <article>, <button> etc. Screen readers use these for context.' },
              { label: 'Error Messages', desc: 'Error messages must be descriptive, not just "Invalid input". State what is wrong and how to fix it.' },
              { label: 'Animation', desc: 'Respect prefers-reduced-motion. Provide alternatives for users who experience motion sickness.' },
              { label: 'Touch Targets', desc: 'Minimum 44×44px touch targets for mobile. Space between clickable elements.' },
            ].map(({ label, desc }) => (
              <div key={label} className="bg-[#101F31] border border-[#20344A] rounded-xl p-4">
                <h3 className="text-[#F4F7FB] font-semibold text-sm mb-2">{label}</h3>
                <p className="text-[#94A3B8] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default AccessibilityGuide;

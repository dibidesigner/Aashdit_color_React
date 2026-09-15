import React from 'react';
import type { GeneratedPalette } from '../../types/color';

interface LiveUIPreviewProps {
  palette: GeneratedPalette;
}

export const LiveUIPreview: React.FC<LiveUIPreviewProps> = ({ palette }) => {
  const p = palette.primary;
  const s = palette.secondary;
  const g = palette.gray;

  const colors = {
    bg: g[100],
    surface: '#ffffff',
    sidebar: g[900],
    sidebarText: g[200],
    sidebarActive: p[600],
    primary: p[600],
    primaryHover: p[700],
    secondary: s[600],
    text: g[900],
    textMuted: g[600],
    border: g[200],
    cardBg: '#ffffff',
  };

  const kpiCards = [
    { label: 'Total Users', value: '12,847', change: '+12%', positive: true },
    { label: 'Revenue', value: '$48,293', change: '+8.5%', positive: true },
    { label: 'Active Projects', value: '234', change: '-3%', positive: false },
    { label: 'Completion Rate', value: '87%', change: '+5.2%', positive: true },
  ];

  return (
    <div className="border border-[#20344A] rounded-2xl overflow-hidden" aria-label="Live UI preview">
      <div className="px-5 py-3 bg-[#0B1626] border-b border-[#20344A] flex items-center gap-2">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#EF4444]" />
          <span className="w-3 h-3 rounded-full bg-[#F59E0B]" />
          <span className="w-3 h-3 rounded-full bg-[#10B981]" />
        </div>
        <span className="text-[#64748B] text-xs ml-2">Design System Preview</span>
        <span className="text-[#64748B] text-xs ml-auto">This is how your colors look in UI components.</span>
      </div>

      <div className="flex" style={{ backgroundColor: colors.bg, minHeight: '380px' }}>
        {/* Sidebar */}
        <div
          className="w-40 flex-shrink-0 flex flex-col"
          style={{ backgroundColor: colors.sidebar, padding: '16px 0' }}
        >
          {/* Logo */}
          <div style={{ padding: '0 12px 16px', borderBottom: `1px solid rgba(255,255,255,0.1)` }}>
            <div style={{ fontWeight: 700, color: '#fff', fontSize: '13px' }}>Dashboard</div>
          </div>

          {/* Nav */}
          <nav style={{ padding: '12px 8px', flex: 1 }}>
            {['Dashboard', 'Projects', 'Analytics', 'Reports', 'Settings'].map((item, i) => (
              <div
                key={item}
                style={{
                  padding: '8px 12px',
                  borderRadius: '6px',
                  marginBottom: '2px',
                  fontSize: '12px',
                  fontWeight: i === 0 ? 600 : 400,
                  backgroundColor: i === 0 ? colors.sidebarActive : 'transparent',
                  color: i === 0 ? '#fff' : colors.sidebarText,
                  cursor: 'pointer',
                }}
              >
                {item}
              </div>
            ))}
          </nav>
        </div>

        {/* Main */}
        <div className="flex-1 overflow-hidden" style={{ padding: '20px' }}>
          {/* Header bar */}
          <div className="flex items-center justify-between mb-5">
            <div>
              <h2 style={{ color: colors.text, fontSize: '16px', fontWeight: 700, margin: 0 }}>Overview</h2>
              <p style={{ color: colors.textMuted, fontSize: '12px', margin: '2px 0 0' }}>Welcome back!</p>
            </div>
            <div className="flex gap-2">
              <button
                style={{
                  padding: '6px 14px',
                  background: colors.primary,
                  color: '#fff',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Primary Button
              </button>
              <button
                style={{
                  padding: '6px 14px',
                  background: 'transparent',
                  color: colors.secondary,
                  border: `1.5px solid ${colors.secondary}`,
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Secondary
              </button>
            </div>
          </div>

          {/* KPI Cards */}
          <div className="grid grid-cols-4 gap-3 mb-4">
            {kpiCards.map(card => (
              <div
                key={card.label}
                style={{
                  backgroundColor: colors.cardBg,
                  border: `1px solid ${colors.border}`,
                  borderRadius: '8px',
                  padding: '12px',
                }}
              >
                <p style={{ color: colors.textMuted, fontSize: '10px', margin: '0 0 4px' }}>{card.label}</p>
                <p style={{ color: colors.text, fontSize: '18px', fontWeight: 700, margin: '0 0 2px' }}>{card.value}</p>
                <p style={{ color: card.positive ? '#16a34a' : '#dc2626', fontSize: '10px', margin: 0, fontWeight: 600 }}>
                  {card.change}
                </p>
              </div>
            ))}
          </div>

          {/* Bottom row: Chart + Table */}
          <div className="grid grid-cols-5 gap-3">
            {/* Chart */}
            <div
              style={{
                gridColumn: 'span 3',
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                padding: '12px',
              }}
            >
              <p style={{ color: colors.text, fontSize: '11px', fontWeight: 600, marginBottom: '8px' }}>Patient Overview</p>
              {/* Simple bar chart */}
              <div className="flex items-end gap-1.5" style={{ height: '60px' }}>
                {[40, 65, 50, 80, 45, 70, 55].map((h, i) => (
                  <div key={i} className="flex-1 rounded-sm" style={{
                    height: `${h}%`,
                    backgroundColor: i === 3 ? colors.primary : `${colors.primary}4D`,
                  }} />
                ))}
              </div>
              <div className="flex justify-between mt-1">
                {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => (
                  <span key={d} style={{ fontSize: '9px', color: colors.textMuted }}>{d}</span>
                ))}
              </div>
            </div>

            {/* Mini table */}
            <div
              style={{
                gridColumn: 'span 2',
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.border}`,
                borderRadius: '8px',
                padding: '12px',
                overflow: 'hidden',
              }}
            >
              <p style={{ color: colors.text, fontSize: '11px', fontWeight: 600, marginBottom: '8px' }}>Recent Items</p>
              {['Sarah Johnson', 'Mike Peters', 'Priya Kumar'].map((name, i) => (
                <div key={name} className="flex items-center justify-between" style={{ marginBottom: '8px' }}>
                  <div className="flex items-center gap-2">
                    <div style={{ width: 20, height: 20, borderRadius: '50%', backgroundColor: colors.primary, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ color: '#fff', fontSize: '8px', fontWeight: 700 }}>{name[0]}</span>
                    </div>
                    <span style={{ fontSize: '10px', color: colors.text }}>{name}</span>
                  </div>
                  <span style={{
                    fontSize: '9px',
                    color: ['#16a34a', colors.primary, '#f59e0b'][i],
                    fontWeight: 600,
                    padding: '1px 6px',
                    borderRadius: '4px',
                    backgroundColor: `${['#16a34a', colors.primary, '#f59e0b'][i]}20`,
                  }}>
                    {['Active', 'Review', 'Pending'][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveUIPreview;

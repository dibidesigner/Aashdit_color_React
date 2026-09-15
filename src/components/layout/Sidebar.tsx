import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Home, Layers, Palette, Layout, Type, Grid, Shield,
  ChevronLeft, ChevronRight, Boxes, Eye
} from 'lucide-react';
import { Tooltip } from '../common/Tooltip';

interface NavItem {
  id: string;
  label: string;
  path: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: 'home', label: 'Home', path: '/', icon: <Home size={18} /> },
  { id: 'sectors', label: 'Sectors', path: '/sectors', icon: <Layers size={18} /> },
  // { id: 'create-design', label: 'Create My Design', path: '/create-design', icon: <Wand2 size={18} /> },
  { id: 'color-generator', label: 'Color Generator', path: '/color-generator', icon: <Palette size={18} /> },
  { id: 'contrast-checker', label: 'Contrast Checker', path: '/contrast-checker', icon: <Eye size={18} /> },
  { id: 'color-theory', label: 'Color Theory', path: '/color-theory', icon: <Grid size={18} /> },
  { id: 'components', label: 'Components', path: '/components', icon: <Boxes size={18} /> },
  { id: 'typography', label: 'Typography', path: '/typography', icon: <Type size={18} /> },
  { id: 'layout', label: 'Layout Guide', path: '/layout', icon: <Layout size={18} /> },
  { id: 'accessibility', label: 'Accessibility', path: '/accessibility', icon: <Shield size={18} /> },
];

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen: boolean;
  onMobileClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggleCollapse,
  mobileOpen,
  onMobileClose,
}) => {
  const location = useLocation();


  return (
    <aside
      className={`
        fixed top-0 left-0 h-full z-[100] flex flex-col
        bg-[#0B1626] border-r border-[#20344A]
        transition-all duration-300 ease-in-out
        ${collapsed ? 'w-[72px]' : 'w-[240px]'}
        ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}
      aria-label="Main navigation"
    >
      {/* Logo */}
      <div className={`flex items-center h-16 px-4 border-b border-[#20344A] shrink-0 ${collapsed ? 'justify-center' : 'gap-3'}`}>
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#1683FF] to-[#12B8C4] flex items-center justify-center shrink-0">
          <span className="text-white font-bold text-sm">D</span>
        </div>
        {!collapsed && (
          <div>
            <span className="text-[#F4F7FB] font-bold text-base tracking-tight">Aashdit Colors</span>
            <div className="text-[#64748B] text-[10px] font-medium tracking-tight">v1.0.0</div>
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 overflow-y-auto overflow-x-hidden" role="navigation">
        <div className="space-y-0.5">
          {navItems.map(item => {
            const isActive = item.path === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(item.path);

            const linkContent = (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={onMobileClose}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg
                  transition-all duration-200 relative group
                  ${collapsed ? 'justify-center' : ''}
                  ${isActive
                    ? 'bg-[#1683FF]/15 text-[#38BDF8] font-semibold'
                    : 'text-[#94A3B8] hover:text-[#F4F7FB] hover:bg-[#101F31]'
                  }
                `}
                aria-current={isActive ? 'page' : undefined}
              >
                {/* Active indicator */}
                {isActive && (
                  <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-[#1683FF] rounded-r-full" aria-hidden="true" />
                )}
                <span className="shrink-0">{item.icon}</span>
                {!collapsed && (
                  <span className="text-sm font-medium truncate">{item.label}</span>
                )}
              </NavLink>
            );

            return collapsed ? (
              <Tooltip key={item.id} content={item.label} position="right">
                {linkContent}
              </Tooltip>
            ) : linkContent;
          })}
        </div>
      </nav>

      {/* Bottom section */}
      <div className="border-t border-[#20344A] p-2 shrink-0">
        {/* Collapse toggle - desktop only */}
        <Tooltip content={collapsed ? 'Expand sidebar' : 'Collapse sidebar'} position={collapsed ? 'right' : 'top'}>
          <button
            onClick={onToggleCollapse}
            className={`
              hidden lg:flex w-full items-center gap-3 px-3 py-2.5 rounded-lg
              text-[#94A3B8] hover:text-[#F4F7FB] hover:bg-[#101F31]
              transition-all duration-200
              ${collapsed ? 'justify-center' : ''}
            `}
            aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {collapsed ? <ChevronRight size={16} /> : (
              <>
                <ChevronLeft size={16} />
                <span className="text-sm font-medium">Collapse</span>
              </>
            )}
          </button>
        </Tooltip>

        {/* Version / credit */}
        {!collapsed && (
          <div className="px-3 py-2 mt-1">
            <p className="text-[#94A3B8] text-xs">Better Interfaces</p>
            <p className="text-[#64748B] text-xs">Brighter Societies</p>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;

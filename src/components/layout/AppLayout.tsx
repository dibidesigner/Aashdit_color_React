import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { Outlet } from 'react-router-dom';




export const AppLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#07111F] flex">
      {/* Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(v => !v)}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
      />

      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-[#07111F]/70 backdrop-blur-sm z-[90] lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main content - uses CSS margin via Tailwind classes  */}
      <div
        className={`
          flex flex-col flex-1 min-w-0
          transition-[margin-left] duration-300
          lg:ml-[240px]
          ${sidebarCollapsed ? 'lg:!ml-[72px]' : ''}
        `}
      >
        <Header
          onMenuClick={() => setMobileMenuOpen(v => !v)}
          sidebarCollapsed={sidebarCollapsed}
        />

        <main className="flex-1 overflow-x-hidden">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AppLayout;

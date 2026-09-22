import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import AdminHeader from './Header';
import AdminSidebar from './Sidebar';

interface AdminLayoutProps {
  children?: React.ReactNode;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');

  return (
    <div className="min-h-screen bg-[#07111F] text-[#F4F7FB] flex flex-col font-sans selection:bg-[#1683FF] selection:text-white">

      <AdminHeader
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />
      <div className="flex flex-1 relative">

        <AdminSidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
        />

        <main className="flex-1 p-4 md:p-6 lg:p-8 w-full overflow-hidden">
          {children || <Outlet context={{ activeSection, setActiveSection }} />}
        </main>
      </div>

    </div>
  );
};

export default AdminLayout;

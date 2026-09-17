import React from 'react';
import {
    LayoutDashboard,
    Users,
    Layers,
    BarChart3,
    Settings,
    LogOut,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AdminSidebarProps {
    isOpen?: boolean;
    onClose?: () => void;
    activeSection?: string;
    setActiveSection?: (section: string) => void;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
    isOpen = true,
    onClose,
    activeSection = 'dashboard',
    setActiveSection
}) => {
    const navigate = useNavigate();

    const navItems = [
        {
            id: 'dashboard',
            label: 'Dashboard',
            icon: LayoutDashboard,
            badge: 'Main',
            badgeColor: 'bg-[#1683FF]/20 text-[#38BDF8]'
        },
        {
            id: 'users',
            label: 'User Mgt.',
            icon: Users,
            badge: 'CRUD',
            badgeColor: 'bg-[#10B981]/20 text-[#10B981]'
        },
        {
            id: 'sectors',
            label: 'Sectors',
            icon: Layers,
            badge: 'Guide',
            badgeColor: 'bg-[#8B5CF6]/20 text-[#C084FC]'
        },
        {
            id: 'analytics',
            label: 'Analytics & Logs',
            icon: BarChart3,
            badge: 'Live',
            badgeColor: 'bg-[#F59E0B]/20 text-[#FBBF24]'
        },
        {
            id: 'settings',
            label: 'System Settings',
            icon: Settings,
        }
    ];

    const handleNavClick = (id: string) => {
        if (id === 'add-sector') {
            navigate('/admin/add-sector');
            if (window.innerWidth < 1024 && onClose) {
                onClose();
            }
            return;
        }

        if (window.location.pathname !== '/admin') {
            navigate('/admin');
            setTimeout(() => {
                const element = document.getElementById(`${id}-section`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth' });
                }
            }, 100);
        } else {
            const element = document.getElementById(`${id}-section`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }

        if (setActiveSection) {
            setActiveSection(id);
        }
        if (window.innerWidth < 1024 && onClose) {
            onClose();
        }
    };

    return (
        <>
            {/* Backdrop for mobile */}
            {isOpen && (
                <div
                    onClick={onClose}
                    className="fixed inset-0 bg-[#07111F]/80 backdrop-blur-sm z-30 lg:hidden"
                />
            )}

            {/* Sidebar container */}
            <aside className={`
        fixed lg:sticky top-0 left-0 z-40 h-screen w-64 bg-[#0B1626] border-r border-[#1E334D] 
        flex flex-col justify-between transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>

                {/* Navigation Top Section */}
                <div className="p-4 space-y-6 overflow-y-auto">

                    {/* Section Header Label */}
                    <div className="px-3 pt-2">
                        <p className="text-[11px] font-bold tracking-wider text-[#64748B] uppercase">
                            Admin Control Panel
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <nav className="space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = activeSection === item.id;

                            return (
                                <button
                                    key={item.id}
                                    onClick={() => handleNavClick(item.id)}
                                    className={`
                                            w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm
                                            transition-all duration-200 group relative
                                            ${isActive
                                            ? 'bg-gradient-to-r from-[#1683FF]/20 to-[#0F6EE0]/10 text-white border border-[#1683FF]/40 shadow-[0_0_15px_rgba(22,131,255,0.15)]'
                                            : 'text-[#94A3B8] hover:text-white hover:bg-[#101F31] border border-transparent hover:border-[#1E334D]'
                                        }
                             `}
                                >
                                    {/* Left indicator glowing bar if active */}
                                    {isActive && (
                                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#38BDF8] rounded-r-full shadow-[0_0_8px_#38BDF8]" />
                                    )}

                                    <div className="flex items-center gap-3">
                                        <Icon size={18} className={isActive ? 'text-[#38BDF8]' : 'text-[#64748B] group-hover:text-[#94A3B8]'} />
                                        <span className='text-start'>{item.label}</span>
                                    </div>

                                    {item.badge && (
                                        <span className={`px-2 py-0.5 text-[10px] font-semibold rounded-md ${item.badgeColor}`}>
                                            {item.badge}
                                        </span>
                                    )}
                                </button>
                            );
                        })}
                    </nav>
                </div>

                {/* Sidebar Footer Section */}
                <div className="p-4 border-t border-[#1E334D] bg-[#07111F]/50">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#1683FF] to-[#8B5CF6] flex items-center justify-center text-white font-bold text-xs shadow-md">
                                AD
                            </div>
                            <div>
                                <p className="text-xs font-semibold text-white">Admin User</p>
                                <p className="text-[10px] text-[#64748B]">Super Admin</p>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/')}
                            className="p-2 text-[#64748B] hover:text-[#EF4444] hover:bg-[#EF4444]/10 rounded-xl transition-all"
                            title="Logout"
                        >
                            <LogOut size={16} />
                        </button>
                    </div>
                </div>

            </aside>
        </>
    );
};

export default AdminSidebar;

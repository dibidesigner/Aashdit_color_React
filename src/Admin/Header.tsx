import React, { useState } from 'react';
import {
    ShieldCheck,
    Search,
    Bell,
    User,
    LogOut,
    Menu,
    X,
    ChevronDown,
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';
import { logout } from '../Api/auth';

interface AdminHeaderProps {
    onToggleSidebar?: () => void;
    isSidebarOpen?: boolean;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
    onToggleSidebar,
    isSidebarOpen = true
}) => {
    const navigate = useNavigate();
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');

    const Logout = async () => {
        await logout()
        navigate("/")
    }

    const notifications = [
        { id: 1, title: 'New user registered', time: '5m ago', type: 'user' },
        { id: 2, title: 'Sector "FinTech" guide updated', time: '1h ago', type: 'system' },
        { id: 3, title: 'Security policy updated', time: '3h ago', type: 'security' },
    ];

    return (
        <header className="sticky top-0 z-40 w-full bg-[#07111F]/90 backdrop-blur-md border-b border-[#1E334D] px-4 lg:px-6 py-3 transition-all duration-200">
            <div className="flex items-center justify-between gap-4">

                {/* Left Section: Mobile Toggle + Brand Logo */}
                <div className="flex items-center gap-3">
                    <button
                        onClick={onToggleSidebar}
                        className="p-2 text-[#94A3B8] hover:text-white bg-[#101F31] hover:bg-[#16273D] border border-[#20344A] rounded-xl lg:hidden transition-all duration-200"
                        aria-label="Toggle navigation menu"
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>

                    <Link to="/admin" className="flex items-center gap-3 group">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1683FF] to-[#0F6EE0] flex items-center justify-center shadow-[0_0_15px_rgba(22,131,255,0.4)] group-hover:scale-105 transition-transform duration-200">
                            <ShieldCheck size={22} className="text-white" />
                        </div>
                        <div className="hidden sm:block">
                            <div className="flex items-center gap-2">
                                <span className="text-white font-bold text-lg tracking-wide group-hover:text-[#38BDF8] transition-colors">
                                    Aashdit Admin
                                </span>
                                <span className="px-2 py-0.5 text-[10px] font-semibold bg-[rgba(22,131,255,0.15)] text-[#38BDF8] border border-[rgba(56,189,248,0.3)] rounded-full">
                                    v2.4
                                </span>
                            </div>
                            <p className="text-xs text-[#64748B]">Design Atlas Management</p>
                        </div>
                    </Link>
                </div>

                {/* Middle Section: Global Search */}
                <div className="hidden md:flex flex-1 max-w-md mx-4">
                    <div className="relative w-full">
                        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B]" size={18} />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search users, sectors, system logs..."
                            className="w-full bg-[#0D1B2A] text-[#F4F7FB] text-sm pl-10 pr-4 py-2 rounded-xl border border-[#20344A] focus:border-[#1683FF] focus:outline-none focus:ring-1 focus:ring-[#1683FF] placeholder-[#64748B] transition-all duration-200"
                        />
                        <kbd className="hidden lg:inline-block absolute right-3 top-1/2 -translate-y-1/2 px-1.5 py-0.5 text-[10px] font-mono text-[#64748B] bg-[#101F31] border border-[#20344A] rounded">
                            ⌘K
                        </kbd>
                    </div>
                </div>

                {/* Right Section: System Status + Notifications + Profile */}
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <button
                            onClick={() => {
                                setShowNotifications(!showNotifications);
                                setShowProfileMenu(false);
                            }}
                            className="relative p-2.5 text-[#94A3B8] hover:text-white bg-[#101F31] hover:bg-[#16273D] border border-[#20344A] rounded-xl transition-all duration-200"
                            aria-label="View notifications"
                        >
                            <Bell size={18} />
                            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#1683FF] ring-2 ring-[#07111F]" />
                        </button>

                        {showNotifications && (
                            <div className="absolute right-0 mt-3 w-80 bg-[#0E1A2B] border border-[#20364F] rounded-2xl shadow-2xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-150">
                                <div className="flex items-center justify-between px-4 py-2 border-b border-[#1C314A]">
                                    <span className="text-sm font-bold text-white flex items-center gap-2">
                                        Notifications
                                        <span className="px-1.5 py-0.5 text-[10px] bg-[#1683FF] text-white rounded-full font-semibold">3</span>
                                    </span>
                                    <button
                                        onClick={() => setShowNotifications(false)}
                                        className="text-xs text-[#1683FF] hover:underline"
                                    >
                                        Mark read
                                    </button>
                                </div>
                                <div className="divide-y divide-[#1C314A]/50 max-h-64 overflow-y-auto">
                                    {notifications.map((n) => (
                                        <div key={n.id} className="p-3 hover:bg-[#13243B] transition-colors cursor-pointer">
                                            <p className="text-xs font-medium text-[#F4F7FB]">{n.title}</p>
                                            <p className="text-[11px] text-[#64748B] mt-1">{n.time}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="p-2 text-center border-t border-[#1C314A]">
                                    <span className="text-xs text-[#94A3B8] hover:text-[#38BDF8] cursor-pointer">
                                        View all notifications
                                    </span>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Profile Menu Dropdown */}
                    <div className="relative">
                        <button
                            onClick={() => {
                                setShowProfileMenu(!showProfileMenu);
                                setShowNotifications(false);
                            }}
                            className="flex items-center gap-2 p-1.5 pr-3 bg-[#101F31] hover:bg-[#16273D] border border-[#20344A] hover:border-[#1683FF]/50 rounded-xl transition-all duration-200"
                        >
                            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-[#38BDF8] to-[#1683FF] flex items-center justify-center text-white font-bold text-xs shadow-md">
                                AD
                            </div>
                            <div className="hidden sm:block text-left">
                                <p className="text-xs font-semibold text-white leading-tight">Admin User</p>
                                <p className="text-[10px] text-[#38BDF8]">Super Admin</p>
                            </div>
                            <ChevronDown size={14} className="text-[#64748B] hidden sm:block" />
                        </button>

                        {showProfileMenu && (
                            <div className="absolute right-0 mt-3 w-56 bg-[#0E1A2B] border border-[#20364F] rounded-2xl shadow-2xl z-50 py-2 animate-in fade-in slide-in-from-top-2 duration-150">
                                <div className="px-4 py-3 border-b border-[#1C314A]">
                                    <p className="text-sm font-semibold text-white">Administrator</p>
                                    <p className="text-xs text-[#64748B]">admin@aashdit.com</p>
                                </div>
                                <div className="py-1">
                                    <button
                                        onClick={() => { setShowProfileMenu(false); navigate('/admin'); }}
                                        className="w-full text-left px-4 py-2 text-xs text-[#94A3B8] hover:text-white hover:bg-[#13243B] flex items-center gap-2"
                                    >
                                        <User size={14} />
                                        <span>Admin Profile</span>
                                    </button>

                                </div>
                                <div className="pt-1 border-t border-[#1C314A]">
                                    <button
                                        onClick={() => {
                                            setShowProfileMenu(false);
                                            navigate('/');
                                        }}
                                        className="w-full text-left px-4 py-2 text-xs text-[#EF4444] hover:bg-[#EF4444]/10 flex items-center gap-2"
                                    >
                                        <LogOut size={14} />
                                        <span onClick={Logout}>Log Out</span>
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                </div>

            </div>
        </header>
    );
};

export default AdminHeader;

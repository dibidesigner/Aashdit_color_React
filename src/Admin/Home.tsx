import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Users,
    Plus,
    Search,
    Edit3,
    Trash2,
    Shield,
    Layers,
    X,
    Sparkles,
    CheckCircle2,
    XCircle,
    Mail,
    Activity,
    ArrowUpRight,
    UserPlus as UserPlusIcon
} from 'lucide-react';
import { SectorCard } from '../components/sectors/SectorCard';
import { saveUser, getUsers, updateUser, deleteUser } from './services/auth';
import { getSectors } from './services/Sectors';
import type { Sector } from '../types/sector';

// Interface for User model
export interface AdminUser {
    id: string;
    name: string;
    email: string;
    role: 'Super Admin' | 'Admin' | 'Editor' | 'Viewer';
    mobile: string;
    status: 'Active' | 'Inactive' | 'Pending';
    avatarBg: string;
    createdAt: string;
}

// Initial Mock Users
const INITIAL_USERS: AdminUser[] = [
    {
        id: 'usr-1',
        name: 'Aashdit Dash',
        email: 'aashdit@designatlas.io',
        role: 'Super Admin',
        status: 'Active',
        mobile: "9348053242",
        avatarBg: 'from-[#1683FF] to-[#38BDF8]',
        createdAt: '2026-01-15'
    }
];

export const AdminHome: React.FC = () => {
    const navigate = useNavigate();
    // State for Users
    const [userList, setUserList] = useState<AdminUser[]>(INITIAL_USERS);
    const [userSearch, setUserSearch] = useState('');
    const [roleFilter, setRoleFilter] = useState<string>('All');
    const [statusFilter, setStatusFilter] = useState<string>('All');

    // State for Sectors
    const [sectorList, setSectorList] = useState<Sector[]>([]);
    const [sectorSearch, setSectorSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');

    // Modals state
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);
    const [editingUser, setEditingUser] = useState<AdminUser | null>(null);
    const [deletingUser, setDeletingUser] = useState<AdminUser | null>(null);

    // Form State for Add / Edit User
    const [formData, setFormData] = useState<{
        name: string;
        email: string;
        mobile: string;
        role: 'Super Admin' | 'Admin' | 'Editor' | 'Viewer';
        status: 'Active' | 'Inactive' | 'Pending';
    }>({
        name: '',
        email: '',
        role: 'Editor',
        mobile: "9348053242",
        status: 'Active'
    });

    // Toast Notification State
    const [toastMessage, setToastMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

    const showToast = (text: string, type: 'success' | 'error' | 'info' = 'success') => {
        setToastMessage({ text, type });
        setTimeout(() => setToastMessage(null), 3500);
    };

    // Fetch users from API
    const fetchUserList = async () => {
        try {
            const res = await getUsers();
            if (res && Array.isArray(res.users)) {
                const gradients = [
                    'from-[#1683FF] to-[#38BDF8]',
                    'from-[#8B5CF6] to-[#C084FC]',
                    'from-[#10B981] to-[#34D399]',
                    'from-[#F59E0B] to-[#FBBF24]',
                    'from-[#EC4899] to-[#F472B6]'
                ];
                const mappedUsers: AdminUser[] = res.users.map((u, idx) => {
                    const fullName = `${u.first_name || ''} ${u.last_name || ''}`.trim() || u.username || u.email;
                    return {
                        id: String(u.id),
                        name: fullName,
                        email: u.email || u.username,
                        role: 'Admin',
                        mobile: '9348053242',
                        status: 'Active',
                        avatarBg: gradients[idx % gradients.length],
                        createdAt: new Date().toISOString().split('T')[0]
                    };
                });
                setUserList(mappedUsers);
            }
        } catch (error: any) {
            console.error('Error fetching users from GET endpoint:', error?.message || String(error));
        }
    };

    // Fetch sectors from API
    const fetchSectorList = async () => {
        try {
            const data = await getSectors();
            setSectorList(Array.isArray(data) ? data : []);
        } catch (error: any) {
            console.error('Error fetching sectors from API:', error?.message || String(error));
        }
    };

    useEffect(() => {
        fetchUserList();
        fetchSectorList();
    }, []);

    // User CRUD Handlers
    const handleOpenAddModal = () => {
        setFormData({
            name: '',
            email: '',
            role: 'Editor',
            mobile: "9348053242",
            status: 'Active'
        });
        setIsAddUserOpen(true);
    };

    const handleOpenEditModal = (user: AdminUser) => {
        setEditingUser(user);
        setFormData({
            name: user.name,
            email: user.email,
            role: user.role,
            mobile: user.mobile,
            status: user.status
        });
    };

    const handleSaveAddUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name.trim() || !formData.email.trim()) {
            showToast('Please enter both name and email.', 'error');
            return;
        }

        const nameParts = formData.name.trim().split(' ');
        const first_name = nameParts[0] || '';
        const last_name = nameParts.slice(1).join(' ') || '';

        try {
            await saveUser({
                username: formData.email.trim(),
                email: formData.email.trim(),
                mobileno: formData.mobile,
                first_name: first_name,
                last_name: last_name,
                role: formData.role,
                status: formData.status
            });

            await fetchUserList();
            setIsAddUserOpen(false);
            showToast(`User "${formData.name.trim()}" added successfully!`, 'success');
        } catch (error: any) {
            console.error('Error saving user:', error?.response?.data?.message || error?.message || 'Failed to save user.');
            const errorMessage = error?.response?.data?.message || error?.response?.data?.error || 'Failed to save user.';
            showToast(errorMessage, 'error');
        }
    };

    const handleSaveEditUser = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!editingUser) return;
        if (!formData.name.trim() || !formData.email.trim()) {
            showToast('Please fill out all required fields.', 'error');
            return;
        }

        const nameParts = formData.name.trim().split(' ');
        const first_name = nameParts[0] || '';
        const last_name = nameParts.slice(1).join(' ') || '';

        try {
            await updateUser(editingUser.id, {
                username: formData.email.trim(),
                email: formData.email.trim(),
                mobileno: formData.mobile,
                first_name: first_name,
                last_name: last_name,
                role: formData.role,
                status: formData.status
            });

            await fetchUserList();
            setEditingUser(null);
            showToast(`User "${formData.name}" updated successfully!`, 'success');
        } catch (error: any) {
            console.error('Error updating user:', error?.response?.data?.message || error?.message || 'Failed to update user.');
            const errorMessage = error?.response?.data?.message || 'Failed to update user.';
            showToast(errorMessage, 'error');
        }
    };

    const handleConfirmDelete = async () => {
        if (!deletingUser) return;
        try {
            await deleteUser(deletingUser.id);
            await fetchUserList();
            showToast(`User "${deletingUser.name}" has been deleted.`, 'info');
        } catch (error: any) {
            console.error('Error deleting user:', error?.response?.data?.message || error?.message || 'Failed to delete user.');
            const errorMessage = error?.response?.data?.message || 'Failed to delete user.';
            showToast(errorMessage, 'error');
        } finally {
            setDeletingUser(null);
        }
    };

    const handleToggleUserStatus = (userId: string) => {
        setUserList(userList.map(u => {
            if (u.id === userId) {
                const nextStatus = u.status === 'Active' ? 'Inactive' : 'Active';
                showToast(`Status changed to ${nextStatus} for ${u.name}`, 'info');
                return { ...u, status: nextStatus };
            }
            return u;
        }));
    };

    // Filtered Users
    const filteredUsers = (userList || []).filter(user => {
        if (!user || typeof user !== 'object') return false;
        const userName = typeof user.name === 'string' ? user.name : '';
        const userEmail = typeof user.email === 'string' ? user.email : '';
        const matchesSearch = userName.toLowerCase().includes(userSearch.toLowerCase()) ||
            userEmail.toLowerCase().includes(userSearch.toLowerCase());

        const matchesRole = roleFilter === 'All' || user.role === roleFilter;
        const matchesStatus = statusFilter === 'All' || user.status === statusFilter;
        return matchesSearch && matchesRole && matchesStatus;
    });

    // Filtered Sectors
    const categories = ['All', ...Array.from(new Set((sectorList || []).map(s => (s && typeof s.category === 'string') ? s.category : '').filter(Boolean)))];
    const filteredSectors = (sectorList || []).filter(sec => {
        if (!sec || typeof sec !== 'object') return false;
        const catStr = typeof sec.category === 'string' ? sec.category : '';
        const matchesCategory = selectedCategory === 'All' || catStr === selectedCategory;

        const nameStr = typeof sec.name === 'string' ? sec.name : '';
        const shortDescStr = typeof sec.shortDescription === 'string' ? sec.shortDescription : '';
        const keywordsArr = Array.isArray(sec.keywords) ? sec.keywords : [];

        const matchesSearch = nameStr.toLowerCase().includes(sectorSearch.toLowerCase()) ||
            shortDescStr.toLowerCase().includes(sectorSearch.toLowerCase()) ||
            keywordsArr.some(k => typeof k === 'string' && k.toLowerCase().includes(sectorSearch.toLowerCase()));

        return matchesCategory && matchesSearch;
    });

    return (
        <div className="space-y-10 pb-16">

            {/* Toast Notification Alert Banner */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#0E1A2B] border border-[#20364F] shadow-2xl animate-in slide-in-from-bottom-5 duration-200">
                    {toastMessage.type === 'success' && <CheckCircle2 size={20} className="text-[#10B981]" />}
                    {toastMessage.type === 'error' && <XCircle size={20} className="text-[#EF4444]" />}
                    {toastMessage.type === 'info' && <Sparkles size={20} className="text-[#38BDF8]" />}
                    <span className="text-sm font-semibold text-[#F4F7FB]">{toastMessage.text}</span>
                </div>
            )}

            {/* Top Banner / Welcome Header */}
            <div id="dashboard-section" className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#0B1A2E] via-[#0F243E] to-[#122B4A] border border-[#1E3654] p-6 lg:p-8">
                <div className="absolute right-0 top-0 translate-x-10 -translate-y-10 w-80 h-80 bg-[#1683FF]/10 rounded-full blur-3xl pointer-events-none" />
                <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                            Control Center & System Management
                        </h1>
                        <p className="text-sm text-[#94A3B8] mt-1 max-w-xl">
                            Manage system users, access roles, and review sector design frameworks across the Aashdit platform.
                        </p>
                    </div>

                    <button
                        onClick={handleOpenAddModal}
                        className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#1683FF] to-[#0F6EE0] text-white font-bold text-sm shadow-[0_0_20px_rgba(22,131,255,0.4)] hover:shadow-[0_0_25px_rgba(22,131,255,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer shrink-0"
                    >
                        <Plus size={18} />
                        <span>Add New User</span>
                    </button>
                </div>
            </div>

            {/* Overview Stat Cards Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">

                {/* Stat 1 */}
                <div className="bg-[#0B1626] border border-[#1E334D] rounded-2xl p-5 hover:border-[#1683FF]/50 transition-all duration-200 group">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-[#94A3B8]">Total Registered Users</span>
                        <div className="w-10 h-10 rounded-xl bg-[#1683FF]/10 text-[#38BDF8] flex items-center justify-center border border-[#1683FF]/20 group-hover:scale-110 transition-transform">
                            <Users size={20} />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-white">{userList.length}</span>
                        <span className="text-xs text-[#10B981] font-semibold flex items-center">
                            +12% <ArrowUpRight size={12} />
                        </span>
                    </div>
                    <p className="text-[11px] text-[#64748B] mt-1">Active team members & admins</p>
                </div>

                {/* Stat 2 */}
                <div className="bg-[#0B1626] border border-[#1E334D] rounded-2xl p-5 hover:border-[#8B5CF6]/50 transition-all duration-200 group">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-[#94A3B8]">Design Sectors</span>
                        <div className="w-10 h-10 rounded-xl bg-[#8B5CF6]/10 text-[#C084FC] flex items-center justify-center border border-[#8B5CF6]/20 group-hover:scale-110 transition-transform">
                            <Layers size={20} />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-white">{sectorList.length}</span>
                        <span className="text-xs text-[#38BDF8] font-semibold">Live Guides</span>
                    </div>
                    <p className="text-[11px] text-[#64748B] mt-1">Curated industry design guides</p>
                </div>

                {/* Stat 3 */}
                <div className="bg-[#0B1626] border border-[#1E334D] rounded-2xl p-5 hover:border-[#10B981]/50 transition-all duration-200 group">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-[#94A3B8]">Active Accounts</span>
                        <div className="w-10 h-10 rounded-xl bg-[#10B981]/10 text-[#10B981] flex items-center justify-center border border-[#10B981]/20 group-hover:scale-110 transition-transform">
                            <CheckCircle2 size={20} />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-white">
                            {userList.filter(u => u.status === 'Active').length}
                        </span>
                        <span className="text-xs text-[#10B981] font-semibold">
                            {Math.round((userList.filter(u => u.status === 'Active').length / (userList.length || 1)) * 100)}% active
                        </span>
                    </div>
                    <p className="text-[11px] text-[#64748B] mt-1">Validated system credentials</p>
                </div>

                {/* Stat 4 */}
                <div className="bg-[#0B1626] border border-[#1E334D] rounded-2xl p-5 hover:border-[#F59E0B]/50 transition-all duration-200 group">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-semibold text-[#94A3B8]">Pending Invites</span>
                        <div className="w-10 h-10 rounded-xl bg-[#F59E0B]/10 text-[#FBBF24] flex items-center justify-center border border-[#F59E0B]/20 group-hover:scale-110 transition-transform">
                            <Activity size={20} />
                        </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-white">
                            {userList.filter(u => u.status === 'Pending').length}
                        </span>
                        <span className="text-xs text-[#FBBF24] font-semibold">Awaiting Verification</span>
                    </div>
                    <p className="text-[11px] text-[#64748B] mt-1">Requires admin approval</p>
                </div>

            </div>

            {/* USER MANAGEMENT SECTION */}
            <section id="users-section" className="bg-[#0B1626] border border-[#1E334D] rounded-3xl p-6 shadow-xl space-y-6">

                {/* User Section Header & Controls */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#1E334D]">
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl bg-[#1683FF]/15 text-[#38BDF8] flex items-center justify-center font-bold text-xs">
                                <Users size={18} />
                            </div>
                            <h2 className="text-xl font-bold text-white">User Management</h2>
                            <span className="px-2.5 py-0.5 text-xs font-bold bg-[#101F31] text-[#38BDF8] border border-[#20344A] rounded-full">
                                {filteredUsers.length} Users
                            </span>
                        </div>
                        <p className="text-xs text-[#64748B] mt-1">
                            Add new team members, edit user permissions, or revoke access credentials.
                        </p>
                    </div>

                    {/* Search + Filter Inputs */}
                    <div className="flex flex-wrap items-center gap-3">

                        <div className="relative min-w-[200px] flex-1 sm:flex-initial">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" size={16} />
                            <input
                                type="text"
                                value={userSearch}
                                onChange={(e) => setUserSearch(e.target.value)}
                                placeholder="Filter by name, email..."
                                className="w-full bg-[#07111F] text-[#F4F7FB] text-xs pl-9 pr-3 py-2 rounded-xl border border-[#20344A] focus:border-[#1683FF] focus:outline-none placeholder-[#64748B]"
                            />
                        </div>

                        <select
                            value={roleFilter}
                            onChange={(e) => setRoleFilter(e.target.value)}
                            className="bg-[#07111F] text-[#F4F7FB] text-xs px-3 py-2 rounded-xl border border-[#20344A] focus:border-[#1683FF] focus:outline-none cursor-pointer"
                        >
                            <option value="All">All Roles</option>
                            <option value="Super Admin">Super Admin</option>
                            <option value="Admin">Admin</option>
                            <option value="Editor">Editor</option>
                            <option value="Viewer">Viewer</option>
                        </select>

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
                            className="bg-[#07111F] text-[#F4F7FB] text-xs px-3 py-2 rounded-xl border border-[#20344A] focus:border-[#1683FF] focus:outline-none cursor-pointer"
                        >
                            <option value="All">All Statuses</option>
                            <option value="Active">Active</option>
                            <option value="Inactive">Inactive</option>
                            <option value="Pending">Pending</option>
                        </select>

                        <button
                            onClick={handleOpenAddModal}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#1683FF] hover:bg-[#0F6EE0] text-white text-xs font-bold shadow-md hover:shadow-[0_0_15px_rgba(22,131,255,0.4)] transition-all cursor-pointer"
                        >
                            <Plus size={16} />
                            <span>Add User</span>
                        </button>
                    </div>
                </div>

                {/* Users Table */}
                <div className="overflow-x-auto rounded-2xl border border-[#1E334D] bg-[#07111F]/60">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-[#101F31]/80 text-[#64748B] text-[11px] font-bold uppercase tracking-wider border-b border-[#1E334D]">
                                <th className="py-3.5 px-4">User Details</th>
                                <th className="py-3.5 px-4">Role</th>
                                <th className="py-3.5 px-4">Status</th>
                                <th className="py-3.5 px-4">Joined Date</th>
                                <th className="py-3.5 px-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-[#1E334D]/60 text-xs">
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="py-12 text-center text-[#64748B]">
                                        No users found matching &quot;{userSearch}&quot;
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr
                                        key={user.id}
                                        className="hover:bg-[#0F1E33] transition-colors duration-150 group"
                                    >
                                        <td className="py-3.5 px-4">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${user.avatarBg} flex items-center justify-center text-white font-bold text-xs shadow-md shrink-0`}>
                                                    {(user.name || 'U').split(' ').filter(Boolean).map(n => n[0]).join('').substring(0, 2).toUpperCase() || 'U'}
                                                </div>
                                                <div>
                                                    <p className="font-semibold text-white group-hover:text-[#38BDF8] transition-colors">
                                                        {user.name}
                                                    </p>
                                                    <p className="text-[11px] text-[#64748B] flex items-center gap-1">
                                                        <Mail size={10} />
                                                        {user.email}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="py-3.5 px-4">
                                            <span className={`
                        px-2.5 py-1 rounded-lg text-[11px] font-semibold border inline-flex items-center gap-1
                        ${user.role === 'Super Admin' ? 'bg-[#8B5CF6]/15 text-[#C084FC] border-[#8B5CF6]/30' : ''}
                        ${user.role === 'Admin' ? 'bg-[#1683FF]/15 text-[#38BDF8] border-[#1683FF]/30' : ''}
                        ${user.role === 'Editor' ? 'bg-[#10B981]/15 text-[#34D399] border-[#10B981]/30' : ''}
                        ${user.role === 'Viewer' ? 'bg-[#64748B]/15 text-[#94A3B8] border-[#64748B]/30' : ''}
                      `}>
                                                <Shield size={12} />
                                                {user.role}
                                            </span>
                                        </td>

                                        <td className="py-3.5 px-4">
                                            <button
                                                onClick={() => handleToggleUserStatus(user.id)}
                                                title="Click to toggle status"
                                                className={`
                          px-2.5 py-1 rounded-full text-[10px] font-bold border transition-transform active:scale-95 cursor-pointer flex items-center gap-1
                          ${user.status === 'Active' ? 'bg-[#10B981]/15 text-[#10B981] border-[#10B981]/30 hover:bg-[#10B981]/25' : ''}
                          ${user.status === 'Inactive' ? 'bg-[#EF4444]/15 text-[#EF4444] border-[#EF4444]/30 hover:bg-[#EF4444]/25' : ''}
                          ${user.status === 'Pending' ? 'bg-[#F59E0B]/15 text-[#FBBF24] border-[#F59E0B]/30 hover:bg-[#F59E0B]/25' : ''}
                        `}
                                            >
                                                <span className={`w-1.5 h-1.5 rounded-full ${user.status === 'Active' ? 'bg-[#10B981]' : user.status === 'Inactive' ? 'bg-[#EF4444]' : 'bg-[#FBBF24]'}`} />
                                                {user.status}
                                            </button>
                                        </td>

                                        <td className="py-3.5 px-4 text-[#64748B] text-[11px]">
                                            {user.createdAt}
                                        </td>

                                        <td className="py-3.5 px-4 text-right">
                                            <div className="flex items-center justify-end gap-1">
                                                <button
                                                    onClick={() => handleOpenEditModal(user)}
                                                    className="p-1.5 text-[#94A3B8] hover:text-[#38BDF8] hover:bg-[#1683FF]/15 border border-transparent hover:border-[#1683FF]/30 rounded-lg transition-all"
                                                    title="Edit user details"
                                                >
                                                    <Edit3 size={15} />
                                                </button>

                                                <button
                                                    onClick={() => setDeletingUser(user)}
                                                    className="p-1.5 text-[#94A3B8] hover:text-[#EF4444] hover:bg-[#EF4444]/15 border border-transparent hover:border-[#EF4444]/30 rounded-lg transition-all"
                                                    title="Delete user account"
                                                >
                                                    <Trash2 size={15} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {/* SECTOR CARDS SECTION */}
            <section id="sectors-section" className="bg-[#0B1626] border border-[#1E334D] rounded-3xl p-6 shadow-xl space-y-6">

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#1E334D]">
                    <div>
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-xl bg-[#8B5CF6]/15 text-[#C084FC] flex items-center justify-center font-bold text-xs">
                                <Layers size={18} />
                            </div>
                            <h2 className="text-xl font-bold text-white">Sector Design Frameworks</h2>
                            <span className="px-2.5 py-0.5 text-xs font-bold bg-[#101F31] text-[#C084FC] border border-[#20344A] rounded-full">
                                {filteredSectors.length} Sectors
                            </span>
                        </div>
                        <p className="text-xs text-[#64748B] mt-1">
                            Browse all industry-specific color palettes, typography scales, and UI components below.
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#64748B]" size={16} />
                            <input
                                type="text"
                                value={sectorSearch}
                                onChange={(e) => setSectorSearch(e.target.value)}
                                placeholder="Search sectors..."
                                className="w-full bg-[#07111F] text-[#F4F7FB] text-xs pl-9 pr-3 py-2 rounded-xl border border-[#20344A] focus:border-[#8B5CF6] focus:outline-none placeholder-[#64748B]"
                            />
                        </div>

                        <button
                            onClick={() => navigate('/admin/add-sector')}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] hover:from-[#7C3AED] hover:to-[#6D28D9] text-white text-xs font-bold shadow-md hover:shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-all cursor-pointer whitespace-nowrap"
                        >
                            <Plus size={16} />
                            <span>Add Sector Guide</span>
                        </button>
                    </div>
                </div>

                {/* Category Pills */}
                <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setSelectedCategory(cat)}
                            className={`
                px-3 py-1.5 text-xs font-semibold rounded-xl border transition-all duration-200 cursor-pointer
                ${selectedCategory === cat
                                    ? 'bg-[#1683FF] text-white border-[#38BDF8] shadow-[0_0_12px_rgba(22,131,255,0.4)]'
                                    : 'bg-[#07111F] text-[#94A3B8] border-[#20344A] hover:text-white hover:border-[#2D4A68]'
                                }
              `}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* Sector Cards Responsive Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {filteredSectors.map((sector) => (
                        <SectorCard key={sector.id} sector={sector} />
                    ))}
                </div>

                {filteredSectors.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-[#64748B] text-sm">No sectors match your criteria.</p>
                    </div>
                )}
            </section>

            {/* ADD USER MODAL */}
            {isAddUserOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07111F]/80 backdrop-blur-sm animate-in fade-in duration-150">
                    <div className="bg-[#0E1A2B] border border-[#20364F] rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">

                        <div className="flex items-center justify-between border-b border-[#1C314A] pb-4">
                            <div className="flex items-center gap-2.5">
                                <div className="w-9 h-9 rounded-xl bg-[#1683FF]/15 text-[#38BDF8] flex items-center justify-center font-bold">
                                    <UserPlusIcon size={18} />
                                </div>
                                <div>
                                    <h3 className="text-base font-bold text-white">Add New User</h3>
                                    <p className="text-xs text-[#64748B]">Create a new account & assign role</p>
                                </div>
                            </div>
                            <button
                                onClick={() => setIsAddUserOpen(false)}
                                className="p-1.5 text-[#64748B] hover:text-white bg-[#101F31] rounded-xl border border-[#20344A]"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleSaveAddUser} className="space-y-4 text-xs">

                            <div>
                                <label className="block text-[#94A3B8] font-semibold mb-1">Full Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. Alex Rivera"
                                    className="w-full bg-[#07111F] text-[#F4F7FB] p-2.5 rounded-xl border border-[#20344A] focus:border-[#1683FF] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-[#94A3B8] font-semibold mb-1">Mobile No. *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.mobile}
                                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                    placeholder="1234567890"
                                    className="w-full bg-[#07111F] text-[#F4F7FB] p-2.5 rounded-xl border border-[#20344A] focus:border-[#1683FF] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-[#94A3B8] font-semibold mb-1">Email Address *</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    placeholder="alex@company.com"
                                    className="w-full bg-[#07111F] text-[#F4F7FB] p-2.5 rounded-xl border border-[#20344A] focus:border-[#1683FF] focus:outline-none"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[#94A3B8] font-semibold mb-1">Role</label>
                                    <select
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                                        className="w-full bg-[#07111F] text-[#F4F7FB] p-2.5 rounded-xl border border-[#20344A] focus:border-[#1683FF] focus:outline-none cursor-pointer"
                                    >
                                        <option value="Super Admin">Super Admin</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Editor">Editor</option>
                                        <option value="Viewer">Viewer</option>
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-[#94A3B8] font-semibold mb-1">Initial Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                        className="w-full bg-[#07111F] text-[#F4F7FB] p-2.5 rounded-xl border border-[#20344A] focus:border-[#1683FF] focus:outline-none cursor-pointer"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                        <option value="Pending">Pending</option>
                                    </select>
                                </div>
                            </div>

                            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1C314A]">
                                <button
                                    type="button"
                                    onClick={() => setIsAddUserOpen(false)}
                                    className="px-4 py-2 text-[#94A3B8] hover:text-white font-semibold rounded-xl bg-[#101F31] border border-[#20344A]"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-5 py-2 bg-[#1683FF] hover:bg-[#0F6EE0] text-white font-bold rounded-xl shadow-md transition-all cursor-pointer"
                                >
                                    Create User
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}

            {/* EDIT USER MODAL */}
            {editingUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07111F]/80 backdrop-blur-sm animate-in fade-in duration-150">
                    <div className="bg-[#0E1A2B] border border-[#20364F] rounded-3xl max-w-md w-full p-6 shadow-2xl space-y-5 animate-in zoom-in-95 duration-150">
                        <div className="flex items-center justify-between border-b border-[#1C314A] pb-4">
                            <h3 className="text-base font-bold text-white">Edit User: {editingUser.name}</h3>
                            <button onClick={() => setEditingUser(null)} className="p-1.5 text-[#64748B] hover:text-white bg-[#101F31] rounded-xl border border-[#20344A]">
                                <X size={18} />
                            </button>
                        </div>
                        <form onSubmit={handleSaveEditUser} className="space-y-4 text-xs">
                            <div>
                                <label className="block text-[#94A3B8] font-semibold mb-1">Full Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full bg-[#07111F] text-[#F4F7FB] p-2.5 rounded-xl border border-[#20344A] focus:border-[#1683FF] focus:outline-none"
                                />
                            </div>
                            <div>
                                <label className="block text-[#94A3B8] font-semibold mb-1">Email Address *</label>
                                <input
                                    type="email"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="w-full bg-[#07111F] text-[#F4F7FB] p-2.5 rounded-xl border border-[#20344A] focus:border-[#1683FF] focus:outline-none"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-[#94A3B8] font-semibold mb-1">Role</label>
                                    <select
                                        value={formData.role}
                                        onChange={(e) => setFormData({ ...formData, role: e.target.value as any })}
                                        className="w-full bg-[#07111F] text-[#F4F7FB] p-2.5 rounded-xl border border-[#20344A] focus:border-[#1683FF] focus:outline-none cursor-pointer"
                                    >
                                        <option value="Super Admin">Super Admin</option>
                                        <option value="Admin">Admin</option>
                                        <option value="Editor">Editor</option>
                                        <option value="Viewer">Viewer</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-[#94A3B8] font-semibold mb-1">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                        className="w-full bg-[#07111F] text-[#F4F7FB] p-2.5 rounded-xl border border-[#20344A] focus:border-[#1683FF] focus:outline-none cursor-pointer"
                                    >
                                        <option value="Active">Active</option>
                                        <option value="Inactive">Inactive</option>
                                        <option value="Pending">Pending</option>
                                    </select>
                                </div>
                            </div>
                            <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#1C314A]">
                                <button type="button" onClick={() => setEditingUser(null)} className="px-4 py-2 text-[#94A3B8] hover:text-white font-semibold rounded-xl bg-[#101F31] border border-[#20344A]">
                                    Cancel
                                </button>
                                <button type="submit" className="px-5 py-2 bg-[#1683FF] hover:bg-[#0F6EE0] text-white font-bold rounded-xl shadow-md transition-all cursor-pointer">
                                    Update User
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* DELETE USER CONFIRMATION MODAL */}
            {deletingUser && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#07111F]/80 backdrop-blur-sm animate-in fade-in duration-150">
                    <div className="bg-[#0E1A2B] border border-[#20364F] rounded-3xl max-w-sm w-full p-6 shadow-2xl space-y-4 text-center">
                        <div className="w-12 h-12 rounded-2xl bg-[#EF4444]/15 text-[#EF4444] border border-[#EF4444]/30 flex items-center justify-center mx-auto">
                            <Trash2 size={24} />
                        </div>
                        <h3 className="text-base font-bold text-white">Delete User Account</h3>
                        <p className="text-xs text-[#94A3B8]">
                            Are you sure you want to delete <span className="text-white font-semibold">{deletingUser.name}</span>? This action cannot be undone.
                        </p>
                        <div className="flex items-center justify-center gap-3 pt-2">
                            <button onClick={() => setDeletingUser(null)} className="px-4 py-2 text-xs font-semibold text-[#94A3B8] hover:text-white rounded-xl bg-[#101F31] border border-[#20344A]">
                                Cancel
                            </button>
                            <button onClick={handleConfirmDelete} className="px-4 py-2 text-xs font-bold text-white rounded-xl bg-[#EF4444] hover:bg-[#DC2626] shadow-md transition-all">
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

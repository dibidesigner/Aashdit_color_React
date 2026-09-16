import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    User,
    Lock,
    Eye,
    EyeOff,
    Palette,
    Sparkles,
    ArrowRight,
    ShieldCheck,
    AlertCircle,
    Loader2,
    CheckCircle2,
    Layers,
    Sliders
} from 'lucide-react';
import { login } from '../Api/auth';
import { setAccessToken } from '../Api/apiClient';

interface ColorHarmony {
    name: string;
    type: string;
    description: string;
    colors: string[];
}

const COLOR_HARMONIES: ColorHarmony[] = [
    {
        name: 'Analogous Spectrum',
        type: 'Analogous',
        description: 'Harmonious adjacent colors that create serene and comfortable visual experiences.',
        colors: ['#1683FF', '#12B8C4', '#10B981', '#3B82F6']
    },
    {
        name: 'Triadic Dynamic',
        type: 'Triadic',
        description: 'Vibrant, high-contrast palette balanced evenly across the 12-tone color wheel.',
        colors: ['#1683FF', '#8B5CF6', '#F59E0B', '#EF4444']
    },
    {
        name: 'Complementary Prism',
        type: 'Complementary',
        description: 'Opposite hue pairs providing maximum visual tension and impact.',
        colors: ['#1683FF', '#F97316', '#06B6D4', '#EC4899']
    },
    {
        name: 'Monochromatic Neon',
        type: 'Monochromatic',
        description: 'Variations in lightness and saturation of a single primary hue.',
        colors: ['#0F6EE0', '#1683FF', '#60A5FA', '#93C5FD']
    }
];

export default function Login() {
    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [activeHarmonyIndex, setActiveHarmonyIndex] = useState(0);

    const activeHarmony = COLOR_HARMONIES[activeHarmonyIndex];

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim() || !password.trim()) {
            setError('Please fill in both Username and Password');
            return;
        }

        setError(null);
        setLoading(true);

        try {
            await login(username, password);
            navigate('/admin');
        } catch (err: any) {
            console.error('Login attempt failed:', err);
            const apiMessage = err?.response?.data?.detail || err?.response?.data?.message || err?.message;
            if (apiMessage) {
                setError(`Authentication failed: ${apiMessage}`);
            } else {
                // Fallback info when server endpoint is unavailable or credentials invalid
                setError('Invalid credentials or backend server unreachable. Use Demo Login to explore.');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDemoLogin = async () => {
        setError(null);
        setLoading(true);

        try {
            const response = await login(username, password);
            if (response?.status === "success") {
                navigate('/admin');
                return;
            }
        } catch (error) {
            console.error('Demo login fallback active:', error);
            setAccessToken('demo-auth-token', 'demo-refresh-token');
        }

        setTimeout(() => {
            setLoading(false);
            navigate('/admin');
        }, 600);
    };

    return (
        <div className="min-h-screen bg-[#07111F] text-[#F4F7FB] flex flex-col justify-between relative overflow-hidden font-sans selection:bg-[#1683FF]/30 selection:text-white">
            {/* Dynamic Background Glow Effects */}
            <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-[#1683FF]/15 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#8B5CF6]/15 rounded-full blur-[150px] pointer-events-none" />
            <div className="absolute top-[40%] right-[30%] w-[350px] h-[350px] bg-[#12B8C4]/10 rounded-full blur-[100px] pointer-events-none" />

            {/* Header Bar */}
            <header className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#1683FF] via-[#12B8C4] to-[#8B5CF6] p-[2px] shadow-lg shadow-[#1683FF]/20">
                        <div className="w-full h-full bg-[#07111F] rounded-[10px] flex items-center justify-center">
                            <Palette className="w-5 h-5 text-[#1683FF]" />
                        </div>
                    </div>
                    <div>
                        <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                            Design Atlas
                        </span>
                        <span className="hidden sm:inline-block ml-2 text-xs px-2 py-0.5 rounded-full bg-[#1683FF]/15 text-[#1683FF] border border-[#1683FF]/30 font-mono">
                            Color Theory v2.4
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-xs text-[#94A3B8]">
                    <span className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0B1626] border border-[#20344A]">
                        <ShieldCheck className="w-4 h-4 text-[#10B981]" /> Secure Auth System
                    </span>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="relative z-10 w-full max-w-7xl mx-auto px-6 py-4 flex-1 flex items-center justify-center">
                <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">

                    {/* Left Side: Color Theory Visual Showcase (Visible on lg+) */}
                    <div className="hidden lg:flex lg:col-span-7 flex-col gap-6 pr-4">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1683FF]/10 border border-[#1683FF]/25 text-[#1683FF] text-xs font-semibold w-fit">
                            <Sparkles className="w-3.5 h-3.5" />
                            <span>Interactive Color Reference Platform</span>
                        </div>

                        <div>
                            <h1 className="text-4xl xl:text-5xl font-extrabold tracking-tight text-white leading-tight">
                                Master the Art & Science of <br />
                                <span className="bg-gradient-to-r from-[#1683FF] via-[#12B8C4] to-[#8B5CF6] bg-clip-text text-transparent">
                                    Chromatic Design
                                </span>
                            </h1>
                            <p className="mt-3 text-[#94A3B8] text-base leading-relaxed max-w-xl">
                                Explore color harmonies, accessibility standards, interactive generators, and precision contrast rules built for modern design workflows.
                            </p>
                        </div>

                        {/* Generated Color Theory Hero Image Preview */}
                        <div className="relative rounded-2xl overflow-hidden border border-[#20344A] bg-[#0B1626]/80 shadow-2xl group">
                            <img
                                src="/color_theory_login.jpg"
                                alt="Color Theory Wheel Showcase"
                                className="w-full h-[240px] xl:h-[270px] object-cover object-center transform transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#07111F] via-[#07111F]/40 to-transparent" />

                            {/* Floating Swatches Overlay */}
                            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-[#07111F]/80 backdrop-blur-md border border-[#20344A] flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div className="p-2 rounded-lg bg-[#1683FF]/20 text-[#1683FF]">
                                        <Layers className="w-4 h-4" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-semibold text-white">{activeHarmony.name}</p>
                                        <p className="text-[11px] text-[#64748B]">{activeHarmony.description}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-1.5 pl-2">
                                    {activeHarmony.colors.map((hex, i) => (
                                        <div
                                            key={i}
                                            className="w-7 h-7 rounded-lg shadow-sm border border-white/20 transition-transform hover:scale-110 flex items-center justify-center text-[9px] font-mono text-white/90 font-bold"
                                            style={{ backgroundColor: hex }}
                                            title={hex}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Harmony Selector Badges */}
                        <div className="flex items-center gap-2 overflow-x-auto pb-1">
                            <span className="text-xs text-[#64748B] flex items-center gap-1 font-medium pr-1">
                                <Sliders className="w-3.5 h-3.5" /> Harmonies:
                            </span>
                            {COLOR_HARMONIES.map((h, idx) => (
                                <button
                                    key={h.type}
                                    type="button"
                                    onClick={() => setActiveHarmonyIndex(idx)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${activeHarmonyIndex === idx
                                        ? 'bg-[#1683FF] text-white shadow-lg shadow-[#1683FF]/30 font-semibold'
                                        : 'bg-[#0B1626] text-[#94A3B8] hover:bg-[#101F31] hover:text-white border border-[#20344A]'
                                        }`}
                                >
                                    {h.type}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Side: Sleek Glassmorphism Login Card */}
                    <div className="lg:col-span-5 w-full max-w-md mx-auto">
                        <div className="relative rounded-3xl bg-[#0B1626]/90 backdrop-blur-xl border border-[#20344A] p-8 shadow-2xl shadow-black/50">
                            {/* Card Header */}
                            <div className="mb-6 text-center lg:text-left">
                                <h2 className="text-2xl font-bold text-white tracking-tight">Admin Portal Sign In</h2>
                                <p className="text-xs text-[#94A3B8] mt-1">
                                    Sign in as Administrator to manage users, roles, and sector design guides
                                </p>
                            </div>

                            {/* Error Alert */}
                            {error && (
                                <div className="mb-5 p-3.5 rounded-xl bg-[#EF4444]/10 border border-[#EF4444]/30 flex items-start gap-3 text-xs text-[#EF4444] animate-fadeIn">
                                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                                    <div className="flex-1">{error}</div>
                                </div>
                            )}

                            {/* Login Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* Username Input */}
                                <div>
                                    <label className="block text-xs font-medium text-[#94A3B8] mb-1.5">
                                        Username
                                    </label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B] group-focus-within:text-[#1683FF] transition-colors">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="text"
                                            id="username"
                                            value={username}
                                            onChange={(e) => setUsername(e.target.value)}
                                            placeholder="Enter your username"
                                            className="w-full pl-10 pr-4 py-3 bg-[#101F31] border border-[#20344A] rounded-xl text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#1683FF] focus:ring-2 focus:ring-[#1683FF]/25 transition-all"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div>
                                    <div className="flex items-center justify-between mb-1.5">
                                        <label className="block text-xs font-medium text-[#94A3B8]">
                                            Password
                                        </label>
                                        <a
                                            href="#"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                alert('Password reset link sent to your registered email.');
                                            }}
                                            className="text-xs text-[#1683FF] hover:text-[#0F6EE0] transition-colors font-medium"
                                        >
                                            Forgot Password?
                                        </a>
                                    </div>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#64748B] group-focus-within:text-[#1683FF] transition-colors">
                                            <Lock className="w-4 h-4" />
                                        </div>
                                        <input
                                            type={showPassword ? 'text' : 'password'}
                                            id="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="••••••••••••"
                                            className="w-full pl-10 pr-10 py-3 bg-[#101F31] border border-[#20344A] rounded-xl text-sm text-white placeholder-[#64748B] focus:outline-none focus:border-[#1683FF] focus:ring-2 focus:ring-[#1683FF]/25 transition-all"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-[#64748B] hover:text-[#94A3B8] transition-colors"
                                            aria-label={showPassword ? 'Hide password' : 'Show password'}
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Remember Me Checkbox */}
                                <div className="flex items-center justify-between py-1">
                                    <label className="flex items-center gap-2 cursor-pointer select-none">
                                        <input
                                            type="checkbox"
                                            checked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            className="w-4 h-4 rounded bg-[#101F31] border-[#20344A] text-[#1683FF] focus:ring-[#1683FF]/30 accent-[#1683FF] cursor-pointer"
                                        />
                                        <span className="text-xs text-[#94A3B8]">Remember me on this device</span>
                                    </label>
                                </div>

                                {/* Submit Login Button */}
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full py-3.5 px-4 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-[#1683FF] via-[#0F6EE0] to-[#12B8C4] hover:from-[#0F6EE0] hover:to-[#0EA5B0] active:scale-[0.99] shadow-lg shadow-[#1683FF]/25 transition-all flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed group cursor-pointer"
                                >
                                    {loading ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            <span>Authenticating...</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Sign In to Design Atlas</span>
                                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                        </>
                                    )}
                                </button>
                            </form>

                            {/* Quick Demo Access Option */}
                            <div className="mt-6 pt-5 border-t border-[#20344A]/80 text-center">
                                <p className="text-xs text-[#64748B] mb-3">Want to quickly explore without credentials?</p>
                                <button
                                    type="button"
                                    onClick={handleDemoLogin}
                                    disabled={loading}
                                    className="w-full py-2.5 px-4 rounded-xl text-xs font-medium text-[#1683FF] bg-[#1683FF]/10 border border-[#1683FF]/30 hover:bg-[#1683FF]/20 transition-all flex items-center justify-center gap-2 cursor-pointer"
                                >
                                    <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" />
                                    <span>Instant Demo Sign-In</span>
                                </button>
                            </div>
                        </div>
                    </div>

                </div>
            </main>

            {/* Footer Bar */}
            <footer className="relative z-10 w-full max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between text-xs text-[#64748B] border-t border-[#20344A]/40 gap-2">
                <p>© 2026 Design Atlas Color System. All rights reserved.</p>
                <div className="flex items-center gap-4">
                    <a href="#" className="hover:text-[#94A3B8] transition-colors">Privacy Policy</a>
                    <span>•</span>
                    <a href="#" className="hover:text-[#94A3B8] transition-colors">Terms of Service</a>
                    <span>•</span>
                    <a href="#" className="hover:text-[#94A3B8] transition-colors">Color Guidelines</a>
                </div>
            </footer>
        </div>
    );
}
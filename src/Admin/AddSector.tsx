import React, { useState, useEffect } from 'react';
import {
    ArrowLeft,
    Save,
    Building2,
    Palette,
    Sliders,
    Type,
    Layout,
    CheckCircle2,
    XCircle,
    Plus,
    Trash2,
    X,
    Eye,

} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import type { Sector } from '../types/sector';
import { sectors } from '../data/sectors';

// Multiple Color Combination Option Model
export interface ColorSwatchItem {
    id: string;
    label: string; // e.g. "Primary", "Secondary", "Accent"
    hex: string;
    name: string;  // e.g. "Deep Navy"
}

export interface ColorCombinationOption {
    id: string;
    optionTitle: string; // e.g. "Option 1 - Official Civic Navy"
    swatches: ColorSwatchItem[];
}

// Multiple Typography Option Model
export interface FontCombinationOption {
    id: string;
    optionTitle: string; // e.g. "Option 1 - Modern Clean Sans"
    headingFont: string;
    bodyFont: string;
    sampleHeadingText: string;
    sampleParagraphText: string;
    notes: string;
}

export default function AddSector() {
    const navigate = useNavigate();

    // Tabbed form section state
    const [activeTab, setActiveTab] = useState<'basic' | 'colors' | 'personality' | 'typography' | 'imagery'>('basic');
    const [toastMessage, setToastMessage] = useState<string | null>(null);

    // 1. Color Combination Options State (User can add as many as they want)
    const [colorOptions, setColorOptions] = useState<ColorCombinationOption[]>([
        {
            id: 'color-opt-1',
            optionTitle: 'Option 1 - Deep Civic Trust (Recommended)',
            swatches: [
                { id: 'c1-1', label: 'Primary', hex: '#123B63', name: 'Deep Navy Blue' },
                { id: 'c1-2', label: 'Secondary', hex: '#1F5F95', name: 'Civic Azure' },
                { id: 'c1-3', label: 'Accent', hex: '#C9972B', name: 'Official Gold' },
                { id: 'c1-4', label: 'Surface', hex: '#0B1626', name: 'Dark Surface' },
                { id: 'c1-5', label: 'Background', hex: '#07111F', name: 'Base Background' }
            ]
        },
        {
            id: 'color-opt-[#2]',
            optionTitle: 'Option 2 - High Contrast Vibrant Teal',
            swatches: [
                { id: 'c2-1', label: 'Primary', hex: '#0F5257', name: 'Deep Teal' },
                { id: 'c2-2', label: 'Secondary', hex: '#0B848F', name: 'Ocean Cyan' },
                { id: 'c2-3', label: 'Accent', hex: '#E65100', name: 'Energetic Amber' },
                { id: 'c2-4', label: 'Surface', hex: '#0A1A1C', name: 'Midnight Cyan' },
                { id: 'c2-5', label: 'Background', hex: '#050E0F', name: 'Deep Abyss' }
            ]
        },
        {
            id: 'color-opt-[#3]',
            optionTitle: 'Option 3 - Institutional Royal Gold',
            swatches: [
                { id: 'c3-1', label: 'Primary', hex: '#1A237E', name: 'Imperial Indigo' },
                { id: 'c3-2', label: 'Secondary', hex: '#283593', name: 'Royal Blue' },
                { id: 'c3-3', label: 'Accent', hex: '#FFD700', name: 'Prestige Gold' },
                { id: 'c3-4', label: 'Surface', hex: '#0D1B2A', name: 'Slate Surface' }
            ]
        }
    ]);

    // 2. Font Combination Options State (User can add as many as they want)
    const [fontOptions, setFontOptions] = useState<FontCombinationOption[]>([
        {
            id: 'font-opt-1',
            optionTitle: 'Option 1 - Inter Clean Sans (Universal Accessibility)',
            headingFont: 'Inter',
            bodyFont: 'Inter',
            sampleHeadingText: 'Empowering Citizens Through Intuitive UI',
            sampleParagraphText: 'Government and public administration interfaces demand clarity, high readability, and reliable typographic hierarchy across all age groups and devices.',
            notes: 'Best for civic services, municipal portals, and mobile app design.'
        },
        {
            id: 'font-opt-2',
            optionTitle: 'Option 2 - Playfair Display & Source Sans (Institutional Elegance)',
            headingFont: 'Playfair Display',
            bodyFont: 'Source Sans Pro',
            sampleHeadingText: 'Official Public Administration & Gazette Portal',
            sampleParagraphText: 'Combining a stately serif heading with a clean sans-serif body text creates visual authority and formal elegance for policy frameworks.',
            notes: 'Recommended for legal, governmental publications, and heritage archives.'
        },
        {
            id: 'font-opt-3',
            optionTitle: 'Option 3 - Outfit & Roboto (Modern Digital Dashboard)',
            headingFont: 'Outfit',
            bodyFont: 'Roboto',
            sampleHeadingText: 'Smart City Analytics & Real-Time Open Data',
            sampleParagraphText: 'A geometric sans heading paired with highly legible body text optimized for dense numerical tables and data charts.',
            notes: 'Ideal for city analytics, data visualization, and open data portals.'
        }
    ]);

    // Main Sector Form State
    const [sectorData, setSectorData] = useState<Sector>({
        id: 'government-custom',
        name: 'Government & Public Sector',
        category: 'Public Administration',
        icon: '🏛️',
        shortDescription: 'Government and public administration UI design focuses on trust, transparency, and accessibility for all citizens.',
        description: 'A comprehensive design guide tailored for civic services, municipal portals, and public administration dashboards requiring high contrast, universal accessibility, and institutional trust.',
        keywords: ['trust', 'government', 'civic', 'public', 'accessibility', 'transparent'],
        character: ['Trustworthy', 'Professional', 'Stable', 'Accessible', 'Institutional', 'Transparent'],
        personality: {
            trust: 95,
            professional: 90,
            serious: 85,
            modern: 65,
            friendly: 55,
            luxury: 15,
            playful: 10,
        },
        colors: {
            primary: '#123B63',
            primaryName: 'Deep Navy Blue',
            secondary: '#1F5F95',
            secondaryName: 'Civic Blue',
            accent: '#C9972B',
            accentName: 'Official Gold',
            background: '#07111F',
            surface: '#0B1626',
            text: '#F4F7FB'
        },
        typography: {
            heading: 'Inter',
            body: 'Inter',
            display: 'Inter',
            mono: 'JetBrains Mono',
            weights: ['400', '500', '600', '700'],
            scale: 'Major Third (1.250)',
            notes: 'Clean sans-serif for high legibility across all age groups.'
        },
        layout: {
            style: 'Structured Grid',
            density: 'Medium',
            grid: '12-column responsive',
            gutter: '24px',
            container: '1280px max-width',
            sectionSpacing: '64px',
            cardSpacing: '24px'
        },
        shapes: {
            cardRadius: '16px',
            buttonRadius: '12px',
            inputRadius: '12px',
            borderStyle: '1px solid #20344A',
            shadowStyle: '0 4px 12px rgba(0, 0, 0, 0.3)'
        },
        imagery: {
            recommended: ['Official buildings', 'Citizens', 'Maps & Geodata', 'Data visualizations', 'Document icons', 'Diverse people'],
            avoid: ['Stock photo clichés', 'Overly flashy neon', 'Low contrast backgrounds', 'Cluttered graphics']
        },
        components: [
            { name: 'Service Portal Header', notes: 'Top bar with language switch & accessibility controls' },
            { name: 'Status Indicator Pill', notes: 'Color-coded state badge for application tracking' }
        ],
        dosDonts: {
            do: ['Maintain minimum 4.5:1 contrast for text', 'Provide visible focus states for keyboard nav'],
            dont: ['Rely solely on color to convey info', 'Use decorative fonts for body copy']
        },
        accessibility: {
            minContrast: '7:1 (AAA standard)',
            keyboardNav: 'Full tab navigation with visible focus ring',
            screenReader: 'ARIA labels on all controls',
            colorBlindness: 'Deuteranopia safe choice',
            focusState: '2px solid #1683FF'
        },
        sampleUI: [
            {
                id: 'portal-1',
                title: 'Citizen Portal Dashboard',
                type: 'portal',
                description: 'Unified citizen service dashboard.'
            }
        ]
    });

    // Dynamic Google Font Preloader
    useEffect(() => {
        fontOptions.forEach(opt => {
            [opt.headingFont, opt.bodyFont].forEach(fontName => {
                if (fontName && fontName.trim()) {
                    const fontSlug = fontName.trim().replace(/\s+/g, '+');
                    const linkId = `google-font-${fontSlug}`;
                    if (!document.getElementById(linkId)) {
                        const link = document.createElement('link');
                        link.id = linkId;
                        link.rel = 'stylesheet';
                        link.href = `https://fonts.googleapis.com/css2?family=${fontSlug}:wght@400;600;700&display=swap`;
                        document.head.appendChild(link);
                    }
                }
            });
        });
    }, [fontOptions]);

    // Helper Toast Notification
    const showNotification = (msg: string) => {
        setToastMessage(msg);
        setTimeout(() => setToastMessage(null), 3200);
    };

    // --- COLOR OPTION HANDLERS ---
    const handleAddColorOption = () => {
        const nextNum = colorOptions.length + 1;
        const newOpt: ColorCombinationOption = {
            id: `color-opt-${Date.now()}`,
            optionTitle: `Option ${nextNum} - Custom Palette`,
            swatches: [
                { id: `c-${Date.now()}-1`, label: 'Primary', hex: '#1683FF', name: 'Primary Accent' },
                { id: `c-${Date.now()}-2`, label: 'Secondary', hex: '#12B8C4', name: 'Secondary Teal' },
                { id: `c-${Date.now()}-3`, label: 'Accent', hex: '#8B5CF6', name: 'Purple Accent' }
            ]
        };
        setColorOptions([...colorOptions, newOpt]);
        showNotification(`Added new Color Combination Option ${nextNum}!`);
    };

    const handleRemoveColorOption = (id: string) => {
        if (colorOptions.length <= 1) {
            showNotification('At least one color option is required.');
            return;
        }
        setColorOptions(colorOptions.filter(o => o.id !== id));
    };

    const handleAddSwatchToOption = (optionId: string) => {
        setColorOptions(colorOptions.map(opt => {
            if (opt.id === optionId) {
                const nextSwatchNum = opt.swatches.length + 1;
                const newSwatch: ColorSwatchItem = {
                    id: `swatch-${Date.now()}`,
                    label: `Color ${nextSwatchNum}`,
                    hex: '#38BDF8',
                    name: 'New Color'
                };
                return { ...opt, swatches: [...opt.swatches, newSwatch] };
            }
            return opt;
        }));
    };

    const handleRemoveSwatchFromOption = (optionId: string, swatchId: string) => {
        setColorOptions(colorOptions.map(opt => {
            if (opt.id === optionId) {
                if (opt.swatches.length <= 1) return opt;
                return { ...opt, swatches: opt.swatches.filter(s => s.id !== swatchId) };
            }
            return opt;
        }));
    };

    const handleUpdateSwatch = (optionId: string, swatchId: string, field: keyof ColorSwatchItem, val: string) => {
        setColorOptions(colorOptions.map(opt => {
            if (opt.id === optionId) {
                return {
                    ...opt,
                    swatches: opt.swatches.map(sw => sw.id === swatchId ? { ...sw, [field]: val } : sw)
                };
            }
            return opt;
        }));
    };

    // --- FONT OPTION HANDLERS ---
    const handleAddFontOption = () => {
        const nextNum = fontOptions.length + 1;
        const newFontOpt: FontCombinationOption = {
            id: `font-opt-${Date.now()}`,
            optionTitle: `Option ${nextNum} - Custom Font Combination`,
            headingFont: 'Montserrat',
            bodyFont: 'Open Sans',
            sampleHeadingText: 'Accessible Typography & Visual Contrast',
            sampleParagraphText: 'Consistent font pairings elevate user confidence, ensure effortless reading, and optimize accessibility across devices.',
            notes: 'Custom typographic combination added for specific branding requirements.'
        };
        setFontOptions([...fontOptions, newFontOpt]);
        showNotification(`Added new Font Combination Option ${nextNum}!`);
    };

    const handleRemoveFontOption = (id: string) => {
        if (fontOptions.length <= 1) {
            showNotification('At least one font combination option is required.');
            return;
        }
        setFontOptions(fontOptions.filter(f => f.id !== id));
    };

    const handleUpdateFontOption = (id: string, field: keyof FontCombinationOption, val: string) => {
        setFontOptions(fontOptions.map(opt => opt.id === id ? { ...opt, [field]: val } : opt));
    };

    // Dynamic Character & Keyword Handlers
    const [newCharacterTag, setNewCharacterTag] = useState('');
    const [newRecImage, setNewRecImage] = useState('');
    const [newAvoidImage, setNewAvoidImage] = useState('');

    const handleAddCharacterTag = () => {
        if (newCharacterTag.trim() && !sectorData.character.includes(newCharacterTag.trim())) {
            setSectorData({ ...sectorData, character: [...sectorData.character, newCharacterTag.trim()] });
            setNewCharacterTag('');
        }
    };

    const handleRemoveCharacterTag = (tag: string) => {
        setSectorData({ ...sectorData, character: sectorData.character.filter(t => t !== tag) });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Attach chosen primary color option & fonts to main sector model
        const primaryOption = colorOptions[0];
        if (primaryOption && primaryOption.swatches.length >= 3) {
            sectorData.colors.primary = primaryOption.swatches[0].hex;
            sectorData.colors.primaryName = primaryOption.swatches[0].name;
            sectorData.colors.secondary = primaryOption.swatches[1].hex;
            sectorData.colors.secondaryName = primaryOption.swatches[1].name;
            sectorData.colors.accent = primaryOption.swatches[2].hex;
            sectorData.colors.accentName = primaryOption.swatches[2].name;
        }

        const primaryFont = fontOptions[0];
        if (primaryFont) {
            sectorData.typography.heading = primaryFont.headingFont;
            sectorData.typography.body = primaryFont.bodyFont;
        }

        sectors.unshift(sectorData);
        showNotification(`Sector "${sectorData.name}" added successfully with ${colorOptions.length} Color Options & ${fontOptions.length} Font Combinations!`);
        setTimeout(() => {
            navigate('/admin');
        }, 1400);
    };

    return (
        <div className="space-y-8 pb-16 max-w-6xl mx-auto font-sans text-[#F4F7FB]">

            {/* Notification Toast */}
            {toastMessage && (
                <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-[#0E1A2B] border border-[#20364F] shadow-2xl animate-in slide-in-from-bottom-5 duration-200">
                    <CheckCircle2 size={20} className="text-[#10B981]" />
                    <span className="text-sm font-semibold text-[#F4F7FB]">{toastMessage}</span>
                </div>
            )}

            {/* Top Header & Breadcrumb */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E334D]">
                <div>
                    <div className="flex items-center gap-2 text-xs text-[#64748B] mb-1">
                        <span className="hover:text-[#38BDF8] cursor-pointer" onClick={() => navigate('/admin')}>Admin</span>
                        <span>/</span>
                        <span className="hover:text-[#38BDF8] cursor-pointer" onClick={() => navigate('/admin')}>Sectors</span>
                        <span>/</span>
                        <span className="text-[#38BDF8] font-semibold">Add New Sector Guide</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-extrabold text-white flex items-center gap-3">
                        <button
                            onClick={() => navigate('/admin')}
                            className="p-2 rounded-xl bg-[#101F31] text-[#94A3B8] hover:text-white border border-[#20344A] hover:border-[#1683FF]/50 transition-all cursor-pointer"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <span>Add Sector Design Framework</span>
                    </h1>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                    <button
                        type="button"
                        onClick={() => navigate('/admin')}
                        className="px-4 py-2.5 rounded-xl bg-[#101F31] hover:bg-[#16273D] border border-[#20344A] text-xs font-semibold text-[#94A3B8] hover:text-white transition-all cursor-pointer"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1683FF] to-[#0F6EE0] text-white text-xs font-bold shadow-[0_0_15px_rgba(22,131,255,0.4)] hover:shadow-[0_0_20px_rgba(22,131,255,0.6)] transition-all cursor-pointer"
                    >
                        <Save size={16} />
                        <span>Save Sector Guide</span>
                    </button>
                </div>
            </div>

            {/* Main Full-Width Form Section */}
            <div className="space-y-6">

                {/* Navigation Tabs */}
                <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#0B1626] border border-[#1E334D] overflow-x-auto scrollbar-none">
                    {[
                        { id: 'basic', label: '1. Overview', icon: Building2 },
                        { id: 'colors', label: `2. Color Options (${colorOptions.length})`, icon: Palette },
                        { id: 'typography', label: `3. Font Options (${fontOptions.length})`, icon: Type },
                        { id: 'personality', label: '4. Personality Profile', icon: Sliders },
                        { id: 'imagery', label: '5. Imagery & Rules', icon: Layout }
                    ].map(tab => {
                        const Icon = tab.icon;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`
                  flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer
                  ${activeTab === tab.id
                                        ? 'bg-[#1683FF] text-white shadow-md'
                                        : 'text-[#94A3B8] hover:text-white hover:bg-[#101F31]'
                                    }
                `}
                            >
                                <Icon size={15} />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </div>

                {/* TAB 1: BASIC OVERVIEW & CHARACTER */}
                {activeTab === 'basic' && (
                    <div className="bg-[#0B1626] border border-[#1E334D] rounded-3xl p-6 md:p-8 space-y-6 animate-in fade-in duration-150">
                        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-[#1E334D] pb-3">
                            <Building2 size={18} className="text-[#38BDF8]" />
                            General Sector Information
                        </h3>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Sector Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={sectorData.name}
                                    onChange={(e) => setSectorData({ ...sectorData, name: e.target.value })}
                                    placeholder="e.g. Government & Public Sector"
                                    className="w-full bg-[#07111F] text-[#F4F7FB] text-xs p-3 rounded-xl border border-[#20344A] focus:border-[#1683FF] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Sector Category *</label>
                                <input
                                    type="text"
                                    required
                                    value={sectorData.category || ''}
                                    onChange={(e) => setSectorData({ ...sectorData, category: e.target.value })}
                                    placeholder="e.g. Public Administration, Finance"
                                    className="w-full bg-[#07111F] text-[#F4F7FB] text-xs p-3 rounded-xl border border-[#20344A] focus:border-[#1683FF] focus:outline-none"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                                <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Sector Icon (Emoji)</label>
                                <input
                                    type="text"
                                    value={sectorData.icon || ''}
                                    onChange={(e) => setSectorData({ ...sectorData, icon: e.target.value })}
                                    placeholder="🏛️"
                                    className="w-full bg-[#07111F] text-[#F4F7FB] text-xs p-3 rounded-xl border border-[#20344A] focus:border-[#1683FF] focus:outline-none text-xl"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Sector Unique Slug ID</label>
                                <input
                                    type="text"
                                    value={sectorData.id}
                                    onChange={(e) => setSectorData({ ...sectorData, id: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                                    placeholder="e.g. government"
                                    className="w-full bg-[#07111F] text-[#F4F7FB] text-xs p-3 rounded-xl border border-[#20344A] focus:border-[#1683FF] focus:outline-none font-mono"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Short Description *</label>
                            <textarea
                                rows={2}
                                value={sectorData.shortDescription}
                                onChange={(e) => setSectorData({ ...sectorData, shortDescription: e.target.value })}
                                placeholder="Government and public administration UI design focuses on trust, transparency, and accessibility for all citizens."
                                className="w-full bg-[#07111F] text-[#F4F7FB] text-xs p-3 rounded-xl border border-[#20344A] focus:border-[#1683FF] focus:outline-none leading-relaxed"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Sector Character Traits</label>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {sectorData.character.map(tag => (
                                    <span key={tag} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#101F31] border border-[#20344A] text-xs text-[#38BDF8]">
                                        {tag}
                                        <button type="button" onClick={() => handleRemoveCharacterTag(tag)} className="hover:text-red-400 cursor-pointer">
                                            <X size={12} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2 max-w-md">
                                <input
                                    type="text"
                                    value={newCharacterTag}
                                    onChange={(e) => setNewCharacterTag(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCharacterTag())}
                                    placeholder="Add trait (e.g. Trustworthy, Professional)"
                                    className="flex-1 bg-[#07111F] text-[#F4F7FB] text-xs p-2.5 rounded-xl border border-[#20344A] focus:border-[#1683FF] focus:outline-none"
                                />
                                <button
                                    type="button"
                                    onClick={handleAddCharacterTag}
                                    className="px-4 py-2.5 bg-[#101F31] hover:bg-[#16273D] border border-[#20344A] text-xs font-semibold text-white rounded-xl flex items-center gap-1 cursor-pointer"
                                >
                                    <Plus size={14} /> Add Trait
                                </button>
                            </div>
                        </div>

                    </div>
                )}

                {/* ========================================================
            TAB 2: MULTIPLE COLOR COMBINATION OPTIONS (PALETTES)
           ======================================================== */}
                {activeTab === 'colors' && (
                    <div className="space-y-6 animate-in fade-in duration-150">

                        {/* Top Bar for Adding Color Option */}
                        <div className="bg-[#0B1626] border border-[#1E334D] rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-base font-bold text-white flex items-center gap-2">
                                    <Palette size={20} className="text-[#38BDF8]" />
                                    Color Combination Options ({colorOptions.length} Palettes Configured)
                                </h3>
                                <p className="text-xs text-[#94A3B8] mt-1">
                                    Add multiple color combination options (3 or more colors per palette) so users can choose between different color themes.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={handleAddColorOption}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#1683FF] to-[#0F6EE0] text-white text-xs font-bold shadow-[0_0_15px_rgba(22,131,255,0.4)] hover:shadow-[0_0_20px_rgba(22,131,255,0.6)] transition-all cursor-pointer shrink-0"
                            >
                                <Plus size={16} />
                                <span>+ Add Another Color Palette Option</span>
                            </button>
                        </div>

                        {/* List of Color Options */}
                        <div className="space-y-6">
                            {colorOptions.map((option, index) => (
                                <div
                                    key={option.id}
                                    className="bg-[#0B1626] border border-[#1E334D] rounded-3xl p-6 md:p-8 space-y-6 shadow-xl relative"
                                >
                                    {/* Option Header */}
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E334D]">
                                        <div className="flex items-center gap-3 flex-1">
                                            <span className="w-8 h-8 rounded-xl bg-[#1683FF]/15 text-[#38BDF8] flex items-center justify-center font-bold text-xs">
                                                #{index + 1}
                                            </span>
                                            <input
                                                type="text"
                                                value={option.optionTitle}
                                                onChange={(e) => {
                                                    const val = e.target.value;
                                                    setColorOptions(colorOptions.map(o => o.id === option.id ? { ...o, optionTitle: val } : o));
                                                }}
                                                className="bg-[#07111F] text-white font-bold text-sm px-3.5 py-2 rounded-xl border border-[#20344A] focus:border-[#1683FF] focus:outline-none flex-1 max-w-md"
                                                placeholder="Option Title..."
                                            />
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <button
                                                type="button"
                                                onClick={() => handleAddSwatchToOption(option.id)}
                                                className="px-3.5 py-2 rounded-xl bg-[#101F31] hover:bg-[#16273D] border border-[#20344A] text-xs font-semibold text-[#38BDF8] flex items-center gap-1.5 cursor-pointer"
                                            >
                                                <Plus size={14} /> Add Color Swatch
                                            </button>

                                            {colorOptions.length > 1 && (
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveColorOption(option.id)}
                                                    className="p-2 rounded-xl bg-[#EF4444]/10 hover:bg-[#EF4444]/20 border border-[#EF4444]/25 text-[#EF4444] transition-colors cursor-pointer"
                                                    title="Remove this color option"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            )}
                                        </div>
                                    </div>

                                    {/* Swatches Grid */}
                                    <div>
                                        <label className="block text-xs font-bold text-[#94A3B8] mb-3 uppercase tracking-wider">
                                            Color Swatches ({option.swatches.length} Colors in this Palette)
                                        </label>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                            {option.swatches.map((swatch) => (
                                                <div
                                                    key={swatch.id}
                                                    className="p-4 rounded-2xl bg-[#07111F] border border-[#20344A] space-y-3 relative group"
                                                >
                                                    {/* Top bar: label + color picker */}
                                                    <div className="flex items-center justify-between">
                                                        <input
                                                            type="text"
                                                            value={swatch.label}
                                                            onChange={(e) => handleUpdateSwatch(option.id, swatch.id, 'label', e.target.value)}
                                                            className="bg-transparent text-white font-bold text-xs focus:outline-none w-24"
                                                            placeholder="Label..."
                                                        />

                                                        <div className="flex items-center gap-1.5">
                                                            <input
                                                                type="color"
                                                                value={swatch.hex}
                                                                onChange={(e) => handleUpdateSwatch(option.id, swatch.id, 'hex', e.target.value)}
                                                                className="w-7 h-7 rounded-lg cursor-pointer border border-[#20344A] bg-transparent"
                                                            />

                                                            {option.swatches.length > 1 && (
                                                                <button
                                                                    type="button"
                                                                    onClick={() => handleRemoveSwatchFromOption(option.id, swatch.id)}
                                                                    className="text-[#64748B] hover:text-[#EF4444] p-1"
                                                                >
                                                                    <X size={12} />
                                                                </button>
                                                            )}
                                                        </div>
                                                    </div>

                                                    {/* Color Visual Swatch Preview Box */}
                                                    <div
                                                        className="w-full h-12 rounded-xl shadow-inner border border-white/10 flex items-center justify-center font-mono text-xs font-bold text-white text-shadow"
                                                        style={{ backgroundColor: swatch.hex }}
                                                    >
                                                        {swatch.hex}
                                                    </div>

                                                    {/* Hex Input */}
                                                    <input
                                                        type="text"
                                                        value={swatch.hex}
                                                        onChange={(e) => handleUpdateSwatch(option.id, swatch.id, 'hex', e.target.value)}
                                                        className="w-full bg-[#101F31] text-[#F4F7FB] text-xs p-2 rounded-lg border border-[#20344A] font-mono text-center"
                                                        placeholder="#123B63"
                                                    />

                                                    {/* Name Input */}
                                                    <input
                                                        type="text"
                                                        value={swatch.name || ''}
                                                        onChange={(e) => handleUpdateSwatch(option.id, swatch.id, 'name', e.target.value)}
                                                        className="w-full bg-[#101F31] text-[#94A3B8] text-[11px] p-2 rounded-lg border border-[#20344A]"
                                                        placeholder="Color Name..."
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                </div>
                            ))}
                        </div>

                    </div>
                )}

                {/* ========================================================
            TAB 3: MULTIPLE TYPOGRAPHY / FONT COMBINATION OPTIONS WITH LIVE PREVIEW
           ======================================================== */}
                {activeTab === 'typography' && (
                    <div className="space-y-6 animate-in fade-in duration-150">

                        {/* Top Bar for Adding Font Option */}
                        <div className="bg-[#0B1626] border border-[#1E334D] rounded-3xl p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <div>
                                <h3 className="text-base font-bold text-white flex items-center gap-2">
                                    <Type size={20} className="text-[#38BDF8]" />
                                    Typography Combination Options ({fontOptions.length} Font Pairings Configured)
                                </h3>
                                <p className="text-xs text-[#94A3B8] mt-1">
                                    Add multiple font options with real-time text & paragraph previews for headings and body typography.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={handleAddFontOption}
                                className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white text-xs font-bold shadow-[0_0_15px_rgba(139,92,246,0.4)] hover:shadow-[0_0_20px_rgba(139,92,246,0.6)] transition-all cursor-pointer shrink-0"
                            >
                                <Plus size={16} />
                                <span>+ Add Another Font Combination Option</span>
                            </button>
                        </div>

                        {/* List of Font Options */}
                        <div className="space-y-6">
                            {fontOptions.map((fontOpt, index) => (
                                <div
                                    key={fontOpt.id}
                                    className="bg-[#0B1626] border border-[#1E334D] rounded-3xl p-6 md:p-8 space-y-6 shadow-xl"
                                >

                                    {/* Font Option Title + Remove Button */}
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1E334D]">
                                        <div className="flex items-center gap-3 flex-1">
                                            <span className="w-8 h-8 rounded-xl bg-[#8B5CF6]/15 text-[#C084FC] flex items-center justify-center font-bold text-xs">
                                                #{index + 1}
                                            </span>
                                            <input
                                                type="text"
                                                value={fontOpt.optionTitle}
                                                onChange={(e) => handleUpdateFontOption(fontOpt.id, 'optionTitle', e.target.value)}
                                                className="bg-[#07111F] text-white font-bold text-sm px-3.5 py-2 rounded-xl border border-[#20344A] focus:border-[#8B5CF6] focus:outline-none flex-1 max-w-md"
                                                placeholder="Font Option Title..."
                                            />
                                        </div>

                                        {fontOptions.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveFontOption(fontOpt.id)}
                                                className="p-2 rounded-xl bg-[#EF4444]/10 hover:bg-[#EF4444]/20 border border-[#EF4444]/25 text-[#EF4444] transition-colors cursor-pointer self-start sm:self-auto"
                                                title="Remove this font option"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        )}
                                    </div>

                                    {/* Inputs for Heading Font & Body Font */}
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                                        <div>
                                            <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">
                                                Heading Font Family (e.g. Inter, Playfair Display, Outfit, Montserrat)
                                            </label>
                                            <input
                                                type="text"
                                                value={fontOpt.headingFont}
                                                onChange={(e) => handleUpdateFontOption(fontOpt.id, 'headingFont', e.target.value)}
                                                className="w-full bg-[#07111F] text-[#F4F7FB] text-xs p-3 rounded-xl border border-[#20344A] focus:border-[#8B5CF6] focus:outline-none"
                                                placeholder="Heading Font Name..."
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">
                                                Body Font Family (e.g. Inter, Roboto, Source Sans Pro, Open Sans)
                                            </label>
                                            <input
                                                type="text"
                                                value={fontOpt.bodyFont}
                                                onChange={(e) => handleUpdateFontOption(fontOpt.id, 'bodyFont', e.target.value)}
                                                className="w-full bg-[#07111F] text-[#F4F7FB] text-xs p-3 rounded-xl border border-[#20344A] focus:border-[#8B5CF6] focus:outline-none"
                                                placeholder="Body Font Name..."
                                            />
                                        </div>
                                    </div>

                                    {/* Notes / Recommendation context */}
                                    <div>
                                        <label className="block text-xs font-semibold text-[#94A3B8] mb-1.5">Typographic Notes & Usage Context</label>
                                        <input
                                            type="text"
                                            value={fontOpt.notes}
                                            onChange={(e) => handleUpdateFontOption(fontOpt.id, 'notes', e.target.value)}
                                            className="w-full bg-[#07111F] text-[#94A3B8] text-xs p-2.5 rounded-xl border border-[#20344A]"
                                            placeholder="e.g. Recommended for high-density portals..."
                                        />
                                    </div>

                                    {/* ========================================================
                      LIVE REAL-TIME FONT PREVIEW CARD WITH DUMMY TEXT & PARAGRAPH
                     ======================================================== */}
                                    <div className="p-5 md:p-6 rounded-2xl bg-[#07111F] border border-[#20344A] space-y-4 shadow-inner">
                                        <div className="flex items-center justify-between border-b border-[#1E334D] pb-3">
                                            <span className="text-xs font-bold text-[#C084FC] flex items-center gap-2">
                                                <Eye size={16} /> Live Font Render Preview
                                            </span>
                                            <div className="flex items-center gap-2 text-[11px] text-[#64748B] font-mono">
                                                <span className="px-2 py-0.5 rounded bg-[#101F31] border border-[#20344A]">Heading: {fontOpt.headingFont}</span>
                                                <span className="px-2 py-0.5 rounded bg-[#101F31] border border-[#20344A]">Body: {fontOpt.bodyFont}</span>
                                            </div>
                                        </div>

                                        {/* Editable Sample Heading Text */}
                                        <div className="space-y-1">
                                            <label className="block text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                                                Heading Preview (Editable)
                                            </label>
                                            <input
                                                type="text"
                                                value={fontOpt.sampleHeadingText}
                                                onChange={(e) => handleUpdateFontOption(fontOpt.id, 'sampleHeadingText', e.target.value)}
                                                className="w-full bg-transparent text-[#F4F7FB] text-xl md:text-2xl font-bold focus:outline-none focus:bg-[#0B1626]/50 p-2 rounded-lg transition-all"
                                                style={{ fontFamily: fontOpt.headingFont || 'sans-serif' }}
                                            />
                                        </div>

                                        {/* Editable Sample Paragraph Text */}
                                        <div className="space-y-1">
                                            <label className="block text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                                                Paragraph Preview (Editable)
                                            </label>
                                            <textarea
                                                rows={3}
                                                value={fontOpt.sampleParagraphText}
                                                onChange={(e) => handleUpdateFontOption(fontOpt.id, 'sampleParagraphText', e.target.value)}
                                                className="w-full bg-transparent text-[#94A3B8] text-sm leading-relaxed focus:outline-none focus:bg-[#0B1626]/50 p-2 rounded-lg transition-all"
                                                style={{ fontFamily: fontOpt.bodyFont || 'sans-serif' }}
                                            />
                                        </div>

                                        {/* Button & Badge Component Previews */}
                                        <div className="pt-2 flex flex-wrap items-center gap-3 border-t border-[#1C314A]">
                                            <button
                                                type="button"
                                                className="px-4 py-2 rounded-xl bg-[#1683FF] text-white text-xs font-semibold shadow-md"
                                                style={{ fontFamily: fontOpt.bodyFont || 'sans-serif' }}
                                            >
                                                Sample Primary Button
                                            </button>

                                            <span
                                                className="px-3 py-1 rounded-full bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30 text-xs font-medium"
                                                style={{ fontFamily: fontOpt.bodyFont || 'sans-serif' }}
                                            >
                                                Sample UI Pill Badge
                                            </span>
                                        </div>

                                    </div>

                                </div>
                            ))}
                        </div>

                    </div>
                )}

                {/* TAB 4: PERSONALITY PROFILE */}
                {activeTab === 'personality' && (
                    <div className="bg-[#0B1626] border border-[#1E334D] rounded-3xl p-6 md:p-8 space-y-6 animate-in fade-in duration-150">
                        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-[#1E334D] pb-3">
                            <Sliders size={18} className="text-[#38BDF8]" />
                            Personality Profile Sliders (0 - 100%)
                        </h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {[
                                { key: 'trust', label: 'Trust' },
                                { key: 'professional', label: 'Professional' },
                                { key: 'serious', label: 'Serious' },
                                { key: 'modern', label: 'Modern' },
                                { key: 'friendly', label: 'Friendly' },
                                { key: 'luxury', label: 'Luxury' },
                                { key: 'playful', label: 'Playful' }
                            ].map((item) => {
                                const val = (sectorData.personality as any)[item.key] || 0;
                                return (
                                    <div key={item.key} className="space-y-2 p-3.5 rounded-2xl bg-[#07111F] border border-[#20344A]">
                                        <div className="flex justify-between text-xs font-semibold">
                                            <span className="text-[#94A3B8]">{item.label}</span>
                                            <span className="text-[#38BDF8] font-mono">{val}%</span>
                                        </div>
                                        <input
                                            type="range"
                                            min="0"
                                            max="100"
                                            value={val}
                                            onChange={(e) => setSectorData({
                                                ...sectorData,
                                                personality: {
                                                    ...sectorData.personality,
                                                    [item.key]: parseInt(e.target.value, 10)
                                                }
                                            })}
                                            className="w-full h-2 bg-[#101F31] rounded-lg appearance-none cursor-pointer accent-[#1683FF]"
                                        />
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* TAB 5: IMAGERY & ACCESSIBILITY */}
                {activeTab === 'imagery' && (
                    <div className="bg-[#0B1626] border border-[#1E334D] rounded-3xl p-6 md:p-8 space-y-6 animate-in fade-in duration-150">
                        <h3 className="text-base font-bold text-white flex items-center gap-2 border-b border-[#1E334D] pb-3">
                            <Layout size={18} className="text-[#38BDF8]" />
                            Imagery & Accessibility Rules
                        </h3>

                        {/* Recommended Imagery List */}
                        <div className="space-y-3">
                            <label className="block text-xs font-semibold text-[#10B981] flex items-center gap-1.5">
                                <CheckCircle2 size={16} /> Recommended Imagery Keywords
                            </label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {sectorData.imagery.recommended.map(item => (
                                    <span key={item} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#10B981]/15 text-[#34D399] border border-[#10B981]/30 text-xs">
                                        • {item}
                                        <button type="button" onClick={() => setSectorData({
                                            ...sectorData,
                                            imagery: { ...sectorData.imagery, recommended: sectorData.imagery.recommended.filter(i => i !== item) }
                                        })} className="hover:text-red-400 cursor-pointer">
                                            <X size={12} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2 max-w-md">
                                <input
                                    type="text"
                                    value={newRecImage}
                                    onChange={(e) => setNewRecImage(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            if (newRecImage.trim()) {
                                                setSectorData({
                                                    ...sectorData,
                                                    imagery: { ...sectorData.imagery, recommended: [...sectorData.imagery.recommended, newRecImage.trim()] }
                                                });
                                                setNewRecImage('');
                                            }
                                        }
                                    }}
                                    placeholder="e.g. Official buildings, Maps"
                                    className="flex-1 bg-[#07111F] text-[#F4F7FB] text-xs p-2.5 rounded-xl border border-[#20344A]"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (newRecImage.trim()) {
                                            setSectorData({
                                                ...sectorData,
                                                imagery: { ...sectorData.imagery, recommended: [...sectorData.imagery.recommended, newRecImage.trim()] }
                                            });
                                            setNewRecImage('');
                                        }
                                    }}
                                    className="px-4 py-2.5 bg-[#101F31] hover:bg-[#16273D] border border-[#20344A] text-xs font-semibold text-white rounded-xl cursor-pointer"
                                >
                                    Add Keyword
                                </button>
                            </div>
                        </div>

                        {/* Avoid Imagery List */}
                        <div className="space-y-3 pt-3">
                            <label className="block text-xs font-semibold text-[#EF4444] flex items-center gap-1.5">
                                <XCircle size={16} /> Imagery to Avoid
                            </label>
                            <div className="flex flex-wrap gap-2 mb-2">
                                {sectorData.imagery.avoid.map(item => (
                                    <span key={item} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#EF4444]/15 text-[#F87171] border border-[#EF4444]/30 text-xs">
                                        ✕ {item}
                                        <button type="button" onClick={() => setSectorData({
                                            ...sectorData,
                                            imagery: { ...sectorData.imagery, avoid: sectorData.imagery.avoid.filter(i => i !== item) }
                                        })} className="hover:text-red-400 cursor-pointer">
                                            <X size={12} />
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex gap-2 max-w-md">
                                <input
                                    type="text"
                                    value={newAvoidImage}
                                    onChange={(e) => setNewAvoidImage(e.target.value)}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter') {
                                            e.preventDefault();
                                            if (newAvoidImage.trim()) {
                                                setSectorData({
                                                    ...sectorData,
                                                    imagery: { ...sectorData.imagery, avoid: [...sectorData.imagery.avoid, newAvoidImage.trim()] }
                                                });
                                                setNewAvoidImage('');
                                            }
                                        }
                                    }}
                                    placeholder="e.g. Stock photo clichés"
                                    className="flex-1 bg-[#07111F] text-[#F4F7FB] text-xs p-2.5 rounded-xl border border-[#20344A]"
                                />
                                <button
                                    type="button"
                                    onClick={() => {
                                        if (newAvoidImage.trim()) {
                                            setSectorData({
                                                ...sectorData,
                                                imagery: { ...sectorData.imagery, avoid: [...sectorData.imagery.avoid, newAvoidImage.trim()] }
                                            });
                                            setNewAvoidImage('');
                                        }
                                    }}
                                    className="px-4 py-2.5 bg-[#101F31] hover:bg-[#16273D] border border-[#20344A] text-xs font-semibold text-white rounded-xl cursor-pointer"
                                >
                                    Add Avoid Rule
                                </button>
                            </div>
                        </div>

                    </div>
                )}

            </div>

        </div>
    );
}
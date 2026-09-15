import React, { useState, useEffect } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { LogoUploader } from '../components/brand/LogoUploader';
import { BrandColorSelector } from '../components/brand/BrandColorSelector';
import { BrandSampleUI } from '../components/brand/BrandSampleUI';
import { BrandExport } from '../components/brand/BrandExport';
import { ColorScale } from '../components/colors/ColorScale';
import { Button } from '../components/common/Button';
import type { GeneratedPalette } from '../types/color';
import { extractColorsFromImage, type ExtractedColor } from '../utils/colorExtractor';
import { generateColorScale, generateGrayScale } from '../utils/colorScale';
import { Sparkles, ArrowRight, ArrowLeft, RefreshCw, Wand2, Check } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'designatlas_create_design_state';

const steps = [
  { id: 1, label: 'Upload Logo' },
  { id: 2, label: 'Brand Colors' },
  { id: 3, label: 'Generate' },
  { id: 4, label: 'Preview UI' },
];

export const CreateDesign: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Form State
  const [logoUrl, setLogoUrl] = useState<string | null>(null);
  const [logoFileName, setLogoFileName] = useState<string | null>(null);
  const [extractedColors, setExtractedColors] = useState<ExtractedColor[]>([]);

  // Color selections directly taken from logo
  const [primary, setPrimary] = useState<string>('#1683FF');
  const [secondary, setSecondary] = useState<string>('#12B8C4');
  const [accent, setAccent] = useState<string>('#F4B942');
  const [lockedColors, setLockedColors] = useState<{ primary: boolean; secondary: boolean; accent: boolean }>({
    primary: false,
    secondary: false,
    accent: false,
  });

  // Generated palette
  const [generatedPalette, setGeneratedPalette] = useState<GeneratedPalette | null>(null);

  // Load state from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.logoUrl) setLogoUrl(parsed.logoUrl);
        if (parsed.logoFileName) setLogoFileName(parsed.logoFileName);
        if (parsed.extractedColors) setExtractedColors(parsed.extractedColors);
        if (parsed.primary) setPrimary(parsed.primary);
        if (parsed.secondary) setSecondary(parsed.secondary);
        if (parsed.accent) setAccent(parsed.accent);
      }
    } catch {
      // Ignore storage read errors
    }
  }, []);

  // Save state to localStorage on updates
  useEffect(() => {
    try {
      const stateToSave = {
        logoUrl,
        logoFileName,
        extractedColors,
        primary,
        secondary,
        accent,
      };
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(stateToSave));
    } catch {
      // Ignore storage write errors
    }
  }, [logoUrl, logoFileName, extractedColors, primary, secondary, accent]);

  // Handle Logo Upload & Color Extraction
  const handleLogoSelected = async (file: File, dataUrl: string) => {
    setLogoUrl(dataUrl);
    setLogoFileName(file.name);

    const colors = await extractColorsFromImage(file);
    setExtractedColors(colors);

    // Directly assign top extracted colors from the logo
    if (colors.length > 0) {
      if (!lockedColors.primary) setPrimary(colors[0].hex);
      if (colors.length > 1 && !lockedColors.secondary) setSecondary(colors[1].hex);
      if (colors.length > 2 && !lockedColors.accent) setAccent(colors[2].hex);
    }
  };

  const handleClearLogo = () => {
    setLogoUrl(null);
    setLogoFileName(null);
    setExtractedColors([]);
  };

  const handlePrimaryChange = (hex: string) => {
    setPrimary(hex);
  };

  const handleSecondaryChange = (hex: string) => {
    setSecondary(hex);
  };

  const handleAccentChange = (hex: string) => {
    setAccent(hex);
  };

  // Generate color system & sample UI directly from logo colors
  const handleGenerateDesignSystem = () => {
    const pScale = generateColorScale(primary);
    const sScale = generateColorScale(secondary);
    const gScale = generateGrayScale('#27272A');

    const palette: GeneratedPalette = {
      primary: pScale,
      secondary: sScale,
      gray: gScale,
      baseColors: { primary, secondary, gray: '#27272A' },
      generatedAt: Date.now(),
    };

    setGeneratedPalette(palette);
    setCurrentStep(4); // Move to Preview
  };

  const handleToggleLock = (key: 'primary' | 'secondary' | 'accent') => {
    setLockedColors(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-screen py-8">
      <PageContainer>
        {/* Page Header */}
        <div className="mb-8 text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-[rgba(22,131,255,0.1)] border border-[rgba(22,131,255,0.25)] rounded-full mb-4">
            <Wand2 size={14} className="text-[#1683FF]" />
            <span className="text-[#1683FF] text-xs font-semibold">Direct Brand UI Generator</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#F4F7FB] mb-3 tracking-tight">
            Create My Design
          </h1>
          <p className="text-[#94A3B8] text-base leading-relaxed">
            Upload your brand logo to automatically extract colors and generate a complete personalized sample UI.
          </p>
        </div>

        {/* Progress Stepper */}
        <div className="mb-10 max-w-3xl mx-auto">
          <div className="flex items-center justify-between relative">
            {/* Connecting line */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#20344A] -translate-y-1/2 z-0" />

            {steps.map((step) => {
              const isDone = step.id < currentStep;
              const isCurrent = step.id === currentStep;

              return (
                <button
                  type="button"
                  key={step.id}
                  onClick={() => {
                    if (step.id <= currentStep || (step.id === 4 && generatedPalette)) {
                      setCurrentStep(step.id);
                    }
                  }}
                  className={`relative z-10 flex flex-col items-center gap-2 bg-[#0B1626] px-3 transition-all ${step.id <= currentStep ? 'cursor-pointer' : 'cursor-not-allowed opacity-60'
                    }`}
                >
                  <div
                    className={`
                      w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm border transition-all duration-250
                      ${isDone
                        ? 'bg-[#1683FF] text-white border-transparent shadow-[0_0_12px_rgba(22,131,255,0.4)]'
                        : isCurrent
                          ? 'bg-[#101F31] text-[#38BDF8] border-[#1683FF] shadow-[0_0_15px_rgba(22,131,255,0.3)] scale-110'
                          : 'bg-[#101F31] text-[#64748B] border-[#20344A]'
                      }
                    `}
                  >
                    {isDone ? <Check size={16} /> : step.id}
                  </div>
                  <span
                    className={`text-xs font-semibold whitespace-nowrap hidden sm:block ${isCurrent ? 'text-[#F4F7FB]' : 'text-[#64748B]'
                      }`}
                  >
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step Contents */}
        <div className="max-w-4xl mx-auto">
          {/* STEP 1: UPLOAD LOGO */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="bg-[#101F31] border border-[#20344A] rounded-2xl p-6">
                <h2 className="text-[#F4F7FB] text-xl font-bold mb-2">
                  Step 1: Upload Your Brand Logo
                </h2>
                <p className="text-[#94A3B8] text-sm mb-6">
                  Select your brand logo file. Colors will be extracted directly from your image.
                </p>

                <LogoUploader
                  logoUrl={logoUrl}
                  logoFileName={logoFileName}
                  onLogoSelected={handleLogoSelected}
                  onClearLogo={handleClearLogo}
                />
              </div>

              <div className="flex justify-end">
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setCurrentStep(2)}
                  rightIcon={<ArrowRight size={16} />}
                  disabled={!logoUrl}
                >
                  Next: Review Logo Colors
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: REVIEW BRAND COLORS TAKEN FROM LOGO */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="bg-[#101F31] border border-[#20344A] rounded-2xl p-6">
                <h2 className="text-[#F4F7FB] text-xl font-bold mb-2">
                  Step 2: Brand Colors Extracted From Logo
                </h2>
                <p className="text-[#94A3B8] text-sm mb-6">
                  Review the colors directly extracted from your logo. Click any swatch or use the eyedropper to adjust.
                </p>

                <BrandColorSelector
                  extractedColors={extractedColors}
                  primary={primary}
                  secondary={secondary}
                  accent={accent}
                  sector={null}
                  locked={lockedColors}
                  autoRecommend={false}
                  onPrimaryChange={handlePrimaryChange}
                  onSecondaryChange={handleSecondaryChange}
                  onAccentChange={handleAccentChange}
                  onToggleLock={handleToggleLock}
                  onToggleAutoRecommend={() => { }}
                />
              </div>

              <div className="flex items-center justify-between">
                <Button
                  variant="secondary"
                  size="lg"
                  onClick={() => setCurrentStep(1)}
                  leftIcon={<ArrowLeft size={16} />}
                >
                  Back
                </Button>
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => setCurrentStep(3)}
                  rightIcon={<ArrowRight size={16} />}
                >
                  Next: Generate Design System
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: GENERATE DESIGN SYSTEM */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="bg-[#101F31] border border-[#20344A] rounded-2xl p-8 text-center space-y-6">
                <div className="w-16 h-16 rounded-2xl bg-[rgba(22,131,255,0.1)] border border-[rgba(22,131,255,0.25)] flex items-center justify-center text-[#1683FF] mx-auto">
                  <Sparkles size={32} />
                </div>

                <div className="max-w-md mx-auto">
                  <h2 className="text-[#F4F7FB] text-2xl font-bold mb-2">
                    Generate Sample UI From Logo Colors
                  </h2>
                  <p className="text-[#94A3B8] text-sm leading-relaxed">
                    We will compile 100–900 OKLCH color scales, design tokens, and render live Dashboard & Public Portal UIs using your brand logo and colors.
                  </p>
                </div>

                {/* Summary Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-sm mx-auto bg-[#0B1626] p-4 rounded-xl border border-[#20344A] text-left">
                  <div>
                    <span className="text-[10px] text-[#64748B] uppercase font-mono">Primary Color</span>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: primary }} />
                      <span className="text-xs font-mono text-[#F4F7FB]">{primary}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#64748B] uppercase font-mono">Secondary Color</span>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="w-4 h-4 rounded-full border border-white/20" style={{ backgroundColor: secondary }} />
                      <span className="text-xs font-mono text-[#F4F7FB]">{secondary}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={handleGenerateDesignSystem}
                    leftIcon={<Wand2 size={18} />}
                    className="px-8 py-3.5 text-base shadow-[0_0_25px_rgba(22,131,255,0.4)]"
                  >
                    Generate Sample UI →
                  </Button>
                </div>
              </div>

              <div className="flex justify-start">
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => setCurrentStep(2)}
                  leftIcon={<ArrowLeft size={16} />}
                >
                  Back
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: PREVIEW BRAND DESIGN & EXPORT */}
          {currentStep === 4 && generatedPalette && (
            <div className="space-y-10">
              {/* Section Header */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#101F31] border border-[#20344A] rounded-2xl p-6">
                <div>
                  <h2 className="text-[#F4F7FB] text-2xl font-bold flex items-center gap-2">
                    Your Generated Brand Sample UI
                  </h2>
                  <p className="text-[#94A3B8] text-sm mt-1">
                    Created directly from your uploaded brand logo & extracted colors
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => setCurrentStep(2)}
                    leftIcon={<RefreshCw size={14} />}
                  >
                    Adjust Colors
                  </Button>
                </div>
              </div>

              {/* Color Scales Preview */}
              <div className="space-y-6">
                <h3 className="text-[#F4F7FB] font-bold text-lg">Generated Brand Color Scales</h3>
                <ColorScale name="Primary Scale" scale={generatedPalette.primary} />
                <ColorScale name="Secondary Scale" scale={generatedPalette.secondary} />
                <ColorScale name="Gray Scale" scale={generatedPalette.gray} />
              </div>

              {/* Live Sample UI Preview */}
              <div className="space-y-4">
                <h3 className="text-[#F4F7FB] font-bold text-lg">Interactive Sample UI Preview</h3>
                <BrandSampleUI
                  logoUrl={logoUrl}
                  sector={null}
                  palette={generatedPalette}
                  onRegenerate={handleGenerateDesignSystem}
                />
              </div>

              {/* Export CSS / JSON */}
              <div className="space-y-4">
                <h3 className="text-[#F4F7FB] font-bold text-lg">Export Brand Tokens</h3>
                <BrandExport
                  palette={generatedPalette}
                  sector={null}
                />
              </div>
            </div>
          )}
        </div>
      </PageContainer>
    </div>
  );
};

export default CreateDesign;

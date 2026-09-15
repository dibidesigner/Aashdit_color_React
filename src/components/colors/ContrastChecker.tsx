import React, { useState, useEffect, useRef, useCallback } from 'react';
import { checkContrast, formatContrastRatio } from '../../utils/contrast';
import { analyzeFullDesignContrast, type DetectedColorPair, type FullDesignContrastReport } from '../../utils/imageContrastAnalyzer';
import { CheckCircle, XCircle, Upload, Clipboard, Pipette, MousePointer, RotateCcw, Sparkles, ShieldCheck, AlertTriangle } from 'lucide-react';

interface ContrastCheckerProps {
  initialFg?: string;
  initialBg?: string;
}

export const ContrastChecker: React.FC<ContrastCheckerProps> = ({
  initialFg = '#F4F7FB',
  initialBg = '#07111F',
}) => {
  const [fg, setFg] = useState(initialFg);
  const [bg, setBg] = useState(initialBg);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [report, setReport] = useState<FullDesignContrastReport | null>(null);
  const [pickTarget, setPickTarget] = useState<'fg' | 'bg'>('fg');
  const [hoverColor, setHoverColor] = useState<string | null>(null);
  const [hoverPos, setHoverPos] = useState<{ x: number; y: number } | null>(null);
  const [isPasting, setIsPasting] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Keep state updated if initial props change
  useEffect(() => {
    setFg(initialFg);
    setBg(initialBg);
  }, [initialFg, initialBg]);

  const result = checkContrast(fg, bg);
  const ratio = formatContrastRatio(result.ratio);

  const getContrastColor = (ratioNum: number): string => {
    if (ratioNum >= 7) return '#10B981';
    if (ratioNum >= 4.5) return '#F59E0B';
    if (ratioNum >= 3) return '#EF4444';
    return '#EF4444';
  };

  // Process file upload / paste blob
  const processImageFile = useCallback((file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      if (e.target?.result) {
        setImageUrl(e.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  }, []);

  // Handle global paste event (CTRL + V)
  useEffect(() => {
    const handleGlobalPaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf('image') !== -1) {
          const blob = items[i].getAsFile();
          if (blob) {
            processImageFile(blob);
            setIsPasting(true);
            setTimeout(() => setIsPasting(false), 2500);
            e.preventDefault();
            break;
          }
        }
      }
    };

    window.addEventListener('paste', handleGlobalPaste);
    return () => window.removeEventListener('paste', handleGlobalPaste);
  }, [processImageFile]);

  // Load image onto Canvas & run AUTOMATIC Full Design Contrast Analysis
  useEffect(() => {
    if (!imageUrl) {
      setReport(null);
      return;
    }

    const img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const maxWidth = 800;
      let width = img.width;
      let height = img.height;

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width);
        width = maxWidth;
      }

      canvas.width = width;
      canvas.height = height;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(img, 0, 0, width, height);

        // INSTANT AUTOMATIC FULL DESIGN CONTRAST ANALYSIS
        const analysisReport = analyzeFullDesignContrast(canvas);
        setReport(analysisReport);

        // Auto-populate the primary detected pair into manual evaluator
        if (analysisReport.pairs.length > 0) {
          setFg(analysisReport.pairs[0].fg);
          setBg(analysisReport.pairs[0].bg);
        }
      }
    };
    img.src = imageUrl;
  }, [imageUrl]);

  // Get hex color from canvas pixel position
  const getCanvasPixelHex = (clientX: number, clientY: number): string | null => {
    const canvas = canvasRef.current;
    if (!canvas) return null;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    const x = Math.floor((clientX - rect.left) * scaleX);
    const y = Math.floor((clientY - rect.top) * scaleY);

    if (x < 0 || x >= canvas.width || y < 0 || y >= canvas.height) return null;

    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const pixel = ctx.getImageData(x, y, 1, 1).data;
    return `#${((1 << 24) + (pixel[0] << 16) + (pixel[1] << 8) + pixel[2])
      .toString(16)
      .slice(1)
      .toUpperCase()}`;
  };

  // Canvas mouse move for pixel inspect preview
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const hex = getCanvasPixelHex(e.clientX, e.clientY);
    const canvas = canvasRef.current;
    if (hex && canvas) {
      const rect = canvas.getBoundingClientRect();
      setHoverColor(hex);
      setHoverPos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    }
  };

  const handleCanvasMouseLeave = () => {
    setHoverColor(null);
    setHoverPos(null);
  };

  // Canvas click to sample color
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const hex = getCanvasPixelHex(e.clientX, e.clientY);
    if (!hex) return;

    if (pickTarget === 'fg') {
      setFg(hex);
      setPickTarget('bg');
    } else {
      setBg(hex);
      setPickTarget('fg');
    }
  };

  // Native EyeDropper API fallback/extension
  const handleNativeEyeDropper = async (target: 'fg' | 'bg') => {
    if ('EyeDropper' in window) {
      try {
        // @ts-ignore
        const eyeDropper = new window.EyeDropper();
        const result = await eyeDropper.open();
        if (result.sRGBHex) {
          if (target === 'fg') setFg(result.sRGBHex.toUpperCase());
          else setBg(result.sRGBHex.toUpperCase());
        }
      } catch (e) {
        // User canceled eye dropper
      }
    }
  };

  // File drop handling
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processImageFile(e.dataTransfer.files[0]);
    }
  };

  const selectReportPair = (pair: DetectedColorPair) => {
    setFg(pair.fg);
    setBg(pair.bg);
  };

  const PassFail: React.FC<{ pass: boolean; label: string }> = ({ pass, label }) => (
    <div className="flex items-center justify-between py-2 border-b border-[#162237] last:border-0 gap-2">
      <span className="text-[#94A3B8] text-xs font-medium leading-tight">{label}</span>
      <div className={`flex items-center gap-1 text-xs font-semibold shrink-0 ${pass ? 'text-[#10B981]' : 'text-[#EF4444]'}`}>
        {pass ? <CheckCircle size={13} /> : <XCircle size={13} />}
        {pass ? 'PASS' : 'FAIL'}
      </div>
    </div>
  );

  return (
    <div className="space-y-6" ref={containerRef}>
      {/* Responsive Priority Tools Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">

        {/* Functionality 1: Instant Automatic Full Design Contrast Inspector */}
        <div className="bg-[#101F31] border border-[#20344A] rounded-2xl p-4 sm:p-5 space-y-4 overflow-hidden">
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#20344A] pb-3">
            <div>
              <h3 className="text-[#F4F7FB] font-bold text-sm sm:text-base flex items-center gap-2">
                <Clipboard size={18} className="text-[#1683FF] shrink-0" />
                <span>Full Design Screenshot Audit</span>
              </h3>
              <p className="text-[#64748B] text-xs mt-0.5 leading-relaxed">
                Paste screenshot <kbd className="px-1.5 py-0.5 rounded bg-[#070E18] border border-[#20344A] text-[#1683FF] font-mono text-[11px]">CTRL + V</kbd> for instant full contrast audit
              </p>
            </div>
            {imageUrl && (
              <button
                onClick={() => setImageUrl(null)}
                className="text-xs text-[#EF4444] hover:text-red-400 font-medium px-2.5 py-1 bg-[#0B1626] rounded-lg border border-[#20344A] shrink-0"
              >
                Clear Image
              </button>
            )}
          </div>

          {/* Notification Toast when Ctrl+V is pressed */}
          {isPasting && (
            <div className="p-3 bg-[#1683FF]/20 border border-[#1683FF] rounded-xl text-white text-xs flex items-center gap-2 animate-pulse">
              <Sparkles size={14} className="text-[#38BDF8] shrink-0" />
              <span>Screenshot pasted! Analyzing full design contrast automatically...</span>
            </div>
          )}

          {/* Dropzone & Interactive Canvas */}
          {!imageUrl ? (
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setIsDragOver(true);
              }}
              onDragLeave={() => setIsDragOver(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`
                border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 min-h-[260px] flex flex-col items-center justify-center
                ${isDragOver
                  ? 'border-[#1683FF] bg-[#1683FF]/10'
                  : 'border-[#20344A] bg-[#0B1626] hover:border-[#2D4A68] hover:bg-[#070E18]'
                }
              `}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => e.target.files?.[0] && processImageFile(e.target.files[0])}
              />
              <div className="w-12 h-12 rounded-2xl bg-[#101F31] border border-[#20344A] flex items-center justify-center mb-3 text-[#1683FF] shadow-lg shrink-0">
                <Upload size={24} />
              </div>
              <p className="text-[#F4F7FB] font-semibold text-sm sm:text-base mb-1">
                Paste Design Screenshot <span className="text-[#1683FF] font-mono">(CTRL + V)</span>
              </p>
              <p className="text-[#64748B] text-xs max-w-xs mx-auto mb-3 leading-relaxed">
                Just paste or drop your screenshot here. Contrast for all text & UI elements will be audited automatically!
              </p>
              <span className="inline-flex items-center justify-center gap-1.5 text-xs font-semibold text-[#1683FF] bg-[#1683FF]/10 border border-[#1683FF]/30 px-3 py-1.5 rounded-xl text-center leading-normal max-w-full">
                <Sparkles size={14} className="shrink-0" /> Instant Full Design WCAG Analysis
              </span>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Canvas Container with Hover Pixel Magnifier */}
              <div className="relative border border-[#20344A] rounded-xl overflow-hidden bg-[#070E18] flex justify-center max-h-[320px] overflow-y-auto">
                <canvas
                  ref={canvasRef}
                  onClick={handleCanvasClick}
                  onMouseMove={handleCanvasMouseMove}
                  onMouseLeave={handleCanvasMouseLeave}
                  className="cursor-crosshair max-w-full block"
                />

                {/* Hovered Pixel Color Preview Tooltip */}
                {hoverColor && hoverPos && (
                  <div
                    className="absolute pointer-events-none z-20 flex items-center gap-2 px-2.5 py-1 bg-[#0B1626] border border-[#20344A] rounded-lg shadow-xl text-xs font-mono text-white -translate-x-1/2 -translate-y-12"
                    style={{ left: hoverPos.x, top: hoverPos.y }}
                  >
                    <div
                      className="w-3.5 h-3.5 rounded border border-white/40 shadow-sm"
                      style={{ backgroundColor: hoverColor }}
                    />
                    <span>{hoverColor}</span>
                  </div>
                )}
              </div>

              {/* Manual Pixel Target Toggles */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-2 bg-[#0B1626] border border-[#20344A] rounded-xl">
                <div className="flex items-center gap-2">
                  <span className="text-[#64748B] text-xs font-semibold">Manual Sample:</span>
                  <button
                    onClick={() => setPickTarget('fg')}
                    className={`
                      px-2.5 py-1 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-all
                      ${pickTarget === 'fg'
                        ? 'bg-[#1683FF] text-white border-transparent shadow-sm'
                        : 'bg-[#101F31] text-[#94A3B8] border-[#20344A] hover:text-[#F4F7FB]'
                      }
                    `}
                  >
                    <MousePointer size={11} /> Text
                    <span className="w-2.5 h-2.5 rounded-full border border-black/30 ml-0.5" style={{ backgroundColor: fg }} />
                  </button>
                  <button
                    onClick={() => setPickTarget('bg')}
                    className={`
                      px-2.5 py-1 rounded-lg text-xs font-medium border flex items-center gap-1.5 transition-all
                      ${pickTarget === 'bg'
                        ? 'bg-[#1683FF] text-white border-transparent shadow-sm'
                        : 'bg-[#101F31] text-[#94A3B8] border-[#20344A] hover:text-[#F4F7FB]'
                      }
                    `}
                  >
                    <MousePointer size={11} /> Background
                    <span className="w-2.5 h-2.5 rounded-full border border-white/20 ml-0.5" style={{ backgroundColor: bg }} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Functionality 2: Live Evaluator or Automatic Full Design Audit Results */}
        <div className="bg-[#101F31] border border-[#20344A] rounded-2xl p-4 sm:p-5 space-y-4 overflow-hidden">
          {report ? (
            /* AUTOMATIC FULL DESIGN CONTRAST AUDIT REPORT */
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#20344A] pb-3">
                <h3 className="text-[#F4F7FB] font-bold text-sm sm:text-base flex items-center gap-2">
                  <ShieldCheck size={18} className="text-[#10B981] shrink-0" />
                  <span>Full Design Accessibility Audit</span>
                </h3>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#10B981]/10 text-[#10B981] border border-[#10B981]/30 shrink-0">
                  {report.statusLabel}
                </span>
              </div>

              {/* Score Header Banner */}
              <div className="p-4 bg-[#0B1626] border border-[#20344A] rounded-2xl flex flex-wrap items-center justify-between gap-3">
                <div>
                  <span className="text-[#64748B] text-xs font-semibold uppercase tracking-wider block">
                    Design Accessibility Score
                  </span>
                  <p className="text-xs text-[#94A3B8] mt-0.5 leading-tight">
                    Audited {report.totalPairs} key color combinations detected in design
                  </p>
                </div>
                <div className="flex items-baseline gap-1 shrink-0">
                  <span
                    className="text-3xl sm:text-4xl font-bold font-mono"
                    style={{
                      color:
                        report.overallScore >= 80
                          ? '#10B981'
                          : report.overallScore >= 60
                            ? '#F59E0B'
                            : '#EF4444',
                    }}
                  >
                    {report.overallScore}
                  </span>
                  <span className="text-[#64748B] text-xs font-mono">/100</span>
                </div>
              </div>

              {/* Detected Color Pairs List */}
              <div className="space-y-2.5">
                <label className="text-[#64748B] text-xs font-semibold uppercase tracking-wider block">
                  Detected Color Pairs ({report.pairs.length})
                </label>

                {report.pairs.map((pair) => (
                  <div
                    key={pair.id}
                    onClick={() => selectReportPair(pair)}
                    className="p-3 bg-[#0B1626] hover:bg-[#070E18] border border-[#20344A] hover:border-[#1683FF] rounded-xl cursor-pointer transition-all space-y-2 group"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-2.5 min-w-0">
                        {/* Sample Preview Swatch */}
                        <div
                          className="w-9 h-7 rounded-lg border border-[#20344A] flex items-center justify-center text-xs font-bold shrink-0"
                          style={{ backgroundColor: pair.bg, color: pair.fg }}
                        >
                          Aa
                        </div>
                        <div className="min-w-0">
                          <p className="text-[#F4F7FB] text-xs font-semibold group-hover:text-[#1683FF] transition-colors truncate">
                            {pair.label}
                          </p>
                          <p className="text-[#64748B] text-[11px] font-mono truncate">
                            FG: {pair.fg} | BG: {pair.bg}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <span
                          className="text-xs sm:text-sm font-bold font-mono"
                          style={{ color: getContrastColor(pair.ratio) }}
                        >
                          {pair.ratio}:1
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${pair.wcagAA
                            ? 'bg-[#10B981]/10 text-[#10B981] border-[#10B981]/30'
                            : pair.wcagAALarge
                              ? 'bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30'
                              : 'bg-[#EF4444]/10 text-[#EF4444] border-[#EF4444]/30'
                            }`}
                        >
                          {pair.wcagAA ? 'AA PASS' : pair.wcagAALarge ? 'LARGE PASS' : 'FAIL'}
                        </span>
                      </div>
                    </div>

                    {pair.suggestion && (
                      <p className="text-[11px] text-[#F59E0B] flex items-start gap-1 bg-[#F59E0B]/10 p-2 rounded-lg border border-[#F59E0B]/20">
                        <AlertTriangle size={12} className="shrink-0 mt-0.5" />
                        <span>{pair.suggestion}</span>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* MANUAL COLOR PAIR EVALUATOR (shown when no image is pasted yet) */
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#20344A] pb-3">
                <h3 className="text-[#F4F7FB] font-bold text-sm sm:text-base flex items-center gap-2">
                  <Sparkles size={18} className="text-[#1683FF] shrink-0" />
                  <span>Live Color Pair Evaluator</span>
                </h3>
                <span className="text-[#64748B] text-xs font-mono shrink-0">WCAG 2.1 Engine</span>
              </div>

              {/* Visual Live Text Preview Box */}
              <div
                className="p-5 rounded-2xl border border-[#20344A] flex items-center justify-center min-h-[110px] transition-colors duration-300 relative overflow-hidden shadow-inner"
                style={{ backgroundColor: bg }}
              >
                <div className="text-center space-y-0.5 z-10">
                  <p className="text-2xl sm:text-3xl font-bold tracking-tight mb-1" style={{ color: fg }}>
                    Aa Text Contrast
                  </p>
                  <p className="text-xs opacity-90 max-w-xs mx-auto" style={{ color: fg }}>
                    The quick brown fox jumps over the lazy dog.
                  </p>
                </div>
              </div>

              {/* Primary Color Pickers */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Foreground Picker */}
                <div className="p-2.5 rounded-xl border border-[#20344A] bg-[#0B1626]">
                  <div className="flex items-center justify-between mb-1.5 gap-1">
                    <label className="text-[#64748B] text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 truncate">
                      <span className="w-2 h-2 rounded-full inline-block shrink-0" style={{ backgroundColor: fg }} />
                      <span className="truncate">Text (Foreground)</span>
                    </label>
                    {'EyeDropper' in window && (
                      <button
                        onClick={() => handleNativeEyeDropper('fg')}
                        className="text-[11px] text-[#1683FF] hover:text-[#38BDF8] flex items-center gap-1 font-medium shrink-0"
                        title="Pick from screen"
                      >
                        <Pipette size={11} /> Screen
                      </button>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-[#20344A] shrink-0">
                      <input
                        type="color"
                        value={fg}
                        onChange={(e) => setFg(e.target.value.toUpperCase())}
                        className="absolute inset-0 w-[150%] h-[150%] -translate-x-[10%] -translate-y-[10%] cursor-pointer"
                        aria-label="Foreground color picker"
                      />
                    </div>
                    <input
                      type="text"
                      value={fg}
                      onChange={(e) => setFg(e.target.value.toUpperCase())}
                      className="flex-1 h-8 px-2 bg-[#070E18] border border-[#20344A] rounded-lg text-[#F4F7FB] text-xs font-mono focus:outline-none focus:border-[#1683FF]"
                      aria-label="Foreground HEX value"
                      maxLength={7}
                    />
                  </div>
                </div>

                {/* Background Picker */}
                <div className="p-2.5 rounded-xl border border-[#20344A] bg-[#0B1626]">
                  <div className="flex items-center justify-between mb-1.5 gap-1">
                    <label className="text-[#64748B] text-[11px] font-semibold uppercase tracking-wider flex items-center gap-1.5 truncate">
                      <span className="w-2 h-2 rounded-full inline-block border border-white/20 shrink-0" style={{ backgroundColor: bg }} />
                      <span className="truncate">Background</span>
                    </label>
                    {'EyeDropper' in window && (
                      <button
                        onClick={() => handleNativeEyeDropper('bg')}
                        className="text-[11px] text-[#1683FF] hover:text-[#38BDF8] flex items-center gap-1 font-medium shrink-0"
                        title="Pick from screen"
                      >
                        <Pipette size={11} /> Screen
                      </button>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-[#20344A] shrink-0">
                      <input
                        type="color"
                        value={bg}
                        onChange={(e) => setBg(e.target.value.toUpperCase())}
                        className="absolute inset-0 w-[150%] h-[150%] -translate-x-[10%] -translate-y-[10%] cursor-pointer"
                        aria-label="Background color picker"
                      />
                    </div>
                    <input
                      type="text"
                      value={bg}
                      onChange={(e) => setBg(e.target.value.toUpperCase())}
                      className="flex-1 h-8 px-2 bg-[#070E18] border border-[#20344A] rounded-lg text-[#F4F7FB] text-xs font-mono focus:outline-none focus:border-[#1683FF]"
                      aria-label="Background HEX value"
                      maxLength={7}
                    />
                  </div>
                </div>
              </div>

              {/* Swap Button & Ratio Display */}
              <div className="flex flex-wrap items-center justify-between gap-2">
                <button
                  onClick={() => {
                    const temp = fg;
                    setFg(bg);
                    setBg(temp);
                  }}
                  className="text-xs text-[#94A3B8] hover:text-[#F4F7FB] flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-[#0B1626] border border-[#20344A] transition-all"
                >
                  <RotateCcw size={12} /> Swap Colors
                </button>

                <div className="flex items-center gap-2 px-3 py-1 bg-[#0B1626] rounded-lg border border-[#20344A]">
                  <span className="text-[#94A3B8] text-xs font-semibold">Contrast:</span>
                  <span
                    className="text-lg sm:text-xl font-bold font-mono"
                    style={{ color: getContrastColor(result.ratio) }}
                  >
                    {ratio}
                  </span>
                </div>
              </div>

              {/* WCAG Compliance Breakdown */}
              <div className="bg-[#0B1626] rounded-xl border border-[#20344A] px-3 py-1">
                <PassFail pass={result.wcagAA} label="WCAG AA — Normal Text (4.5:1)" />
                <PassFail pass={result.wcagAAA} label="WCAG AAA — Normal Text (7:1)" />
                <PassFail pass={result.wcagAALarge} label="WCAG AA — Large Text (3:1)" />
                <PassFail pass={result.wcagAAALarge} label="WCAG AAA — Large Text (4.5:1)" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContrastChecker;

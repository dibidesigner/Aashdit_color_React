import React, { useRef, useState } from 'react';
import { Upload, Image as ImageIcon, X, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '../common/Button';

interface LogoUploaderProps {
  logoUrl: string | null;
  logoFileName: string | null;
  onLogoSelected: (file: File, dataUrl: string) => void;
  onClearLogo: () => void;
}

const ALLOWED_TYPES = ['image/png', 'image/jpeg', 'image/jpg', 'image/svg+xml', 'image/webp'];
const MAX_SIZE_MB = 10;

export const LogoUploader: React.FC<LogoUploaderProps> = ({
  logoUrl,
  logoFileName,
  onLogoSelected,
  onClearLogo,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = (file: File) => {
    setError(null);

    // Validate type
    if (!ALLOWED_TYPES.includes(file.type) && !file.name.match(/\.(png|jpe?g|svg|webp)$/i)) {
      setError('Unsupported file type. Please upload a PNG, JPG, SVG, or WEBP image.');
      return;
    }

    // Validate size
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File size exceeds ${MAX_SIZE_MB}MB limit. Please upload a smaller image.`);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onLogoSelected(file, result);
    };
    reader.onerror = () => {
      setError('Failed to read the uploaded image. Please try another file.');
    };
    reader.readAsDataURL(file);
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="w-full">
      {logoUrl ? (
        /* Uploaded state */
        <div className="bg-[#101F31] border border-[#20344A] rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <div className="relative mb-4 group p-4 bg-[#0B1626] border border-[#20344A] rounded-xl flex items-center justify-center min-w-[160px] min-h-[120px] max-w-[280px]">
            <img
              src={logoUrl}
              alt="Uploaded brand logo"
              className="max-h-24 max-w-full object-contain"
            />
          </div>

          <div className="flex items-center gap-2 mb-4">
            <CheckCircle2 size={16} className="text-[#12B8C4]" />
            <span className="text-[#F4F7FB] font-semibold text-sm">
              {logoFileName || 'Logo uploaded successfully'}
            </span>
          </div>

          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              leftIcon={<Upload size={14} />}
            >
              Replace Logo
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearLogo}
              leftIcon={<X size={14} />}
              className="text-[#EF4444] hover:text-[#F87171]"
            >
              Remove
            </Button>
          </div>
        </div>
      ) : (
        /* Dropzone area */
        <div
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`
            border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-all duration-250
            flex flex-col items-center justify-center min-h-[220px]
            ${isDragging
              ? 'border-[#1683FF] bg-[rgba(22,131,255,0.08)] scale-[1.01]'
              : 'border-[#20344A] bg-[#101F31] hover:border-[#1683FF]/50 hover:bg-[#132438]'
            }
          `}
        >
          <div className="w-14 h-14 rounded-2xl bg-[rgba(22,131,255,0.1)] border border-[rgba(22,131,255,0.2)] flex items-center justify-center text-[#1683FF] mb-4">
            <ImageIcon size={26} />
          </div>

          <h3 className="text-[#F4F7FB] font-bold text-lg mb-1">
            Upload your brand logo
          </h3>
          <p className="text-[#94A3B8] text-sm mb-4">
            Drag & drop your logo here or click to browse
          </p>

          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1683FF] text-white text-sm font-semibold rounded-xl hover:bg-[#0F6EE0] transition-colors mb-3">
            <Upload size={16} />
            Browse File
          </div>

          <p className="text-[#64748B] text-xs font-mono">
            Supports PNG • JPG • SVG • WEBP (Max 10MB)
          </p>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".png,.jpg,.jpeg,.svg,.webp,image/png,image/jpeg,image/svg+xml,image/webp"
        onChange={(e) => {
          if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
          }
        }}
        className="hidden"
      />

      {/* Error message */}
      {error && (
        <div className="mt-3 flex items-center gap-2 p-3 bg-red-950/40 border border-red-800/50 rounded-xl text-red-300 text-sm">
          <AlertCircle size={16} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

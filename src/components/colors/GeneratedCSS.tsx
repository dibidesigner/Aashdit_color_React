import React, { useState } from 'react';
import type { GeneratedPalette } from '../../types/color';
import { generateCSSVariables } from '../../utils/cssGenerator';
import { formatTokensJSON, downloadFile } from '../../utils/jsonGenerator';
import { CopyButton } from '../common/CopyButton';
import { Download, Code, FileJson } from 'lucide-react';

interface GeneratedCSSProps {
  palette: GeneratedPalette;
}

type ExportFormat = 'css' | 'json';

export const GeneratedCSS: React.FC<GeneratedCSSProps> = ({ palette }) => {
  const [format, setFormat] = useState<ExportFormat>('css');

  const cssContent = generateCSSVariables(palette);
  const jsonContent = formatTokensJSON(palette);
  const content = format === 'css' ? cssContent : jsonContent;

  const handleDownload = () => {
    if (format === 'css') {
      downloadFile(cssContent, 'design-tokens.css', 'text/css');
    } else {
      downloadFile(jsonContent, 'design-tokens.json', 'application/json');
    }
  };

  return (
    <div className="bg-[#101F31] border border-[#20344A] rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-3 border-b border-[#20344A]">
        <h3 className="text-[#F4F7FB] font-semibold text-sm">Generated Output</h3>

        <div className="flex items-center gap-2">
          {/* Format toggle */}
          <div className="flex bg-[#0B1626] border border-[#20344A] rounded-lg p-0.5">
            {([
              { id: 'css', label: 'CSS', icon: <Code size={12} /> },
              { id: 'json', label: 'JSON', icon: <FileJson size={12} /> },
            ] as const).map(tab => (
              <button
                key={tab.id}
                onClick={() => setFormat(tab.id)}
                className={`
                  flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md transition-all duration-150
                  ${format === tab.id
                    ? 'bg-[#13253A] text-[#F4F7FB] border border-[#20344A]'
                    : 'text-[#64748B] hover:text-[#94A3B8]'
                  }
                `}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>

          <CopyButton value={content} label="Copy" />

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-[#1683FF] hover:bg-[#0F6EE0] text-white rounded-lg transition-colors"
            aria-label={`Download ${format === 'css' ? 'CSS' : 'JSON'} design tokens`}
          >
            <Download size={12} />
            Download {format === 'css' ? '.css' : '.json'}
          </button>
        </div>
      </div>

      {/* Code block */}
      <div className="relative">
        <pre className="code-block text-[11px] leading-relaxed max-h-80 overflow-y-auto p-5 rounded-none">
          <code>{content}</code>
        </pre>
      </div>
    </div>
  );
};

export default GeneratedCSS;

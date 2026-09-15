export const typographyData = {
  fontFamilies: [
    { name: 'Inter', category: 'Sans-serif', usage: 'UI, Headings, Body', google: true, weights: [300, 400, 500, 600, 700, 800, 900] },
    { name: 'Noto Sans', category: 'Sans-serif', usage: 'Body, Multilingual', google: true, weights: [300, 400, 500, 600, 700] },
    { name: 'Nunito Sans', category: 'Sans-serif', usage: 'Body, Friendly UI', google: true, weights: [300, 400, 600, 700, 800] },
    { name: 'Source Sans 3', category: 'Sans-serif', usage: 'Reading, Content', google: true, weights: [300, 400, 600, 700] },
    { name: 'JetBrains Mono', category: 'Monospace', usage: 'Code, Technical', google: true, weights: [400, 500, 600, 700] },
  ],
  typeScale: [
    { name: 'Display', size: '56px', lineHeight: '1.1', weight: '800', usage: 'Hero headings, marketing pages' },
    { name: 'H1', size: '40px', lineHeight: '1.2', weight: '700', usage: 'Page titles, main headings' },
    { name: 'H2', size: '32px', lineHeight: '1.25', weight: '700', usage: 'Section headings' },
    { name: 'H3', size: '24px', lineHeight: '1.3', weight: '600', usage: 'Card headings, sub-sections' },
    { name: 'H4', size: '20px', lineHeight: '1.4', weight: '600', usage: 'Widget titles, component headings' },
    { name: 'H5', size: '16px', lineHeight: '1.5', weight: '600', usage: 'Small headings, labels' },
    { name: 'Body Large', size: '18px', lineHeight: '1.6', weight: '400', usage: 'Lead paragraphs, introductions' },
    { name: 'Body', size: '16px', lineHeight: '1.6', weight: '400', usage: 'Default body text' },
    { name: 'Body Small', size: '14px', lineHeight: '1.5', weight: '400', usage: 'Secondary information' },
    { name: 'Caption', size: '12px', lineHeight: '1.4', weight: '400', usage: 'Metadata, timestamps, captions' },
    { name: 'Overline', size: '11px', lineHeight: '1.4', weight: '600', usage: 'Section labels, overlines' },
  ],
  fontPairings: [
    { heading: 'Inter', body: 'Inter', sectors: ['Technology', 'Finance', 'Healthcare', 'Government'] },
    { heading: 'Inter', body: 'Nunito Sans', sectors: ['Education', 'NGO', 'Women & Child'] },
    { heading: 'Inter', body: 'Noto Sans', sectors: ['Government', 'Agriculture', 'Logistics'] },
    { heading: 'Inter', body: 'Source Sans 3', sectors: ['Media', 'Corporate', 'Real Estate'] },
  ],
};

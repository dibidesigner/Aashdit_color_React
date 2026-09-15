export interface SectorColor {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  success?: string;
  warning?: string;
  error?: string;
  info?: string;
  primaryName?: string;
  secondaryName?: string;
  accentName?: string;
}

export interface SectorPersonality {
  trust?: number;
  professional?: number;
  modern?: number;
  friendly?: number;
  playful?: number;
  luxury?: number;
  calm?: number;
  bold?: number;
  minimal?: number;
  creative?: number;
  energetic?: number;
  serious?: number;
}

export interface SectorTypography {
  heading: string;
  body: string;
  display?: string;
  mono?: string;
  weights?: string[];
  scale?: string;
  notes?: string;
}

export interface SectorLayout {
  style: string;
  density: 'Compact' | 'Medium' | 'Spacious' | 'Airy';
  grid: string;
  gutter: string;
  container: string;
  sectionSpacing: string;
  cardSpacing?: string;
  notes?: string;
}

export interface SectorShapes {
  cardRadius: string;
  buttonRadius: string;
  inputRadius: string;
  modalRadius?: string;
  borderStyle: string;
  shadowStyle: string;
  notes?: string;
}

export interface SectorImagery {
  recommended: string[];
  avoid: string[];
  style?: string;
  notes?: string;
}

export interface SectorComponent {
  name: string;
  notes: string;
}

export interface DosDont {
  do: string[];
  dont: string[];
}

export interface SectorAccessibility {
  minContrast: string;
  keyboardNav: string;
  screenReader: string;
  colorBlindness: string;
  focusState: string;
  notes?: string;
}

export interface SampleUI {
  id: string;
  title: string;
  type: 'dashboard' | 'portal' | 'landing' | 'listing' | 'booking' | 'ecommerce';
  description: string;
}

export interface Sector {
  id: string;
  name: string;
  description: string;
  shortDescription: string;
  keywords: string[];
  character: string[];
  personality: SectorPersonality;
  colors: SectorColor;
  typography: SectorTypography;
  layout: SectorLayout;
  shapes: SectorShapes;
  imagery: SectorImagery;
  components: SectorComponent[];
  dosDonts: DosDont;
  accessibility: SectorAccessibility;
  sampleUI: SampleUI[];
  icon?: string;
  category?: string;
}

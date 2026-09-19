import type { Sector } from '../types/sector';

/**
 * Search sectors by query string
 * Searches: name, keywords, description, character, shortDescription
 */
export function searchSectors(sectors: Sector[], query: string): Sector[] {
  if (!Array.isArray(sectors)) return [];
  if (!query || !query.trim()) return sectors;

  const q = query.toLowerCase().trim();

  return sectors.filter(sector => {
    if (!sector || typeof sector !== 'object') return false;

    // Check name
    const nameStr = typeof sector.name === 'string' ? sector.name : String(sector.name || '');
    if (nameStr.toLowerCase().includes(q)) return true;

    // Check id
    const idStr = typeof sector.id === 'string' ? sector.id : String(sector.id || '');
    if (idStr.toLowerCase().includes(q)) return true;

    // Check category
    const catStr = typeof sector.category === 'string' ? sector.category : String(sector.category || '');
    if (catStr.toLowerCase().includes(q)) return true;

    // Check description
    const descStr = typeof sector.description === 'string' ? sector.description : String(sector.description || '');
    if (descStr.toLowerCase().includes(q)) return true;

    // Check shortDescription
    const shortDescStr = typeof sector.shortDescription === 'string' ? sector.shortDescription : String(sector.shortDescription || '');
    if (shortDescStr.toLowerCase().includes(q)) return true;

    // Check keywords
    if (Array.isArray(sector.keywords)) {
      if (sector.keywords.some(k => typeof k === 'string' && k.toLowerCase().includes(q))) return true;
    }

    // Check character
    if (Array.isArray(sector.character)) {
      if (sector.character.some(c => typeof c === 'string' && c.toLowerCase().includes(q))) return true;
    }

    return false;
  });
}

/**
 * Get sector by ID
 */
export function getSectorById(sectors: Sector[], id: string): Sector | undefined {
  if (!Array.isArray(sectors) || !id) return undefined;
  return sectors.find(s => s && String(s.id) === String(id));
}

/**
 * Get sectors by category
 */
export function getSectorsByCategory(sectors: Sector[], category: string): Sector[] {
  if (!Array.isArray(sectors)) return [];
  return sectors.filter(s => s && s.category === category);
}

/**
 * Debounce utility
 */
export function debounce<T extends (...args: Parameters<T>) => unknown>(
  fn: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeout: ReturnType<typeof setTimeout>;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

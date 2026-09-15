import type { Sector } from '../types/sector';

/**
 * Search sectors by query string
 * Searches: name, keywords, description, character, shortDescription
 */
export function searchSectors(sectors: Sector[], query: string): Sector[] {
  if (!query.trim()) return sectors;

  const q = query.toLowerCase().trim();

  return sectors.filter(sector => {
    // Check name
    if (sector.name.toLowerCase().includes(q)) return true;

    // Check keywords
    if (sector.keywords.some(k => k.toLowerCase().includes(q))) return true;

    // Check description
    if (sector.description.toLowerCase().includes(q)) return true;

    // Check shortDescription
    if (sector.shortDescription.toLowerCase().includes(q)) return true;

    // Check character
    if (sector.character.some(c => c.toLowerCase().includes(q))) return true;

    // Check id
    if (sector.id.toLowerCase().includes(q)) return true;

    // Check category
    if (sector.category?.toLowerCase().includes(q)) return true;

    return false;
  });
}

/**
 * Get sector by ID
 */
export function getSectorById(sectors: Sector[], id: string): Sector | undefined {
  return sectors.find(s => s.id === id);
}

/**
 * Get sectors by category
 */
export function getSectorsByCategory(sectors: Sector[], category: string): Sector[] {
  return sectors.filter(s => s.category === category);
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

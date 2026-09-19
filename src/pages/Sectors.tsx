import React, { useState, useEffect } from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { SectorGrid } from '../components/sectors/SectorGrid';
import { SearchBar } from '../components/common/SearchBar';
import { sectors as staticSectors } from '../data/sectors';
import { searchSectors } from '../utils/search';
import { Layers, Loader2 } from 'lucide-react';
import { getSectors } from '../Admin/services/Sectors';
import type { Sector } from '../types/sector';

export const Sectors: React.FC = () => {
  const [sectorsList, setSectorsList] = useState<Sector[]>(staticSectors);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        setLoading(true);
        const data = await getSectors();
        let apiSectors: Sector[] = [];
        if (Array.isArray(data)) {
          apiSectors = data;
        } else if (data && Array.isArray((data as any).sectors)) {
          apiSectors = (data as any).sectors;
        } else if (data && Array.isArray((data as any).data)) {
          apiSectors = (data as any).data;
        }

        if (apiSectors && apiSectors.length > 0) {
          const apiIds = new Set(apiSectors.map(s => s.id));
          const filteredStatic = staticSectors.filter(s => !apiIds.has(s.id));
          setSectorsList([...apiSectors, ...filteredStatic]);
        }
      } catch (err) {
        console.error("Error fetching sectors from API:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSectors();
  }, []);

  const categories = ['All', ...Array.from(new Set(sectorsList.map(s => s.category).filter(Boolean))) as string[]];

  const filtered = searchSectors(sectorsList, search).filter(s =>
    activeCategory === 'All' || (s.category && s.category === activeCategory)
  );

  return (
    <div className="min-h-screen py-8">
      <PageContainer>
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-xl bg-[rgba(22,131,255,0.1)] border border-[rgba(22,131,255,0.2)] flex items-center justify-center">
              <Layers size={18} className="text-[#1683FF]" />
            </div>
            <div>
              <h1 className="text-[#F4F7FB] text-2xl font-bold">All Sectors</h1>
              <p className="text-[#64748B] text-sm">{sectorsList.length} design guides available</p>
            </div>
          </div>

          {/* Search + Filters */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4">
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Search or filter sectors..."
              className="flex-1 max-w-md"
              id="sectors-search"
            />
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`
                    px-4 py-2 text-sm font-semibold rounded-xl border transition-all duration-200
                    ${activeCategory === cat
                      ? 'bg-[#1683FF] text-white border-[#38BDF8] shadow-[0_0_15px_rgba(22,131,255,0.4)]'
                      : 'bg-[#101F31] text-[#94A3B8] border-[#20344A] hover:text-white hover:border-[#2D4A68] hover:bg-[#16273D]'
                    }
                  `}
                  aria-pressed={activeCategory === cat}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Results count */}
        {(search || activeCategory !== 'All') && (
          <p className="text-[#64748B] text-sm mb-4">
            Showing {filtered.length} of {sectorsList.length} sectors
          </p>
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="flex justify-center my-8">
            <Loader2 className="animate-spin text-[#1683FF]" size={28} />
          </div>
        )}

        {/* Grid */}
        <SectorGrid sectors={filtered} columns={4} />

        {!loading && filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-[#64748B] text-base">No sectors found for &quot;{search}&quot;</p>
            <button
              onClick={() => { setSearch(''); setActiveCategory('All'); }}
              className="mt-3 text-[#1683FF] text-sm hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}
      </PageContainer>
    </div>
  );
};

export default Sectors;
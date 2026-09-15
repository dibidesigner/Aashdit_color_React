import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Search } from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { Badge } from '../components/common/Badge';
import { EmptyState } from '../components/common/EmptyState';
import { sectors } from '../data/sectors';
import { searchSectors } from '../utils/search';

export const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const results = useMemo(() => searchSectors(sectors, query), [query]);

  return (
    <div className="min-h-screen py-8">
      <PageContainer>
        {/* Header */}
        <div className="mb-8">
          <Link to="/" className="inline-flex items-center gap-2 text-[#64748B] hover:text-[#94A3B8] text-sm mb-4 transition-colors">
            <ArrowLeft size={14} />
            Back to Home
          </Link>

          <h1 className="text-[#F4F7FB] text-2xl font-bold mb-1">Search Results</h1>
          <div className="flex items-center gap-3">
            {query && (
              <div className="flex items-center gap-2 px-3 py-1.5 bg-[rgba(22,131,255,0.1)] border border-[rgba(22,131,255,0.2)] rounded-full">
                <Search size={12} className="text-[#1683FF]" />
                <span className="text-[#1683FF] text-sm font-medium">{query}</span>
              </div>
            )}
            <span className="text-[#64748B] text-sm">
              {results.length} result{results.length !== 1 ? 's' : ''} found
            </span>
          </div>
        </div>

        {/* Results */}
        {results.length === 0 ? (
          <EmptyState
            icon={<Search size={28} />}
            title="No sectors found"
            description={`We couldn't find any sectors matching "${query}". Try a different term.`}
            suggestions={['Healthcare', 'Education', 'Government', 'Finance', 'Technology']}
          />
        ) : (
          <div className="space-y-3">
            {results.map((sector, i) => {
              const colorPreviews = [sector.colors.primary, sector.colors.secondary, sector.colors.accent];
              return (
                <Link
                  key={sector.id}
                  to={`/sectors/${sector.id}`}
                  className="group flex items-center gap-5 p-5 bg-[#101F31] border border-[#20344A] rounded-xl hover:border-[#2D4A68] hover:shadow-[0_4px_20px_rgba(0,0,0,0.3)] transition-all duration-200 animate-fade-in"
                  style={{ animationDelay: `${i * 40}ms`, animationFillMode: 'both' }}
                  aria-label={`Open ${sector.name} sector guide`}
                >
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl bg-[#0B1626] border border-[#20344A] flex items-center justify-center text-2xl shrink-0">
                    {sector.icon}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-[#F4F7FB] font-semibold text-base group-hover:text-white transition-colors">
                        {sector.name}
                      </h3>
                      {sector.category && (
                        <Badge variant="default" size="sm">{sector.category}</Badge>
                      )}
                    </div>
                    <p className="text-[#64748B] text-sm mb-2 line-clamp-1">{sector.description}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {sector.character.slice(0, 4).map(tag => (
                        <Badge key={tag} variant="default" size="sm">{tag}</Badge>
                      ))}
                    </div>
                  </div>

                  {/* Colors */}
                  <div className="hidden sm:flex items-center gap-1.5 shrink-0">
                    {colorPreviews.map((color, ci) => (
                      <div
                        key={ci}
                        className="w-5 h-5 rounded-full border-2 border-[#0B1626]"
                        style={{ backgroundColor: color }}
                        aria-label={color}
                      />
                    ))}
                  </div>

                  {/* Arrow */}
                  <ArrowRight
                    size={16}
                    className="text-[#64748B] group-hover:text-[#1683FF] group-hover:translate-x-0.5 transition-all duration-200 shrink-0"
                  />
                </Link>
              );
            })}
          </div>
        )}
      </PageContainer>
    </div>
  );
};

export default SearchResults;

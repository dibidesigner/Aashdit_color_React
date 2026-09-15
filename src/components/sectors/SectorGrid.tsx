import React from 'react';
import type { Sector } from '../../types/sector';
import { SectorCard } from './SectorCard';

interface SectorGridProps {
  sectors: Sector[];
  columns?: 2 | 3 | 4 | 5;
  className?: string;
}

export const SectorGrid: React.FC<SectorGridProps> = ({
  sectors,
  columns = 4,
  className = '',
}) => {
  const colClass = {
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    5: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
  };

  return (
    <div className={`grid ${colClass[columns]} gap-6 ${className}`}>
      {sectors.map((sector, i) => (
        <div
          key={sector.id}
          className="animate-fade-in"
          style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'both' }}
        >
          <SectorCard sector={sector} />
        </div>
      ))}
    </div>
  );
};

export default SectorGrid;

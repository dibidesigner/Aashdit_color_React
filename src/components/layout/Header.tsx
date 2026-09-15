import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Menu, Bell, Layers, Palette, BookOpen } from 'lucide-react';
import { debounce } from '../../utils/search';

interface HeaderProps {
  onMenuClick: () => void;
  sidebarCollapsed: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const handleSearch = useCallback(
    debounce((q: string) => {
      if (q.trim()) {
        navigate(`/search?q=${encodeURIComponent(q.trim())}`);
      }
    }, 400),
    [navigate]
  );

  const handleSearchChange = (val: string) => {
    setSearchValue(val);
    handleSearch(val);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchValue.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchValue.trim())}`);
    }
  };

  return (
    <header className="w-full sticky top-0 z-[200] h-16 bg-[#0B1626]/95 backdrop-blur-md border-b border-[#20344A] flex items-center px-4 lg:px-6 gap-4">
      {/* Mobile menu */}
      <button
        onClick={onMenuClick}
        className="lg:hidden text-[#64748B] hover:text-[#F4F7FB] p-2 rounded-lg hover:bg-[#101F31] transition-colors"
        aria-label="Open navigation menu"
      >
        <Menu size={20} />
      </button>

      {/* Logo - mobile only */}
      <div className="flex items-center gap-2 lg:hidden">
        <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#1683FF] to-[#12B8C4] flex items-center justify-center">
          <span className="text-white font-bold text-xs">D</span>
        </div>
        <span className="text-[#F4F7FB] font-bold text-sm">Aashdit Colors</span>
      </div>

      {/* Search - full width */}
      <div className="flex-1 relative w-full">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#64748B] pointer-events-none" aria-hidden="true" />
        <input
          type="text"
          value={searchValue}
          onChange={e => handleSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search sectors, e.g. healthcare, education, government..."
          className="w-full h-10 pl-10 pr-12 bg-[#101F31] border border-[#20344A] rounded-xl text-sm text-[#F4F7FB] placeholder-[#64748B] focus:outline-none focus:border-[#1683FF] focus:shadow-[0_0_10px_rgba(22,131,255,0.25)] transition-all shadow-inner"
          aria-label="Search sectors"
          id="header-search"
        />
        <kbd className="hidden md:flex absolute right-3.5 top-1/2 -translate-y-1/2 items-center gap-0.5 text-[10px] text-[#64748B] font-mono border border-[#20344A] rounded px-1.5 py-0.5 bg-[#0B1626]">
          ⌘K
        </kbd>
      </div>

      {/* Nav links - desktop */}
      <nav className="hidden lg:flex items-center gap-1" aria-label="Quick navigation">
        {[
          { label: 'Sectors', path: '/sectors', icon: <Layers size={15} /> },
          { label: 'Color Generator', path: '/color-generator', icon: <Palette size={15} /> },
          { label: 'Design Guide', path: '/components', icon: <BookOpen size={15} /> },
        ].map(item => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-[#94A3B8] hover:text-[#F4F7FB] hover:bg-[#101F31] rounded-lg transition-all duration-150"
          >
            {item.icon}
            {item.label}
          </button>
        ))}
      </nav>

      {/* Right actions */}
      <div className="flex items-center gap-2 ml-auto lg:ml-0">
        <button className="relative text-[#64748B] hover:text-[#F4F7FB] p-2 rounded-lg hover:bg-[#101F31] transition-colors" aria-label="Notifications">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#1683FF] rounded-full" aria-hidden="true" />
        </button>

        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#1683FF] to-[#8B5CF6] flex items-center justify-center text-white text-xs font-bold cursor-pointer" aria-label="User menu">
          A
        </div>
      </div>
    </header>
  );
};

export default Header;

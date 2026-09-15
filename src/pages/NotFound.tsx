import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Home, Layers } from 'lucide-react';
import { Button } from '../components/common/Button';
import { PageContainer } from '../components/layout/PageContainer';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[60vh] flex items-center justify-center py-16">
      <PageContainer>
        <div className="text-center max-w-md mx-auto">
          {/* 404 display */}
          <div className="mb-6">
            <span
              className="text-[120px] font-black leading-none"
              style={{
                background: 'linear-gradient(135deg, #1683FF, #12B8C4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              404
            </span>
          </div>

          <h1 className="text-[#F4F7FB] text-2xl font-bold mb-3">Page Not Found</h1>
          <p className="text-[#94A3B8] text-sm mb-8 leading-relaxed">
            The page you&apos;re looking for doesn&apos;t exist, or the sector hasn&apos;t been added yet.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Button
              variant="primary"
              onClick={() => navigate('/')}
              leftIcon={<Home size={16} />}
            >
              Go Home
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate('/sectors')}
              leftIcon={<Layers size={16} />}
            >
              Browse Sectors
            </Button>
          </div>

          <div className="mt-8">
            <p className="text-[#64748B] text-xs mb-3">Try searching for:</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['Healthcare', 'Education', 'Government', 'Finance', 'Technology'].map(s => (
                <button
                  key={s}
                  onClick={() => navigate(`/sectors/${s.toLowerCase()}`)}
                  className="px-3 py-1.5 bg-[#101F31] border border-[#20344A] text-[#94A3B8] text-sm rounded-lg hover:border-[#2D4A68] hover:text-[#F4F7FB] transition-all"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>
      </PageContainer>
    </div>
  );
};

export default NotFound;

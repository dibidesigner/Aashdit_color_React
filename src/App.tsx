import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppLayout } from './components/layout/AppLayout';
import ProtectedRoute from './components/common/ProtectedRoute';
import PublicRoute from './components/common/PublicRoute';
import Login from './pages/Login';

// Lazy load pages for performance
const Home = lazy(() => import('./pages/Home'));
const Sectors = lazy(() => import('./pages/Sectors'));
const SectorDetail = lazy(() => import('./pages/SectorDetail'));
const SearchResults = lazy(() => import('./pages/SearchResults'));
const ColorTheory = lazy(() => import('./pages/ColorTheory'));
const ColorGeneratorPage = lazy(() => import('./pages/ColorGenerator'));
const CreateDesignPage = lazy(() => import('./pages/CreateDesign'));
const LayoutGuide = lazy(() => import('./pages/LayoutGuide'));
const TypographyGuide = lazy(() => import('./pages/TypographyGuide'));
const ComponentsGuide = lazy(() => import('./pages/ComponentsGuide'));
const AccessibilityGuide = lazy(() => import('./pages/AccessibilityGuide'));
const ContrastCheckerPage = lazy(() => import('./pages/ContrastCheckerPage'));
const NotFound = lazy(() => import('./pages/NotFound'));

interface AppLoaderProps { }

const PageLoader: React.FC<AppLoaderProps> = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="flex flex-col items-center gap-4">
      <div className="w-10 h-10 rounded-full border-2 border-[#1683FF] border-t-transparent animate-spin" />
      <p className="text-[#64748B] text-sm">Loading...</p>
    </div>
  </div>
);

const AdminLayout = lazy(() => import('./Admin/Layout'));
const AdminHome = lazy(() => import('./Admin/Home'));
const AddSector = lazy(() => import('./Admin/AddSector'));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          {/* Public-only Route (Restricted for logged-in users, redirects logged in to /admin) */}
          <Route element={<PublicRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/sectors" element={<Sectors />} />
            <Route path="/sectors/:sectorId" element={<SectorDetail />} />
            <Route path="/create-design" element={<CreateDesignPage />} />
            <Route path="/color-theory" element={<ColorTheory />} />
            <Route path="/color-generator" element={<ColorGeneratorPage />} />
            <Route path="/contrast-checker" element={<ContrastCheckerPage />} />
            <Route path="/layout" element={<LayoutGuide />} />
            <Route path="/typography" element={<TypographyGuide />} />
            <Route path="/components" element={<ComponentsGuide />} />
            <Route path="/accessibility" element={<AccessibilityGuide />} />
          </Route>

          {/* Protected Admin Routes (Only accessible when logged in) */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminHome />} />
              <Route path="add-sector" element={<AddSector />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;

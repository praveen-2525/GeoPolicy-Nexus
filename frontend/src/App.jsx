import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { Dashboard } from './pages/Dashboard';
import { ResearchRepository } from './pages/ResearchRepository';
import { PolicyRepository } from './pages/PolicyRepository';
import { DatasetRepository } from './pages/DatasetRepository';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboard } from './pages/AdminDashboard';
import { GisDashboard } from './pages/GisDashboard';
import { AiResearchAssistant } from './pages/AiResearchAssistant';
import { PolicyImpactSimulator } from './pages/PolicyImpactSimulator';

export function AppContent() {
  const [currentPage, setCurrentPage] = useState('landing');

  // Shared Add Modals state triggered from Dashboard or Repository pages
  const [isResearchAddOpen, setIsResearchAddOpen] = useState(false);
  const [isPolicyAddOpen, setIsPolicyAddOpen] = useState(false);
  const [isDatasetAddOpen, setIsDatasetAddOpen] = useState(false);

  const handleOpenModalFromDashboard = (type) => {
    if (type === 'research') {
      setCurrentPage('research');
      setIsResearchAddOpen(true);
    } else if (type === 'policy') {
      setCurrentPage('policies');
      setIsPolicyAddOpen(true);
    } else if (type === 'dataset') {
      setCurrentPage('datasets');
      setIsDatasetAddOpen(true);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Top Navigation */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main View Router */}
      <main className="flex-1">
        {currentPage === 'landing' && <LandingPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'login' && <LoginPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'register' && <RegisterPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'dashboard' && (
          <Dashboard 
            setCurrentPage={setCurrentPage} 
            onOpenModal={handleOpenModalFromDashboard} 
          />
        )}
        {currentPage === 'simulator' && <PolicyImpactSimulator />}
        {currentPage === 'ai' && <AiResearchAssistant />}
        {currentPage === 'gis' && <GisDashboard />}
        {currentPage === 'research' && (
          <ResearchRepository 
            isAddModalOpen={isResearchAddOpen} 
            setIsAddModalOpen={setIsResearchAddOpen} 
          />
        )}
        {currentPage === 'policies' && (
          <PolicyRepository 
            isAddModalOpen={isPolicyAddOpen} 
            setIsAddModalOpen={setIsPolicyAddOpen} 
          />
        )}
        {currentPage === 'datasets' && (
          <DatasetRepository 
            isAddModalOpen={isDatasetAddOpen} 
            setIsAddModalOpen={setIsDatasetAddOpen} 
          />
        )}
        {currentPage === 'profile' && <ProfilePage setCurrentPage={setCurrentPage} />}
        {currentPage === 'admin' && <AdminDashboard />}
      </main>

    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

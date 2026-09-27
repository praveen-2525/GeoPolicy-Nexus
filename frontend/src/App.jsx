import React, { useState, useContext } from 'react';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';
import { Dashboard } from './pages/Dashboard';
import { ResearchRepository } from './pages/ResearchRepository';
import { PolicyRepository } from './pages/PolicyRepository';
import { DatasetRepository } from './pages/DatasetRepository';
import { ProfilePage } from './pages/ProfilePage';
import { AdminDashboard } from './pages/AdminDashboard';
import { GisDashboard } from './pages/GisDashboard';
import { AiResearchAssistant } from './pages/AiResearchAssistant';
import { PolicyImpactSimulator } from './pages/PolicyImpactSimulator';
import { CollaborationHub } from './pages/CollaborationHub';
import { AnalyticsDashboard } from './pages/AnalyticsDashboard';
import { BlockchainTrustModule } from './pages/BlockchainTrustModule';
import { OpenApiPortal } from './pages/OpenApiPortal';
import { CybersecurityDashboard } from './pages/CybersecurityDashboard';
import { DigitalTwinSimulation } from './pages/DigitalTwinSimulation';
import { KnowledgeGraphDashboard } from './pages/KnowledgeGraphDashboard';
import { InnovationPortal } from './pages/InnovationPortal';

export function AppContent() {
  const [currentPage, setCurrentPage] = useState('landing');
  const { user, textSize, highContrast } = useContext(AuthContext);

  // Authentication Guards
  const requireAuth = (Component) => {
    return user ? Component : <LoginPage setCurrentPage={setCurrentPage} />;
  };

  const requireRole = (Component, allowedRoles) => {
    if (!user) return <LoginPage setCurrentPage={setCurrentPage} />;
    if (!allowedRoles.includes(user.role)) return <div className="p-10 text-center text-red-600 font-bold">Access Denied: Insufficient Role Clearances.</div>;
    return Component;
  };

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

  const getTextSizeClass = () => {
    if (textSize === 'small') return 'text-size-sm';
    if (textSize === 'large') return 'text-size-lg';
    return '';
  };

  return (
    <div className={`min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans selection:bg-amber-100 selection:text-amber-900 ${getTextSizeClass()} ${highContrast ? 'high-contrast' : ''}`}>
      
      {/* Top Government of India Navigation */}
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {/* Main View Router */}
      <main className="flex-1">
        {/* Public Routes */}
        {currentPage === 'landing' && <LandingPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'login' && <LoginPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'register' && <RegisterPage setCurrentPage={setCurrentPage} />}
        {currentPage === 'forgot-password' && <ForgotPasswordPage setCurrentPage={setCurrentPage} />}
        
        {/* Protected Routes */}
        {currentPage === 'dashboard' && requireAuth(
          <Dashboard 
            setCurrentPage={setCurrentPage} 
            onOpenModal={handleOpenModalFromDashboard} 
          />
        )}
        {currentPage === 'gis' && requireAuth(<GisDashboard />)}
        {currentPage === 'research' && requireAuth(
          <ResearchRepository 
            isAddModalOpen={isResearchAddOpen} 
            setIsAddModalOpen={setIsResearchAddOpen} 
          />
        )}
        {currentPage === 'policies' && requireAuth(
          <PolicyRepository 
            isAddModalOpen={isPolicyAddOpen} 
            setIsAddModalOpen={setIsPolicyAddOpen} 
            setCurrentPage={setCurrentPage}
          />
        )}
        {currentPage === 'datasets' && requireAuth(
          <DatasetRepository 
            isAddModalOpen={isDatasetAddOpen} 
            setIsAddModalOpen={setIsDatasetAddOpen} 
          />
        )}
        {currentPage === 'simulator' && requireAuth(<PolicyImpactSimulator />)}
        {currentPage === 'ai' && requireAuth(<AiResearchAssistant />)}
        {currentPage === 'digital-twin' && requireAuth(<DigitalTwinSimulation />)}
        {currentPage === 'knowledge-graph' && requireAuth(<KnowledgeGraphDashboard />)}
        {currentPage === 'innovation' && requireAuth(<InnovationPortal />)}
        {currentPage === 'collaboration' && requireAuth(<CollaborationHub />)}
        {currentPage === 'analytics' && requireAuth(<AnalyticsDashboard />)}
        {currentPage === 'blockchain' && requireAuth(<BlockchainTrustModule />)}
        {currentPage === 'api-portal' && requireAuth(<OpenApiPortal />)}
        {currentPage === 'cybersecurity' && requireRole(<CybersecurityDashboard />, ['Admin', 'Super Admin', 'Platform Administrator', 'Government Official'])}
        {currentPage === 'profile' && requireAuth(<ProfilePage setCurrentPage={setCurrentPage} />)}
        {currentPage === 'admin' && requireRole(<AdminDashboard />, ['Admin', 'Super Admin', 'Platform Administrator'])}
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


import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { useAuth } from "./contexts/AuthContext";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Documents from "./pages/Documents";
import Aide from "./pages/Aide";
import Profile from "./pages/Profile";
import StepPage from "./pages/StepPage";
import NotFound from "./pages/NotFound";
import CandidaturesPage from "./pages/CandidaturesPage";
import PartenairesPage from "./pages/PartenairesPage";
import IntroductionVideo from "./pages/IntroductionVideo";
import CVGeneratorPage from "./pages/CVGeneratorPage";
import MotivationLetterPage from "./pages/MotivationLetterPage";
import Chatbot from "./components/chat/Chatbot";
import VoiceDictation from "./components/VoiceDictation";
import { Helmet } from "react-helmet";

const queryClient = new QueryClient();

// Route protégée qui vérifie si l'utilisateur est connecté
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Route étape qui vérifie si l'utilisateur a complété l'étape précédente
const StepRoute = ({ children, stepId }: { children: React.ReactNode, stepId: number }) => {
  const { user } = useAuth();
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  // Vérifier si l'utilisateur peut accéder à cette étape
  if (stepId > 1 && user.currentStep < stepId - 1) {
    return <Navigate to={`/etape/${user.currentStep}`} replace />;
  }

  return <>{children}</>;
};

// Composant AppRoutes pour utiliser useAuth après son initialisation
const AppRoutes = () => {
  const { isAuthenticated } = useAuth();
  
  return (
    <>
      <Helmet>
        <title>EmploiAvenir - Votre parcours vers l'emploi</title>
        <meta name="description" content="EmploiAvenir vous accompagne dans votre parcours vers l'emploi avec un parcours personnalisé en 8 étapes" />
        <meta name="keywords" content="emploi, cv, lettre de motivation, recherche emploi, entretien, candidature, formation" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
        <meta property="og:title" content="EmploiAvenir - Votre parcours vers l'emploi" />
        <meta property="og:description" content="Un accompagnement personnalisé pour votre recherche d'emploi" />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://emploiavenir.fr" />
      </Helmet>
      
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/documents" element={
          <ProtectedRoute>
            <Documents />
          </ProtectedRoute>
        } />
        <Route path="/aide" element={<Aide />} />
        <Route path="/profile" element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } />
        <Route path="/introduction" element={
          <ProtectedRoute>
            <IntroductionVideo />
          </ProtectedRoute>
        } />
        <Route path="/etape/:stepId" element={
          <StepRoute stepId={parseInt(window.location.pathname.split('/').pop() || '1')}>
            <StepPage />
          </StepRoute>
        } />
        <Route path="/candidatures" element={
          <ProtectedRoute>
            <CandidaturesPage />
          </ProtectedRoute>
        } />
        <Route path="/partenaires" element={<PartenairesPage />} />
        <Route path="/cv-generator" element={
          <ProtectedRoute>
            <CVGeneratorPage />
          </ProtectedRoute>
        } />
        <Route path="/motivation-letter-generator" element={
          <ProtectedRoute>
            <MotivationLetterPage />
          </ProtectedRoute>
        } />
        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      
      {/* Afficher le chatbot sur toutes les pages */}
      <Chatbot />
      
      {/* Ajouter le bouton de dictée vocale globale */}
      <VoiceDictation />
    </>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

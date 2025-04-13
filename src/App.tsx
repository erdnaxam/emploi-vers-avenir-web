
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

const queryClient = new QueryClient();

// Route protégée qui vérifie si l'utilisateur est connecté
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Composant AppRoutes pour utiliser useAuth après son initialisation
const AppRoutes = () => {
  return (
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
        <ProtectedRoute>
          <StepPage />
        </ProtectedRoute>
      } />
      <Route path="/candidatures" element={
        <ProtectedRoute>
          <CandidaturesPage />
        </ProtectedRoute>
      } />
      <Route path="/partenaires" element={
        <ProtectedRoute>
          <PartenairesPage />
        </ProtectedRoute>
      } />
      {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
      <Route path="*" element={<NotFound />} />
    </Routes>
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

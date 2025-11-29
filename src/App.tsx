import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ThemeProvider } from "@/contexts/ThemeContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { AppLayout } from "@/components/layout/AppLayout";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import ProjectDetail from "./pages/ProjectDetail";
import Applications from "./pages/Applications";
import Messages from "./pages/Messages";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

const queryClient = new QueryClient();

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <>{children}</> : <Navigate to="/login" replace />;
}

function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  return !isAuthenticated ? <>{children}</> : <Navigate to="/" replace />;
}

const AppRoutes = () => (
  <Routes>
    <Route
      path="/login"
      element={
        <PublicRoute>
          <Login />
        </PublicRoute>
      }
    />
    <Route
      path="/register"
      element={
        <PublicRoute>
          <Register />
        </PublicRoute>
      }
    />
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <AppLayout>
            <Home />
          </AppLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/projects"
      element={
        <ProtectedRoute>
          <AppLayout>
            <Projects />
          </AppLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/projects/:id"
      element={
        <ProtectedRoute>
          <AppLayout>
            <ProjectDetail />
          </AppLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/applications"
      element={
        <ProtectedRoute>
          <AppLayout>
            <Applications />
          </AppLayout>
        </ProtectedRoute>
      }
    />
    <Route
      path="/messages"
      element={
        <ProtectedRoute>
          <AppLayout>
            <Messages />
          </AppLayout>
        </ProtectedRoute>
      }
    />
  </Routes>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <ThemeProvider>
        <LanguageProvider>
          <AuthProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <AppRoutes />
            </BrowserRouter>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;

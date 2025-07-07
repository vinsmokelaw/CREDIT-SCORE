import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Header } from './components/Layout/Navbar';
import { Footer } from './components/Layout/Footer';
import { Landing } from './pages/Landing';
import { Login } from './pages/Auth/Login';
import { Signup } from './pages/Auth/Signup';
import { ClientDashboard } from './pages/Dashboard/ClientDashboard';
import { BankDashboard } from './pages/Dashboard/BankDashboard';

function ProtectedRoute({ children, userType }: { children: React.ReactNode; userType?: 'client' | 'bank' }) {
  const { isAuthenticated, user } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  if (userType && user?.type !== userType) {
    return <Navigate to={user?.type === 'client' ? '/client-dashboard' : '/bank-dashboard'} replace />;
  }
  
  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Routes>
          <Route 
            path="/" 
            element={
              isAuthenticated 
                ? <Navigate to={user?.type === 'client' ? '/client-dashboard' : '/bank-dashboard'} replace />
                : <Landing />
            } 
          />
          <Route 
            path="/login" 
            element={
              isAuthenticated 
                ? <Navigate to={user?.type === 'client' ? '/client-dashboard' : '/bank-dashboard'} replace />
                : <Login />
            } 
          />
          <Route 
            path="/signup" 
            element={
              isAuthenticated 
                ? <Navigate to={user?.type === 'client' ? '/client-dashboard' : '/bank-dashboard'} replace />
                : <Signup />
            } 
          />
          <Route 
            path="/client-dashboard" 
            element={
              <ProtectedRoute userType="client">
                <ClientDashboard />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/bank-dashboard" 
            element={
              <ProtectedRoute userType="bank">
                <BankDashboard />
              </ProtectedRoute>
            } 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isAuthenticated && <Footer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
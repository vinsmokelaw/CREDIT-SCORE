import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Header } from './components/Layout/Navbar';
import { Footer } from './components/Layout/Footer';
import { Landing } from './pages/Landing';
import { Login } from './pages/Auth/Login';
import { Signup } from './pages/Auth/Signup';
import { ClientDashboard } from './pages/Dashboard/ClientDashboard';
import { BankDashboard } from './pages/Dashboard/BankDashboard';
import { supabase } from './supabaseClient';

// 👮 Protected route logic
function ProtectedRoute({ children, userType }: { children: React.ReactNode; userType?: 'client' | 'bank' }) {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (userType && user?.type !== userType) {
    return <Navigate to={user?.type === 'client' ? '/client-dashboard' : '/bank-dashboard'} replace />;
  }

  return <>{children}</>;
}

// 📝 Page to fetch todos from Supabase
function Page() {
  const [todos, setTodos] = useState<{ id: number; title: string }[]>([]);

  useEffect(() => {
    async function getTodos() {
      const { data, error } = await supabase.from('todos').select('*');
      if (error) console.error('Error fetching todos:', error);
      if (data) setTodos(data);
    }

    getTodos();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Todos from Supabase</h2>
      <ul className="space-y-2">
        {todos.map((todo) => (
          <li key={todo.id} className="bg-purple-100 text-purple-800 p-3 rounded-lg shadow">
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

// 🌐 Route definitions
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
              isAuthenticated ? (
                <Navigate to={user?.type === 'client' ? '/client-dashboard' : '/bank-dashboard'} replace />
              ) : (
                <Landing />
              )
            }
          />
          <Route
            path="/login"
            element={
              isAuthenticated ? (
                <Navigate to={user?.type === 'client' ? '/client-dashboard' : '/bank-dashboard'} replace />
              ) : (
                <Login />
              )
            }
          />
          <Route
            path="/signup"
            element={
              isAuthenticated ? (
                <Navigate to={user?.type === 'client' ? '/client-dashboard' : '/bank-dashboard'} replace />
              ) : (
                <Signup />
              )
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
          <Route path="/test-todos" element={<Page />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!isAuthenticated && <Footer />}
    </div>
  );
}

// 🔌 Wrap app with Auth and Router
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

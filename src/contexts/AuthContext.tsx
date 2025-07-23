import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';

type UserType = {
  id: string;
  email: string;
  full_name?: string;
  type: 'client' | 'bank';
  bank?: string;
};

interface AuthContextProps {
  isAuthenticated: boolean;
  user: UserType | null;
  loading: boolean;
  signup: (
    name: string,
    email: string,
    password: string,
    userType: 'client' | 'bank',
    bank?: string
  ) => Promise<{ success: boolean; error: string | null }>;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error: string | null }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  isAuthenticated: false,
  user: null,
  loading: true,
  signup: async () => ({ success: false, error: 'AuthProvider not initialized' }),
  login: async () => ({ success: false, error: 'AuthProvider not initialized' }),
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();

      if (data.session?.user) {
        const { id, email, user_metadata } = data.session.user;
        const type = user_metadata?.type ?? 'client';
        setUser({ 
          id, 
          email: email || '', 
          full_name: user_metadata?.full_name,
          type,
          bank: user_metadata?.bank 
        });
      }

      setLoading(false);
    };

    getSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const { id, email, user_metadata } = session.user;
        const type = user_metadata?.type ?? 'client';
        setUser({ 
          id, 
          email: email || '', 
          full_name: user_metadata?.full_name,
          type,
          bank: user_metadata?.bank 
        });
      } else {
        setUser(null);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signup = async (
    name: string,
    email: string,
    password: string,
    userType: 'client' | 'bank',
    bank?: string
  ): Promise<{ success: boolean; error: string | null }> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            type: userType,
            ...(userType === 'bank' && bank ? { bank } : {}),
          },
        },
      });

      if (error) {
        console.error('Signup error:', error.message);
        return { success: false, error: error.message };
      }

      if (data.user) {
        const { id, email, user_metadata } = data.user;
        setUser({ 
          id, 
          email: email || '', 
          full_name: user_metadata?.full_name,
          type: userType,
          bank: user_metadata?.bank 
        });
      }

      return { success: true, error: null };
    } catch (err) {
      console.error('Unexpected error during signup:', err);
      return { success: false, error: 'An unexpected error occurred' };
    }
  };

  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error: string | null }> => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Login error:', error.message);
        return { success: false, error: error.message };
      }

      if (data.user) {
        const { id, email, user_metadata } = data.user;
        setUser({ 
          id, 
          email: email || '', 
          full_name: user_metadata?.full_name,
          type: user_metadata?.type ?? 'client',
          bank: user_metadata?.bank 
        });
      }

      return { success: true, error: null };
    } catch (err) {
      console.error('Unexpected error during login:', err);
      return { success: false, error: 'An unexpected error occurred' };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      await supabase.auth.signOut();
      setUser(null);
    } catch (error) {
      console.error('Error during logout:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        isAuthenticated: !!user, 
        user, 
        loading, 
        signup, 
        login,
        logout 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
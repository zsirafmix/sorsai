"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, demoStore } from './demoStore';
import { createClient } from '../supabase/client';

interface AuthContextProps {
  user: UserProfile | null;
  isLoading: boolean;
  isDemoMode: boolean;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => void;
  toggleTier: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  isLoading: true,
  isDemoMode: true,
  login: async () => {},
  logout: async () => {},
  updateProfile: () => {},
  toggleTier: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(true);

  useEffect(() => {
    const supabase = createClient();
    if (supabase) {
      setIsDemoMode(false);
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          const profile = demoStore.getProfile();
          setUser({ ...profile, id: session.user.id, displayName: session.user.email?.split('@')[0] || profile.displayName });
        } else {
          // Fallback to local profile
          setUser(demoStore.getProfile());
        }
        setIsLoading(false);
      });
    } else {
      setIsDemoMode(true);
      setUser(demoStore.getProfile());
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string) => {
    const updated = demoStore.saveProfile({
      displayName: email.split('@')[0] || "Kereső Vándor",
      isOnboarded: true
    });
    setUser(updated);
  };

  const logout = async () => {
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    const reset = demoStore.saveProfile({
      displayName: "Kereső Vándor",
      tier: "free"
    });
    setUser(reset);
  };

  const updateProfile = (partial: Partial<UserProfile>) => {
    const updated = demoStore.saveProfile(partial);
    setUser(updated);
  };

  const toggleTier = () => {
    if (!user) return;
    const newTier = user.tier === 'free' ? 'premium' : 'free';
    updateProfile({ tier: newTier });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isDemoMode,
        login,
        logout,
        updateProfile,
        toggleTier
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { UserProfile, demoStore } from './demoStore';
import { createClient } from '../supabase/client';

export const ADMIN_PASSCODE = process.env.NEXT_PUBLIC_ADMIN_SECRET || "sorsai-admin-2026";

interface AuthContextProps {
  user: UserProfile | null;
  isLoading: boolean;
  isDemoMode: boolean;
  isAdmin: boolean;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (profile: Partial<UserProfile>) => void;
  toggleTier: () => void;
  verifyAdminPasscode: (passcode: string) => boolean;
  revokeAdmin: () => void;
  setDemoMode: (isDemo: boolean) => void;
  toggleDemoMode: () => void;
}

const AuthContext = createContext<AuthContextProps>({
  user: null,
  isLoading: true,
  isDemoMode: false, // Default to LIVE mode
  isAdmin: false,
  login: async () => {},
  logout: async () => {},
  updateProfile: () => {},
  toggleTier: () => {},
  verifyAdminPasscode: () => false,
  revokeAdmin: () => {},
  setDemoMode: () => {},
  toggleDemoMode: () => {},
});

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isDemoMode, setIsDemoMode] = useState(false); // Live by default

  useEffect(() => {
    // Check saved mode or env variable
    let initialDemo = false;
    try {
      const saved = localStorage.getItem('sorsai_app_mode');
      if (saved === 'demo') {
        initialDemo = true;
      } else if (saved === 'live') {
        initialDemo = false;
      } else {
        // Default to live unless explicitly configured as demo in env
        initialDemo = process.env.NEXT_PUBLIC_APP_MODE === 'demo';
        localStorage.setItem('sorsai_app_mode', 'live');
      }
    } catch {
      initialDemo = false;
    }
    setIsDemoMode(initialDemo);

    const supabase = createClient();
    if (supabase) {
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
      setUser(demoStore.getProfile());
      setIsLoading(false);
    }
  }, []);

  const setDemoMode = (demo: boolean) => {
    setIsDemoMode(demo);
    try {
      localStorage.setItem('sorsai_app_mode', demo ? 'demo' : 'live');
    } catch {}
    demoStore.addAuditLog(
      "Rendszermód Váltás",
      demo ? "Alkalmazás átváltva Demo Módba" : "✨ Alkalmazás átváltva Éles Módba (Live Production)"
    );
  };

  const toggleDemoMode = () => {
    setDemoMode(!isDemoMode);
  };

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

  const verifyAdminPasscode = (passcode: string): boolean => {
    if (passcode.trim() === ADMIN_PASSCODE) {
      const updated = demoStore.saveProfile({ role: 'admin' });
      demoStore.addAuditLog("Admin Jogosultság Feloldása", "Sikeres belépés adminisztrátori jelkóddal");
      setUser(updated);
      return true;
    }
    demoStore.addAuditLog("Sikertelen Admin Kísérlet", "Helytelen admin jelkód kísérlet");
    return false;
  };

  const revokeAdmin = () => {
    const updated = demoStore.saveProfile({ role: 'user' });
    demoStore.addAuditLog("Admin Jogok Lemondása", "Adminisztrátori jogosultság visszavonva");
    setUser(updated);
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isDemoMode,
        isAdmin,
        login,
        logout,
        updateProfile,
        toggleTier,
        verifyAdminPasscode,
        revokeAdmin,
        setDemoMode,
        toggleDemoMode,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

"use client";

import React, { ReactNode } from 'react';
import { DesktopSidebar } from './DesktopSidebar';
import { Header } from './Header';
import { MobileBottomNav } from './MobileBottomNav';

interface AppShellProps {
  children: ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  return (
    <div className="flex min-h-screen w-full bg-space-950 text-white">
      {/* Left desktop sidebar */}
      <DesktopSidebar />

      {/* Main content column */}
      <div className="flex flex-1 flex-col min-w-0 pb-20 lg:pb-8">
        <Header />
        <main className="flex-1 px-4 sm:px-8 py-6 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>

      {/* Mobile bottom navigation */}
      <MobileBottomNav />
    </div>
  );
};

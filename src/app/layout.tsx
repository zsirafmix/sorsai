import type { Metadata } from "next";
import "./globals.css";
import { Starfield } from "@/components/mystical/Starfield";
import { I18nProvider } from "@/lib/i18n";
import { AuthProvider } from "@/lib/storage/authContext";

export const metadata: Metadata = {
  title: "SorsAI - Személyes Spirituális & Önismereti Útmutató",
  description: "Tarot, numerológia, asztrológia és mesterséges intelligencia egyetlen személyes spirituális útmutatóban.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu" className="dark">
      <body className="bg-space-950 text-white min-h-screen selection:bg-gold-500/30 selection:text-gold-200">
        <I18nProvider>
          <AuthProvider>
            <Starfield />
            <div className="relative z-10 flex min-h-screen flex-col">
              {children}
            </div>
          </AuthProvider>
        </I18nProvider>
      </body>
    </html>
  );
}

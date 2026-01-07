"use client";

import { Toaster } from "@/components/ui/sonner";

import { GlobalModal } from "../global-modal";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <QueryProvider>
        {children}
        <GlobalModal />
        <Toaster richColors closeButton position="top-right" />
      </QueryProvider>
    </ThemeProvider>
  );
}

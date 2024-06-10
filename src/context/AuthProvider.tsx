"use client"

import { SessionProvider } from "next-auth/react";
import React from "react"; // Ensure React is imported

interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}

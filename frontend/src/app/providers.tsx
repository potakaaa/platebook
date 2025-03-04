"use client";

import { SessionProvider } from "next-auth/react";
import SessionInitializer from "./SessionInitalizer";

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider><SessionInitializer/>{children}</SessionProvider>;
}

"use client";

import { ConvexProvider, ConvexReactClient } from "convex/react";
import { ReactNode } from "react";

const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL;

let convex: ConvexReactClient | null = null;

if (convexUrl) {
  convex = new ConvexReactClient(convexUrl);
}

export function ConvexClientProvider({ children }: { children: ReactNode }) {
  if (!convex) {
    // During development or build time without Convex running
    return <>{children}</>;
  }
  return <ConvexProvider client={convex}>{children}</ConvexProvider>;
}
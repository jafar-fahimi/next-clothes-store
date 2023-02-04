import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <section className="min-h-screen bg-slate-800">{children}</section>;
}

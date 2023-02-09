import React from "react";
import Navbar from "./Navbar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen px-8 pb-8">
      <Navbar />
      {children}
    </section>
  );
}

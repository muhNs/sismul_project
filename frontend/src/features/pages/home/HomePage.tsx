"use client";

import React from "react";
import { Header } from "@/components/layout/Header";
import { Navbar } from "@/components/layout/Navbar";
import { ClassCard } from "./components/ClassCard";

export default function HomePage() {
  return (
    <>
      <Header title="Learnly" showBack={false} />
      <main className="pt-24 pb-28 px-margin-mobile max-w-2xl mx-auto w-full flex-1">
        <ClassCard />
      </main>
      <Navbar />
    </>
  );
}

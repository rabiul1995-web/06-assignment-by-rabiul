"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [planCount, setPlanCount] = useState(0);
  const [savedCount, setSavedCount] = useState(0);

useEffect(() => {
  const updateCounts = () => {
    const savedPlan = localStorage.getItem("fitlog-plan");
    const savedWorkouts = localStorage.getItem("savedWorkouts");

    const plan = savedPlan ? JSON.parse(savedPlan) : [];
    const saved = savedWorkouts ? JSON.parse(savedWorkouts) : [];

    setPlanCount(plan.length);
    setSavedCount(saved.length);
  };

  updateCounts();

  const interval = setInterval(updateCounts, 500);

  return () => {
    clearInterval(interval);
  };
}, []);

  return (
    <nav className="sticky top-0 z-50 border-b border-zinc-800 bg-black">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">

        {/* Logo */}
        <Link
          href="/"
          className="text-2xl font-black tracking-tight text-white"
        >
          FIT<span className="text-lime-400">LOG</span>
        </Link>

        {/* Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="font-semibold text-lime-400"
          >
            Workout
          </Link>

          <Link
            href="/my-plan"
            className="font-semibold text-zinc-400 transition hover:text-white"
          >
            My Plan
          </Link>
        </div>

        {/* Counters */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* Plan Count */}
          <Link
            href="/my-plan"
            className="rounded-full bg-lime-400 px-3 py-2 text-xs font-black text-black sm:px-4"
          >
            Plan <span>{planCount}</span>
          </Link>

          {/* Saved Count */}
          <Link
            href="/my-plan"
            className="rounded-full border border-zinc-600 px-3 py-2 text-xs font-black text-white sm:px-4"
          >
            Saved <span>{savedCount}</span>
          </Link>

        </div>
      </div>
    </nav>
  );
}
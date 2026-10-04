"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Navbar() {
  const [planCount, setPlanCount] = useState(0);

  useEffect(() => {
    const savedPlan = localStorage.getItem("fitlog-plan");

    if (savedPlan) {
      const plan = JSON.parse(savedPlan);
      setPlanCount(plan.length);
    }
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
          <Link
            href="/my-plan"
            className="rounded-full bg-lime-400 px-3 py-2 text-xs font-black text-black sm:px-4"
          >
            Plan <span>{planCount}</span>
          </Link>

          <Link
            href="/my-plan"
            className="rounded-full border border-zinc-600 px-3 py-2 text-xs font-black text-white sm:px-4"
          >
            Saved <span>{planCount}</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
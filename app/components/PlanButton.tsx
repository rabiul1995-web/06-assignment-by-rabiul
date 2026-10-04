"use client";

import { useState } from "react";

type PlanButtonProps = {
  workoutId: number;
};

export default function PlanButton({ workoutId }: PlanButtonProps) {
  const [added, setAdded] = useState(false);

  function handleAdd() {
    const savedPlan = localStorage.getItem("fitlog-plan");

    const plan: number[] = savedPlan ? JSON.parse(savedPlan) : [];

    if (!plan.includes(workoutId)) {
      plan.push(workoutId);
      localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    }

    setAdded(true);
  }

  return (
    <button
      type="button"
      onClick={handleAdd}
      className="mt-5 w-full bg-lime-400 px-4 py-3 text-sm font-black uppercase text-black transition hover:bg-lime-300"
    >
      {added ? "Added to Plan ✓" : "Add to Plan"}
    </button>
  );
}
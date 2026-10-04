"use client";

import { useState } from "react";

type PlanButtonProps = {
  workoutId: number;
};

export default function PlanButton({ workoutId }: PlanButtonProps) {
  const [added, setAdded] = useState(false);

  function handleAdd() {
    setAdded(true);
    console.log("Workout added:", workoutId);
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
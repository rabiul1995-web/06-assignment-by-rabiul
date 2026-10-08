"use client";

import { useState } from "react";

type Workout = {
          id: number;
          name: string;
          image: string;
          muscleGroups: string[];
          equipment: string;
          difficulty: string;
          duration: number;
          caloriesBurned: number;
          rating: number;
};

export default function WorkoutActions({
          workout,
}: {
          workout: Workout;
}) {
          const [added, setAdded] = useState(false);
          const [saved, setSaved] = useState(false);

          const handleAddToPlan = () => {
                    const existingPlan = JSON.parse(
                              localStorage.getItem("myPlan") || "[]"
                    );

                    const alreadyAdded = existingPlan.some(
                              (item: Workout) => item.id === workout.id
                    );

                    if (!alreadyAdded) {
                              localStorage.setItem(
                                        "myPlan",
                                        JSON.stringify([...existingPlan, workout])
                              );
                    }

                    setAdded(true);
          };

          const handleSaveForLater = () => {
                    const existingSaved = JSON.parse(
                              localStorage.getItem("savedWorkouts") || "[]"
                    );

                    const alreadySaved = existingSaved.some(
                              (item: Workout) => item.id === workout.id
                    );

                    if (!alreadySaved) {
                              localStorage.setItem(
                                        "savedWorkouts",
                                        JSON.stringify([...existingSaved, workout])
                              );
                    }

                    setSaved(true);
          };

          return (
                    <div className="mt-8 flex flex-wrap gap-4">
                              <button
                                        onClick={handleAddToPlan}
                                        className="bg-lime-400 px-6 py-3 font-black uppercase text-black transition hover:bg-lime-300"
                              >
                                        {added ? "✓ Added to My Plan" : "Add to My Plan"}
                              </button>

                              <button
                                        onClick={handleSaveForLater}
                                        className="border border-zinc-700 px-6 py-3 font-black uppercase text-white transition hover:border-lime-400 hover:text-lime-400"
                              >
                                        {saved ? "✓ Saved" : "Save for Later"}
                              </button>
                    </div>
          );
}
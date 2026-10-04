"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

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

export default function MyPlan() {
          const [workouts, setWorkouts] = useState<Workout[]>([]);
          const [loading, setLoading] = useState(true);
          function handleRemove(workoutId: number) {
                    const savedPlan = localStorage.getItem("fitlog-plan");

                    const plan: number[] = savedPlan ? JSON.parse(savedPlan) : [];

                    const updatedPlan = plan.filter((id) => id !== workoutId);

                    localStorage.setItem("fitlog-plan", JSON.stringify(updatedPlan));

                    setWorkouts((currentWorkouts) =>
                              currentWorkouts.filter((workout) => workout.id !== workoutId)
                    );
          }
          function handleRemoveAll() {
                    localStorage.removeItem("fitlog-plan");
                    setWorkouts([]);
          }

          useEffect(() => {
                    const savedPlan = localStorage.getItem("fitlog-plan");

                    const planIds: number[] = savedPlan ? JSON.parse(savedPlan) : [];

                    fetch("https://api.abcz.workers.dev/api/fitlog")
                              .then((response) => response.json())
                              .then((data: Workout[]) => {
                                        const selectedWorkouts = data.filter((workout) =>
                                                  planIds.includes(workout.id)
                                        );

                                        setWorkouts(selectedWorkouts);
                                        setLoading(false);
                              })
                              .catch((error) => {
                                        console.error("Failed to fetch workouts:", error);
                                        setLoading(false);
                              });
          }, []);

          return (
                    <main className="min-h-screen bg-black px-6 py-16 text-white">
                              <div className="mx-auto max-w-7xl">
                                        <div className="mb-10">
                                                  <p className="text-sm font-bold tracking-[0.3em] text-lime-400">
                                                            YOUR WORKOUT PLAN
                                                  </p>

                                                  <h1 className="mt-3 text-4xl font-black md:text-5xl">
                                                            MY PLAN
                                                  </h1>

                                                  <p className="mt-3 text-zinc-400">
                                                            Your selected workouts are listed below.
                                                  </p>
                                        </div>

                                        {loading && (
                                                  <div className="flex min-h-60 items-center justify-center">
                                                            <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-lime-400"></div>
                                                  </div>
                                        )}

                                        {!loading && workouts.length === 0 && (
                                                  <div className="border border-zinc-800 bg-zinc-900 p-10 text-center">
                                                            <h2 className="text-2xl font-black">
                                                                      YOUR PLAN IS EMPTY
                                                            </h2>

                                                            <p className="mt-3 text-zinc-400">
                                                                      Add a workout from the library to start your plan.
                                                            </p>

                                                            <Link
                                                                      href="/#library"
                                                                      className="mt-6 inline-block bg-lime-400 px-6 py-3 text-sm font-black uppercase text-black transition hover:bg-lime-300"
                                                            >
                                                                      Browse Workouts
                                                            </Link>
                                                  </div>
                                        )}
                                        {!loading && workouts.length > 0 && (
                                                  <button
                                                            type="button"
                                                            onClick={handleRemoveAll}
                                                            className="mb-8 border border-red-500 px-6 py-3 text-sm font-black uppercase text-red-500 transition hover:bg-red-500 hover:text-white"
                                                  >
                                                            Remove All
                                                  </button>
                                        )}
                                        {!loading && workouts.length > 0 && (
                                                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                                                            {workouts.map((workout) => (
                                                                      <div
                                                                                key={workout.id}
                                                                                className="overflow-hidden border border-zinc-800 bg-zinc-900"
                                                                      >
                                                                                <img
                                                                                          src="/Overhead_press.png"
                                                                                          alt={workout.name}
                                                                                          className="h-56 w-full object-cover"
                                                                                />

                                                                                <div className="p-5">
                                                                                          <h2 className="text-xl font-black uppercase">
                                                                                                    {workout.name}
                                                                                          </h2>

                                                                                          <p className="mt-2 text-sm text-zinc-400">
                                                                                                    {workout.muscleGroups.join(", ")}
                                                                                          </p>

                                                                                          <p className="mt-2 text-sm text-zinc-400">
                                                                                                    {workout.duration} minutes
                                                                                          </p>

                                                                                          <Link
                                                                                                    href={"/workout/" + workout.id}
                                                                                                    className="mt-5 inline-block text-sm font-bold text-lime-400 hover:text-lime-300"
                                                                                          >
                                                                                                    View Details →
                                                                                          </Link>
                                                                                          <button
                                                                                                    type="button"
                                                                                                    onClick={() => handleRemove(workout.id)}
                                                                                                    className="mt-4 w-full border border-red-500 px-4 py-3 text-sm font-black uppercase text-red-500 transition hover:bg-red-500 hover:text-white"
                                                                                          >
                                                                                                    Remove from Plan
                                                                                          </button>
                                                                                </div>
                                                                      </div>
                                                            ))}
                                                  </div>
                                        )}
                              </div>
                    </main>
          );
}
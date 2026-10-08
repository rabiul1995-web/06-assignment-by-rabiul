"use client";

import { useEffect, useState } from "react";

import Hero from "./components/Hero";
import WorkoutCard from "./components/WorkoutCard";

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

export default function Home() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [sortBy, setSortBy] = useState("duration");

  useEffect(() => {
    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((response) => response.json())
      .then((data) => {
        setWorkouts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch workouts:", error);
        setError("Failed to load workouts. Please try again.");
        setLoading(false);
      });
  }, []);
  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return a.caloriesBurned - b.caloriesBurned;
    }

    if (sortBy === "rating") {
      return b.rating - a.rating;
    }

    return 0;
  });
  return (
    <main className="min-h-screen bg-black text-white">

      <Hero />

      {/* Library */}
      <section id="library" className="bg-zinc-950 px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10">
            <h2 className="text-4xl font-black md:text-5xl">
              THE LIBRARY
            </h2>

            <p className="mt-3 text-zinc-400">
              Twelve lifts covering every major muscle group.
            </p>
          </div>
          <div className="mb-8 flex items-center justify-end">
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-3 pr-10 text-sm font-semibold text-white outline-none transition focus:border-lime-400"
              >
                <option value="duration">Duration</option>
                <option value="calories">Calories (Low → High)</option>
                <option value="rating">Rating</option>
              </select>

              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
                ▼
              </span>
            </div>
          </div>

          {/* Loading */}
          {loading && (
            <div className="flex min-h-60 items-center justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-lime-400"></div>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="rounded-lg border border-red-900 bg-red-950/30 p-6 text-center text-red-400">
              {error}
            </div>
          )}

          {/* Workout Cards */}
          {!loading && !error && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {sortedWorkouts.map((workout) => (
                <WorkoutCard
                  key={workout.id}
                  workout={workout}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
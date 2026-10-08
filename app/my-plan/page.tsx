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

type Tab = "today" | "saved";

export default function MyPlan() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<Tab>("today");
  const [sortBy, setSortBy] = useState("duration");

  useEffect(() => {
    const savedPlan = localStorage.getItem("fitlog-plan");
    const planIds: number[] = savedPlan ? JSON.parse(savedPlan) : [];

    const saved = localStorage.getItem("savedWorkouts");
    const savedList: Workout[] = saved ? JSON.parse(saved) : [];

    const completed = localStorage.getItem("fitlog-completed");
    const completedList: number[] = completed
      ? JSON.parse(completed)
      : [];

    setSavedWorkouts(savedList);
    setCompletedIds(completedList);

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

  const handleRemove = (workoutId: number) => {
    const savedPlan = localStorage.getItem("fitlog-plan");
    const plan: number[] = savedPlan ? JSON.parse(savedPlan) : [];

    const updatedPlan = plan.filter((id) => id !== workoutId);

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(updatedPlan)
    );

    setWorkouts((current) =>
      current.filter((workout) => workout.id !== workoutId)
    );
  };

  const handleRemoveAll = () => {
    localStorage.removeItem("fitlog-plan");
    setWorkouts([]);
  };

  const handleMarkAsDone = (workoutId: number) => {
    const alreadyCompleted = completedIds.includes(workoutId);

    let updatedCompleted: number[];

    if (alreadyCompleted) {
      updatedCompleted = completedIds.filter(
        (id) => id !== workoutId
      );
    } else {
      updatedCompleted = [...completedIds, workoutId];
    }

    localStorage.setItem(
      "fitlog-completed",
      JSON.stringify(updatedCompleted)
    );

    setCompletedIds(updatedCompleted);
  };

  const handleRemoveSaved = (workoutId: number) => {
    const updatedSaved = savedWorkouts.filter(
      (workout) => workout.id !== workoutId
    );

    localStorage.setItem(
      "savedWorkouts",
      JSON.stringify(updatedSaved)
    );

    setSavedWorkouts(updatedSaved);
  };

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

  const totalMinutes = workouts.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = workouts.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  const currentList =
    activeTab === "today" ? sortedWorkouts : savedWorkouts;

  return (
    <main className="min-h-screen bg-black px-6 py-12 text-white">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-bold tracking-[0.3em] text-lime-400">
            YOUR WORKOUT PLAN
          </p>

          <h1 className="mt-3 text-4xl font-black uppercase md:text-5xl">
            MY PLAN
          </h1>

          <p className="mt-3 text-zinc-400">
            Cap of five lifts for today. Finish them, then load more.
          </p>
        </div>

        {/* Stats */}
        <div className="mb-8 grid grid-cols-1 border border-zinc-800 bg-zinc-900 sm:grid-cols-3">
          <div className="border-b border-zinc-800 p-6 sm:border-b-0 sm:border-r">
            <p className="text-sm text-zinc-500">
              Exercises
            </p>

            <p className="mt-2 text-4xl font-black text-lime-400">
              {workouts.length}
            </p>
          </div>

          <div className="border-b border-zinc-800 p-6 sm:border-b-0 sm:border-r">
            <p className="text-sm text-zinc-500">
              Minutes
            </p>

            <p className="mt-2 text-4xl font-black">
              {totalMinutes}
            </p>
          </div>

          <div className="p-6">
            <p className="text-sm text-zinc-500">
              Calories
            </p>

            <p className="mt-2 text-4xl font-black">
              {totalCalories}
            </p>
          </div>
        </div>

        {/* Tabs + Sort */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

          <div className="flex w-fit border border-zinc-800 bg-zinc-900 p-1">
            <button
              type="button"
              onClick={() => setActiveTab("today")}
              className={`px-5 py-2 text-sm font-bold ${
                activeTab === "today"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-500"
              }`}
            >
              Today&apos;s Plan
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("saved")}
              className={`px-5 py-2 text-sm font-bold ${
                activeTab === "saved"
                  ? "bg-zinc-800 text-white"
                  : "text-zinc-500"
              }`}
            >
              Saved
            </button>
          </div>

          {activeTab === "today" && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-zinc-500">
                Sort By
              </span>

              <select
                value={sortBy}
                onChange={(event) =>
                  setSortBy(event.target.value)
                }
                className="border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-white outline-none"
              >
                <option value="duration">
                  Duration
                </option>

                <option value="calories">
                  Calories
                </option>

                <option value="rating">
                  Rating
                </option>
              </select>
            </div>
          )}
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex min-h-60 items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-lime-400" />
          </div>
        )}

        {/* Empty State */}
        {!loading && currentList.length === 0 && (
          <div className="border border-dashed border-zinc-800 px-6 py-20 text-center">
            <h2 className="text-2xl font-black uppercase">
              Nothing Here Yet
            </h2>

            <p className="mt-3 text-sm text-zinc-500">
              Browse the library and add a lift to get moving.
            </p>

            <Link
              href="/#library"
              className="mt-6 inline-block bg-lime-400 px-6 py-3 text-sm font-black uppercase text-black transition hover:bg-lime-300"
            >
              Go to Workouts
            </Link>
          </div>
        )}

        {/* Today's Plan */}
        {!loading &&
          activeTab === "today" &&
          sortedWorkouts.length > 0 && (
            <div className="space-y-4">

              {sortedWorkouts.map((workout) => {
                const isCompleted = completedIds.includes(
                  workout.id
                );

                return (
                  <div
                    key={workout.id}
                    className="flex flex-col gap-5 border border-zinc-800 bg-zinc-900 p-4 md:flex-row md:items-center"
                  >
                    {/* Image */}
                    <img
                      src="/Overhead_press.png"
                      alt={workout.name}
                      className="h-24 w-full object-cover md:w-28"
                    />

                    {/* Info */}
                    <div className="flex-1">
                      <h2
                        className={`text-xl font-black uppercase ${
                          isCompleted
                            ? "text-zinc-500 line-through"
                            : "text-white"
                        }`}
                      >
                        {workout.name}
                      </h2>

                      <p className="mt-1 text-sm text-zinc-500">
                        {workout.equipment}
                      </p>

                      <div className="mt-2 flex flex-wrap gap-4 text-sm text-zinc-400">
                        <span>
                          ◷ {workout.duration} min
                        </span>

                        <span>
                          🔥 {workout.caloriesBurned} kcal
                        </span>

                        <span>
                          ★ {workout.rating}
                        </span>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={"/workout/" + workout.id}
                        className="border border-zinc-700 px-4 py-2 text-sm font-bold text-white transition hover:border-lime-400 hover:text-lime-400"
                      >
                        View Details
                      </Link>

                      <button
                        type="button"
                        onClick={() =>
                          handleMarkAsDone(workout.id)
                        }
                        className={`px-4 py-2 text-sm font-black ${
                          isCompleted
                            ? "bg-zinc-700 text-white"
                            : "bg-lime-400 text-black hover:bg-lime-300"
                        }`}
                      >
                        {isCompleted
                          ? "✓ Done"
                          : "✓ Mark as Done"}
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleRemove(workout.id)
                        }
                        className="px-2 text-zinc-500 transition hover:text-red-500"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Remove All */}
              <button
                type="button"
                onClick={handleRemoveAll}
                className="mt-4 border border-red-500 px-6 py-3 text-sm font-black uppercase text-red-500 transition hover:bg-red-500 hover:text-white"
              >
                Remove All
              </button>
            </div>
          )}

        {/* Saved */}
        {!loading &&
          activeTab === "saved" &&
          savedWorkouts.length > 0 && (
            <div className="space-y-4">

              {savedWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className="flex flex-col gap-5 border border-zinc-800 bg-zinc-900 p-4 md:flex-row md:items-center"
                >
                  <img
                    src="/Overhead_press.png"
                    alt={workout.name}
                    className="h-24 w-full object-cover md:w-28"
                  />

                  <div className="flex-1">
                    <h2 className="text-xl font-black uppercase">
                      {workout.name}
                    </h2>

                    <p className="mt-1 text-sm text-zinc-500">
                      {workout.equipment}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-4 text-sm text-zinc-400">
                      <span>
                        ◷ {workout.duration} min
                      </span>

                      <span>
                        🔥 {workout.caloriesBurned} kcal
                      </span>

                      <span>
                        ★ {workout.rating}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Link
                      href={"/workout/" + workout.id}
                      className="border border-zinc-700 px-4 py-2 text-sm font-bold text-white transition hover:border-lime-400 hover:text-lime-400"
                    >
                      View Details
                    </Link>

                    <button
                      type="button"
                      onClick={() =>
                        handleRemoveSaved(workout.id)
                      }
                      className="px-2 text-zinc-500 transition hover:text-red-500"
                    >
                      ×
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
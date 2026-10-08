"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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
type SortBy = "duration" | "calories" | "rating";

export default function MyPlan() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);
  const [completedIds, setCompletedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState<Tab>("today");
  const [sortBy, setSortBy] = useState<SortBy>("duration");

  useEffect(() => {
    const savedPlan = localStorage.getItem("fitlog-plan");
    const saved = localStorage.getItem("savedWorkouts");
    const completed = localStorage.getItem("fitlog-completed");

    const planIds: number[] = savedPlan ? JSON.parse(savedPlan) : [];
    const savedList: Workout[] = saved ? JSON.parse(saved) : [];
    const completedList: number[] = completed
      ? JSON.parse(completed)
      : [];

    setSavedWorkouts(savedList);
    setCompletedIds(completedList);

    fetch("https://api.abcz.workers.dev/api/fitlog")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch workouts");
        }

        return response.json();
      })
      .then((data: Workout[]) => {
        const planWorkouts = data.filter((workout) =>
          planIds.includes(workout.id)
        );

        setWorkouts(planWorkouts);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch workouts:", error);
        setLoading(false);
      });
  }, []);

  const handleRemove = (id: number) => {
    const updatedWorkouts = workouts.filter(
      (workout) => workout.id !== id
    );

    const savedPlan = localStorage.getItem("fitlog-plan");
    const planIds: number[] = savedPlan
      ? JSON.parse(savedPlan)
      : [];

    const updatedPlan = planIds.filter(
      (workoutId) => workoutId !== id
    );

    localStorage.setItem(
      "fitlog-plan",
      JSON.stringify(updatedPlan)
    );

    setWorkouts(updatedWorkouts);
  };

  const handleRemoveAll = () => {
    localStorage.removeItem("fitlog-plan");
    setWorkouts([]);
  };

  const handleMarkAsDone = (id: number) => {
    const alreadyCompleted = completedIds.includes(id);

    let updatedCompletedIds: number[];

    if (alreadyCompleted) {
      updatedCompletedIds = completedIds.filter(
        (completedId) => completedId !== id
      );
    } else {
      updatedCompletedIds = [...completedIds, id];
    }

    localStorage.setItem(
      "fitlog-completed",
      JSON.stringify(updatedCompletedIds)
    );

    setCompletedIds(updatedCompletedIds);
  };

  const handleRemoveSaved = (id: number) => {
    const updatedSaved = savedWorkouts.filter(
      (workout) => workout.id !== id
    );

    localStorage.setItem(
      "savedWorkouts",
      JSON.stringify(updatedSaved)
    );

    setSavedWorkouts(updatedSaved);
  };

  const handleRemoveAllSaved = () => {
    localStorage.removeItem("savedWorkouts");
    setSavedWorkouts([]);
  };

  const sortedWorkouts = [...workouts].sort((a, b) => {
    if (sortBy === "duration") {
      return a.duration - b.duration;
    }

    if (sortBy === "calories") {
      return b.caloriesBurned - a.caloriesBurned;
    }

    return b.rating - a.rating;
  });

  const totalMinutes = workouts.reduce(
    (total, workout) => total + workout.duration,
    0
  );

  const totalCalories = workouts.reduce(
    (total, workout) => total + workout.caloriesBurned,
    0
  );

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-bold tracking-[0.3em] text-lime-400">
              FITLOG
            </p>

            <h1 className="text-4xl font-black uppercase md:text-6xl">
              My Plan
            </h1>

            <p className="mt-3 text-zinc-400">
              Track your workouts and saved exercises.
            </p>
          </div>

          <Link
            href="/"
            className="inline-block bg-lime-400 px-5 py-3 text-sm font-black uppercase text-black transition hover:bg-lime-300"
          >
            ← Back to Library
          </Link>
        </div>

        {/* Tabs */}
        <div className="mb-8 flex gap-3 border-b border-zinc-800">
          <button
            onClick={() => setActiveTab("today")}
            className={`border-b-2 px-5 py-3 text-sm font-black uppercase transition ${
              activeTab === "today"
                ? "border-lime-400 text-lime-400"
                : "border-transparent text-zinc-500 hover:text-white"
            }`}
          >
            Today's Plan
          </button>

          <button
            onClick={() => setActiveTab("saved")}
            className={`border-b-2 px-5 py-3 text-sm font-black uppercase transition ${
              activeTab === "saved"
                ? "border-lime-400 text-lime-400"
                : "border-transparent text-zinc-500 hover:text-white"
            }`}
          >
            Saved
          </button>
        </div>

        {/* TODAY TAB */}
        {activeTab === "today" && (
          <>
            {/* Stats */}
            <div className="mb-8 grid gap-4 sm:grid-cols-3">
              <div className="border border-zinc-800 bg-zinc-950 p-6">
                <p className="text-sm font-bold uppercase text-zinc-500">
                  Exercises
                </p>

                <p className="mt-2 text-4xl font-black text-lime-400">
                  {workouts.length}
                </p>
              </div>

              <div className="border border-zinc-800 bg-zinc-950 p-6">
                <p className="text-sm font-bold uppercase text-zinc-500">
                  Minutes
                </p>

                <p className="mt-2 text-4xl font-black text-lime-400">
                  {totalMinutes}
                </p>
              </div>

              <div className="border border-zinc-800 bg-zinc-950 p-6">
                <p className="text-sm font-bold uppercase text-zinc-500">
                  Calories
                </p>

                <p className="mt-2 text-4xl font-black text-lime-400">
                  {totalCalories}
                </p>
              </div>
            </div>

            {/* Toolbar */}
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <h2 className="text-2xl font-black uppercase">
                Your Workouts
              </h2>

              <div className="flex flex-wrap gap-3">
                <select
                  value={sortBy}
                  onChange={(event) =>
                    setSortBy(event.target.value as SortBy)
                  }
                  className="border border-zinc-700 bg-zinc-950 px-4 py-2 text-sm font-bold text-white outline-none"
                >
                  <option value="duration">Sort: Duration</option>
                  <option value="calories">Sort: Calories</option>
                  <option value="rating">Sort: Rating</option>
                </select>

                {workouts.length > 0 && (
                  <button
                    onClick={handleRemoveAll}
                    className="border border-red-800 px-4 py-2 text-xs font-black uppercase text-red-400 transition hover:bg-red-950"
                  >
                    Remove All
                  </button>
                )}
              </div>
            </div>

            {/* Loading */}
            {loading && (
              <div className="flex min-h-60 items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-lime-400"></div>
              </div>
            )}

            {/* Empty */}
            {!loading && workouts.length === 0 && (
              <div className="border border-dashed border-zinc-700 bg-zinc-950 px-6 py-16 text-center">
                <h2 className="text-2xl font-black uppercase">
                  Your plan is empty
                </h2>

                <p className="mt-3 text-zinc-500">
                  Add workouts from the library to build your plan.
                </p>

                <Link
                  href="/"
                  className="mt-6 inline-block bg-lime-400 px-6 py-3 font-black uppercase text-black transition hover:bg-lime-300"
                >
                  Browse Workouts
                </Link>
              </div>
            )}

            {/* Workout List */}
            {!loading && workouts.length > 0 && (
              <div className="space-y-4">
                {sortedWorkouts.map((workout) => {
                  const isCompleted = completedIds.includes(
                    workout.id
                  );

                  return (
                    <div
                      key={workout.id}
                      className={`flex flex-col gap-5 border border-zinc-800 bg-zinc-950 p-5 transition md:flex-row md:items-center ${
                        isCompleted ? "opacity-60" : ""
                      }`}
                    >
                      <img
                        src="/Overhead_press.png"
                        alt={workout.name}
                        className="h-32 w-full object-cover md:w-48"
                      />

                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <h3
                            className={`text-xl font-black uppercase ${
                              isCompleted
                                ? "line-through"
                                : ""
                            }`}
                          >
                            {workout.name}
                          </h3>

                          {isCompleted && (
                            <span className="bg-lime-400 px-2 py-1 text-xs font-black text-black">
                              DONE
                            </span>
                          )}
                        </div>

                        <p className="mt-2 text-sm text-zinc-500">
                          {workout.muscleGroups.join(" • ")}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-4 text-sm text-zinc-400">
                          <span>
                            {workout.duration} min
                          </span>

                          <span>
                            {workout.caloriesBurned} kcal
                          </span>

                          <span>
                            ★ {workout.rating}
                          </span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/workout/${workout.id}`}
                          className="border border-zinc-700 px-4 py-2 text-xs font-black uppercase text-white transition hover:border-lime-400 hover:text-lime-400"
                        >
                          View Details
                        </Link>

                        <button
                          onClick={() =>
                            handleMarkAsDone(workout.id)
                          }
                          className="border border-zinc-700 px-4 py-2 text-xs font-black uppercase text-white transition hover:border-lime-400 hover:text-lime-400"
                        >
                          {isCompleted
                            ? "Mark as Undone"
                            : "Mark as Done"}
                        </button>

                        <button
                          onClick={() =>
                            handleRemove(workout.id)
                          }
                          className="border border-red-800 px-4 py-2 text-xs font-black uppercase text-red-400 transition hover:bg-red-950"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* SAVED TAB */}
        {activeTab === "saved" && (
          <>
            {/* Saved Header */}
            <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <h2 className="text-2xl font-black uppercase">
                  Saved Workouts
                </h2>

                <p className="mt-2 text-sm text-zinc-500">
                  Workouts you saved for later.
                </p>
              </div>

              {savedWorkouts.length > 0 && (
                <button
                  onClick={handleRemoveAllSaved}
                  className="border border-red-800 px-4 py-2 text-xs font-black uppercase text-red-400 transition hover:bg-red-950"
                >
                  Remove All Saved
                </button>
              )}
            </div>

            {/* Saved Empty */}
            {savedWorkouts.length === 0 && (
              <div className="border border-dashed border-zinc-700 bg-zinc-950 px-6 py-16 text-center">
                <h2 className="text-2xl font-black uppercase">
                  No saved workouts
                </h2>

                <p className="mt-3 text-zinc-500">
                  Save workouts that you want to check later.
                </p>

                <Link
                  href="/"
                  className="mt-6 inline-block bg-lime-400 px-6 py-3 font-black uppercase text-black transition hover:bg-lime-300"
                >
                  Browse Workouts
                </Link>
              </div>
            )}

            {/* Saved List */}
            {savedWorkouts.length > 0 && (
              <div className="space-y-4">
                {savedWorkouts.map((workout) => (
                  <div
                    key={workout.id}
                    className="flex flex-col gap-5 border border-zinc-800 bg-zinc-950 p-5 md:flex-row md:items-center"
                  >
                    <img
                      src="/Overhead_press.png"
                      alt={workout.name}
                      className="h-32 w-full object-cover md:w-48"
                    />

                    <div className="flex-1">
                      <h3 className="text-xl font-black uppercase">
                        {workout.name}
                      </h3>

                      <p className="mt-2 text-sm text-zinc-500">
                        {workout.muscleGroups.join(" • ")}
                      </p>

                      <div className="mt-3 flex flex-wrap gap-4 text-sm text-zinc-400">
                        <span>
                          {workout.duration} min
                        </span>

                        <span>
                          {workout.caloriesBurned} kcal
                        </span>

                        <span>
                          ★ {workout.rating}
                        </span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/workout/${workout.id}`}
                        className="border border-zinc-700 px-4 py-2 text-xs font-black uppercase text-white transition hover:border-lime-400 hover:text-lime-400"
                      >
                        View Details
                      </Link>

                      <button
                        onClick={() =>
                          handleRemoveSaved(workout.id)
                        }
                        className="border border-red-800 px-4 py-2 text-xs font-black uppercase text-red-400 transition hover:bg-red-950"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}
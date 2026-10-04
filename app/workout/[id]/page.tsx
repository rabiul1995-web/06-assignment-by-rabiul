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

async function getWorkout(id: string): Promise<Workout | null> {
          const response = await fetch(
                    "https://api.abcz.workers.dev/api/fitlog",
                    {
                              cache: "no-store",
                    }
          );

          if (!response.ok) {
                    return null;
          }

          const workouts: Workout[] = await response.json();

          return workouts.find((workout) => workout.id === Number(id)) || null;
}

export default async function WorkoutDetails({
          params,
}: {
          params: Promise<{ id: string }>;
}) {
          const { id } = await params;

          const workout = await getWorkout(id);

          if (!workout) {
                    return (
                              <main className="flex min-h-screen items-center justify-center bg-black text-white">
                                        <h1 className="text-3xl font-black">Workout Not Found</h1>
                              </main>
                    );
          }

          return (
                    <main className="min-h-screen bg-black px-6 py-16 text-white">
                              <div className="mx-auto max-w-5xl">
                                        <div className="grid gap-10 md:grid-cols-2">

                                                  {/* Image */}
                                                  <div className="overflow-hidden border border-zinc-800 bg-zinc-900">
                                                            <img
                                                                      src="/Overhead_press.png"
                                                                      alt={workout.name}
                                                                      className="h-[400px] w-full object-cover"
                                                            />
                                                  </div>

                                                  {/* Details */}
                                                  <div>
                                                            <p className="mb-4 text-sm font-bold tracking-[0.3em] text-lime-400">
                                                                      WORKOUT DETAILS
                                                            </p>

                                                            <h1 className="text-4xl font-black uppercase md:text-5xl">
                                                                      {workout.name}
                                                            </h1>
                                                            <a
                                                                      href="/#library"
                                                                      className="inline-block bg-lime-400 px-5 py-3 text-sm font-black uppercase text-black transition hover:bg-lime-300"
                                                            >
                                                                      ← Back to Library
                                                            </a>
                                                            <div className="mt-8 space-y-4 text-zinc-300">
                                                                      <p>
                                                                                <span className="font-bold text-white">Muscle Groups:</span>{" "}
                                                                                {workout.muscleGroups.join(", ")}
                                                                      </p>

                                                                      <p>
                                                                                <span className="font-bold text-white">Equipment:</span>{" "}
                                                                                {workout.equipment}
                                                                      </p>

                                                                      <p>
                                                                                <span className="font-bold text-white">Difficulty:</span>{" "}
                                                                                {workout.difficulty}
                                                                      </p>

                                                                      <p>
                                                                                <span className="font-bold text-white">Duration:</span>{" "}
                                                                                {workout.duration} minutes
                                                                      </p>

                                                                      <p>
                                                                                <span className="font-bold text-white">Calories:</span>{" "}
                                                                                {workout.caloriesBurned} kcal
                                                                      </p>

                                                                      <p>
                                                                                <span className="font-bold text-white">Rating:</span>{" "}
                                                                                ★ {workout.rating}
                                                                      </p>
                                                            </div>
                                                  </div>
                                        </div>
                              </div>
                    </main>
          );
}
import Link from "next/link";
import PlanButton from "./PlanButton";

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

type WorkoutCardProps = {
  workout: Workout;
};

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <div className="group overflow-hidden border border-zinc-800 bg-zinc-900 transition hover:-translate-y-1 hover:border-lime-400">

      {/* Image */}
      <Link href={"/workout/" + workout.id}>
        <div className="h-56 overflow-hidden">
          <img
            src="/Overhead_press.png"
            alt={workout.name}
            className="h-full w-full object-cover"
          />
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">

        {/* Muscle Groups */}
        <div className="mb-4 flex flex-wrap gap-2">
          {workout.muscleGroups.map((muscle) => (
            <span
              key={muscle}
              className="border border-zinc-700 px-2 py-1 text-xs font-bold text-lime-400"
            >
              {muscle.toUpperCase()}
            </span>
          ))}
        </div>

        {/* Workout Name */}
        <Link href={"/workout/" + workout.id}>
          <h3 className="text-xl font-black uppercase text-white hover:text-lime-400">
            {workout.name}
          </h3>
        </Link>

        {/* Equipment */}
        <p className="mt-2 text-sm text-zinc-400">
          Equipment: {workout.equipment}
        </p>

        {/* Difficulty */}
        <p className="mt-2 text-sm font-bold text-zinc-300">
          Difficulty:{" "}
          <span className="text-lime-400">{workout.difficulty}</span>
        </p>

        {/* Stats */}
        <div className="mt-5 flex items-center justify-between border-t border-zinc-800 pt-4 text-sm text-zinc-300">
          <span>◷ {workout.duration} min</span>
          <span>🔥 {workout.caloriesBurned} kcal</span>
        </div>

        {/* Rating */}
        <div className="mt-2 text-sm text-zinc-300">
          ★ {workout.rating}
        </div>

        {/* Add to Plan */}
        <PlanButton workoutId={workout.id} />

      </div>
    </div>
  );
}

import Link from "next/link";

type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  duration: number;
  caloriesBurned: number;
  rating: number;
};

type WorkoutCardProps = {
  workout: Workout;
};

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  return (
    <Link
      href={`/workout/${workout.id}`}
      className="group block overflow-hidden border border-zinc-800 bg-zinc-900 transition hover:-translate-y-1 hover:border-lime-400"
    >
      {/* Image */}
      <div className="h-56 overflow-hidden">
        <img
          src="/Overhead_press.png"
          alt={workout.name}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category */}
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

        {/* Name */}
        <h3 className="text-xl font-black uppercase text-white">
          {workout.name}
        </h3>

        {/* Equipment */}
        <p className="mt-2 text-sm text-zinc-400">
          {workout.equipment}
        </p>

        {/* Stats */}
        <div className="mt-5 flex items-center justify-between border-t border-zinc-800 pt-4 text-sm text-zinc-300">
          <span>◷ {workout.duration} min</span>
          <span>🔥 {workout.caloriesBurned} kcal</span>
          <span>★ {workout.rating}</span>
        </div>
      </div>
    </Link>
  );
}
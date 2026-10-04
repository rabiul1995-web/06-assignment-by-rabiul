export default function Hero() {
  return (
    <section className="bg-black px-6 py-16 text-white md:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
        
        {/* Left Content */}
        <div>
          <p className="mb-5 text-sm font-bold tracking-[0.3em] text-lime-400">
            WORKOUT LIBRARY
          </p>

          <h1 className="text-4xl font-black leading-tight sm:text-5xl md:text-6xl">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p className="mt-6 max-w-xl text-base leading-7 text-zinc-400">
            FitLog is a dark, no-nonsense gym companion: pick a lift,
            lock it into today's plan, and watch the week's work add up.
          </p>

          <a
            href="#library"
            className="mt-8 inline-block bg-lime-400 px-6 py-4 text-sm font-black text-black transition hover:bg-lime-300"
          >
            BROWSE WORKOUTS →
          </a>
        </div>

        {/* Right Image */}
        <div className="overflow-hidden">
          <img
            src="/banner.png"
            alt="Workout"
            className="h-[350px] w-full object-cover md:h-[500px]"
          />
        </div>

      </div>
    </section>
  );
}
import hero from "../assets/Dhaneshwari Photoshoot/room77.jpeg";

function Hero() {
  return (
    <section className="relative h-[520px] w-full overflow-hidden">
      <img
        src={hero}
        alt="Dhaneshwari"
        className="h-full w-full object-cover scale-105 blur-[2px] brightness-75"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 text-white">
        <h1 className="mb-8 text-center text-6xl font-semibold tracking-wide drop-shadow-lg">
          Welcome to Dhaneshwari
        </h1>

        <div className="flex gap-6">
          <button className="rounded-full bg-orange-600 px-10 py-4 text-base font-semibold text-white shadow-lg hover:bg-orange-700">
            Book Now
          </button>

          <button className="rounded-full border border-white/70 px-10 py-4 text-base font-semibold text-white hover:bg-white/10">
            Explore Services
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;

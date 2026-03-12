import hero from "../assets/Dhaneshwari Photoshoot/room77.jpeg";

function Hero() {
  return (
    <section className="relative h-[280px] sm:h-[380px] md:h-[450px] lg:h-[520px] w-full overflow-hidden">
      <img
        src={hero}
        alt="Dhaneshwari"
        className="h-full w-full object-cover scale-105 blur-[2px] brightness-75"
      />

      <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/35 text-white px-4 lg:px-0">
        <h1 className="mb-4 sm:mb-6 lg:mb-8 text-center text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold tracking-wide drop-shadow-lg">
          Welcome to Dhaneshwari
        </h1>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6">
          <button className="rounded-full bg-orange-600 px-6 py-3 sm:px-8 sm:py-3.5 lg:px-10 lg:py-4 text-sm sm:text-base font-semibold text-white shadow-lg hover:bg-orange-700">
            Book Now
          </button>
          <button className="rounded-full border border-white/70 px-6 py-3 sm:px-8 sm:py-3.5 lg:px-10 lg:py-4 text-sm sm:text-base font-semibold text-white hover:bg-white/10">
            Explore Services
          </button>
        </div>
      </div>
    </section>
  );
}

export default Hero;

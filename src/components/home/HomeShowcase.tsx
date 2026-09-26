import Image from "next/image";

const tiles = [
  {
    src: "/images/feature-vial-rock.jpg",
    alt: "Product vial on textured stone with teal lighting",
    className: "col-span-2 row-span-2 min-h-[280px] sm:min-h-[360px]",
  },
  {
    src: "/images/feature-lab.jpg",
    alt: "Modern laboratory workspace with glassware",
    className: "col-span-1 min-h-[160px] sm:min-h-[170px]",
  },
  {
    src: "/images/feature-molecule.jpg",
    alt: "Abstract molecular structure with cyan and violet light",
    className: "col-span-1 min-h-[160px] sm:min-h-[170px]",
  },
  {
    src: "/images/feature-vials-neon.jpg",
    alt: "Premium vials with cyan and magenta studio lighting",
    className: "col-span-1 min-h-[180px] sm:min-h-[200px]",
  },
  {
    src: "/images/feature-droplets.jpg",
    alt: "Flowing liquid droplets with neon cyan highlights",
    className: "col-span-1 min-h-[180px] sm:min-h-[200px]",
  },
  {
    src: "/images/feature-luxury-lab.jpg",
    alt: "Luxury research environment with marble and teal accent lighting",
    className: "col-span-2 min-h-[200px] sm:min-h-[220px]",
  },
] as const;

export function HomeShowcase() {
  return (
    <section className="w-full max-w-full overflow-x-clip border-y border-white/[0.06] bg-black/40 py-16 sm:py-20">
      <div className="mx-auto w-full min-w-0 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">Visual identity</p>
          <h2 className="mt-3 font-display text-3xl font-bold text-white sm:text-4xl">
            Precision. Atmosphere. Intensity.
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-white/60 sm:text-base">
            A premium look and feel across the experience — ready for your approved product photography
            when the catalog goes live.
          </p>
        </div>

        <div className="grid w-full min-w-0 grid-cols-2 gap-2 sm:gap-4 lg:grid-cols-4 lg:gap-5">
          {tiles.map((tile) => (
            <div
              key={tile.src}
              className={`group relative overflow-hidden rounded-2xl border border-white/10 bg-surface-elevated shadow-[0_0_40px_rgba(0,0,0,0.45)] ${tile.className}`}
            >
              <Image
                src={tile.src}
                alt={tile.alt}
                fill
                className="object-cover transition duration-700 group-hover:scale-105 motion-reduce:transform-none"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-80"
                aria-hidden
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

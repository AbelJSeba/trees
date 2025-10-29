import { useCallback, useEffect, useMemo, useState } from "react";

const simulationImages = [
  {
    src: "/images/c1.jpg",
    title: "ADAS vision kernels",
    summary:
      "Vision pipeline operators run 7–9× faster thanks to dense CGRA dataflow scheduling.",
  },
  {
    src: "/images/c2.jpg",
    title: "Robotics workloads",
    summary:
      "Real-time SLAM, planning, and control stages sustain 3–9× gains, keeping latency under budget.",
  },
  {
    src: "/images/c3.jpg",
    title: "Compression & crypto",
    summary:
      "Batch encryption, FFT, and bundle adjustment retain 3–8× headroom for non-vision tasks.",
  },
  {
    src: "/images/c4.jpg",
    title: "Tile scaling cost",
    summary:
      "Area scales nearly linearly; 64 tiles stay <600 mm² while hitting multi-kilo-token throughput.",
  },
];

export function ResearchSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const closeOverlay = useCallback(() => setActiveIndex(null), []);
  const showPrevious = useCallback(
    () =>
      setActiveIndex((current) =>
        current === null
          ? null
          : (current + simulationImages.length - 1) % simulationImages.length,
      ),
    [],
  );
  const showNext = useCallback(
    () =>
      setActiveIndex((current) =>
        current === null ? null : (current + 1) % simulationImages.length,
      ),
    [],
  );

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeOverlay();
      } else if (event.key === "ArrowRight") {
        showNext();
      } else if (event.key === "ArrowLeft") {
        showPrevious();
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeIndex, showNext, showPrevious, closeOverlay]);

  const activeImage = useMemo(
    () => (activeIndex === null ? null : simulationImages[activeIndex]),
    [activeIndex],
  );

  return (
    <section className="min-h-screen bg-background pt-28 pb-20">
      <div className="container px-4 md:px-6">
        <div className="mx-auto flex max-w-5xl flex-col gap-12">
          <header className="space-y-2">
            <h1 className="text-3xl font-semibold text-foreground md:text-4xl">
              Research
            </h1>
          </header>

          <div className="space-y-6 text-left text-base leading-relaxed text-muted-foreground md:text-lg">
            <p>
              Working on ATLAS (Adaptive Toolchain with Learned Architecture
              Selection). In simple terms, every program passes through an
              intermediate representation inside the compiler before it runs. We
              intercept that IR, expose it to the full map of available
              accelerators, and combine compiler analysis with learned policies
              so each workload is scheduled onto the best mix of chips. When a
              workload benefits from it, ATLAS even emits fresh kernels at
              runtime to match the hardware exactly. The graphs below show
              current results from a cycle-accurate RTL simulation of our
              design.
            </p>
          </div>

          <div className="flex flex-col gap-8">
            <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground text-center">
              Early results from cycle accurate RTL simulation
            </p>

            <div className="flex flex-col gap-10">
              {simulationImages.map((image, index) => (
                <article
                  key={image.src}
                  className="overflow-hidden rounded-2xl border border-border/40 bg-card/70 shadow-sm transition-shadow duration-200 hover:shadow-xl hover:shadow-accent/10"
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(index)}
                    className="flex w-full flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60"
                  >
                    <img
                      src={image.src}
                      alt={`ATLAS simulation result chart for ${image.title}`}
                      loading="lazy"
                      className="h-auto w-full object-cover"
                    />
                    <div className="flex flex-col gap-3 px-6 py-5 md:px-8 md:py-6">
                      <h3 className="text-lg font-semibold text-foreground capitalize">
                        {image.title}
                      </h3>
                      <p className="text-muted-foreground text-base">
                        {image.summary}
                      </p>
                      <span className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-accent">
                        Open full graph
                        <span aria-hidden="true">→</span>
                      </span>
                    </div>
                  </button>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>

      {activeImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 p-6"
          onClick={closeOverlay}
        >
          <div
            className="relative max-h-full max-w-5xl"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={closeOverlay}
              className="absolute right-2 top-2 rounded-full bg-black/60 px-3 py-1 text-sm font-medium text-white transition-colors hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
            >
              Close
            </button>
            <button
              type="button"
              onClick={showPrevious}
              className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white transition-colors hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              aria-label="Previous image"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={showNext}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white transition-colors hover:bg-black/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
              aria-label="Next image"
            >
              ›
            </button>
            <img
              src={activeImage.src}
              alt="ATLAS simulation result chart enlarged"
              className="max-h-[80vh] w-auto rounded-lg border border-border/40 bg-background object-contain"
            />
            <p className="mt-4 text-center text-sm text-muted-foreground">
              {activeImage.summary}
            </p>
          </div>
        </div>
      )}
    </section>
  );
}

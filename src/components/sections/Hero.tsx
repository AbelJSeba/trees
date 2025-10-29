import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlorasynthTree } from "./FlorasynthTree";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import {
  Sprout,
  BookOpen,
  Microscope,
  Code,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { HeroBackgroundGraph } from "./HeroBackgroundGraph";

import { HeroProps } from "../../types";
import { PROJECT_DOCUMENTS } from "../../data/projectDocuments";

export function Hero({ onSectionChange }: HeroProps) {
  const documents = PROJECT_DOCUMENTS;
  const [activeDocumentIndex, setActiveDocumentIndex] = useState(0);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
      clearInterval(autoPlayRef.current);
      autoPlayRef.current = null;
    }
  }, []);

  const startAutoPlay = useCallback(() => {
    if (documents.length <= 1) return;
    stopAutoPlay();
    autoPlayRef.current = setInterval(() => {
      setActiveDocumentIndex((prev) => (prev + 1) % documents.length);
    }, 9000);
  }, [documents.length, stopAutoPlay]);

  useEffect(() => {
    startAutoPlay();
    return () => stopAutoPlay();
  }, [startAutoPlay, stopAutoPlay]);

  const handleNavigate = useCallback(
    (direction: "prev" | "next") => {
      if (documents.length === 0) return;
      setActiveDocumentIndex((prev) => {
        if (direction === "next") {
          return (prev + 1) % documents.length;
        }
        return (prev - 1 + documents.length) % documents.length;
      });
      startAutoPlay();
    },
    [documents.length, startAutoPlay],
  );

  const hasDocuments = documents.length > 0;
  const activeDocument = hasDocuments
    ? documents[activeDocumentIndex % documents.length]
    : null;

  return (
    <div className="bg-background">
      <section className="relative isolate overflow-hidden py-16 md:py-20">
        <div className="container px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,3fr)_minmax(0,2.15fr)] lg:gap-16 items-stretch w-full max-w-7xl mx-auto mb-16">
            <div className="flex flex-col gap-12 h-full">
              <div className="relative rounded-3xl border border-transparent p-0 min-h-[320px] sm:min-h-[360px]">
                <HeroBackgroundGraph className="pointer-events-none absolute inset-0 opacity-80 mix-blend-screen" />
                <div className="relative space-y-6 p-0 sm:p-1">
                  <div className="space-y-2">
                    <Badge variant="secondary" className="mb-4">
                      <Sprout className="mr-2 h-3 w-3" />
                      Gardener
                    </Badge>
                    <h1 className="text-3xl tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                      El Jardín de <span className="text-accent">Abel</span>
                    </h1>
                  </div>
                  <div className="flex flex-col gap-2 min-[400px]:flex-row">
                    <button
                      onClick={() => onSectionChange("reading")}
                      className="flex items-center justify-center gap-2 px-4 py-2 text-foreground border border-transparent rounded-md hover:bg-muted hover:border-border transition-all duration-300 focus:outline-none focus:ring-0 active:outline-none active:ring-0"
                    >
                      <BookOpen className="h-4 w-4" />
                      My Reading Notes
                    </button>
                  </div>
                  <blockquote className="relative mt-6 border-l border-accent/30 pl-4 text-sm text-muted-foreground max-w-xl">
                    “Do not neglect to show hospitality to strangers, for
                    thereby some have entertained angels unawares.”
                  </blockquote>
                </div>
              </div>

              {hasDocuments && activeDocument && (
                <div className="relative mt-auto pt-10 lg:pt-8">
                  <Card className="relative flex flex-col overflow-visible border border-border bg-gradient-to-br from-muted/40 via-background to-muted/20 shadow-md rounded-3xl min-h-[180px] lg:min-h-[220px]">
                    <div className="absolute left-8 top-0 flex gap-2 z-20 -translate-y-full">
                      <button
                        type="button"
                        className="rounded-t-xl border border-border border-b-0 bg-background px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] transition-transform transition-colors duration-200 ease-out origin-bottom hover:scale-[1.05] hover:border-foreground hover:bg-background/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent cursor-pointer"
                        aria-label="Filter working documents"
                      >
                        work
                      </button>
                      <button
                        type="button"
                        className="rounded-t-xl border border-border border-b-0 bg-background/90 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] transition-transform transition-colors duration-200 ease-out origin-bottom hover:scale-[1.05] hover:border-foreground hover:bg-background focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-accent cursor-pointer"
                        aria-label="Filter tastemaker documents"
                      >
                        taste
                      </button>
                    </div>
                    <div className="relative flex-1 p-6 sm:p-8 pb-4">
                      <div className="grid gap-4 mb-6 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-center">
                        <div className="min-w-[220px]">
                          <p className="text-xs uppercase tracking-widest text-muted-foreground/80 mb-1">
                            Working File
                          </p>
                          <h3 className="text-2xl font-semibold text-foreground whitespace-nowrap">
                            {activeDocument.name}
                          </h3>
                        </div>
                        <div className="flex gap-2">
                          <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                            {activeDocument.size}
                          </span>
                          <span className="inline-flex items-center rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                            {activeDocument.kind}
                          </span>
                        </div>
                      </div>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={activeDocument.name}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.35 }}
                          className="space-y-4 min-h-[72px]"
                        >
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            {activeDocument.summary}
                          </p>
                          <div className="flex items-center justify-between gap-4 text-xs text-muted-foreground/80">
                            <span>{activeDocument.date}</span>
                            <span>{documents.length} documents in cycle</span>
                            {documents.length > 1 && (
                              <div className="flex items-center gap-2.5">
                                <button
                                  type="button"
                                  onClick={() => handleNavigate('prev')}
                                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/90 backdrop-blur hover:bg-muted transition-colors"
                                  aria-label="Previous document"
                                >
                                  <ChevronLeft className="h-4 w-4" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => handleNavigate('next')}
                                  className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background/90 backdrop-blur hover:bg-muted transition-colors"
                                  aria-label="Next document"
                                >
                                  <ChevronRight className="h-4 w-4" />
                                </button>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </Card>
                </div>
              )}
            </div>

            <div className="relative flex flex-col gap-6 lg:ml-auto lg:max-w-[500px] w-full h-full">
              <Card className="p-6 bg-gradient-to-br from-accent/10 to-secondary border-accent/20 flex flex-col min-h-[430px]">
                <FlorasynthTree className="aspect-square mb-4" />
                <div className="space-y-2">
                  <h3 className="text-lg">Not GenAI, just a lot of Geometry</h3>
                  <p className="text-sm text-muted-foreground">
                    I really like trees, so here are some trees for you to play
                    with. I’ll add more tree types and customization soon.
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Tap “New Tree” above the canvas to grow a fresh one.
                  </p>
                </div>
              </Card>

              <motion.div
                className="grid gap-5 sm:grid-cols-2 mt-auto"
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, staggerChildren: 0.1 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <Card
                    className="group relative overflow-hidden cursor-pointer transition-all duration-300 border border-border/60 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:shadow-[#7fb069]/30 hover:border-[#7fb069]/50 bg-gradient-to-br from-[#7fb069]/12 via-white to-[#7fb069]/8 min-h-[135px]"
                    onClick={() => onSectionChange("projects")}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-[#7fb069]/30 via-transparent to-[#7fb069]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-[#7fb069]/50 to-[#7fb069]/60 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Code className="h-5 w-5 text-[#5a8040]" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground group-hover:text-[#5a8040] transition-colors duration-300">
                            Creations
                          </h4>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Projects, images, and music from my creative journey.
                      </p>
                    </div>
                  </Card>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <Card
                    className="group relative overflow-hidden cursor-pointer transition-all duration-300 border border-border/60 shadow-sm hover:-translate-y-1 hover:shadow-xl hover:shadow-teal-500/25 hover:border-teal-400/50 bg-gradient-to-br from-teal-50/40 via-white to-emerald-50/30 min-h-[135px]"
                    onClick={() => onSectionChange("research")}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-teal-100/25 via-transparent to-emerald-100/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="relative p-6">
                      <div className="flex items-center gap-4 mb-3">
                        <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-gradient-to-br from-teal-200/40 to-emerald-200/40 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                          <Microscope className="h-5 w-5 text-teal-700" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground group-hover:text-teal-700 transition-colors duration-300">
                            Research
                          </h4>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        In depth explorations of comprehensive topics.
                      </p>
                    </div>
                  </Card>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

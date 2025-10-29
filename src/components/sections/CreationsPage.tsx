import Projects from "./Projects";
import { useMediaQuery } from "../../utils/useMediaQuery";
import { motion } from "framer-motion";

interface CreationsPageProps {
  onNavigateHome?: () => void;
}

export function CreationsPage({ onNavigateHome }: CreationsPageProps) {
  const isMobile = useMediaQuery('(max-width: 767px)');

  if (isMobile) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-md rounded-3xl border border-border/40 bg-card/80 p-8 text-center shadow-xl backdrop-blur"
        >
          <p className="text-base font-medium text-foreground">
            The Creations desktop is a full simulation experience best viewed on a larger screen.
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Hop onto a laptop or desktop to explore the virtual workspace.
          </p>
        </motion.div>
      </section>
    );
  }

  // Desktop: render the virtual desktop projects experience
  return (
    <section className="h-screen overflow-hidden">
      <div className="h-full w-full">
        <Projects onNavigateHome={onNavigateHome} />
      </div>
    </section>
  );
}

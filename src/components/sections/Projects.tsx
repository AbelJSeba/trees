import { VirtualDesktop } from '../VirtualDesktop';

interface ProjectsProps {
  onNavigateHome?: () => void;
}

export default function Projects({ onNavigateHome }: ProjectsProps) {
  return <VirtualDesktop onNavigateHome={onNavigateHome} />;
}

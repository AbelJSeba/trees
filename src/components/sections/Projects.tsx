import { VirtualDesktop } from '../VirtualDesktop';

interface ProjectsProps {
  onHeaderToggle?: (visible: boolean) => void;
  headerVisible?: boolean;
}

export default function Projects({ onHeaderToggle, headerVisible = false }: ProjectsProps) {
  const handleToggleHeader = () => {
    onHeaderToggle?.(!headerVisible);
  };

  return <VirtualDesktop onToggleHeader={handleToggleHeader} headerVisible={headerVisible} />;
}

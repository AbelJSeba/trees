import { useState } from 'react';
import { VirtualDesktop } from '../VirtualDesktop';

interface ProjectsProps {
  onHeaderToggle?: (visible: boolean) => void;
}

export default function Projects({ onHeaderToggle }: ProjectsProps) {
  const [headerVisible, setHeaderVisible] = useState(false);

  const handleToggleHeader = () => {
    const newVisibility = !headerVisible;
    setHeaderVisible(newVisibility);
    if (onHeaderToggle) {
      onHeaderToggle(newVisibility);
    }
    console.log("Toggle header:", newVisibility); // Debug log
  };

  return <VirtualDesktop onToggleHeader={handleToggleHeader} headerVisible={headerVisible} />;
}

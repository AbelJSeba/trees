// Content Item Types
export interface BaseContentItem {
  id: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  image: string;
}

export interface ReadingItem extends BaseContentItem {
  tags: string[];
  author: string;
  rating: number;
  coverImage: string;
  spineColor: string;
  textColor: string;
}



// Component Props Types
export interface ContentSectionProps {
  title: string;
  description: string;
  items: ReadingItem[];
  emptyMessage: string;
}


export interface HeaderProps {
  activeSection: SectionType;
  onSectionChange: (section: SectionType) => void;
}

export interface HeroProps {
  onSectionChange: (section: SectionType) => void;
}

// Navigation Types
export type SectionType = 'home' | 'about' | 'projects' | 'reading';

export interface NavItem {
  id: SectionType;
  label: string;
  href: string;
}

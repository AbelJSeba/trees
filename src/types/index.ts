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

export interface WritingItem extends BaseContentItem {
  type: 'essay' | 'poetry';
  content: string;
  tags?: string[];
}

export interface DeepDiveItem extends BaseContentItem {
  tags: string[];
}

// Component Props Types
export interface ContentSectionProps {
  title: string;
  description: string;
  items: ReadingItem[] | DeepDiveItem[];
  emptyMessage: string;
}

export interface WritingSectionProps {
  title: string;
  description: string;
  items: WritingItem[];
  emptyMessage: string;
  onItemClick: (item: WritingItem) => void;
}

export interface WritingDetailProps extends Omit<WritingItem, 'tags'> {
  onBack: () => void;
  tags: string[];
}

export interface HeaderProps {
  activeSection: SectionType;
  onSectionChange: (section: SectionType) => void;
}

export interface HeroProps {
  onSectionChange: (section: SectionType) => void;
}

// Navigation Types
export type SectionType = 'home' | 'about' | 'projects' | 'reading' | 'writing' | 'deep-dives';

export interface NavItem {
  id: SectionType;
  label: string;
  href: string;
} 
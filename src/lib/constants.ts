import { ReadingItem, WritingItem, ResearchItem, NavItem } from '../types';
import { BOOKS } from '../data/books';

// Navigation Items
export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'reading', label: 'Reading', href: '#reading' },
  { id: 'writing', label: 'Writing', href: '#writing' },
  { id: 'research', label: 'Research', href: '#research' },
];

// Reading Items - Imported from data file
export const SAMPLE_READING_ITEMS: ReadingItem[] = BOOKS;

// Sample Writing Items
export const SAMPLE_WRITING_ITEMS: WritingItem[] = [
  {
    id: '1',
    title: 'Sample Essay Title',
    description: 'This is a sample essay description that demonstrates the format and style of content in this section.',
    date: 'Jan 2025',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=250&fit=crop&auto=format',
    type: 'essay' as const,
    content: `This is sample content for the essay. In a real implementation, this would contain the full text of your essay or article.



This would typically contain multiple paragraphs exploring the topic in depth, with proper formatting, sections, and meaningful insights.

You can structure your content with:

## Headings
- Bullet points
- **Bold text**
- And other markdown formatting

The content system supports rich text formatting to help you create engaging and well-structured articles.`
  },
  {
    id: '2',
    title: 'Another Sample Essay',
    description: 'This is another sample essay demonstrating how multiple pieces of content can be displayed in the writing section.',
    date: 'Dec 2024',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop&auto=format',
    type: 'essay' as const,
    content: `This is sample content for the second essay. You would replace this with your own thoughtful content.



This demonstrates how you can create longer-form content with multiple sections and in-depth exploration of topics.

The writing system supports full markdown formatting and can handle substantial articles and essays.`
  },
  {
    id: '3',
    title: 'Sample Poem',
    description: 'This is a sample poem demonstrating the poetry content type in the writing section.',
    date: 'Jan 2025',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop&auto=format',
    type: 'poetry' as const,
    content: `This is where your poem content would go.


Poetry can be formatted with line breaks,
stanzas, and various poetic structures.

The system preserves formatting
to maintain the artistic integrity
of your written work.

This is just placeholder content -
replace with your own creative writing.`
  }
];

// Sample Research Items
export const SAMPLE_RESEARCH_ITEMS: ResearchItem[] = [
  {
    id: '1',
    title: 'Automated workload mapping for heterogeneous SoCs using IR vector similarity',
    description: 'Currently working on independent research exploring novel approaches to workload mapping in heterogeneous System-on-Chip architectures using intermediate representation vector similarity analysis.',
    date: 'In Progress',
    readTime: 'Research paper incoming',
    tags: [],
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop&auto=format'
  }
]; 
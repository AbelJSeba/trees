import { useState } from 'react';
import { Header } from './components/sections/Header';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { Projects } from './components/sections/Projects';
import { ContentSection } from './components/sections/ContentSection';
import { WritingSection } from './components/sections/WritingSection';
import { WritingDetail } from './components/sections/WritingDetail';
import { Footer } from './components/sections/Footer';
import { SectionType, WritingItem } from './types';
import { 
  SAMPLE_READING_ITEMS, 
  SAMPLE_WRITING_ITEMS, 
  SAMPLE_DEEP_DIVE_ITEMS 
} from './lib/constants';

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionType>('home');
  const [selectedWriting, setSelectedWriting] = useState<WritingItem | null>(null);

  const handleWritingItemClick = (item: WritingItem) => {
    setSelectedWriting(item);
  };

  const handleBackToWriting = () => {
    setSelectedWriting(null);
  };

  const renderContent = () => {
    if (selectedWriting) {
      return (
        <div className="bg-background">
          <WritingDetail
            {...selectedWriting}
            onBack={handleBackToWriting}
          />
        </div>
      );
    }

    switch (activeSection) {
      case 'home':
        return <Hero onSectionChange={setActiveSection} />;
      case 'about':
        return (
          <div className="bg-background">
            <About />
          </div>
        );
      case 'projects':
        return (
          <div className="bg-background">
            <Projects />
          </div>
        );
      case 'reading':
        return (
          <div className="bg-background">
            <ContentSection
              title="My Reading Garden"
              description="Here are my curated notes and insights from books, articles, and research that have shaped my thinking and continue to influence my growth. Each note represents a seed of wisdom I've gathered along my learning journey."
              items={SAMPLE_READING_ITEMS}
              emptyMessage="New reading notes are growing here. Check back soon for fresh insights from my latest discoveries!"
            />
          </div>
        );
      case 'writing':
        return (
          <div className="bg-background">
            <WritingSection
              title="My Written Works"
              description="These are my original thoughts, essays, and explorations on topics that fascinate me. Each piece is a seed of an idea that has grown into something I believe is worth sharing with the world."
              items={SAMPLE_WRITING_ITEMS}
              emptyMessage="New writings are taking root. Check back soon for fresh perspectives from my mind!"
              onItemClick={handleWritingItemClick}
            />
          </div>
        );
      case 'deep-dives':
        return (
          <div className="bg-background">
            <ContentSection
              title="My Deep Dives"
              description="These are my in-depth explorations and comprehensive analyses of complex topics that have captured my curiosity. These are the tall trees in my digital garden - substantial pieces that have grown over time through careful research and reflection."
              items={SAMPLE_DEEP_DIVE_ITEMS}
              emptyMessage="Deep explorations are growing here. Check back soon for my comprehensive analyses of fascinating topics!"
            />
          </div>
        );
      default:
        return <Hero onSectionChange={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1">
        {renderContent()}
      </main>
      <Footer />
    </div>
  );
}
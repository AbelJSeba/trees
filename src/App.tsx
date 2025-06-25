import { useState, useEffect } from 'react';
import { Header } from './components/sections/Header';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { CreationsPage } from './components/sections/CreationsPage';
import { ReadingGarden } from './components/sections/ReadingGarden';
import { WritingSection } from './components/sections/WritingSection';
import { WritingDetail } from './components/sections/WritingDetail';
import { ResearchSection } from './components/sections/ResearchSection';
import { Footer } from './components/sections/Footer';

import { SectionType, WritingItem } from './types';
import { 
  SAMPLE_WRITING_ITEMS, 
  SAMPLE_RESEARCH_ITEMS 
} from './lib/constants';
import { BOOKS } from './data';

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionType>('home');
  const [selectedWriting, setSelectedWriting] = useState<WritingItem | null>(null);
  const [readingNavigationKey, setReadingNavigationKey] = useState(0);
  const [headerVisible, setHeaderVisible] = useState<boolean>(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleSectionChange = (section: string) => {
    setActiveSection(section as SectionType);
    setSelectedWriting(null); // Clear selected writing when changing sections
    
    // Set header visibility based on section
    setHeaderVisible(section !== 'projects');
    
    // Increment key when navigating to reading to reset component state
    if (section === 'reading') {
      setReadingNavigationKey(prev => prev + 1);
    }
  };

  const handleWritingItemClick = (item: WritingItem) => {
    setSelectedWriting(item);
  };

  const handleBackToWriting = () => {
    setSelectedWriting(null);
  };

  const toggleHeader = () => {
    setHeaderVisible(!headerVisible);
  };

  const renderContent = () => {
    if (selectedWriting) {
      return (
        <div className="bg-background pt-16">
          <WritingDetail
            {...selectedWriting}
            tags={selectedWriting.tags || []}
            onBack={handleBackToWriting}
          />
        </div>
      );
    }

    switch (activeSection) {
      case 'home':
        return <Hero onSectionChange={handleSectionChange} />;
      case 'about':
        return (
          <div className="bg-background pt-16">
            <About />
          </div>
        );
      case 'projects':
        return <CreationsPage onHeaderToggle={setHeaderVisible} />;
      case 'reading':
        return (
          <div className="pt-16">
            <ReadingGarden
              key={readingNavigationKey}
              title="Reading Garden"
              description="Curated notes and insights from books, articles, and research. Each note represents knowledge gathered along the learning journey."
              items={BOOKS}
              emptyMessage="New reading notes are growing here. Check back soon for fresh insights!"
            />
          </div>
        );
      case 'writing':
        return (
          <div className="bg-background pt-16">
            <WritingSection
              title="Writing"
              description="Original thoughts, essays, and explorations on various topics. Each piece represents an idea that has grown into something worth sharing."
              items={SAMPLE_WRITING_ITEMS}
              emptyMessage="New writings are taking root. Check back soon for fresh perspectives!"
              onItemClick={handleWritingItemClick}
            />
          </div>
        );
      case 'research':
        return (
          <div className="bg-background pt-16">
            <ResearchSection
              title="Research"
              description="My view on research has changed and I've started doing independent research myself."
              items={SAMPLE_RESEARCH_ITEMS}
              emptyMessage="New research projects are taking shape. Check back soon for deep insights!"
            />
          </div>
        );
      default:
        return <Hero onSectionChange={handleSectionChange} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {(activeSection !== 'projects' || headerVisible) && (
        <Header 
          activeSection={activeSection} 
          onSectionChange={handleSectionChange}
          visible={headerVisible || activeSection !== 'projects'}
        />
      )}
      <main className="flex-1">
        {renderContent()}
      </main>
      {activeSection !== 'projects' && <Footer />}
    </div>
  );
}

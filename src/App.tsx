import { useState } from 'react';
import { Header } from './components/sections/Header';
import { Hero } from './components/sections/Hero';
import { About } from './components/sections/About';
import { CreationsPage } from './components/sections/CreationsPage';
import { ReadingGarden } from './components/sections/ReadingGarden';
import { Footer } from './components/sections/Footer';

import { SectionType } from './types';
import { BOOKS } from './data';

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionType>('home');
  const [readingNavigationKey, setReadingNavigationKey] = useState(0);

  const handleSectionChange = (section: string) => {
    setActiveSection(section as SectionType);
    
    // Increment key when navigating to reading to reset component state
    if (section === 'reading') {
      setReadingNavigationKey(prev => prev + 1);
    }
  };

  const handleNavigateHome = () => {
    handleSectionChange('home');
  };

  const renderContent = () => {
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
        return <CreationsPage onNavigateHome={handleNavigateHome} />;
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
      default:
        return <Hero onSectionChange={handleSectionChange} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {activeSection !== 'projects' && (
        <Header 
          activeSection={activeSection} 
          onSectionChange={handleSectionChange}
        />
      )}
      <main className="flex-1">
        {renderContent()}
      </main>
      {activeSection !== 'projects' && <Footer />}
    </div>
  );
}

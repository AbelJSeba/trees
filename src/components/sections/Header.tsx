import { useState } from 'react';
import { Menu, X, Leaf } from 'lucide-react';
import { Button } from '../ui/button';

interface HeaderProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  visible?: boolean;
}

export function Header({ activeSection, onSectionChange, visible = true }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Use different positioning for virtual desktop
  const isVirtualDesktop = activeSection === 'projects';
  const headerClasses = isVirtualDesktop 
    ? `sticky top-0 z-[60] w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 ${
        visible ? 'block' : 'hidden'
      }`
    : `fixed top-0 z-[60] w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-transform duration-300 ${
        visible ? 'translate-y-0' : '-translate-y-full'
      }`;

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Creations' },
    { id: 'reading', label: 'Reading' },
    { id: 'writing', label: 'Writing' },
    { id: 'research', label: 'Research' },
  ];

  return (
    <header className={headerClasses}>
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center space-x-2">
          <Leaf className="h-6 w-6 text-accent" />
          <div className="flex flex-col">
            <span className="font-bold">
              Abel's
            </span>
            <span className="text-xs text-muted-foreground">
              Garden
            </span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`px-3 py-2 rounded-md border border-transparent transition-all duration-200 hover:border-foreground/20 hover:text-foreground ${
                activeSection === item.id
                  ? 'text-foreground border-foreground/30'
                  : 'text-foreground/60'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Navigation */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="border-b bg-background md:hidden">
          <nav className="container flex flex-col space-y-3 px-4 py-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onSectionChange(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`text-left px-3 py-2 rounded-md border border-transparent transition-all duration-200 hover:border-foreground/20 hover:text-foreground ${
                  activeSection === item.id
                    ? 'text-foreground border-foreground/30'
                    : 'text-foreground/60'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
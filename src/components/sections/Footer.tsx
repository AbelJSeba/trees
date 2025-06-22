import { Twitter, Github, Linkedin, Leaf, Heart } from 'lucide-react';
import { Button } from '../ui/button';

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container px-4 py-8 md:px-6">
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center space-x-2">
            <Leaf className="h-5 w-5 text-accent" />
            <div className="flex flex-col">
              <span className="text-sm">Abel J.S</span>
              <span className="text-xs text-muted-foreground">Digital Garden</span>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <p className="text-sm text-muted-foreground flex items-center gap-1">
              Grown with <Heart className="h-3 w-3 text-red-500 fill-current" /> and curiosity
            </p>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground hidden sm:block mr-2">
              Find me on GitHub, X/Twitter and LinkedIn:
            </span>
            <Button variant="ghost" size="icon" asChild className="social-icon-twitter">
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Follow Abel J.S on X/Twitter"
              >
                <Twitter className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="social-icon-github">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="View Abel J.S GitHub profile"
              >
                <Github className="h-4 w-4" />
              </a>
            </Button>
            <Button variant="ghost" size="icon" asChild className="social-icon-linkedin">
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Connect with Abel J.S on LinkedIn"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  );
}
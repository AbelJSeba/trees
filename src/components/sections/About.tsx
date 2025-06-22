import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Separator } from '../ui/separator';
import { 
  MapPin, 
  Calendar, 
  Coffee, 
  BookOpen, 
  Code, 
  TreePine, 
  Lightbulb,
  Heart,
  Github,
  Twitter,
  Mail
} from 'lucide-react';

export function About() {

  return (
    <div className="min-h-screen bg-background">
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="mb-4 text-4xl md:text-5xl font-medium text-accent">About</h1>
            </div>

            {/* Main Content */}
            <div className="max-w-4xl mx-auto">
              <div className="space-y-8">
                {/* Bio Section */}
                <Card className="p-6 bg-card border-border">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-accent" />
                      Some things about me:
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      This is where you can write a brief introduction about yourself and what you do.
                    </p>
                    <p>
                      You can describe your background, current work, and interests. Share what makes you unique and what drives your passion.
                    </p>
                    <p>
                      Feel free to mention your hobbies, professional experience, or any other aspects of your life you'd like to highlight.
                    </p>
                    <p>
                      This section is completely customizable to reflect your personality and story.
                    </p>
                  </CardContent>
                </Card>


                {/* Philosophy Section */}
                <Card className="p-6 bg-card border-border bg-gradient-to-br from-accent/5 to-secondary/20">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="flex items-center gap-2">
                      <TreePine className="w-5 h-5 text-accent" />
                      My Philosophy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 text-muted-foreground leading-relaxed">
                    <p>
                      Share your personal philosophy, values, or beliefs here. This could include your approach to work, life principles, or what guides your decisions and thinking.
                    </p>
                  </CardContent>
                </Card>

                {/* Story Section */}
                <Card className="p-6 bg-card border-border">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="w-5 h-5 text-accent" />
                      My Story
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 text-muted-foreground leading-relaxed">
                    <p>
                      Tell your personal story here. This could include your journey, key experiences that shaped you, important milestones, or the path that led you to where you are today.
                    </p>
                  </CardContent>
                </Card>

              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
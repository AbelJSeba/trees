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
  const skills = [
    'Digital Gardening', 'Creative Writing', 'Poetry', 'Deep Thinking', 
    'Knowledge Management', 'Philosophy', 'Nature Photography', 'Web Development'
  ];

  const interests = [
    { icon: TreePine, label: 'Nature & Trees', description: 'Finding wisdom in the natural world' },
    { icon: BookOpen, label: 'Reading & Learning', description: 'Constant curiosity and knowledge absorption' },
    { icon: Code, label: 'Technology', description: 'Building digital tools and experiences' },
    { icon: Coffee, label: 'Slow Living', description: 'Embracing mindfulness and intentional living' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <section className="py-20">
        <div className="container px-4 md:px-6">
          <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <h1 className="mb-4 text-foreground">About Me</h1>
              <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Welcome to my corner of the digital world. I'm Abel J.S, and this is where I cultivate ideas, 
                nurture knowledge, and share the fruits of my intellectual journey.
              </p>
            </div>

            {/* Main Content */}
            <div className="grid gap-8 lg:grid-cols-3">
              {/* Profile Card */}
              <div className="lg:col-span-1">
                <Card className="p-6 bg-card border-border">
                  <div className="text-center mb-6">
                    <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-accent/20 to-secondary/50 rounded-full flex items-center justify-center">
                      <span className="text-4xl font-medium text-primary">AJS</span>
                    </div>
                    <h2 className="text-foreground mb-2">Abel J.S</h2>
                    <p className="text-muted-foreground text-sm mb-4">Digital Gardener & Creative Thinker</p>
                    
                    <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground mb-4">
                      <MapPin className="w-4 h-4" />
                      <span>Earth, Milky Way</span>
                    </div>

                    <div className="flex justify-center gap-2">
                      <Button variant="outline" size="sm">
                        <Github className="w-4 h-4 mr-2" />
                        GitHub
                      </Button>
                      <Button variant="outline" size="sm">
                        <Twitter className="w-4 h-4 mr-2" />
                        Twitter
                      </Button>
                    </div>
                  </div>

                  <Separator className="mb-6" />

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium text-foreground mb-2">Current Focus</h3>
                      <p className="text-sm text-muted-foreground">
                        Building this digital garden and exploring the intersection of technology, 
                        nature, and human consciousness.
                      </p>
                    </div>
                    
                    <div>
                      <h3 className="text-sm font-medium text-foreground mb-2">Values</h3>
                      <div className="flex flex-wrap gap-1">
                        <Badge variant="secondary" className="text-xs">Slow Thinking</Badge>
                        <Badge variant="secondary" className="text-xs">Deep Learning</Badge>
                        <Badge variant="secondary" className="text-xs">Authentic Expression</Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Main Content Area */}
              <div className="lg:col-span-2 space-y-8">
                {/* Bio Section */}
                <Card className="p-6 bg-card border-border">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="w-5 h-5 text-accent" />
                      My Story
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-0 space-y-4 text-muted-foreground leading-relaxed">
                    <p>
                      I'm a digital gardener who believes in the power of slow thinking and deep reflection. 
                      My journey began with a simple observation: the best ideas, like the strongest trees, 
                      need time and the right conditions to grow.
                    </p>
                    <p>
                      In a world that celebrates quick fixes and instant solutions, I've chosen a different path. 
                      I cultivate ideas with the same patience a gardener tends their plants—watering them with 
                      research, pruning them through reflection, and allowing them to grow naturally over time.
                    </p>
                    <p>
                      This digital garden is where I share the fruits of that cultivation: essays that have 
                      ripened through months of thinking, poetry that bloomed from quiet observation, and 
                      insights that emerged from the intersection of different disciplines and experiences.
                    </p>
                    <p>
                      When I'm not tending to my digital garden, you'll find me walking among real trees, 
                      reading books that challenge my thinking, or exploring how technology can support 
                      more thoughtful, intentional ways of living.
                    </p>
                  </CardContent>
                </Card>

                {/* Interests Grid */}
                <div>
                  <h2 className="mb-6 text-foreground">What Fascinates Me</h2>
                  <div className="grid gap-4 md:grid-cols-2">
                    {interests.map((interest, index) => (
                      <Card key={index} className="p-4 bg-card border-border hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-3">
                          <div className="p-2 bg-accent/10 rounded-lg">
                            <interest.icon className="w-5 h-5 text-accent" />
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground mb-1">{interest.label}</h3>
                            <p className="text-sm text-muted-foreground">{interest.description}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Skills Section */}
                <Card className="p-6 bg-card border-border">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle className="flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-accent" />
                      Areas of Exploration
                    </CardTitle>
                    <CardDescription>
                      The tools and practices I use to cultivate knowledge and express ideas
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="flex flex-wrap gap-2">
                      {skills.map((skill, index) => (
                        <Badge key={index} variant="outline" className="text-sm">
                          {skill}
                        </Badge>
                      ))}
                    </div>
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
                  <CardContent className="p-0">
                    <blockquote className="text-muted-foreground italic leading-relaxed border-l-4 border-accent/30 pl-4">
                      "Like trees that grow slowly but stand for centuries, the most valuable ideas 
                      are those that develop gradually through patient cultivation. In our fast-paced 
                      world, I choose to think deeply, write authentically, and share generously—
                      trusting that the seeds of wisdom planted today will flourish into knowledge 
                      that serves tomorrow."
                    </blockquote>
                    <p className="text-sm text-muted-foreground mt-4 text-right">— Abel J.S</p>
                  </CardContent>
                </Card>

                {/* Connect Section */}
                <Card className="p-6 bg-card border-border">
                  <CardHeader className="p-0 mb-4">
                    <CardTitle>Let's Connect</CardTitle>
                    <CardDescription>
                      I believe the best gardens grow through community and conversation
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      Whether you're fellow digital gardener, a curious reader, or someone who shares 
                      a passion for slow thinking and deep learning, I'd love to connect. Feel free to 
                      reach out if something in my garden resonates with you.
                    </p>
                    <div className="flex gap-2">
                      <Button variant="outline" className="flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Send a Message
                      </Button>
                      <Button variant="outline" className="flex items-center gap-2">
                        <Coffee className="w-4 h-4" />
                        Virtual Coffee Chat
                      </Button>
                    </div>
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
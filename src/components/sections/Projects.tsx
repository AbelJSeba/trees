import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar, ExternalLink, Github, Globe, Sprout, TreePine, Leaf, Code2 } from 'lucide-react';
import { Button } from '../ui/button';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  date: string;
  status: 'completed' | 'in-progress' | 'planning';
  technologies: string[];
  image: string;
  liveUrl?: string;
  githubUrl?: string;
}

const sampleProjects: Project[] = [
  {
    id: '1',
    title: 'Garden Platform',
    description: 'A modern platform for building and maintaining gardens with plant-inspired design.',
    longDescription: 'Built with React, TypeScript, and Tailwind CSS, this platform helps writers and thinkers create their own gardens. Features include markdown support, tag-based organization, and responsive design that grows with your content.',
    date: 'Jan 2025',
    status: 'completed',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop&auto=format',
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: '2',
    title: 'Knowledge Tree Visualizer',
    description: 'An interactive tool for visualizing knowledge connections and learning paths.',
    longDescription: 'A data visualization project that helps users map their learning journey and discover connections between different topics and concepts. Uses advanced graph algorithms to suggest new learning paths.',
    date: 'Dec 2024',
    status: 'in-progress',
    technologies: ['D3.js', 'React', 'Node.js', 'GraphQL'],
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop&auto=format',
    githubUrl: '#'
  },
  {
    id: '3',
    title: 'Habit Forest',
    description: 'A gamified habit tracking app where habits grow into a virtual forest.',
    longDescription: 'Combining the science of habit formation with the satisfaction of growing a digital forest. Users plant seeds for new habits and watch them grow into trees as they maintain consistency over time.',
    date: 'Nov 2024',
    status: 'planning',
    technologies: ['React Native', 'Firebase', 'TypeScript'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop&auto=format'
  },
  {
    id: '4',
    title: 'Code Snippet Manager',
    description: 'A beautiful tool for organizing and sharing code snippets with syntax highlighting.',
    longDescription: 'A productivity tool for developers to save, organize, and share code snippets across teams.',
    date: 'Oct 2024',
    status: 'completed',
    technologies: ['Next.js', 'Prisma', 'PostgreSQL'],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop&auto=format',
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: '5',
    title: 'Reading Progress Tracker',
    description: 'Track your reading journey with beautiful visualizations and insights.',
    longDescription: 'A personal reading companion that helps track books, set goals, and visualize reading patterns.',
    date: 'Sep 2024',
    status: 'in-progress',
    technologies: ['Vue.js', 'Supabase', 'Chart.js'],
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop&auto=format',
    githubUrl: '#'
  },
  {
    id: '6',
    title: 'Focus Timer App',
    description: 'A minimalist pomodoro timer with ambient sounds and progress tracking.',
    longDescription: 'Help maintain focus with customizable work sessions, break reminders, and productivity analytics.',
    date: 'Aug 2024',
    status: 'completed',
    technologies: ['React', 'PWA', 'Web Audio API'],
    image: 'https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=250&fit=crop&auto=format',
    liveUrl: '#',
    githubUrl: '#'
  }
];

const statusConfig = {
  completed: {
    color: 'bg-[#7fb069]/10 text-[#5a8040] border-[#7fb069]/20',
    icon: TreePine,
    label: 'Completed'
  },
  'in-progress': {
    color: 'bg-emerald-100 text-emerald-700 border-emerald-200',
    icon: Sprout,
    label: 'In Progress'
  },
  planning: {
    color: 'bg-lime-100 text-lime-700 border-lime-200',
    icon: Leaf,
    label: 'Planning'
  }
};

export function Projects() {
  return (
    <section className="min-h-screen py-20">
      <div className="container px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-4">
              <Badge variant="secondary" className="mb-4">
                <Code2 className="mr-2 h-3 w-3" />
                Digital Cultivation
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl tracking-tight">
                My <span className="text-accent">Projects</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Here are some of the digital experiences I've been cultivating. Each project represents a different branch 
                of exploration in my journey of building tools and experiences that matter.
              </p>
            </div>
          </motion.div>

          {/* Projects Grid */}
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {sampleProjects.map((project, index) => {
              const StatusIcon = statusConfig[project.status].icon;
              
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="group overflow-hidden border-border hover:shadow-xl hover:shadow-[#7fb069]/10 transition-all duration-300 hover:-translate-y-1 bg-card cursor-pointer flex flex-col h-full">
                    {/* Project Image */}
                    <div className="aspect-video overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>

                    <CardHeader className="flex-grow">
                      {/* Status Badge and Date */}
                      <div className="flex items-center justify-between mb-3">
                        <Badge className={`${statusConfig[project.status].color} text-xs flex items-center gap-1`}>
                          <StatusIcon className="w-3 h-3" />
                          {statusConfig[project.status].label}
                        </Badge>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" />
                          <span>{project.date}</span>
                        </div>
                      </div>
                      
                      <CardTitle className="line-clamp-2 group-hover:text-[#7fb069] transition-colors">
                        {project.title}
                      </CardTitle>
                      <CardDescription className="line-clamp-3 flex-grow">
                        {project.description}
                      </CardDescription>

                      {/* Technologies */}
                      <div className="mt-4">
                        <div className="flex flex-wrap gap-1">
                          {project.technologies.slice(0, 3).map((tech) => (
                            <Badge 
                              key={tech} 
                              variant="outline" 
                              className="text-xs px-2 py-0.5 bg-white/50 hover:bg-[#7fb069]/5 hover:border-[#7fb069]/30 transition-colors duration-200"
                            >
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 3 && (
                            <Badge variant="outline" className="text-xs px-2 py-0.5 bg-muted">
                              +{project.technologies.length - 3}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-0">
                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        {project.liveUrl && (
                          <Button 
                            size="sm"
                            className="flex-1 bg-[#7fb069] hover:bg-[#7fb069]/90 text-white shadow-sm hover:shadow-md transition-all duration-300" 
                            asChild
                          >
                            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                              <Globe className="h-3 w-3 mr-1" />
                              Live Demo
                            </a>
                          </Button>
                        )}
                        {project.githubUrl && (
                          <Button 
                            size="sm"
                            variant="outline" 
                            className={`${project.liveUrl ? 'flex-1' : 'w-full'} border-[#7fb069]/20 hover:border-[#7fb069]/40 hover:bg-[#7fb069]/5 transition-all duration-300`}
                            asChild
                          >
                            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                              <Github className="h-3 w-3 mr-1" />
                              Code
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Call to Action */}
          <motion.div 
            className="text-center mt-20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-[#7fb069]/5 to-green-50/30 border-[#7fb069]/20">
              <div className="space-y-4">
                <h3 className="text-xl font-semibold">Want to collaborate?</h3>
                <p className="text-muted-foreground">
                  I'm always excited to work on projects that make a meaningful impact. 
                  Let's grow something beautiful together.
                </p>
                <Button className="bg-[#7fb069] hover:bg-[#7fb069]/90">
                  Get In Touch
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
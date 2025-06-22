import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Calendar, ExternalLink, Github, Globe, Sprout, TreePine, Leaf } from 'lucide-react';
import { motion } from 'framer-motion';

interface Project {
  id: string;
  title: string;
  shortDescription: string;
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
    title: 'Sample Web Application',
    shortDescription: 'A modern web application showcasing responsive design and interactive user interfaces.',
    date: 'January 2025',
    status: 'completed',
    technologies: ['React', 'TypeScript', 'Tailwind CSS', '+1'],
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop&auto=format',
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    id: '2',
    title: 'Data Visualization Dashboard',
    shortDescription: 'Interactive dashboard for visualizing complex datasets with dynamic charts and graphs.',
    date: 'December 2024',
    status: 'in-progress',
    technologies: ['D3.js', 'React', 'Node.js', '+1'],
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop&auto=format',
    githubUrl: '#'
  },
  {
    id: '3',
    title: 'Mobile App Prototype',
    shortDescription: 'Cross-platform mobile application with real-time features and cloud integration.',
    date: 'Planning Phase',
    status: 'planning',
    technologies: ['React Native', 'Firebase', 'TypeScript'],
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop&auto=format'
  },
];

const statusConfig = {
  completed: {
    label: 'Fully Grown',
    icon: TreePine
  },
  'in-progress': {
    label: 'Growing',
    icon: Sprout
  },
  planning: {
    label: 'Seedling',
    icon: Leaf
  }
};

export function Projects() {
  return (
    <section className="min-h-screen py-20">
      <div className="container px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-medium text-accent">
              Creations
            </h1>
          </motion.div>

          {/* Projects Grid */}
          <div className="space-y-8">
            {sampleProjects.map((project, index) => {
              const StatusIcon = statusConfig[project.status].icon;
              
              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="group overflow-hidden border-border/50 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5 transition-all duration-300 bg-card/50 hover:bg-card cursor-pointer">
                    <div className="flex gap-6 p-6">
                      {/* Project Image */}
                      <div className="flex-shrink-0 overflow-hidden rounded-lg">
                        <img
                          src={project.image}
                          alt={project.title}
                          width={192}
                          height={128}
                          className="w-48 h-32 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Project Content */}
                      <div className="flex-grow">
                        {/* Title */}
                        <h3 className="text-xl font-medium text-accent group-hover:opacity-80 transition-opacity duration-300 mb-2">
                          {project.title}
                        </h3>
                        
                        {/* Date */}
                        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{project.date}</span>
                        </div>

                        {/* Description */}
                        <p className="text-muted-foreground mb-4">
                          {project.shortDescription}
                        </p>

                        {/* Bottom Row: Status, Technologies, Actions */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            {/* Status Badge */}
                            <Badge 
                              variant="outline" 
                              className="flex items-center gap-1.5 text-xs border-accent/30 bg-accent/5 text-accent px-2.5 py-1"
                            >
                              <StatusIcon className="w-3 h-3" />
                              {statusConfig[project.status].label}
                            </Badge>

                            {/* Technologies */}
                            <div className="flex items-center gap-2">
                              {project.technologies.map((tech) => (
                                <Badge 
                                  key={tech} 
                                  variant="secondary" 
                                  className="text-xs px-2 py-0.5"
                                >
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex items-center gap-2">
                            {project.liveUrl && (
                              <a 
                                href={project.liveUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                              >
                                <Globe className="h-4 w-4" />
                                Live
                              </a>
                            )}
                            {project.githubUrl && (
                              <a 
                                href={project.githubUrl} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                              >
                                <Github className="h-4 w-4" />
                                Code
                              </a>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
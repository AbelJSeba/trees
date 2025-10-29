export type ProjectDocumentSize = 'Small' | 'Medium' | 'Large';

export interface ProjectDocument {
  name: string;
  date: string;
  size: ProjectDocumentSize;
  kind: string;
  summary: string;
}

export const PROJECT_DOCUMENTS: ProjectDocument[] = [
  {
    name: 'AuTurn',
    date: 'Apr 18, 2025',
    size: 'Large',
    kind: 'Robotics',
    summary: 'Designing human-scale autonomy for chaotic streets—every sprint blends industrial design with ML control loops.'
  },
  {
    name: 'Askie',
    date: 'Mar 02, 2025',
    size: 'Large',
    kind: 'Robotics & Conversational AI',
    summary: 'Building a compassionate support companion that merges embodied robotics with speech-driven copilots.'
  },
  {
    name: 'Microsoft I',
    date: 'Jan 27, 2025',
    size: 'Medium',
    kind: 'Special Projects',
    summary: 'Exploratory interface systems that connect productivity surfaces to ambient computing moments.'
  },
  {
    name: 'Microsoft II & III',
    date: 'Dec 14, 2024',
    size: 'Large',
    kind: 'Product Manager',
    summary: 'Shepherded cross-team launches that align design language, AI safety, and consumer delight at scale.'
  },
  {
    name: 'Stanford Accelerator',
    date: 'Sep 22, 2024',
    size: 'Large',
    kind: 'Gaming & Gen AI',
    summary: 'Rapid prototyping for game-ready tooling where generative agents transform level design pipelines.'
  }
];

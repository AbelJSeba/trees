import { ReadingItem, WritingItem, DeepDiveItem, NavItem } from '../types';

// Navigation Items
export const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home', href: '#home' },
  { id: 'about', label: 'About', href: '#about' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'reading', label: 'Reading', href: '#reading' },
  { id: 'writing', label: 'Writing', href: '#writing' },
  { id: 'deep-dives', label: 'Deep Dives', href: '#deep-dives' },
];

// Sample Reading Items
export const SAMPLE_READING_ITEMS: ReadingItem[] = [
  {
    id: '1',
    title: 'The Power of Habit',
    description: 'My insights on how habits form and how I\'ve learned to transform them for personal and professional growth.',
    date: 'Dec 2024',
    readTime: '8 min read',
    tags: ['psychology', 'productivity', 'behavior'],
    image: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=250&fit=crop&auto=format'
  },
  {
    id: '2',
    title: 'Atomic Habits',
    description: 'Breaking down the compound effect of small changes and incremental improvements that I\'ve applied in my own life.',
    date: 'Nov 2024',
    readTime: '12 min read',
    tags: ['habits', 'self-improvement', 'systems'],
    image: 'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=400&h=250&fit=crop&auto=format'
  }
];

// Sample Writing Items
export const SAMPLE_WRITING_ITEMS: WritingItem[] = [
  {
    id: '1',
    title: 'Building Digital Gardens',
    description: 'Why I chose to build a digital garden instead of a traditional blog, and how it changes the way I think about knowledge and learning.',
    date: 'Jan 2025',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=250&fit=crop&auto=format',
    type: 'essay' as const,
    content: `In our hyperconnected digital age, I've found myself drowning in bookmarks, scattered notes, and half-formed thoughts spread across a dozen different apps. The traditional blog format, with its chronological posts and pressure for polished content, never felt quite right for how my mind actually works.

That's when I discovered the concept of digital gardens—a more organic, interconnected way of sharing knowledge that mirrors how thoughts actually grow and evolve over time.

## What is a Digital Garden?

Unlike a blog, which presents ideas as finished products in reverse chronological order, a digital garden treats content as living documents that can be continuously tended, pruned, and expanded. Ideas are planted as seeds, nurtured through multiple iterations, and allowed to grow into mature thoughts through time and reflection.

The beauty of this approach is that it removes the pressure of perfection. Not every idea needs to be fully formed before it sees the light of day. Some thoughts are seedlings—early ideas that might grow into something meaningful. Others are evergreen trees—well-developed concepts that continue to provide value over time.

## Why I Made the Switch

The traditional blogging model felt too linear for my non-linear thinking process. Ideas don't emerge fully formed; they evolve through connections, conversations, and continuous refinement. A digital garden allows me to:

**Embrace the Messy Middle**: I can publish rough ideas and improve them over time, rather than waiting for them to be "perfect."

**Create Meaningful Connections**: Instead of isolated posts, I can link related concepts together, creating a web of interconnected knowledge.

**Focus on Evergreen Content**: Rather than chasing trends or posting on a schedule, I can focus on ideas that have lasting value.

**Think in Public**: By sharing my learning process, not just my conclusions, I invite others into the conversation and create opportunities for collaborative growth.

## The Philosophy Behind the Garden

Tending a digital garden has taught me that knowledge, like nature, thrives on diversity and interconnection. The most valuable insights often emerge at the intersection of different disciplines, experiences, and perspectives.

Just as a physical garden requires patience, attention, and care, maintaining a digital garden is an ongoing practice of reflection and refinement. It's taught me to be more intentional about what I consume, more thoughtful about what I create, and more generous in sharing what I learn.

The garden metaphor also reminds me that growth is rarely linear. Some ideas bloom quickly and then fade. Others lie dormant for months before suddenly sprouting into something beautiful. And sometimes, the most unexpected connections yield the most fruitful insights.

## Building Your Own Garden

If you're feeling overwhelmed by the noise of traditional social media and the pressure of conventional blogging, consider planting your own digital garden. Start small—perhaps with a simple note-taking app or a personal wiki. Focus on capturing ideas that resonate with you, regardless of whether they're "ready" for public consumption.

Remember, the goal isn't to have the most beautiful garden, but to create a space where your thoughts can grow and connect in meaningful ways. In a world that often prioritizes quick consumption over deep reflection, the digital garden offers a sanctuary for slow thinking and genuine learning.

The seeds you plant today might become the wisdom you share tomorrow. And in the interconnected web of human knowledge, every gardener's contribution helps the whole ecosystem flourish.`
  },
  {
    id: '2',
    title: 'The Art of Slow Thinking',
    description: 'In our fast-paced world, I\'ve discovered there\'s immense value in taking time to think deeply and reflect thoughtfully.',
    date: 'Dec 2024',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=250&fit=crop&auto=format',
    type: 'essay' as const,
    content: `In a world that rewards quick responses and instant solutions, I've become an advocate for something increasingly rare: slow thinking. This isn't about being inefficient or indecisive. It's about recognizing that our best insights often emerge not from the speed of our reactions, but from the depth of our reflection.

The modern workplace celebrates rapid decision-making, immediate responses to emails, and the ability to multitask across dozens of priorities. But in my experience, this pace often leads to surface-level solutions and missed opportunities for genuine innovation.

## The Paradox of Speed

We live in what Cal Newport calls "the attention economy"—a system that profits from keeping us in a constant state of reactive engagement. The faster we move, the more we consume, and the less time we have for the kind of deep contemplation that leads to meaningful breakthroughs.

But here's the paradox: the problems that matter most in our lives and work are rarely solved by thinking faster. They're solved by thinking differently, more carefully, and with greater nuance than our habitual patterns allow.

## Cultivating Slow Thinking

Slow thinking is a practice, not a personality trait. It requires intentionally creating space for reflection in a world designed to fill every moment with stimulation. Here are some approaches I've found valuable:

**Morning Pages**: Following Julia Cameron's practice from "The Artist's Way," I spend time each morning writing stream-of-consciousness thoughts. This mental decluttering creates space for deeper insights to emerge throughout the day.

**Walking Meditation**: Some of my best ideas come not while sitting at my desk, but while walking without podcasts, music, or distractions. The rhythm of walking seems to unlock a different kind of thinking.

**The 24-Hour Rule**: For important decisions, I've adopted a personal rule of waiting at least 24 hours before responding. This small buffer often reveals perspectives I missed in my initial reaction.

**Weekly Reviews**: Every week, I spend time reviewing not just what I accomplished, but how I thought about problems and what patterns I notice in my decision-making.

## The Compound Effect of Reflection

Just as compound interest creates wealth over time, compound reflection creates wisdom. Each time we slow down to examine our thinking, we're not just solving the problem at hand—we're improving our capacity to think about future problems.

This meta-cognitive skill—thinking about thinking—is perhaps the most valuable asset we can develop. It allows us to recognize our biases, question our assumptions, and approach challenges with greater creativity and insight.

## Embracing the Uncomfortable Pause

Slow thinking often requires us to sit with uncertainty longer than feels comfortable. In a culture that equates confidence with having quick answers, admitting "I need time to think about this" can feel like weakness.

But I've learned that this pause is actually a position of strength. It signals that you take the question seriously enough to give it proper consideration. It demonstrates respect for complexity rather than rushing toward oversimplified solutions.

## The Wisdom of Trees

Trees are masters of slow growth. They don't rush to reach their full height; they invest decades in developing strong root systems that can support their eventual stature. Similarly, our best ideas often need time to develop their roots before we can see their full potential.

In a digital garden, as in nature, the most valuable growth happens slowly, deliberately, and with careful attention to the conditions that allow ideas to flourish.

The art of slow thinking isn't about being slow—it's about being intentional. It's about choosing depth over speed, reflection over reaction, and wisdom over mere information.

In our accelerated world, perhaps the most radical act is simply taking time to think.`
  },
  {
    id: '3',
    title: 'La Vida',
    description: 'A meditation on resilience and growth, inspired by trees that find ways to flourish in the most unlikely places.',
    date: 'Jan 2025',
    readTime: '3 min read',
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=400&h=250&fit=crop&auto=format',
    type: 'poetry' as const,
    content: `Todos somos frutos de la Vida,
todo fruto viene de una semilla,
en la semilla está la vida.
Si no hay vida nada existe,
y todo cuanto existe,
existe por la Vida,
aunque a veces la Vida
no es manifiesta.

La Vida es lo que da existencia
a todo cuanto existe.
No sólo lo que tiene movimiento
tiene vida.
La Vida está más allá del movimiento.
La Vida está más allá de los sentidos.
La Vida está más allá del pensamiento.
La Vida es lo que da ser
a todo lo que «es»,
y todo deja de ser si no está la Vida.

¿De dónde viene la vida?
La Vida en sí no tiene principio ni fin
porque ella es
expresión del Ser que «ES»,
el Único que «ES»
en Sí mismo y Consigo mismo,
el Eterno que no tiene
principio ni fin,
de Quien todo procede
y a Quien todo tiene que volver.

La Historia pertenece al Tiempo.
La Historia de la Vida
comienza con el Tiempo.
En el tiempo hay muerte y vida,
la muerte es la ausencia de la vida,
pero más allá de la muerte está la Vida.
Para la Vida
no hay tiempo ni hay muerte,
nada se pierde, nada perece,
todo se transforma.

Cuando la flor muere
es para dar paso al fruto;
cuando muere el fruto
es para dar paso a un nuevo árbol.
Todo cuanto existe al morir da fruto,
ese fruto es la Vida que aparece;
al despojarse de una forma,
en otra forma aparece.

A veces la vida que aparece
cuando algo muere,
no se manifiesta a los sentidos,
pero, ciertamente,
lo que muere se transforma,
y en esa nueva forma está la vida.

Es la Ley de la Creación entera,
todo vuelve a su Ser,
y mientras de Él no tome conciencia,
de su Ser vuelve to manifestarse,
hasta que toda Creación
tome conciencia de lo que «no-es»
y del Único que «ES» en todo y en todos.

Entonces termina
la historia que conocemos,
y entramos en la eternidad
que ahora desconocemos,
sin recuerdos de pasado
ni ambiciones de futuro,
un eterno presente sumergidos en la Vida,
siendo uno con Ella,
con el Único que «ES».`
  }
];

// Sample Deep Dive Items
export const SAMPLE_DEEP_DIVE_ITEMS: DeepDiveItem[] = [
  {
    id: '1',
    title: 'The Science of Plant Intelligence',
    description: 'My comprehensive exploration of how plants communicate, adapt, and exhibit intelligent behavior without a central nervous system.',
    date: 'Jan 2025',
    readTime: '20 min read',
    tags: ['botany', 'science', 'nature', 'intelligence'],
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=250&fit=crop&auto=format'
  }
]; 
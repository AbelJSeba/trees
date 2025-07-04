import { ReadingItem } from '../types';

export const BOOKS: ReadingItem[] = [
  {
    id: '1',
    title: 'Oedipus Rex',
    author: 'Sophocles',
    description: 'A one-day Greek tragedy where King Oedipus tracks down a plague\'s cause and learns he has unknowingly killed his father and married his mother. The lean plot and relentless irony still impress, while fate, pride, and accountability stay relevant. The shock twist feels more unsettling than moving, keeping it interesting rather than essential.',
    date: 'Oct 2020',
    readTime: '3 min read',
    rating: 6,
    tags: ['classics', 'tragedy', 'greek-literature', 'philosophy'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&auto=format',
    coverImage: '/src/data/images/oedipus-rex-cover.jpg',
    spineColor: '#493131',
    textColor: '#ffffff'
  },
  {
    id: '2',
    title: 'Hamlet',
    author: 'William Shakespeare',
    description: 'Prince Hamlet learns his father was murdered and struggles with revenge, doubt, and court intrigue. The play\'s probing of conscience and its famous soliloquies justify its reputation, but the dense language can feel like work if you aren\'t fond of Early Modern English.',
    date: 'Jul 2020',
    readTime: '8 min read',
    rating: 7,
    tags: ['shakespeare', 'classics', 'tragedy', 'drama'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&auto=format',
    coverImage: '/src/data/images/hamlet-cover.jpg',
    spineColor: '#0D2B37',
    textColor: '#ffffff'
  },
  {
    id: '3',
    title: 'Romeo and Juliet',
    author: 'William Shakespeare',
    description: 'Star-crossed lovers from rival families risk everything for a secret marriage, triggering duels, exile, and a tragic double death. The swift plot and lyrical passages still charm, and the social commentary remains clear even when the archaic phrasing distracts.',
    date: 'Feb 2020',
    readTime: '6 min read',
    rating: 8,
    tags: ['shakespeare', 'classics', 'romance', 'tragedy'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&auto=format',
    coverImage: '/src/data/images/romeo-and-juliet-cover.jpg',
    spineColor: '#8B0000',
    textColor: '#ffffff'
  },
  {
    id: '4',
    title: 'Macbeth',
    author: 'William Shakespeare',
    description: 'Driven by prophecy and ambition, Macbeth murders the king of Scotland, then spirals into paranoia alongside the guilt-wracked Lady Macbeth. The bleak look at power and conscience is compelling, though the older diction and heavy symbolism can feel more effort than reward if you mainly want the historical context.',
    date: 'Nov 2020',
    readTime: '5 min read',
    rating: 6,
    tags: ['shakespeare', 'classics', 'tragedy', 'power'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&auto=format',
    coverImage: '/src/data/images/macbeth-cover.jpg',
    spineColor: '#1F2937',
    textColor: '#ffffff'
  },
  {
    id: '5',
    title: 'Atomic Habits',
    author: 'James Clear',
    description: 'The definitive book on building habits. The core insight that small compound changes bring enormous results if you stay consistent seems obvious in retrospect, but it\'s something most people aren\'t self-aware about.\n\nWhat resonated most is how it aligns with my view that life is a constant series of choices. You are always choosing; even by not choosing, you are still making a choice. Each tiny decision compounds into who you become. Clear gives you practical tools to make those choices intentionally rather than defaulting to unconscious patterns.',
    date: '2021',
    readTime: '12 min read',
    rating: 8,
    tags: ['habits', 'self-improvement', 'productivity', 'psychology'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&auto=format',
    coverImage: 'https://m.media-amazon.com/images/I/91HSzl9bxoL._SY522_.jpg',
    spineColor: '#FFFDF6',
    textColor: '#000000'
  },
  {
    id: '6',
    title: 'Zero to One',
    author: 'Peter Thiel',
    description: 'The bible for startup founders. This book really got me excited about building a startup.\n\nOne of the biggest lessons was the counterintuitive approach where you actually don\'t want to compete with anyone. The default of all companies that became the biggest players is that they are uncontested. Google has a monopoly on search, Facebook on social networks, Nvidia on chips. They only make it seem like they have competition to avoid regulations. All monopolies like to pretend they have competition, but in reality you don\'t want competition.\n\nSo as a startup, you don\'t want to be competing with any of these. Instead, Thiel recommends creating something entirely new, going from zero to one rather than copying what exists. Find a small market you can dominate completely, then expand from that monopoly position.\n\nThe first principles on what to work on, how to create massive value, and how to capture that value to build a valuable company. Anyone interested in startups needs to read this.',
    date: 'Jul 2022',
    readTime: '15 min read',
    rating: 9,
    tags: ['business', 'startups', 'entrepreneurship', 'innovation'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&auto=format',
    coverImage: 'https://m.media-amazon.com/images/I/51zGCdRQXOL._SY522_.jpg',
    spineColor: '#5E92BA',
    textColor: '#ffffff'
  },
  {
    id: '7',
    title: 'The Lean Startup',
    author: 'Eric Ries',
    description: 'What I liked most is how it shows the importance of testing assumptions and hypotheses. The best example is HelloFresh founders who started by just receiving orders manually and going to buy groceries from the store themselves. No backend, no complex systems, just pure validation.\n\nThe book teaches you to validate assumptions before dedicating valuable time to building. The most important part is talking to customers. Without it, you will inevitably end up building the wrong thing.\n\nRies gives you a framework to systematically test your ideas with minimal resources. The build-measure-learn cycle forces you to confront reality early rather than falling in love with your untested vision. Essential reading for anyone wanting to build products people actually want.',
    date: 'Aug 2022',
    readTime: '14 min read',
    rating: 8,
    tags: ['business', 'startups', 'lean-methodology', 'validation'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&auto=format',
    coverImage: 'https://m.media-amazon.com/images/I/41Ag4WE7uyL._SY445_SX342_.jpg',
    spineColor: '#3776B9',
    textColor: '#ffffff'
  },
  {
    id: '8',
    title: 'The Power of Now',
    author: 'Eckhart Tolle',
    description: 'The core message of spirituality condensed into an accessible format. What resonated most was the idea that there is no past, present, or future - there is only now. The past or future is not good or bad. What you did then doesn\'t matter; it\'s about what you do now.\n\nTolle shows how most suffering comes from living in psychological time rather than the present moment. Great first book on self-realization since it\'s easier to understand than most eastern philosophy. A good entry point for people curious about understanding the Self.',
    date: '2018',
    readTime: '11 min read',
    rating: 7,
    tags: ['spirituality', 'mindfulness', 'self-realization', 'philosophy'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&auto=format',
    coverImage: 'https://m.media-amazon.com/images/I/71-zqlETKcL._SY522_.jpg',
    spineColor: '#FFF896',
    textColor: '#000000'
  },
  {
    id: '9',
    title: 'A New Earth',
    author: 'Eckhart Tolle',
    description: 'I read this in high school when the dysfunction of ego was crystal clear to me. Everyone around me was doing things they didn\'t even like or weren\'t passionate about just to look better on college applications.\n\nWhat I loved most is how Tolle explains that the best way to get over sadness, depression, or difficult feelings is to just be aware of them. Be conscious that these feelings are not you - you are a higher consciousness. Just be aware without judging, accept it, and it goes away. Similar to how the best way to stop thinking is to stop trying to stop thinking, and the mind just goes quiet.\n\nThe book builds on The Power of Now but goes deeper into how ego creates suffering and how to transcend it through presence. Essential reading for anyone feeling trapped by societal expectations or their own mental patterns.',
    date: '2018',
    readTime: '13 min read',
    rating: 8,
    tags: ['spirituality', 'consciousness', 'ego', 'self-awareness'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&auto=format',
    coverImage: 'https://m.media-amazon.com/images/I/71IiqoxaNhL._SY522_.jpg',
    spineColor: '#EA5219',
    textColor: '#ffffff'
  },
  {
    id: '10',
    title: 'Why Greatness Cannot Be Planned',
    author: 'Kenneth Stanley & Joel Lehman',
    description: 'This book fundamentally changed how I think about achievement and innovation. The core insight is that all great discoveries come from open exploration rather than goal-directed optimization.\n\nThe research with mutated images perfectly illustrates this. By not having a specific goal, people explored interesting combinations and discovered beautiful forms that looked nothing like their starting point. If you had set out to create a butterfly, you would have never selected the early mutations that eventually led to one. The path to greatness is non-obvious and can only be found through exploration.\n\nThe concept of stepping stones is equally profound. Vacuum tubes were crucial to discovering computers, but if you had set out with the goal of inventing computers, you might have never discovered vacuum tubes. Without that stepping stone, computers might not exist. Every great innovation builds on seemingly unrelated discoveries.\n\nWhat resonated most is how we\'re all part of everything that has been and will be thought. We\'re not creators but explorers finding treasure that already exists in the space of possibilities. This shifts the entire paradigm from forcing outcomes to following interesting paths.\n\nThis book got me into doing research. It showed me that the most exciting discoveries come from curiosity-driven exploration rather than predetermined goals. Everyone needs to understand this. The book shows why our goal-obsessed culture systematically fails to produce true innovation and offers a radically better alternative.',
    date: 'Apr 2024',
    readTime: '18 min read',
    rating: 10,
    tags: ['innovation', 'research', 'exploration', 'philosophy-of-science'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&auto=format',
    coverImage: 'https://m.media-amazon.com/images/I/61PPmbZPGxL._SY522_.jpg',
    spineColor: '#C6D6E3',
    textColor: '#000000'
  },
  {
    id: '11',
    title: 'Oh Jerusalem!',
    author: 'Larry Collins and Dominique Lapierre',
    description: 'An incredibly dense read that I picked up to understand the Israeli-Palestinian conflict better. The book is almost too complex - I found myself getting lost in the sheer amount of detail and thinking I\'d need to read it twice to fully grasp everything.\n\nDespite being overwhelmingly dense, it\'s worth pushing through if you want a deep understanding of how the modern conflict began. The authors pack in an enormous amount of historical detail about the birth of Israel, 1948 war and subsequent wars. Not for casual readers.',
    date: '2019',
    readTime: '25 min read',
    rating: 7,
    tags: ['history', 'middle-east', 'politics', 'conflict'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&auto=format',
    coverImage: 'https://m.media-amazon.com/images/I/71ym36ZPrIL._SY522_.jpg',
    spineColor: '#D1A25E',
    textColor: '#ffffff'
  },
  {
    id: '12',
    title: 'Can\'t Hurt Me',
    author: 'David Goggins',
    description: 'The biggest lesson is that the most important thing is to be brutally honest with yourself. It\'s impossible to fix problems you don\'t acknowledge exist. Be honest with yourself when it\'s hard, when it\'s painful, always.\n\nThis applies to everything. Like when you\'re exercising and want to stop, you\'re just making an excuse. If you\'re honest with yourself, you know you have way more to give. Goggins shows through his own extreme transformation that most of our limitations are self-imposed lies we tell ourselves.\n\nOne of my favorite concepts from the book: most people are so concerned about their limits that they don\'t ever put the work required to get even remotely close to them. We quit far before we reach our actual potential because we\'re afraid of the pain and effort required to push harder.\n\nHis story is intense and sometimes over the top, but the core message about radical self-accountability and pushing past mental barriers is invaluable. The book forces you to confront your own excuses and realize how much untapped potential you\'re leaving on the table.',
    date: '2022',
    readTime: '16 min read',
    rating: 8,
    tags: ['self-improvement', 'mental-toughness', 'motivation', 'biography'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&auto=format',
    coverImage: 'https://m.media-amazon.com/images/I/81VpFFpZTtL._SY522_.jpg',
    spineColor: '#000000',
    textColor: '#ffffff'
  },
  {
    id: '13',
    title: 'In the Shadow of the Mountain Level 5',
    author: 'Cambridge English Readers',
    description: 'Part of a series of books I used to learn English after moving to the US. I wasn\'t reading for the content but to build vocabulary and improve my reading comprehension. These Cambridge readers were instrumental in helping me learn to read, write, and speak English in just 8 months.',
    date: '2015',
    readTime: '4 min read',
    rating: 0,
    tags: ['english-learning', 'cambridge-readers', 'education', 'language'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&auto=format',
    coverImage: 'https://m.media-amazon.com/images/I/817uN0vG+VL._SY522_.jpg',
    spineColor: '#7D94B6',
    textColor: '#ffffff'
  },
  {
    id: '14',
    title: 'The Dark Side of the City Level 2',
    author: 'Cambridge English Readers',
    description: 'Another book from my English learning journey. Level 2 was perfect for building foundational vocabulary when I had just moved to the US. The simplified language made it possible to actually finish books in English, which built confidence while expanding my vocabulary systematically.',
    date: '2015',
    readTime: '3 min read',
    rating: 0,
    tags: ['english-learning', 'cambridge-readers', 'education', 'language'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&auto=format',
    coverImage: 'https://m.media-amazon.com/images/I/71yD2qdw5cL._SY522_.jpg',
    spineColor: '#D0982B',
    textColor: '#ffffff'
  },
  {
    id: '15',
    title: 'The Amsterdam Connection Level 4',
    author: 'Cambridge English Readers',
    description: 'This one holds a special place in my memory. I thought it was really interesting, though I\'m not sure if that was because I was just learning English or if the story was genuinely engaging. Reading this book in Starbucks and writing down all the words I didn\'t understand is a core memory.',
    date: '2015',
    readTime: '4 min read',
    rating: 0,
    tags: ['english-learning', 'cambridge-readers', 'education', 'language'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&auto=format',
    coverImage: 'https://m.media-amazon.com/images/I/61JuLjnZMlL._SY522_.jpg',
    spineColor: '#2D5066',
    textColor: '#ffffff'
  },
  {
    id: '16',
    title: 'Persepolis',
    author: 'Marjane Satrapi',
    description: 'This book resonated so deeply with my own experience growing up under Hugo Chavez\'s dictatorship in Venezuela. Reading Satrapi\'s story of watching Iran collapse was like reliving my own childhood. The violence, not being able to leave our homes after 7pm, people disappearing, being scared at night.\n\nThe parallels were devastating. Just like Satrapi\'s Iran, I watched my country collapse on itself while the government did whatever it wanted, abusing its power with impunity. The most painful part was that crushing realization that there was no hope, that things would only continue to get worse.\n\nWhat hit hardest was seeing Satrapi\'s parents struggle to get her out, just like my own parents who, despite not having money, desperately tried to get us out of Venezuela. The book captures perfectly what it\'s like to grow up under dictatorship: the fear, the loss of normalcy, the way violence becomes routine, and that specific grief of watching your homeland destroy itself.\n\nSatrapi\'s graphic novel format makes the experience even more visceral. Her simple black and white drawings somehow capture the complexity of living through political collapse in a way that pure text couldn\'t achieve.',
    date: '2019',
    readTime: '20 min read',
    rating: 9,
    tags: ['graphic-novel', 'memoir', 'politics', 'dictatorship', 'iran', 'personal'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&auto=format',
    coverImage: 'https://m.media-amazon.com/images/I/51EORpzpSnL._SY522_.jpg',
    spineColor: '#000000',
    textColor: '#ffffff'
  },
  {
    id: '17',
    title: 'The Last Lecture',
    author: 'Randy Pausch',
    description: 'The only book that has made me cry multiple times in multiple settings. This book resonated so deeply because it embodies part of my core philosophy:\n\n"When the flower dies, it does so to give way to the fruit; when the fruit dies, it does so to give rise to a new tree. All that exists, in dying, bears fruit; that fruit is the Life that appears; in shedding one form, it appears in another."\n\nThe book spoke to my deepest values. My parents chose my name, Abel, by randomly opening the Bible, and honesty has always been my highest value. Randy\'s radical honesty about life, death, dreams, and what truly matters exemplified living with complete authenticity.\n\nWhat moved me most was watching someone face death with such grace and purpose. I too hope that when death comes knocking at my door I can smile at it and accept the transformation with such grace.',
    date: '2022',
    readTime: '18 min read',
    rating: 10,
    tags: ['memoir', 'philosophy', 'life-lessons', 'death', 'authenticity', 'inspiration'],
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=250&fit=crop&auto=format',
    coverImage: 'https://m.media-amazon.com/images/I/613Jhj+HirL._SY522_.jpg',
    spineColor: '#1F3E6C',
    textColor: '#ffffff'
  }
];

export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  category: "Philosophy" | "Technology" | "Psychology" | "Literature";
  cover: string;
  rating: number; // 1-5
  lastUpdated: string;
  summary: string;
  keyInsights: string[];
  quote: string;
  quoteSource: string;
  tags: string[];
  graphNodeId: string;
  readingProgress: number; // 0-100
}

export const books: Book[] = [
  // ─── Philosophy ────────────────────────────────
  {
    id: "sapiens",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    year: 2011,
    category: "Philosophy",
    cover: "https://images.unsplash.com/photo-1761171489318-5fe520b8cbf8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    rating: 5,
    lastUpdated: "2025-03-14",
    summary: "A sweeping history of humankind from the Stone Age to the 21st century, exploring how biology and history shaped us.",
    keyInsights: [
      "The Cognitive Revolution ~70,000 years ago gave Homo Sapiens the ability to create fiction — the foundation of culture, religion, and nations.",
      "Money, corporations, and human rights are all shared myths that exist only in the collective imagination.",
      "The Agricultural Revolution may have been 'history's biggest fraud' — trading nomadic freedom for settled suffering.",
    ],
    quote:
      "Large numbers of strangers can cooperate successfully by believing in common myths.",
    quoteSource: "Chapter 2",
    tags: ["history", "anthropology", "evolution", "collective-fiction"],
    graphNodeId: "book-sapiens",
    readingProgress: 100,
  },
  {
    id: "meditations",
    title: "Meditations",
    author: "Marcus Aurelius",
    year: 180,
    category: "Philosophy",
    cover: "https://images.unsplash.com/photo-1658503330391-96a1a24933e0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    rating: 5,
    lastUpdated: "2025-02-28",
    summary: "Personal writings of the Roman Emperor — a stoic's private journal, never intended for publication.",
    keyInsights: [
      "The obstacle is the way — what stands in our path becomes our path.",
      "You have power over your mind, not outside events. Realise this, and you will find strength.",
      "Confine yourself to the present. Do the work that is at hand.",
    ],
    quote:
      "Waste no more time arguing about what a good man should be. Be one.",
    quoteSource: "Book X",
    tags: ["stoicism", "virtue", "inner-citadel", "present"],
    graphNodeId: "book-meditations",
    readingProgress: 100,
  },
  {
    id: "republic",
    title: "The Republic",
    author: "Plato",
    year: -375,
    category: "Philosophy",
    cover: "https://images.unsplash.com/photo-1772658761101-5a0d8277cb0a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    rating: 4,
    lastUpdated: "2025-01-12",
    summary: "Plato's dialogue on justice, the ideal city-state, and the philosopher's role in society.",
    keyInsights: [
      "The Allegory of the Cave: most humans live mistaking shadows for reality — philosophy is the ascent toward the sunlight.",
      "Justice is each part of the soul doing its proper function: reason governing spirit and appetite.",
      "The philosopher-king is the ideal ruler — one who seeks wisdom rather than power.",
    ],
    quote:
      "The unexamined life is not worth living.",
    quoteSource: "Apology (related text)",
    tags: ["justice", "ideal-state", "allegory", "reason"],
    graphNodeId: "book-republic",
    readingProgress: 72,
  },

  // ─── Technology ────────────────────────────────
  {
    id: "clean-code",
    title: "Clean Code",
    author: "Robert C. Martin",
    year: 2008,
    category: "Technology",
    cover: "https://images.unsplash.com/photo-1649451844802-f444b7885ec1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    rating: 4,
    lastUpdated: "2025-04-01",
    summary: "A handbook of agile software craftsmanship — practical rules for writing readable, maintainable code.",
    keyInsights: [
      "The only valid measurement of code quality: WTFs per minute during review.",
      "Functions should do one thing. They should do it well. They should do it only.",
      "Comments are a failure to express intent in code — clean code is self-documenting.",
    ],
    quote:
      "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    quoteSource: "Chapter 1",
    tags: ["SOLID", "refactoring", "naming", "functions"],
    graphNodeId: "book-cleancode",
    readingProgress: 100,
  },
  {
    id: "ddia",
    title: "Designing Data-Intensive Applications",
    author: "Martin Kleppmann",
    year: 2017,
    category: "Technology",
    cover: "https://images.unsplash.com/photo-1763771787035-99c6c28ec78e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    rating: 5,
    lastUpdated: "2025-03-22",
    summary: "The definitive guide to distributed systems, databases, and the principles behind reliable, scalable applications.",
    keyInsights: [
      "Reliability, Scalability, and Maintainability are the three concerns of data systems.",
      "ACID vs BASE: strong consistency vs eventual consistency is a trade-off, not a binary choice.",
      "Event logs (append-only) are the source of truth — derived data is just a transformation.",
    ],
    quote:
      "The major difference between a thing that might go wrong and a thing that cannot possibly go wrong is that when a thing that cannot possibly go wrong goes wrong, it usually turns out to be impossible to get at.",
    quoteSource: "Chapter 8",
    tags: ["distributed-systems", "databases", "consistency", "scalability"],
    graphNodeId: "book-ddia",
    readingProgress: 58,
  },
  {
    id: "pragmatic",
    title: "The Pragmatic Programmer",
    author: "David Thomas & Andrew Hunt",
    year: 1999,
    category: "Technology",
    cover: "https://images.unsplash.com/photo-1754548930550-be9fa88874f4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    rating: 4,
    lastUpdated: "2024-11-30",
    summary: "Career-long guidance for software craftspeople: principles, practices, and philosophy of pragmatic programming.",
    keyInsights: [
      "DRY — Don't Repeat Yourself. Every piece of knowledge must have a single authoritative representation.",
      "Tracer bullets: fire something small and real end-to-end first, then iterate outward.",
      "Your knowledge portfolio is your most important asset — invest in it regularly.",
    ],
    quote:
      "Be a catalyst for change — don't wait for permission to fix what's broken.",
    quoteSource: "Tip 11",
    tags: ["DRY", "software-craft", "career", "pragmatism"],
    graphNodeId: "book-pragmatic",
    readingProgress: 88,
  },

  // ─── Psychology ────────────────────────────────
  {
    id: "thinking",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    year: 2011,
    category: "Psychology",
    cover: "https://images.unsplash.com/photo-1522932753915-9ee97e43e3d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    rating: 5,
    lastUpdated: "2025-02-10",
    summary: "A landmark in behavioral economics: the two systems of thought — fast intuition and slow deliberation.",
    keyInsights: [
      "System 1 (fast, automatic, intuitive) drives most daily decisions. System 2 (slow, deliberate) is the editor.",
      "Loss aversion: losses feel twice as powerful as equivalent gains. This skews all decision-making.",
      "What you see is all there is (WYSIATI): we build complete narratives from limited data without noticing gaps.",
    ],
    quote:
      "Nothing in life is as important as you think it is while you are thinking about it.",
    quoteSource: "Part III",
    tags: ["cognitive-bias", "heuristics", "decision-making", "loss-aversion"],
    graphNodeId: "book-thinking",
    readingProgress: 100,
  },
  {
    id: "mans-search",
    title: "Man's Search for Meaning",
    author: "Viktor Frankl",
    year: 1946,
    category: "Psychology",
    cover: "https://images.unsplash.com/photo-1624704328044-d648d88096bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    rating: 5,
    lastUpdated: "2025-01-28",
    summary: "A psychiatrist's harrowing account of life in Nazi concentration camps and the logotherapy it inspired.",
    keyInsights: [
      "Between stimulus and response, there is a space. In that space lies our freedom and our power to choose.",
      "Logotherapy: the primary human drive is not pleasure (Freud) nor power (Adler), but meaning.",
      "Love is the only way to grasp another human being in the innermost core of their personality.",
    ],
    quote:
      "When we are no longer able to change a situation, we are challenged to change ourselves.",
    quoteSource: "Part One",
    tags: ["logotherapy", "meaning", "suffering", "freedom", "existentialism"],
    graphNodeId: "book-mans-search",
    readingProgress: 100,
  },
  {
    id: "habit",
    title: "The Power of Habit",
    author: "Charles Duhigg",
    year: 2012,
    category: "Psychology",
    cover: "https://images.unsplash.com/photo-1732704573802-8ec393009148?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    rating: 4,
    lastUpdated: "2024-12-15",
    summary: "How habits work — the cue-routine-reward loop — and how to change them at an individual, social, and organizational level.",
    keyInsights: [
      "The Habit Loop: Cue → Routine → Reward. Habits never fully disappear — they are encoded in the basal ganglia.",
      "Keystone habits trigger a chain reaction of other positive habits across different domains of life.",
      "Belief is essential for habit change — communities create the belief that change is possible.",
    ],
    quote:
      "Champions don't do extraordinary things. They do ordinary things, but they do them without thinking.",
    quoteSource: "Chapter 4",
    tags: ["habit-loop", "willpower", "keystone-habits", "neuroscience"],
    graphNodeId: "book-habit",
    readingProgress: 90,
  },

  // ─── Literature ────────────────────────────────
  {
    id: "crime-punishment",
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    year: 1866,
    category: "Literature",
    cover: "https://images.unsplash.com/photo-1641373469900-6831f4e26ce2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    rating: 5,
    lastUpdated: "2025-04-10",
    summary: "A student commits a murder believing himself above conventional morality — then is consumed by psychological torment.",
    keyInsights: [
      "The 'extraordinary man' theory: Raskolnikov believes great men are beyond ordinary moral law — Dostoevsky systematically dismantles this.",
      "Guilt operates below consciousness — the body and mind break down under the weight of denied guilt.",
      "Sonya represents redemptive suffering and unconditional love as a path to spiritual resurrection.",
    ],
    quote:
      "Pain and suffering are always inevitable for a large intelligence and a deep heart.",
    quoteSource: "Part IV",
    tags: ["morality", "guilt", "redemption", "nihilism", "Russian-literature"],
    graphNodeId: "book-crime",
    readingProgress: 100,
  },
  {
    id: "gatsby",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
    category: "Literature",
    cover: "https://images.unsplash.com/photo-1754490900179-528cc5a3f8c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    rating: 4,
    lastUpdated: "2024-10-05",
    summary: "In the Roaring Twenties, mysterious millionaire Jay Gatsby pursues his dream — and the woman he lost — across glittering excess.",
    keyInsights: [
      "The green light at the end of Daisy's dock symbolizes the American Dream — always ahead, always just out of reach.",
      "Gatsby's idealized vision of Daisy is more about the past than about her as a real person.",
      "The Valley of Ashes: beneath the glittering surface of the Jazz Age lies moral emptiness and exploitation.",
    ],
    quote:
      "So we beat on, boats against the current, borne back ceaselessly into the past.",
    quoteSource: "Final paragraph",
    tags: ["american-dream", "illusion", "class", "jazz-age"],
    graphNodeId: "book-gatsby",
    readingProgress: 100,
  },
  {
    id: "1984",
    title: "Nineteen Eighty-Four",
    author: "George Orwell",
    year: 1949,
    category: "Literature",
    cover: "https://images.unsplash.com/photo-1691625014846-86d03c4135dc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=400",
    rating: 5,
    lastUpdated: "2025-03-05",
    summary: "A totalitarian nightmare: Big Brother watches all, Newspeak shrinks thought, and truth is whatever the Party decrees.",
    keyInsights: [
      "Doublethink: holding two contradictory beliefs simultaneously — collective self-deception as a tool of control.",
      "Newspeak: limit the language, limit the thought. You cannot conceive what you cannot express.",
      "The proles have the numbers but not the consciousness — freedom requires awareness, not just potential power.",
    ],
    quote:
      "War is peace. Freedom is slavery. Ignorance is strength.",
    quoteSource: "Part I",
    tags: ["totalitarianism", "surveillance", "language", "doublethink", "freedom"],
    graphNodeId: "book-1984",
    readingProgress: 100,
  },
];

export const booksByCategory = {
  Philosophy: books.filter((b) => b.category === "Philosophy"),
  Technology: books.filter((b) => b.category === "Technology"),
  Psychology: books.filter((b) => b.category === "Psychology"),
  Literature: books.filter((b) => b.category === "Literature"),
};

export const categories = ["Philosophy", "Technology", "Psychology", "Literature"] as const;
export type Category = typeof categories[number];

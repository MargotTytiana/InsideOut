export type NodeType = "hub" | "category" | "book" | "concept";

export interface GraphNode {
  id: string;
  label: string;
  type: NodeType;
  x: number;
  y: number;
  r: number;
  bookId?: string;
  category?: string;
  detail?: {
    description: string;
    quote?: string;
    relatedBooks?: string[];
  };
}

export interface GraphEdge {
  id: string;
  from: string;
  to: string;
}

export const graphNodes: GraphNode[] = [
  // Hub
  {
    id: "hub",
    label: "Reading Notes",
    type: "hub",
    x: 0,
    y: 0,
    r: 22,
    detail: {
      description:
        "A personal knowledge base built from deep reading across philosophy, technology, psychology, and literature.",
    },
  },
  // Category nodes
  {
    id: "cat-philosophy",
    label: "Philosophy",
    type: "category",
    x: -185,
    y: -140,
    r: 15,
    category: "Philosophy",
    detail: {
      description: "Questions of existence, knowledge, ethics, and the good life — from ancient Athens to modernity.",
    },
  },
  {
    id: "cat-tech",
    label: "Technology",
    type: "category",
    x: 195,
    y: -125,
    r: 15,
    category: "Technology",
    detail: {
      description: "Software craft, distributed systems, and the principles that make code last.",
    },
  },
  {
    id: "cat-psychology",
    label: "Psychology",
    type: "category",
    x: 175,
    y: 165,
    r: 15,
    category: "Psychology",
    detail: {
      description: "How the mind works — cognition, motivation, behavior, and the architecture of decision-making.",
    },
  },
  {
    id: "cat-literature",
    label: "Literature",
    type: "category",
    x: -170,
    y: 165,
    r: 15,
    category: "Literature",
    detail: {
      description: "Stories that illuminate what it means to be human — moral complexity, longing, and consequence.",
    },
  },

  // Philosophy books
  {
    id: "book-sapiens",
    label: "Sapiens",
    type: "book",
    x: -330,
    y: -210,
    r: 10,
    bookId: "sapiens",
    category: "Philosophy",
    detail: {
      description:
        "Money, empires, and religions are all shared fictions — it is the uniquely human ability to believe in collective myths that gave Sapiens dominion over the planet.",
      quote: "Large numbers of strangers can cooperate by believing in common myths.",
      relatedBooks: ["meditations", "republic"],
    },
  },
  {
    id: "book-meditations",
    label: "Meditations",
    type: "book",
    x: -250,
    y: -300,
    r: 10,
    bookId: "meditations",
    category: "Philosophy",
    detail: {
      description:
        "Marcus Aurelius's private diary: practice the dichotomy of control, accept what is not in your power, and focus relentlessly on virtue.",
      quote: "Waste no more time arguing about what a good man should be. Be one.",
      relatedBooks: ["republic", "mans-search"],
    },
  },
  {
    id: "book-republic",
    label: "The Republic",
    type: "book",
    x: -105,
    y: -300,
    r: 10,
    bookId: "republic",
    category: "Philosophy",
    detail: {
      description:
        "Plato's Allegory of the Cave: the philosopher's task is to ascend from shadows to sunlight — from illusion to truth — and then return to lead others.",
      quote: "The unexamined life is not worth living.",
      relatedBooks: ["sapiens", "1984"],
    },
  },

  // Tech books
  {
    id: "book-cleancode",
    label: "Clean Code",
    type: "book",
    x: 310,
    y: -250,
    r: 10,
    bookId: "clean-code",
    category: "Technology",
    detail: {
      description:
        "Code is read far more than it is written. Functions should do one thing. Names should reveal intent. Leave every module cleaner than you found it.",
      quote: "Any fool can write code a computer understands. Good programmers write code humans can understand.",
      relatedBooks: ["pragmatic", "ddia"],
    },
  },
  {
    id: "book-ddia",
    label: "Data Intensive",
    type: "book",
    x: 360,
    y: -80,
    r: 10,
    bookId: "ddia",
    category: "Technology",
    detail: {
      description:
        "The gap between theory and practice in distributed systems: everything fails eventually. Design for failure, embrace immutability, and understand your consistency guarantees.",
      quote: "Data outlives code.",
      relatedBooks: ["clean-code", "pragmatic"],
    },
  },
  {
    id: "book-pragmatic",
    label: "Pragmatic Prog.",
    type: "book",
    x: 215,
    y: -290,
    r: 10,
    bookId: "pragmatic",
    category: "Technology",
    detail: {
      description:
        "DRY, Tracer Bullets, Broken Windows — the pragmatic programmer is a craftsperson who continuously invests in their knowledge portfolio.",
      quote: "Be a catalyst for change — don't wait for permission to fix what's broken.",
      relatedBooks: ["clean-code"],
    },
  },

  // Psychology books
  {
    id: "book-thinking",
    label: "Thinking, F&S",
    type: "book",
    x: 320,
    y: 135,
    r: 10,
    bookId: "thinking",
    category: "Psychology",
    detail: {
      description:
        "System 1 and System 2: our fast intuitive mind and our slow deliberate mind. Most biases come from over-relying on System 1 in contexts that require System 2.",
      quote: "Nothing in life is as important as you think it is while you are thinking about it.",
      relatedBooks: ["habit", "sapiens"],
    },
  },
  {
    id: "book-mans-search",
    label: "Man's Search",
    type: "book",
    x: 185,
    y: 300,
    r: 10,
    bookId: "mans-search",
    category: "Psychology",
    detail: {
      description:
        "Logotherapy: the will to meaning — not pleasure or power — is the primary human drive. Even in the worst suffering, the last freedom is our attitude toward it.",
      quote: "When we are no longer able to change a situation, we are challenged to change ourselves.",
      relatedBooks: ["crime-punishment", "meditations"],
    },
  },
  {
    id: "book-habit",
    label: "Power of Habit",
    type: "book",
    x: 340,
    y: 260,
    r: 10,
    bookId: "habit",
    category: "Psychology",
    detail: {
      description:
        "Habits are encoded as cue-routine-reward loops in the basal ganglia. Keystone habits cascade: fix one and others start to shift. Willpower is a muscle.",
      quote: "Champions do ordinary things without thinking, faster than anyone else.",
      relatedBooks: ["thinking"],
    },
  },

  // Literature books
  {
    id: "book-crime",
    label: "Crime & Punishment",
    type: "book",
    x: -330,
    y: 165,
    r: 10,
    bookId: "crime-punishment",
    category: "Literature",
    detail: {
      description:
        "Raskolnikov's 'extraordinary man' theory collapses under the weight of guilt — Dostoevsky argues that no intellect can escape the moral law.",
      quote: "Pain and suffering are always inevitable for a large intelligence and a deep heart.",
      relatedBooks: ["1984", "mans-search"],
    },
  },
  {
    id: "book-gatsby",
    label: "The Great Gatsby",
    type: "book",
    x: -200,
    y: 300,
    r: 10,
    bookId: "gatsby",
    category: "Literature",
    detail: {
      description:
        "The green light is always across the water — the American Dream is a horizon that recedes as we approach it. Gatsby chases an illusion of the past.",
      quote: "So we beat on, boats against the current, borne back ceaselessly into the past.",
      relatedBooks: ["sapiens", "1984"],
    },
  },
  {
    id: "book-1984",
    label: "1984",
    type: "book",
    x: -345,
    y: 45,
    r: 10,
    bookId: "1984",
    category: "Literature",
    detail: {
      description:
        "Control thought by controlling language. The Party's power lies not in violence but in making it impossible to conceive of alternatives.",
      quote: "War is peace. Freedom is slavery. Ignorance is strength.",
      relatedBooks: ["republic", "crime-punishment"],
    },
  },

  // Concept nodes
  {
    id: "concept-stoicism",
    label: "Stoicism",
    type: "concept",
    x: -295,
    y: 10,
    r: 7,
    detail: {
      description:
        "The dichotomy of control: focus only on what is within your power — judgment, intention, action — and accept everything else with equanimity.",
      relatedBooks: ["meditations", "republic", "mans-search"],
    },
  },
  {
    id: "concept-cognition",
    label: "Cognition",
    type: "concept",
    x: 55,
    y: -95,
    r: 7,
    detail: {
      description:
        "How we process, store, and retrieve information — and the systematic biases that cause predictable errors in judgment.",
      relatedBooks: ["thinking", "sapiens"],
    },
  },
  {
    id: "concept-fiction",
    label: "Collective Fiction",
    type: "concept",
    x: -82,
    y: -185,
    r: 7,
    detail: {
      description:
        "Shared stories — money, nations, gods — allow large-scale human cooperation. Both Sapiens and 1984 explore how fiction constructs and destroys reality.",
      relatedBooks: ["sapiens", "1984"],
    },
  },
  {
    id: "concept-meaning",
    label: "Meaning",
    type: "concept",
    x: 62,
    y: 220,
    r: 7,
    detail: {
      description:
        "The search for purpose — from Frankl's logotherapy to Dostoevsky's redemptive suffering. Meaning is found through love, work, and how we face unavoidable suffering.",
      relatedBooks: ["mans-search", "crime-punishment"],
    },
  },
  {
    id: "concept-habits",
    label: "Habit Loop",
    type: "concept",
    x: 145,
    y: 45,
    r: 7,
    detail: {
      description:
        "Cue → Routine → Reward. Habits are never erased, only overwritten. Understanding the loop is the first step to changing it.",
      relatedBooks: ["habit", "thinking"],
    },
  },
  {
    id: "concept-craft",
    label: "Software Craft",
    type: "concept",
    x: 195,
    y: -155,
    r: 7,
    detail: {
      description:
        "Programming as craftsmanship: pride in quality, continuous improvement, and the professional responsibility to leave code better than you found it.",
      relatedBooks: ["clean-code", "pragmatic"],
    },
  },
  {
    id: "concept-freedom",
    label: "Freedom",
    type: "concept",
    x: -125,
    y: 95,
    r: 7,
    detail: {
      description:
        "Freedom appears across literature and psychology: from Frankl's inner freedom in the camps, to Winston's crushed resistance in Airstrip One, to Raskolnikov's false theory of the extraordinary man.",
      relatedBooks: ["crime-punishment", "1984", "mans-search"],
    },
  },
];

export const graphEdges: GraphEdge[] = [
  // Hub to categories
  { id: "e-hub-phi", from: "hub", to: "cat-philosophy" },
  { id: "e-hub-tech", from: "hub", to: "cat-tech" },
  { id: "e-hub-psy", from: "hub", to: "cat-psychology" },
  { id: "e-hub-lit", from: "hub", to: "cat-literature" },

  // Philosophy books
  { id: "e-phi-sap", from: "cat-philosophy", to: "book-sapiens" },
  { id: "e-phi-med", from: "cat-philosophy", to: "book-meditations" },
  { id: "e-phi-rep", from: "cat-philosophy", to: "book-republic" },

  // Tech books
  { id: "e-tech-cc", from: "cat-tech", to: "book-cleancode" },
  { id: "e-tech-ddia", from: "cat-tech", to: "book-ddia" },
  { id: "e-tech-prag", from: "cat-tech", to: "book-pragmatic" },

  // Psychology books
  { id: "e-psy-think", from: "cat-psychology", to: "book-thinking" },
  { id: "e-psy-mans", from: "cat-psychology", to: "book-mans-search" },
  { id: "e-psy-habit", from: "cat-psychology", to: "book-habit" },

  // Literature books
  { id: "e-lit-crime", from: "cat-literature", to: "book-crime" },
  { id: "e-lit-gats", from: "cat-literature", to: "book-gatsby" },
  { id: "e-lit-1984", from: "cat-literature", to: "book-1984" },

  // Concepts ↔ books
  { id: "e-stoic-med", from: "concept-stoicism", to: "book-meditations" },
  { id: "e-stoic-rep", from: "concept-stoicism", to: "book-republic" },
  { id: "e-stoic-mean", from: "concept-stoicism", to: "concept-meaning" },

  { id: "e-cog-think", from: "concept-cognition", to: "book-thinking" },
  { id: "e-cog-sap", from: "concept-cognition", to: "book-sapiens" },
  { id: "e-cog-habit", from: "concept-cognition", to: "concept-habits" },

  { id: "e-fic-sap", from: "concept-fiction", to: "book-sapiens" },
  { id: "e-fic-1984", from: "concept-fiction", to: "book-1984" },
  { id: "e-fic-rep", from: "concept-fiction", to: "book-republic" },

  { id: "e-mean-mans", from: "concept-meaning", to: "book-mans-search" },
  { id: "e-mean-crime", from: "concept-meaning", to: "book-crime" },

  { id: "e-hab-book", from: "concept-habits", to: "book-habit" },
  { id: "e-hab-think", from: "concept-habits", to: "book-thinking" },

  { id: "e-craft-cc", from: "concept-craft", to: "book-cleancode" },
  { id: "e-craft-prag", from: "concept-craft", to: "book-pragmatic" },

  { id: "e-free-crime", from: "concept-freedom", to: "book-crime" },
  { id: "e-free-1984", from: "concept-freedom", to: "book-1984" },
  { id: "e-free-mans", from: "concept-freedom", to: "book-mans-search" },
];

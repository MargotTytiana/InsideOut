export interface Project {
  id: string;
  number: string;
  title: string;
  category: string;
  year: string;
  shortDesc: string;
  fullDesc: string;
  tech: string[];
  tags: string[];
  icon: string;
  image: string;
  features: string[];
  accentColor: string;
}

export const projects: Project[] = [
  {
    id: "starmap",
    number: "01",
    title: "Starmap Explorer",
    category: "Data Visualization",
    year: "2024",
    shortDesc:
      "An interactive 3D astronomy visualization that renders real star catalog data. Navigate the galaxy with smooth WebGL transitions and discover constellations.",
    fullDesc:
      "Starmap Explorer is a WebGL-powered interactive celestial map built on real NASA star catalog data. Users can navigate through 100,000+ stars rendered in real-time, filter by constellation, stellar class, and magnitude. The engine supports zoom levels from naked-eye to deep-field telescope views, with smooth logarithmic transitions. Built using Three.js and custom GLSL shaders for atmospheric glow effects.",
    tech: ["Three.js", "WebGL", "GLSL", "React", "TypeScript"],
    tags: ["WebGL", "Data Viz", "3D"],
    icon: "✦",
    image:
      "https://images.unsplash.com/photo-1763227676675-36ba34c26545?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc3Ryb25vbXklMjBzdGFycyUyMHZpc3VhbGl6YXRpb24lMjBkYXJrfGVufDF8fHx8MTc3NjkzNTcyMnww&ixlib=rb-4.1.0&q=80&w=1080",
    features: [
      "Real-time 3D star rendering with 100k+ stars",
      "Custom GLSL atmospheric bloom shaders",
      "Constellation overlay with animated line drawing",
      "Deep-field zoom with logarithmic scaling",
      "Stellar data tooltip on hover with Wikipedia links",
    ],
    accentColor: "#4A3549",
  },
  {
    id: "cozy-notes",
    number: "02",
    title: "Cozy Notes",
    category: "Productivity App",
    year: "2024",
    shortDesc:
      "A warm, minimal markdown note-taking app with offline-first sync. Features a gentle color-coded tagging system and ambient sound modes for focus.",
    fullDesc:
      "Cozy Notes reimagines note-taking as a calming ritual rather than a chore. Built with a React frontend and SQLite via Tauri for native performance, it supports full CommonMark markdown, bi-directional links (like Obsidian), and a visual graph view of note connections. The ambient sound feature includes rain, forest, and cafe modes — generated via Web Audio API with procedural synthesis.",
    tech: ["React", "Tauri", "SQLite", "Web Audio API", "Rust"],
    tags: ["Desktop App", "Markdown", "Offline"],
    icon: "❋",
    image:
      "https://images.unsplash.com/photo-1654154117054-d774c3869a25?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtaW5pbWFsJTIwbm90ZSUyMHRha2luZyUyMGFwcCUyMGRlc2slMjBjb3p5fGVufDF8fHx8MTc3NjkzNTcyMnww&ixlib=rb-4.1.0&q=80&w=1080",
    features: [
      "Full CommonMark + GFM markdown rendering",
      "Bi-directional note links with graph visualization",
      "Offline-first with background sync",
      "Procedural ambient sound generation",
      "Color-coded nested tagging system",
    ],
    accentColor: "#5A4055",
  },
  {
    id: "bloom",
    number: "03",
    title: "Bloom Garden",
    category: "Generative Art",
    year: "2025",
    shortDesc:
      "A generative art tool that grows procedural botanical forms. Each \"seed\" you plant evolves into a unique organic structure using L-system algorithms.",
    fullDesc:
      "Bloom Garden is an interactive generative art experience where users plant digital seeds that grow into unique botanical structures. Each seed is a unique hash-derived genome encoding growth patterns, branching angles, color palettes, and seasonal behavior. The engine uses L-system recursion with stochastic rules to produce organic irregularity. Flowers bloom based on the time of day via the Geolocation API. Artworks can be exported as high-resolution SVG or WebP.",
    tech: ["Canvas API", "SVG", "L-Systems", "React", "Web Workers"],
    tags: ["Generative", "Art", "Canvas"],
    icon: "✿",
    image:
      "https://images.unsplash.com/photo-1652360033226-060781daaad4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhYnN0cmFjdCUyMGdlbmVyYXRpdmUlMjBmbG9yYWwlMjBhcnQlMjBkaWdpdGFsfGVufDF8fHx8MTc3NjkzNTcyMnww&ixlib=rb-4.1.0&q=80&w=1080",
    features: [
      "L-system plant growth with stochastic branching",
      "Hash-derived genome from wallet addresses",
      "Real-time blooming based on geolocation + time",
      "Web Worker offloading for smooth rendering",
      "SVG / hi-res WebP export",
    ],
    accentColor: "#614D60",
  },
  {
    id: "waveform",
    number: "04",
    title: "WaveForm Studio",
    category: "Creative Tool",
    year: "2025",
    shortDesc:
      "A browser-based music visualizer and audio workstation. Real-time FFT analysis drives a canvas-rendered particle system synced to the beat.",
    fullDesc:
      "WaveForm Studio brings professional-grade audio visualization to the browser using the Web Audio API's AnalyserNode. The particle engine renders up to 50,000 particles driven by real-time FFT spectral data — kick drums warp the center attractor, high frequencies scatter outer rings. Users can plug in any audio source: microphone input, file upload, or Spotify Web Playback. Custom shader-based motion blur is achieved via an off-screen canvas compositing technique.",
    tech: ["Web Audio API", "Canvas API", "TypeScript", "React", "Spotify SDK"],
    tags: ["Audio", "Canvas", "Real-time"],
    icon: "◈",
    image:
      "https://images.unsplash.com/photo-1738168505805-d3b28ad94f61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNpYyUyMHNvdW5kJTIwd2F2ZSUyMGF1ZGlvJTIwdmlzdWFsaXplcnxlbnwxfHx8fDE3NzY5MzU3MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080",
    features: [
      "Real-time 512-bin FFT audio analysis",
      "50k particle system driven by spectral data",
      "Microphone + file + Spotify input sources",
      "Off-screen canvas motion blur compositing",
      "BPM detection with beat-sync effects",
    ],
    accentColor: "#523D51",
  },
  {
    id: "pixelweaver",
    number: "05",
    title: "Pixel Weaver",
    category: "Creative Tool",
    year: "2025",
    shortDesc:
      "A feature-rich pixel art editor that runs entirely in the browser. Supports animation frames, palette management, and one-click sprite sheet export.",
    fullDesc:
      "Pixel Weaver is a zero-install, browser-native pixel art editor designed for game developers and digital artists. The drawing engine uses an integer-coordinate canvas with sub-pixel zoom interpolation for crisp rendering at any scale. It supports 256-frame animations with onion-skinning, a full RGBA palette manager with hex import, and sprite sheet packing with configurable gutter/padding. Files are stored in IndexedDB with automatic versioned history (up to 200 snapshots).",
    tech: ["Canvas API", "IndexedDB", "TypeScript", "React", "Vite"],
    tags: ["Editor", "Animation", "Game Dev"],
    icon: "⊞",
    image:
      "https://images.unsplash.com/photo-1763888450540-9b59abff803b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcmZ1bCUyMHBpeGVsJTIwYXJ0JTIwZ3JpZCUyMHJldHJvfGVufDF8fHx8MTc3NjkzNTcyMnww&ixlib=rb-4.1.0&q=80&w=1080",
    features: [
      "Integer-coordinate drawing engine with sub-pixel zoom",
      "256-frame animation with onion-skinning",
      "RGBA palette manager with hex import/export",
      "Sprite sheet packing with custom gutter/padding",
      "200-snapshot undo history via IndexedDB",
    ],
    accentColor: "#5C4558",
  },
];

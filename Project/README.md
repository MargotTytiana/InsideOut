
# InsideOut Portfolio

A polished React portfolio experience built with Vite, interactive page transitions, and a custom knowledge/notes project experience.

## Overview

This repository contains a portfolio-style web app showcasing a curated collection of interactive projects. It includes:

- A landing page with animated project cards and scroll-based visual presentation.
- A dynamic project detail page with rich content and feature highlights.
- A dedicated `Cozy Notes` experience that simulates a reading journal with split-pane interaction and knowledge graph visualization.
- A modern frontend stack using Vite, React, Motion, Radix UI primitives, and Tailwind tooling.

## Key Features

- **React Router-based navigation** for home, project detail pages, and the Cozy Notes experience.
- **Animated hero and section transitions** powered by `motion/react`.
- **Responsive layout** with adaptive paddings and fluid screen breakpoints.
- **Custom split-pane UI** inside `Cozy Notes` with resizable/ collapsible panels.
- **Data-driven content** from static modules in `src/app/data` for projects and book entries.
- **Modern UI utilities** using Radix components and utility libraries like `clsx`, `tailwind-merge`, and `lucide-react`.

## Project Structure

- `src/app/App.tsx` - application entry component wrapping the router.
- `src/app/routes.tsx` - route definitions for home, project details, and Cozy Notes.
- `src/app/pages/Home.tsx` - landing page with project cards and hero section.
- `src/app/pages/ProjectDetail.tsx` - individual project detail page.
- `src/app/pages/CozyNotes.tsx` - interactive reading journal experience.
- `src/app/components/` - shared UI components and layout primitives.
- `src/app/data/` - static project and book data used by page components.
- `src/app/styles/` - CSS and theme styles for the app.

## Tech Stack

- `vite` - fast development tooling
- `react` / `react-dom` - UI framework
- `react-router` - client-side routing
- `motion/react` - animation and motion transitions
- `@radix-ui/*` - accessible UI primitives
- `tailwindcss` + `@tailwindcss/vite` - utility-first styling workflow
- `lucide-react` - icon library
- `react-dnd`, `react-resizable-panels`, `react-responsive-masonry` - advanced interaction utilities

## Local Setup

1. Install dependencies:

```bash
npm install
npm install react@18.3.1 react-dom@18.3.1
```

> `react` and `react-dom` are listed as peer dependencies and should be installed separately before running.

2. Start the development server:

```bash
npm run dev
```

3. Open the local Vite URL shown in the terminal.

## Available Scripts

- `npm run dev` - starts the Vite development server
- `npm run build` - builds the production bundle

## Navigation

- `/` - Home page with featured project cards
- `/project/cozy-notes` - Cozy Notes interactive journaling page
- `/project/:id` - Dynamic detail page for each listed project

## Notes

- Project content is currently populated from static data files under `src/app/data`.
- `Cozy Notes` is a UI-focused experience with animated panel resizing and a knowledge graph overview.
- The design leverages inline styles and CSS modules alongside Tailwind tooling for rapid prototyping.

## Tips

- Update `src/app/data/projects.ts` to add or modify project entries.
- Add new routes in `src/app/routes.tsx` for additional pages.
- Use `src/app/components/` for reusable UI patterns and shared controls.

## Attribution

This repository is based on a high-end portfolio UI concept and adapts it into an interactive React experience.
  
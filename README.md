# ShakeSense Dashboard Prototype

A premium, interactive, dark-mode 3D dashboard prototype for **ShakeSense** — an edge-AI machine health monitoring system.

## Overview
This frontend prototype demonstrates the concept, visual direction, and interactive features of the ShakeSense platform. It is designed to act as a pitch deck, technical demo, and interactive prototype for hackathon judges, mentors, and early customers.

## Tech Stack
* **React** + **Vite**
* **Three.js** / **React Three Fiber** / **Drei** (For 3D machine visualizations)
* **Framer Motion** (For smooth UI transitions and micro-animations)
* **Vanilla CSS** (Custom CSS variables architecture, no generic frameworks used to ensure a unique premium feel)

## Running the Project Locally

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Open in Browser**
   The application will typically run at `http://localhost:5173`. Check your terminal for the exact URL.

## Configuration
All content (text, stats, roadmap phases, team members) is centralized in `src/data/siteConfig.js`. 
You can edit this file to update the website without needing to touch the React components.

## Development Principles Used
- **Offline First Visuals**: Shows the core Edge AI capability visually.
- **Performance**: Reduced particle counts, lazy-loading of the 3D scene, and CSS-based performance optimizations.
- **Storytelling**: Scroll-based cinematic flow from Problem → Solution → Interactive Dashboard.

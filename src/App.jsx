import { useState } from 'react';
import SplashScreen from './components/SplashScreen';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import ProblemSection from './sections/Problem';
import SolutionSection from './sections/Solution';
import HowItWorksSection from './sections/HowItWorks';
import ArchitectureDiagram from './sections/Architecture';
import MachineFingerprint from './sections/Fingerprint';
import LiveSimulation from './sections/LiveSimulation';
import TechnologySection from './sections/Technology';
import ApplicationsSection from './sections/Applications';
import RoadmapSection from './sections/Roadmap';
import ValidationSection from './sections/Validation';
import VisionFooterSection from './sections/VisionFooter';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <>
      {showSplash && <SplashScreen onComplete={() => setShowSplash(false)} />}
      
      {!showSplash && (
        <div className="app-container">
          <div className="atmosphere" aria-hidden="true" />
          <Navbar />
          
          <main>
            <Hero />
            <ProblemSection />
            <SolutionSection />
            <HowItWorksSection />
            <ArchitectureDiagram />
            <MachineFingerprint />
            <LiveSimulation />
            <TechnologySection />
            <ApplicationsSection />
            <RoadmapSection />
            <ValidationSection />
            <VisionFooterSection />
          </main>
        </div>
      )}
    </>
  );
}

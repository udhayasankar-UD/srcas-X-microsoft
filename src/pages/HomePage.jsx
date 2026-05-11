import React from 'react';
import HeroSection1 from '../components/hero/HeroSection1';
import HeroSection5 from '../components/hero/HeroSection5';
import AboutSection from '../components/sections/AboutSection';
import { PrizesSection } from '../components/sections/PrizesSection';
import ProblemStatements from '../components/problem-statements/ProblemStatements';
import GuidelinesSection from '../components/sections/GuidelinesSection';
import TimelineSection from '../components/sections/TimelineSection';
import InteractiveSection from '../components/sections/InteractiveSection';
// import FaqSection from '../components/sections/FaqSection';
// import ContactSection from '../components/sections/ContactSection';

function HomePage() {
  return (
    <main>
      <HeroSection1 />
      {/* <HeroSection5 /> */}
      
      {/* ── Rest of the page ── */}
      <AboutSection />
      <PrizesSection />
      <ProblemStatements />
      <GuidelinesSection />
      <TimelineSection />
      <InteractiveSection />
      {/* <FaqSection />
      <ContactSection /> */}
    </main>
  );
}

export default HomePage;

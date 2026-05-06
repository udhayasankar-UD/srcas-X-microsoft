import Navbar from './components/layout/Navbar';
import ScrollProgressUI from './components/ui/ScrollProgressUI';
import HeroSection1 from './components/hero/HeroSection1';
import HeroSection2 from './components/hero/HeroSection2';
import HeroSection3 from './components/hero/HeroSection3';
import HeroSection4 from './components/hero/HeroSection4';
import HeroSection5 from './components/hero/HeroSection5';
import HeroSection6 from './components/hero/HeroSection6';  
import DesignLabel from './components/ui/DesignLabel';
import AboutSection from './components/sections/AboutSection';
import { PrizesSection } from './components/sections/PrizesSection';
import ProblemStatements from './components/problem-statements/ProblemStatements';
import TimelineSection from './components/sections/TimelineSection';
import GuidelinesSection from './components/sections/GuidelinesSection';
import InteractiveSection from './components/sections/InteractiveSection';
import FaqSection from './components/sections/FaqSection';
import ContactSection from './components/sections/ContactSection';

function App() {
  return (
    <div className="app" style={{ minHeight: '100vh' }}>
      <ScrollProgressUI />
      <Navbar />
      <main>

        {/* ── Design 1 — Typewriter + Globe ── */}
        <DesignLabel number={1} total={4} />
        <HeroSection1 />

        {/* ── Design 2 — Gemini lines, white background ── */}
        <DesignLabel number={2} total={4} />
        <HeroSection2 />

        {/* ── Design 3 — Modern Premium ── */}
        {/* <DesignLabel number={3} total={4} />
        <HeroSection3 />

        {/* ── Design 4 — Editorial Split, White/Black/Blue ── 
        <DesignLabel number={4} total={5} />
        <HeroSection4 /> */}

        {/* ── Design 5 — MagnetLines Background ── */}
        <DesignLabel number={5} total={5} />
        <HeroSection5 />

        {/* ── Design 6 — MagnetLines Background ──
        <DesignLabel number={6} total={6} />
        <HeroSection6 /> */}



        {/* ── Rest of the page ── */}
        <AboutSection />
        <PrizesSection />
        <ProblemStatements />
        <GuidelinesSection />
        <TimelineSection />
        <InteractiveSection />
        <FaqSection />
        <ContactSection />

      </main>
    </div>
  );
}

export default App;

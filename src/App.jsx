import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProblemStatements from './components/problem statements/ProblemStatements';
import Ribbons from './components/Ribbons';

function App() {
  return (
    <div className="app" style={{ minHeight: '100vh' }}>
      <Ribbons 
        baseThickness={30} 
        colors={["#0078D4"]} 
        speedMultiplier={0.35} 
        baseSpring={0.02}
        baseFriction={0.92}
        maxAge={500} 
        enableFade={false} 
        enableShaderEffect={false} 
      />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProblemStatements />
      </main>
    </div>
  );
}

export default App;

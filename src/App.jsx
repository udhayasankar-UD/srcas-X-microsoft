import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ProblemStatements from './components/problem statements/ProblemStatements';
function App() {
  return (
    <div className="app" style={{ minHeight: '100vh' }}>
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

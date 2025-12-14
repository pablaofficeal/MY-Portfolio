import React, { useState } from 'react';
import Navbar from './components/Navbar';
import TerminalHero from './components/TerminalHero';
import SkillMatrix from './components/SkillMatrix';
import ProjectLog from './components/ProjectLog';
import SystemFooter from './components/SystemFooter';
import ManifestoTerminal from './components/ManifestoTerminal';

function App() {
  const [isSystemReady, setIsSystemReady] = useState(false);

  return (
    <div className="min-h-screen bg-mr-black text-mr-white font-mono selection:bg-mr-red selection:text-white overflow-x-hidden">
      
      {/* Navigation appears only after system boot */}
      <div className={`transition-opacity duration-1000 ${isSystemReady ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <Navbar />
      </div>
      
      <main className="relative z-10">
        {/* TerminalHero controls the boot sequence */}
        <TerminalHero onBootComplete={() => setIsSystemReady(true)} />
        
        {/* Main Content - Hidden until boot completes */}
        <div className={`transition-all duration-1000 delay-200 ${isSystemReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 hidden'}`}>
            {/* Manifesto Section as Terminal */}
            <ManifestoTerminal />

            <SkillMatrix />
            <ProjectLog />
        </div>
      </main>

      {/* Footer - Hidden until boot completes */}
      <div className={`transition-opacity duration-1000 delay-500 ${isSystemReady ? 'opacity-100' : 'opacity-0 hidden'}`}>
        <SystemFooter />
      </div>
    </div>
  );
}

export default App;
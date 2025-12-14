import React, { useState, useEffect, useRef } from 'react';

interface TerminalHeroProps {
  onBootComplete: () => void;
}

const TerminalHero: React.FC<TerminalHeroProps> = ({ onBootComplete }) => {
  const [fastfetchDisplay, setFastfetchDisplay] = useState('');
  const [introPhase, setIntroPhase] = useState(0); // 0: typing tree, 1: pause, 2: narrative typing, 3: done
  const [typedText, setTypedText] = useState('');
  
  // Constants
  const introText = "Привет, друг. Я ждал тебя.";
  
  // The full ASCII art string
  const fastFetchFull = `                  -\`                     pabla@archlinux
                 .o+\`                    ---------------
                \`ooo/                    OS: Arch Linux x86_64
               \`+oooo:                   Host: Vivobook_ASUSLaptop X1404ZA
              \`+oooooo:                  Kernel: Linux 6.17.9-arch1-1
              -+oooooo+:                 Uptime: 1 day, 8 hours, 38 mins
            \`/:-:++oooo+:                Packages: 1396 (pacman)
           \`/++++/+++++++:               Shell: fish 4.2.1
         \`/+++ooooooooooooo/\`            WM: Hyprland 0.52.2 (Wayland)
        ./ooosssso++osssssso+\`           Theme: Breeze-Dark [GTK2/3/4]
       .oossssso-\`\`\`\`/ossssss+\`          Icons: Papirus [GTK2/3/4]
      -osssssso.      :ssssssso.         Font: Noto Sans (10pt)
     :osssssss/        osssso+++.        Cursor: Oxygen_Black (32px)
    /ossssssss/        +ssssooo/-        Terminal: kitty 0.44.0
  \`/ossssso+/:-        -:/+osssso+-      CPU: ERROR NOT FOUND
 \`+sso+:-                 \`.-/+oso:     GPU: ERROR NOT FOUND
\`++:.                           \`-/+/    Memory: 10.11 GiB / 128.87 GiB
.\`                                 \`/    Disk (/): 30.38 GiB / 9000.40 GiB
`;

  // 1. Typewriter Effect for Arch Tree
  useEffect(() => {
    let charIndex = 0;
    // Speed of typing (characters per tick). Higher = faster.
    const charsPerTick = 4; 
    
    const timer = setInterval(() => {
      // Slice the string to simulate typing
      setFastfetchDisplay(fastFetchFull.slice(0, charIndex));
      charIndex += charsPerTick;

      if (charIndex > fastFetchFull.length) {
        setFastfetchDisplay(fastFetchFull);
        clearInterval(timer);
        // Phase 1 complete: Tree is drawn.
        setTimeout(() => {
            setIntroPhase(1); // Small pause
            onBootComplete(); // UNLOCK THE APP HERE
        }, 800); 
      }
    }, 5); // 5ms tick

    return () => clearInterval(timer);
  }, [fastFetchFull, onBootComplete]);

  // 2. Transition to Narrative
  useEffect(() => {
    if (introPhase === 1) {
        setTimeout(() => setIntroPhase(2), 500);
    }
  }, [introPhase]);

  // 3. Narrative Typing Logic ("Привет, друг...")
  useEffect(() => {
    if (introPhase === 2) {
      let i = 0;
      const timer = setInterval(() => {
        setTypedText(introText.slice(0, i + 1));
        i++;
        if (i > introText.length) {
          clearInterval(timer);
          setTimeout(() => setIntroPhase(3), 500);
        }
      }, 50);
      return () => clearInterval(timer);
    }
  }, [introPhase]);

  return (
    <div id="hero" className="min-h-screen pt-20 flex flex-col justify-center px-6 md:px-20 lg:px-40 font-mono relative overflow-hidden">
      
      <div className="w-full max-w-5xl mx-auto">
        
        {/* Fastfetch Output - This is the "Loader" */}
        <div className="mb-12">
            <div className="text-mr-green mb-2">
                <span className="text-mr-red">pabla@archlinux</span>
                <span className="text-mr-white"> ~&gt; </span> 
                fastfetch
            </div>
            
            {/* The ASCII Art Container */}
            <pre className="text-[10px] md:text-xs leading-[1.1] md:leading-snug text-mr-green/80 overflow-x-auto whitespace-pre font-mono selection:bg-mr-green selection:text-black min-h-[300px]">
                {fastfetchDisplay}
                {/* Blinking cursor at the end of typing */}
                {introPhase === 0 && <span className="inline-block w-2 h-4 bg-mr-green/80 animate-pulse align-middle ml-1"></span>}
            </pre>
        </div>

        {/* Narrative Section - Appears AFTER tree is done */}
        <div className={`transition-opacity duration-1000 ${introPhase >= 2 ? 'opacity-100' : 'opacity-0'}`}>
            <div className="text-lg md:text-xl text-mr-gray mb-6 h-8 flex items-center">
                <span className="text-mr-red mr-2">pabla@archlinux ~&gt;</span>
                <span>{introPhase === 2 ? typedText : introText}</span>
                {introPhase === 2 && <span className="w-2 h-5 bg-mr-red animate-cursor ml-1"></span>}
            </div>

            {introPhase >= 3 && (
                <div className="animate-fade-in space-y-6">
                    <h1 className="text-4xl md:text-7xl font-black text-mr-white leading-tight">
                        МЕНЯ ЗОВУТ <br/>
                        <span className="text-mr-black bg-mr-red px-2 inline-block mt-2">ПАВЛО</span>
                    </h1>

                    <div className="border-l-4 border-mr-white pl-6 py-2 max-w-3xl">
                        <h2 className="text-xl md:text-2xl text-mr-red font-bold mb-4">
                            &gt; Архитектор Бэкенда & Системный Разработчик
                        </h2>
                        <p className="text-mr-gray text-sm md:text-base leading-relaxed">
                            Full Stack разработчик с сильным уклоном в <strong>Python, Flask и системную архитектуру</strong>.
                            Я не просто пишу код. Я проектирую сложные системы, которые работают стабильно, 
                            пока остальные падают.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-4 text-xs font-mono pt-4">
                        <div className="border border-mr-gray px-3 py-1 text-mr-green">
                            ACCESS: GRANTED
                        </div>
                        <div className="border border-mr-gray px-3 py-1 text-mr-gray">
                            UPTIME: 99.9%
                        </div>
                    </div>
                </div>
            )}
        </div>

      </div>
    </div>
  );
};

export default TerminalHero;
import React, { useState, useEffect, useRef } from 'react';

const script = [
  {
    cmd: "sudo philosophy --mode=strict",
    output: (
      <span className="text-mr-white">
        Чистая архитектура. <span className="text-mr-gray">Минимум магии.</span>
      </span>
    )
  },
  {
    cmd: "sudo security --check",
    output: (
      <span className="text-mr-green">
        [SECURE] <span className="text-mr-white">Абсолютный контроль и безопасность.</span>
      </span>
    )
  },
  {
    cmd: "sudo cat /var/log/approach.txt",
    output: (
      <div className="flex flex-col gap-1 text-gray-400">
        <span> Я выбираю технологии осознанно.</span>
        <span> Если система падает — виноват архитектор.</span>
        <span> Мои системы не падают.</span>
      </div>
    )
  }
];

const ManifestoTerminal: React.FC = () => {
  const [lines, setLines] = useState<{ cmd: string; output: React.ReactNode }[]>([]);
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // If we've gone past the last line, stop typing
    if (currentLineIndex >= script.length) {
      setIsTyping(false);
      return;
    }

    const currentCmd = script[currentLineIndex].cmd;

    if (currentCharIndex < currentCmd.length) {
      const timeout = setTimeout(() => {
        setCurrentCharIndex((prev) => prev + 1);
      }, Math.random() * 50 + 30); // Random typing speed
      return () => clearTimeout(timeout);
    } else {
      // Command finished typing
      const timeout = setTimeout(() => {
        setLines((prev) => [
          ...prev,
          { cmd: currentCmd, output: script[currentLineIndex].output }
        ]);
        
        setCurrentLineIndex((prev) => prev + 1);
        setCurrentCharIndex(0);
      }, 500); // Delay before result appears and next line starts
      return () => clearTimeout(timeout);
    }
  }, [currentCharIndex, currentLineIndex]);

  return (
    <section className="py-20 px-6 md:px-20 lg:px-40 bg-mr-black border-y border-mr-gray/20">
      
      {/* Terminal Window Decoration */}
      <div className="max-w-4xl mx-auto font-mono text-sm md:text-base">
        <div className="bg-mr-gray/20 border border-mr-gray/50 rounded-t-sm p-2 flex items-center gap-2">
            <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="ml-4 text-xs text-mr-gray">root@archlinux: ~ (fish)</div>
        </div>

        {/* Terminal Body */}
        <div 
            ref={containerRef}
            className="bg-black border-x border-b border-mr-gray/50 p-6 min-h-[300px] text-sm md:text-base shadow-2xl shadow-mr-red/5"
        >
            <div className="text-mr-gray mb-4">FSOCIETY TERMINAL ACCESS V2.0</div>
            
            {/* Rendered History */}
            {lines.map((line, idx) => (
                <div key={idx} className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                        <span className="text-mr-green">pabla@archlinux</span>
                        <span className="text-mr-white">~&gt;</span>
                        <span className="text-mr-white">{line.cmd}</span>
                    </div>
                    <div className="pl-4 border-l-2 border-mr-gray/30">
                        {line.output}
                    </div>
                </div>
            ))}

            {/* Active Typing Line */}
            {isTyping && script[currentLineIndex] && (
                <div className="flex items-center gap-2">
                    <span className="text-mr-green">pabla@archlinux</span>
                    <span className="text-mr-white">~&gt;</span>
                    <span className="text-mr-white">
                        {script[currentLineIndex].cmd.substring(0, currentCharIndex)}
                        <span className="animate-cursor bg-mr-white w-2 h-4 inline-block align-middle ml-1"></span>
                    </span>
                </div>
            )}
            
            {/* Final Prompt */}
            {!isTyping && (
                <div className="flex items-center gap-2 mt-4 animate-pulse">
                    <span className="text-mr-green">pabla@archlinux</span>
                    <span className="text-mr-white">~&gt;</span>
                    <span className="w-2 h-4 bg-mr-white inline-block"></span>
                </div>
            )}
        </div>
      </div>
    </section>
  );
};

export default ManifestoTerminal;
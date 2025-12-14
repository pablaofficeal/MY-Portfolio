import React from 'react';
import { SkillCategory } from '../types';

const skills: SkillCategory[] = [
  {
    title: "/bin/backend",
    skills: ["Python", "Flask", "Go", "REST API", "High Load", "Microservices"]
  },
  {
    title: "/sys/kernel",
    skills: ["C", "C++", "Rust", "Assembler", "Memory Ops", "OS Dev"]
  },
  {
    title: "/var/www/html",
    skills: ["JavaScript", "TypeScript", "React", "Vue.js", "HTML/CSS"]
  },
  {
    title: "/etc/infrastructure",
    skills: ["Docker", "Linux (Arch/Ubuntu)", "CI/CD", "Git", "Bash"]
  },
  {
    title: "/usr/security",
    skills: ["Kali Linux", "API Security", "Auth", "Penetration Testing"]
  },
  {
    title: "/opt/polyglot",
    skills: ["Java", "Kotlin", "Ruby", "Swift", "Lua", "Matlab"]
  }
];

const SkillMatrix: React.FC = () => {
  return (
    <section id="skills" className="py-20 px-6 md:px-20 lg:px-40 bg-mr-black">
      <h2 className="text-3xl font-mono font-bold text-mr-white mb-12 border-b border-mr-gray pb-4">
        <span className="text-mr-red mr-4">root@pavlo:~#</span> 
        ls -la modules/
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border border-mr-gray">
        {skills.map((category, idx) => (
          <div 
            key={idx}
            className="group p-6 border border-mr-gray/30 hover:bg-mr-white hover:text-mr-black transition-all duration-0 cursor-crosshair relative"
          >
            {/* Mr Robot Style: Red corner on hover */}
            <div className="absolute top-0 right-0 w-0 h-0 border-t-[20px] border-r-[20px] border-t-transparent border-r-mr-red opacity-0 group-hover:opacity-100 transition-opacity"></div>

            <h3 className="font-mono text-lg font-bold mb-4 text-mr-red group-hover:text-mr-black">
                {category.title}
            </h3>
            
            <div className="flex flex-wrap gap-x-4 gap-y-2">
              {category.skills.map((skill, sIdx) => (
                <span 
                  key={sIdx} 
                  className="text-sm font-mono text-gray-500 group-hover:text-mr-black group-hover:font-bold"
                >
                  &gt; {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SkillMatrix;
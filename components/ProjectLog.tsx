import React from 'react';
import { Project } from '../types';

const projects: Project[] = [
  {
    title: "sound_rush.exe",
    description: "Крупный музыкальный проект (28 разработчиков). Backend Lead. Проектирование API, React Native интеграция.",
    tags: ["PYTHON", "FLASK", "LEAD"],
    status: "R-X"
  },
  {
    title: "nsr_stream_engine",
    description: "Движок видеостриминга с нуля. Решение проблем latency и нагрузок.",
    tags: ["GO", "VIDEO", "OPTIMIZATION"],
    status: "R--"
  },
  {
    title: "tg_bot_framework.lib",
    description: "Мини-фреймворк для Telegram ботов. Используется в e-commerce.",
    tags: ["TELEGRAM", "TOOLS"],
    status: "RWX"
  },
  {
    title: "kernel_module_c",
    description: "Разработка ядра ОС на C и загрузчика на Assembler. Изучение memory management.",
    tags: ["C", "ASM", "KERNEL"],
    status: "---"
  }
];

const ProjectLog: React.FC = () => {
  return (
    <section id="projects" className="py-20 px-6 md:px-20 lg:px-40">
      <h2 className="text-3xl font-mono font-bold text-mr-white mb-12 border-b border-mr-gray pb-4">
        <span className="text-mr-red mr-4">root@pavlo:~#</span> 
        cat projects.log
      </h2>

      <div className="space-y-2 font-mono text-sm md:text-base">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-4 text-mr-gray mb-4 px-4 uppercase text-xs tracking-wider">
            <div className="col-span-2 hidden md:block">PERMISSIONS</div>
            <div className="col-span-12 md:col-span-3">FILENAME</div>
            <div className="col-span-12 md:col-span-5">DESCRIPTION</div>
            <div className="col-span-12 md:col-span-2">TAGS</div>
        </div>

        {projects.map((project, idx) => (
          <div 
            key={idx}
            className="group grid grid-cols-12 gap-4 items-start p-4 hover:bg-mr-gray/10 border-l-2 border-transparent hover:border-mr-red transition-all"
          >
            <div className="col-span-2 hidden md:block text-mr-gray group-hover:text-mr-white">
                -rwx{project.status === "---" ? "------" : "r-xr-x"}
            </div>
            
            <div className="col-span-12 md:col-span-3 font-bold text-mr-white group-hover:text-mr-red">
                {project.title}
            </div>
            
            <div className="col-span-12 md:col-span-5 text-gray-400">
                {project.description}
            </div>
            
            <div className="col-span-12 md:col-span-2 flex flex-wrap gap-2">
                {project.tags.map((tag, i) => (
                    <span key={i} className="text-xs text-mr-green">
                        [{tag}]
                    </span>
                ))}
            </div>
          </div>
        ))}
        
        <div className="p-4 text-mr-gray animate-pulse">
            _
        </div>
      </div>
    </section>
  );
};

export default ProjectLog;
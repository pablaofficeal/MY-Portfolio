export interface Project {
  title: string;
  description: string;
  tags: string[];
  status?: string;
  icon?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface SectionProps {
  id: string;
  className?: string;
}
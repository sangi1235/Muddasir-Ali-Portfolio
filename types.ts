export interface Project {
  title: string;
  description: string;
  tags: string[];
  liveLink?: string;
  repoLink?: string;
  image: string;
}

export interface Experience {
  role: string;
  company?: string;
  duration: string;
  details: string[];
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string; // Lucide icon name
}

export interface ResumeData {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  instagram: string;
  github: string;
  profileSummary: string;
  skills: SkillCategory[];
  education: {
    degree: string;
    location: string;
    status: string;
  }[];
  projects: Project[];
  experience: Experience[];
  certifications: string[];
  languages: string[];
  careerObjective: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
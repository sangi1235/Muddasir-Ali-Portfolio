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

export interface Service {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  name: string;
  role: string;
  text: string;
  avatar: string;
}

export interface ResumeData {
  name: string;
  title: string;
  location: string;
  email: string;
  phone: string;
  instagram: string;
  github: string;
  avatarUrl: string; // New field for profile photo
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
  services: Service[];
  testimonials: Testimonial[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: number;
}
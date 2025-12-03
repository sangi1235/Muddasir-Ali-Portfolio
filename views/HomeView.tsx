import React, { useState, useEffect, useRef } from 'react';
import { 
  Github, Mail, Phone, Instagram, ExternalLink, Code2, Briefcase, GraduationCap, 
  User, Download, MapPin, Award, Globe, Sparkles, Terminal, Layers, 
  GitBranch, Monitor, Smartphone, Zap, FileText, MessageSquare, CheckCircle, Quote,
  Cpu, Send, ArrowUp, Linkedin, Filter
} from 'lucide-react';
import { RESUME_DATA } from '../constants';
import { ThemeToggle } from '../components/ThemeToggle';
import { Button } from '../components/Button';
import { ScrollReveal } from '../components/ScrollReveal';

interface HomeViewProps {
  onNavigate: (view: 'home' | 'resume' | 'about') => void;
  isDark: boolean;
  toggleTheme: () => void;
}

// Hook defined locally or imported
const useTypewriter = (text: string, speed: number = 50) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let i = 0;
    setDisplayText('');
    const timer = setInterval(() => {
      if (i < text.length) {
        setDisplayText((prev) => prev + text.charAt(i));
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);

  return displayText;
};

const HomeView: React.FC<HomeViewProps> = ({ onNavigate, isDark, toggleTheme }) => {
  const contactRef = useRef<HTMLDivElement>(null);
  const titles = ["Frontend Web Developer", "React & Tailwind Specialist", "UI/UX Enthusiast", "HTML/CSS Expert"];
  const [titleIndex, setTitleIndex] = useState(0);
  const typeWriterText = useTypewriter(titles[titleIndex]);

  // Contact Form State
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  // Scroll to Top State
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  // Copy to Clipboard State
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Project Filtering State
  const [activeCategory, setActiveCategory] = useState('All');
  
  // Extract unique categories from projects (simplify tags to categories)
  const categories = ['All', ...Array.from(new Set(RESUME_DATA.projects.flatMap(p => p.tags))).slice(0, 6)]; // Limit filter buttons

  const filteredProjects = activeCategory === 'All' 
    ? RESUME_DATA.projects 
    : RESUME_DATA.projects.filter(p => p.tags.includes(activeCategory));

  useEffect(() => {
    const timeout = setTimeout(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length);
    }, 4000); 
    return () => clearTimeout(timeout);
  }, [titleIndex]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setContactForm({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 1500);
  };

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(RESUME_DATA.email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const glassCard = "bg-white/70 dark:bg-slate-900/60 backdrop-blur-xl border border-white/40 dark:border-slate-700/50 shadow-xl rounded-3xl";
  const glassPanel = "bg-white/40 dark:bg-slate-900/40 backdrop-blur-md border border-white/30 dark:border-slate-700/30 rounded-2xl";

  const activityGraphUrl = isDark 
    ? "https://github-readme-activity-graph.vercel.app/graph?username=sangi1235&bg_color=00000000&color=e2e8f0&line=38bdf8&point=0ea5e9&area=true&hide_border=true"
    : "https://github-readme-activity-graph.vercel.app/graph?username=sangi1235&bg_color=00000000&color=1e293b&line=2563eb&point=3b82f6&area=true&hide_border=true";

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(RESUME_DATA.name)}&background=0D8ABC&color=fff&size=200`;
  };

  return (
    <>
      {/* Navigation */}
      <nav className={`sticky top-2 sm:top-4 z-40 mx-auto max-w-5xl px-2 sm:px-4 no-print`}>
        <div className={`${glassCard} px-4 sm:px-6 h-16 flex items-center justify-between`}>
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/50 shadow-lg transform hover:rotate-12 transition-transform">
              <img 
                src={RESUME_DATA.avatarUrl} 
                alt="MH" 
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            </div>
            <span className="hidden sm:block font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-600 dark:from-white dark:to-slate-400">
              {RESUME_DATA.name}
            </span>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavigate('about')}
              icon={<User size={16} />}
              className="hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
            >
              <span className="hidden sm:inline">About</span>
            </Button>
             <Button 
              variant="ghost" 
              size="sm"
              onClick={scrollToContact}
              icon={<Mail size={16} />}
              className="hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
            >
               <span className="hidden sm:inline">Contact</span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => onNavigate('resume')}
              icon={<Download size={18} />}
              className="hover:bg-slate-100/50 dark:hover:bg-slate-800/50"
            >
               <span className="hidden sm:inline">Resume</span>
            </Button>
            
            <div className="w-px h-6 bg-slate-200 dark:bg-slate-700 mx-1" />
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
          </div>
        </div>
      </nav>

      <main className="relative z-10 max-w-5xl mx-auto px-4 py-8 space-y-8 sm:space-y-12 pb-12">

        {/* Hero Section */}
        <ScrollReveal>
          <section className={`${glassCard} p-6 sm:p-12 overflow-hidden relative group`}>
            <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 pointer-events-none transition-transform duration-700 group-hover:scale-110 no-print hidden sm:block">
               <Terminal size={300} strokeWidth={0.5} />
            </div>
            
            <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
               <div className="relative group/avatar">
                 <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-purple-600 rounded-full blur opacity-40 group-hover/avatar:opacity-75 transition-opacity duration-500 no-print"></div>
                 <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-full p-1 bg-gradient-to-tr from-blue-500 via-purple-500 to-pink-500 shadow-2xl relative">
                   <img 
                     src={RESUME_DATA.avatarUrl} 
                     alt={`${RESUME_DATA.name} - Frontend Web Developer`} 
                     width="176"
                     height="176"
                     fetchPriority="high"
                     onError={handleImageError}
                     className="w-full h-full object-cover rounded-full border-4 border-white dark:border-slate-900 bg-white"
                   />
                 </div>
                 <div className="absolute bottom-2 right-2 px-3 py-1 bg-green-500 text-white text-xs font-bold rounded-full shadow-lg border-2 border-white dark:border-slate-900 flex items-center gap-1 no-print">
                   <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                   Open to Work
                 </div>
               </div>
               
               <div className="text-center md:text-left flex-1 space-y-4">
                  <div>
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-2">
                      {RESUME_DATA.name}
                    </h1>
                    <h2 className="text-lg sm:text-xl font-semibold text-slate-700 dark:text-slate-300">
                      Frontend Web Developer (HTML, JavaScript, Tailwind, React)
                    </h2>
                    <div className="h-8 sm:h-10 mt-1">
                      <p className="text-xl sm:text-2xl font-medium text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                        {typeWriterText}
                        <span className="animate-pulse text-slate-400">|</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4 text-sm text-slate-600 dark:text-slate-300 font-medium">
                    <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700">
                      <MapPin size={14} className="text-red-500" /> {RESUME_DATA.location}
                    </span>
                    <button 
                      onClick={copyToClipboard}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 hover:border-blue-500 transition-colors cursor-pointer group active:scale-95"
                      aria-label="Copy Email"
                    >
                      {copiedEmail ? <CheckCircle size={14} className="text-green-500" /> : <Mail size={14} className="text-blue-500 group-hover:scale-110 transition-transform" />}
                      {copiedEmail ? "Copied!" : RESUME_DATA.email}
                    </button>
                  </div>

                  <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2 no-print">
                    <a 
                      href={`https://${RESUME_DATA.github}`} 
                      target="_blank" 
                      rel="noreferrer" 
                      className="p-3 bg-slate-900 text-white rounded-xl hover:scale-110 hover:-translate-y-1 transition-all shadow-lg shadow-slate-900/20"
                      aria-label="GitHub Profile"
                    >
                      <Github size={20} />
                    </a>
                    <a 
                      href="#" 
                      target="_blank" 
                      rel="noreferrer" 
                      className="p-3 bg-gradient-to-tr from-purple-500 to-pink-600 text-white rounded-xl hover:scale-110 hover:-translate-y-1 transition-all shadow-lg shadow-pink-500/30"
                      aria-label="Instagram Profile"
                    >
                      <Instagram size={20} />
                    </a>
                    <a 
                      onClick={scrollToContact}
                      className="p-3 bg-green-500 text-white rounded-xl hover:scale-110 hover:-translate-y-1 transition-all shadow-lg shadow-green-500/30 cursor-pointer"
                      aria-label="Contact"
                    >
                      <MessageSquare size={20} />
                    </a>
                  </div>
               </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Profile Summary */}
        <ScrollReveal delay={100}>
          <section className={glassCard}>
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 bg-blue-100 dark:bg-blue-500/20 rounded-xl text-blue-600 dark:text-blue-400 no-print">
                  <Sparkles size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Profile Summary</h2>
              </div>
              <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                {RESUME_DATA.profileSummary}
              </p>
            </div>
          </section>
        </ScrollReveal>

        {/* Services Section */}
         <ScrollReveal delay={150}>
           <section className={glassCard}>
              <div className="p-6 md:p-8">
                 <div className="flex items-center gap-3 mb-8">
                   <div className="p-2.5 bg-indigo-100 dark:bg-indigo-500/20 rounded-xl text-indigo-600 dark:text-indigo-400 no-print">
                     <Briefcase size={24} />
                   </div>
                   <h2 className="text-2xl font-bold text-slate-900 dark:text-white">My Services</h2>
                 </div>
                 <div className="grid md:grid-cols-3 gap-6">
                    {RESUME_DATA.services.map((service, idx) => (
                       <div key={idx} className={`${glassPanel} p-6 group hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors`}>
                          <div className="mb-4 p-3 bg-white dark:bg-slate-900 rounded-xl w-fit shadow-md group-hover:scale-110 transition-transform">
                             {service.icon === 'Code2' && <Code2 className="text-blue-500" />}
                             {service.icon === 'Zap' && <Zap className="text-yellow-500" />}
                             {service.icon === 'Smartphone' && <Smartphone className="text-purple-500" />}
                          </div>
                          <h3 className="font-bold text-lg mb-2 text-slate-900 dark:text-white">{service.title}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                             {service.description}
                          </p>
                       </div>
                    ))}
                 </div>
              </div>
           </section>
         </ScrollReveal>

        {/* Tech Stack & Contributions */}
        <ScrollReveal delay={200}>
           <section className={glassCard}>
            <div className="p-6 md:p-8 overflow-hidden">
               <div className="flex items-center gap-3 mb-6">
                 <div className="p-2.5 bg-slate-100 dark:bg-slate-700 rounded-xl text-slate-700 dark:text-slate-300 no-print">
                   <Layers size={24} />
                 </div>
                 <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Tech Stack & Contributions</h2>
               </div>
               
               <div className="flex flex-col gap-8">
                 {/* Tech Stack Grid */}
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { icon: <Code2 className="text-blue-500" />, label: "React" },
                      { icon: <Monitor className="text-teal-500" />, label: "Tailwind CSS" },
                      { icon: <Globe className="text-orange-500" />, label: "HTML5" },
                      { icon: <Zap className="text-yellow-500" />, label: "JavaScript" },
                      { icon: <GitBranch className="text-red-500" />, label: "Git & GitHub" },
                      { icon: <Smartphone className="text-purple-500" />, label: "Responsive" },
                      { icon: <Terminal className="text-slate-500" />, label: "VS Code" },
                      { icon: <Cpu className="text-indigo-500" />, label: "UI/UX" }
                    ].map((tech, idx) => (
                      <div key={idx} className={`${glassPanel} p-4 flex items-center gap-3 hover:bg-white/60 dark:hover:bg-slate-800/60 transition-colors group cursor-default`}>
                        <div className="p-2 bg-white dark:bg-slate-900 rounded-lg shadow-sm group-hover:scale-110 transition-transform no-print">
                          {tech.icon}
                        </div>
                        <span className="font-semibold text-slate-700 dark:text-slate-200">{tech.label}</span>
                      </div>
                    ))}
                 </div>
                 
                 {/* Contribution Graph - Dynamic Theme */}
                 <div className="w-full flex flex-col items-center border-t border-slate-200 dark:border-slate-800 pt-8 no-print">
                    <div className="flex items-center gap-2 mb-4">
                      <Github size={18} className="text-slate-500" />
                      <h3 className="text-sm font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">GitHub Contributions</h3>
                    </div>
                    
                    <div className={`${glassPanel} p-2 sm:p-6 w-full overflow-x-auto flex justify-center bg-white/30 dark:bg-slate-800/30 scrollbar-thin`}>
                        <img
                            key={isDark ? 'dark' : 'light'} 
                            src={activityGraphUrl}
                            alt="GitHub Contribution Graph"
                            className="min-w-[600px] w-full max-w-4xl"
                            loading="lazy"
                            decoding="async"
                        />
                    </div>
                    <div className="mt-4">
                      <a 
                        href={`https://${RESUME_DATA.github}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                      >
                        View Full Profile <ExternalLink size={10} />
                      </a>
                    </div>
                 </div>
               </div>
            </div>
           </section>
        </ScrollReveal>

        {/* Skills */}
        <ScrollReveal delay={300}>
          <section className={glassCard}>
            <div className="p-6 md:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-purple-100 dark:bg-purple-500/20 rounded-xl text-purple-600 dark:text-purple-400 no-print">
                  <Code2 size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Technical Skills</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                {RESUME_DATA.skills.map((category, idx) => (
                  <div key={idx} className={`${glassPanel} p-5 hover:border-blue-400/50 transition-colors`}>
                    <h3 className="text-sm uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 mb-4 border-b border-slate-200 dark:border-slate-700 pb-2">
                      {category.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill, sIdx) => (
                        <span 
                          key={sIdx} 
                          className="px-3 py-1.5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-lg text-sm font-medium border border-slate-200 dark:border-slate-700 shadow-sm hover:scale-105 hover:bg-blue-50 dark:hover:bg-blue-900/30 transition-all cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </ScrollReveal>

        {/* Projects Section with Filtering */}
        <section className={`${glassCard} p-6 md:p-8 page-break`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-green-100 dark:bg-green-500/20 rounded-xl text-green-600 dark:text-green-400 no-print">
                <Globe size={24} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Featured Projects</h2>
            </div>
            
            {/* Project Filters */}
            <div className="flex flex-wrap gap-2 no-print">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 rounded-full text-sm font-semibold transition-all duration-300 ${
                    activeCategory === cat 
                      ? 'bg-blue-600 text-white shadow-md' 
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 min-h-[400px]">
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, idx) => (
                <ScrollReveal key={`${project.title}-${idx}`} delay={idx * 50}>
                  <div className={`group ${glassPanel} overflow-hidden hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 hover:-translate-y-2 flex flex-col h-full`}>
                    <div className="h-48 sm:h-52 overflow-hidden relative no-print">
                      <div className="absolute inset-0 bg-slate-200 dark:bg-slate-800 animate-pulse" />
                      <img 
                        src={project.image} 
                        alt={`${project.title} - ${project.description.slice(0, 50)}...`} 
                        width="600"
                        height="400"
                        loading="lazy"
                        decoding="async"
                        className="w-full h-full object-cover relative z-10 transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1"
                      />
                      {/* Overlay Gradient (Subtle) */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent z-20" />
                    </div>
                    
                    <div className="p-5 flex flex-col flex-1">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{project.title}</h3>
                      <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 leading-relaxed flex-1">
                        {project.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {project.tags.map((tag, tIdx) => (
                          <span key={tIdx} className="text-[10px] uppercase tracking-wider font-bold px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded border border-slate-200 dark:border-slate-700">
                            {tag}
                          </span>
                        ))}
                      </div>
                      
                      <div className="mt-auto flex gap-3 pt-2 border-t border-slate-200 dark:border-slate-700/50">
                        {project.liveLink && project.liveLink !== '#' && (
                          <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-3 py-2.5 rounded-lg flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-95">
                            <ExternalLink size={14} /> Live Demo
                          </a>
                        )}
                        {project.repoLink && project.repoLink !== '#' && (
                          <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="flex-1 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-900 dark:text-white text-xs font-bold px-3 py-2.5 rounded-lg flex items-center justify-center gap-1.5 shadow-md border border-slate-200 dark:border-slate-700 transition-all active:scale-95">
                            <Github size={14} /> Code
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              ))
            ) : (
              <div className="col-span-2 flex flex-col items-center justify-center py-20 text-slate-500">
                <Filter size={48} className="mb-4 opacity-50" />
                <p>No projects found for "{activeCategory}"</p>
                <button 
                  onClick={() => setActiveCategory('All')} 
                  className="mt-2 text-blue-600 font-bold hover:underline"
                >
                  Clear Filters
                </button>
              </div>
            )}
          </div>
        </section>

        {/* Experience & Education Grid */}
        <div className="grid md:grid-cols-2 gap-8 page-break">
          
          {/* Experience */}
          <ScrollReveal delay={100}>
            <section className={`${glassCard} p-6 md:p-8 h-full`}>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-orange-100 dark:bg-orange-500/20 rounded-xl text-orange-600 dark:text-orange-400 no-print">
                  <Briefcase size={24} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Experience</h2>
              </div>
              <div className="space-y-8">
                {RESUME_DATA.experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-8 before:absolute before:left-[11px] before:top-2 before:bottom-0 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-700/50 last:before:hidden">
                    <div className="absolute left-0 top-1.5 w-6 h-6 bg-white dark:bg-slate-800 border-4 border-blue-500 rounded-full z-10 shadow-lg shadow-blue-500/20 no-print"></div>
                    <div>
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">{exp.role}</h3>
                      <span className="text-sm font-medium text-blue-600 dark:text-blue-400 block mb-3 bg-blue-50 dark:bg-blue-900/20 w-fit px-2 py-0.5 rounded mt-1">{exp.duration}</span>
                      <ul className="space-y-2 text-slate-600 dark:text-slate-300 text-sm">
                        {exp.details.map((detail, dIdx) => (
                          <li key={dIdx} className="flex items-start gap-2">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600 flex-shrink-0" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </ScrollReveal>

          {/* Education & Certs */}
          <div className="space-y-8">
            <ScrollReveal delay={200}>
              <section className={`${glassCard} p-6 md:p-8`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-red-100 dark:bg-red-500/20 rounded-xl text-red-600 dark:text-red-400 no-print">
                    <GraduationCap size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Education</h2>
                </div>
                <div className="space-y-6">
                  {RESUME_DATA.education.map((edu, idx) => (
                    <div key={idx} className={`${glassPanel} p-4 flex items-center justify-between hover:scale-[1.02] transition-transform`}>
                      <div>
                        <h3 className="font-bold text-slate-900 dark:text-white">{edu.degree}</h3>
                        <div className="text-slate-500 dark:text-slate-400 text-sm flex items-center gap-1 mt-1">
                          <MapPin size={12} className="no-print" /> {edu.location}
                        </div>
                      </div>
                      <span className="px-3 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs font-bold rounded-full border border-yellow-200 dark:border-yellow-700">
                        {edu.status}
                      </span>
                    </div>
                  ))}
                </div>
              </section>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <section className={`${glassCard} p-6 md:p-8`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-teal-100 dark:bg-teal-500/20 rounded-xl text-teal-600 dark:text-teal-400 no-print">
                    <Award size={24} />
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Certifications</h2>
                </div>
                <ul className="space-y-3">
                  {RESUME_DATA.certifications.map((cert, idx) => (
                    <li key={idx} className="flex items-center gap-3 text-slate-700 dark:text-slate-300 bg-white/50 dark:bg-slate-800/50 p-3 rounded-lg border border-slate-100 dark:border-slate-700 hover:bg-white dark:hover:bg-slate-800 transition-colors">
                      <div className="w-2 h-2 bg-teal-500 rounded-full shadow-[0_0_8px_rgba(20,184,166,0.5)] no-print"></div>
                      {cert}
                    </li>
                  ))}
                </ul>
              </section>
            </ScrollReveal>
          </div>
        </div>

        {/* Testimonials */}
         <ScrollReveal delay={150}>
           <section className={glassCard}>
              <div className="p-6 md:p-8">
                 <div className="flex items-center gap-3 mb-8">
                   <div className="p-2.5 bg-pink-100 dark:bg-pink-500/20 rounded-xl text-pink-600 dark:text-pink-400 no-print">
                     <Quote size={24} />
                   </div>
                   <h2 className="text-2xl font-bold text-slate-900 dark:text-white">What Clients Say</h2>
                 </div>
                 <div className="grid md:grid-cols-2 gap-6">
                    {RESUME_DATA.testimonials.map((t, idx) => (
                       <div key={idx} className={`${glassPanel} p-6 relative`}>
                          <Quote size={40} className="absolute top-4 right-4 text-slate-200 dark:text-slate-700 -z-10" />
                          <p className="text-slate-600 dark:text-slate-300 italic mb-6">"{t.text}"</p>
                          <div className="flex items-center gap-3">
                             <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full border border-slate-200 dark:border-slate-600" />
                             <div>
                                <h4 className="font-bold text-slate-900 dark:text-white text-sm">{t.name}</h4>
                                <span className="text-xs text-slate-500 dark:text-slate-400">{t.role}</span>
                             </div>
                          </div>
                       </div>
                    ))}
                 </div>
              </div>
           </section>
         </ScrollReveal>

        {/* Contact Form Section */}
        <ScrollReveal delay={200}>
           <section ref={contactRef} className={glassCard}>
              <div className="grid md:grid-cols-2">
                 <div className="p-6 sm:p-8 bg-gradient-to-br from-blue-600 to-indigo-700 text-white flex flex-col justify-between rounded-t-3xl md:rounded-l-3xl md:rounded-tr-none">
                    <div>
                       <h2 className="text-3xl font-bold mb-4">Let's work together!</h2>
                       <p className="text-blue-100 mb-8">
                          Have a project in mind? Fill out the form or send me an email. I'm open to freelance opportunities.
                       </p>
                       <div className="space-y-4">
                          <button 
                             onClick={copyToClipboard}
                             className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors w-full text-left"
                          >
                             {copiedEmail ? <CheckCircle size={20} className="text-green-300" /> : <Mail size={20} />}
                             <span>{copiedEmail ? "Email Copied!" : RESUME_DATA.email}</span>
                          </button>
                          <a href={`tel:${RESUME_DATA.phone}`} className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                             <Phone size={20} />
                             <span>{RESUME_DATA.phone}</span>
                          </a>
                          <div className="flex items-center gap-3 p-3 bg-white/10 rounded-xl">
                             <MapPin size={20} />
                             <span>{RESUME_DATA.location}</span>
                          </div>
                       </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-white/20">
                       <p className="text-sm text-blue-200">
                          "Creativity is intelligence having fun."
                       </p>
                    </div>
                 </div>
                 
                 <div className="p-6 sm:p-8">
                    {isSubmitted ? (
                       <div className="h-full flex flex-col items-center justify-center text-center animate-in fade-in zoom-in duration-500">
                          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                             <CheckCircle size={32} />
                          </div>
                          <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Sent!</h3>
                          <p className="text-slate-600 dark:text-slate-400">Thanks for reaching out, {contactForm.name}. I'll get back to you soon.</p>
                       </div>
                    ) : (
                       <form onSubmit={handleContactSubmit} className="space-y-4">
                          <div>
                             <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Name</label>
                             <input 
                               type="text" 
                               required
                               value={contactForm.name}
                               onChange={e => setContactForm({...contactForm, name: e.target.value})}
                               className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                               placeholder="Your Name"
                             />
                          </div>
                          <div>
                             <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Email</label>
                             <input 
                               type="email" 
                               required
                               value={contactForm.email}
                               onChange={e => setContactForm({...contactForm, email: e.target.value})}
                               className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                               placeholder="john@example.com"
                             />
                          </div>
                          <div>
                             <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">Message</label>
                             <textarea 
                               required
                               rows={4}
                               value={contactForm.message}
                               onChange={e => setContactForm({...contactForm, message: e.target.value})}
                               className="w-full px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all resize-none"
                               placeholder="Tell me about your project..."
                             />
                          </div>
                          <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting} icon={<Send size={18} />}>
                             Send Message
                          </Button>
                       </form>
                    )}
                 </div>
              </div>
           </section>
        </ScrollReveal>

        {/* CV Download Section */}
        <ScrollReveal>
          <section className={`${glassCard} p-8 text-center no-print download-section`}>
             <div className="flex flex-col items-center justify-center space-y-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                   <FileText size={32} />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Resume & Details</h2>
                <p className="text-slate-600 dark:text-slate-300 max-w-lg mx-auto">
                   Download my detailed CV to view my complete work history, technical skills, and project contributions in a professional format.
                </p>
                <Button onClick={() => onNavigate('resume')} size="lg" className="mt-2" icon={<Download size={18} />}>
                   Download PDF Resume
                </Button>
             </div>
          </section>
        </ScrollReveal>

      </main>
      
      {/* Professional Footer */}
      <footer className="relative z-10 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border-t border-slate-200 dark:border-slate-800 mt-12 py-12 no-print">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
             {/* Brand */}
             <div className="space-y-4">
                <div className="flex items-center gap-2">
                   <div className="w-8 h-8 rounded-lg overflow-hidden flex items-center justify-center text-white font-bold text-sm shadow-md">
                     <img 
                       src={RESUME_DATA.avatarUrl} 
                       alt="MH" 
                       className="w-full h-full object-cover"
                       onError={handleImageError}
                     />
                   </div>
                   <span className="font-bold text-lg text-slate-800 dark:text-white">Muddasir Hussain</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed max-w-xs">
                   Building high-performance, accessible, and beautiful web experiences. Open for freelance opportunities.
                </p>
             </div>
             
             {/* Quick Links */}
             <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Quick Links</h3>
                <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                   <li><button onClick={() => onNavigate('home')} className="hover:text-blue-500 transition-colors">Home</button></li>
                   <li><button onClick={() => onNavigate('about')} className="hover:text-blue-500 transition-colors">About Me</button></li>
                   <li><button onClick={() => onNavigate('resume')} className="hover:text-blue-500 transition-colors">Resume</button></li>
                   <li><button onClick={scrollToContact} className="hover:text-blue-500 transition-colors">Contact</button></li>
                </ul>
             </div>
             
             {/* Socials */}
             <div>
                <h3 className="font-bold text-slate-900 dark:text-white mb-4">Connect</h3>
                <div className="flex gap-4">
                   <a 
                      href={`https://${RESUME_DATA.github}`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                   >
                      <Github size={20} />
                   </a>
                   <a 
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                   >
                      <Linkedin size={20} />
                   </a>
                   <a 
                      href="#"
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                   >
                      <Instagram size={20} />
                   </a>
                </div>
             </div>
          </div>
          
          <div className="border-t border-slate-200 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
             <div className="text-sm text-slate-500 dark:text-slate-500">
                &copy; {new Date().getFullYear()} Muddasir Hussain. All rights reserved.
             </div>
             <div className="flex gap-6 text-sm text-slate-500 dark:text-slate-500">
                <span>Made with React & Tailwind</span>
             </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-24 right-6 z-40 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110 no-print sm:bottom-6 sm:right-24"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}
    </>
  );
};

export default HomeView;
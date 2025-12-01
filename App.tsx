import React, { useState, useEffect, Suspense, lazy } from 'react';
import { 
  Github, 
  Mail, 
  Phone, 
  Instagram, 
  ExternalLink, 
  Code2, 
  Briefcase, 
  GraduationCap, 
  User,
  Download,
  MapPin,
  Award,
  Globe
} from 'lucide-react';
import { RESUME_DATA } from './constants';
import { ThemeToggle } from './components/ThemeToggle';
import { Button } from './components/Button';

// Lazy load the ChatWidget to reduce initial bundle size and defer loading the GenAI SDK
const ChatWidget = lazy(() => import('./components/ChatWidget').then(module => ({ default: module.ChatWidget })));

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);

  // Initialize theme based on preference
  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }
  }, []);

  // Update DOM when theme changes
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(!isDark);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300 pb-20">
      
      {/* Navigation / Header */}
      <nav className="sticky top-0 z-40 w-full backdrop-blur-lg bg-white/70 dark:bg-slate-900/70 border-b border-gray-200 dark:border-slate-800 no-print">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0 font-bold text-xl text-blue-600 dark:text-blue-400">
              MA<span className="text-gray-900 dark:text-white">.</span>
            </div>
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handlePrint} 
                icon={<Download size={16} />}
                className="hidden sm:inline-flex"
              >
                Download PDF
              </Button>
              <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">

        {/* Hero Section */}
        <section className="bg-white dark:bg-slate-800 rounded-3xl p-8 sm:p-12 shadow-xl shadow-gray-200/50 dark:shadow-none border border-white dark:border-slate-700 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
             <Code2 size={200} />
          </div>
          
          <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start">
             <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-600 p-1 flex-shrink-0">
               <img 
                 src="https://picsum.photos/400/400?grayscale" 
                 alt="Muddasir Ali" 
                 width="160"
                 height="160"
                 fetchPriority="high"
                 className="w-full h-full object-cover rounded-full border-4 border-white dark:border-slate-800"
               />
             </div>
             
             <div className="text-center md:text-left space-y-4 flex-1">
                <div>
                  <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                    {RESUME_DATA.name}
                  </h1>
                  <p className="text-xl sm:text-2xl text-blue-600 dark:text-blue-400 font-medium mt-2">
                    {RESUME_DATA.title}
                  </p>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-1">
                    <MapPin size={16} /> {RESUME_DATA.location}
                  </span>
                  <a href={`mailto:${RESUME_DATA.email}`} className="flex items-center gap-1 hover:text-blue-500 transition-colors">
                    <Mail size={16} /> {RESUME_DATA.email}
                  </a>
                  <span className="flex items-center gap-1">
                    <Phone size={16} /> {RESUME_DATA.phone}
                  </span>
                </div>

                <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-2">
                  <a href={`https://${RESUME_DATA.github}`} target="_blank" rel="noreferrer" className="p-2 bg-gray-100 dark:bg-slate-700 rounded-lg hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors text-gray-700 dark:text-gray-200">
                    <Github size={20} />
                  </a>
                  <a href="#" target="_blank" rel="noreferrer" className="p-2 bg-pink-100 dark:bg-pink-900/30 rounded-lg hover:bg-pink-200 dark:hover:bg-pink-900/50 transition-colors text-pink-600 dark:text-pink-400">
                    <Instagram size={20} />
                  </a>
                </div>
             </div>
          </div>
        </section>

        {/* Profile Summary */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
              <User size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Profile Summary</h2>
          </div>
          <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
            <p className="text-lg leading-relaxed text-gray-600 dark:text-gray-300">
              {RESUME_DATA.profileSummary}
            </p>
          </div>
        </section>

        {/* Skills */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg text-purple-600 dark:text-purple-400">
              <Code2 size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Skills</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {RESUME_DATA.skills.map((category, idx) => (
              <div key={idx} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">{category.title}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, sIdx) => (
                    <span 
                      key={sIdx} 
                      className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-full text-sm font-medium border border-gray-200 dark:border-slate-600"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="page-break">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg text-green-600 dark:text-green-400">
              <Globe size={24} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Projects</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {RESUME_DATA.projects.map((project, idx) => (
              <div key={idx} className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-slate-700 shadow-sm hover:shadow-lg hover:border-blue-500/30 transition-all duration-300">
                <div className="h-48 overflow-hidden relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    width="600"
                    height="400"
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                     <div className="flex gap-2">
                       {project.liveLink && project.liveLink !== '#' && (
                         <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="bg-white text-gray-900 text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-blue-50">
                           Live <ExternalLink size={12} />
                         </a>
                       )}
                       {project.repoLink && project.repoLink !== '#' && (
                         <a href={project.repoLink} target="_blank" rel="noopener noreferrer" className="bg-gray-900 text-white text-xs font-bold px-3 py-1.5 rounded-md flex items-center gap-1 hover:bg-gray-800">
                           Code <Github size={12} />
                         </a>
                       )}
                     </div>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{project.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="text-xs px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded border border-blue-100 dark:border-blue-800">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience & Education Grid */}
        <div className="grid md:grid-cols-2 gap-8 page-break">
          
          {/* Experience */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 rounded-lg text-orange-600 dark:text-orange-400">
                <Briefcase size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Experience</h2>
            </div>
            <div className="space-y-6">
              {RESUME_DATA.experience.map((exp, idx) => (
                <div key={idx} className="relative pl-8 before:absolute before:left-3 before:top-2 before:bottom-0 before:w-0.5 before:bg-gray-200 dark:before:bg-slate-700">
                   <div className="absolute left-0 top-2 w-6 h-6 bg-white dark:bg-slate-800 border-4 border-blue-500 rounded-full z-10"></div>
                   <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
                     <h3 className="text-lg font-bold text-gray-900 dark:text-white">{exp.role}</h3>
                     <span className="text-sm font-medium text-blue-600 dark:text-blue-400 block mb-2">{exp.duration}</span>
                     <ul className="list-disc list-inside space-y-1 text-gray-600 dark:text-gray-300 text-sm">
                       {exp.details.map((detail, dIdx) => (
                         <li key={dIdx}>{detail}</li>
                       ))}
                     </ul>
                   </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg text-red-600 dark:text-red-400">
                <GraduationCap size={24} />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Education</h2>
            </div>
            <div className="space-y-6">
              {RESUME_DATA.education.map((edu, idx) => (
                <div key={idx} className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white">{edu.degree}</h3>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-1">
                      <MapPin size={14} /> {edu.location}
                    </span>
                    <span className="px-2 py-1 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 text-xs font-bold rounded-full">
                      {edu.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Certifications */}
            <div className="mt-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg text-teal-600 dark:text-teal-400">
                  <Award size={24} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Certifications</h2>
              </div>
              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-gray-100 dark:border-slate-700 shadow-sm">
                <ul className="space-y-2">
                  {RESUME_DATA.certifications.map((cert, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <div className="w-1.5 h-1.5 bg-teal-500 rounded-full"></div>
                      {cert}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* Footer / Objective */}
        <section className="text-center pt-8 border-t border-gray-200 dark:border-slate-800">
          <p className="text-lg font-medium text-gray-700 dark:text-gray-200 mb-6 italic max-w-2xl mx-auto">
            "{RESUME_DATA.careerObjective}"
          </p>
          
          <div className="flex flex-col items-center gap-4">
            <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Languages</h3>
            <div className="flex gap-4">
              {RESUME_DATA.languages.map((lang, idx) => (
                <span key={idx} className="px-4 py-1 border border-gray-300 dark:border-slate-700 rounded-full text-gray-600 dark:text-gray-400 text-sm">
                  {lang}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-12 text-sm text-gray-400">
            &copy; {new Date().getFullYear()} {RESUME_DATA.name}. All rights reserved.
          </div>
        </section>

      </main>

      {/* AI Chat Widget */}
      <Suspense fallback={null}>
        <ChatWidget />
      </Suspense>
    </div>
  );
};

export default App;
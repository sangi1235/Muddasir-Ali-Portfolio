import React from 'react';
import { ArrowLeft, User, Target, Code2, Heart, Coffee, Mail } from 'lucide-react';
import { RESUME_DATA } from '../constants';
import { Button } from '../components/Button';
import { ScrollReveal } from '../components/ScrollReveal';

interface AboutViewProps {
  onClose: () => void;
}

const AboutView: React.FC<AboutViewProps> = ({ onClose }) => {
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(RESUME_DATA.name)}&background=0D8ABC&color=fff&size=200`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans">
      {/* Background Ambience */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-400/10 dark:bg-green-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-400/10 dark:bg-blue-600/10 rounded-full blur-[120px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 p-4 sm:p-6 flex justify-between items-center max-w-5xl mx-auto">
         <div className="font-bold text-lg sm:text-xl flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg overflow-hidden border border-white/50 shadow-lg">
              <img 
                src={RESUME_DATA.avatarUrl} 
                alt="MH" 
                className="w-full h-full object-cover" 
                onError={handleImageError}
              />
            </div>
            About Me
         </div>
         <Button onClick={onClose} variant="secondary" icon={<ArrowLeft size={16} />}>
           Home
         </Button>
      </nav>

      <main className="relative z-10 max-w-4xl mx-auto px-4 py-8 pb-20">
         <ScrollReveal>
           <header className="text-center mb-12 sm:mb-16">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400">
                Crafting Digital Experiences
              </h1>
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                I'm {RESUME_DATA.name}, a passionate developer turning complex problems into beautiful, intuitive interfaces.
              </p>
           </header>
         </ScrollReveal>

         <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
            <ScrollReveal delay={100}>
               <div className="space-y-6 sm:space-y-8">
                  <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-white/20 dark:border-slate-700 p-6 sm:p-8 rounded-3xl shadow-xl">
                     <div className="flex items-center gap-3 mb-4 text-blue-600 dark:text-blue-400">
                        <User size={24} />
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">Who I Am</h2>
                     </div>
                     <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-4 text-sm sm:text-base">
                        {RESUME_DATA.profileSummary}
                     </p>
                     <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                        My journey in web development is driven by a curiosity for how things work and a desire to build tools that make life easier. I specialize in the React ecosystem and modern CSS frameworks, ensuring every pixel serves a purpose.
                     </p>
                  </div>

                  <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-white/20 dark:border-slate-700 p-6 sm:p-8 rounded-3xl shadow-xl">
                     <div className="flex items-center gap-3 mb-4 text-purple-600 dark:text-purple-400">
                        <Target size={24} />
                        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">My Mission</h2>
                     </div>
                     <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                        "{RESUME_DATA.careerObjective}"
                     </p>
                  </div>
               </div>
            </ScrollReveal>

            <div className="space-y-6 sm:space-y-8">
               <ScrollReveal delay={200}>
                  <div className="relative group rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 aspect-video md:aspect-auto md:h-64">
                     <img 
                       src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800" 
                       alt="Workspace"
                       loading="lazy" 
                       className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                     />
                     <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent flex items-end p-6">
                        <div className="text-white">
                           <h3 className="font-bold text-lg">Always Learning</h3>
                           <p className="text-sm opacity-90">Keeping up with the latest in Tech</p>
                        </div>
                     </div>
                  </div>
               </ScrollReveal>

               <ScrollReveal delay={300}>
                  <div className="bg-white/50 dark:bg-slate-800/50 backdrop-blur-xl border border-white/20 dark:border-slate-700 p-6 sm:p-8 rounded-3xl shadow-xl">
                     <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white">What Drives Me</h3>
                     <div className="space-y-4">
                        <div className="flex items-start gap-4">
                           <div className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg">
                              <Code2 size={20} />
                           </div>
                           <div>
                              <h4 className="font-bold text-slate-800 dark:text-slate-200">Clean Code</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400">Writing maintainable, scalable, and readable software.</p>
                           </div>
                        </div>
                        <div className="flex items-start gap-4">
                           <div className="p-2 bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400 rounded-lg">
                              <Heart size={20} />
                           </div>
                           <div>
                              <h4 className="font-bold text-slate-800 dark:text-slate-200">User Experience</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400">Crafting interfaces that are delightful and accessible.</p>
                           </div>
                        </div>
                        <div className="flex items-start gap-4">
                           <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400 rounded-lg">
                              <Coffee size={20} />
                           </div>
                           <div>
                              <h4 className="font-bold text-slate-800 dark:text-slate-200">Problem Solving</h4>
                              <p className="text-sm text-slate-600 dark:text-slate-400">Turning challenges into opportunities for innovation.</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </ScrollReveal>
            </div>
         </div>

         <ScrollReveal delay={400}>
            <div className="mt-16 text-center">
               <h3 className="text-2xl font-bold mb-6">Let's build something amazing together</h3>
               <div className="flex flex-col sm:flex-row justify-center gap-4">
                  <a href={`mailto:${RESUME_DATA.email}`} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30 flex items-center justify-center gap-2">
                     <Mail size={18} /> Contact Me
                  </a>
                  <Button onClick={onClose} variant="outline">
                     View Projects
                  </Button>
               </div>
            </div>
         </ScrollReveal>
      </main>
    </div>
  );
};

export default AboutView;
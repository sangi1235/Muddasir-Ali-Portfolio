import React, { useState, useEffect, Suspense, lazy } from 'react';
import { LoadingScreen } from './components/LoadingScreen';

// Lazy load Views for Code Splitting & Performance
const HomeView = lazy(() => import('./views/HomeView'));
const ResumeView = lazy(() => import('./views/ResumeView'));
const AboutView = lazy(() => import('./views/AboutView'));
const ChatWidget = lazy(() => import('./components/ChatWidget').then(module => ({ default: module.ChatWidget })));

type ViewState = 'home' | 'resume' | 'about';

const App: React.FC = () => {
  const [isDark, setIsDark] = useState(false);
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setIsDark(true);
    }
  }, []);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  // Scroll to top whenever the view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  // Scroll Progress Listener
  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll));
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => setIsDark(!isDark);

  return (
    <div className="portfolio-app min-h-screen transition-colors duration-300 relative overflow-x-hidden font-sans text-slate-800 dark:text-slate-100 selection:bg-blue-500/30">
      
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 h-1 z-[100] bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-150 ease-out no-print" style={{ width: `${scrollProgress * 100}%` }} />

      {/* Ambient Background Gradients */}
      <div className="fixed inset-0 z-0 pointer-events-none no-print">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 dark:bg-blue-600/10 blur-[100px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400/20 dark:bg-purple-600/10 blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-[40%] left-[30%] w-[30%] h-[30%] rounded-full bg-pink-400/20 dark:bg-pink-600/10 blur-[100px] animate-pulse delay-700" />
      </div>

      <Suspense fallback={<LoadingScreen />}>
        {currentView === 'home' && (
          <HomeView onNavigate={setCurrentView} isDark={isDark} toggleTheme={toggleTheme} />
        )}
        {currentView === 'resume' && (
          <ResumeView onClose={() => setCurrentView('home')} />
        )}
        {currentView === 'about' && (
          <AboutView onClose={() => setCurrentView('home')} />
        )}
        
        {/* Chat Widget persists on Home and About, hidden on Resume via CSS/Logic */}
        {currentView !== 'resume' && <ChatWidget />}
      </Suspense>
    </div>
  );
};

export default App;
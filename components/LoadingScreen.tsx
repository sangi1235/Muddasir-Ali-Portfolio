import React from 'react';
import { Loader2 } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-gray-50/80 dark:bg-slate-900/80 backdrop-blur-xl flex items-center justify-center z-50 transition-all duration-500">
      <div className="flex flex-col items-center gap-6 p-8 rounded-3xl bg-white/50 dark:bg-slate-800/50 border border-white/20 shadow-2xl">
        <div className="relative">
          <div className="absolute inset-0 bg-blue-500/30 blur-xl rounded-full animate-pulse"></div>
          <Loader2 className="w-12 h-12 text-blue-600 dark:text-blue-400 animate-spin relative z-10" />
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-lg font-bold text-slate-800 dark:text-slate-200">Muddasir Hussain</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 font-medium animate-pulse">Loading Portfolio...</p>
        </div>
      </div>
    </div>
  );
};
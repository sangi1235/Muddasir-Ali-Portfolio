import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  isLoading?: boolean;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading, 
  icon, 
  size = 'md',
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-xl font-semibold transition-all focus:outline-none focus:ring-4 disabled:opacity-50 disabled:cursor-not-allowed active:scale-95";
  
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-6 py-3 text-base"
  };

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500/30 dark:bg-blue-600 dark:hover:bg-blue-700 shadow-lg shadow-blue-500/30 border border-transparent",
    secondary: "bg-slate-800 text-white hover:bg-slate-900 focus:ring-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 dark:focus:ring-slate-700 shadow-md",
    outline: "border border-slate-300 bg-white/50 dark:bg-slate-800/50 backdrop-blur text-slate-900 hover:bg-slate-100 focus:ring-slate-200 dark:border-slate-600 dark:text-white dark:hover:bg-slate-700/50 dark:focus:ring-slate-700",
    ghost: "text-slate-700 hover:bg-slate-100/50 focus:ring-slate-200 dark:text-slate-300 dark:hover:bg-slate-800/50 dark:hover:text-white"
  };

  return (
    <button 
      className={`${baseStyles} ${sizeStyles[size]} ${variants[variant]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className={`animate-spin ${children ? 'mr-2 h-4 w-4' : 'h-5 w-5'}`} />}
      {!isLoading && icon && <span className={`${children ? 'mr-2' : ''}`}>{icon}</span>}
      {children}
    </button>
  );
};
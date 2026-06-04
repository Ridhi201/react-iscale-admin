import React from 'react';

export default function IconButton({ 
  icon: Icon, 
  onClick, 
  variant = "primary", 
  className = "",
  size = 14
}) {
  const baseStyles = "p-2 rounded-xl transition-all duration-300 flex items-center justify-center hover:scale-105 hover:-translate-y-0.5 active:scale-95";
  
  const variants = {
    primary: "bg-indigo-50 text-indigo-600 hover:bg-indigo-100 dark:bg-indigo-500/10 dark:text-indigo-400 dark:hover:bg-indigo-500/20",
    success: "bg-emerald-50 text-emerald-600 hover:bg-emerald-100 dark:bg-emerald-500/10 dark:text-emerald-400 dark:hover:bg-emerald-500/20",
    danger: "bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20",
    dark: "bg-slate-100 dark:bg-[#1f1b2e]/50 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:bg-[#1f1b2e] dark:text-slate-400 dark:hover:bg-slate-700",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${className}`}
    >
      <Icon size={size} />
    </button>
  );
}

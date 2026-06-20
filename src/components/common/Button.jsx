import React from 'react';

export default function Button({ 
  children, 
  onClick, 
  type = "button", 
  variant = "primary", 
  className = "",
  fullWidth = false,
  icon = null,
  ...props
}) {
  const baseStyles = "flex items-center justify-center gap-2 px-6 h-11 text-sm font-medium rounded-xl transition-all duration-300";
  
  // Different color variants that we frequently use
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-500 shadow-[0_4px_14px_0_rgb(37,99,235,0.39)] hover:shadow-[0_6px_20px_rgba(37,99,235,0.23)] hover:-translate-y-0.5 active:scale-[0.97] relative overflow-hidden btn-ripple",
    secondary: "bg-white dark:bg-[#13111c] text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:bg-[#1f1b2e]/50 border border-slate-200 dark:border-[#1f1b2e] shadow-sm active:scale-[0.97] hover:-translate-y-0.5 hover:shadow-md relative overflow-hidden btn-ripple",
    danger: "bg-rose-500 text-white hover:bg-rose-400 shadow-[0_4px_14px_0_rgb(244,63,94,0.39)] hover:shadow-[0_6px_20px_rgba(244,63,94,0.23)] hover:-translate-y-0.5 active:scale-[0.97] relative overflow-hidden btn-ripple",
    outline: "border border-slate-200 dark:border-[#1f1b2e] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:text-white hover:bg-slate-50 dark:bg-[#1f1b2e]/50 active:scale-[0.97] hover:shadow-sm relative overflow-hidden btn-ripple bg-transparent"
  };

  const widthClass = fullWidth ? "w-full" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${widthClass} ${className}`}
      {...props}
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </button>
  );
}

import React from 'react';

export default function InputField({ 
  label, 
  type = "text", 
  placeholder, 
  value, 
  onChange,
  icon: Icon = null,
  className = ""
}) {
  return (
    <div className={`relative ${className} mt-3`}>
      <input 
        type={type} 
        placeholder=" "
        value={value}
        onChange={onChange}
        className="peer w-full h-12 bg-white dark:bg-[#13111c] border border-slate-200 dark:border-[#1f1b2e] rounded-xl px-4 pt-4 pb-1 text-sm text-slate-800 dark:text-slate-200 outline-none transition-all duration-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/15 shadow-sm hover:border-blue-300"
      />
      {label && (
        <label className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm transition-all duration-300 peer-focus:top-3 peer-focus:text-[10px] peer-focus:text-blue-600 peer-focus:font-semibold peer-[:not(:placeholder-shown)]:top-3 peer-[:not(:placeholder-shown)]:-translate-y-1/2 peer-[:not(:placeholder-shown)]:text-[10px] peer-[:not(:placeholder-shown)]:font-semibold pointer-events-none uppercase tracking-wider">
          {label}
        </label>
      )}
      {Icon && (
        <Icon className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 transition-colors duration-300 peer-focus:text-blue-500" size={16} />
      )}
    </div>
  );
}

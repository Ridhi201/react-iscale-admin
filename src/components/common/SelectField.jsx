import React from 'react';

export default function SelectField({ 
  label, 
  options = [], 
  value, 
  onChange,
  className = ""
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && <label className="text-[13px] font-semibold text-slate-800 dark:text-slate-200 mb-1">{label}</label>}
      <select 
        value={value}
        onChange={onChange}
        className="w-full h-12 bg-[#f6f6ff] dark:bg-[#13111c] border border-slate-200 dark:border-[#1f1b2e] rounded-xl px-4 py-2 text-sm text-white outline-none transition-all duration-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 appearance-none"
      >
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value || opt.label || opt}>
            {opt.label || opt}
          </option>
        ))}
      </select>
    </div>
  );
}

import React from 'react';

export default function ToggleSwitch({
  checked,
  onChange,
  label,
  id,
  className = "",
}) {
  return (
    <label htmlFor={id} className={`flex items-center gap-2 cursor-pointer select-none ${className}`}>
      <span className="relative inline-flex items-center">
        <input
          id={id}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className="peer sr-only"
        />
        <span className="w-9 h-5 bg-slate-300 rounded-full transition-colors duration-200 peer-checked:bg-[#144f36]"></span>
        <span className="absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 peer-checked:translate-x-4"></span>
      </span>
      {label && <span className="text-xs text-slate-800 font-bold">{label}</span>}
    </label>
  );
}

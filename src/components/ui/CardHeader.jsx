import React from 'react';

export default function CardHeader({ title, children, className = "rounded-t" }) {
  return (
    <div className={`bg-[#144f36] p-5 flex justify-between items-center shadow-md relative overflow-hidden group ${className}`}>
      {/* Shimmer Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
      
      {/* Decorative Blur Circle */}
      <div className="absolute -right-10 -top-10 w-40 h-40 bg-white dark:bg-[#13111c]/10 rounded-full blur-2xl group-hover:bg-white dark:bg-[#13111c]/20 transition-all duration-700 pointer-events-none"></div>
      
      {/* Title */}
      <div className="flex items-center relative z-10">
        <div className="w-1.5 h-7 bg-white dark:bg-[#13111c]/90 rounded-full mr-4 shadow-[0_0_12px_rgba(255,255,255,0.9)] hidden sm:block"></div>
        <h2 className="text-white font-bold tracking-wide text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.2)]">{title}</h2>
      </div>
      
      {/* Action Slot */}
      {children && <div className="relative z-10 flex items-center gap-2">{children}</div>}
    </div>
  );
}

import React, { useState, useEffect } from 'react';
import { registerPopupHandler } from '../../utils/popup';
import { CheckCircle2, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export default function CustomPopup() {
  const [modal, setModal] = useState(null); // { type, message, resolve }
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    registerPopupHandler((config) => {
      setModal(config);
      // Small timeout to ensure the DOM is mounted before adding active classes for animation
      setTimeout(() => {
        setIsOpen(true);
      }, 20);
    });
    return () => {
      registerPopupHandler(null);
    };
  }, []);

  if (!modal) return null;

  const handleClose = (value) => {
    setIsOpen(false);
    setTimeout(() => {
      modal.resolve(value);
      setModal(null);
    }, 200); // Wait for scale transition to complete
  };

  // Determine popup theme based on message content
  const msgLower = modal.message.toLowerCase();
  const isError = msgLower.includes('error') || msgLower.includes('fail') || msgLower.includes('❌') || msgLower.includes('invalid') || msgLower.includes('denied');
  const isSuccess = msgLower.includes('success') || msgLower.includes('successfully') || msgLower.includes('added') || msgLower.includes('updated') || msgLower.includes('deleted') || msgLower.includes('saved') || msgLower.includes('created');

  let theme = {
    bg: 'bg-emerald-50 dark:bg-emerald-950/20',
    iconBg: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400',
    icon: <CheckCircle2 className="w-8 h-8" />,
    btnColor: 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500/20 text-white',
    title: 'Success'
  };

  if (modal.type === 'confirm') {
    theme = {
      bg: 'bg-amber-50 dark:bg-amber-950/20',
      iconBg: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400',
      icon: <AlertTriangle className="w-8 h-8" />,
      btnColor: 'bg-[#144f36] hover:bg-[#0f3d2a] focus:ring-[#144f36]/20 text-white',
      title: 'Confirm Action'
    };
  } else if (isError) {
    theme = {
      bg: 'bg-rose-50 dark:bg-rose-950/20',
      iconBg: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400',
      icon: <XCircle className="w-8 h-8" />,
      btnColor: 'bg-rose-600 hover:bg-rose-700 focus:ring-rose-500/20 text-white',
      title: 'Error'
    };
  } else if (!isSuccess) {
    theme = {
      bg: 'bg-blue-50 dark:bg-blue-950/20',
      iconBg: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      icon: <Info className="w-8 h-8" />,
      btnColor: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500/20 text-white',
      title: 'Notification'
    };
  }

  // Strip emojis from start of message to avoid duplication with icons
  let cleanMessage = modal.message.replace(/^[❌✅⚠️ℹ️\s]+/, '');

  return (
    <div
      className={`fixed inset-0 z-[99999] flex items-center justify-center p-4 bg-slate-900/60 dark:bg-slate-950/80 backdrop-blur-sm transition-all duration-200 ${
        isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <div
        className={`bg-white dark:bg-[#13111c] border border-slate-100 dark:border-[#1f1b2e] rounded-2xl shadow-2xl max-w-md w-full p-6 relative overflow-hidden transition-all duration-200 transform ${
          isOpen ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}
      >
        {/* Decorative background circle */}
        <div className={`absolute top-0 right-0 w-32 h-32 rounded-full -mr-8 -mt-8 opacity-25 blur-2xl ${theme.bg}`}></div>
        
        {/* Close icon button */}
        <button
          onClick={() => handleClose(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-[#1f1b2e] text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex flex-col items-center text-center mt-2">
          {/* Theme icon container */}
          <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${theme.iconBg}`}>
            {theme.icon}
          </div>

          <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100 tracking-wide mb-2">
            {theme.title}
          </h3>

          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed mb-6 whitespace-pre-wrap max-h-48 overflow-y-auto pr-1">
            {cleanMessage}
          </p>

          <div className="flex w-full gap-3">
            {modal.type === 'confirm' && (
              <button
                onClick={() => handleClose(false)}
                className="flex-1 px-5 py-2.5 border border-slate-200 dark:border-[#1f1b2e] hover:bg-slate-50 dark:hover:bg-[#1a1726] text-slate-700 dark:text-slate-300 rounded-xl text-sm font-bold transition-all"
              >
                Cancel
              </button>
            )}
            <button
              onClick={() => handleClose(true)}
              className={`flex-1 px-5 py-2.5 rounded-xl text-sm font-bold shadow-md hover:shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-[#13111c] ${theme.btnColor}`}
            >
              {modal.type === 'confirm' ? 'Yes, Confirm' : 'OK'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

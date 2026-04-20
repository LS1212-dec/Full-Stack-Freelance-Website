import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="bg-white dark:bg-dark-card w-full max-w-md rounded-2xl shadow-2xl overflow-hidden transform transition-all p-6 relative border border-light-border dark:border-dark-border"
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-light-textMuted hover:text-light-text dark:text-dark-textMuted dark:hover:text-dark-text transition-colors"
        >
          <X size={24} />
        </button>
        
        <h3 className="text-2xl font-bold mb-6 text-light-text dark:text-dark-text">
          {title}
        </h3>
        
        <div className="modal-content">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

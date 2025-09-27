import * as React from 'react';
import { X } from 'lucide-react';

interface ErrorModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

export function ErrorModal({ isOpen, onClose, title, message }: ErrorModalProps) {
  if (!isOpen) {
    return null;
  }

  return (
    // Overlay (الخلفية المعتمة)
    <div 
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose} // الإغلاق عند النقر على الخلفية
    >
      {/* Modal Content (محتوى النافذة) */}
      <div 
        className="relative w-full max-w-sm bg-white rounded-lg shadow-xl p-6 text-center"
        onClick={(e) => e.stopPropagation()} // منع إغلاق النافذة عند النقر داخلها
      >
        <button 
          onClick={onClose}
          className="absolute top-2 right-2 p-1 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600"
        >
          <X className="h-5 w-5" />
        </button>
        <h2 className="text-xl font-bold text-blue-600">{title}</h2>
        <p className="mt-2 text-gray-700">{message}</p>
      </div>
    </div>
  );
}
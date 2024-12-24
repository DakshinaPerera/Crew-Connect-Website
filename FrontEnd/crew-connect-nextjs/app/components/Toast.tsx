// components/Toast.tsx
import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  type?: 'loading' | 'success' | 'error';
  onClose?: () => void;
}

const Toast: React.FC<ToastProps> = ({ 
  message, 
  isVisible, 
  type = 'loading',
  onClose 
}) => {
  useEffect(() => {
    if (isVisible && type !== 'loading' && onClose) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isVisible, type, onClose]);

  if (!isVisible) return null;

  const getToastStyles = () => {
    switch (type) {
      case 'loading':
        return 'bg-white text-primary';
      case 'success':
        return 'bg-green-500 text-white';
      case 'error':
        return 'bg-red-500 text-white';
      default:
        return 'bg-white text-primary';
    }
  };

  return (
    <div className="fixed top-4 right-4 mt-14 z-50 animate-fadeIn">
      <div className={`rounded-lg px-4 py-3 shadow-lg flex items-center space-x-2 ${getToastStyles()}`}>
        {type === 'loading' && (
          <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin"/>
        )}
        <span className="font-medium text-sm">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
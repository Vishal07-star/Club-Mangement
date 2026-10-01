import React from 'react';
import { useApp } from '../context/AppContext';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer() {
  const { toasts } = useApp();
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type} animate-fadeIn`}>
          {t.type === 'success' && <CheckCircle size={18} className="flex-shrink-0 text-emerald-600" />}
          {t.type === 'error'   && <AlertCircle size={18} className="flex-shrink-0 text-red-600" />}
          {t.type === 'info'    && <Info         size={18} className="flex-shrink-0 text-blue-600" />}
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}

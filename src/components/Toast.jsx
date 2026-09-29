import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';

export default function Toast({ message, type = 'success', onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      zIndex: 2000,
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      padding: '14px 20px',
      borderRadius: '12px',
      background: type === 'success' ? '#0F1E17' : '#221013',
      border: `1px solid ${type === 'success' ? '#10B981' : '#EF4444'}`,
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
      animation: 'modal-enter 0.3s ease-out',
    }}>
      {type === 'success' ? (
        <CheckCircle2 size={20} color="#10B981" />
      ) : (
        <AlertCircle size={20} color="#EF4444" />
      )}
      <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#F8FAFC' }}>
        {message}
      </span>
      <button
        onClick={onClose}
        style={{ background: 'transparent', border: 'none', color: '#94A3B8', cursor: 'pointer', marginLeft: '8px' }}
      >
        <X size={16} />
      </button>
    </div>
  );
}

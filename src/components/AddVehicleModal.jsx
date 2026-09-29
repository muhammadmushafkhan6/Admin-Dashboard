import React, { useState } from 'react';
import { X, Car, Hash, Calendar, Palette, Layers, Sparkles } from 'lucide-react';

export default function AddVehicleModal({ onClose, onAdd, fleetClasses }) {
  const [formData, setFormData] = useState({
    makeModel: 'Mercedes-Maybach S680',
    plateNumber: '',
    year: 2024,
    color: 'Obsidian Black Metallic',
    fleetClassId: fleetClasses[0]?.id || '',
    status: 'ACTIVE',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onAdd(formData);
    setLoading(false);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content" style={{ maxWidth: '560px' }}>
        {/* Header */}
        <div style={{
          padding: '22px 26px',
          borderBottom: '1px solid rgba(216, 178, 87, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(180deg, rgba(216, 178, 87, 0.08) 0%, transparent 100%)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '12px',
              background: 'rgba(216, 178, 87, 0.15)',
              border: '1px solid rgba(216, 178, 87, 0.4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ECC86A',
            }}>
              <Car size={20} />
            </div>
            <div>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#F1F5F9', margin: 0, letterSpacing: '-0.02em' }}>
                Add Luxury Fleet Vehicle
              </h3>
              <p style={{ fontSize: '0.78rem', color: '#94A3B8', margin: '2px 0 0 0' }}>
                Register new executive vehicle to the luxury chauffeur fleet
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '10px',
              color: '#94A3B8',
              cursor: 'pointer',
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(244, 63, 94, 0.2)';
              e.currentTarget.style.color = '#F43F5E';
              e.currentTarget.style.borderColor = 'rgba(244, 63, 94, 0.4)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.color = '#94A3B8';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '24px 26px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Make & Model */}
          <div>
            <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#ECC86A', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '7px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
              <Car size={14} /> Make & Model *
            </label>
            <input
              type="text"
              required
              className="vip-input"
              value={formData.makeModel}
              onChange={(e) => setFormData({ ...formData, makeModel: e.target.value })}
              placeholder="e.g. Mercedes-Maybach S680"
            />
          </div>

          {/* Registration Plate & Year */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#ECC86A', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '7px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                <Hash size={14} /> Registration Plate *
              </label>
              <input
                type="text"
                required
                className="vip-input font-mono-num"
                value={formData.plateNumber}
                onChange={(e) => setFormData({ ...formData, plateNumber: e.target.value.toUpperCase() })}
                placeholder="LN24 LUX"
                style={{ letterSpacing: '0.12em', fontWeight: 700 }}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#ECC86A', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '7px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                <Calendar size={14} /> Year of Manufacture
              </label>
              <input
                type="number"
                min="2018"
                max="2027"
                className="vip-input font-mono-num"
                value={formData.year}
                onChange={(e) => setFormData({ ...formData, year: e.target.value })}
              />
            </div>
          </div>

          {/* Color & Fleet Class */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#ECC86A', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '7px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                <Palette size={14} /> Color / Exterior
              </label>
              <input
                type="text"
                className="vip-input"
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                placeholder="Obsidian Black Metallic"
              />
            </div>
            <div>
              <label style={{ fontSize: '0.78rem', fontWeight: 700, color: '#ECC86A', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '7px', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                <Layers size={14} /> Fleet Class
              </label>
              <select
                className="vip-input"
                value={formData.fleetClassId}
                onChange={(e) => setFormData({ ...formData, fleetClassId: e.target.value })}
              >
                {fleetClasses.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({f.model || 'VIP'})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Footer Actions */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '12px',
            marginTop: '14px',
            paddingTop: '18px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}>
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-gold">
              <Sparkles size={16} />
              {loading ? 'Registering Vehicle...' : 'Register Vehicle'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

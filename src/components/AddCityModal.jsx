import React, { useState } from 'react';
import { X, MapPin } from 'lucide-react';

export default function AddCityModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    name: '',
    country: 'United Kingdom',
    currency: 'GBP',
    baseMultiplier: 1.0,
    isActive: true,
    lat: 51.5074,
    lng: -0.1278,
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
      <div className="modal-content">
        <div style={{ padding: '20px 24px', borderBottom: '1px solid var(--border-light)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Add Expansion City / Service Area
          </h3>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              City / Territory Name *
            </label>
            <input
              type="text"
              required
              className="vip-input"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Zurich / Monaco / Edinburgh"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Country
              </label>
              <input
                type="text"
                className="vip-input"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                placeholder="Switzerland"
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Currency (ISO)
              </label>
              <input
                type="text"
                className="vip-input font-mono-num"
                value={formData.currency}
                onChange={(e) => setFormData({ ...formData, currency: e.target.value.toUpperCase() })}
                placeholder="GBP / EUR / CHF"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Base Price Multiplier (1.0 = standard)
              </label>
              <input
                type="number"
                step="0.05"
                className="vip-input font-mono-num"
                value={formData.baseMultiplier}
                onChange={(e) => setFormData({ ...formData, baseMultiplier: e.target.value })}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Status
              </label>
              <select
                className="vip-input"
                value={formData.isActive ? 'true' : 'false'}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.value === 'true' })}
              >
                <option value="true">Active Coverage</option>
                <option value="false">Coming Soon / Inactive</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-gold">
              <MapPin size={16} />
              {loading ? 'Adding...' : 'Launch City Zone'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

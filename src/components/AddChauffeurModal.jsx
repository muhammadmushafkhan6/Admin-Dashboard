import React, { useState } from 'react';
import { X, UserPlus, ShieldCheck } from 'lucide-react';

export default function AddChauffeurModal({ onClose, onAdd, fleetClasses }) {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    vehicleModel: 'Mercedes-Benz S-Class',
    vehiclePlate: 'LX24 LUX',
    fleetClassId: fleetClasses[0]?.id || '',
    pcoBadgeNumber: 'PCO-LONDON-7721',
    licensingAuthority: 'Transport for London (TfL)',
    dbsCheckStatus: 'ENHANCED_PASSED',
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
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Onboard VIP Chauffeur
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: 0, marginTop: '2px' }}>
              TfL / PCO & Commercial Insurance Licensing
            </p>
          </div>
          <button onClick={onClose} style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
              Full Name *
            </label>
            <input
              type="text"
              required
              className="vip-input"
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="e.g. Lord Alexander Vance"
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Phone Number *
              </label>
              <input
                type="text"
                required
                className="vip-input"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+44 7911 223344"
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Email Address
              </label>
              <input
                type="email"
                className="vip-input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="chauffeur@aurachauffeur.co.uk"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Assigned Vehicle Model
              </label>
              <input
                type="text"
                className="vip-input"
                value={formData.vehicleModel}
                onChange={(e) => setFormData({ ...formData, vehicleModel: e.target.value })}
                placeholder="Mercedes-Benz S-Class"
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Number Plate
              </label>
              <input
                type="text"
                className="vip-input font-mono-num"
                value={formData.vehiclePlate}
                onChange={(e) => setFormData({ ...formData, vehiclePlate: e.target.value.toUpperCase() })}
                placeholder="LX24 VIP"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                PCO Badge Number
              </label>
              <input
                type="text"
                className="vip-input"
                value={formData.pcoBadgeNumber}
                onChange={(e) => setFormData({ ...formData, pcoBadgeNumber: e.target.value })}
              />
            </div>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                Fleet Class
              </label>
              <select
                className="vip-input"
                value={formData.fleetClassId}
                onChange={(e) => setFormData({ ...formData, fleetClassId: e.target.value })}
              >
                {fleetClasses.map(f => (
                  <option key={f.id} value={f.id}>{f.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn-gold">
              <UserPlus size={16} />
              {loading ? 'Creating...' : 'Onboard Chauffeur'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

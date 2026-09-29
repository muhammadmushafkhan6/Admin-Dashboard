import React, { useState } from 'react';
import { X, Building2, User, Mail, Phone, MapPin, CreditCard, Sparkles, ShieldCheck } from 'lucide-react';

export default function AddHotelModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    hotelName: '',
    contactPerson: '',
    email: '',
    phone: '',
    accessPin: '1234',
    city: 'London',
    address: '',
    creditLimit: 50000,
    isApproved: true,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await onAdd(formData);
    setLoading(false);
    onClose();
  };

  const cities = ['London', 'Paris', 'Manchester', 'Nice', 'Monaco', 'Dubai'];

  return (
    <div className="modal-backdrop">
      <div className="modal-content" style={{ maxWidth: '620px' }}>
        {/* Modal Header */}
        <div
          style={{
            padding: '22px 26px',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, rgba(216, 178, 87, 0.1) 0%, rgba(14, 18, 27, 0.8) 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, var(--gold-primary) 0%, var(--gold-dark) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#080A0F',
                boxShadow: '0 4px 14px rgba(216, 178, 87, 0.3)',
              }}
            >
              <Building2 size={22} strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                Register Luxury Hotel Partner
              </h3>
              <p style={{ fontSize: '0.74rem', color: 'var(--gold-bright)', margin: 0, marginTop: '2px', fontWeight: 600 }}>
                5-Star Concierge Bureau Account &amp; Credit Folio Facility
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-light)',
              borderRadius: '8px',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              padding: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} style={{ padding: '26px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {/* Hotel Name */}
          <div>
            <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Hotel Brand / Property Name *
            </label>
            <div style={{ position: 'relative' }}>
              <Building2 size={16} color="var(--gold-primary)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                required
                className="aura-input"
                style={{ paddingLeft: '40px', height: '42px', fontSize: '0.86rem' }}
                value={formData.hotelName}
                onChange={(e) => setFormData({ ...formData, hotelName: e.target.value })}
                placeholder="e.g. The Dorchester Mayfair"
              />
            </div>
          </div>

          {/* Contact Person & Email */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Head Concierge / Primary Contact *
              </label>
              <div style={{ position: 'relative' }}>
                <User size={15} color="var(--gold-primary)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  required
                  className="aura-input"
                  style={{ paddingLeft: '38px', height: '42px', fontSize: '0.84rem' }}
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  placeholder="e.g. Marcus Vance (Chief Concierge)"
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Concierge Desk Email *
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={15} color="var(--gold-primary)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="email"
                  required
                  className="aura-input"
                  style={{ paddingLeft: '38px', height: '42px', fontSize: '0.84rem' }}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="concierge@dorchester.co.uk"
                />
              </div>
            </div>
          </div>

          {/* Phone & Access PIN */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Direct Phone / Extension
              </label>
              <div style={{ position: 'relative' }}>
                <Phone size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  className="aura-input"
                  style={{ paddingLeft: '38px', height: '42px', fontSize: '0.84rem' }}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+44 20 7629 8888"
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                🔑 Concierge Portal Login PIN *
              </label>
              <input
                type="text"
                required
                className="aura-input font-mono"
                style={{ height: '42px', fontSize: '0.92rem', fontWeight: 700, color: 'var(--gold-bright)', letterSpacing: '2px' }}
                value={formData.accessPin}
                onChange={(e) => setFormData({ ...formData, accessPin: e.target.value })}
                placeholder="1234"
              />
            </div>
          </div>

          {/* Credit Limit */}
          <div>
            <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Monthly Credit Facility (£)
            </label>
            <div style={{ position: 'relative' }}>
              <CreditCard size={15} color="var(--accent-emerald)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="number"
                className="aura-input font-num"
                style={{ paddingLeft: '38px', height: '42px', fontSize: '0.92rem', fontWeight: 700, color: 'var(--gold-bright)' }}
                value={formData.creditLimit}
                onChange={(e) => setFormData({ ...formData, creditLimit: parseFloat(e.target.value) || 0 })}
                placeholder="50000"
              />
            </div>
          </div>

          {/* City Selector */}
          <div>
            <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Service Jurisdiction &amp; City
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '8px' }}>
              {cities.map((city) => {
                const isSelected = formData.city === city;
                return (
                  <button
                    key={city}
                    type="button"
                    onClick={() => setFormData({ ...formData, city })}
                    style={{
                      padding: '6px 14px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      border: isSelected ? '1px solid var(--border-gold)' : '1px solid var(--border-light)',
                      background: isSelected ? 'rgba(216, 178, 87, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                      color: isSelected ? 'var(--gold-bright)' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {city}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Full Address */}
          <div>
            <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Hotel Property Address (Lobby VIP Pick-Up Point)
            </label>
            <div style={{ position: 'relative' }}>
              <MapPin size={15} color="var(--gold-primary)" style={{ position: 'absolute', left: '14px', top: '14px' }} />
              <textarea
                rows={2}
                className="aura-input"
                style={{ paddingLeft: '38px', paddingTop: '10px', fontSize: '0.84rem', resize: 'none' }}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="e.g. Park Lane, Mayfair, London W1K 1QA"
              />
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
              <ShieldCheck size={14} /> Immediate Portal Access Activated
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" onClick={onClose} className="btn-aura-secondary">
                Cancel
              </button>
              <button type="submit" disabled={loading} className="btn-aura-primary">
                <Building2 size={16} />
                {loading ? 'Registering...' : 'Add Hotel Partner'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

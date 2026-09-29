import React, { useState } from 'react';
import { X, Building2, User, Mail, Phone, MapPin, CreditCard, ShieldCheck } from 'lucide-react';

export default function AddCorporateModal({ onClose, onAdd }) {
  const [formData, setFormData] = useState({
    companyName: '',
    vatNumber: 'GB',
    contactPerson: '',
    billingEmail: '',
    phone: '',
    city: 'London',
    creditTerms: 'NET_30',
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

  const terms = [
    { id: 'NET_15', label: 'NET 15 (Bi-Weekly)' },
    { id: 'NET_30', label: 'NET 30 (Monthly)' },
    { id: 'NET_60', label: 'NET 60 (Quarterly)' },
  ];

  return (
    <div className="modal-backdrop">
      <div className="modal-content" style={{ maxWidth: '620px' }}>
        {/* Header */}
        <div
          style={{
            padding: '22px 26px',
            borderBottom: '1px solid var(--border-light)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, rgba(56, 189, 248, 0.1) 0%, rgba(14, 18, 27, 0.8) 100%)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, var(--accent-sky) 0%, #0284c7 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#080A0F',
                boxShadow: '0 4px 14px rgba(56, 189, 248, 0.3)',
              }}
            >
              <Building2 size={22} strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#fff', margin: 0 }}>
                Register Corporate Enterprise Account
              </h3>
              <p style={{ fontSize: '0.74rem', color: '#38BDF8', margin: 0, marginTop: '2px', fontWeight: 600 }}>
                B2B Executive Travel Ledger &amp; Invoicing Account
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
            }}
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: '26px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
          <div>
            <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Company Legal Entity *
            </label>
            <div style={{ position: 'relative' }}>
              <Building2 size={16} color="var(--accent-sky)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                required
                className="aura-input"
                style={{ paddingLeft: '40px', height: '42px' }}
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                placeholder="e.g. Goldman Sachs International"
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                VAT / Tax Registration #
              </label>
              <input
                type="text"
                className="aura-input font-mono"
                style={{ height: '42px' }}
                value={formData.vatNumber}
                onChange={(e) => setFormData({ ...formData, vatNumber: e.target.value })}
                placeholder="GB 987 6543 21"
              />
            </div>

            <div>
              <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Account Lead / Representative *
              </label>
              <div style={{ position: 'relative' }}>
                <User size={15} color="var(--accent-sky)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  required
                  className="aura-input"
                  style={{ paddingLeft: '38px', height: '42px' }}
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  placeholder="e.g. Charles Sterling (VP Travel)"
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Billing Folio Email *
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={15} color="var(--accent-sky)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="email"
                  required
                  className="aura-input"
                  style={{ paddingLeft: '38px', height: '42px' }}
                  value={formData.billingEmail}
                  onChange={(e) => setFormData({ ...formData, billingEmail: e.target.value })}
                  placeholder="accounts.payable@company.com"
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Direct Contact Phone
              </label>
              <div style={{ position: 'relative' }}>
                <Phone size={15} color="var(--text-muted)" style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)' }} />
                <input
                  type="text"
                  className="aura-input"
                  style={{ paddingLeft: '38px', height: '42px' }}
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+44 20 7138 6000"
                />
              </div>
            </div>
          </div>

          <div>
            <label style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Settlement &amp; Credit Terms
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {terms.map((t) => {
                const isSelected = formData.creditTerms === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setFormData({ ...formData, creditTerms: t.id })}
                    style={{
                      padding: '8px 12px',
                      borderRadius: '8px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                      border: isSelected ? '1px solid rgba(56, 189, 248, 0.6)' : '1px solid var(--border-light)',
                      background: isSelected ? 'rgba(56, 189, 248, 0.18)' : 'rgba(255, 255, 255, 0.03)',
                      color: isSelected ? '#38BDF8' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                    }}
                  >
                    {t.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '10px', paddingTop: '16px', borderTop: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.74rem', color: 'var(--accent-emerald)', fontWeight: 600 }}>
              <ShieldCheck size={14} /> Corporate Tier 1 Terms
            </div>

            <div style={{ display: 'flex', gap: '10px' }}>
              <button type="button" onClick={onClose} className="btn-aura-secondary">
                Cancel
              </button>
              <button type="submit" disabled={loading} className="btn-aura-primary">
                <Building2 size={16} />
                {loading ? 'Saving...' : 'Add Corporate Account'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { X, UserCheck, Shield, Car, Star, Check } from 'lucide-react';

export default function AssignDriverModal({ ride, chauffeurs, onClose, onAssign }) {
  const [selectedDriverId, setSelectedDriverId] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!ride) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedDriverId) return;
    setIsSubmitting(true);
    await onAssign(ride.id, selectedDriverId);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <div className="modal-backdrop">
      <div className="modal-content" style={{ maxWidth: '550px' }}>
        {/* Header */}
        <div style={{
          padding: '20px 24px',
          borderBottom: '1px solid var(--border-light)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Assign Chauffeur to VIP Ride
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--gold-primary)', margin: 0, marginTop: '2px' }}>
              Ride #{ride.id.slice(0, 8)} • {ride.fleetClass?.name || 'VIP Class'}
            </p>
          </div>
          <button
            onClick={onClose}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Ride Details Summary */}
        <div style={{ padding: '16px 24px', background: 'rgba(0, 0, 0, 0.3)', borderBottom: '1px solid var(--border-light)' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', fontSize: '0.8rem' }}>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Passenger:</span>
              <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{ride.user?.fullName || ride.user?.phone || 'VIP Client'}</div>
            </div>
            <div>
              <span style={{ color: 'var(--text-muted)' }}>Fare (GBP):</span>
              <div className="font-mono-num" style={{ fontWeight: 700, color: 'var(--gold-primary)' }}>£{ride.fareAmount?.toFixed(2)}</div>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <span style={{ color: 'var(--text-muted)' }}>Route:</span>
              <div style={{ color: 'var(--text-secondary)', marginTop: '2px' }}>
                📍 {ride.pickupAddress} ➔ 🏁 {ride.dropoffAddress}
              </div>
            </div>
          </div>
        </div>

        {/* Driver Selection List */}
        <form onSubmit={handleSubmit} style={{ padding: '20px 24px' }}>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-secondary)', marginBottom: '8px' }}>
              Select Available Chauffeur:
            </label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '240px', overflowY: 'auto' }}>
              {chauffeurs.map((driver) => {
                const isSelected = selectedDriverId === driver.id;
                return (
                  <div
                    key={driver.id}
                    onClick={() => setSelectedDriverId(driver.id)}
                    style={{
                      padding: '12px 16px',
                      borderRadius: '12px',
                      background: isSelected ? 'rgba(212, 175, 55, 0.15)' : 'rgba(255, 255, 255, 0.03)',
                      border: isSelected ? '1px solid var(--gold-primary)' : '1px solid var(--border-light)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{
                        width: '38px',
                        height: '38px',
                        borderRadius: '50%',
                        background: '#182030',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--gold-primary)',
                        fontWeight: 700,
                      }}>
                        {driver.fullName.charAt(0)}
                      </div>
                      <div>
                        <div style={{ fontSize: '0.88rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                          {driver.fullName}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {driver.vehicleModel} • <span className="uk-plate" style={{ fontSize: '0.7rem', padding: '1px 5px' }}>{driver.vehiclePlate}</span>
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span style={{ fontSize: '0.75rem', color: '#FBBF24', display: 'flex', alignItems: 'center', gap: '2px', fontWeight: 700 }}>
                        ★ {driver.rating?.toFixed(1) || '5.0'}
                      </span>
                      {driver.isPcoVerified && (
                        <span className="badge-status badge-approved" style={{ fontSize: '0.64rem', padding: '2px 6px' }}>
                          PCO
                        </span>
                      )}
                      {isSelected && <Check size={18} color="var(--gold-primary)" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
            <button type="button" onClick={onClose} className="btn-aura-secondary">
              Cancel
            </button>
            <button
              type="submit"
              disabled={!selectedDriverId || isSubmitting}
              className="btn-aura-primary"
              style={{ opacity: !selectedDriverId ? 0.5 : 1 }}
            >
              <UserCheck size={15} />
              {isSubmitting ? 'Assigning...' : 'Dispatch Chauffeur'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

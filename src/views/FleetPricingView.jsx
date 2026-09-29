import React, { useState } from 'react';
import {
  Layers,
  Save,
  Check,
  Users,
  Zap,
  Star,
  Crown,
  ShieldCheck,
  TrendingUp,
} from 'lucide-react';

const FLEET_ICONS = {
  'First Class': Crown,
  'Business Class': Star,
  'Luxury SUV': ShieldCheck,
  'VIP Van': Users,
};

// Single unified gold accent for all fleet classes
const GOLD = {
  bg:     'rgba(216, 178, 87, 0.10)',
  border: 'rgba(216, 178, 87, 0.30)',
  text:   '#ECC86A',
  glow:   'rgba(216, 178, 87, 0.12)',
};

export default function FleetPricingView({ fleetClasses, onUpdateFleetClass }) {
  const [editingData, setEditingData] = useState({});
  const [savedClassId, setSavedClassId] = useState(null);

  const handleFieldChange = (id, field, value) => {
    setEditingData((prev) => ({
      ...prev,
      [id]: { ...(prev[id] || {}), [field]: value },
    }));
  };

  const handleSave = async (fleet) => {
    const edits = editingData[fleet.id] || {};
    const payload = {
      name:       edits.name       !== undefined ? edits.name       : fleet.name,
      model:      edits.model      !== undefined ? edits.model      : fleet.model,
      basePrice:  edits.basePrice  !== undefined ? edits.basePrice  : fleet.basePrice,
      pricePerKm: edits.pricePerKm !== undefined ? edits.pricePerKm : fleet.pricePerKm,
      perks:      edits.perks      !== undefined ? edits.perks      : fleet.perks,
      capacity:   edits.capacity   !== undefined ? edits.capacity   : fleet.capacity,
      badge:      edits.badge      !== undefined ? edits.badge      : fleet.badge,
      isAvailable: fleet.isAvailable,
    };
    await onUpdateFleetClass(fleet.id, payload);
    setSavedClassId(fleet.id);
    setTimeout(() => setSavedClassId(null), 2500);
  };

  const totalRevenuePotential = fleetClasses.reduce((sum, f) => sum + Number(f.basePrice || 0), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

      {/* ── 1. Header Banner ─────────────────────────────────────── */}
      <div style={{
        padding: '20px 26px',
        borderRadius: '18px',
        background: 'linear-gradient(135deg, rgba(22, 28, 41, 0.97) 0%, rgba(10, 13, 20, 0.97) 100%)',
        border: '1px solid rgba(216, 178, 87, 0.3)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
        boxShadow: '0 0 40px rgba(216, 178, 87, 0.08)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '14px',
            background: 'rgba(216, 178, 87, 0.12)',
            border: '1px solid rgba(216, 178, 87, 0.4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#ECC86A',
            boxShadow: '0 0 16px rgba(216, 178, 87, 0.2)',
          }}>
            <Layers size={22} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#F1F5F9', margin: 0, fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em' }}>
                Vehicle Tier Tariffs & Dynamic Pricing Matrix
              </h2>
              <span style={{
                fontSize: '0.65rem', fontWeight: 800, letterSpacing: '0.1em',
                background: 'linear-gradient(135deg, rgba(216,178,87,0.25), rgba(216,178,87,0.1))',
                color: '#ECC86A', border: '1px solid rgba(216,178,87,0.4)',
                padding: '3px 8px', borderRadius: '20px', textTransform: 'uppercase',
                display: 'flex', alignItems: 'center', gap: '4px',
              }}>
                <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px #10B981', animation: 'pulse 2s infinite' }} />
                LIVE
              </span>
            </div>
            <p style={{ fontSize: '0.76rem', color: '#64748B', margin: '3px 0 0', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              Changes reflect live in the Customer App in real-time · All prices in GBP (£)
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <div style={{
            padding: '10px 16px', borderRadius: '12px',
            background: 'rgba(16, 185, 129, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}>
            <span style={{ fontSize: '0.65rem', color: '#10B981', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Fleet Classes</span>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#F1F5F9', fontFamily: 'Space Grotesk, sans-serif' }}>{fleetClasses.length}</span>
          </div>
          <div style={{
            padding: '10px 16px', borderRadius: '12px',
            background: 'rgba(216, 178, 87, 0.08)', border: '1px solid rgba(216, 178, 87, 0.25)',
            display: 'flex', flexDirection: 'column', alignItems: 'center',
          }}>
            <span style={{ fontSize: '0.65rem', color: '#ECC86A', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Avg Base Fare</span>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: '#ECC86A', fontFamily: 'Space Grotesk, sans-serif' }}>
              £{fleetClasses.length ? Math.round(totalRevenuePotential / fleetClasses.length) : 0}
            </span>
          </div>
        </div>
      </div>

      {/* ── 2. Fleet Class Cards ──────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        {fleetClasses.map((fleet, idx) => {
          const edits = editingData[fleet.id] || {};
          const currentName     = edits.name       !== undefined ? edits.name       : fleet.name;
          const currentModel    = edits.model      !== undefined ? edits.model      : fleet.model;
          const currentBase     = edits.basePrice  !== undefined ? edits.basePrice  : fleet.basePrice;
          const currentKm       = edits.pricePerKm !== undefined ? edits.pricePerKm : fleet.pricePerKm;
          const currentPerks    = edits.perks      !== undefined ? edits.perks      : fleet.perks;
          const currentCapacity = edits.capacity   !== undefined ? edits.capacity   : fleet.capacity;
          const isJustSaved = savedClassId === fleet.id;

          const accent = GOLD;
          const IconComponent = FLEET_ICONS[fleet.name] || Layers;

          return (
            <div
              key={fleet.id}
              style={{
                borderRadius: '18px',
                overflow: 'hidden',
                border: isJustSaved ? '1px solid rgba(16, 185, 129, 0.6)' : `1px solid ${accent.border}`,
                background: 'linear-gradient(135deg, rgba(14, 18, 28, 0.98) 0%, rgba(10, 13, 20, 0.97) 100%)',
                boxShadow: isJustSaved
                  ? '0 0 24px rgba(16, 185, 129, 0.2)'
                  : `0 0 20px ${accent.glow}`,
                transition: 'all 0.3s ease',
              }}
            >
              {/* Card Top Accent Strip */}
              <div style={{
                height: '3px',
                background: `linear-gradient(90deg, ${accent.text}, transparent)`,
                opacity: 0.8,
              }} />

              <div style={{
                padding: '18px 22px',
                display: 'grid',
                gridTemplateColumns: 'minmax(220px, 1.2fr) 1fr 1.4fr auto',
                alignItems: 'center',
                gap: '20px',
              }}>

                {/* ── Col 1: Identity ─────────────────────── */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {/* Icon Badge */}
                  <div style={{
                    width: '52px', height: '52px', borderRadius: '14px', flexShrink: 0,
                    background: accent.bg, border: `1px solid ${accent.border}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: accent.text, boxShadow: `0 0 16px ${accent.glow}`,
                    position: 'relative',
                  }}>
                    <IconComponent size={24} />
                    <div style={{
                      position: 'absolute', top: '-4px', right: '-4px',
                      fontSize: '0.55rem', fontWeight: 800, letterSpacing: '0.05em',
                      background: accent.text, color: '#0A0D14',
                      padding: '1px 5px', borderRadius: '6px',
                    }}>
                      {idx + 1}
                    </div>
                  </div>

                  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div>
                      <label style={{ fontSize: '0.62rem', color: '#475569', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '3px' }}>
                        Class Name
                      </label>
                      <input
                        type="text"
                        className="aura-input"
                        value={currentName}
                        onChange={(e) => handleFieldChange(fleet.id, 'name', e.target.value)}
                        style={{
                          height: '30px', fontSize: '0.9rem', fontWeight: 800,
                          color: accent.text, padding: '2px 10px',
                          background: `${accent.bg}`, border: `1px solid ${accent.border}`,
                          borderRadius: '8px',
                        }}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '0.62rem', color: '#475569', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '3px' }}>
                        Vehicle Model
                      </label>
                      <input
                        type="text"
                        className="aura-input"
                        value={currentModel}
                        onChange={(e) => handleFieldChange(fleet.id, 'model', e.target.value)}
                        style={{ height: '28px', fontSize: '0.76rem', color: '#94A3B8', padding: '2px 10px', borderRadius: '8px' }}
                      />
                    </div>
                  </div>
                </div>

                {/* ── Col 2: Pricing ──────────────────────── */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div>
                    <label style={{ fontSize: '0.62rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '3px' }}>
                      Base Booking Fare
                    </label>
                    <div style={{ position: 'relative' }}>
                      <span style={{
                        position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)',
                        color: '#ECC86A', fontWeight: 800, fontSize: '1rem', fontFamily: 'Space Grotesk, sans-serif',
                      }}>£</span>
                      <input
                        type="number" step="5"
                        className="aura-input font-num"
                        value={currentBase}
                        onChange={(e) => handleFieldChange(fleet.id, 'basePrice', e.target.value)}
                        style={{
                          paddingLeft: '26px', height: '38px',
                          fontSize: '1.15rem', fontWeight: 800, color: '#F5DE88',
                          background: 'rgba(216, 178, 87, 0.07)',
                          border: '1px solid rgba(216, 178, 87, 0.3)',
                          borderRadius: '10px',
                        }}
                      />
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize: '0.62rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.08em', display: 'block', marginBottom: '3px' }}>
                      Rate per KM
                    </label>
                    <div style={{ position: 'relative' }}>
                      <span style={{
                        position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)',
                        color: '#94A3B8', fontWeight: 700, fontSize: '0.88rem',
                      }}>£</span>
                      <input
                        type="number" step="0.5"
                        className="aura-input font-num"
                        value={currentKm}
                        onChange={(e) => handleFieldChange(fleet.id, 'pricePerKm', e.target.value)}
                        style={{
                          paddingLeft: '26px', height: '32px',
                          fontSize: '0.92rem', fontWeight: 700, color: '#CBD5E1',
                          borderRadius: '10px',
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* ── Col 3: Specs & Amenities ─────────────── */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '4px',
                      fontSize: '0.62rem', color: '#475569', fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.08em',
                      flexShrink: 0, minWidth: '64px',
                    }}>
                      <Users size={11} style={{ color: '#64748B' }} />
                      Capacity
                    </div>
                    <input
                      type="text"
                      className="aura-input"
                      value={currentCapacity}
                      onChange={(e) => handleFieldChange(fleet.id, 'capacity', e.target.value)}
                      style={{ height: '30px', fontSize: '0.76rem', padding: '4px 10px', borderRadius: '8px', flex: 1 }}
                    />
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      display: 'flex', alignItems: 'center', gap: '4px',
                      fontSize: '0.62rem', color: '#475569', fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.08em',
                      flexShrink: 0, minWidth: '64px',
                    }}>
                      <Zap size={11} style={{ color: '#64748B' }} />
                      Perks
                    </div>
                    <input
                      type="text"
                      className="aura-input"
                      value={currentPerks}
                      onChange={(e) => handleFieldChange(fleet.id, 'perks', e.target.value)}
                      style={{ height: '30px', fontSize: '0.72rem', padding: '4px 10px', borderRadius: '8px', flex: 1 }}
                    />
                  </div>
                </div>

                {/* ── Col 4: Status & Save ─────────────────── */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '10px', minWidth: '120px' }}>
                  <span style={{
                    fontSize: '0.64rem', color: '#10B981', fontWeight: 700, letterSpacing: '0.1em',
                    display: 'flex', alignItems: 'center', gap: '5px',
                    background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)',
                    padding: '3px 10px', borderRadius: '20px',
                  }}>
                    <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: '#10B981', boxShadow: '0 0 6px #10B981' }} />
                    ACTIVE
                  </span>

                  <button
                    onClick={() => handleSave(fleet)}
                    style={{
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      gap: '6px', width: '100%', height: '36px',
                      fontSize: '0.78rem', fontWeight: 700, letterSpacing: '0.02em',
                      fontFamily: 'Outfit, sans-serif',
                      cursor: 'pointer', border: 'none', borderRadius: '10px',
                      transition: 'all 0.2s ease',
                      ...(isJustSaved ? {
                        background: 'rgba(16, 185, 129, 0.15)',
                        color: '#34D399',
                        border: '1px solid rgba(16, 185, 129, 0.4)',
                      } : {
                        background: 'linear-gradient(135deg, #ECC86A 0%, #D8B257 50%, #C49B38 100%)',
                        color: '#0A0D14',
                        boxShadow: '0 4px 14px rgba(216, 178, 87, 0.35)',
                      }),
                    }}
                  >
                    {isJustSaved ? (
                      <><Check size={14} /> Saved!</>
                    ) : (
                      <><Save size={13} /> Update Tariff</>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── 3. Footer Info Strip ─────────────────────────────────── */}
      <div style={{
        padding: '14px 20px',
        borderRadius: '14px',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid rgba(255, 255, 255, 0.06)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '12px',
        flexWrap: 'wrap',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TrendingUp size={14} style={{ color: '#ECC86A' }} />
          <span style={{ fontSize: '0.74rem', color: '#64748B', fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            All fare changes are applied <strong style={{ color: '#94A3B8' }}>immediately</strong> to live fare calculation engine and the Customer App.
          </span>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {fleetClasses.map((f) => (
            <div key={f.id} style={{
              fontSize: '0.68rem', fontWeight: 700,
              color: GOLD.text, background: GOLD.bg,
              border: `1px solid ${GOLD.border}`,
              padding: '3px 10px', borderRadius: '20px',
            }}>
              {f.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { MapPin, Plus, CheckCircle2, Globe, Search } from 'lucide-react';

export default function CitiesView({ cities, onOpenAddModal, onUpdateCity }) {
  const [search, setSearch] = useState('');

  const filteredCities = cities.filter((c) => {
    return (
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.country.toLowerCase().includes(search.toLowerCase()) ||
      c.currency.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header Bar */}
      <div className="aura-card" style={{
        padding: '18px 24px',
        background: 'linear-gradient(135deg, rgba(22, 28, 41, 0.95) 0%, rgba(12, 15, 23, 0.95) 100%)',
        border: '1px solid rgba(216, 178, 87, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{
            width: '40px',
            height: '40px',
            borderRadius: '10px',
            background: 'rgba(216, 178, 87, 0.1)',
            border: '1px solid rgba(216, 178, 87, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--gold-primary)',
          }}>
            <MapPin size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 className="font-display" style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFF', margin: 0 }}>
                European Expansion & City Service Areas ({cities.length})
              </h3>
              <span className="gold-pill">ZONE CONFIGURATOR</span>
            </div>
            <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', margin: 0, marginTop: '2px' }}>
              London HQ, Paris, Nice & Côte d'Azur, Manchester, Geneva base multipliers and operating status
            </p>
          </div>
        </div>

        <button onClick={onOpenAddModal} className="btn-aura-primary">
          <Plus size={14} />
          Add Expansion City
        </button>
      </div>

      {/* Enterprise Data Table */}
      <div className="aura-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Operational Territory Zones
          </h4>

          <div style={{ position: 'relative', width: '240px' }}>
            <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search territory, country..."
              className="aura-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: '32px', height: '32px', fontSize: '0.78rem' }}
            />
          </div>
        </div>

        <div className="aura-table-wrapper">
          <table className="aura-table">
            <thead>
              <tr>
                <th>City / Territory</th>
                <th>Country</th>
                <th>Currency</th>
                <th>Tariff Multiplier</th>
                <th>Coordinates</th>
                <th>Coverage Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCities.map((city) => (
                <tr key={city.id}>
                  <td>
                    <div style={{ fontWeight: 800, fontSize: '0.86rem', color: '#FFF', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <MapPin size={14} color="var(--gold-primary)" />
                      {city.name}
                    </div>
                  </td>

                  <td>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{city.country}</div>
                  </td>

                  <td>
                    <span className="font-mono" style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--gold-primary)', background: 'rgba(216, 178, 87, 0.12)', padding: '2px 7px', borderRadius: '4px' }}>
                      {city.currency}
                    </span>
                  </td>

                  <td>
                    <span className="font-num" style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--gold-bright)' }}>
                      {city.baseMultiplier?.toFixed(2)}x
                    </span>
                  </td>

                  <td>
                    <span className="font-mono" style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {city.lat?.toFixed(2)}, {city.lng?.toFixed(2)}
                    </span>
                  </td>

                  <td>
                    <span className={`badge-status ${city.isActive ? 'badge-completed' : 'badge-cancelled'}`}>
                      {city.isActive ? 'Active Coverage' : 'Standby'}
                    </span>
                  </td>

                  <td>
                    <button
                      onClick={() => onUpdateCity(city.id, { isActive: !city.isActive })}
                      className="btn-aura-secondary"
                      style={{ padding: '4px 9px', fontSize: '0.7rem' }}
                    >
                      {city.isActive ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

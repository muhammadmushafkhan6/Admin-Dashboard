import React, { useState } from 'react';
import { Car, Plus, CheckCircle2, ShieldCheck, Search, Wrench, Sparkles } from 'lucide-react';

export default function VehiclesView({ vehicles, fleetClasses, onOpenAddModal, onUpdateVehicle }) {
  const [search, setSearch] = useState('');

  const filteredVehicles = vehicles.filter((v) => {
    return (
      v.makeModel.toLowerCase().includes(search.toLowerCase()) ||
      v.plateNumber.toLowerCase().includes(search.toLowerCase()) ||
      v.color.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Header Bar */}
      <div className="aura-card" style={{
        padding: '20px 24px',
        background: 'linear-gradient(135deg, rgba(22, 28, 41, 0.95) 0%, rgba(12, 15, 23, 0.95) 100%)',
        border: '1px solid rgba(216, 178, 87, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div style={{
            width: '44px',
            height: '44px',
            borderRadius: '12px',
            background: 'rgba(216, 178, 87, 0.1)',
            border: '1px solid rgba(216, 178, 87, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--gold-primary)',
          }}>
            <Car size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFF', margin: 0 }}>
                Luxury Fleet Asset Inventory ({vehicles.length})
              </h3>
              <span className="gold-pill">MOT & SAFETY AUDIT</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0, marginTop: '3px' }}>
              Annual DVSA MOT Inspection • Chauffeur Safety Audits • First Class & Business Fleet Classes
            </p>
          </div>
        </div>

        <button onClick={onOpenAddModal} className="btn-aura-primary">
          <Plus size={15} />
          Register Fleet Vehicle
        </button>
      </div>

      {/* Table Container */}
      <div className="aura-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h4 style={{ fontSize: '0.96rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Registered Luxury Vehicles
            </h4>
          </div>

          <div style={{ position: 'relative', width: '240px' }}>
            <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search plate, model..."
              className="aura-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: '32px', height: '34px', fontSize: '0.78rem' }}
            />
          </div>
        </div>

        <div className="aura-table-wrapper">
          <table className="aura-table">
            <thead>
              <tr>
                <th>Vehicle Model</th>
                <th>Registration Plate</th>
                <th>Year & Finish</th>
                <th>Fleet Tier Class</th>
                <th>DVSA MOT & Safety</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredVehicles.map((vehicle) => {
                const isActive = vehicle.status === 'ACTIVE';
                return (
                  <tr key={vehicle.id}>
                    <td>
                      <div style={{ fontWeight: 700, fontSize: '0.86rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Car size={16} color="var(--gold-primary)" />
                        {vehicle.makeModel}
                      </div>
                    </td>
                    <td>
                      <span className="uk-plate">
                        {vehicle.plateNumber}
                      </span>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>{vehicle.year}</div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{vehicle.color}</div>
                    </td>
                    <td>
                      <span className="gold-pill" style={{ padding: '2px 8px', fontSize: '0.7rem' }}>
                        {vehicle.fleetClass?.name || 'Executive Class'}
                      </span>
                    </td>
                    <td>
                      <span style={{ fontSize: '0.76rem', color: '#34D399', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
                        <ShieldCheck size={14} /> Annual MOT Passed
                      </span>
                    </td>
                    <td>
                      <span className={`badge-status ${isActive ? 'badge-completed' : 'badge-searching'}`}>
                        {vehicle.status}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => onUpdateVehicle(vehicle.id, { status: isActive ? 'MAINTENANCE' : 'ACTIVE' })}
                        className="btn-aura-secondary"
                        style={{ padding: '5px 10px', fontSize: '0.72rem' }}
                      >
                        {isActive ? 'Set Maintenance' : 'Set Active'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

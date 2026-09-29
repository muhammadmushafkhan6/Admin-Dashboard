import React, { useState } from 'react';
import { Hotel, Plus, CheckCircle2, ShieldCheck, MapPin, Search } from 'lucide-react';

export default function HotelAccountsView({ hotels, onOpenAddModal, onUpdateHotel }) {
  const [search, setSearch] = useState('');

  const filteredHotels = hotels.filter((h) => {
    return (
      h.hotelName.toLowerCase().includes(search.toLowerCase()) ||
      h.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
      h.city.toLowerCase().includes(search.toLowerCase()) ||
      h.email.toLowerCase().includes(search.toLowerCase())
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
            <Hotel size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 className="font-display" style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFF', margin: 0 }}>
                Luxury Hotel Concierge Portals ({hotels.length})
              </h3>
              <span className="gold-pill">5★ CONCIERGE DIRECT</span>
            </div>
            <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', margin: 0, marginTop: '2px' }}>
              The Ritz London, Savoy, Claridge's Mayfair concierge desk billing and guest transfer logs
            </p>
          </div>
        </div>

        <button onClick={onOpenAddModal} className="btn-aura-primary">
          <Plus size={14} />
          Register Hotel Partner
        </button>
      </div>

      {/* Enterprise Data Table */}
      <div className="aura-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Registered 5-Star Hotel Accounts
          </h4>

          <div style={{ position: 'relative', width: '240px' }}>
            <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search hotel property, lead..."
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
                <th>Hotel Property</th>
                <th>Concierge Lead</th>
                <th>Location</th>
                <th>Portal Login PIN</th>
                <th>Guest Transfers</th>
                <th>Credit Limit</th>
                <th>Desk Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredHotels.map((hotel) => (
                <tr key={hotel.id}>
                  <td>
                    <div style={{ fontWeight: 800, fontSize: '0.86rem', color: '#FFF' }}>{hotel.hotelName}</div>
                    <span className="gold-pill" style={{ fontSize: '0.64rem', padding: '1px 6px', marginTop: '2px' }}>5★ Luxury</span>
                  </td>

                  <td>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>{hotel.contactPerson || 'Head Concierge'}</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{hotel.phone}</div>
                  </td>

                  <td>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>📍 {hotel.city}</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{hotel.address}</div>
                  </td>

                  <td>
                    <span className="font-mono" style={{ padding: '2px 8px', borderRadius: '6px', background: 'rgba(216, 178, 87, 0.15)', border: '1px solid var(--border-gold)', color: 'var(--gold-bright)', fontWeight: 800, fontSize: '0.78rem' }}>
                      🔑 {hotel.accessPin || '1234'}
                    </span>
                  </td>

                  <td>
                    <span className="font-num" style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                      {hotel.totalBookings || 0} Transfers
                    </span>
                  </td>

                  <td>
                    <span className="font-num" style={{ fontWeight: 800, fontSize: '0.88rem', color: 'var(--gold-bright)' }}>
                      £{(hotel.creditLimit || 50000).toLocaleString()}
                    </span>
                  </td>

                  <td>
                    <span style={{ fontSize: '0.74rem', color: 'var(--accent-sky)' }}>{hotel.email}</span>
                  </td>

                  <td>
                    <span className={`badge-status ${hotel.isApproved ? 'badge-completed' : 'badge-cancelled'}`}>
                      {hotel.isApproved ? 'Approved' : 'Suspended'}
                    </span>
                  </td>

                  <td>
                    <button
                      onClick={() => onUpdateHotel(hotel.id, { isApproved: !hotel.isApproved })}
                      className="btn-aura-secondary"
                      style={{ padding: '4px 9px', fontSize: '0.7rem' }}
                    >
                      {hotel.isApproved ? 'Suspend' : 'Approve'}
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

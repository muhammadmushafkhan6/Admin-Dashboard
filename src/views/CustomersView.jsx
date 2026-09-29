import React, { useState } from 'react';
import { Users, Star, Phone, Mail, Award, CheckCircle2, Search } from 'lucide-react';

export default function CustomersView({ users }) {
  const [search, setSearch] = useState('');

  const filteredUsers = users.filter((u) => {
    return (
      u.fullName.toLowerCase().includes(search.toLowerCase()) ||
      u.phone.includes(search) ||
      u.email.toLowerCase().includes(search.toLowerCase())
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
            <Users size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFF', margin: 0 }}>
                VIP Customer Directory ({users.length})
              </h3>
              <span className="gold-pill">CLIENTELE PROFILES</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0, marginTop: '3px' }}>
              Private clients, concierge VIP members, and customer trip history
            </p>
          </div>
        </div>

        <div style={{ position: 'relative', width: '260px' }}>
          <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search client, phone, email..."
            className="aura-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '32px', height: '36px', fontSize: '0.8rem' }}
          />
        </div>
      </div>

      {/* Table */}
      <div className="aura-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="aura-table-wrapper">
          <table className="aura-table">
            <thead>
              <tr>
                <th>VIP Passenger</th>
                <th>Contact Details</th>
                <th>Membership Tier</th>
                <th>Completed Trips</th>
                <th>Account Status</th>
                <th>Member Since</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
                    No customer accounts registered yet.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                          <div style={{
                            width: '36px',
                            height: '36px',
                            borderRadius: '50%',
                            background: '#161D2D',
                            border: '1px solid var(--border-subtle)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--gold-primary)',
                            fontWeight: 800,
                            fontSize: '0.84rem',
                          }}>
                            {(user.fullName || 'VIP').charAt(0)}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.86rem' }}>{user.fullName || 'VIP Passenger'}</div>
                            <div className="font-mono" style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>ID: {user.id.slice(0, 8)}</div>
                          </div>
                        </div>
                      </td>

                      <td>
                        <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>{user.phone}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{user.email || 'No email'}</div>
                      </td>

                      <td>
                        <span className="gold-pill" style={{ padding: '2px 8px', fontSize: '0.7rem', fontWeight: 700 }}>
                          <Award size={11} /> {user.membershipLevel || 'Diamond VIP'}
                        </span>
                      </td>

                      <td>
                        <span className="font-num" style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                          {user.totalRides || user._count?.rides || 0} Trips
                        </span>
                      </td>

                      <td>
                        <span className="badge-status badge-completed">
                          <CheckCircle2 size={11} /> Verified VIP
                        </span>
                      </td>

                      <td style={{ fontSize: '0.76rem', color: 'var(--text-muted)' }}>
                        {new Date(user.createdAt).toLocaleDateString('en-GB')}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

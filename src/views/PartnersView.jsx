import React, { useState } from 'react';
import { Briefcase, Plus, CheckCircle2, ShieldCheck, TrendingUp, Search } from 'lucide-react';

export default function PartnersView({ partners, onOpenAddModal, onUpdatePartner }) {
  const [search, setSearch] = useState('');

  const filteredPartners = partners.filter((p) => {
    return (
      p.partnerName.toLowerCase().includes(search.toLowerCase()) ||
      p.city.toLowerCase().includes(search.toLowerCase()) ||
      p.contactEmail.toLowerCase().includes(search.toLowerCase())
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
            <Briefcase size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 className="font-display" style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFF', margin: 0 }}>
                Regional Fleet Partners & Luxury Car Clubs ({partners.length})
              </h3>
              <span className="gold-pill">REGIONAL PARTNER NETWORK</span>
            </div>
            <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', margin: 0, marginTop: '2px' }}>
              Approved luxury fleet operators in London, Paris, and the French Riviera fulfilling regional demand
            </p>
          </div>
        </div>

        <button onClick={onOpenAddModal} className="btn-aura-primary">
          <Plus size={14} />
          Onboard Fleet Partner
        </button>
      </div>

      {/* Enterprise Data Table */}
      <div className="aura-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Approved Regional Luxury Car Providers
          </h4>

          <div style={{ position: 'relative', width: '240px' }}>
            <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search partner fleet, city..."
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
                <th>Fleet Partner Provider</th>
                <th>Operating City</th>
                <th>Active Cars</th>
                <th>Commission</th>
                <th>Disbursed Yield</th>
                <th>Operations Email</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredPartners.map((partner) => (
                <tr key={partner.id}>
                  <td>
                    <div style={{ fontWeight: 800, fontSize: '0.86rem', color: '#FFF' }}>{partner.partnerName}</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{partner.phone}</div>
                  </td>

                  <td>
                    <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                      📍 {partner.city}
                    </span>
                  </td>

                  <td>
                    <span className="font-num" style={{ fontWeight: 800, fontSize: '0.9rem' }}>
                      {partner.fleetCount} Cars
                    </span>
                  </td>

                  <td>
                    <span className="gold-pill" style={{ fontSize: '0.68rem', padding: '1px 6px' }}>
                      {partner.commissionRate}% Commission
                    </span>
                  </td>

                  <td>
                    <span className="font-num" style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--accent-emerald)' }}>
                      £{(partner.totalEarnings || 0).toLocaleString('en-GB', { minimumFractionDigits: 2 })}
                    </span>
                  </td>

                  <td>
                    <span style={{ fontSize: '0.74rem', color: 'var(--accent-sky)' }}>{partner.contactEmail}</span>
                  </td>

                  <td>
                    <span className={`badge-status ${partner.isApproved ? 'badge-completed' : 'badge-cancelled'}`}>
                      {partner.isApproved ? 'Approved' : 'Suspended'}
                    </span>
                  </td>

                  <td>
                    <button
                      onClick={() => onUpdatePartner(partner.id, { isApproved: !partner.isApproved })}
                      className="btn-aura-secondary"
                      style={{ padding: '4px 9px', fontSize: '0.7rem' }}
                    >
                      {partner.isApproved ? 'Suspend' : 'Approve'}
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

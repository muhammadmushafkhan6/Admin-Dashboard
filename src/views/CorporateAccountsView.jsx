import React, { useState } from 'react';
import { Building2, Plus, CheckCircle2, FileText, Search } from 'lucide-react';

export default function CorporateAccountsView({ corporates, onOpenAddModal, onUpdateCorporate }) {
  const [search, setSearch] = useState('');

  const filteredCorporates = corporates.filter((c) => {
    return (
      c.companyName.toLowerCase().includes(search.toLowerCase()) ||
      c.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
      c.billingEmail.toLowerCase().includes(search.toLowerCase()) ||
      c.vatNumber?.toLowerCase().includes(search.toLowerCase())
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
            <Building2 size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 className="font-display" style={{ fontSize: '1.15rem', fontWeight: 800, color: '#FFF', margin: 0 }}>
                Corporate Client Accounts & Portals ({corporates.length})
              </h3>
              <span className="gold-pill">B2B DIRECT BILLING</span>
            </div>
            <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', margin: 0, marginTop: '2px' }}>
              Investment banks, consulting leaders & private wealth offices with NET-30 direct monthly invoicing
            </p>
          </div>
        </div>

        <button onClick={onOpenAddModal} className="btn-aura-primary">
          <Plus size={14} />
          Register Corporate Client
        </button>
      </div>

      {/* Enterprise Data Table */}
      <div className="aura-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '14px 20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
            Corporate Portals & Direct Invoicing Ledgers
          </h4>

          <div style={{ position: 'relative', width: '240px' }}>
            <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search company, VAT, email..."
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
                <th>Company Entity</th>
                <th>Account Lead</th>
                <th>VAT Reg</th>
                <th>Billing Terms</th>
                <th>Executive Bookings</th>
                <th>Billing Desk</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCorporates.map((corp) => (
                <tr key={corp.id}>
                  <td>
                    <div style={{ fontWeight: 800, fontSize: '0.86rem', color: '#FFF' }}>{corp.companyName}</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>📍 {corp.city}</div>
                  </td>

                  <td>
                    <div style={{ fontSize: '0.82rem', fontWeight: 600 }}>{corp.contactPerson || 'Mobility Lead'}</div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{corp.phone}</div>
                  </td>

                  <td>
                    <span className="font-mono" style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {corp.vatNumber || 'GB-PENDING'}
                    </span>
                  </td>

                  <td>
                    <span className="font-mono" style={{ fontSize: '0.7rem', fontWeight: 700, background: 'rgba(56, 189, 248, 0.15)', color: 'var(--accent-sky)', padding: '2px 7px', borderRadius: '4px' }}>
                      {corp.creditTerms || 'NET_30'}
                    </span>
                  </td>

                  <td>
                    <span className="font-num" style={{ fontWeight: 800, fontSize: '0.9rem', color: 'var(--gold-bright)' }}>
                      {corp.totalBookings || 0} Transfers
                    </span>
                  </td>

                  <td>
                    <span style={{ fontSize: '0.74rem', color: 'var(--accent-sky)' }}>{corp.billingEmail}</span>
                  </td>

                  <td>
                    <span className={`badge-status ${corp.isApproved ? 'badge-completed' : 'badge-cancelled'}`}>
                      {corp.isApproved ? 'Active' : 'Suspended'}
                    </span>
                  </td>

                  <td>
                    <button
                      onClick={() => onUpdateCorporate(corp.id, { isApproved: !corp.isApproved })}
                      className="btn-aura-secondary"
                      style={{ padding: '4px 9px', fontSize: '0.7rem' }}
                    >
                      {corp.isApproved ? 'Suspend' : 'Approve'}
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

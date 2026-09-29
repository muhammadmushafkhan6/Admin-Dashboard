import React from 'react';
import { LifeBuoy, CheckCircle2, Clock, AlertCircle, MessageSquare } from 'lucide-react';

export default function SupportDeskView({ supportTickets, onUpdateSupportTicket }) {
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
            <LifeBuoy size={24} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 className="font-display" style={{ fontSize: '1.2rem', fontWeight: 800, color: '#FFF', margin: 0 }}>
                Priority VIP Support & Incident Helpdesk ({supportTickets.length})
              </h3>
              <span className="gold-pill">INCIDENT QUEUE</span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0, marginTop: '3px' }}>
              Customer inquiries, lost property reports, corporate billing questions & concierge assistance
            </p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="aura-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div className="aura-table-wrapper">
          <table className="aura-table">
            <thead>
              <tr>
                <th>Ticket ID</th>
                <th>VIP Passenger</th>
                <th>Inquiry Subject</th>
                <th>Message Content</th>
                <th>Status</th>
                <th>Created</th>
                <th>Resolution Action</th>
              </tr>
            </thead>
            <tbody>
              {supportTickets.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
                    No support tickets currently open. All inquiries resolved!
                  </td>
                </tr>
              ) : (
                supportTickets.map((ticket) => {
                  const isResolved = ticket.status === 'RESOLVED';
                  return (
                    <tr key={ticket.id}>
                      <td>
                        <span className="font-mono" style={{ fontWeight: 700, color: 'var(--gold-primary)', fontSize: '0.8rem' }}>
                          #{ticket.id.slice(0, 8)}
                        </span>
                      </td>
                      <td>
                        <div style={{ fontWeight: 700, fontSize: '0.84rem' }}>{ticket.user?.fullName || 'VIP Client'}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>{ticket.user?.phone}</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600, color: '#FFF', fontSize: '0.84rem' }}>{ticket.subject}</div>
                      </td>
                      <td style={{ maxWidth: '280px', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
                        {ticket.message}
                      </td>
                      <td>
                        <span className={`badge-status ${isResolved ? 'badge-completed' : 'badge-searching'}`}>
                          {ticket.status}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                        {new Date(ticket.createdAt).toLocaleDateString('en-GB')}
                      </td>
                      <td>
                        {!isResolved ? (
                          <button
                            onClick={() => onUpdateSupportTicket(ticket.id, { status: 'RESOLVED' })}
                            className="btn-aura-primary"
                            style={{ padding: '5px 11px', fontSize: '0.72rem' }}
                          >
                            <CheckCircle2 size={13} /> Resolve
                          </button>
                        ) : (
                          <button
                            onClick={() => onUpdateSupportTicket(ticket.id, { status: 'OPEN' })}
                            className="btn-aura-secondary"
                            style={{ padding: '4px 9px', fontSize: '0.7rem' }}
                          >
                            Reopen
                          </button>
                        )}
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

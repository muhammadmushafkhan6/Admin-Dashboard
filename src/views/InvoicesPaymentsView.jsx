import React, { useState } from 'react';
import { FileSpreadsheet, Download, CheckCircle, CreditCard, DollarSign, ArrowUpRight } from 'lucide-react';

export default function InvoicesPaymentsView({ invoicesData, rides }) {
  const [search, setSearch] = useState('');

  const completedPaidRides = rides.filter(r => r.status === 'COMPLETED' || r.isPaid);

  const grossTotal = invoicesData?.summary?.totalGross || completedPaidRides.reduce((acc, r) => acc + (r.fareAmount || 0), 0);
  const vatTotal = grossTotal * 0.20; // 20% UK VAT
  const netTotal = grossTotal - vatTotal;

  const filteredRides = completedPaidRides.filter(r => {
    return (
      r.id.toLowerCase().includes(search.toLowerCase()) ||
      r.user?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      r.pickupAddress?.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Financial Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        <div className="aura-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Gross Platform Settlement
          </span>
          <div className="font-num" style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--gold-bright)', marginTop: '10px' }}>
            £{grossTotal.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--accent-emerald)', marginTop: '6px' }}>
            Stripe & Corporate direct settlements
          </div>
        </div>

        <div className="aura-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            UK VAT (20%) Output Tax
          </span>
          <div className="font-num" style={{ fontSize: '1.85rem', fontWeight: 800, color: '#38BDF8', marginTop: '10px' }}>
            £{vatTotal.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            HMRC Digital compliant output ledger
          </div>
        </div>

        <div className="aura-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Net Operating Yield
          </span>
          <div className="font-num" style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '10px' }}>
            £{netTotal.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            Net earnings after statutory deduction
          </div>
        </div>
      </div>

      {/* Invoice Ledgers Table */}
      <div className="aura-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ padding: '18px 20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              UK VAT Tax Invoices & Digital Receipts
            </h3>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0, marginTop: '2px' }}>
              Itemized invoice ledgers with base tariffs, distance mileage, and payment confirmation IDs.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '10px' }}>
            <input
              type="text"
              placeholder="Search invoice ref, client..."
              className="aura-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ width: '220px', height: '34px', fontSize: '0.78rem' }}
            />
          </div>
        </div>

        <div className="aura-table-wrapper">
          <table className="aura-table">
            <thead>
              <tr>
                <th>Invoice Ref</th>
                <th>VIP Passenger</th>
                <th>Service Class</th>
                <th>Gross Fare</th>
                <th>VAT (20%)</th>
                <th>Net Total</th>
                <th>Method</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredRides.length === 0 ? (
                <tr>
                  <td colSpan={8} style={{ textAlign: 'center', padding: '48px', color: 'var(--text-muted)' }}>
                    No completed invoice records yet. Complete trips in the app to generate automated VAT invoices.
                  </td>
                </tr>
              ) : (
                filteredRides.map((ride) => {
                  const fare = ride.fareAmount || 0;
                  const vat = fare * 0.20;
                  const net = fare - vat;

                  return (
                    <tr key={ride.id}>
                      <td>
                        <span className="font-mono" style={{ fontWeight: 800, color: 'var(--gold-primary)', fontSize: '0.8rem' }}>
                          INV-UK-{ride.id.slice(0, 6).toUpperCase()}
                        </span>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {new Date(ride.createdAt).toLocaleDateString('en-GB')}
                        </div>
                      </td>

                      <td>
                        <div style={{ fontWeight: 700, fontSize: '0.84rem' }}>{ride.user?.fullName || 'Private Client'}</div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>{ride.user?.phone}</div>
                      </td>

                      <td>
                        <span className="gold-pill" style={{ padding: '2px 8px', fontSize: '0.7rem' }}>
                          {ride.fleetClass?.name || 'VIP Class'}
                        </span>
                      </td>

                      <td>
                        <span className="font-num" style={{ fontWeight: 800, color: 'var(--gold-bright)' }}>
                          £{fare.toFixed(2)}
                        </span>
                      </td>

                      <td>
                        <span className="font-num" style={{ color: 'var(--text-secondary)' }}>
                          £{vat.toFixed(2)}
                        </span>
                      </td>

                      <td>
                        <span className="font-num" style={{ fontWeight: 800, color: 'var(--accent-emerald)' }}>
                          £{net.toFixed(2)}
                        </span>
                      </td>

                      <td>
                        <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <CreditCard size={13} color="var(--gold-primary)" /> {ride.paymentMethod || 'Stripe Card'}
                        </span>
                      </td>

                      <td>
                        <span className="badge-status badge-completed">
                          <CheckCircle size={11} /> Settled
                        </span>
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

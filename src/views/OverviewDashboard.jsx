import React, { useState } from 'react';
import {
  TrendingUp,
  Radio,
  UserCheck,
  Users,
  Car,
  Hotel,
  Building2,
  Briefcase,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  Sparkles,
  MapPin,
  Clock,
  Compass,
  Plane,
  ChevronRight,
  Plus,
  Send
} from 'lucide-react';

export default function OverviewDashboard({ stats, rides, chauffeurs, setActiveTab, onOpenAssignModal }) {
  const activeRides = rides.filter(r => ['SEARCHING', 'CONFIRMED', 'CHAUFFEUR_EN_ROUTE', 'ARRIVED', 'IN_PROGRESS'].includes(r.status));
  const pendingRides = rides.filter(r => r.status === 'SEARCHING');
  const completedRides = rides.filter(r => r.status === 'COMPLETED');
  const totalGrossRevenue = completedRides.reduce((acc, r) => acc + (r.fareAmount || 0), 0);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* 1. Executive Telemetry Bar */}
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
            <Radio size={22} className="spin-slow" />
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 className="font-display" style={{ fontSize: '1.25rem', fontWeight: 800, color: '#FFF', margin: 0 }}>
                Global Chauffeur Dispatch System
              </h3>
              <span className="gold-pill">
                <div className="radar-pulse green" style={{ width: '5px', height: '5px' }} />
                REAL-TIME LIVE
              </span>
            </div>
            <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', margin: 0, marginTop: '3px' }}>
              Connected to UK & European City Zones • TfL PCO Licenced Chauffeur Dispatch
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button onClick={() => setActiveTab('dispatch')} className="btn-aura-primary">
            <Radio size={14} />
            Open Live Dispatch Radar
          </button>
          <button onClick={() => setActiveTab('chauffeurs')} className="btn-aura-secondary">
            <UserCheck size={14} />
            Verify Roster
          </button>
        </div>
      </div>

      {/* 2. Sleek KPI Metrics Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '16px' }}>
        {/* Card 1: Gross Platform Revenue */}
        <div className="aura-card aura-card-hover" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Gross Settled Revenue
            </span>
            <div style={{ padding: '6px', borderRadius: '8px', background: 'rgba(216, 178, 87, 0.12)', color: 'var(--gold-primary)' }}>
              <TrendingUp size={16} />
            </div>
          </div>

          <div className="font-num" style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--gold-bright)', marginTop: '10px' }}>
            £{totalGrossRevenue.toLocaleString('en-GB', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>

          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>{completedRides.length}</span> settled VIP bookings
          </div>
        </div>

        {/* Card 2: Active VIP Trips */}
        <div className="aura-card aura-card-hover" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Active VIP Trips
            </span>
            <div style={{ padding: '6px', borderRadius: '8px', background: 'rgba(56, 189, 248, 0.12)', color: 'var(--accent-sky)' }}>
              <Radio size={16} />
            </div>
          </div>

          <div className="font-num" style={{ fontSize: '1.85rem', fontWeight: 800, color: '#FFF', marginTop: '10px' }}>
            {activeRides.length}
          </div>

          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            {pendingRides.length > 0 ? (
              <span style={{ color: '#FBBF24', fontWeight: 600 }}>{pendingRides.length} pending assignment</span>
            ) : (
              <span>All active bookings assigned</span>
            )}
          </div>
        </div>

        {/* Card 3: Licensed Chauffeurs */}
        <div className="aura-card aura-card-hover" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Licensed Chauffeurs
            </span>
            <div style={{ padding: '6px', borderRadius: '8px', background: 'rgba(16, 185, 129, 0.12)', color: 'var(--accent-emerald)' }}>
              <UserCheck size={16} />
            </div>
          </div>

          <div className="font-num" style={{ fontSize: '1.85rem', fontWeight: 800, color: '#FFF', marginTop: '10px' }}>
            {chauffeurs.length}
          </div>

          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            <span style={{ color: 'var(--accent-emerald)', fontWeight: 600 }}>{chauffeurs.filter(c => c.isOnline).length} Online</span> • {chauffeurs.filter(c => c.isPcoVerified).length} PCO Verified
          </div>
        </div>

        {/* Card 4: B2B Accounts */}
        <div className="aura-card aura-card-hover" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
              Corporate & Hotel Portals
            </span>
            <div style={{ padding: '6px', borderRadius: '8px', background: 'rgba(168, 85, 247, 0.12)', color: 'var(--accent-purple)' }}>
              <Building2 size={16} />
            </div>
          </div>

          <div className="font-num" style={{ fontSize: '1.85rem', fontWeight: 800, color: '#FFF', marginTop: '10px' }}>
            {(stats?.totalHotels || 0) + (stats?.totalCorporates || 0) + (stats?.totalPartners || 0)}
          </div>

          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '6px' }}>
            {stats?.totalHotels || 0} Hotels • {stats?.totalCorporates || 0} Corporates • {stats?.totalPartners || 0} Partners
          </div>
        </div>
      </div>

      {/* 3. Main Operational Split Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.7fr 1fr', gap: '20px', alignItems: 'start' }}>
        {/* Left: Live Ride Dispatch Radar */}
        <div className="aura-card" style={{ padding: '0', overflow: 'hidden' }}>
          <div style={{
            padding: '18px 20px',
            borderBottom: '1px solid var(--border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
            <div>
              <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Radio size={16} color="var(--gold-primary)" />
                Live Dispatch Telemetry Stream
              </h3>
              <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0, marginTop: '2px' }}>
                Real-time booking radar synchronized with Customer App & Chauffeur Fleet
              </p>
            </div>

            <button onClick={() => setActiveTab('dispatch')} className="btn-aura-secondary" style={{ padding: '5px 10px', fontSize: '0.74rem' }}>
              Full Radar ➔
            </button>
          </div>

          {rides.length === 0 ? (
            <div style={{ padding: '48px 24px', textAlign: 'center' }}>
              <div style={{
                width: '50px',
                height: '50px',
                borderRadius: '50%',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
                color: 'var(--text-muted)',
              }}>
                <Radio size={22} />
              </div>
              <h4 style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                Awaiting Incoming VIP Bookings
              </h4>
              <p style={{ fontSize: '0.78rem', color: 'var(--text-muted)', maxWidth: '380px', margin: '6px auto 0' }}>
                Book a trip in the <b>Customer App</b> or assign from dispatch to view real-time GPS telemetry here live.
              </p>
            </div>
          ) : (
            <div className="aura-table-wrapper">
              <table className="aura-table">
                <thead>
                  <tr>
                    <th>Ref</th>
                    <th>Passenger</th>
                    <th>Class</th>
                    <th>Route</th>
                    <th>Status</th>
                    <th>Fare</th>
                    <th>Dispatch</th>
                  </tr>
                </thead>
                <tbody>
                  {rides.slice(0, 6).map((ride) => {
                    const statusClass = `badge-${ride.status.toLowerCase()}`;
                    return (
                      <tr key={ride.id}>
                        <td>
                          <span className="font-mono" style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--gold-primary)' }}>
                            #{ride.id.slice(0, 6)}
                          </span>
                        </td>
                        <td>
                          <div style={{ fontWeight: 700, fontSize: '0.82rem' }}>{ride.user?.fullName || 'VIP Client'}</div>
                          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>{ride.user?.phone}</div>
                        </td>
                        <td>
                          <span className="gold-pill" style={{ padding: '2px 7px', fontSize: '0.68rem' }}>
                            {ride.fleetClass?.name || 'First Class'}
                          </span>
                        </td>
                        <td style={{ maxWidth: '200px' }}>
                          <div style={{ fontSize: '0.78rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            📍 {ride.pickupAddress}
                          </div>
                          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                            🏁 {ride.dropoffAddress}
                          </div>
                        </td>
                        <td>
                          <span className={`badge-status ${statusClass}`}>
                            {ride.status.replace(/_/g, ' ')}
                          </span>
                        </td>
                        <td>
                          <span className="font-num" style={{ fontWeight: 800, color: 'var(--gold-bright)' }}>
                            £{ride.fareAmount?.toFixed(2)}
                          </span>
                        </td>
                        <td>
                          {ride.status === 'SEARCHING' ? (
                            <button
                              onClick={() => onOpenAssignModal(ride)}
                              className="btn-aura-primary"
                              style={{ padding: '4px 9px', fontSize: '0.72rem' }}
                            >
                              Assign
                            </button>
                          ) : (
                            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                              {ride.chauffeur?.fullName?.split(' ')[0] || 'Assigned'}
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Right Column: Chauffeur Live Availability Roster */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div className="aura-card" style={{ padding: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div>
                <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <UserCheck size={16} color="var(--accent-emerald)" />
                  Chauffeur Fleet Availability
                </h4>
                <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', margin: 0, marginTop: '2px' }}>
                  Real-time driver roster & PCO compliance
                </p>
              </div>

              <button onClick={() => setActiveTab('chauffeurs')} className="btn-aura-secondary" style={{ padding: '4px 8px', fontSize: '0.7rem' }}>
                All ➔
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {chauffeurs.map((driver) => (
                <div
                  key={driver.id}
                  style={{
                    padding: '10px 12px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ position: 'relative' }}>
                      <div style={{
                        width: '34px',
                        height: '34px',
                        borderRadius: '50%',
                        background: '#151C2C',
                        border: '1px solid var(--border-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--gold-primary)',
                        fontWeight: 800,
                        fontSize: '0.8rem',
                      }}>
                        {driver.fullName.charAt(0)}
                      </div>
                      <div style={{ position: 'absolute', bottom: '-1px', right: '-1px' }}>
                        <div className={`radar-pulse ${driver.isOnline ? 'green' : ''}`} style={{ width: '6px', height: '6px', background: driver.isOnline ? '#10B981' : '#64748B' }} />
                      </div>
                    </div>

                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                        {driver.fullName}
                      </div>
                      <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                        {driver.vehicleModel?.split(' ')[0] || 'Mercedes'} • <span className="font-mono">{driver.vehiclePlate}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right' }}>
                    <span style={{ fontSize: '0.72rem', color: '#FBBF24', fontWeight: 700 }}>
                      ★ {driver.rating?.toFixed(1) || '5.0'}
                    </span>
                    <div style={{ fontSize: '0.64rem', color: driver.isPcoVerified ? '#34D399' : 'var(--text-muted)', fontWeight: 600 }}>
                      {driver.isPcoVerified ? 'PCO Approved' : 'Audit'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

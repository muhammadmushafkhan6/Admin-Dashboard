import React from 'react';
import { BarChart3, TrendingUp, CheckCircle, PieChart, Layers, ShieldCheck, MapPin } from 'lucide-react';

export default function ReportsAnalyticsView({ reportsData, rides, fleetClasses, cities }) {
  const totalRides = rides.length;
  const completedRides = rides.filter(r => r.status === 'COMPLETED').length;
  const cancelledRides = rides.filter(r => r.status === 'CANCELLED').length;
  const completionRate = totalRides > 0 ? ((completedRides / totalRides) * 100).toFixed(1) : '100';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div className="vip-card" style={{ padding: '24px' }}>
        <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
          Executive BI & Operational Analytics
        </h3>
        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0, marginTop: '4px' }}>
          Platform metrics, fleet utilization breakdown, trip completion rates, and market penetration.
        </p>
      </div>

      {/* Metrics Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
        <div className="vip-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>TRIP COMPLETION RATE</span>
          <div className="font-mono-num" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent-emerald)', marginTop: '8px' }}>
            {completionRate}%
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Industry leading fulfillment
          </div>
        </div>

        <div className="vip-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>TOTAL EXECUTED BOOKINGS</span>
          <div className="font-mono-num" style={{ fontSize: '2rem', fontWeight: 800, color: '#FFF', marginTop: '8px' }}>
            {totalRides}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            Lifetime customer bookings
          </div>
        </div>

        <div className="vip-card" style={{ padding: '20px' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 700 }}>ACTIVE CITIES</span>
          <div className="font-mono-num" style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--gold-light)', marginTop: '8px' }}>
            {cities.filter(c => c.isActive).length}
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '4px' }}>
            London, Manchester, Paris & more
          </div>
        </div>
      </div>

      {/* Fleet Class Popularity Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div className="vip-card" style={{ padding: '24px' }}>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={18} color="var(--gold-primary)" /> Fleet Class Distribution
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {fleetClasses.map((fleet) => {
              const count = rides.filter(r => r.fleetClassId === fleet.id || r.fleetClass?.name === fleet.name).length;
              const percentage = totalRides > 0 ? ((count / totalRides) * 100).toFixed(0) : 0;

              return (
                <div key={fleet.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '6px' }}>
                    <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{fleet.name}</span>
                    <span className="font-mono-num" style={{ color: 'var(--gold-primary)', fontWeight: 700 }}>
                      {count} rides ({percentage}%)
                    </span>
                  </div>
                  <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${percentage}%`, height: '100%', background: 'linear-gradient(90deg, #E6CA85 0%, #AA8010 100%)', borderRadius: '4px', transition: 'width 0.4s ease' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="vip-card" style={{ padding: '24px' }}>
          <h4 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={18} color="var(--accent-sky)" /> City Operational Health
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {cities.map((city) => (
              <div key={city.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '10px', background: 'rgba(255, 255, 255, 0.02)', border: '1px solid var(--border-light)' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>{city.name}</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>{city.country} • Currency: {city.currency}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <span className="font-mono-num" style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--gold-light)' }}>
                    {city.baseMultiplier?.toFixed(2)}x Tariff
                  </span>
                  <div style={{ fontSize: '0.68rem', color: city.isActive ? 'var(--accent-emerald)' : 'var(--text-muted)' }}>
                    {city.isActive ? '● Live Dispatch' : '○ Standby'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

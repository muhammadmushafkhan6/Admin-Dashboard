import React, { useState, useEffect } from 'react';
import { Search, RefreshCw, Clock, Globe, ShieldCheck, Bell, Sparkles } from 'lucide-react';

export default function Header({ activeTab, onRefresh, isRefreshing, searchQuery, setSearchQuery, adminUser }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  const getTabHeading = () => {
    switch (activeTab) {
      case 'overview': return { title: 'Operations Command Center', subtitle: 'Live executive overview & fleet telemetry' };
      case 'dispatch': return { title: 'Live Dispatch Terminal', subtitle: 'Real-time booking radar & flight coordination' };
      case 'chauffeurs': return { title: 'Chauffeur Licensing & Roster', subtitle: 'TfL PCO badges, DBS checks & insurance audit' };
      case 'vehicles': return { title: 'Luxury Fleet Inventory', subtitle: 'MOT certification, vehicle specs & maintenance' };
      case 'fleet-pricing': return { title: 'Vehicle Tier Tariffs', subtitle: 'Dynamic base rates, mileage pricing & amenities' };
      case 'customers': return { title: 'VIP Client Directory', subtitle: 'Private clientele profiles & membership tiers' };
      case 'cities': return { title: 'Multi-City Coverage', subtitle: 'European expansion zones & tariff multipliers' };
      case 'hotels': return { title: 'Hotel Concierge Portals', subtitle: '5-star hotel concierge accounts & guest transfers' };
      case 'corporates': return { title: 'Corporate Portals', subtitle: 'Direct billing accounts & NET-30 invoicing' };
      case 'partners': return { title: 'Regional Fleet Partners', subtitle: 'Affiliate luxury transport providers across UK/EU' };
      case 'invoices': return { title: 'VAT Ledgers & Invoicing', subtitle: 'Statutory 20% UK VAT records & digital receipts' };
      case 'reports': return { title: 'Executive BI Analytics', subtitle: 'Yield rates, fulfillment ratios & performance metrics' };
      case 'support': return { title: 'Priority Helpdesk', subtitle: 'Incident management & client assistance queue' };
      default: return { title: 'LumeDrive Console', subtitle: 'Global dispatch system' };
    }
  };

  const currentHeading = getTabHeading();
  const initials = adminUser?.fullName
    ? adminUser.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'HQ';
  const displayName = adminUser?.fullName || 'VIP Dispatch Desk';
  const roleLabel = adminUser?.role === 'SUPER_ADMIN'
    ? 'Super Admin'
    : adminUser?.role === 'DISPATCHER'
    ? 'Head of Dispatch'
    : adminUser?.role === 'AUDITOR'
    ? 'Compliance Auditor'
    : 'Administrator';

  return (
    <header style={{
      height: '72px',
      padding: '0 32px',
      borderBottom: '1px solid var(--border-subtle)',
      background: 'rgba(9, 12, 18, 0.75)',
      backdropFilter: 'blur(20px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 90,
    }}>
      {/* Left: Section Title & Breadcrumb */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div>
          <h2 className="font-display" style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
            {currentHeading.title}
          </h2>
          <p style={{ fontSize: '0.74rem', color: 'var(--text-muted)', margin: 0, marginTop: '2px' }}>
            {currentHeading.subtitle}
          </p>
        </div>
      </div>

      {/* Right: City Clock, Search, Sync, and Operator Card */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        {/* London Clock & Zones */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 12px',
          borderRadius: '8px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--border-subtle)',
        }}>
          <Clock size={14} color="var(--gold-primary)" />
          <span className="font-mono" style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            {time || '12:00:00'} GMT
          </span>
          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
            • London / Paris / Nice
          </span>
        </div>

        {/* Global Search Bar */}
        <div style={{ position: 'relative', width: '250px' }}>
          <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search reference, client..."
            className="aura-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{ paddingLeft: '34px', height: '36px', fontSize: '0.78rem' }}
          />
        </div>

        {/* Sync Button */}
        <button
          onClick={onRefresh}
          className="btn-aura-secondary"
          title="Force telemetry synchronization"
          style={{ height: '36px', padding: '0 12px' }}
        >
          <RefreshCw size={13} className={isRefreshing ? 'spin-anim' : ''} />
          <span style={{ fontSize: '0.76rem' }}>Sync</span>
        </button>

        {/* Operator Profile Card */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '5px 12px 5px 6px',
          borderRadius: '10px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-subtle)',
        }}>
          <div style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #F5DE88 0%, #D8B257 60%, #8F7228 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#080A0F',
            fontWeight: 800,
            fontSize: '0.76rem',
          }}>
            {initials}
          </div>
          <div>
            <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.1 }}>
              {displayName}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
              <div className="radar-pulse green" style={{ width: '5px', height: '5px' }} />
              <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>{roleLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

import React from 'react';
import {
  LayoutDashboard,
  Radio,
  UserCheck,
  Car,
  Users,
  Building2,
  Hotel,
  Briefcase,
  Layers,
  MapPin,
  FileSpreadsheet,
  BarChart3,
  LifeBuoy,
  Shield,
  Crown,
  ChevronRight,
  LogOut
} from 'lucide-react';

const SECTIONS = [
  {
    title: 'CORE DISPATCH',
    items: [
      { id: 'overview', label: 'Command Center', icon: LayoutDashboard },
      { id: 'dispatch', label: 'Live Dispatch Radar', icon: Radio, countKey: 'activeRidesCount', pulse: true },
    ]
  },
  {
    title: 'FLEET & COMPLIANCE',
    items: [
      { id: 'chauffeurs', label: 'Chauffeur Licensing', icon: UserCheck, countKey: 'totalChauffeurs' },
      { id: 'vehicles', label: 'Fleet Inventory', icon: Car, countKey: 'totalVehicles' },
      { id: 'fleet-pricing', label: 'Vehicle Tier Tariffs', icon: Layers },
    ]
  },
  {
    title: 'CLIENTS & B2B PORTALS',
    items: [
      { id: 'customers', label: 'VIP Clients', icon: Users, countKey: 'totalUsers' },
      { id: 'hotels', label: 'Hotel Concierge', icon: Hotel, countKey: 'totalHotels' },
      { id: 'corporates', label: 'Corporate Accounts', icon: Building2, countKey: 'totalCorporates' },
      { id: 'partners', label: 'Regional Partners', icon: Briefcase, countKey: 'totalPartners' },
      { id: 'cities', label: 'Cities & Zones', icon: MapPin, countKey: 'totalCities' },
    ]
  },
  {
    title: 'FINANCE & AUDIT',
    items: [
      { id: 'invoices', label: 'VAT Ledgers & Invoices', icon: FileSpreadsheet },
      { id: 'reports', label: 'Executive Analytics', icon: BarChart3 },
      { id: 'support', label: 'Priority Helpdesk', icon: LifeBuoy, countKey: 'openTicketsCount', alert: true },
    ]
  }
];

export default function Sidebar({ activeTab, setActiveTab, stats, onLogout }) {
  return (
    <aside style={{
      width: '270px',
      minWidth: '270px',
      background: 'linear-gradient(180deg, #0B0E14 0%, #07090D 100%)',
      borderRight: '1px solid var(--border-subtle)',
      display: 'flex',
      flexDirection: 'column',
      height: '100vh',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '4px 0 24px rgba(0,0,0,0.4)',
    }}>
      {/* Brand Header */}
      <div style={{
        padding: '22px 20px',
        borderBottom: '1px solid var(--border-subtle)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        background: 'rgba(255,255,255,0.01)',
      }}>
        <div style={{
          width: '38px',
          height: '38px',
          borderRadius: '10px',
          background: 'linear-gradient(135deg, #F5DE88 0%, #D8B257 60%, #8F7228 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 16px rgba(216, 178, 87, 0.35)',
          overflow: 'hidden',
          padding: '2px',
        }}>
          <img
            src="/logo.png"
            alt="LumeDrive Logo"
            style={{ width: '100%', height: '100%', objectFit: 'contain', borderRadius: '8px' }}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.parentElement.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#080A0F" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 6.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.735H5.81a1 1 0 0 1-.957-.735L2.02 7.02a.5.5 0 0 1 .798-.519l4.276 2.664a1 1 0 0 0 1.516-.294z"/></svg>';
            }}
          />
        </div>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span className="font-display gold-gradient-text" style={{ fontSize: '1.15rem', fontWeight: 800, letterSpacing: '0.02em' }}>
              LumeDrive
            </span>
            <span style={{ fontSize: '0.65rem', padding: '1px 5px', borderRadius: '4px', background: 'rgba(216, 178, 87, 0.15)', color: '#F5DE88', fontWeight: 800, letterSpacing: '0.05em' }}>
              PRO
            </span>
          </div>
          <p style={{ fontSize: '0.68rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '2px', fontWeight: 600 }}>
            Global Dispatch Console
          </p>
        </div>
      </div>

      {/* Navigation Sections */}
      <nav style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px 12px',
        display: 'flex',
        flexDirection: 'column',
        gap: '18px',
      }}>
        {SECTIONS.map((section, idx) => (
          <div key={idx}>
            <div style={{
              fontSize: '0.64rem',
              fontWeight: 800,
              color: 'var(--text-muted)',
              letterSpacing: '0.1em',
              padding: '0 12px 6px',
              textTransform: 'uppercase',
            }}>
              {section.title}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                const count = stats && item.countKey ? stats[item.countKey] : null;

                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '9px 12px',
                      borderRadius: '10px',
                      background: isActive 
                        ? 'linear-gradient(90deg, rgba(216, 178, 87, 0.16) 0%, rgba(216, 178, 87, 0.03) 100%)' 
                        : 'transparent',
                      border: isActive 
                        ? '1px solid rgba(216, 178, 87, 0.35)' 
                        : '1px solid transparent',
                      color: isActive ? '#FFFFFF' : 'var(--text-secondary)',
                      cursor: 'pointer',
                      transition: 'all 0.18s cubic-bezier(0.16, 1, 0.3, 1)',
                      textAlign: 'left',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) e.currentTarget.style.background = 'transparent';
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{
                        color: isActive ? 'var(--gold-primary)' : 'var(--text-muted)',
                        display: 'flex',
                        alignItems: 'center',
                      }}>
                        <Icon size={16} strokeWidth={isActive ? 2.3 : 1.8} />
                      </div>
                      <span style={{ fontSize: '0.82rem', fontWeight: isActive ? 700 : 500 }}>
                        {item.label}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      {item.pulse && (
                        <div className="radar-pulse green" style={{ width: '6px', height: '6px' }} />
                      )}

                      {count !== null && count !== undefined && count > 0 && (
                        <span className="font-mono" style={{
                          fontSize: '0.68rem',
                          padding: '1px 7px',
                          borderRadius: '9999px',
                          background: item.alert ? 'rgba(244, 63, 94, 0.18)' : 'rgba(255, 255, 255, 0.06)',
                          color: item.alert ? '#FB7185' : 'var(--text-secondary)',
                          fontWeight: 700,
                          border: item.alert ? '1px solid rgba(244, 63, 94, 0.4)' : '1px solid var(--border-subtle)',
                        }}>
                          {count}
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer System Status Card */}
      <div style={{
        padding: '14px 16px',
        borderTop: '1px solid var(--border-subtle)',
        background: 'rgba(0, 0, 0, 0.3)',
      }}>
        <div style={{
          padding: '10px 12px',
          borderRadius: '10px',
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--border-subtle)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <div className="radar-pulse green" style={{ width: '7px', height: '7px' }} />
            <div>
              <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                HQ Dispatch Online
              </div>
              <div style={{ fontSize: '0.65rem', color: 'var(--text-muted)' }}>
                Socket latency &lt; 14ms
              </div>
            </div>
          </div>
          <span className="font-mono" style={{ fontSize: '0.65rem', color: 'var(--gold-primary)', fontWeight: 600 }}>
            v2.4
          </span>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '9px 12px',
            borderRadius: '8px',
            border: '1px solid rgba(244, 63, 94, 0.2)',
            background: 'rgba(244, 63, 94, 0.06)',
            color: '#FB7185',
            cursor: 'pointer',
            fontSize: '0.8rem',
            fontWeight: 600,
            transition: 'all 0.15s ease',
            marginBottom: '10px',
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(244, 63, 94, 0.12)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(244, 63, 94, 0.06)'}
        >
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}

import React, { useState } from 'react';
import {
  UserCheck,
  Shield,
  ShieldCheck,
  ShieldAlert,
  UserPlus,
  Star,
  Phone,
  Mail,
  Car,
  CheckCircle2,
  XCircle,
  Clock,
  Award,
  FileCheck,
  Search,
  LayoutGrid,
  List,
  ExternalLink,
  ChevronRight,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  Edit3,
  X,
  Plus
} from 'lucide-react';

const FILTER_TABS = [
  { id: 'ALL', label: 'All Chauffeurs' },
  { id: 'ONLINE', label: 'Online On-Duty', pulse: true },
  { id: 'VERIFIED', label: 'PCO Verified' },
  { id: 'PENDING', label: 'Pending Audit' },
];

export default function ChauffeursView({
  chauffeurs = [],
  fleetClasses = [],
  vehicles = [],
  onUpdateChauffeur,
  onOpenAddModal
}) {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [search, setSearch] = useState('');
  const [viewMode, setViewMode] = useState('table'); // Default to sleek enterprise table
  const [editingChauffeur, setEditingChauffeur] = useState(null);
  const [modalForm, setModalForm] = useState({
    fleetClassId: '',
    vehicleModel: '',
    vehiclePlate: '',
    pcoBadgeNumber: '',
    dbsCheckStatus: 'ENHANCED_PASSED',
    isPcoVerified: true,
  });

  const filteredChauffeurs = chauffeurs.filter((c) => {
    const matchesSearch =
      c.fullName.toLowerCase().includes(search.toLowerCase()) ||
      (c.phone && c.phone.includes(search)) ||
      (c.email && c.email.toLowerCase().includes(search.toLowerCase())) ||
      (c.vehiclePlate && c.vehiclePlate.toLowerCase().includes(search.toLowerCase())) ||
      (c.pcoBadgeNumber && c.pcoBadgeNumber.toLowerCase().includes(search.toLowerCase())) ||
      (c.vehicleModel && c.vehicleModel.toLowerCase().includes(search.toLowerCase()));

    if (!matchesSearch) return false;

    if (activeFilter === 'ONLINE') return c.isOnline;
    if (activeFilter === 'VERIFIED') return c.isPcoVerified;
    if (activeFilter === 'PENDING') return !c.isPcoVerified;
    return true;
  });

  const toggleVerification = (chauffeur) => {
    onUpdateChauffeur(chauffeur.id, {
      isPcoVerified: !chauffeur.isPcoVerified
    });
  };

  const toggleOnline = (chauffeur) => {
    onUpdateChauffeur(chauffeur.id, {
      isOnline: !chauffeur.isOnline
    });
  };

  const handleOpenAssignModal = (chauffeur) => {
    setEditingChauffeur(chauffeur);
    setModalForm({
      fleetClassId: chauffeur.fleetClassId || (fleetClasses[0]?.id || ''),
      vehicleModel: chauffeur.vehicleModel || (chauffeur.fleetClass?.model || 'Mercedes-Benz S-Class'),
      vehiclePlate: chauffeur.vehiclePlate || '',
      pcoBadgeNumber: chauffeur.pcoBadgeNumber || '',
      dbsCheckStatus: chauffeur.dbsCheckStatus || 'Enhanced Passed',
      isPcoVerified: Boolean(chauffeur.isPcoVerified),
    });
  };

  const handleSaveAssign = async (e) => {
    e.preventDefault();
    if (!editingChauffeur) return;
    await onUpdateChauffeur(editingChauffeur.id, {
      fleetClassId: modalForm.fleetClassId || null,
      vehicleModel: modalForm.vehicleModel.trim(),
      vehiclePlate: modalForm.vehiclePlate.trim(),
      pcoBadgeNumber: modalForm.pcoBadgeNumber.trim(),
      dbsCheckStatus: modalForm.dbsCheckStatus,
      isPcoVerified: modalForm.isPcoVerified,
    });
    setEditingChauffeur(null);
  };

  const onlineCount = chauffeurs.filter(c => c.isOnline).length;
  const verifiedCount = chauffeurs.filter(c => c.isPcoVerified).length;
  const pendingCount = chauffeurs.filter(c => !c.isPcoVerified).length;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {/* 1. Header Bar */}
      <div className="aura-card" style={{
        padding: '16px 22px',
        background: 'linear-gradient(135deg, rgba(22, 28, 41, 0.95) 0%, rgba(12, 15, 23, 0.95) 100%)',
        border: '1px solid rgba(216, 178, 87, 0.25)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '14px',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: 'rgba(216, 178, 87, 0.1)',
            border: '1px solid rgba(216, 178, 87, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--gold-primary)',
          }}>
            <ShieldCheck size={20} />
          </div>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h3 className="font-display" style={{ fontSize: '1.1rem', fontWeight: 800, color: '#FFF', margin: 0 }}>
                Chauffeur Licensing & Compliance Bureau ({chauffeurs.length})
              </h3>
              <span className="gold-pill">TfL / PCO DIRECTORY</span>
            </div>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', margin: 0, marginTop: '2px' }}>
              TfL Private Hire Licensing • DBS Enhanced Screening • Admin Vehicle Allocation
            </p>
          </div>
        </div>

        <button onClick={onOpenAddModal} className="btn-aura-primary" style={{ padding: '7px 14px', fontSize: '0.78rem' }}>
          <UserPlus size={14} />
          Onboard Chauffeur
        </button>
      </div>

      {/* 2. Filter Tabs & Search Bar */}
      <div className="aura-card" style={{
        padding: '10px 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
      }}>
        {/* Filter Pills */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {FILTER_TABS.map((tab) => {
            const isActive = activeFilter === tab.id;
            let count = chauffeurs.length;
            if (tab.id === 'ONLINE') count = onlineCount;
            if (tab.id === 'VERIFIED') count = verifiedCount;
            if (tab.id === 'PENDING') count = pendingCount;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                style={{
                  padding: '6px 12px',
                  borderRadius: '7px',
                  fontSize: '0.76rem',
                  fontWeight: 600,
                  border: isActive ? '1px solid rgba(216, 178, 87, 0.4)' : '1px solid var(--border-subtle)',
                  background: isActive ? 'linear-gradient(135deg, rgba(216, 178, 87, 0.18) 0%, rgba(216, 178, 87, 0.05) 100%)' : 'rgba(255, 255, 255, 0.02)',
                  color: isActive ? '#F5DE88' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.15s ease',
                }}
              >
                {tab.pulse && <div className="radar-pulse green" style={{ width: '5px', height: '5px' }} />}
                <span>{tab.label}</span>
                <span className="font-mono" style={{
                  fontSize: '0.68rem',
                  padding: '1px 5px',
                  borderRadius: '9999px',
                  background: isActive ? 'rgba(216, 178, 87, 0.25)' : 'rgba(255, 255, 255, 0.06)',
                  color: isActive ? '#FFF' : 'var(--text-muted)',
                  fontWeight: 700,
                }}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search & View Switcher */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{ position: 'relative', width: '230px' }}>
            <Search size={13} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search name, plate, PCO..."
              className="aura-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ paddingLeft: '30px', height: '32px', fontSize: '0.76rem' }}
            />
          </div>

          <div style={{
            display: 'flex',
            borderRadius: '7px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid var(--border-subtle)',
            padding: '2px',
          }}>
            <button
              onClick={() => setViewMode('table')}
              style={{
                background: viewMode === 'table' ? 'rgba(216, 178, 87, 0.2)' : 'transparent',
                color: viewMode === 'table' ? '#F5DE88' : 'var(--text-muted)',
                border: 'none',
                padding: '4px 7px',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              title="Dense Table View"
            >
              <List size={14} />
            </button>
            <button
              onClick={() => setViewMode('grid')}
              style={{
                background: viewMode === 'grid' ? 'rgba(216, 178, 87, 0.2)' : 'transparent',
                color: viewMode === 'grid' ? '#F5DE88' : 'var(--text-muted)',
                border: 'none',
                padding: '4px 7px',
                borderRadius: '5px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              title="Cards View"
            >
              <LayoutGrid size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* 3. Sleek Enterprise Data Grid */}
      {viewMode === 'table' ? (
        <div className="aura-card" style={{ padding: 0, overflow: 'hidden' }}>
          <div className="aura-table-wrapper">
            <table className="aura-table">
              <thead>
                <tr>
                  <th>Chauffeur Name</th>
                  <th>Assigned Vehicle</th>
                  <th>Number Plate</th>
                  <th>TfL PCO License</th>
                  <th>DBS Check</th>
                  <th>Contact</th>
                  <th>Rating</th>
                  <th>Trips</th>
                  <th>Duty Status</th>
                  <th>Actions & Compliance</th>
                </tr>
              </thead>
              <tbody>
                {filteredChauffeurs.map((driver) => {
                  const isVerified = driver.isPcoVerified;
                  const hasVehicle = Boolean(driver.vehicleModel && driver.vehicleModel.trim());
                  const hasPlate = Boolean(driver.vehiclePlate && driver.vehiclePlate.trim());

                  return (
                    <tr key={driver.id}>
                      {/* Chauffeur Name */}
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: '50%',
                            background: '#151C2C',
                            border: '1px solid var(--border-subtle)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--gold-primary)',
                            fontWeight: 800,
                            fontSize: '0.76rem',
                          }}>
                            {driver.fullName ? driver.fullName.charAt(0) : 'C'}
                          </div>
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.84rem', color: '#FFF', display: 'flex', alignItems: 'center', gap: '4px' }}>
                              {driver.fullName}
                              {isVerified && <CheckCircle2 size={13} color="#10B981" />}
                            </div>
                            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                              {driver.fleetClass?.name || 'VIP Chauffeur'}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Vehicle Model */}
                      <td>
                        {hasVehicle ? (
                          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                              {driver.vehicleModel}
                            </div>
                            <button
                              onClick={() => handleOpenAssignModal(driver)}
                              title="Change Vehicle"
                              style={{ background: 'transparent', border: 'none', color: 'var(--gold-primary)', cursor: 'pointer', padding: '2px' }}
                            >
                              <Edit3 size={12} />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleOpenAssignModal(driver)}
                            style={{
                              padding: '3px 8px',
                              borderRadius: '5px',
                              border: '1px dashed rgba(245, 158, 11, 0.4)',
                              background: 'rgba(245, 158, 11, 0.08)',
                              color: '#FBBF24',
                              fontSize: '0.7rem',
                              fontWeight: 700,
                              cursor: 'pointer',
                              display: 'inline-flex',
                              alignItems: 'center',
                              gap: '4px',
                            }}
                          >
                            <Plus size={11} /> Assign Vehicle
                          </button>
                        )}
                      </td>

                      {/* UK Plate Badge */}
                      <td>
                        {hasPlate ? (
                          <span className="uk-plate" style={{ fontSize: '0.7rem', padding: '1px 6px' }}>
                            {driver.vehiclePlate}
                          </span>
                        ) : (
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>—</span>
                        )}
                      </td>

                      {/* PCO License Badge */}
                      <td>
                        {driver.pcoBadgeNumber && driver.pcoBadgeNumber.trim() ? (
                          <span className="font-mono" style={{ fontSize: '0.74rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                            {driver.pcoBadgeNumber}
                          </span>
                        ) : (
                          <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>Unregistered</span>
                        )}
                      </td>

                      {/* DBS Record */}
                      <td>
                        {driver.dbsCheckStatus === 'Enhanced Passed' || driver.dbsCheckStatus === 'ENHANCED_PASSED' ? (
                          <span style={{ fontSize: '0.72rem', color: '#34D399', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <CheckCircle2 size={11} /> Passed
                          </span>
                        ) : (
                          <span style={{ fontSize: '0.72rem', color: '#F59E0B', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <Clock size={11} /> {driver.dbsCheckStatus || 'Pending Check'}
                          </span>
                        )}
                      </td>

                      {/* Contact */}
                      <td>
                        <span style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
                          {driver.phone || driver.email || '—'}
                        </span>
                      </td>

                      {/* Rating */}
                      <td>
                        <span style={{ fontSize: '0.74rem', color: '#FBBF24', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '2px' }}>
                          ★ {driver.rating > 0 ? driver.rating.toFixed(1) : '5.0'}
                        </span>
                      </td>

                      {/* Total Trips */}
                      <td>
                        <span className="font-num" style={{ fontWeight: 800, fontSize: '0.86rem', color: 'var(--text-primary)' }}>
                          {driver.totalRides || 0}
                        </span>
                      </td>

                      {/* Duty Status */}
                      <td>
                        <button
                          onClick={() => toggleOnline(driver)}
                          style={{
                            padding: '3px 8px',
                            borderRadius: '5px',
                            border: driver.isOnline ? '1px solid rgba(16, 185, 129, 0.4)' : '1px solid var(--border-subtle)',
                            background: driver.isOnline ? 'rgba(16, 185, 129, 0.12)' : 'rgba(255, 255, 255, 0.02)',
                            color: driver.isOnline ? '#34D399' : 'var(--text-muted)',
                            fontSize: '0.68rem',
                            fontWeight: 700,
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px',
                          }}
                        >
                          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: driver.isOnline ? '#10B981' : '#64748B' }} />
                          {driver.isOnline ? 'ONLINE' : 'OFFLINE'}
                        </button>
                      </td>

                      {/* Actions & Compliance */}
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <button
                            onClick={() => handleOpenAssignModal(driver)}
                            className="btn-aura-secondary"
                            style={{ padding: '4px 8px', fontSize: '0.7rem' }}
                            title="Assign or update vehicle & license details"
                          >
                            <Edit3 size={11} /> {hasVehicle ? 'Edit' : 'Assign'}
                          </button>
                          <button
                            onClick={() => toggleVerification(driver)}
                            className={isVerified ? 'btn-aura-secondary' : 'btn-aura-primary'}
                            style={{ padding: '4px 8px', fontSize: '0.7rem' }}
                          >
                            {isVerified ? 'Revoke PCO' : 'Verify'}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* Compact Dossier Cards Mode */
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '12px' }}>
          {filteredChauffeurs.map((driver) => {
            const isVerified = driver.isPcoVerified;
            const hasVehicle = Boolean(driver.vehicleModel && driver.vehicleModel.trim());

            return (
              <div
                key={driver.id}
                className="aura-card aura-card-hover"
                style={{
                  padding: '14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px',
                  border: isVerified ? '1px solid rgba(16, 185, 129, 0.25)' : '1px solid rgba(245, 158, 11, 0.25)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: '#151C2C',
                      border: '1px solid var(--border-subtle)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--gold-primary)',
                      fontWeight: 800,
                      fontSize: '0.76rem',
                    }}>
                      {driver.fullName ? driver.fullName.charAt(0) : 'C'}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#FFF' }}>{driver.fullName}</div>
                      <div style={{ fontSize: '0.68rem', color: '#FBBF24', fontWeight: 700 }}>
                        ★ {driver.rating > 0 ? driver.rating.toFixed(1) : '5.0'} • {driver.totalRides || 0} rides
                      </div>
                    </div>
                  </div>

                  {driver.vehiclePlate && driver.vehiclePlate.trim() ? (
                    <span className="uk-plate" style={{ fontSize: '0.68rem', padding: '1px 5px' }}>
                      {driver.vehiclePlate}
                    </span>
                  ) : (
                    <span style={{ fontSize: '0.66rem', color: '#F59E0B', fontWeight: 700 }}>Unassigned</span>
                  )}
                </div>

                <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
                  🚗 {driver.vehicleModel || 'No Vehicle Assigned'} • 📞 {driver.phone || driver.email || '—'}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid var(--border-subtle)' }}>
                  <span className={`badge-status ${isVerified ? 'badge-completed' : 'badge-searching'}`} style={{ fontSize: '0.64rem', padding: '2px 6px' }}>
                    {isVerified ? 'PCO VERIFIED' : 'PENDING'}
                  </span>

                  <div style={{ display: 'flex', gap: '6px' }}>
                    <button
                      onClick={() => handleOpenAssignModal(driver)}
                      className="btn-aura-secondary"
                      style={{ padding: '3px 7px', fontSize: '0.68rem' }}
                    >
                      {hasVehicle ? 'Edit' : 'Assign'}
                    </button>
                    <button
                      onClick={() => toggleVerification(driver)}
                      className={isVerified ? 'btn-aura-secondary' : 'btn-aura-primary'}
                      style={{ padding: '3px 7px', fontSize: '0.68rem' }}
                    >
                      {isVerified ? 'Revoke' : 'Approve'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* 4. Assign Vehicle & Compliance Modal */}
      {editingChauffeur && (
        <div className="modal-backdrop">
          <div className="modal-content" style={{ maxWidth: '520px' }}>
            <div style={{
              padding: '18px 22px',
              borderBottom: '1px solid var(--border-light)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'rgba(216, 178, 87, 0.12)',
                  border: '1px solid rgba(216, 178, 87, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--gold-primary)',
                }}>
                  <Car size={16} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
                    Assign Vehicle & License
                  </h3>
                  <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0, marginTop: '2px' }}>
                    Chauffeur: <strong style={{ color: '#FFF' }}>{editingChauffeur.fullName}</strong>
                  </p>
                </div>
              </div>
              <button
                onClick={() => setEditingChauffeur(null)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveAssign} style={{ padding: '22px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {/* Fleet Class Tier */}
              <div>
                <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                  Fleet Service Class Tier *
                </label>
                <select
                  className="vip-input"
                  value={modalForm.fleetClassId}
                  onChange={(e) => {
                    const selected = fleetClasses.find(f => f.id === e.target.value);
                    setModalForm({
                      ...modalForm,
                      fleetClassId: e.target.value,
                      vehicleModel: modalForm.vehicleModel || (selected?.model || '')
                    });
                  }}
                  style={{ width: '100%', height: '38px' }}
                >
                  <option value="">-- Select Fleet Class Tier --</option>
                  {fleetClasses.map((f) => (
                    <option key={f.id} value={f.id}>
                      {f.name} (Base £{f.basePrice} • £{f.pricePerKm}/km)
                    </option>
                  ))}
                </select>
              </div>

              {/* Vehicle Model & Registration Plate */}
              <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                    Vehicle Make & Model *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Mercedes-Benz S-Class S580"
                    className="vip-input"
                    value={modalForm.vehicleModel}
                    onChange={(e) => setModalForm({ ...modalForm, vehicleModel: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                    UK Registration Plate *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. LX24 VIP"
                    className="vip-input font-mono"
                    value={modalForm.vehiclePlate}
                    onChange={(e) => setModalForm({ ...modalForm, vehiclePlate: e.target.value.toUpperCase() })}
                  />
                </div>
              </div>

              {/* TfL PCO & DBS Status */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                    TfL PCO License Badge
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. PCO-LONDON-7721"
                    className="vip-input font-mono"
                    value={modalForm.pcoBadgeNumber}
                    onChange={(e) => setModalForm({ ...modalForm, pcoBadgeNumber: e.target.value })}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary)', display: 'block', marginBottom: '6px' }}>
                    DBS Screening Status
                  </label>
                  <select
                    className="vip-input"
                    value={modalForm.dbsCheckStatus}
                    onChange={(e) => setModalForm({ ...modalForm, dbsCheckStatus: e.target.value })}
                    style={{ width: '100%', height: '38px' }}
                  >
                    <option value="Enhanced Passed">Enhanced Passed</option>
                    <option value="Standard Passed">Standard Passed</option>
                    <option value="Pending Check">Pending Check</option>
                    <option value="Under Review">Under Review</option>
                  </select>
                </div>
              </div>

              {/* Verified Switch */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '10px 14px',
                borderRadius: '8px',
                background: 'rgba(255, 255, 255, 0.02)',
                border: '1px solid var(--border-light)',
                marginTop: '4px',
              }}>
                <div>
                  <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#FFF' }}>
                    Approve & Verify PCO Credentials
                  </div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                    Authorizes chauffeur to accept live customer bookings
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setModalForm({ ...modalForm, isPcoVerified: !modalForm.isPcoVerified })}
                  style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: modalForm.isPcoVerified ? '#10B981' : '#64748B' }}
                >
                  {modalForm.isPcoVerified ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
                </button>
              </div>

              {/* Actions */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
                <button
                  type="button"
                  onClick={() => setEditingChauffeur(null)}
                  className="btn-aura-secondary"
                  style={{ padding: '8px 16px' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-aura-primary"
                  style={{ padding: '8px 18px' }}
                >
                  <CheckCircle2 size={14} />
                  Save & Assign Vehicle
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

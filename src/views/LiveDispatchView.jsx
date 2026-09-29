import React, { useState } from 'react';
import {
  Radio,
  UserCheck,
  Filter,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  Compass,
  Navigation,
  Plane,
  FileText,
  Sparkles
} from 'lucide-react';

const STATUS_TABS = [
  { id: 'ALL', label: 'All Bookings' },
  { id: 'SEARCHING', label: 'Pending Dispatch' },
  { id: 'CONFIRMED', label: 'Confirmed & En Route' },
  { id: 'IN_PROGRESS', label: 'Active In-Trip' },
  { id: 'COMPLETED', label: 'Completed' },
  { id: 'CANCELLED', label: 'Cancelled' },
];

export default function LiveDispatchView({ rides, onAssignDriver, onUpdateStatus, onOpenAssignModal }) {
  const [selectedFilter, setSelectedFilter] = useState('ALL');
  const [search, setSearch] = useState('');

  const filteredRides = rides.filter((r) => {
    const matchesFilter =
      selectedFilter === 'ALL' ||
      (selectedFilter === 'CONFIRMED' && ['CONFIRMED', 'CHAUFFEUR_EN_ROUTE', 'ARRIVED'].includes(r.status)) ||
      r.status === selectedFilter;

    const matchesSearch =
      search === '' ||
      r.pickupAddress?.toLowerCase().includes(search.toLowerCase()) ||
      r.dropoffAddress?.toLowerCase().includes(search.toLowerCase()) ||
      r.user?.fullName?.toLowerCase().includes(search.toLowerCase()) ||
      r.id.toLowerCase().includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      {/* Top Filter Bar */}
      <div className="aura-card" style={{ padding: '14px 18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
        {/* Status Filter Tabs */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {STATUS_TABS.map((tab) => {
            const isActive = selectedFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id)}
                style={{
                  padding: '7px 13px',
                  borderRadius: '8px',
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  border: isActive ? '1px solid rgba(216, 178, 87, 0.4)' : '1px solid var(--border-subtle)',
                  background: isActive ? 'linear-gradient(135deg, rgba(216, 178, 87, 0.18) 0%, rgba(216, 178, 87, 0.05) 100%)' : 'rgba(255, 255, 255, 0.02)',
                  color: isActive ? '#F5DE88' : 'var(--text-secondary)',
                  cursor: 'pointer',
                  transition: 'all 0.18s ease',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Search */}
        <div style={{ position: 'relative', width: '250px' }}>
          <Search size={14} color="var(--text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            placeholder="Search booking ref, route..."
            className="aura-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ paddingLeft: '32px', height: '34px', fontSize: '0.78rem' }}
          />
        </div>
      </div>

      {/* Bookings Table */}
      <div className="aura-card" style={{ padding: '0', overflow: 'hidden' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <h3 style={{ fontSize: '0.98rem', fontWeight: 800, color: 'var(--text-primary)', margin: 0 }}>
              Live Ride Dispatch Radar ({filteredRides.length})
            </h3>
            <p style={{ fontSize: '0.72rem', color: 'var(--text-muted)', margin: 0, marginTop: '2px' }}>
              Assign drivers, monitor GPS telemetry, and override status in real-time
            </p>
          </div>
        </div>

        {filteredRides.length === 0 ? (
          <div style={{ padding: '60px 20px', textAlign: 'center', color: 'var(--text-muted)' }}>
            No bookings found matching the current filter.
          </div>
        ) : (
          <div className="aura-table-wrapper">
            <table className="aura-table">
              <thead>
                <tr>
                  <th>Booking Ref</th>
                  <th>VIP Client</th>
                  <th>Tier Class</th>
                  <th>Itinerary Route</th>
                  <th>Schedule & Notes</th>
                  <th>Status</th>
                  <th>Assigned Chauffeur</th>
                  <th>Fare</th>
                  <th>Quick Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredRides.map((ride) => {
                  const statusClass = `badge-${ride.status.toLowerCase()}`;
                  const isHotelRide = ride.notesToDriver && ride.notesToDriver.includes('[HOTEL:');
                  const hotelNameMatch = isHotelRide && ride.notesToDriver.match(/\[NAME:([^\]]+)\]/);
                  const guestNameMatch = isHotelRide && ride.notesToDriver.match(/\[GUEST:([^\]]+)\]/);
                  const roomMatch = isHotelRide && ride.notesToDriver.match(/\[ROOM:([^\]]+)\]/);
                  const hotelDisplayName = hotelNameMatch ? hotelNameMatch[1] : null;
                  const guestDisplayName = guestNameMatch ? guestNameMatch[1] : null;
                  const roomDisplayNum = roomMatch ? roomMatch[1] : null;
                  return (
                    <tr key={ride.id}>
                      <td>
                        <div className="font-mono" style={{ fontWeight: 800, color: 'var(--gold-primary)', fontSize: '0.8rem' }}>
                          #{ride.id.slice(0, 8)}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {new Date(ride.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </div>
                      </td>

                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                          {isHotelRide && (
                            <span style={{
                              padding: '2px 7px',
                              borderRadius: '5px',
                              background: 'rgba(216, 178, 87, 0.2)',
                              border: '1px solid rgba(216, 178, 87, 0.4)',
                              color: '#F5DE88',
                              fontSize: '0.62rem',
                              fontWeight: 800,
                              letterSpacing: '0.5px',
                            }}>🏨 HOTEL</span>
                          )}
                        </div>
                        <div style={{ fontWeight: 700, fontSize: '0.84rem', marginTop: isHotelRide ? '3px' : '0' }}>
                          {isHotelRide && guestDisplayName ? guestDisplayName : (ride.user?.fullName || 'VIP Client')}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                          {isHotelRide && hotelDisplayName ? (
                            <span>{hotelDisplayName}{roomDisplayNum && roomDisplayNum !== 'N/A' ? ` · Rm ${roomDisplayNum}` : ''}</span>
                          ) : (
                            ride.user?.phone
                          )}
                        </div>
                      </td>

                      <td>
                        <span className="gold-pill" style={{ padding: '2px 8px', fontSize: '0.7rem' }}>
                          {ride.fleetClass?.name || 'VIP Flagship'}
                        </span>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', marginTop: '3px' }}>
                          {ride.fleetClass?.model}
                        </div>
                      </td>

                      <td style={{ maxWidth: '240px' }}>
                        <div style={{ fontSize: '0.8rem', fontWeight: 600 }}>📍 {ride.pickupAddress}</div>
                        <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)', marginTop: '2px' }}>🏁 {ride.dropoffAddress}</div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--accent-sky)', marginTop: '3px' }}>
                          {ride.distanceKm ? `${ride.distanceKm.toFixed(1)} km • ~${ride.estimatedDurationMinutes || 25} mins` : 'Direct Route'}
                        </div>
                      </td>

                      <td>
                        <div style={{ fontSize: '0.76rem', fontWeight: 600 }}>
                          {ride.bookingScheduleType === 'ASAP' ? (
                            <span style={{ color: '#F59E0B' }}>⚡ Immediate ASAP</span>
                          ) : (
                            <span style={{ color: '#38BDF8' }}>🗓️ {ride.scheduledTime ? new Date(ride.scheduledTime).toLocaleString() : 'Scheduled'}</span>
                          )}
                        </div>
                        {ride.flightNumber && (
                          <div style={{ fontSize: '0.7rem', color: '#F5DE88', display: 'flex', alignItems: 'center', gap: '3px', marginTop: '2px' }}>
                            <Plane size={11} /> Flight: {ride.flightNumber}
                          </div>
                        )}
                        {ride.notesToDriver && (
                          <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)', fontStyle: 'italic', marginTop: '2px' }}>
                            "{ride.notesToDriver}"
                          </div>
                        )}
                      </td>

                      <td>
                        <span className={`badge-status ${statusClass}`}>
                          {ride.status.replace(/_/g, ' ')}
                        </span>
                      </td>

                      <td>
                        {ride.chauffeur ? (
                          <div>
                            <div style={{ fontWeight: 700, fontSize: '0.82rem', color: '#FFF' }}>{ride.chauffeur.fullName}</div>
                            <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                              {ride.chauffeur.vehicleModel} (<span className="font-mono">{ride.chauffeur.vehiclePlate}</span>)
                            </div>
                          </div>
                        ) : (
                          <span style={{ fontSize: '0.72rem', color: '#FB7185', fontStyle: 'italic' }}>
                            Unassigned
                          </span>
                        )}
                      </td>

                      <td>
                        <div className="font-num" style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--gold-bright)' }}>
                          £{ride.fareAmount?.toFixed(2)}
                        </div>
                        <div style={{ fontSize: '0.65rem', color: ride.isPaid ? 'var(--accent-emerald)' : 'var(--text-muted)' }}>
                          {ride.isPaid ? '✓ Paid' : 'Pending'}
                        </div>
                      </td>

                      <td>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                          {ride.status === 'SEARCHING' && (
                            <button
                              onClick={() => onOpenAssignModal(ride)}
                              className="btn-aura-primary"
                              style={{ padding: '5px 9px', fontSize: '0.72rem' }}
                            >
                              <UserCheck size={13} /> Assign
                            </button>
                          )}

                          {ride.status !== 'COMPLETED' && ride.status !== 'CANCELLED' && (
                            <div style={{ display: 'flex', gap: '4px' }}>
                              <button
                                onClick={() => onUpdateStatus(ride.id, 'COMPLETED')}
                                title="Mark Completed"
                                style={{
                                  padding: '4px 7px',
                                  borderRadius: '6px',
                                  background: 'rgba(16, 185, 129, 0.12)',
                                  border: '1px solid rgba(16, 185, 129, 0.35)',
                                  color: '#34D399',
                                  cursor: 'pointer',
                                  fontSize: '0.68rem',
                                  fontWeight: 700,
                                }}
                              >
                                Complete
                              </button>
                              <button
                                onClick={() => onUpdateStatus(ride.id, 'CANCELLED')}
                                title="Cancel Ride"
                                style={{
                                  padding: '4px 7px',
                                  borderRadius: '6px',
                                  background: 'rgba(244, 63, 94, 0.12)',
                                  border: '1px solid rgba(244, 63, 94, 0.35)',
                                  color: '#FB7185',
                                  cursor: 'pointer',
                                  fontSize: '0.68rem',
                                  fontWeight: 700,
                                }}
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

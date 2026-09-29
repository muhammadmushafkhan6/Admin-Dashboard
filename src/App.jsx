import React, { useState, useEffect, useCallback } from 'react';
import LoginPage from './views/LoginPage';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Toast from './components/Toast';

// Modals
import AssignDriverModal from './components/AssignDriverModal';
import AddChauffeurModal from './components/AddChauffeurModal';
import AddVehicleModal from './components/AddVehicleModal';
import AddCityModal from './components/AddCityModal';
import AddHotelModal from './components/AddHotelModal';
import AddCorporateModal from './components/AddCorporateModal';
import AddPartnerModal from './components/AddPartnerModal';

// Views
import OverviewDashboard from './views/OverviewDashboard';
import LiveDispatchView from './views/LiveDispatchView';
import ChauffeursView from './views/ChauffeursView';
import VehiclesView from './views/VehiclesView';
import FleetPricingView from './views/FleetPricingView';
import CustomersView from './views/CustomersView';
import CitiesView from './views/CitiesView';
import HotelAccountsView from './views/HotelAccountsView';
import CorporateAccountsView from './views/CorporateAccountsView';
import PartnersView from './views/PartnersView';
import InvoicesPaymentsView from './views/InvoicesPaymentsView';
import ReportsAnalyticsView from './views/ReportsAnalyticsView';
import SupportDeskView from './views/SupportDeskView';

import { AdminAPI, socket } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [toast, setToast] = useState(null);

  // Auth State — persisted in localStorage
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem('lumedrive_admin_token');
  });
  const [adminUser, setAdminUser] = useState(() => {
    try {
      const u = localStorage.getItem('lumedrive_admin_user');
      return u ? JSON.parse(u) : null;
    } catch { return null; }
  });

  const handleLoginSuccess = (admin) => {
    setAdminUser(admin);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('lumedrive_admin_token');
    localStorage.removeItem('lumedrive_admin_user');
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  // Core Data States
  const [stats, setStats] = useState(null);
  const [rides, setRides] = useState([]);
  const [chauffeurs, setChauffeurs] = useState([]);
  const [vehicles, setVehicles] = useState([]);
  const [fleetClasses, setFleetClasses] = useState([]);
  const [users, setUsers] = useState([]);
  const [cities, setCities] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [corporates, setCorporates] = useState([]);
  const [partners, setPartners] = useState([]);
  const [invoicesData, setInvoicesData] = useState(null);
  const [reportsData, setReportsData] = useState(null);
  const [supportTickets, setSupportTickets] = useState([]);

  // Modal States
  const [assignRideTarget, setAssignRideTarget] = useState(null);
  const [showAddChauffeur, setShowAddChauffeur] = useState(false);
  const [showAddVehicle, setShowAddVehicle] = useState(false);
  const [showAddCity, setShowAddCity] = useState(false);
  const [showAddHotel, setShowAddHotel] = useState(false);
  const [showAddCorporate, setShowAddCorporate] = useState(false);
  const [showAddPartner, setShowAddPartner] = useState(false);

  // Fetch all initial data
  const loadAllData = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const [
        statsRes,
        ridesRes,
        chauffeursRes,
        vehiclesRes,
        fleetRes,
        usersRes,
        citiesRes,
        hotelsRes,
        corporatesRes,
        partnersRes,
        invoicesRes,
        reportsRes,
        supportRes,
      ] = await Promise.all([
        AdminAPI.getStats().catch(() => ({ data: { stats: {} } })),
        AdminAPI.getRides().catch(() => ({ data: { rides: [] } })),
        AdminAPI.getChauffeurs().catch(() => ({ data: { chauffeurs: [] } })),
        AdminAPI.getVehicles().catch(() => ({ data: { vehicles: [] } })),
        AdminAPI.getFleetClasses().catch(() => ({ data: { fleetClasses: [] } })),
        AdminAPI.getUsers().catch(() => ({ data: { users: [] } })),
        AdminAPI.getCities().catch(() => ({ data: { cities: [] } })),
        AdminAPI.getHotels().catch(() => ({ data: { hotels: [] } })),
        AdminAPI.getCorporates().catch(() => ({ data: { corporates: [] } })),
        AdminAPI.getPartners().catch(() => ({ data: { partners: [] } })),
        AdminAPI.getInvoices().catch(() => ({ data: { transactions: [] } })),
        AdminAPI.getReports().catch(() => ({ data: { reports: {} } })),
        AdminAPI.getSupportTickets().catch(() => ({ data: { tickets: [] } })),
      ]);

      if (statsRes.data.success) setStats(statsRes.data.stats);
      if (ridesRes.data.success) setRides(ridesRes.data.rides);
      if (chauffeursRes.data.success) setChauffeurs(chauffeursRes.data.chauffeurs);
      if (vehiclesRes.data.success) setVehicles(vehiclesRes.data.vehicles);
      if (fleetRes.data.success) setFleetClasses(fleetRes.data.fleetClasses);
      if (usersRes.data.success) setUsers(usersRes.data.users);
      if (citiesRes.data.success) setCities(citiesRes.data.cities);
      if (hotelsRes.data.success) setHotels(hotelsRes.data.hotels);
      if (corporatesRes.data.success) setCorporates(corporatesRes.data.corporates);
      if (partnersRes.data.success) setPartners(partnersRes.data.partners);
      if (invoicesRes.data.success) setInvoicesData(invoicesRes.data);
      if (reportsRes.data.success) setReportsData(reportsRes.data.reports);
      if (supportRes.data.success) setSupportTickets(supportRes.data.tickets);
    } catch (err) {
      console.error('Failed to sync admin data', err);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    // 1. Session verification & auto-refresh
    if (isAuthenticated) {
      AdminAPI.getMe()
        .then((res) => {
          if (res.data.success && res.data.admin) {
            setAdminUser(res.data.admin);
            localStorage.setItem('lumedrive_admin_user', JSON.stringify(res.data.admin));
          }
        })
        .catch(() => {
          // Token invalid or expired
          handleLogout();
        });

      loadAllData();
    }

    // 2. Global Unauthorized Handler
    const handleUnauthorized = () => {
      handleLogout();
    };
    window.addEventListener('lumedrive_admin_unauthorized', handleUnauthorized);

    // 3. Socket.io Real-time Event Listeners

    // New unassigned ride needs dispatch
    socket.on('new_ride_request', (payload) => {
      const newRide = payload?.ride || payload;
      setRides((prev) => [newRide, ...prev.filter((r) => r.id !== newRide.id)]);
      setToast({ message: `🚨 NEW DISPATCH REQUEST — #${newRide.id?.slice(0, 8)} awaiting chauffeur assignment`, type: 'error' });
      loadAllData();
    });

    socket.on('ride_created', (payload) => {
      const newRide = payload?.ride || payload;
      setRides((prev) => [newRide, ...prev.filter((r) => r.id !== newRide.id)]);
      loadAllData();
    });

    socket.on('ride_updated', (updatedRide) => {
      setRides((prev) => prev.map((r) => (r.id === updatedRide.id ? updatedRide : r)));
      loadAllData();
    });

    socket.on('ride_status_changed', (data) => {
      if (data && data.ride) {
        setRides((prev) => prev.map((r) => (r.id === data.ride.id ? data.ride : r)));
      }
      loadAllData();
    });

    socket.on('admin_ride_assigned', (data) => {
      if (data && data.rideId) {
        loadAllData();
        setToast({ message: `✅ Chauffeur assigned to ride #${data.rideId.slice(0, 8)}`, type: 'success' });
      }
    });

    socket.on('driver_location_update', (data) => {
      if (data && data.chauffeurId) {
        setChauffeurs((prev) =>
          prev.map((c) => {
            if (c.id === data.chauffeurId) {
              return { ...c, latitude: data.latitude, longitude: data.longitude, heading: data.heading };
            }
            return c;
          })
        );
      }
    });

    return () => {
      window.removeEventListener('lumedrive_admin_unauthorized', handleUnauthorized);
      socket.off('new_ride_request');
      socket.off('ride_created');
      socket.off('ride_updated');
      socket.off('ride_status_changed');
      socket.off('admin_ride_assigned');
      socket.off('driver_location_update');
    };
  }, [loadAllData, isAuthenticated]);

  // Actions
  const handleAssignDriver = async (rideId, chauffeurId) => {
    try {
      const res = await AdminAPI.assignRide(rideId, chauffeurId);
      if (res.data.success) {
        setToast({ message: res.data.message || 'Chauffeur assigned successfully!', type: 'success' });
        loadAllData();
      }
    } catch (err) {
      setToast({ message: 'Failed to assign chauffeur', type: 'error' });
    }
  };

  const handleUpdateStatus = async (rideId, status) => {
    try {
      const res = await AdminAPI.updateRideStatus(rideId, status);
      if (res.data.success) {
        setToast({ message: res.data.message || 'Status updated!', type: 'success' });
        loadAllData();
      }
    } catch (err) {
      setToast({ message: 'Failed to update status', type: 'error' });
    }
  };

  const handleUpdateChauffeur = async (id, data) => {
    try {
      const res = await AdminAPI.updateChauffeur(id, data);
      if (res.data.success) {
        setToast({ message: 'Chauffeur details updated', type: 'success' });
        loadAllData();
      }
    } catch (err) {
      setToast({ message: 'Failed to update chauffeur', type: 'error' });
    }
  };

  const handleAddChauffeur = async (data) => {
    try {
      const res = await AdminAPI.createChauffeur(data);
      if (res.data.success) {
        setToast({ message: 'Chauffeur onboarded successfully!', type: 'success' });
        loadAllData();
      }
    } catch (err) {
      setToast({ message: 'Failed to create chauffeur', type: 'error' });
    }
  };

  const handleAddVehicle = async (data) => {
    try {
      const res = await AdminAPI.createVehicle(data);
      if (res.data.success) {
        setToast({ message: 'Vehicle registered to fleet!', type: 'success' });
        loadAllData();
      }
    } catch (err) {
      setToast({ message: 'Failed to add vehicle', type: 'error' });
    }
  };

  const handleUpdateVehicle = async (id, data) => {
    try {
      const res = await AdminAPI.updateVehicle(id, data);
      if (res.data.success) {
        setToast({ message: 'Vehicle updated', type: 'success' });
        loadAllData();
      }
    } catch (err) {
      setToast({ message: 'Failed to update vehicle', type: 'error' });
    }
  };

  const handleUpdateFleetClass = async (id, data) => {
    try {
      const res = await AdminAPI.updateFleetClass(id, data);
      if (res.data.success) {
        setToast({ message: 'Tier class pricing updated!', type: 'success' });
        loadAllData();
      }
    } catch (err) {
      setToast({ message: 'Failed to update pricing', type: 'error' });
    }
  };

  const handleAddCity = async (data) => {
    try {
      const res = await AdminAPI.createCity(data);
      if (res.data.success) {
        setToast({ message: 'New expansion city added!', type: 'success' });
        loadAllData();
      }
    } catch (err) {
      setToast({ message: 'Failed to add city', type: 'error' });
    }
  };

  const handleUpdateCity = async (id, data) => {
    try {
      const res = await AdminAPI.updateCity(id, data);
      if (res.data.success) {
        setToast({ message: 'City zone updated', type: 'success' });
        loadAllData();
      }
    } catch (err) {
      setToast({ message: 'Failed to update city', type: 'error' });
    }
  };

  const handleAddHotel = async (data) => {
    try {
      const res = await AdminAPI.createHotel(data);
      if (res.data.success) {
        setToast({ message: 'Hotel concierge portal opened!', type: 'success' });
        loadAllData();
      }
    } catch (err) {
      setToast({ message: 'Failed to add hotel', type: 'error' });
    }
  };

  const handleUpdateHotel = async (id, data) => {
    try {
      const res = await AdminAPI.updateHotel(id, data);
      if (res.data.success) {
        setToast({ message: 'Hotel account updated', type: 'success' });
        loadAllData();
      }
    } catch (err) {
      setToast({ message: 'Failed to update hotel', type: 'error' });
    }
  };

  const handleAddCorporate = async (data) => {
    try {
      const res = await AdminAPI.createCorporate(data);
      if (res.data.success) {
        setToast({ message: 'Corporate client registered!', type: 'success' });
        loadAllData();
      }
    } catch (err) {
      setToast({ message: 'Failed to add corporate account', type: 'error' });
    }
  };

  const handleUpdateCorporate = async (id, data) => {
    try {
      const res = await AdminAPI.updateCorporate(id, data);
      if (res.data.success) {
        setToast({ message: 'Corporate account updated', type: 'success' });
        loadAllData();
      }
    } catch (err) {
      setToast({ message: 'Failed to update corporate', type: 'error' });
    }
  };

  const handleAddPartner = async (data) => {
    try {
      const res = await AdminAPI.createPartner(data);
      if (res.data.success) {
        setToast({ message: 'Regional partner fleet onboarded!', type: 'success' });
        loadAllData();
      }
    } catch (err) {
      setToast({ message: 'Failed to add partner', type: 'error' });
    }
  };

  const handleUpdatePartner = async (id, data) => {
    try {
      const res = await AdminAPI.updatePartner(id, data);
      if (res.data.success) {
        setToast({ message: 'Partner details updated', type: 'success' });
        loadAllData();
      }
    } catch (err) {
      setToast({ message: 'Failed to update partner', type: 'error' });
    }
  };

  const handleUpdateSupportTicket = async (id, data) => {
    try {
      const res = await AdminAPI.updateSupportTicket(id, data);
      if (res.data.success) {
        setToast({ message: 'Support ticket updated', type: 'success' });
        loadAllData();
      }
    } catch (err) {
      setToast({ message: 'Failed to update support ticket', type: 'error' });
    }
  };

  // ── Login Guard ──────────────────────────────────────────
  if (!isAuthenticated) {
    return <LoginPage onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--bg-app)' }}>
      {/* Sidebar Navigation */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} stats={stats} onLogout={handleLogout} />

      {/* Main Content Area */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }}>
        <Header
          activeTab={activeTab}
          onRefresh={loadAllData}
          isRefreshing={isRefreshing}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          adminUser={adminUser}
        />

        <main style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
          {activeTab === 'overview' && (
            <OverviewDashboard
              stats={stats}
              rides={rides}
              chauffeurs={chauffeurs}
              setActiveTab={setActiveTab}
              onOpenAssignModal={(ride) => setAssignRideTarget(ride)}
            />
          )}

          {activeTab === 'dispatch' && (
            <LiveDispatchView
              rides={rides}
              onAssignDriver={handleAssignDriver}
              onUpdateStatus={handleUpdateStatus}
              onOpenAssignModal={(ride) => setAssignRideTarget(ride)}
            />
          )}

          {activeTab === 'chauffeurs' && (
            <ChauffeursView
              chauffeurs={chauffeurs}
              fleetClasses={fleetClasses}
              vehicles={vehicles}
              onUpdateChauffeur={handleUpdateChauffeur}
              onOpenAddModal={() => setShowAddChauffeur(true)}
            />
          )}

          {activeTab === 'vehicles' && (
            <VehiclesView
              vehicles={vehicles}
              fleetClasses={fleetClasses}
              onOpenAddModal={() => setShowAddVehicle(true)}
              onUpdateVehicle={handleUpdateVehicle}
            />
          )}

          {activeTab === 'fleet-pricing' && (
            <FleetPricingView
              fleetClasses={fleetClasses}
              onUpdateFleetClass={handleUpdateFleetClass}
            />
          )}

          {activeTab === 'customers' && (
            <CustomersView users={users} />
          )}

          {activeTab === 'cities' && (
            <CitiesView
              cities={cities}
              onOpenAddModal={() => setShowAddCity(true)}
              onUpdateCity={handleUpdateCity}
            />
          )}

          {activeTab === 'hotels' && (
            <HotelAccountsView
              hotels={hotels}
              onOpenAddModal={() => setShowAddHotel(true)}
              onUpdateHotel={handleUpdateHotel}
            />
          )}

          {activeTab === 'corporates' && (
            <CorporateAccountsView
              corporates={corporates}
              onOpenAddModal={() => setShowAddCorporate(true)}
              onUpdateCorporate={handleUpdateCorporate}
            />
          )}

          {activeTab === 'partners' && (
            <PartnersView
              partners={partners}
              onOpenAddModal={() => setShowAddPartner(true)}
              onUpdatePartner={handleUpdatePartner}
            />
          )}

          {activeTab === 'invoices' && (
            <InvoicesPaymentsView
              invoicesData={invoicesData}
              rides={rides}
            />
          )}

          {activeTab === 'reports' && (
            <ReportsAnalyticsView
              reportsData={reportsData}
              rides={rides}
              fleetClasses={fleetClasses}
              cities={cities}
            />
          )}

          {activeTab === 'support' && (
            <SupportDeskView
              supportTickets={supportTickets}
              onUpdateSupportTicket={handleUpdateSupportTicket}
            />
          )}
        </main>
      </div>

      {/* Modals */}
      {assignRideTarget && (
        <AssignDriverModal
          ride={assignRideTarget}
          chauffeurs={chauffeurs.filter((c) => c.isOnline)}
          onClose={() => setAssignRideTarget(null)}
          onAssign={handleAssignDriver}
        />
      )}

      {showAddChauffeur && (
        <AddChauffeurModal
          fleetClasses={fleetClasses}
          onClose={() => setShowAddChauffeur(false)}
          onAdd={handleAddChauffeur}
        />
      )}

      {showAddVehicle && (
        <AddVehicleModal
          fleetClasses={fleetClasses}
          onClose={() => setShowAddVehicle(false)}
          onAdd={handleAddVehicle}
        />
      )}

      {showAddCity && (
        <AddCityModal
          onClose={() => setShowAddCity(false)}
          onAdd={handleAddCity}
        />
      )}

      {showAddHotel && (
        <AddHotelModal
          onClose={() => setShowAddHotel(false)}
          onAdd={handleAddHotel}
        />
      )}

      {showAddCorporate && (
        <AddCorporateModal
          onClose={() => setShowAddCorporate(false)}
          onAdd={handleAddCorporate}
        />
      )}

      {showAddPartner && (
        <AddPartnerModal
          onClose={() => setShowAddPartner(false)}
          onAdd={handleAddPartner}
        />
      )}

      {/* Toast Alert */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

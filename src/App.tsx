import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import MembersPage from './pages/MembersPage';
import MembershipsPage from './pages/MembershipsPage';
import PaymentsPage from './pages/PaymentsPage';
import EventsPage from './pages/EventsPage';
import AttendancePage from './pages/AttendancePage';
import FacilitiesPage from './pages/FacilitiesPage';
import ReportsPage from './pages/ReportsPage';
import AnnouncementsPage from './pages/AnnouncementsPage';
import SettingsPage from './pages/SettingsPage';

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard"     element={<DashboardPage />}     />
            <Route path="members"       element={<MembersPage />}       />
            <Route path="memberships"   element={<MembershipsPage />}   />
            <Route path="payments"      element={<PaymentsPage />}      />
            <Route path="events"        element={<EventsPage />}        />
            <Route path="attendance"    element={<AttendancePage />}    />
            <Route path="facilities"    element={<FacilitiesPage />}    />
            <Route path="reports"       element={<ReportsPage />}       />
            <Route path="announcements" element={<AnnouncementsPage />} />
            <Route path="settings"      element={<SettingsPage />}      />
          </Route>
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

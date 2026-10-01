import React, { useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopNav from './TopNav';
import ToastContainer from './ToastContainer';
import { useApp } from '../context/AppContext';

export default function Layout() {
  const { isLoggedIn } = useApp();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  return (
    <div className="flex h-screen overflow-hidden bg-surface-50">
      <Sidebar
        collapsed={collapsed}
        setCollapsed={setCollapsed}
        mobileOpen={mobileOpen}
        setMobileOpen={setMobileOpen}
      />
      <div className="flex flex-col flex-1 overflow-hidden">
        <TopNav onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 animate-fadeIn">
          <Outlet />
        </main>
      </div>
      <ToastContainer />
    </div>
  );
}

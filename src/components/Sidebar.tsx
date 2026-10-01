import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Users, CreditCard, Calendar, ClipboardList,
  Building2, BarChart3, Megaphone, Settings, LogOut, ChevronLeft,
  ChevronRight, Menu, X, Dumbbell, UserCircle, Shield,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

const navItems = [
  { to: '/dashboard',     label: 'Dashboard',     icon: LayoutDashboard },
  { to: '/members',       label: 'Members',        icon: Users           },
  { to: '/memberships',   label: 'Memberships',    icon: Shield          },
  { to: '/payments',      label: 'Payments',       icon: CreditCard      },
  { to: '/events',        label: 'Events',         icon: Calendar        },
  { to: '/attendance',    label: 'Attendance',     icon: ClipboardList   },
  { to: '/facilities',    label: 'Facilities',     icon: Building2       },
  { to: '/reports',       label: 'Reports',        icon: BarChart3       },
  { to: '/announcements', label: 'Announcements',  icon: Megaphone       },
  { to: '/settings',      label: 'Settings',       icon: Settings        },
];

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (v: boolean) => void;
}

export default function Sidebar({ collapsed, setCollapsed, mobileOpen, setMobileOpen }: SidebarProps) {
  const { logout } = useApp();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const sidebarContent = (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className={`flex items-center gap-3 px-4 py-5 border-b border-surface-100 ${collapsed ? 'justify-center' : ''}`}>
        <div className="w-9 h-9 bg-gradient-to-br from-primary-500 to-primary-700 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
          <Dumbbell size={20} className="text-white" />
        </div>
        {!collapsed && (
          <div>
            <div className="text-base font-bold text-surface-900">ClubHub</div>
            <div className="text-[10px] text-surface-400 font-medium leading-tight">Membership System</div>
          </div>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              isActive ? 'sidebar-link-active' : 'sidebar-link-inactive'
            }
          >
            <Icon size={18} className="flex-shrink-0" />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom */}
      <div className="border-t border-surface-100 px-3 py-4 space-y-1">
        <button
          onClick={() => { setShowProfile(true); setMobileOpen(false); }}
          className="sidebar-link-inactive w-full"
        >
          <UserCircle size={18} className="flex-shrink-0" />
          {!collapsed && <span>Profile</span>}
        </button>
        <button onClick={handleLogout} className="sidebar-link-inactive w-full text-red-500 hover:bg-red-50 hover:text-red-600">
          <LogOut size={18} className="flex-shrink-0" />
          {!collapsed && <span>Logout</span>}
        </button>
      </div>

      {/* Collapse toggle (desktop only) */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden md:flex absolute -right-3 top-20 w-6 h-6 bg-white border border-surface-200 rounded-full items-center justify-center shadow-sm hover:shadow-md transition-all z-10"
      >
        {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
      </button>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:block relative flex-shrink-0 bg-white border-r border-surface-100 transition-all duration-300 ${
          collapsed ? 'w-16' : 'w-60'
        }`}
      >
        {sidebarContent}
      </aside>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 bottom-0 w-64 bg-white border-r border-surface-100 animate-slideInLeft">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-surface-100"
            >
              <X size={18} />
            </button>
            {sidebarContent}
          </aside>
        </div>
      )}

      {/* Profile Modal */}
      {showProfile && (
        <div className="modal-overlay" onClick={() => setShowProfile(false)}>
          <div className="modal-content max-w-sm p-8 animate-scaleIn" onClick={e => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-3xl font-bold text-white">A</span>
              </div>
              <h2 className="text-xl font-bold text-surface-900">Admin User</h2>
              <span className="badge-active mt-1">Administrator</span>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between py-2 border-b border-surface-100">
                <span className="text-surface-500">Email</span>
                <span className="font-medium">admin@clubhub.com</span>
              </div>
              <div className="flex justify-between py-2 border-b border-surface-100">
                <span className="text-surface-500">Phone</span>
                <span className="font-medium">+91 98765 43210</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-surface-500">Role</span>
                <span className="font-medium">Super Admin</span>
              </div>
            </div>
            <button onClick={() => setShowProfile(false)} className="btn-secondary w-full mt-6 justify-center">Close</button>
          </div>
        </div>
      )}
    </>
  );
}

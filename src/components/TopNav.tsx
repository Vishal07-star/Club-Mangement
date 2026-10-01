import React from 'react';
import { Bell, Menu, Search } from 'lucide-react';
import { useLocation } from 'react-router-dom';

const pageTitles: Record<string, string> = {
  '/dashboard':     'Dashboard',
  '/members':       'Members',
  '/memberships':   'Memberships',
  '/payments':      'Payments',
  '/events':        'Events',
  '/attendance':    'Attendance',
  '/facilities':    'Facilities',
  '/reports':       'Reports',
  '/announcements': 'Announcements',
  '/settings':      'Settings',
};

interface TopNavProps {
  onMenuClick: () => void;
}

export default function TopNav({ onMenuClick }: TopNavProps) {
  const { pathname } = useLocation();
  const title = pageTitles[pathname] || 'ClubHub';

  return (
    <header className="bg-white border-b border-surface-100 px-4 md:px-6 h-16 flex items-center justify-between flex-shrink-0 sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="md:hidden p-2 rounded-xl hover:bg-surface-100 transition-colors"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-surface-900">{title}</h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden sm:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
          <input
            className="pl-9 pr-4 py-2 text-sm border border-surface-200 rounded-xl bg-surface-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:bg-white w-48 transition-all"
            placeholder="Quick search..."
          />
        </div>
        <button className="relative p-2.5 rounded-xl hover:bg-surface-100 transition-colors">
          <Bell size={18} className="text-surface-600" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        <div className="w-8 h-8 bg-gradient-to-br from-primary-400 to-primary-600 rounded-full flex items-center justify-center shadow-sm">
          <span className="text-sm font-bold text-white">A</span>
        </div>
      </div>
    </header>
  );
}

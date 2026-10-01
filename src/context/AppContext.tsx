import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import {
  Member, Payment, Event, AttendanceRecord, Facility, Announcement,
  initialMembers, initialPayments, initialEvents, initialAttendance,
  initialFacilities, initialAnnouncements,
} from '../data/mockData';

// ── Toast ─────────────────────────────────────────────────────
interface Toast { id: string; message: string; type: 'success' | 'error' | 'info'; }

// ── Context type ─────────────────────────────────────────────
interface AppContextType {
  // Auth
  isLoggedIn: boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;

  // Data
  members: Member[];
  payments: Payment[];
  events: Event[];
  attendance: AttendanceRecord[];
  facilities: Facility[];
  announcements: Announcement[];

  // Member actions
  addMember: (m: Omit<Member, 'id'>) => void;
  updateMember: (m: Member) => void;
  deleteMember: (id: string) => void;

  // Payment actions
  addPayment: (p: Omit<Payment, 'id' | 'transactionId'>) => void;

  // Event actions
  addEvent: (e: Omit<Event, 'id'>) => void;
  updateEvent: (e: Event) => void;
  deleteEvent: (id: string) => void;

  // Attendance
  addAttendance: (a: Omit<AttendanceRecord, 'id'>) => void;

  // Facility
  updateFacility: (f: Facility) => void;

  // Announcement
  addAnnouncement: (a: Omit<Announcement, 'id'>) => void;
  deleteAnnouncement: (id: string) => void;

  // Toast
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'error' | 'info') => void;

  // Settings
  settings: Settings;
  updateSettings: (s: Partial<Settings>) => void;
}

interface Settings {
  clubName: string;
  email: string;
  phone: string;
  address: string;
  currency: string;
  membershipDuration: string;
  emailNotifications: boolean;
  eventNotifications: boolean;
  paymentNotifications: boolean;
}

const defaultSettings: Settings = {
  clubName: 'ClubHub',
  email: 'admin@clubhub.com',
  phone: '+91 98765 43210',
  address: 'Chennai, Tamil Nadu',
  currency: 'INR',
  membershipDuration: '12 Months',
  emailNotifications: true,
  eventNotifications: true,
  paymentNotifications: true,
};

const AppContext = createContext<AppContextType | null>(null);

let memberCounter = 1016;
let paymentCounter = 16;
let eventCounter = 7;
let attendanceCounter = 12;
let announcementCounter = 6;

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('ch_auth') === 'true');
  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [payments, setPayments] = useState<Payment[]>(initialPayments);
  const [events, setEvents] = useState<Event[]>(initialEvents);
  const [attendance, setAttendance] = useState<AttendanceRecord[]>(initialAttendance);
  const [facilities, setFacilities] = useState<Facility[]>(initialFacilities);
  const [announcements, setAnnouncements] = useState<Announcement[]>(initialAnnouncements);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500);
  }, []);

  const login = (email: string, password: string) => {
    if (email === 'admin@clubhub.com' && password === 'admin123') {
      setIsLoggedIn(true);
      localStorage.setItem('ch_auth', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('ch_auth');
  };

  // Members
  const addMember = (m: Omit<Member, 'id'>) => {
    const id = `CM-${memberCounter++}`;
    setMembers(prev => [{ ...m, id }, ...prev]);
    showToast('Member added successfully!');
  };
  const updateMember = (m: Member) => {
    setMembers(prev => prev.map(x => x.id === m.id ? m : x));
    showToast('Member updated successfully!');
  };
  const deleteMember = (id: string) => {
    setMembers(prev => prev.filter(x => x.id !== id));
    showToast('Member removed.', 'info');
  };

  // Payments
  const addPayment = (p: Omit<Payment, 'id' | 'transactionId'>) => {
    const id = `p${paymentCounter++}`;
    const transactionId = `TXN-2026-${String(paymentCounter).padStart(4,'0')}`;
    setPayments(prev => [{ ...p, id, transactionId }, ...prev]);
    showToast('Payment recorded successfully!');
  };

  // Events
  const addEvent = (e: Omit<Event, 'id'>) => {
    const id = `e${eventCounter++}`;
    setEvents(prev => [{ ...e, id }, ...prev]);
    showToast('Event created successfully!');
  };
  const updateEvent = (e: Event) => {
    setEvents(prev => prev.map(x => x.id === e.id ? e : x));
    showToast('Event updated successfully!');
  };
  const deleteEvent = (id: string) => {
    setEvents(prev => prev.filter(x => x.id !== id));
    showToast('Event deleted.', 'info');
  };

  // Attendance
  const addAttendance = (a: Omit<AttendanceRecord, 'id'>) => {
    const id = `a${attendanceCounter++}`;
    setAttendance(prev => [{ ...a, id }, ...prev]);
    showToast('Attendance marked successfully!');
  };

  // Facilities
  const updateFacility = (f: Facility) => {
    setFacilities(prev => prev.map(x => x.id === f.id ? f : x));
    showToast('Facility booking confirmed!');
  };

  // Announcements
  const addAnnouncement = (a: Omit<Announcement, 'id'>) => {
    const id = `an${announcementCounter++}`;
    setAnnouncements(prev => [{ ...a, id }, ...prev]);
    showToast('Announcement published!');
  };
  const deleteAnnouncement = (id: string) => {
    setAnnouncements(prev => prev.filter(x => x.id !== id));
    showToast('Announcement deleted.', 'info');
  };

  // Settings
  const updateSettings = (s: Partial<Settings>) => {
    setSettings(prev => ({ ...prev, ...s }));
    showToast('Settings saved!');
  };

  return (
    <AppContext.Provider value={{
      isLoggedIn, login, logout,
      members, payments, events, attendance, facilities, announcements,
      addMember, updateMember, deleteMember,
      addPayment,
      addEvent, updateEvent, deleteEvent,
      addAttendance,
      updateFacility,
      addAnnouncement, deleteAnnouncement,
      toasts, showToast,
      settings, updateSettings,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used inside AppProvider');
  return ctx;
}

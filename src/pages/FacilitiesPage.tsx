import React, { useState } from 'react';
import {
  Waves, Dumbbell, Target, Building2, Monitor, Zap, Heart, Flame,
  X, Users, Calendar, CheckCircle, AlertTriangle,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Facility } from '../data/mockData';

const iconMap: Record<string, React.ElementType> = {
  Waves, Dumbbell, Target, Building2, Monitor, Zap, Heart, Flame,
};

function BookingModal({ facility, onClose, onBook }: { facility: Facility; onClose: () => void; onBook: (f: Facility) => void }) {
  const [name, setName] = useState('');
  const [date, setDate] = useState('01 Oct 2026');
  const [time, setTime] = useState('10:00 AM');
  const [duration, setDuration] = useState('1 Hour');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-md animate-scaleIn" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-100 sticky top-0 bg-white rounded-t-2xl">
          <h2 className="text-lg font-bold">Book {facility.name}</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-surface-100 rounded-lg"><X size={18} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="bg-primary-50 border border-primary-100 rounded-xl p-3 flex items-center gap-3">
            <div className="w-10 h-10 bg-primary-100 rounded-xl flex items-center justify-center">
              {React.createElement(iconMap[facility.icon] || Building2, { size: 20, className: 'text-primary-600' })}
            </div>
            <div>
              <p className="font-semibold text-surface-800 text-sm">{facility.name}</p>
              <p className="text-xs text-surface-500">Capacity: {facility.capacity} persons</p>
            </div>
          </div>
          <div>
            <label className="label">Member Name *</label>
            <input className="input-field" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Rahul Sharma" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Date</label>
              <input className="input-field" value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <div>
              <label className="label">Time</label>
              <input className="input-field" value={time} onChange={e => setTime(e.target.value)} />
            </div>
          </div>
          <div>
            <label className="label">Duration</label>
            <select className="input-field" value={duration} onChange={e => setDuration(e.target.value)}>
              <option>30 Minutes</option>
              <option>1 Hour</option>
              <option>2 Hours</option>
              <option>Half Day</option>
              <option>Full Day</option>
            </select>
          </div>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-surface-100 justify-end">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button
            disabled={!name}
            onClick={() => {
              if (name) {
                onBook({ ...facility, todayBookings: facility.todayBookings + 1 });
                onClose();
              }
            }}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Confirm Booking
          </button>
        </div>
      </div>
    </div>
  );
}

const statusStyles: Record<string, { badge: string; dot: string }> = {
  Available:   { badge: 'badge-available', dot: 'bg-emerald-400' },
  Booked:      { badge: 'badge-booked',    dot: 'bg-blue-400'    },
  Maintenance: { badge: 'badge-cancelled', dot: 'bg-amber-400'   },
};

export default function FacilitiesPage() {
  const { facilities, updateFacility } = useApp();
  const [booking, setBooking] = useState<Facility | null>(null);

  const available   = facilities.filter(f => f.status === 'Available').length;
  const booked      = facilities.filter(f => f.status === 'Booked').length;
  const maintenance = facilities.filter(f => f.status === 'Maintenance').length;

  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="page-header">
        <h2 className="page-title">Facilities</h2>
        <p className="page-subtitle">Manage and book club facilities</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="stat-card">
          <div className="stat-icon bg-gradient-to-br from-emerald-500 to-emerald-600"><CheckCircle size={22} className="text-white" /></div>
          <div><p className="stat-label">Available</p><p className="stat-value">{available}</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-gradient-to-br from-blue-500 to-blue-600"><Calendar size={22} className="text-white" /></div>
          <div><p className="stat-label">Booked</p><p className="stat-value">{booked}</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-gradient-to-br from-amber-500 to-amber-600"><AlertTriangle size={22} className="text-white" /></div>
          <div><p className="stat-label">Under Maintenance</p><p className="stat-value">{maintenance}</p></div>
        </div>
      </div>

      {/* Facility Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {facilities.map(f => {
          const IconComp = iconMap[f.icon] || Building2;
          const styles = statusStyles[f.status] || statusStyles['Available'];
          return (
            <div key={f.id} className="card-hover flex flex-col gap-4">
              <div className="flex items-start justify-between">
                <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center shadow-sm">
                  <IconComp size={22} className="text-white" />
                </div>
                <span className={styles.badge}>{f.status}</span>
              </div>
              <div>
                <h3 className="font-bold text-surface-900 text-base">{f.name}</h3>
                <p className="text-surface-400 text-xs mt-1 line-clamp-2">{f.description}</p>
              </div>
              <div className="space-y-1.5 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-surface-500 flex items-center gap-1.5"><Users size={13} /> Capacity</span>
                  <span className="font-semibold text-surface-700">{f.capacity}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-surface-500 flex items-center gap-1.5"><Calendar size={13} /> Today's Bookings</span>
                  <span className="font-semibold text-surface-700">{f.todayBookings}</span>
                </div>
              </div>
              <button
                disabled={f.status === 'Maintenance'}
                onClick={() => setBooking(f)}
                className="btn-primary w-full justify-center disabled:opacity-50 disabled:cursor-not-allowed mt-auto"
              >
                {f.status === 'Maintenance' ? 'Under Maintenance' : 'Book Now'}
              </button>
            </div>
          );
        })}
      </div>

      {booking && (
        <BookingModal
          facility={booking}
          onClose={() => setBooking(null)}
          onBook={(updated) => { updateFacility(updated); setBooking(null); }}
        />
      )}
    </div>
  );
}

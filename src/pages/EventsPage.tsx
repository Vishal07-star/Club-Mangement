import React, { useState } from 'react';
import { Plus, Calendar, Clock, MapPin, Users, Edit2, Trash2, Eye, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Event } from '../data/mockData';

function EventModal({ event, onClose, onSave }: { event: Event | null; onClose: () => void; onSave: (e: any) => void }) {
  const isEdit = !!event;
  const [form, setForm] = useState<Omit<Event,'id'>>(event ? { ...event } : {
    name: '', date: '', time: '', location: '', capacity: 50,
    registered: 0, description: '', status: 'Upcoming',
  });
  const set = (k: string, v: any) => setForm(prev => ({ ...prev, [k]: v }));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-lg animate-scaleIn" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-100 sticky top-0 bg-white rounded-t-2xl">
          <h2 className="text-lg font-bold">{isEdit ? 'Edit Event' : 'Create Event'}</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-surface-100 rounded-lg"><X size={18}/></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="label">Event Name *</label>
            <input className="input-field" value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Annual Sports Day" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Date</label>
              <input className="input-field" value={form.date} onChange={e => set('date', e.target.value)} placeholder="October 12, 2026" />
            </div>
            <div>
              <label className="label">Time</label>
              <input className="input-field" value={form.time} onChange={e => set('time', e.target.value)} placeholder="10:00 AM" />
            </div>
          </div>
          <div>
            <label className="label">Location</label>
            <input className="input-field" value={form.location} onChange={e => set('location', e.target.value)} placeholder="e.g. Club Ground" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Capacity</label>
              <input className="input-field" type="number" value={form.capacity} onChange={e => set('capacity', Number(e.target.value))} />
            </div>
            <div>
              <label className="label">Status</label>
              <select className="input-field" value={form.status} onChange={e => set('status', e.target.value)}>
                <option>Upcoming</option><option>Ongoing</option><option>Completed</option><option>Cancelled</option>
              </select>
            </div>
          </div>
          <div>
            <label className="label">Description</label>
            <textarea className="input-field" rows={3} value={form.description} onChange={e => set('description', e.target.value)} placeholder="Event description..." />
          </div>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-surface-100 justify-end">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button onClick={() => { if (form.name) { onSave(isEdit ? { ...form, id: event!.id } : form); onClose(); } }} className="btn-primary">
            {isEdit ? 'Save Changes' : 'Create Event'}
          </button>
        </div>
      </div>
    </div>
  );
}

function EventDetailModal({ event, onClose }: { event: Event; onClose: () => void }) {
  const pct = Math.round((event.registered / event.capacity) * 100);
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-md animate-scaleIn" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-100 sticky top-0 bg-white rounded-t-2xl">
          <h2 className="text-lg font-bold">Event Details</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-surface-100 rounded-lg"><X size={18}/></button>
        </div>
        <div className="p-6">
          <span className={`badge-${event.status === 'Upcoming' ? 'active' : event.status === 'Cancelled' ? 'cancelled' : 'pending'} mb-3`}>{event.status}</span>
          <h3 className="text-2xl font-bold text-surface-900 mt-2 mb-4">{event.name}</h3>
          <div className="space-y-3 text-sm mb-6">
            <div className="flex items-center gap-3 text-surface-600"><Calendar size={16} className="text-primary-500"/>{event.date}</div>
            <div className="flex items-center gap-3 text-surface-600"><Clock size={16} className="text-primary-500"/>{event.time}</div>
            <div className="flex items-center gap-3 text-surface-600"><MapPin size={16} className="text-primary-500"/>{event.location}</div>
            <div className="flex items-center gap-3 text-surface-600"><Users size={16} className="text-primary-500"/>{event.registered} registered of {event.capacity} capacity</div>
          </div>
          <div className="mb-4">
            <div className="flex justify-between text-xs text-surface-500 mb-1">
              <span>Registration</span><span>{pct}%</span>
            </div>
            <div className="w-full bg-surface-100 rounded-full h-2">
              <div className="bg-primary-500 h-2 rounded-full transition-all" style={{ width: `${pct}%` }} />
            </div>
          </div>
          <p className="text-surface-600 text-sm">{event.description}</p>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-surface-100 justify-end">
          <button onClick={onClose} className="btn-secondary">Close</button>
        </div>
      </div>
    </div>
  );
}

const statusColor: Record<string, string> = {
  Upcoming: 'badge-active', Ongoing: 'badge-pending', Completed: 'badge-standard', Cancelled: 'badge-cancelled',
};

export default function EventsPage() {
  const { events, addEvent, updateEvent, deleteEvent } = useApp();
  const [showCreate, setShowCreate] = useState(false);
  const [editing, setEditing] = useState<Event | null>(null);
  const [viewing, setViewing] = useState<Event | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="page-header mb-0">
          <h2 className="page-title">Events</h2>
          <p className="page-subtitle">Manage club events and activities ({events.length} total)</p>
        </div>
        <button onClick={() => setShowCreate(true)} className="btn-primary flex-shrink-0"><Plus size={16}/> Create Event</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {events.map(e => {
          const pct = Math.round((e.registered / e.capacity) * 100);
          return (
            <div key={e.id} className="card-hover flex flex-col">
              {/* Color bar */}
              <div className={`h-1.5 -mx-6 -mt-6 mb-4 rounded-t-2xl ${pct > 80 ? 'bg-red-400' : pct > 50 ? 'bg-amber-400' : 'bg-emerald-400'}`} />
              <div className="flex items-start justify-between mb-3">
                <span className={statusColor[e.status] || 'badge-pending'}>{e.status}</span>
                <div className="flex gap-1.5">
                  <button onClick={() => setViewing(e)} className="p-1.5 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-colors"><Eye size={14}/></button>
                  <button onClick={() => setEditing(e)} className="p-1.5 rounded-lg hover:bg-amber-50 hover:text-amber-600 transition-colors"><Edit2 size={14}/></button>
                  <button onClick={() => setDeleteConfirm(e.id)} className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors"><Trash2 size={14}/></button>
                </div>
              </div>
              <h3 className="font-bold text-surface-900 text-lg mb-3">{e.name}</h3>
              <div className="space-y-1.5 text-sm text-surface-500 mb-4">
                <div className="flex items-center gap-2"><Calendar size={14}/>{e.date}</div>
                <div className="flex items-center gap-2"><Clock size={14}/>{e.time}</div>
                <div className="flex items-center gap-2"><MapPin size={14}/>{e.location}</div>
              </div>
              <div className="mt-auto">
                <div className="flex justify-between text-xs text-surface-500 mb-1">
                  <span className="flex items-center gap-1"><Users size={12}/> {e.registered} / {e.capacity}</span>
                  <span>{pct}% full</span>
                </div>
                <div className="w-full bg-surface-100 rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full transition-all ${pct > 80 ? 'bg-red-400' : pct > 50 ? 'bg-amber-400' : 'bg-emerald-400'}`} style={{ width: `${pct}%` }} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showCreate && <EventModal event={null}   onClose={() => setShowCreate(false)} onSave={addEvent}    />}
      {editing    && <EventModal event={editing} onClose={() => setEditing(null)}    onSave={updateEvent} />}
      {viewing    && <EventDetailModal event={viewing} onClose={() => setViewing(null)} />}
      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-content max-w-sm p-6 animate-scaleIn">
            <h3 className="text-lg font-bold mb-2">Delete Event</h3>
            <p className="text-surface-500 text-sm mb-6">Are you sure you want to delete this event?</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="btn-secondary">Cancel</button>
              <button onClick={() => { deleteEvent(deleteConfirm); setDeleteConfirm(null); }} className="btn-danger">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

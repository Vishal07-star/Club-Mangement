import React, { useState } from 'react';
import { Plus, Activity, TrendingUp, Award, Percent, X, Search } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { useApp } from '../context/AppContext';
import { weeklyAttendance } from '../data/mockData';

function CheckInModal({ onClose, onSave, members }: { onClose: () => void; onSave: (a: any) => void; members: any[] }) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<any>(null);
  const [checkIn, setCheckIn] = useState('08:00 AM');

  const filtered = members.filter(m => m.name.toLowerCase().includes(search.toLowerCase()) || m.id.includes(search));

  const today = new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-md animate-scaleIn" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-100 sticky top-0 bg-white rounded-t-2xl">
          <h2 className="text-lg font-bold">Check In Member</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-surface-100 rounded-lg"><X size={18}/></button>
        </div>
        <div className="p-6 space-y-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
            <input className="input-field pl-9" placeholder="Search member by name or ID..." value={search} onChange={e => { setSearch(e.target.value); setSelected(null); }} />
          </div>
          {search && !selected && (
            <div className="border border-surface-200 rounded-xl overflow-hidden max-h-48 overflow-y-auto">
              {filtered.length === 0 ? (
                <p className="text-center text-surface-400 py-4 text-sm">No members found</p>
              ) : filtered.slice(0, 8).map(m => (
                <button key={m.id} onClick={() => { setSelected(m); setSearch(m.name); }}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-primary-50 text-left border-b border-surface-50 last:border-0 transition-colors">
                  <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center text-primary-700 text-xs font-bold">
                    {m.name.split(' ').map((n: string) => n[0]).join('')}
                  </div>
                  <div>
                    <p className="text-sm font-medium text-surface-800">{m.name}</p>
                    <p className="text-xs text-surface-400">{m.id} · {m.membership}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
          {selected && (
            <div className="bg-primary-50 border border-primary-200 rounded-xl p-4">
              <p className="text-sm font-semibold text-primary-800">{selected.name}</p>
              <p className="text-xs text-primary-600">{selected.id} · {selected.membership} Member</p>
            </div>
          )}
          <div>
            <label className="label">Check In Time</label>
            <input className="input-field" value={checkIn} onChange={e => setCheckIn(e.target.value)} />
          </div>
          <div>
            <label className="label">Date</label>
            <input className="input-field bg-surface-50" value={today} readOnly />
          </div>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-surface-100 justify-end">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button
            disabled={!selected}
            onClick={() => {
              if (selected) {
                onSave({ memberId: selected.id, memberName: selected.name, date: today, checkIn, checkOut: '—', status: 'Present' });
                onClose();
              }
            }}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Mark Present
          </button>
        </div>
      </div>
    </div>
  );
}

const statusBadge: Record<string, string> = { Present: 'badge-active', Absent: 'badge-expired', Late: 'badge-pending' };

export default function AttendancePage() {
  const { attendance, members, addAttendance } = useApp();
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="page-header mb-0">
          <h2 className="page-title">Attendance</h2>
          <p className="page-subtitle">Track member check-ins and attendance records</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex-shrink-0"><Plus size={16}/> Check In Member</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="stat-card"><div className="stat-icon bg-gradient-to-br from-primary-500 to-primary-600"><Activity size={22} className="text-white"/></div><div><p className="stat-label">Today's Attendance</p><p className="stat-value">324</p></div></div>
        <div className="stat-card"><div className="stat-icon bg-gradient-to-br from-cyan-500 to-cyan-600"><TrendingUp size={22} className="text-white"/></div><div><p className="stat-label">Average Attendance</p><p className="stat-value">287</p></div></div>
        <div className="stat-card"><div className="stat-icon bg-gradient-to-br from-emerald-500 to-emerald-600"><Award size={22} className="text-white"/></div><div><p className="stat-label">Highest Attendance</p><p className="stat-value">412</p></div></div>
        <div className="stat-card"><div className="stat-icon bg-gradient-to-br from-violet-500 to-violet-600"><Percent size={22} className="text-white"/></div><div><p className="stat-label">Attendance Rate</p><p className="stat-value">78%</p></div></div>
      </div>

      {/* Chart */}
      <div className="card">
        <h3 className="font-semibold text-surface-900 mb-4">Weekly Attendance Overview</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={weeklyAttendance} barSize={36}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false}/>
            <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false}/>
            <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false}/>
            <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 13 }}/>
            <Bar dataKey="attendance" fill="#6366f1" radius={[6, 6, 0, 0]}/>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-surface-100">
          <h3 className="font-semibold text-surface-900">Today's Records</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-50 border-b border-surface-100">
              <tr>{['Member','Date','Check In','Check Out','Status'].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-surface-500 px-4 py-3 whitespace-nowrap">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-surface-50">
              {attendance.map(a => (
                <tr key={a.id} className="table-row-hover">
                  <td className="px-4 py-3 font-medium text-surface-800">{a.memberName}</td>
                  <td className="px-4 py-3 text-surface-500">{a.date}</td>
                  <td className="px-4 py-3 text-surface-600 font-medium">{a.checkIn}</td>
                  <td className="px-4 py-3 text-surface-500">{a.checkOut}</td>
                  <td className="px-4 py-3">
                    <span className={statusBadge[a.status] || 'badge-pending'}>{a.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && <CheckInModal onClose={() => setShowModal(false)} onSave={addAttendance} members={members} />}
    </div>
  );
}

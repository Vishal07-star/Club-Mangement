import React, { useState, useMemo } from 'react';
import { Search, Plus, Download, Edit2, Trash2, Eye, X, Filter } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Member } from '../data/mockData';

// ── Helpers ──────────────────────────────────────────────────
const initials = (name: string) => name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();
const avatarColor = (name: string) => {
  const colors = ['bg-violet-500','bg-cyan-500','bg-emerald-500','bg-amber-500','bg-pink-500','bg-blue-500','bg-orange-500','bg-teal-500'];
  return colors[name.charCodeAt(0) % colors.length];
};

// ── Add/Edit Modal ────────────────────────────────────────────
const emptyForm = (): Omit<Member, 'id'> => ({
  name: '', email: '', phone: '', dob: '', address: '',
  membership: 'Standard', joinDate: new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }),
  expiryDate: '', status: 'Active', paymentStatus: 'Pending', attendance: 0,
});

function MemberModal({ member, onClose, onSave }: {
  member: Member | null; onClose: () => void; onSave: (m: any) => void;
}) {
  const isEdit = !!member;
  const [form, setForm] = useState<Omit<Member,'id'>>(member ? { ...member } : emptyForm());
  const set = (k: keyof typeof form, v: any) => setForm(prev => ({ ...prev, [k]: v }));

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-2xl animate-scaleIn" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-100 sticky top-0 bg-white rounded-t-2xl">
          <h2 className="text-lg font-bold">{isEdit ? 'Edit Member' : 'Add New Member'}</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-surface-100 rounded-lg"><X size={18}/></button>
        </div>
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className="label">Full Name *</label>
            <input className="input-field" value={form.name} onChange={e => set('name', e.target.value)} placeholder="e.g. Rahul Sharma" />
          </div>
          <div>
            <label className="label">Email *</label>
            <input className="input-field" type="email" value={form.email} onChange={e => set('email', e.target.value)} placeholder="email@example.com" />
          </div>
          <div>
            <label className="label">Phone</label>
            <input className="input-field" value={form.phone} onChange={e => set('phone', e.target.value)} placeholder="+91 98XXX XXXXX" />
          </div>
          <div>
            <label className="label">Date of Birth</label>
            <input className="input-field" value={form.dob} onChange={e => set('dob', e.target.value)} placeholder="15 Mar 1992" />
          </div>
          <div>
            <label className="label">Membership Plan</label>
            <select className="input-field" value={form.membership} onChange={e => set('membership', e.target.value as any)}>
              <option>Basic</option><option>Standard</option><option>Premium</option>
            </select>
          </div>
          <div>
            <label className="label">Join Date</label>
            <input className="input-field" value={form.joinDate} onChange={e => set('joinDate', e.target.value)} />
          </div>
          <div>
            <label className="label">Expiry Date</label>
            <input className="input-field" value={form.expiryDate} onChange={e => set('expiryDate', e.target.value)} placeholder="11 Sep 2027" />
          </div>
          <div>
            <label className="label">Status</label>
            <select className="input-field" value={form.status} onChange={e => set('status', e.target.value as any)}>
              <option>Active</option><option>Pending</option><option>Expired</option>
            </select>
          </div>
          <div>
            <label className="label">Payment Status</label>
            <select className="input-field" value={form.paymentStatus} onChange={e => set('paymentStatus', e.target.value as any)}>
              <option>Paid</option><option>Pending</option><option>Failed</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="label">Address</label>
            <input className="input-field" value={form.address} onChange={e => set('address', e.target.value)} placeholder="Street, City, State" />
          </div>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-surface-100 justify-end">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button onClick={() => { if (form.name && form.email) { onSave(isEdit ? { ...form, id: member!.id } : form); onClose(); } }} className="btn-primary">
            {isEdit ? 'Save Changes' : 'Add Member'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Details Modal ─────────────────────────────────────────────
function DetailModal({ member, onClose, onEdit }: { member: Member; onClose: () => void; onEdit: () => void }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-lg animate-scaleIn" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-100 sticky top-0 bg-white rounded-t-2xl">
          <h2 className="text-lg font-bold">Member Details</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-surface-100 rounded-lg"><X size={18}/></button>
        </div>
        <div className="p-6">
          {/* Avatar */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-16 h-16 rounded-2xl ${avatarColor(member.name)} flex items-center justify-center text-white text-xl font-bold shadow-sm`}>
              {initials(member.name)}
            </div>
            <div>
              <h3 className="text-xl font-bold text-surface-900">{member.name}</h3>
              <p className="text-surface-500 text-sm">{member.id}</p>
              <span className={member.status === 'Active' ? 'badge-active' : member.status === 'Expired' ? 'badge-expired' : 'badge-pending'}>{member.status}</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 text-sm">
            {[
              ['Email', member.email],
              ['Phone', member.phone],
              ['Date of Birth', member.dob],
              ['Membership', member.membership],
              ['Join Date', member.joinDate],
              ['Expiry Date', member.expiryDate || '—'],
              ['Payment', member.paymentStatus],
              ['Attendance', `${member.attendance} sessions`],
            ].map(([label, val]) => (
              <div key={label} className="bg-surface-50 rounded-xl p-3">
                <p className="text-surface-400 text-xs mb-0.5">{label}</p>
                <p className="font-medium text-surface-800 truncate">{val}</p>
              </div>
            ))}
            <div className="col-span-2 bg-surface-50 rounded-xl p-3">
              <p className="text-surface-400 text-xs mb-0.5">Address</p>
              <p className="font-medium text-surface-800">{member.address}</p>
            </div>
          </div>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-surface-100 justify-end">
          <button onClick={onClose} className="btn-secondary">Close</button>
          <button onClick={onEdit} className="btn-primary"><Edit2 size={14}/> Edit Member</button>
        </div>
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────
export default function MembersPage() {
  const { members, addMember, updateMember, deleteMember } = useApp();
  const [search, setSearch] = useState('');
  const [filterPlan, setFilterPlan] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [showAdd, setShowAdd] = useState(false);
  const [editing, setEditing] = useState<Member | null>(null);
  const [viewing, setViewing] = useState<Member | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  const filtered = useMemo(() => members.filter(m => {
    const q = search.toLowerCase();
    if (q && !m.name.toLowerCase().includes(q) && !m.email.toLowerCase().includes(q) && !m.id.toLowerCase().includes(q)) return false;
    if (filterPlan !== 'All' && m.membership !== filterPlan) return false;
    if (filterStatus !== 'All' && m.status !== filterStatus) return false;
    return true;
  }), [members, search, filterPlan, filterStatus]);

  const exportCSV = () => {
    const rows = ['ID,Name,Email,Phone,Membership,Join Date,Status', ...members.map(m => `${m.id},${m.name},${m.email},${m.phone},${m.membership},${m.joinDate},${m.status}`)];
    const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href = url; a.download = 'members.csv'; a.click();
  };

  return (
    <div className="space-y-5 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="page-header mb-0">
          <h2 className="page-title">Members</h2>
          <p className="page-subtitle">Manage all club members ({members.length} total)</p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button onClick={exportCSV} className="btn-secondary"><Download size={16}/> Export</button>
          <button onClick={() => setShowAdd(true)} className="btn-primary"><Plus size={16}/> Add Member</button>
        </div>
      </div>

      {/* Filters */}
      <div className="card p-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-surface-400" />
            <input className="input-field pl-9" placeholder="Search members..." value={search} onChange={e => setSearch(e.target.value)} />
          </div>
          <select className="input-field sm:w-36" value={filterPlan} onChange={e => setFilterPlan(e.target.value)}>
            <option value="All">All Plans</option>
            <option>Premium</option><option>Standard</option><option>Basic</option>
          </select>
          <select className="input-field sm:w-36" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
            <option value="All">All Status</option>
            <option>Active</option><option>Expired</option><option>Pending</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-50 border-b border-surface-100">
              <tr>
                {['Member ID','Member','Email','Phone','Membership','Join Date','Status','Actions'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-surface-500 px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-50">
              {filtered.length === 0 ? (
                <tr><td colSpan={8} className="text-center py-12 text-surface-400">No members found.</td></tr>
              ) : filtered.map(m => (
                <tr key={m.id} className="table-row-hover">
                  <td className="px-4 py-3 font-mono text-xs text-surface-500 whitespace-nowrap">{m.id}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg ${avatarColor(m.name)} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                        {initials(m.name)}
                      </div>
                      <span className="font-medium text-surface-800 whitespace-nowrap">{m.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-surface-500 whitespace-nowrap">{m.email}</td>
                  <td className="px-4 py-3 text-surface-500 whitespace-nowrap">{m.phone}</td>
                  <td className="px-4 py-3">
                    <span className={m.membership === 'Premium' ? 'badge-premium' : m.membership === 'Standard' ? 'badge-standard' : 'badge-basic'}>{m.membership}</span>
                  </td>
                  <td className="px-4 py-3 text-surface-500 whitespace-nowrap">{m.joinDate}</td>
                  <td className="px-4 py-3">
                    <span className={m.status === 'Active' ? 'badge-active' : m.status === 'Expired' ? 'badge-expired' : 'badge-pending'}>{m.status}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <button onClick={() => setViewing(m)} className="p-1.5 rounded-lg hover:bg-primary-50 hover:text-primary-600 transition-colors" title="View"><Eye size={15}/></button>
                      <button onClick={() => setEditing(m)} className="p-1.5 rounded-lg hover:bg-amber-50 hover:text-amber-600 transition-colors" title="Edit"><Edit2 size={15}/></button>
                      <button onClick={() => setDeleteConfirm(m.id)} className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors" title="Delete"><Trash2 size={15}/></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-surface-100 text-xs text-surface-400">
          Showing {filtered.length} of {members.length} members
        </div>
      </div>

      {/* Modals */}
      {showAdd    && <MemberModal member={null} onClose={() => setShowAdd(false)}    onSave={addMember}    />}
      {editing    && <MemberModal member={editing} onClose={() => setEditing(null)}  onSave={updateMember} />}
      {viewing    && !editing && (
        <DetailModal member={viewing} onClose={() => setViewing(null)} onEdit={() => { setEditing(viewing); setViewing(null); }} />
      )}
      {deleteConfirm && (
        <div className="modal-overlay">
          <div className="modal-content max-w-sm p-6 animate-scaleIn">
            <h3 className="text-lg font-bold mb-2">Confirm Delete</h3>
            <p className="text-surface-500 text-sm mb-6">Are you sure you want to remove this member? This action cannot be undone.</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteConfirm(null)} className="btn-secondary">Cancel</button>
              <button onClick={() => { deleteMember(deleteConfirm); setDeleteConfirm(null); }} className="btn-danger">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

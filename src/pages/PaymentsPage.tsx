import React, { useState } from 'react';
import { Plus, X, IndianRupee, TrendingUp, Clock, RefreshCw } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Payment } from '../data/mockData';

function PaymentModal({ onClose, onSave, members }: { onClose: () => void; onSave: (p: any) => void; members: any[] }) {
  const [form, setForm] = useState({
    memberId: members[0]?.id || '',
    memberName: members[0]?.name || '',
    amount: '',
    date: new Date().toLocaleDateString('en-GB', { day:'2-digit', month:'short', year:'numeric' }),
    method: 'UPI' as Payment['method'],
    status: 'Paid' as Payment['status'],
    description: 'Membership Fee',
  });

  const set = (k: string, v: any) => setForm(prev => ({ ...prev, [k]: v }));
  const handleMemberChange = (id: string) => {
    const m = members.find(x => x.id === id);
    set('memberId', id);
    set('memberName', m?.name || '');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-lg animate-scaleIn" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-100 sticky top-0 bg-white rounded-t-2xl">
          <h2 className="text-lg font-bold">Record Payment</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-surface-100 rounded-lg"><X size={18}/></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="label">Member *</label>
            <select className="input-field" value={form.memberId} onChange={e => handleMemberChange(e.target.value)}>
              {members.map(m => <option key={m.id} value={m.id}>{m.name} ({m.id})</option>)}
            </select>
          </div>
          <div>
            <label className="label">Amount (₹) *</label>
            <input className="input-field" type="number" value={form.amount} onChange={e => set('amount', e.target.value)} placeholder="e.g. 8000" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Payment Method</label>
              <select className="input-field" value={form.method} onChange={e => set('method', e.target.value)}>
                <option>UPI</option><option>Card</option><option>Cash</option><option>Bank Transfer</option>
              </select>
            </div>
            <div>
              <label className="label">Status</label>
              <select className="input-field" value={form.status} onChange={e => set('status', e.target.value)}>
                <option>Paid</option><option>Pending</option><option>Failed</option>
              </select>
            </div>
          </div>
          <div>
            <label className="label">Description</label>
            <input className="input-field" value={form.description} onChange={e => set('description', e.target.value)} />
          </div>
          <div>
            <label className="label">Date</label>
            <input className="input-field" value={form.date} onChange={e => set('date', e.target.value)} />
          </div>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-surface-100 justify-end">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button onClick={() => { if (form.memberId && form.amount) { onSave({ ...form, amount: Number(form.amount) }); onClose(); } }} className="btn-primary">Record Payment</button>
        </div>
      </div>
    </div>
  );
}

const methodColors: Record<string, string> = {
  UPI: 'bg-violet-100 text-violet-700',
  Card: 'bg-blue-100 text-blue-700',
  Cash: 'bg-emerald-100 text-emerald-700',
  'Bank Transfer': 'bg-amber-100 text-amber-700',
};

export default function PaymentsPage() {
  const { payments, members, addPayment } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [filterStatus, setFilterStatus] = useState('All');

  const totalRevenue = payments.filter(p => p.status === 'Paid').reduce((s, p) => s + p.amount, 0);
  const thisMonth    = payments.filter(p => p.status === 'Paid' && p.date.includes('Sep 2026')).reduce((s, p) => s + p.amount, 0);
  const pending      = payments.filter(p => p.status === 'Pending').reduce((s, p) => s + p.amount, 0);
  const refunded     = 4500;

  const filtered = filterStatus === 'All' ? payments : payments.filter(p => p.status === filterStatus);

  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="page-header mb-0">
          <h2 className="page-title">Payments</h2>
          <p className="page-subtitle">Track and manage all transactions</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex-shrink-0"><Plus size={16}/> Record Payment</button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="stat-card">
          <div className="stat-icon bg-gradient-to-br from-primary-500 to-primary-600"><IndianRupee size={22} className="text-white"/></div>
          <div><p className="stat-label">Total Revenue</p><p className="stat-value">₹{totalRevenue.toLocaleString('en-IN')}</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-gradient-to-br from-emerald-500 to-emerald-600"><TrendingUp size={22} className="text-white"/></div>
          <div><p className="stat-label">This Month</p><p className="stat-value">₹{thisMonth.toLocaleString('en-IN') || '82,500'}</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-gradient-to-br from-amber-500 to-amber-600"><Clock size={22} className="text-white"/></div>
          <div><p className="stat-label">Pending</p><p className="stat-value">₹{pending.toLocaleString('en-IN')}</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-gradient-to-br from-pink-500 to-pink-600"><RefreshCw size={22} className="text-white"/></div>
          <div><p className="stat-label">Refunded</p><p className="stat-value">₹{refunded.toLocaleString('en-IN')}</p></div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 flex-wrap">
        {['All','Paid','Pending','Failed'].map(s => (
          <button key={s} onClick={() => setFilterStatus(s)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filterStatus === s ? 'bg-primary-600 text-white shadow-sm' : 'bg-white border border-surface-200 text-surface-600 hover:bg-surface-50'}`}>
            {s}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="card p-0 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-surface-50 border-b border-surface-100">
              <tr>
                {['Transaction ID','Member','Amount','Date','Method','Status'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-surface-500 px-4 py-3 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-50">
              {filtered.map(p => (
                <tr key={p.id} className="table-row-hover">
                  <td className="px-4 py-3 font-mono text-xs text-surface-500">{p.transactionId}</td>
                  <td className="px-4 py-3 font-medium text-surface-800 whitespace-nowrap">{p.memberName}</td>
                  <td className="px-4 py-3 font-bold text-surface-800">₹{p.amount.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-3 text-surface-500 whitespace-nowrap">{p.date}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${methodColors[p.method] || 'bg-surface-100 text-surface-700'}`}>{p.method}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={p.status === 'Paid' ? 'badge-paid' : p.status === 'Pending' ? 'badge-pending' : 'badge-failed'}>{p.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-4 py-3 border-t border-surface-100 text-xs text-surface-400">
          Showing {filtered.length} of {payments.length} transactions
        </div>
      </div>

      {showModal && <PaymentModal onClose={() => setShowModal(false)} onSave={addPayment} members={members} />}
    </div>
  );
}

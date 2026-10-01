import React from 'react';
import { Shield, Edit2, CheckCircle, Users } from 'lucide-react';
import { useApp } from '../context/AppContext';

const plans = [
  { name: 'Basic',    price: '₹2,000', duration: '1 Year', color: 'border-surface-300 bg-surface-50', iconColor: 'bg-surface-200 text-surface-700',
    benefits: ['Gym Access (6 AM – 10 PM)', 'Swimming Pool (2 hrs/day)', 'Locker Room Access', 'Parking (Weekends)'],
    count: 268 },
  { name: 'Standard', price: '₹4,500', duration: '1 Year', color: 'border-blue-200 bg-blue-50', iconColor: 'bg-blue-100 text-blue-700',
    benefits: ['All Basic Benefits', 'Tennis Court (1 hr/day)', 'Yoga Classes', 'Guest Pass (2/month)', 'Priority Booking'],
    count: 560 },
  { name: 'Premium',  price: '₹8,000', duration: '1 Year', color: 'border-violet-300 bg-violet-50', iconColor: 'bg-violet-100 text-violet-700',
    popular: true,
    benefits: ['All Standard Benefits', 'Unlimited Facility Access', 'Personal Trainer (2/week)', 'Sauna & Spa', 'Guest Pass (5/month)', 'Event Priority Access', '24/7 Access'],
    count: 420 },
];

export default function MembershipsPage() {
  const { members } = useApp();
  const active   = members.filter(m => m.status === 'Active').length;
  const expired  = members.filter(m => m.status === 'Expired').length;
  const expiring = Math.min(72, active); // demo value

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="page-header">
        <h2 className="page-title">Memberships</h2>
        <p className="page-subtitle">Manage membership plans and subscriptions</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="stat-card">
          <div className="stat-icon bg-gradient-to-br from-emerald-500 to-emerald-600"><CheckCircle size={22} className="text-white"/></div>
          <div><p className="stat-label">Active Memberships</p><p className="stat-value">{active.toLocaleString()}</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-gradient-to-br from-amber-500 to-amber-600"><Shield size={22} className="text-white"/></div>
          <div><p className="stat-label">Expiring This Month</p><p className="stat-value">{expiring}</p></div>
        </div>
        <div className="stat-card">
          <div className="stat-icon bg-gradient-to-br from-red-500 to-red-600"><Users size={22} className="text-white"/></div>
          <div><p className="stat-label">Expired</p><p className="stat-value">{expired}</p></div>
        </div>
      </div>

      {/* Plan Cards */}
      <h3 className="font-semibold text-surface-900">Membership Plans</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {plans.map(p => (
          <div key={p.name} className={`relative card border-2 ${p.color} hover:shadow-card-hover transition-all duration-200`}>
            {p.popular && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-gradient-to-r from-violet-500 to-primary-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  Most Popular
                </span>
              </div>
            )}
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${p.iconColor}`}>
                <Shield size={20} />
              </div>
              <button className="btn-secondary py-1.5 px-3 text-xs"><Edit2 size={12}/> Edit</button>
            </div>
            <h3 className="text-xl font-bold text-surface-900">{p.name}</h3>
            <div className="flex items-baseline gap-1 mt-1 mb-4">
              <span className="text-3xl font-extrabold text-surface-900">{p.price}</span>
              <span className="text-surface-400 text-sm">/ year</span>
            </div>
            <div className="flex items-center gap-2 mb-4 text-sm text-surface-500">
              <Users size={14}/>
              <span><strong className="text-surface-700">{p.count}</strong> members</span>
            </div>
            <ul className="space-y-2">
              {p.benefits.map(b => (
                <li key={b} className="flex items-center gap-2 text-sm text-surface-600">
                  <CheckCircle size={14} className="text-emerald-500 flex-shrink-0"/>
                  {b}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Membership Table */}
      <div className="card">
        <h3 className="font-semibold text-surface-900 mb-4">All Memberships</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-surface-100">
              <tr>{['Member','Plan','Start Date','Expiry Date','Status'].map(h => (
                <th key={h} className="text-left text-xs font-semibold text-surface-500 pb-3 pr-4 whitespace-nowrap">{h}</th>
              ))}</tr>
            </thead>
            <tbody className="divide-y divide-surface-50">
              {members.slice(0, 12).map(m => (
                <tr key={m.id} className="table-row-hover">
                  <td className="py-3 pr-4 font-medium text-surface-800">{m.name}</td>
                  <td className="py-3 pr-4">
                    <span className={m.membership === 'Premium' ? 'badge-premium' : m.membership === 'Standard' ? 'badge-standard' : 'badge-basic'}>{m.membership}</span>
                  </td>
                  <td className="py-3 pr-4 text-surface-500 whitespace-nowrap">{m.joinDate}</td>
                  <td className="py-3 pr-4 text-surface-500 whitespace-nowrap">{m.expiryDate || '—'}</td>
                  <td className="py-3">
                    <span className={m.status === 'Active' ? 'badge-active' : m.status === 'Expired' ? 'badge-expired' : 'badge-pending'}>{m.status}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

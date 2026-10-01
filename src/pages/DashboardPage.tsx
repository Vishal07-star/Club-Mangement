import React from 'react';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import {
  Users, UserCheck, AlertCircle, TrendingUp, UserPlus, Calendar,
  Activity, Clock, ArrowUpRight, Crown,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  membershipGrowthData, revenueData, membershipDistribution, weeklyAttendance,
} from '../data/mockData';

const StatCard = ({ icon: Icon, iconBg, label, value, change, changeType }: any) => (
  <div className="stat-card">
    <div className={`stat-icon ${iconBg}`}>
      <Icon size={22} className="text-white" />
    </div>
    <div className="flex-1 min-w-0">
      <p className="stat-label">{label}</p>
      <p className="stat-value">{value}</p>
      {change && (
        <p className={`stat-change ${changeType === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
          {changeType === 'up' ? '↑' : '↓'} {change}
        </p>
      )}
    </div>
  </div>
);

const formatCurrency = (v: number) =>
  '₹' + v.toLocaleString('en-IN');

const CustomTooltipRevenue = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-surface-100 rounded-xl p-3 shadow-lg text-sm">
      <p className="font-semibold text-surface-700 mb-1">{label}</p>
      <p className="text-primary-600 font-bold">{formatCurrency(payload[0].value)}</p>
    </div>
  );
};

export default function DashboardPage() {
  const { members, events } = useApp();
  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good Morning' : hour < 17 ? 'Good Afternoon' : 'Good Evening';

  const recentMembers = members.slice(0, 5);
  const upcomingEvents = events.slice(0, 3);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="page-header">
        <h2 className="text-2xl font-bold text-surface-900">{greeting}, Admin 👋</h2>
        <p className="page-subtitle">Here's what's happening with your club today.</p>
      </div>

      {/* Primary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={Users}     iconBg="bg-gradient-to-br from-primary-500 to-primary-600" label="Total Members"       value="1,248"     change="4.2% vs last month" changeType="up"   />
        <StatCard icon={UserCheck} iconBg="bg-gradient-to-br from-emerald-500 to-emerald-600"  label="Active Members"      value="1,086"     change="2.1% vs last month" changeType="up"   />
        <StatCard icon={AlertCircle} iconBg="bg-gradient-to-br from-red-500 to-red-600"        label="Expired Memberships" value="87"        change="12 this week"       changeType="up"   />
        <StatCard icon={TrendingUp} iconBg="bg-gradient-to-br from-violet-500 to-violet-600"   label="Monthly Revenue"    value="₹4,82,500" change="8.3% vs last month" changeType="up"   />
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard icon={UserPlus}  iconBg="bg-gradient-to-br from-cyan-500 to-cyan-600"    label="New Members This Month" value="+86"  />
        <StatCard icon={Calendar}  iconBg="bg-gradient-to-br from-amber-500 to-amber-600"  label="Upcoming Events"        value="12"   />
        <StatCard icon={Activity}  iconBg="bg-gradient-to-br from-pink-500 to-pink-600"    label="Today's Attendance"     value="324"  />
        <StatCard icon={Clock}     iconBg="bg-gradient-to-br from-orange-500 to-orange-600" label="Pending Payments"      value="18"   />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Membership Growth */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-surface-900">Membership Growth</h3>
              <p className="text-xs text-surface-400 mt-0.5">Last 6 months</p>
            </div>
            <span className="badge-active text-xs">+27.3%</span>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={membershipGrowthData}>
              <defs>
                <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={['dataMin - 50', 'dataMax + 50']} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 13 }} />
              <Area type="monotone" dataKey="members" stroke="#6366f1" strokeWidth={2.5} fill="url(#colorMembers)" dot={{ fill: '#6366f1', r: 4 }} activeDot={{ r: 6 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Membership Distribution */}
        <div className="card">
          <div className="mb-4">
            <h3 className="font-semibold text-surface-900">Plan Distribution</h3>
            <p className="text-xs text-surface-400 mt-0.5">By membership type</p>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart>
              <Pie data={membershipDistribution} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={4} dataKey="value">
                {membershipDistribution.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 13 }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-2 mt-2">
            {membershipDistribution.map(d => (
              <div key={d.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                  <span className="text-surface-600">{d.name}</span>
                </div>
                <span className="font-semibold text-surface-800">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Revenue */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-surface-900">Revenue Overview</h3>
              <p className="text-xs text-surface-400 mt-0.5">Monthly revenue (₹)</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={revenueData} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v/1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltipRevenue />} />
              <Bar dataKey="revenue" fill="#6366f1" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Attendance */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-semibold text-surface-900">Weekly Attendance</h3>
              <p className="text-xs text-surface-400 mt-0.5">This week</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={weeklyAttendance} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 13 }} />
              <Bar dataKey="attendance" fill="#06b6d4" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom tables */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Recent Members */}
        <div className="card lg:col-span-3">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-surface-900">Recent Members</h3>
            <a href="/members" className="text-xs text-primary-600 font-medium hover:underline flex items-center gap-1">
              View all <ArrowUpRight size={12} />
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-100">
                  {['Member ID','Name','Membership','Join Date','Status'].map(h => (
                    <th key={h} className="text-left text-xs text-surface-400 font-semibold pb-2 pr-3">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-50">
                {recentMembers.map(m => (
                  <tr key={m.id} className="table-row-hover">
                    <td className="py-2.5 pr-3 font-mono text-xs text-surface-500">{m.id}</td>
                    <td className="py-2.5 pr-3 font-medium text-surface-800">{m.name}</td>
                    <td className="py-2.5 pr-3">
                      <span className={m.membership === 'Premium' ? 'badge-premium' : m.membership === 'Standard' ? 'badge-standard' : 'badge-basic'}>{m.membership}</span>
                    </td>
                    <td className="py-2.5 pr-3 text-surface-500">{m.joinDate}</td>
                    <td className="py-2.5">
                      <span className={m.status === 'Active' ? 'badge-active' : m.status === 'Expired' ? 'badge-expired' : 'badge-pending'}>{m.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-surface-900">Upcoming Events</h3>
            <a href="/events" className="text-xs text-primary-600 font-medium hover:underline flex items-center gap-1">
              View all <ArrowUpRight size={12} />
            </a>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map(e => (
              <div key={e.id} className="p-3 rounded-xl bg-surface-50 hover:bg-primary-50 transition-colors border border-surface-100 hover:border-primary-200">
                <p className="font-semibold text-surface-800 text-sm">{e.name}</p>
                <p className="text-xs text-surface-400 mt-0.5">{e.date} • {e.time}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-surface-500">{e.location}</span>
                  <span className="text-xs font-medium text-primary-600">{e.registered}/{e.capacity}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

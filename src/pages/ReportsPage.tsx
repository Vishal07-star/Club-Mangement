import React from 'react';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';
import { Download, Printer, Users, IndianRupee, Activity, Calendar } from 'lucide-react';
import { membershipGrowthData, revenueData, attendanceTrend, membershipDistribution } from '../data/mockData';
import { useApp } from '../context/AppContext';

const COLORS = ['#6366f1', '#06b6d4', '#94a3b8'];

function ReportCard({ icon: Icon, iconBg, title, value, sub }: any) {
  return (
    <div className="card flex items-center gap-4">
      <div className={`p-3 rounded-xl ${iconBg}`}><Icon size={22} className="text-white" /></div>
      <div>
        <p className="text-sm text-surface-500">{title}</p>
        <p className="text-2xl font-bold text-surface-900">{value}</p>
        <p className="text-xs text-surface-400 mt-0.5">{sub}</p>
      </div>
    </div>
  );
}

export default function ReportsPage() {
  const { members } = useApp();

  const exportCSV = () => {
    const rows = [
      'Report,Value',
      'Total Members,1248',
      'Active Members,1086',
      'Expired Memberships,87',
      'Monthly Revenue,₹4,82,500',
      'Total Revenue,₹24,82,500',
      'Attendance Rate,78%',
      'Events This Month,12',
    ];
    const blob = new Blob([rows.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'clubhub_report.csv'; a.click();
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="page-header mb-0">
          <h2 className="page-title">Reports</h2>
          <p className="page-subtitle">Analytics and insights for your club</p>
        </div>
        <div className="flex gap-2 flex-shrink-0">
          <button onClick={exportCSV} className="btn-secondary"><Download size={16} /> Export CSV</button>
          <button onClick={() => window.print()} className="btn-secondary"><Printer size={16} /> Print</button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <ReportCard icon={Users}        iconBg="bg-gradient-to-br from-primary-500 to-primary-600" title="Total Members"    value="1,248"     sub="+86 this month"          />
        <ReportCard icon={IndianRupee}  iconBg="bg-gradient-to-br from-emerald-500 to-emerald-600" title="Total Revenue"   value="₹24,82,500" sub="All time"                 />
        <ReportCard icon={Activity}     iconBg="bg-gradient-to-br from-cyan-500 to-cyan-600"       title="Avg Attendance"  value="287/day"    sub="Last 30 days"             />
        <ReportCard icon={Calendar}     iconBg="bg-gradient-to-br from-violet-500 to-violet-600"   title="Events Hosted"   value="48"         sub="This year"                />
      </div>

      {/* Charts row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="font-semibold text-surface-900 mb-4">Membership Growth</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={membershipGrowthData}>
              <defs>
                <linearGradient id="repGrow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#6366f1" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}    />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} domain={['dataMin - 50', 'dataMax + 50']} />
              <Tooltip contentStyle={{ borderRadius: 12, fontSize: 13 }} />
              <Area type="monotone" dataKey="members" stroke="#6366f1" strokeWidth={2.5} fill="url(#repGrow)" dot={{ fill: '#6366f1', r: 4 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="font-semibold text-surface-900 mb-4">Revenue Trend (₹)</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={revenueData} barSize={32}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} tickFormatter={v => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ borderRadius: 12, fontSize: 13 }} formatter={(v: any) => [`₹${Number(v).toLocaleString('en-IN')}`, 'Revenue']} />
              <Bar dataKey="revenue" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="card">
          <h3 className="font-semibold text-surface-900 mb-4">Attendance Trend</h3>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={attendanceTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: '#94a3b8' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: 12, fontSize: 13 }} />
              <Line type="monotone" dataKey="attendance" stroke="#06b6d4" strokeWidth={2.5} dot={{ fill: '#06b6d4', r: 4 }} activeDot={{ r: 6 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="card">
          <h3 className="font-semibold text-surface-900 mb-4">Membership Plan Distribution</h3>
          <div className="flex items-center gap-6">
            <ResponsiveContainer width="50%" height={180}>
              <PieChart>
                <Pie data={membershipDistribution} cx="50%" cy="50%" innerRadius={45} outerRadius={75} paddingAngle={4} dataKey="value">
                  {membershipDistribution.map((entry, i) => (
                    <Cell key={i} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ borderRadius: 12, fontSize: 13 }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 flex-1">
              {membershipDistribution.map(d => (
                <div key={d.name}>
                  <div className="flex items-center justify-between text-sm mb-1">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ background: d.color }} />
                      <span className="text-surface-600">{d.name}</span>
                    </div>
                    <span className="font-semibold">{d.value}</span>
                  </div>
                  <div className="w-full bg-surface-100 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full" style={{ width: `${(d.value / 1248 * 100).toFixed(0)}%`, background: d.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Key Metrics Table */}
      <div className="card">
        <h3 className="font-semibold text-surface-900 mb-4">Key Performance Metrics</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-surface-100">
              <tr>
                {['Metric', 'This Month', 'Last Month', 'Change', 'Status'].map(h => (
                  <th key={h} className="text-left text-xs font-semibold text-surface-500 pb-3 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-50">
              {[
                { metric: 'New Members',         curr: '86',       prev: '74',       change: '+16.2%', up: true  },
                { metric: 'Monthly Revenue',      curr: '₹4,82,500', prev: '₹4,45,800', change: '+8.2%',  up: true  },
                { metric: 'Average Attendance',   curr: '287',      prev: '275',      change: '+4.4%',  up: true  },
                { metric: 'Membership Renewals',  curr: '62',       prev: '58',       change: '+6.9%',  up: true  },
                { metric: 'Facility Bookings',    curr: '412',      prev: '435',      change: '-5.3%',  up: false },
                { metric: 'Event Registrations',  curr: '332',      prev: '298',      change: '+11.4%', up: true  },
              ].map(row => (
                <tr key={row.metric} className="table-row-hover">
                  <td className="py-3 pr-4 font-medium text-surface-800">{row.metric}</td>
                  <td className="py-3 pr-4 font-bold text-surface-900">{row.curr}</td>
                  <td className="py-3 pr-4 text-surface-500">{row.prev}</td>
                  <td className={`py-3 pr-4 font-semibold ${row.up ? 'text-emerald-600' : 'text-red-500'}`}>{row.change}</td>
                  <td className="py-3">
                    <span className={row.up ? 'badge-active' : 'badge-expired'}>{row.up ? '↑ Improving' : '↓ Declining'}</span>
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

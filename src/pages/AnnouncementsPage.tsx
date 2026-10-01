import React, { useState } from 'react';
import { Plus, X, Megaphone, Trash2, AlertTriangle, Info, Zap } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Announcement } from '../data/mockData';

function AnnouncementModal({ onClose, onSave }: { onClose: () => void; onSave: (a: any) => void }) {
  const [form, setForm] = useState({ title: '', content: '', priority: 'Medium' as Announcement['priority'] });
  const set = (k: string, v: any) => setForm(prev => ({ ...prev, [k]: v }));
  const today = new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content max-w-lg animate-scaleIn" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b border-surface-100 sticky top-0 bg-white rounded-t-2xl">
          <h2 className="text-lg font-bold">New Announcement</h2>
          <button onClick={onClose} className="p-1.5 hover:bg-surface-100 rounded-lg"><X size={18} /></button>
        </div>
        <div className="p-6 space-y-4">
          <div>
            <label className="label">Title *</label>
            <input className="input-field" value={form.title} onChange={e => set('title', e.target.value)} placeholder="Announcement title..." />
          </div>
          <div>
            <label className="label">Priority</label>
            <select className="input-field" value={form.priority} onChange={e => set('priority', e.target.value)}>
              <option>High</option><option>Medium</option><option>Low</option>
            </select>
          </div>
          <div>
            <label className="label">Content *</label>
            <textarea className="input-field" rows={5} value={form.content} onChange={e => set('content', e.target.value)} placeholder="Write your announcement here..." />
          </div>
        </div>
        <div className="flex gap-3 px-6 py-4 border-t border-surface-100 justify-end">
          <button onClick={onClose} className="btn-secondary">Cancel</button>
          <button
            disabled={!form.title || !form.content}
            onClick={() => {
              onSave({ ...form, date: today, author: 'Admin User' });
              onClose();
            }}
            className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Publish
          </button>
        </div>
      </div>
    </div>
  );
}

const priorityConfig: Record<string, { badge: string; icon: React.ElementType; iconClass: string; border: string }> = {
  High:   { badge: 'badge-expired',  icon: Zap,           iconClass: 'text-red-500',    border: 'border-l-red-400'    },
  Medium: { badge: 'badge-pending',  icon: AlertTriangle, iconClass: 'text-amber-500',  border: 'border-l-amber-400'  },
  Low:    { badge: 'badge-standard', icon: Info,          iconClass: 'text-blue-500',   border: 'border-l-blue-400'   },
};

export default function AnnouncementsPage() {
  const { announcements, addAnnouncement, deleteAnnouncement } = useApp();
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [filter, setFilter] = useState<'All' | 'High' | 'Medium' | 'Low'>('All');

  const filtered = filter === 'All' ? announcements : announcements.filter(a => a.priority === filter);

  return (
    <div className="space-y-5 animate-fadeIn">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="page-header mb-0">
          <h2 className="page-title">Announcements</h2>
          <p className="page-subtitle">Club-wide notices and communications ({announcements.length} total)</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn-primary flex-shrink-0">
          <Plus size={16} /> New Announcement
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 flex-wrap">
        {(['All', 'High', 'Medium', 'Low'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${filter === f ? 'bg-primary-600 text-white shadow-sm' : 'bg-white border border-surface-200 text-surface-600 hover:bg-surface-50'}`}>
            {f}{f !== 'All' && ` Priority`}
          </button>
        ))}
      </div>

      {/* Announcements list */}
      <div className="space-y-4">
        {filtered.length === 0 ? (
          <div className="card text-center py-16 text-surface-400">
            <Megaphone size={40} className="mx-auto mb-3 opacity-30" />
            <p>No announcements found.</p>
          </div>
        ) : filtered.map(a => {
          const cfg = priorityConfig[a.priority] || priorityConfig['Low'];
          const IconComp = cfg.icon;
          return (
            <div key={a.id} className={`card border-l-4 ${cfg.border} hover:shadow-card-hover transition-all duration-200`}>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-surface-50 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <IconComp size={20} className={cfg.iconClass} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <div>
                      <h3 className="font-bold text-surface-900 text-base">{a.title}</h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={cfg.badge}>{a.priority} Priority</span>
                        <span className="text-xs text-surface-400">Posted: {a.date}</span>
                        <span className="text-xs text-surface-400">by {a.author}</span>
                      </div>
                    </div>
                    <button
                      onClick={() => setDeleteId(a.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors flex-shrink-0"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <p className="text-surface-600 text-sm leading-relaxed">{a.content}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && <AnnouncementModal onClose={() => setShowModal(false)} onSave={addAnnouncement} />}

      {deleteId && (
        <div className="modal-overlay">
          <div className="modal-content max-w-sm p-6 animate-scaleIn">
            <h3 className="text-lg font-bold mb-2">Delete Announcement</h3>
            <p className="text-surface-500 text-sm mb-6">Are you sure you want to delete this announcement?</p>
            <div className="flex gap-3 justify-end">
              <button onClick={() => setDeleteId(null)} className="btn-secondary">Cancel</button>
              <button onClick={() => { deleteAnnouncement(deleteId); setDeleteId(null); }} className="btn-danger">Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

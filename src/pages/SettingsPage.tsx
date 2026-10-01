import React from 'react';
import { Building2, Mail, Phone, MapPin, Clock, DollarSign, Bell, Save } from 'lucide-react';
import { useApp } from '../context/AppContext';

function Toggle({ enabled, onChange }: { enabled: boolean; onChange: (v: boolean) => void }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none ${enabled ? 'bg-primary-600' : 'bg-surface-200'}`}
    >
      <span className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform duration-200 ${enabled ? 'translate-x-6' : 'translate-x-1'}`} />
    </button>
  );
}

function SectionCard({ title, icon: Icon, children }: { title: string; icon: React.ElementType; children: React.ReactNode }) {
  return (
    <div className="card">
      <div className="flex items-center gap-3 mb-5 pb-4 border-b border-surface-100">
        <div className="w-9 h-9 bg-primary-50 rounded-xl flex items-center justify-center">
          <Icon size={18} className="text-primary-600" />
        </div>
        <h3 className="font-semibold text-surface-900">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const { settings, updateSettings, showToast } = useApp();

  const handleSave = () => {
    showToast('Settings saved successfully!');
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-3xl">
      <div className="flex items-center justify-between">
        <div className="page-header mb-0">
          <h2 className="page-title">Settings</h2>
          <p className="page-subtitle">Manage club configuration and preferences</p>
        </div>
        <button onClick={handleSave} className="btn-primary flex-shrink-0"><Save size={16} /> Save Changes</button>
      </div>

      {/* Club Information */}
      <SectionCard title="Club Information" icon={Building2}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Club Name</label>
            <input
              className="input-field"
              value={settings.clubName}
              onChange={e => updateSettings({ clubName: e.target.value })}
            />
          </div>
          <div>
            <label className="label flex items-center gap-1.5"><Mail size={13}/> Email</label>
            <input
              className="input-field"
              value={settings.email}
              onChange={e => updateSettings({ email: e.target.value })}
            />
          </div>
          <div>
            <label className="label flex items-center gap-1.5"><Phone size={13}/> Phone</label>
            <input
              className="input-field"
              value={settings.phone}
              onChange={e => updateSettings({ phone: e.target.value })}
            />
          </div>
          <div>
            <label className="label flex items-center gap-1.5"><MapPin size={13}/> Address</label>
            <input
              className="input-field"
              value={settings.address}
              onChange={e => updateSettings({ address: e.target.value })}
            />
          </div>
        </div>
      </SectionCard>

      {/* Membership Settings */}
      <SectionCard title="Membership Settings" icon={DollarSign}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="label">Currency</label>
            <select
              className="input-field"
              value={settings.currency}
              onChange={e => updateSettings({ currency: e.target.value })}
            >
              <option>INR</option>
              <option>USD</option>
              <option>EUR</option>
              <option>GBP</option>
            </select>
          </div>
          <div>
            <label className="label flex items-center gap-1.5"><Clock size={13}/> Default Membership Duration</label>
            <select
              className="input-field"
              value={settings.membershipDuration}
              onChange={e => updateSettings({ membershipDuration: e.target.value })}
            >
              <option>3 Months</option>
              <option>6 Months</option>
              <option>12 Months</option>
              <option>24 Months</option>
            </select>
          </div>
        </div>
      </SectionCard>

      {/* Notification Settings */}
      <SectionCard title="Notification Settings" icon={Bell}>
        <div className="space-y-4">
          {[
            { key: 'emailNotifications',   label: 'Email Notifications',   desc: 'Receive email alerts for member activities and payments' },
            { key: 'eventNotifications',   label: 'Event Notifications',   desc: 'Get notified about upcoming events and registration updates' },
            { key: 'paymentNotifications', label: 'Payment Notifications', desc: 'Receive alerts for pending and failed payments' },
          ].map(({ key, label, desc }) => (
            <div key={key} className="flex items-center justify-between py-3 border-b border-surface-50 last:border-0">
              <div>
                <p className="font-medium text-surface-800 text-sm">{label}</p>
                <p className="text-xs text-surface-400 mt-0.5">{desc}</p>
              </div>
              <Toggle
                enabled={settings[key as keyof typeof settings] as boolean}
                onChange={v => updateSettings({ [key]: v })}
              />
            </div>
          ))}
        </div>
      </SectionCard>

      {/* Danger Zone */}
      <div className="card border-2 border-red-100 bg-red-50/50">
        <h3 className="font-semibold text-red-700 mb-3">Danger Zone</h3>
        <p className="text-sm text-surface-500 mb-4">These actions are irreversible. Please be certain before proceeding.</p>
        <div className="flex flex-wrap gap-3">
          <button className="px-4 py-2 bg-white border border-red-200 text-red-600 text-sm font-medium rounded-xl hover:bg-red-50 transition-colors" onClick={() => showToast('This feature is disabled in demo mode.', 'info')}>
            Clear All Data
          </button>
          <button className="px-4 py-2 bg-white border border-red-200 text-red-600 text-sm font-medium rounded-xl hover:bg-red-50 transition-colors" onClick={() => showToast('This feature is disabled in demo mode.', 'info')}>
            Reset to Defaults
          </button>
        </div>
      </div>
    </div>
  );
}

import React from 'react';
import { Download, X, Check } from 'lucide-react';

interface DownloadProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DownloadProjectModal: React.FC<DownloadProjectModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-teal-50 dark:bg-teal-950/50 rounded-lg text-teal-600 dark:text-teal-400">
              <Download className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Export Complete Project</h3>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400">
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-slate-600 dark:text-slate-400 mb-6">
          Download the full production-ready JUSTALO transit platform codebase including Flutter Web, Express backend API, and React admin dashboards.
        </p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <Check className="w-4 h-4 text-emerald-500" />
            <span>Complete Flutter Web & Mobile Client Application</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <Check className="w-4 h-4 text-emerald-500" />
            <span>Node.js / Express Backend & Live WebSocket Tracking</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400">
            <Check className="w-4 h-4 text-emerald-500" />
            <span>Super Admin & Franchisee Scoped Governance System</span>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-sm font-medium text-slate-600 dark:text-slate-400 hover:bg-slate-100 rounded-xl">
            Close
          </button>
          <a
            href="/flutter"
            className="px-4 py-2 text-sm font-semibold bg-teal-500 hover:bg-teal-600 text-white rounded-xl shadow-lg shadow-teal-500/20 flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Launch App
          </a>
        </div>
      </div>
    </div>
  );
};

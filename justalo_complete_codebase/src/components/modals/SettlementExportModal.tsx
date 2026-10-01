import React, { useState } from 'react';
import { Download, FileSpreadsheet, X, CheckCircle2 } from 'lucide-react';
import { useTransitBloc } from '../../state/blocStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const SettlementExportModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { state } = useTransitBloc();
  const [format, setFormat] = useState<'csv' | 'json'>('csv');
  const [downloaded, setDownloaded] = useState(false);

  if (!isOpen) return null;

  const handleDownload = () => {
    let content = '';
    let mimeType = 'text/csv';
    let filename = `JUSTALO_Settlement_Sheet_${new Date().toISOString().slice(0, 10)}.csv`;

    if (format === 'csv') {
      const headers = ['Hub Code', 'Hub Name', 'Nodal Entity', 'Live Buses', 'Today GMV (INR)', 'Occupancy %', 'Contract Rate %', 'Hub Share (INR)', 'Status'];
      const rows = state.hubs.map((h) => [
        h.code,
        `"${h.name}"`,
        `"${h.nodalEntity}"`,
        h.liveBuses,
        h.todayGmv,
        `${h.avgOccupancy}%`,
        `${h.contractRate}%`,
        h.hubShareAmount,
        h.statusLabel,
      ]);
      content = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    } else {
      mimeType = 'application/json';
      filename = `JUSTALO_Settlement_Sheet_${new Date().toISOString().slice(0, 10)}.json`;
      content = JSON.stringify(
        {
          generatedAt: new Date().toISOString(),
          totalGmv: state.totalGrossGmv,
          convenienceTake: state.convenienceRevenue,
          hubs: state.hubs,
        },
        null,
        2
      );
    }

    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    setDownloaded(true);
    setTimeout(() => {
      setDownloaded(false);
      onClose();
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col">
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto my-2 sm:hidden shrink-0" />
        <div className="bg-[#00a896] px-5 py-3.5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-white/10 rounded-lg">
              <FileSpreadsheet className="w-5 h-5 text-teal-100" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Export Settlement Sheet</h3>
              <p className="text-[11px] text-teal-100">Automated ICICI Escrow Clearing</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-3.5 overflow-y-auto">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Export Format
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormat('csv')}
                className={`p-3 rounded-xl border text-left transition ${
                  format === 'csv'
                    ? 'border-teal-600 bg-teal-50 text-teal-900 font-semibold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <div className="text-sm font-bold">CSV Spreadsheet</div>
                <div className="text-xs text-slate-500 mt-0.5">Compatible with Excel, Sheets & Tally ERP</div>
              </button>
              <button
                type="button"
                onClick={() => setFormat('json')}
                className={`p-3 rounded-xl border text-left transition ${
                  format === 'json'
                    ? 'border-teal-600 bg-teal-50 text-teal-900 font-semibold'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600'
                }`}
              >
                <div className="text-sm font-bold">JSON Data Feed</div>
                <div className="text-xs text-slate-500 mt-0.5">Automated banking webhook payload</div>
              </button>
            </div>
          </div>

          <div className="bg-slate-50 p-3 rounded-xl border border-slate-200 text-xs text-slate-600 space-y-1 font-mono">
            <div className="flex justify-between">
              <span>Total Regional Nodes:</span>
              <span className="font-bold text-slate-900">{state.hubs.length} Hubs</span>
            </div>
            <div className="flex justify-between">
              <span>Cumulative Gross GMV:</span>
              <span className="font-bold text-slate-900">₹{state.totalGrossGmv.toLocaleString('en-IN')}</span>
            </div>
            <div className="flex justify-between">
              <span>Automated Franchisee Escrow:</span>
              <span className="font-bold text-emerald-700">
                ₹{state.hubs.reduce((acc, h) => acc + h.hubShareAmount, 0).toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 font-medium"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleDownload}
              className="px-5 py-2.5 bg-[#0f4c5c] hover:bg-[#0c3c49] active:bg-[#092e38] text-white text-sm font-semibold rounded-xl shadow-md transition flex items-center gap-2"
            >
              {downloaded ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                  Generated & Saved!
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  Download Settlement
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { Sliders, X, ShieldAlert, Check, RefreshCw } from 'lucide-react';
import { FranchiseeHub } from '../../types';
import { useTransitBloc } from '../../state/blocStore';
import confetti from 'canvas-confetti';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  hub: FranchiseeHub | null;
}

export const OverrideScopingModal: React.FC<Props> = ({ isOpen, onClose, hub }) => {
  const { dispatch } = useTransitBloc();
  const [contractRate, setContractRate] = useState(12.0);
  const [occupancyCap, setOccupancyCap] = useState(90);
  const [status, setStatus] = useState<FranchiseeHub['operationalStatus']>('healthy');
  const [statusLabel, setStatusLabel] = useState('Healthy Optimal');

  useEffect(() => {
    if (hub) {
      setContractRate(hub.contractRate);
      setOccupancyCap(hub.occupancyCap);
      setStatus(hub.operationalStatus);
      setStatusLabel(hub.statusLabel);
    }
  }, [hub]);

  if (!isOpen || !hub) return null;

  const handleStatusChange = (newStatus: FranchiseeHub['operationalStatus']) => {
    setStatus(newStatus);
    if (newStatus === 'healthy') setStatusLabel('Healthy Optimal');
    else if (newStatus === 'peak') setStatusLabel('Peak Flow Dynamic');
    else if (newStatus === 'normal') setStatusLabel('Normal Operations');
    else setStatusLabel('Corridor Throttled');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: 'OVERRIDE_HUB_SCOPING',
      payload: {
        hubId: hub.id,
        contractRate: Number(contractRate),
        occupancyCap: Number(occupancyCap),
        status,
        statusLabel,
      },
    });

    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.6 },
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col">
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto my-2 sm:hidden shrink-0" />
        <div className="bg-slate-900 px-5 py-3.5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-white/10 rounded-lg">
              <Sliders className="w-5 h-5 text-teal-400" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Master Override Scoping</h3>
              <p className="text-[11px] text-slate-300">
                {hub.name} ({hub.code})
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 overflow-y-auto">
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
            <ShieldAlert className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
            <span>
              <strong>Immediate Platform Override:</strong> Modifying margin or occupancy will adjust live escrow splits and passenger ticketing caps instantly across all booking channels.
            </span>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Franchisee Revenue Margin Share
              </label>
              <span className="font-mono text-sm font-bold text-teal-700">{contractRate}%</span>
            </div>
            <input
              type="range"
              min="5"
              max="25"
              step="0.5"
              value={contractRate}
              onChange={(e) => setContractRate(Number(e.target.value))}
              className="w-full accent-teal-600"
            />
            <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
              <span>5.0% (Minimum)</span>
              <span>12.0% (Standard)</span>
              <span>25.0% (Special Corridor)</span>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                Hub Fleet Capacity Cap Threshold
              </label>
              <span className="font-mono text-sm font-bold text-slate-800">{occupancyCap}%</span>
            </div>
            <input
              type="range"
              min="70"
              max="100"
              step="1"
              value={occupancyCap}
              onChange={(e) => setOccupancyCap(Number(e.target.value))}
              className="w-full accent-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
              Operational Dispatch Status
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { key: 'healthy', label: 'Healthy Optimal' },
                { key: 'peak', label: 'Peak Flow Dynamic' },
                { key: 'normal', label: 'Normal Operations' },
                { key: 'congested', label: 'Corridor Throttled' },
              ].map((item) => (
                <button
                  type="button"
                  key={item.key}
                  onClick={() => handleStatusChange(item.key as any)}
                  className={`py-2 px-3 text-xs font-medium rounded-lg border text-left flex items-center justify-between transition ${
                    status === item.key
                      ? 'bg-teal-50 border-teal-600 text-teal-900 font-semibold'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <span>{item.label}</span>
                  {status === item.key && <Check className="w-3.5 h-3.5 text-teal-600" />}
                </button>
              ))}
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
              type="submit"
              className="px-5 py-2.5 bg-teal-700 hover:bg-teal-800 active:bg-teal-900 text-white text-sm font-semibold rounded-xl shadow-md transition flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Apply Scoping Override
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Network, X, Building2, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useTransitBloc } from '../../state/blocStore';
import confetti from 'canvas-confetti';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const ProvisionHubModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { dispatch } = useTransitBloc();
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [nodalEntity, setNodalEntity] = useState('');
  const [region, setRegion] = useState('Central MP Zone');
  const [contractRate, setContractRate] = useState(12.0);
  const [occupancyCap, setOccupancyCap] = useState(85);
  const [liveBuses, setLiveBuses] = useState(12);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !code || !nodalEntity) return;

    dispatch({
      type: 'PROVISION_HUB',
      payload: {
        code: code.toUpperCase(),
        name,
        nodalEntity,
        region,
        liveBuses: Number(liveBuses),
        todayGmv: 420000,
        dodGrowth: 4.5,
        avgOccupancy: 76.5,
        occupancyCap: Number(occupancyCap),
        hubShareAmount: Math.round((420000 * Number(contractRate)) / 100),
        contractRate: Number(contractRate),
        operationalStatus: 'healthy',
        statusLabel: 'Healthy Optimal',
        restrictedCorridors: [`${name} Central Feeder`, `${name} Radial Bypass`],
      },
    });

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col">
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto my-2 sm:hidden shrink-0" />
        <div className="bg-[#00a896] px-5 py-3.5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-white/10 rounded-lg">
              <Network className="w-5 h-5 text-teal-100" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Provision Regional Hub</h3>
              <p className="text-[11px] text-teal-100">Setup nodal entity & revenue margin</p>
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
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Hub Name
              </label>
              <input
                type="text"
                placeholder="e.g. Sagar Bundelkhand Node"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full text-sm rounded-lg border-slate-300 py-2 px-3 border focus:outline-none focus:ring-2 focus:ring-[#0f4c5c]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Hub ID Code
              </label>
              <input
                type="text"
                placeholder="e.g. FR-SGR-06"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full text-sm rounded-lg border-slate-300 py-2 px-3 border focus:outline-none focus:ring-2 focus:ring-[#0f4c5c] font-mono uppercase"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Nodal Operating Company (Legal Entity)
            </label>
            <input
              type="text"
              placeholder="e.g. Bundelkhand Expressways Ltd."
              value={nodalEntity}
              onChange={(e) => setNodalEntity(e.target.value)}
              className="w-full text-sm rounded-lg border-slate-300 py-2 px-3 border focus:outline-none focus:ring-2 focus:ring-[#0f4c5c]"
              required
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Contract Share (%)
              </label>
              <input
                type="number"
                step="0.5"
                value={contractRate}
                onChange={(e) => setContractRate(Number(e.target.value))}
                className="w-full text-sm rounded-lg border-slate-300 py-2 px-3 border focus:outline-none focus:ring-2 focus:ring-[#0f4c5c]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Occupancy Cap (%)
              </label>
              <input
                type="number"
                value={occupancyCap}
                onChange={(e) => setOccupancyCap(Number(e.target.value))}
                className="w-full text-sm rounded-lg border-slate-300 py-2 px-3 border focus:outline-none focus:ring-2 focus:ring-[#0f4c5c]"
                required
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
                Initial Fleet Units
              </label>
              <input
                type="number"
                value={liveBuses}
                onChange={(e) => setLiveBuses(Number(e.target.value))}
                className="w-full text-sm rounded-lg border-slate-300 py-2 px-3 border focus:outline-none focus:ring-2 focus:ring-[#0f4c5c]"
                required
              />
            </div>
          </div>

          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-xs text-emerald-800">
            <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Escrow split settlement account will be automatically linked via ICICI Clearing Gateway.</span>
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
              className="px-5 py-2.5 bg-[#0f4c5c] hover:bg-[#0c3c49] active:bg-[#092e38] text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              Authorize & Provision Hub
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

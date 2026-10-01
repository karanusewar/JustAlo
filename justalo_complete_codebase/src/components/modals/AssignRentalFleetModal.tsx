import React, { useState } from 'react';
import { Truck, X, Calendar, DollarSign, CheckCircle } from 'lucide-react';
import { useTransitBloc } from '../../state/blocStore';
import confetti from 'canvas-confetti';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const AssignRentalFleetModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { state, dispatch } = useTransitBloc();
  const [selectedFleetId, setSelectedFleetId] = useState(
    state.rentalFleets.find((f) => f.status === 'Available')?.id || state.rentalFleets[0]?.id || ''
  );
  const [clientName, setClientName] = useState('Tata Motors SEZ Logistics Team');
  const [purpose, setPurpose] = useState('Pithampur OEM Shift Transit');
  const [ratePerDay, setRatePerDay] = useState(18000);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFleetId) return;

    dispatch({
      type: 'ASSIGN_RENTAL',
      payload: {
        fleetId: selectedFleetId,
        clientName,
        purpose,
        ratePerDay: Number(ratePerDay),
      },
    });

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col">
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto my-2 sm:hidden shrink-0" />
        <div className="bg-[#00a896] px-5 py-3.5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-white/10 rounded-lg">
              <Truck className="w-5 h-5 text-teal-100" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Assign Tour & Rental Fleet</h3>
              <p className="text-[11px] text-teal-100">Private charters & corporate contracts</p>
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
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Select Fleet Vehicle
            </label>
            <select
              value={selectedFleetId}
              onChange={(e) => {
                setSelectedFleetId(e.target.value);
                const fleet = state.rentalFleets.find((f) => f.id === e.target.value);
                if (fleet) setRatePerDay(fleet.ratePerDay);
              }}
              className="w-full text-sm rounded-lg border-slate-300 py-2 px-3 border bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0f4c5c]"
            >
              {state.rentalFleets.map((fleet) => (
                <option key={fleet.id} value={fleet.id}>
                  {fleet.name} ({fleet.category}) - ₹{fleet.ratePerDay.toLocaleString('en-IN')}/day [{fleet.status}]
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Corporate Client / Organization
            </label>
            <input
              type="text"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full text-sm rounded-lg border-slate-300 py-2 px-3 border focus:outline-none focus:ring-2 focus:ring-[#0f4c5c]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Booking Purpose & Corridor Scope
            </label>
            <input
              type="text"
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              placeholder="e.g. Ujjain Mahakal VIP Darshan Shuttle"
              className="w-full text-sm rounded-lg border-slate-300 py-2 px-3 border focus:outline-none focus:ring-2 focus:ring-[#0f4c5c]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
              Daily Rental Contract Rate (₹/day)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-slate-400 font-bold">₹</span>
              <input
                type="number"
                value={ratePerDay}
                onChange={(e) => setRatePerDay(Number(e.target.value))}
                className="w-full text-sm rounded-lg border-slate-300 py-2 pl-7 pr-3 border focus:outline-none focus:ring-2 focus:ring-[#0f4c5c]"
                required
              />
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
              className="px-5 py-2.5 bg-[#0f4c5c] hover:bg-[#0c3c49] active:bg-[#092e38] text-white text-sm font-semibold rounded-xl shadow-md transition flex items-center gap-2"
            >
              <CheckCircle className="w-4 h-4" />
              Dispatch Contract
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Sliders, Receipt, RotateCcw, DollarSign, CheckCircle2 } from 'lucide-react';
import { useTransitBloc } from '../../state/blocStore';
import confetti from 'canvas-confetti';

export const FranchiseeRuleTuning: React.FC = () => {
  const { state, dispatch } = useTransitBloc();
  const [driverAllowance, setDriverAllowance] = useState(state.rules.rentalDriverAllowancePerDay);
  const [isUpdated, setIsUpdated] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: 'UPDATE_RULES',
      payload: {
        rentalDriverAllowancePerDay: Number(driverAllowance),
      },
    });

    setIsUpdated(true);
    confetti({
      particleCount: 35,
      spread: 45,
      origin: { y: 0.8 },
    });
    setTimeout(() => setIsUpdated(false), 2000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <Sliders className="w-4 h-4 text-teal-600" />
          <h3 className="font-extrabold text-slate-900 text-sm">Platform Rule Tuning</h3>
        </div>
        <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 text-[10px] font-bold">
          Hub Scope
        </span>
      </div>

      <p className="text-[11px] text-slate-500 mb-4 leading-normal">
        Parameters controlled by franchise agreement, synchronized across ticketing APIs.
      </p>

      <form onSubmit={handleUpdate} className="space-y-3">
        {/* Admin Convenience Fee */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-teal-100 text-teal-800">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Admin Convenience Fee</div>
              <div className="text-[10px] text-slate-500">Fixed platform fee per ticket</div>
            </div>
          </div>
          <div className="font-mono text-sm font-extrabold text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200">
            ₹{state.rules.adminConvenienceFee.toFixed(2)}
          </div>
        </div>

        {/* Cancellation Policy Window */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-rose-100 text-rose-800">
              <RotateCcw className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Cancellation Policy Window</div>
              <div className="text-[10px] text-slate-500">Threshold prior departure: 25 Minutes</div>
            </div>
          </div>
          <span className="px-2 py-1 rounded-md bg-rose-100 text-rose-800 text-[10px] font-bold">
            100% Refund
          </span>
        </div>

        {/* Rental Driver Allowance */}
        <div className="p-3 rounded-xl bg-slate-50 border border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-amber-100 text-amber-800">
              <DollarSign className="w-4 h-4" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-900">Rental Driver Allowance</div>
              <div className="text-[10px] text-slate-500">Per diem outstation duty</div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <span className="text-xs text-slate-400 font-bold">₹</span>
            <input
              type="number"
              value={driverAllowance}
              onChange={(e) => setDriverAllowance(Number(e.target.value))}
              className="w-16 py-1 px-1.5 text-right font-mono text-xs font-bold bg-white border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-500"
            />
            <span className="text-[10px] text-slate-400">/day</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-2 py-2.5 rounded-xl bg-[#0f4c5c] hover:bg-[#0c3c49] text-white text-xs font-bold shadow-sm transition flex items-center justify-center gap-2"
        >
          {isUpdated ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Parameters Synced!</span>
            </>
          ) : (
            <span>Update Franchise Parameters</span>
          )}
        </button>
      </form>
    </div>
  );
};

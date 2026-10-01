import React, { useState } from 'react';
import { Sliders, RefreshCw, CheckCircle2, Shield, Zap } from 'lucide-react';
import { useTransitBloc } from '../../state/blocStore';
import confetti from 'canvas-confetti';

export const PlatformRulesEngine: React.FC = () => {
  const { state, dispatch } = useTransitBloc();
  const [convenienceFee, setConvenienceFee] = useState(state.rules.adminConvenienceFee);
  const [refundCutoff, setRefundCutoff] = useState(state.rules.universalRefundCutoffMinutes);
  const [insuranceSurcharge, setInsuranceSurcharge] = useState(state.rules.accidentalInsuranceSurcharge);
  const [telematicsPingRate, setTelematicsPingRate] = useState(state.rules.telematicsPingRateSeconds);
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: 'UPDATE_RULES',
      payload: {
        adminConvenienceFee: Number(convenienceFee),
        universalRefundCutoffMinutes: Number(refundCutoff),
        accidentalInsuranceSurcharge: Number(insuranceSurcharge),
        telematicsPingRateSeconds: Number(telematicsPingRate),
      },
    });

    setIsSaved(true);
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#0f4c5c', '#00a896'],
    });

    setTimeout(() => setIsSaved(false), 2500);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-teal-600" />
          <h3 className="font-extrabold text-slate-900 text-base">Platform Rules & Fee Engine</h3>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 text-[10px] font-extrabold tracking-wide uppercase flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-600 animate-pulse"></span>
          Live Sync
        </span>
      </div>

      <p className="text-xs text-slate-500 mb-5">
        Adjust central monetization formulas, system cut-offs, and IoT refresh rates dynamically across the state.
      </p>

      <form onSubmit={handleSave} className="space-y-4">
        {/* Convenience Fee */}
        <div>
          <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1">
            <span>Admin Convenience Fee / Passenger</span>
            <span className="text-teal-700 font-bold font-mono">Current: ₹{state.rules.adminConvenienceFee.toFixed(2)}</span>
          </div>
          <div className="relative">
            <span className="absolute left-3 top-2.5 text-slate-500 font-bold text-sm">₹</span>
            <input
              type="number"
              step="0.5"
              value={convenienceFee}
              onChange={(e) => setConvenienceFee(Number(e.target.value))}
              className="w-full pl-8 pr-3 py-2 text-sm font-semibold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f4c5c]"
            />
          </div>
          <p className="text-[10px] text-slate-400 mt-1">Appended universally onto all operator base tickets.</p>
        </div>

        {/* Universal Refund Cutoff */}
        <div>
          <div className="flex justify-between items-center text-xs font-semibold text-slate-700 mb-1">
            <span>Universal 100% Refund Cutoff</span>
            <span className="text-teal-700 font-bold font-mono">{refundCutoff} Minutes</span>
          </div>
          <div className="relative">
            <input
              type="number"
              value={refundCutoff}
              onChange={(e) => setRefundCutoff(Number(e.target.value))}
              className="w-full px-3 py-2 text-sm font-semibold rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f4c5c]"
            />
            <span className="absolute right-3 top-2.5 text-xs text-slate-400 font-medium">Minutes prior</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1">
            Time threshold before passenger cancellation enters partial forfeiture.
          </p>
        </div>

        {/* Accidental Insurance & Telematics Ping in grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>Transit Insurance</span>
              <span className="text-teal-700 font-mono font-bold">₹{insuranceSurcharge}</span>
            </div>
            <div className="relative">
              <span className="absolute left-2.5 top-2 text-slate-400 font-bold text-xs">₹</span>
              <input
                type="number"
                value={insuranceSurcharge}
                onChange={(e) => setInsuranceSurcharge(Number(e.target.value))}
                className="w-full pl-6 pr-2 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f4c5c]"
              />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 mb-1">
              <span>GPS Telematics Ping</span>
              <span className="text-teal-700 font-mono font-bold">{telematicsPingRate}s</span>
            </div>
            <div className="relative">
              <input
                type="number"
                value={telematicsPingRate}
                onChange={(e) => setTelematicsPingRate(Number(e.target.value))}
                className="w-full px-2.5 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#0f4c5c]"
              />
              <span className="absolute right-2 top-2 text-[10px] text-slate-400 font-medium">Seconds</span>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-3 py-3 rounded-xl bg-[#0f4c5c] hover:bg-[#0c3c49] active:bg-[#092e38] text-white text-xs font-bold shadow-md hover:shadow-lg transition flex items-center justify-center gap-2"
        >
          {isSaved ? (
            <>
              <CheckCircle2 className="w-4 h-4 text-emerald-300" />
              <span>Rules Deployed to 5 Hubs!</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 text-teal-300" />
              <span>Save & Deploy Rules Platform-Wide</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

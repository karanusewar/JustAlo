import React, { useState } from 'react';
import {
  ShieldAlert,
  ChevronDown,
  Filter,
  Radio,
  Clock,
  Sparkles,
  Layers,
} from 'lucide-react';
import { useTransitBloc } from '../../state/blocStore';

interface Props {
  onOpenEmergencyModal: () => void;
}

export const GovernanceSubheader: React.FC<Props> = ({ onOpenEmergencyModal }) => {
  const { state, dispatch } = useTransitBloc();
  const [showScopeDropdown, setShowScopeDropdown] = useState(false);

  const regionOptions = [
    { id: 'all', label: 'All Franchisees & Hubs (5 Central Regions)' },
    { id: 'hub-ind-01', label: 'Indore Metropolitan Hub (FR-IND-01)' },
    { id: 'hub-bhp-02', label: 'Bhopal Capital Corridor (FR-BHP-02)' },
    { id: 'hub-ujj-03', label: 'Ujjain Pilgrimage Hub (FR-UJJ-03)' },
    { id: 'hub-jbp-04', label: 'Jabalpur Mahakoshal (FR-JBP-04)' },
    { id: 'hub-gwl-05', label: 'Gwalior Chambal Node (FR-GWL-05)' },
  ];

  const currentScopeLabel =
    regionOptions.find((r) => r.id === state.selectedRegion)?.label || regionOptions[0].label;

  return (
    <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase text-slate-400 mb-1">
        <span>JUSTALO PLATFORM ADMIN</span>
        <span>&rsaquo;</span>
        <span className="text-teal-700">MASTER GOVERNANCE CONSOLE</span>
      </div>

      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        {/* Title & Override Badge */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Cross-City Operations Control
          </h1>
          <div className="mt-2 inline-flex items-center gap-2 px-3 py-1 rounded-md bg-rose-50 border border-rose-200 text-rose-800 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse"></span>
            <span>Admin Global Override Active: Unrestricted Visibility</span>
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Regional Scope Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowScopeDropdown(!showScopeDropdown)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-800 transition"
            >
              <div className="p-1 rounded bg-teal-100 text-teal-700">
                <Layers className="w-3.5 h-3.5" />
              </div>
              <div className="text-left">
                <span className="text-[10px] text-slate-400 block -mb-0.5">Regional Scope</span>
                <span className="font-bold">{currentScopeLabel.split('(')[0]}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
            </button>

            {showScopeDropdown && (
              <div className="absolute right-0 mt-2 w-72 bg-white rounded-xl shadow-xl border border-slate-200 py-1.5 z-40 animate-fade-in">
                {regionOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => {
                      dispatch({ type: 'SET_REGION_SCOPE', payload: opt.id });
                      setShowScopeDropdown(false);
                    }}
                    className={`w-full text-left px-3.5 py-2 text-xs font-medium transition flex items-center justify-between ${
                      state.selectedRegion === opt.id
                        ? 'bg-teal-50 text-teal-800 font-bold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <span>{opt.label}</span>
                    {state.selectedRegion === opt.id && (
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-600"></span>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Today / Live Real-Time toggle */}
          <button
            onClick={() => dispatch({ type: 'TOGGLE_LIVE_STREAM' })}
            className={`flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold border transition ${
              state.isLiveRealtime
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800 shadow-xs'
                : 'bg-slate-50 border-slate-200 text-slate-500'
            }`}
          >
            <Clock className="w-3.5 h-3.5 text-emerald-600" />
            <span>Today / Live Real-Time</span>
            <span
              className={`w-2 h-2 rounded-full ${
                state.isLiveRealtime ? 'bg-emerald-500 animate-ping' : 'bg-slate-400'
              }`}
            ></span>
          </button>

          {/* Scoped Filter */}
          <button
            onClick={() => {
              dispatch({
                type: 'SET_TIME_FILTER',
                payload: state.timeFilter === 'daily' ? 'weekly' : 'daily',
              });
            }}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-50 hover:bg-slate-100 border border-slate-200 text-xs font-semibold text-slate-700 transition"
          >
            <Filter className="w-3.5 h-3.5 text-slate-500" />
            <span>Scoped Filter ({state.timeFilter.toUpperCase()})</span>
          </button>

          {/* Emergency Broadcast Button */}
          <button
            onClick={onOpenEmergencyModal}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#c5221f] hover:bg-[#a51a17] active:bg-[#851310] text-white text-xs font-bold shadow-md hover:shadow-lg transition"
          >
            <Radio className="w-4 h-4 text-white animate-pulse" />
            <span>Emergency Broadcast</span>
          </button>
        </div>
      </div>
    </div>
  );
};

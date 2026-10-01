import React, { useState } from 'react';
import {
  Download,
  PlusCircle,
  Eye,
  Percent,
  Sliders,
  CheckCircle,
  AlertTriangle,
  ArrowUpRight,
} from 'lucide-react';
import { FranchiseeHub } from '../../types';
import { useTransitBloc } from '../../state/blocStore';

interface Props {
  onOpenProvisionModal: () => void;
  onOpenExportModal: () => void;
  onOpenOverrideModal: (hub: FranchiseeHub) => void;
  onSwitchToFranchiseeView: (hubId: string) => void;
}

export const FranchiseeYieldTable: React.FC<Props> = ({
  onOpenProvisionModal,
  onOpenExportModal,
  onOpenOverrideModal,
  onSwitchToFranchiseeView,
}) => {
  const { state } = useTransitBloc();

  // Filter hubs based on region scope
  const filteredHubs =
    state.selectedRegion === 'all'
      ? state.hubs
      : state.hubs.filter((h) => h.id === state.selectedRegion);

  const getInitials = (code: string) => {
    const parts = code.split('-');
    return parts[1] ? parts[1].substring(0, 2) : 'MP';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Table Header Bar */}
      <div className="p-4 sm:p-6 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
              Regional Franchisee Scoping & Yield Hub
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 font-bold text-xs">
              {state.hubs.length} Hubs Configured
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Master administrative control for margin distribution, fleet limits, and immediate franchise-level override.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenExportModal}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-bold border border-slate-200 transition"
          >
            <Download className="w-4 h-4 text-slate-500" />
            <span>Export Settlement Sheet</span>
          </button>
          <button
            onClick={onOpenProvisionModal}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#0f4c5c] hover:bg-[#0c3c49] text-white text-xs font-bold shadow-sm transition"
          >
            <PlusCircle className="w-4 h-4" />
            <span>Provision New Hub</span>
          </button>
        </div>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-500 font-bold tracking-wider uppercase text-[10px]">
              <th className="py-3 px-4 sm:px-6">Franchisee Hub Node</th>
              <th className="py-3 px-3 text-center">Live Buses</th>
              <th className="py-3 px-4">Today's Hub GMV</th>
              <th className="py-3 px-4 min-w-[160px]">Avg Occupancy</th>
              <th className="py-3 px-4">Hub Share / P&L</th>
              <th className="py-3 px-4 text-center">Operational Status</th>
              <th className="py-3 px-4 text-right">Master Override Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredHubs.map((hub) => {
              const isOverIndex = hub.avgOccupancy > hub.occupancyCap;
              const gmvInLakh = (hub.todayGmv / 100000).toFixed(2);
              const shareInLakh = (hub.hubShareAmount / 100000).toFixed(2);
              const initials = getInitials(hub.code);

              return (
                <tr
                  key={hub.id}
                  className="hover:bg-teal-50/30 transition-colors group"
                >
                  {/* Hub Info */}
                  <td className="py-3.5 px-4 sm:px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-800 font-extrabold flex items-center justify-center text-xs border border-teal-200 shrink-0">
                        {initials}
                      </div>
                      <div>
                        <div className="font-bold text-slate-900 text-sm group-hover:text-teal-900">
                          {hub.name}
                        </div>
                        <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                          <span className="font-mono font-medium text-slate-700">ID: {hub.code}</span>
                          <span>•</span>
                          <span className="truncate max-w-[160px] sm:max-w-none">
                            Nodal: {hub.nodalEntity}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Live Buses */}
                  <td className="py-3.5 px-3 text-center">
                    <div className="inline-flex items-center gap-1.5 font-bold text-slate-900">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span>{hub.liveBuses} Units</span>
                    </div>
                  </td>

                  {/* GMV */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 text-sm">
                      ₹{gmvInLakh} Lakh
                    </div>
                    <div
                      className={`text-[10px] font-semibold flex items-center gap-0.5 mt-0.5 ${
                        hub.operationalStatus === 'peak'
                          ? 'text-rose-600'
                          : hub.dodGrowth >= 0
                          ? 'text-emerald-600'
                          : 'text-amber-600'
                      }`}
                    >
                      <span>
                        {hub.operationalStatus === 'peak'
                          ? 'Surge +31.2%'
                          : `+${hub.dodGrowth}% vs L.W.`}
                      </span>
                    </div>
                  </td>

                  {/* Avg Occupancy */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center justify-between text-xs mb-1 font-semibold">
                      <span className={isOverIndex ? 'text-rose-600 font-bold' : 'text-slate-800'}>
                        {hub.avgOccupancy}%
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {isOverIndex ? (
                          <span className="text-rose-600 font-bold">Over-Index</span>
                        ) : (
                          `Cap: ${hub.occupancyCap}%`
                        )}
                      </span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden relative">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isOverIndex ? 'bg-rose-500' : 'bg-[#0f4c5c]'
                        }`}
                        style={{ width: `${Math.min(100, hub.avgOccupancy)}%` }}
                      ></div>
                    </div>
                  </td>

                  {/* Hub Share / P&L */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900 text-sm">
                      ₹{shareInLakh} Lakh
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium mt-0.5">
                      Contract: {hub.contractRate.toFixed(1)}% Flat
                    </div>
                  </td>

                  {/* Operational Status */}
                  <td className="py-3.5 px-4 text-center">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold ${
                        hub.operationalStatus === 'healthy'
                          ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          : hub.operationalStatus === 'peak'
                          ? 'bg-rose-50 text-rose-800 border border-rose-200'
                          : 'bg-slate-100 text-slate-700 border border-slate-200'
                      }`}
                    >
                      <span
                        className={`w-1.5 h-1.5 rounded-full ${
                          hub.operationalStatus === 'healthy'
                            ? 'bg-emerald-500'
                            : hub.operationalStatus === 'peak'
                            ? 'bg-rose-500 animate-ping'
                            : 'bg-slate-400'
                        }`}
                      ></span>
                      {hub.statusLabel}
                    </span>
                  </td>

                  {/* Override Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        title="Inspect Franchisee View"
                        onClick={() => onSwitchToFranchiseeView(hub.id)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-teal-700 hover:bg-teal-50 transition border border-transparent hover:border-teal-200"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        title="Adjust Margin Share %"
                        onClick={() => onOpenOverrideModal(hub)}
                        className="p-1.5 rounded-lg text-slate-500 hover:text-teal-700 hover:bg-teal-50 transition border border-transparent hover:border-teal-200"
                      >
                        <Percent className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onOpenOverrideModal(hub)}
                        className="px-2.5 py-1.5 rounded-lg bg-teal-50 hover:bg-[#0f4c5c] text-teal-800 hover:text-white font-bold text-[11px] transition border border-teal-200 flex items-center gap-1"
                      >
                        <Sliders className="w-3.5 h-3.5" />
                        <span>Override Scoping</span>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

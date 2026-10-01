import React from 'react';
import {
  Download,
  ArrowRight,
  Bus,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';
import { RouteCorridor } from '../../types';
import { useTransitBloc } from '../../state/blocStore';

interface Props {
  onInspectCorridor: (corridor: RouteCorridor) => void;
}

export const AssignedRouteNetwork: React.FC<Props> = ({ onInspectCorridor }) => {
  const { state } = useTransitBloc();

  const handleExportRoutesCsv = () => {
    const headers = ['From', 'To', 'Code', 'Distance (km)', 'Active Buses', 'Trips/day', 'Occupancy (%)', 'Gross GMV (INR)', 'Franchise Share (INR)'];
    const rows = state.corridors.map((c) => [
      c.from,
      c.to,
      c.code,
      c.distanceKm,
      c.activeBuses,
      c.tripsPerDay,
      `${c.occupancy}%`,
      c.grossGmv,
      c.franchiseShareAmount,
    ]);
    const content = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([content], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `JUSTALO_Indore_Corridors_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-extrabold text-slate-900 tracking-tight">
              Assigned Route Network & Occupancy
            </h2>
            <span className="px-2.5 py-0.5 rounded-full bg-cyan-100 text-cyan-800 text-[10px] font-extrabold">
              {state.corridors.length} Active Corridors
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time capacity tracking, revenue conversion, and stoppage configuration.
          </p>
        </div>

        <button
          onClick={handleExportRoutesCsv}
          className="self-start sm:self-auto flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition"
        >
          <Download className="w-3.5 h-3.5 text-slate-400" />
          <span>CSV</span>
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="py-3 px-4 sm:px-6">Route Details</th>
              <th className="py-3 px-3 text-center">Trips / Day</th>
              <th className="py-3 px-4 min-w-[140px]">Avg Occupancy</th>
              <th className="py-3 px-4">Gross GMV</th>
              <th className="py-3 px-4 text-right">Franchisee P&L</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {state.corridors.map((corridor) => (
              <tr
                key={corridor.id}
                onClick={() => onInspectCorridor(corridor)}
                className="hover:bg-teal-50/40 transition-colors cursor-pointer group"
              >
                {/* Route Details */}
                <td className="py-3.5 px-4 sm:px-6">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-slate-100 text-teal-800 flex items-center justify-center shrink-0 group-hover:bg-teal-100 transition">
                      <Bus className="w-4 h-4 text-teal-700" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="font-extrabold text-slate-900 text-sm">
                          {corridor.from}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                        <span className="font-extrabold text-slate-900 text-sm">
                          {corridor.to}
                        </span>
                        {corridor.badge && (
                          <span
                            className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              corridor.badgeType === 'express'
                                ? 'bg-emerald-100 text-emerald-800'
                                : corridor.badgeType === 'shuttle'
                                ? 'bg-slate-200 text-slate-700'
                                : 'bg-slate-100 text-slate-700 font-mono'
                            }`}
                          >
                            {corridor.badge}
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-2 mt-0.5">
                        <span className="font-semibold text-slate-700">
                          {corridor.distanceKm} km
                        </span>
                        <span>&bull;</span>
                        <span>{corridor.via}</span>
                        <span>&bull;</span>
                        <span className="text-teal-700 font-semibold flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          {corridor.activeBuses} Active Buses
                        </span>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Trips */}
                <td className="py-3.5 px-3 text-center">
                  <div className="font-extrabold text-slate-900 text-sm">
                    {corridor.tripsPerDay}
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium">Trips</div>
                </td>

                {/* Avg Occupancy */}
                <td className="py-3.5 px-4">
                  <div className="flex items-center justify-between text-xs font-bold text-slate-800 mb-1">
                    <span>{corridor.occupancy}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-[#0f4c5c] rounded-full transition-all duration-500"
                      style={{ width: `${corridor.occupancy}%` }}
                    ></div>
                  </div>
                </td>

                {/* Gross GMV */}
                <td className="py-3.5 px-4">
                  <div className="font-extrabold text-slate-900 text-sm">
                    ₹{corridor.grossGmv.toLocaleString('en-IN')}
                  </div>
                </td>

                {/* Franchisee P&L */}
                <td className="py-3.5 px-4 text-right">
                  <div className="font-extrabold text-emerald-700 text-sm">
                    ₹{corridor.franchiseShareAmount.toLocaleString('en-IN')}
                  </div>
                  <div className="text-[10px] text-slate-400 font-medium mt-0.5">
                    {corridor.sharePercent}% Share
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

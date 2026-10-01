import React from 'react';
import { Activity, ShieldCheck, Terminal, Server } from 'lucide-react';
import { useTransitBloc } from '../../state/blocStore';

interface Props {
  onOpenTelemetryStream: () => void;
}

export const GlobalClusterHealth: React.FC<Props> = ({ onOpenTelemetryStream }) => {
  const { state } = useTransitBloc();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Server className="w-5 h-5 text-teal-600" />
          <h3 className="font-extrabold text-slate-900 text-base">Global Cluster Health</h3>
        </div>
        <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase">
          Nominal 100%
        </span>
      </div>

      <div className="space-y-4">
        {/* Indore Core Server */}
        <div>
          <div className="flex justify-between items-center text-xs mb-1 font-semibold">
            <span className="text-slate-700">Indore Core Server (Primary)</span>
            <span className="text-emerald-700 font-mono font-bold">24ms Latency</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full bg-emerald-500 rounded-full w-[94%]"></div>
          </div>
        </div>

        {/* Bhopal Regional Relay */}
        <div>
          <div className="flex justify-between items-center text-xs mb-1 font-semibold">
            <span className="text-slate-700">Bhopal Regional Relay</span>
            <span className="text-emerald-700 font-mono font-bold">31ms Latency</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full bg-teal-500 rounded-full w-[88%]"></div>
          </div>
        </div>

        {/* AIS-140 GPS Socket Ingestion */}
        <div>
          <div className="flex justify-between items-center text-xs mb-1 font-semibold">
            <span className="text-slate-700">AIS-140 GPS Socket Ingestion</span>
            <span className="text-cyan-700 font-mono font-bold">8,410 pings/min</span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
            <div className="h-full bg-cyan-500 rounded-full w-[98%]"></div>
          </div>
        </div>

        {/* Audit Hash Chain Active */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-start gap-3">
          <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">Audit Hash Chain Active</div>
            <div className="text-[10px] font-mono text-slate-500 mt-0.5">
              SHA-256 Block Signature: #49F-2024-MP-CORE
            </div>
          </div>
        </div>

        {/* Telemetry Stream Button */}
        <button
          onClick={onOpenTelemetryStream}
          className="w-full py-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center justify-center gap-2"
        >
          <Terminal className="w-4 h-4 text-teal-600" />
          <span>View Telemetry Raw Stream</span>
        </button>
      </div>
    </div>
  );
};

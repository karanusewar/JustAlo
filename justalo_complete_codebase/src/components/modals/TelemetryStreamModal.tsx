import React, { useState, useEffect } from 'react';
import { Activity, X, Terminal, Copy, Check } from 'lucide-react';
import { useTransitBloc } from '../../state/blocStore';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const TelemetryStreamModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { state } = useTransitBloc();
  const [copied, setCopied] = useState(false);
  const [telemetryLogs, setTelemetryLogs] = useState<string[]>([]);

  useEffect(() => {
    if (!isOpen) return;

    // Generate initial stream entries
    const initial = [
      `[${new Date().toISOString()}] AIS140_INGEST: IMEI:867902148192019 LAT:22.7196 LNG:75.8577 SPEED:74.2KMPH SOS:0 BATTERY:12.8V`,
      `[${new Date().toISOString()}] TELEMETRY_SYNC: Hub: FR-IND-01 ACK_PACKETS: 46/46 SYNC_LATENCY: 24ms`,
      `[${new Date().toISOString()}] GPS_CLUSTER: MP-09-FA-8819 Geofence 'Dewas Toll' passed at 06:45:11 IST`,
      `[${new Date().toISOString()}] PROTOCOL_V3: Heartbeat OK, socket_id: wss_indore_core_01, encryption: AES-256-GCM`,
      `[${new Date().toISOString()}] ESCROW_MONITOR: ICICI TXN poll healthy. Total unsettled volume: ₹0.00`,
    ];
    setTelemetryLogs(initial);

    const interval = setInterval(() => {
      const randomBus = state.liveBuses[Math.floor(Math.random() * state.liveBuses.length)];
      if (!randomBus) return;
      const entry = `[${new Date().toISOString()}] AIS140_TELEMETRY: Bus:${randomBus.plateNumber} SPD:${randomBus.speedKmH}km/h NEXT:'${randomBus.nextStop}' ETA:${randomBus.etaNextStop} STATUS:${randomBus.status}`;
      setTelemetryLogs((prev) => [entry, ...prev.slice(0, 30)]);
    }, 2500);

    return () => clearInterval(interval);
  }, [isOpen, state.liveBuses]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(telemetryLogs.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-950 rounded-t-3xl sm:rounded-2xl shadow-2xl max-w-3xl w-full overflow-hidden border border-slate-800 text-slate-200 max-h-[90vh] flex flex-col">
        <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto my-2 sm:hidden shrink-0" />
        <div className="bg-slate-900 px-5 py-3 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-teal-500/10 rounded-lg text-teal-400">
              <Terminal className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-white text-sm">AIS-140 GPS Stream</h3>
                <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-400 text-[9px] font-mono px-1.5 py-0.5 rounded-full border border-emerald-500/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                  8,410 pings/min
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition flex items-center gap-1 text-[11px] px-2"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="p-3 bg-slate-950 font-mono text-[11px] text-emerald-400/90 h-80 overflow-y-auto space-y-1">
          {telemetryLogs.map((log, index) => (
            <div key={index} className="leading-relaxed hover:bg-slate-900/60 p-1 rounded transition">
              <span className="text-slate-500 select-none mr-2">{index + 1}.</span>
              {log}
            </div>
          ))}
        </div>

        <div className="bg-slate-900/80 px-6 py-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span>Primary Relay: Indore Core (24ms)</span>
            <span>Secondary Relay: Bhopal (31ms)</span>
          </div>
          <span className="text-emerald-400 font-mono">Status: Stream nominal (0 drops)</span>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { MapPin, Navigation, Bus, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
import { useTransitBloc } from '../../state/blocStore';
import { LiveBusTracking } from '../../types';

export const IndoreTerminalMap: React.FC = () => {
  const { state } = useTransitBloc();
  const [selectedBus, setSelectedBus] = useState<LiveBusTracking | null>(null);

  // Boarding hubs / terminals
  const terminals = [
    { name: 'AICTSL ISBT Stand', x: '45%', y: '48%', active: true, departures: 18 },
    { name: 'Vijay Nagar Square', x: '62%', y: '28%', active: true, departures: 14 },
    { name: 'Geeta Bhavan Circle', x: '58%', y: '58%', active: true, departures: 10 },
    { name: 'Sarwate Station Hub', x: '51%', y: '53%', active: true, departures: 16 },
    { name: 'Rau Bypass Junction', x: '35%', y: '78%', active: true, departures: 8 },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6 overflow-hidden">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
            Indore Metropolitan Terminal & Junctions
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">
            Active passenger boarding points across AICTSL ISBT, Geeta Bhavan & Vijay Nagar
          </p>
        </div>

        <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>All Gates Nominal</span>
        </span>
      </div>

      {/* Map Graphic Canvas */}
      <div className="relative w-full h-80 sm:h-96 rounded-2xl overflow-hidden border border-slate-200 bg-[#E8ECEF] select-none">
        {/* Stylized Map Grid and Roads SVG */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Green areas / parks */}
          <rect x="15%" y="20%" width="18%" height="24%" rx="16" fill="#D3E5D4" opacity="0.7" />
          <rect x="68%" y="45%" width="22%" height="28%" rx="20" fill="#D3E5D4" opacity="0.6" />
          <rect x="30%" y="70%" width="25%" height="20%" rx="18" fill="#D3E5D4" opacity="0.5" />

          {/* Water body Bilawali Lake */}
          <ellipse cx="62%" cy="85%" rx="8%" ry="6%" fill="#C6E2F0" />
          <ellipse cx="38%" cy="18%" rx="5%" ry="4%" fill="#C6E2F0" />

          {/* Major Highway Artery: NH-46 (Bhopal Highway) */}
          <path
            d="M 45% 48% L 75% 25% L 98% 12%"
            stroke="#94A3B8"
            strokeWidth="8"
            strokeLinecap="round"
          />
          <path
            d="M 45% 48% L 75% 25% L 98% 12%"
            stroke="#FDE047"
            strokeWidth="3"
            strokeDasharray="8 6"
            strokeLinecap="round"
          />

          {/* Super Corridor to Ujjain */}
          <path
            d="M 45% 48% L 40% 15% L 42% 0%"
            stroke="#94A3B8"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M 45% 48% L 40% 15% L 42% 0%"
            stroke="#38BDF8"
            strokeWidth="2.5"
            strokeDasharray="6 4"
          />

          {/* Bypass to Pithampur SEZ */}
          <path
            d="M 45% 48% L 35% 78% L 15% 95%"
            stroke="#94A3B8"
            strokeWidth="7"
            strokeLinecap="round"
          />
          <path
            d="M 45% 48% L 35% 78% L 15% 95%"
            stroke="#34D399"
            strokeWidth="2.5"
            strokeDasharray="6 4"
          />

          {/* Ring Road */}
          <ellipse
            cx="50%"
            cy="52%"
            rx="32%"
            ry="28%"
            fill="none"
            stroke="#CBD5E1"
            strokeWidth="5"
          />
        </svg>

        {/* City Location Labels */}
        <div className="absolute top-6 left-8 text-[11px] font-bold text-slate-700 bg-white/80 px-2 py-0.5 rounded shadow-xs">
          Devi Ahilyabai Airport ✈
        </div>
        <div className="absolute top-8 right-16 text-[11px] font-bold text-slate-700 bg-white/80 px-2 py-0.5 rounded shadow-xs">
          Vijay Nagar Hub 🏙
        </div>
        <div className="absolute top-32 right-10 text-[11px] font-bold text-slate-700 bg-white/80 px-2 py-0.5 rounded shadow-xs">
          Khajrana Temple 🛕
        </div>
        <div className="absolute bottom-16 left-12 text-[11px] font-bold text-slate-700 bg-white/80 px-2 py-0.5 rounded shadow-xs">
          Sudama Nagar / Rau
        </div>
        <div className="absolute bottom-10 right-28 text-[11px] font-bold text-slate-700 bg-white/80 px-2 py-0.5 rounded shadow-xs">
          Bicholi Mardana SEZ
        </div>

        {/* Central Brand Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
          <div className="text-xl sm:text-2xl font-black text-slate-900/60 tracking-wider">
            Indore Metropolitan
          </div>
          <div className="text-[11px] font-bold text-slate-700/60 uppercase tracking-widest">
            AICTSL Central ISBT Terminal
          </div>
        </div>

        {/* Terminals & Junction Pins */}
        {terminals.map((term, idx) => (
          <div
            key={idx}
            style={{ left: term.x, top: term.y }}
            className="absolute -translate-x-1/2 -translate-y-1/2 z-10 group cursor-pointer"
          >
            <div className="relative">
              <div className="w-5 h-5 rounded-full bg-[#0f4c5c] text-white flex items-center justify-center shadow-md border-2 border-white group-hover:scale-125 transition-transform">
                <MapPin className="w-3 h-3" />
              </div>
              <div className="opacity-0 group-hover:opacity-100 absolute bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded shadow-lg transition-opacity pointer-events-none">
                {term.name} ({term.departures} dep/hr)
              </div>
            </div>
          </div>
        ))}

        {/* Animated Live Buses on Routes */}
        {state.liveBuses.map((bus, idx) => {
          // Dynamic positions based on index
          const positions = [
            { left: '60%', top: '35%' },
            { left: '42%', top: '24%' },
            { left: '26%', top: '82%' },
            { left: '72%', top: '26%' },
          ];
          const pos = positions[idx % positions.length];

          return (
            <div
              key={bus.id}
              style={{ left: pos.left, top: pos.top }}
              onClick={() => setSelectedBus(bus)}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20 cursor-pointer group"
            >
              <div className="relative">
                <div className="w-7 h-7 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg border-2 border-white animate-bounce-short hover:scale-125 transition-transform">
                  <Bus className="w-3.5 h-3.5" />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 whitespace-nowrap text-[9px] font-mono font-bold bg-white/90 text-slate-800 px-1 rounded shadow-xs border border-slate-300">
                  {bus.speedKmH} km/h
                </div>
              </div>
            </div>
          );
        })}

        {/* Selected Bus Floating Popover */}
        {selectedBus && (
          <div className="absolute top-4 left-4 z-30 bg-slate-900 text-white p-3.5 rounded-xl shadow-xl border border-slate-700 max-w-xs animate-fade-in">
            <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-2 mb-2">
              <span className="font-mono font-bold text-xs text-teal-400">
                {selectedBus.plateNumber}
              </span>
              <button
                onClick={() => setSelectedBus(null)}
                className="text-slate-400 hover:text-white text-xs px-1"
              >
                ✕
              </button>
            </div>
            <div className="text-xs space-y-1 text-slate-300">
              <p>
                <strong className="text-white">Driver:</strong> {selectedBus.driverName}
              </p>
              <p>
                <strong className="text-white">Next Stoppage:</strong> {selectedBus.nextStop} (ETA {selectedBus.etaNextStop})
              </p>
              <p>
                <strong className="text-white">Occupancy:</strong> {selectedBus.passengers}/{selectedBus.capacity} passengers
              </p>
              <p>
                <strong className="text-white">Telemetry:</strong> AIS-140 OK &bull; GPS Speed {selectedBus.speedKmH} km/h
              </p>
            </div>
          </div>
        )}

        {/* Bottom Floating Stats Bar */}
        <div className="absolute bottom-3 left-3 right-3 sm:left-4 sm:right-4 bg-white/95 backdrop-blur-md rounded-xl p-3 border border-slate-200 shadow-md flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-teal-50 text-teal-800">
              <Navigation className="w-4 h-4 text-teal-700" />
            </div>
            <div>
              <div className="text-[10px] uppercase font-bold text-slate-400">
                Active Fleet GPS
              </div>
              <div className="font-extrabold text-slate-900 text-sm">
                46 Buses in Corridor
              </div>
            </div>
          </div>

          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-slate-400">
              Next Scheduled Departure
            </div>
            <div className="font-extrabold text-teal-800 text-sm flex items-center justify-end gap-1">
              <Clock className="w-3.5 h-3.5 text-teal-600" />
              <span>16:15 - Bhopal Fastrack</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import {
  Navigation,
  Layers,
  Compass,
  Plus,
  Minus,
  MapPin,
  Bus,
  Search,
  Crosshair,
  Volume2,
  ChevronUp,
  ChevronDown,
  Info,
  Clock,
  Gauge,
  Users,
  ShieldCheck,
  Eye,
  X,
  AlertTriangle,
  Radio,
} from 'lucide-react';
import { RouteCorridor, LiveBusTracking } from '../../types';
import { useTransitBloc } from '../../state/blocStore';

interface Props {
  onSelectCorridor?: (corridor: RouteCorridor) => void;
  heightClass?: string;
  initialSelectedRouteId?: string;
}

export const DummyGoogleMapsView: React.FC<Props> = ({
  onSelectCorridor,
  heightClass = 'h-[440px]',
  initialSelectedRouteId = 'corridor-ind-bhp',
}) => {
  const { state } = useTransitBloc();
  const [mapType, setMapType] = useState<'standard' | 'satellite' | 'terrain'>('standard');
  const [showTraffic, setShowTraffic] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(11);
  const [selectedRouteId, setSelectedRouteId] = useState<string>(initialSelectedRouteId);
  const [selectedBus, setSelectedBus] = useState<LiveBusTracking | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isDetailExpanded, setIsDetailExpanded] = useState(false);

  // Active Corridor
  const activeCorridor = state.corridors.find((c) => c.id === selectedRouteId) || state.corridors[0];

  // Simulated live buses
  const buses: LiveBusTracking[] = [
    {
      id: 'bus-1',
      plateNumber: 'MP-09-FA-8819',
      routeId: 'corridor-ind-bhp',
      driverName: 'Rameshwar Chouhan',
      passengers: 38,
      capacity: 40,
      speedKmH: 78,
      nextStop: 'Ashta Mid-Way Toll Plaza',
      etaNextStop: '8 mins',
      lat: 22.9676,
      lng: 76.5367,
      heading: 85,
      status: 'On-Time',
      coordinates: { x: 48, y: 52 },
    },
    {
      id: 'bus-2',
      plateNumber: 'MP-09-BC-4410',
      routeId: 'corridor-ind-ujn',
      driverName: 'Dilip Soni',
      passengers: 48,
      capacity: 50,
      speedKmH: 64,
      nextStop: 'Sanwer Industrial Gate',
      etaNextStop: '5 mins',
      lat: 23.1765,
      lng: 75.7885,
      heading: 350,
      status: 'On-Time',
      coordinates: { x: 34, y: 32 },
    },
    {
      id: 'bus-3',
      plateNumber: 'MP-04-HE-4021',
      routeId: 'corridor-ind-bhp',
      driverName: 'Praveen Sharma',
      passengers: 35,
      capacity: 40,
      speedKmH: 82,
      nextStop: 'Sehore Crescent Flyover',
      etaNextStop: '14 mins',
      lat: 23.2000,
      lng: 77.0800,
      heading: 90,
      status: 'On-Time',
      coordinates: { x: 68, y: 58 },
    },
    {
      id: 'bus-4',
      plateNumber: 'MP-09-EV-1002',
      routeId: 'corridor-ind-pit',
      driverName: 'Sunil Verma',
      passengers: 30,
      capacity: 32,
      speedKmH: 52,
      nextStop: 'Sector-3 Smart Hub',
      etaNextStop: '4 mins',
      lat: 22.6100,
      lng: 75.6800,
      heading: 220,
      status: 'On-Time',
      coordinates: { x: 26, y: 72 },
    },
  ];

  // Bus movement simulation
  const [busOffsets, setBusOffsets] = useState<{ [key: string]: { x: number; y: number } }>({
    'bus-1': { x: 0, y: 0 },
    'bus-2': { x: 0, y: 0 },
    'bus-3': { x: 0, y: 0 },
    'bus-4': { x: 0, y: 0 },
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setBusOffsets((prev) => ({
        'bus-1': {
          x: (prev['bus-1']?.x || 0) + (Math.random() * 0.4 - 0.2),
          y: (prev['bus-1']?.y || 0) + (Math.random() * 0.4 - 0.2),
        },
        'bus-2': {
          x: (prev['bus-2']?.x || 0) + (Math.random() * 0.3 - 0.15),
          y: (prev['bus-2']?.y || 0) + (Math.random() * 0.3 - 0.15),
        },
        'bus-3': {
          x: (prev['bus-3']?.x || 0) + (Math.random() * 0.4 - 0.2),
          y: (prev['bus-3']?.y || 0) + (Math.random() * 0.4 - 0.2),
        },
        'bus-4': {
          x: (prev['bus-4']?.x || 0) + (Math.random() * 0.2 - 0.1),
          y: (prev['bus-4']?.y || 0) + (Math.random() * 0.2 - 0.1),
        },
      }));
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const filteredBuses = buses.filter((b) => {
    if (searchQuery.trim()) {
      return (
        b.plateNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.driverName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.nextStop.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return true;
  });

  return (
    <div className={`relative w-full ${heightClass} bg-[#e5e3df] rounded-2xl overflow-hidden border border-slate-300 shadow-md select-none flex flex-col font-sans`}>
      {/* Floating Top Search & Control Bar (Google Maps Mobile UI) */}
      <div className="absolute top-2.5 inset-x-2.5 z-20 flex flex-col gap-1.5">
        <div className="bg-white/95 backdrop-blur-md rounded-xl shadow-md border border-slate-200/90 px-3 py-1.5 flex items-center gap-2">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            placeholder="Search bus, highway corridor, or stop..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 text-xs bg-transparent text-slate-800 placeholder-slate-400 focus:outline-hidden font-medium"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <div className="h-4 w-px bg-slate-200" />
          <button
            onClick={() => setShowTraffic(!showTraffic)}
            className={`px-2 py-0.5 rounded-lg text-[10px] font-bold flex items-center gap-1 transition ${
              showTraffic ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'text-slate-500'
            }`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${showTraffic ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`} />
            Traffic
          </button>
        </div>

        {/* Corridor Pill Selector */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {state.corridors.map((c) => {
            const isSelected = c.id === selectedRouteId;
            return (
              <button
                key={c.id}
                onClick={() => {
                  setSelectedRouteId(c.id);
                  setSelectedBus(null);
                  if (onSelectCorridor) onSelectCorridor(c);
                }}
                className={`px-2.5 py-1 rounded-full text-[10px] font-bold whitespace-nowrap shadow-xs transition flex items-center gap-1 ${
                  isSelected
                    ? 'bg-[#00a896] text-white border border-teal-600'
                    : 'bg-white/90 text-slate-700 hover:bg-white border border-slate-200'
                }`}
              >
                <Bus className="w-3 h-3" />
                <span>{c.code}: {c.from.split(' ')[0]} ➔ {c.to.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Map Canvas Container */}
      <div className="relative flex-1 w-full h-full overflow-hidden">
        {/* SVG Vector Map Canvas */}
        <svg
          viewBox="0 0 500 400"
          className="w-full h-full object-cover transition-transform duration-300"
          style={{
            backgroundColor:
              mapType === 'satellite'
                ? '#1c2421'
                : mapType === 'terrain'
                ? '#e8ede4'
                : '#f2eee9',
          }}
        >
          <defs>
            {/* National Highway Roads Styling */}
            <filter id="roadShadow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="#000" floodOpacity="0.15" />
            </filter>
            {/* Water Body Pattern */}
            <linearGradient id="waterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a5c9eb" />
              <stop offset="100%" stopColor="#89b2db" />
            </linearGradient>
            {/* Green Belt Forest Areas */}
            <pattern id="forestPattern" width="20" height="20" patternUnits="userSpaceOnUse">
              <rect width="20" height="20" fill="#d8eccf" />
              <circle cx="5" cy="5" r="2" fill="#c3e0b8" />
              <circle cx="15" cy="15" r="2.5" fill="#c3e0b8" />
            </pattern>
          </defs>

          {/* Regional Geography & Forest Polygons */}
          <path
            d="M 0 0 L 180 0 L 160 80 L 80 140 L 0 90 Z"
            fill="url(#forestPattern)"
            opacity="0.8"
          />
          <path
            d="M 320 220 C 360 200, 420 240, 500 230 L 500 400 L 300 400 Z"
            fill="url(#forestPattern)"
            opacity="0.7"
          />

          {/* Shipra & Narmada River Water Bodies */}
          <path
            d="M 120 0 C 130 50, 110 90, 140 140 C 170 190, 190 240, 180 300 C 170 360, 200 400, 210 400"
            fill="none"
            stroke="url(#waterGrad)"
            strokeWidth="14"
            strokeLinecap="round"
          />
          <text x="145" y="160" fill="#5885af" fontSize="9" fontWeight="600" transform="rotate(45, 145, 160)">
            Shipra River
          </text>

          {/* Upper Lake Bhopal */}
          <ellipse cx="440" cy="180" rx="36" ry="22" fill="url(#waterGrad)" />
          <text x="415" y="184" fill="#3f729b" fontSize="8" fontWeight="bold">
            Bhoj Wetland (Upper Lake)
          </text>

          {/* Base Secondary Roads Network */}
          <g stroke="#ffffff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" opacity="0.9">
            <line x1="50" y1="200" x2="350" y2="210" />
            <line x1="180" y1="50" x2="190" y2="350" />
            <line x1="100" y1="300" x2="400" y2="320" />
            <line x1="280" y1="80" x2="420" y2="170" />
            <line x1="140" y1="210" x2="80" y2="350" />
          </g>

          {/* Major National Highway Corridors */}
          {/* NH-52: Indore - Ujjain */}
          <path
            d="M 170 210 L 150 140 L 140 70"
            fill="none"
            stroke="#fad25d"
            strokeWidth="8"
            strokeLinecap="round"
            filter="url(#roadShadow)"
          />
          <path
            d="M 170 210 L 150 140 L 140 70"
            fill="none"
            stroke="#f5a623"
            strokeWidth="5"
            strokeLinecap="round"
          />

          {/* NH-46: Indore - Bhopal via Dewas, Ashta, Sehore */}
          <path
            d="M 170 210 Q 230 180, 270 190 T 370 200 T 430 190"
            fill="none"
            stroke="#fad25d"
            strokeWidth="9"
            strokeLinecap="round"
            filter="url(#roadShadow)"
          />
          <path
            d="M 170 210 Q 230 180, 270 190 T 370 200 T 430 190"
            fill="none"
            stroke={selectedRouteId === 'corridor-ind-bhp' ? '#00a896' : '#f5a623'}
            strokeWidth="6"
            strokeLinecap="round"
          />

          {/* Highway Shield Labels */}
          <g transform="translate(290, 180)">
            <rect x="0" y="0" width="30" height="13" rx="3" fill="#2d6a4f" stroke="#fff" strokeWidth="1" />
            <text x="15" y="9.5" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">
              NH-46
            </text>
          </g>
          <g transform="translate(130, 105)">
            <rect x="0" y="0" width="30" height="13" rx="3" fill="#2d6a4f" stroke="#fff" strokeWidth="1" />
            <text x="15" y="9.5" fill="#fff" fontSize="8" fontWeight="bold" textAnchor="middle">
              NH-52
            </text>
          </g>

          {/* Live Traffic Overlay Layer */}
          {showTraffic && (
            <g strokeLinecap="round" opacity="0.85">
              {/* Green fluid traffic */}
              <path d="M 180 205 Q 225 182, 260 190" fill="none" stroke="#22c55e" strokeWidth="3" />
              {/* Moderate yellow traffic near Ashta Toll */}
              <path d="M 260 190 Q 295 195, 330 200" fill="none" stroke="#eab308" strokeWidth="3" />
              {/* Green clear traffic into Bhopal */}
              <path d="M 330 200 T 425 192" fill="none" stroke="#22c55e" strokeWidth="3" />
              {/* Light green to Ujjain */}
              <path d="M 168 200 L 152 145 L 142 80" fill="none" stroke="#22c55e" strokeWidth="3" />
            </g>
          )}

          {/* City / Hub Anchor Markers */}
          {/* INDORE METROPOLITAN (Main Hub) */}
          <g transform="translate(170, 210)" className="cursor-pointer">
            <circle cx="0" cy="0" r="14" fill="#00a896" fillOpacity="0.2" className="animate-ping" />
            <circle cx="0" cy="0" r="8" fill="#00a896" stroke="#fff" strokeWidth="2.5" />
            <rect x="-35" y="10" width="70" height="16" rx="4" fill="#1e293b" fillOpacity="0.9" />
            <text x="0" y="21.5" fill="#ffffff" fontSize="9" fontWeight="bold" textAnchor="middle">
              INDORE (ISBT)
            </text>
          </g>

          {/* UJJAIN MAHAKAL HUB */}
          <g transform="translate(140, 70)" className="cursor-pointer">
            <circle cx="0" cy="0" r="6" fill="#f97316" stroke="#fff" strokeWidth="2" />
            <rect x="-32" y="8" width="64" height="15" rx="3" fill="#1e293b" fillOpacity="0.9" />
            <text x="0" y="18.5" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
              UJJAIN (MHK)
            </text>
          </g>

          {/* ASHTA MID-WAY TOLL STOP */}
          <g transform="translate(295, 192)">
            <circle cx="0" cy="0" r="4.5" fill="#475569" stroke="#fff" strokeWidth="1.5" />
            <text x="0" y="-8" fill="#334155" fontSize="7.5" fontWeight="bold" textAnchor="middle">
              Ashta Toll Plaza
            </text>
          </g>

          {/* BHOPAL CAPITAL HUB */}
          <g transform="translate(430, 190)" className="cursor-pointer">
            <circle cx="0" cy="0" r="7" fill="#2563eb" stroke="#fff" strokeWidth="2" />
            <rect x="-32" y="10" width="64" height="15" rx="3" fill="#1e293b" fillOpacity="0.9" />
            <text x="0" y="20.5" fill="#ffffff" fontSize="8" fontWeight="bold" textAnchor="middle">
              BHOPAL (ISBT)
            </text>
          </g>

          {/* PITHAMPUR SEZ HUB */}
          <g transform="translate(90, 270)" className="cursor-pointer">
            <circle cx="0" cy="0" r="5" fill="#059669" stroke="#fff" strokeWidth="2" />
            <text x="0" y="14" fill="#1e293b" fontSize="8" fontWeight="bold" textAnchor="middle">
              Pithampur SEZ
            </text>
          </g>

          {/* Live Fleet Bus Vehicles on Route */}
          {filteredBuses.map((bus) => {
            const offset = busOffsets[bus.id] || { x: 0, y: 0 };
            const posX = (bus.coordinates?.x || 50) * 5 + offset.x * 20;
            const posY = (bus.coordinates?.y || 50) * 4 + offset.y * 20;
            const isSelected = selectedBus?.id === bus.id;

            return (
              <g
                key={bus.id}
                transform={`translate(${posX}, ${posY})`}
                onClick={() => {
                  setSelectedBus(bus);
                  setIsDetailExpanded(true);
                }}
                className="cursor-pointer group"
              >
                {/* Radar pulse for active selected bus */}
                {isSelected && (
                  <circle cx="0" cy="0" r="16" fill="#00a896" fillOpacity="0.25" className="animate-ping" />
                )}
                {/* Bus marker pin */}
                <rect
                  x="-12"
                  y="-12"
                  width="24"
                  height="24"
                  rx="6"
                  fill={isSelected ? '#00a896' : '#1e293b'}
                  stroke="#ffffff"
                  strokeWidth="2"
                  filter="url(#roadShadow)"
                />
                <g transform="translate(-6, -6)">
                  <path
                    d="M 1 3 C 1 1.5, 2.5 1, 6 1 C 9.5 1, 11 1.5, 11 3 L 11 9 C 11 10, 10 11, 9 11 L 9 12 C 9 12.5, 8 12.5, 8 12 L 8 11 L 4 11 L 4 12 C 4 12.5, 3 12.5, 3 12 L 3 11 C 2 11, 1 10, 1 9 Z M 3 4 L 9 4 M 3 7 L 4 7 M 8 7 L 9 7"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                  />
                </g>

                {/* Micro speed tag */}
                <rect
                  x="-16"
                  y="14"
                  width="32"
                  height="11"
                  rx="2"
                  fill="#ffffff"
                  stroke="#cbd5e1"
                  strokeWidth="0.5"
                />
                <text x="0" y="22" fill="#0f172a" fontSize="6.5" fontWeight="bold" textAnchor="middle">
                  {bus.speedKmH} km/h
                </text>
              </g>
            );
          })}
        </svg>

        {/* Floating Google Maps Control Buttons (Right Side) */}
        <div className="absolute right-3 top-20 z-20 flex flex-col gap-2">
          {/* Map Layer Switcher */}
          <button
            onClick={() => setMapType(mapType === 'standard' ? 'satellite' : mapType === 'satellite' ? 'terrain' : 'standard')}
            className="w-8 h-8 rounded-lg bg-white/95 backdrop-blur-xs shadow-md border border-slate-200 flex items-center justify-center text-slate-700 hover:text-slate-900 transition"
            title="Toggle Map Style"
          >
            <Layers className="w-4 h-4 text-slate-700" />
          </button>

          {/* Compass Reset */}
          <button
            onClick={() => {}}
            className="w-8 h-8 rounded-lg bg-white/95 backdrop-blur-xs shadow-md border border-slate-200 flex items-center justify-center text-slate-700 transition"
            title="North Orient"
          >
            <Compass className="w-4 h-4 text-red-500" />
          </button>

          {/* Center Location */}
          <button
            onClick={() => {
              setSelectedBus(null);
            }}
            className="w-8 h-8 rounded-lg bg-white/95 backdrop-blur-xs shadow-md border border-slate-200 flex items-center justify-center text-[#00a896] hover:bg-teal-50 transition"
            title="Recenter Indore Hub"
          >
            <Crosshair className="w-4 h-4" />
          </button>

          {/* Zoom In & Out */}
          <div className="flex flex-col bg-white/95 backdrop-blur-xs rounded-lg shadow-md border border-slate-200 overflow-hidden">
            <button
              onClick={() => setZoomLevel(Math.min(zoomLevel + 1, 18))}
              className="w-8 h-7 flex items-center justify-center text-slate-700 hover:bg-slate-100 border-b border-slate-200"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(Math.max(zoomLevel - 1, 8))}
              className="w-8 h-7 flex items-center justify-center text-slate-700 hover:bg-slate-100"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Google Maps Official Logo & Attribution Watermark */}
        <div className="absolute bottom-2 left-2 z-20 flex items-center gap-1.5 select-none pointer-events-none">
          <div className="flex items-center text-[11px] font-bold text-slate-600 bg-white/80 backdrop-blur-xs px-1.5 py-0.5 rounded shadow-xs">
            <span className="text-[#4285F4]">G</span>
            <span className="text-[#EA4335]">o</span>
            <span className="text-[#FBBC05]">o</span>
            <span className="text-[#4285F4]">g</span>
            <span className="text-[#34A853]">l</span>
            <span className="text-[#EA4335]">e</span>
          </div>
          <span className="text-[8px] text-slate-500 bg-white/80 backdrop-blur-xs px-1 py-0.5 rounded">
            Map data &copy;2026 &bull; Simulated Live Telematics
          </span>
        </div>
      </div>

      {/* Slide-Up Live Telematics Inspection Card */}
      {selectedBus ? (
        <div className="bg-white border-t border-slate-200 p-3.5 z-30 shadow-lg animate-fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-[#00a896]/10 text-[#00a896] rounded-lg">
                <Bus className="w-4 h-4" />
              </span>
              <div>
                <h4 className="text-xs font-black text-slate-900">{selectedBus.plateNumber}</h4>
                <p className="text-[10px] text-slate-500">{selectedBus.driverName} &bull; NH-46 Intercity</p>
              </div>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[9px] font-bold">
                {selectedBus.speedKmH} km/h (In-Transit)
              </span>
              <button onClick={() => setSelectedBus(null)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2 mt-2.5 pt-2 border-t border-slate-100 text-[10px]">
            <div>
              <span className="text-slate-400 block font-medium">Next Stoppage</span>
              <strong className="text-slate-800 truncate block">{selectedBus.nextStop}</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">ETA Stop</span>
              <strong className="text-teal-700">{selectedBus.etaNextStop}</strong>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">Occupancy</span>
              <strong className="text-slate-800">{selectedBus.passengers}/{selectedBus.capacity} ({Math.round((selectedBus.passengers/selectedBus.capacity)*100)}%)</strong>
            </div>
          </div>
        </div>
      ) : (
        /* Selected Corridor Bottom Summary */
        <div className="bg-white border-t border-slate-200 px-3.5 py-2.5 z-30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-2 h-2 rounded-full bg-[#00a896] animate-pulse shrink-0" />
            <div className="truncate">
              <span className="font-extrabold text-slate-900">{activeCorridor.from} ➔ {activeCorridor.to}</span>
              <span className="text-[10px] text-slate-400 block font-mono">{activeCorridor.distanceKm} km &bull; {activeCorridor.activeBuses} Live Buses</span>
            </div>
          </div>
          <div className="text-right shrink-0">
            <span className="text-xs font-mono font-black text-slate-900">₹{(activeCorridor.grossGmv / 1000).toFixed(1)}k</span>
            <span className="text-[9px] text-emerald-700 font-bold block">{activeCorridor.occupancy}% Load</span>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState } from 'react';
import {
  Wallet,
  TrendingUp,
  Armchair,
  Package,
  Car,
  RotateCcw,
  Bus,
  ArrowRight,
  MapPin,
  Clock,
  ShieldCheck,
  Navigation,
  PlusCircle,
  Download,
  ChevronRight,
} from 'lucide-react';
import { useTransitBloc } from '../../state/blocStore';
import { RouteCorridor } from '../../types';
import { ASSETS } from '../../assets/assets';
import { DummyGoogleMapsView } from '../map/DummyGoogleMapsView';
import { Map as MapIcon, List } from 'lucide-react';

interface Props {
  onInspectCorridor: (corridor: RouteCorridor) => void;
  onOpenAssignRental: () => void;
  activeNavTab: string;
}

export const MobileFranchiseeView: React.FC<Props> = ({
  onInspectCorridor,
  onOpenAssignRental,
  activeNavTab,
}) => {
  const { state, dispatch } = useTransitBloc();
  const indoreHub = state.hubs.find((h) => h.id === 'hub-ind-01') || state.hubs[0];
  const [selectedBusPlate, setSelectedBusPlate] = useState<string | null>(null);
  const [routeViewMode, setRouteViewMode] = useState<'list' | 'map'>('map');

  // ================= TAB: OPERATIONS =================
  if (activeNavTab === 'operations') {
    return (
      <div className="space-y-4 pb-6">
        {/* Scoped Query Guard Banner with Terminal Hero Background */}
        <div className="relative rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 bg-slate-900 text-white">
          <img
            src={ASSETS.terminalHub}
            alt="Indore Terminal Hub"
            className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity"
          />
          <div className="relative p-4 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/60">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl bg-[#00a896] text-white font-black text-xs flex items-center justify-center shadow-sm">
                  IND
                </span>
                <div>
                  <h2 className="text-sm font-black text-white">{indoreHub.name}</h2>
                  <p className="text-[10px] text-teal-300 font-mono">
                    {indoreHub.code} &bull; Central MP Zone
                  </p>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                Scoped Guard
              </span>
            </div>

            <div className="mt-3 pt-2.5 border-t border-white/10 flex items-center justify-between text-[11px]">
              <span className="text-slate-300 font-medium">Daily Dispatch Performance</span>
              <div className="flex items-center bg-slate-800/80 p-0.5 rounded-lg border border-white/10 text-[10px]">
                <button
                  onClick={() => dispatch({ type: 'SET_TIME_FILTER', payload: 'daily' })}
                  className={`px-2 py-0.5 rounded font-bold transition ${
                    state.timeFilter === 'daily' ? 'bg-[#00a896] text-white shadow-xs' : 'text-slate-400'
                  }`}
                >
                  Daily
                </button>
                <button
                  onClick={() => dispatch({ type: 'SET_TIME_FILTER', payload: 'weekly' })}
                  className={`px-2 py-0.5 rounded font-bold transition ${
                    state.timeFilter === 'weekly' ? 'bg-[#00a896] text-white shadow-xs' : 'text-slate-400'
                  }`}
                >
                  Weekly
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 2x3 Metric Cards Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] font-bold uppercase">GROSS REV</span>
              <Wallet className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-base font-black text-slate-900">
              ₹{(indoreHub.todayGmv / 100000).toFixed(2)}L
            </div>
            <div className="text-[10px] font-semibold text-emerald-600 mt-0.5">
              +{indoreHub.dodGrowth}% vs L.M.
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] font-bold uppercase">P&L MARGIN</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-base font-black text-slate-900">
              ₹{(indoreHub.hubShareAmount / 1000).toFixed(1)}k
            </div>
            <div className="text-[10px] font-semibold text-teal-700 mt-0.5">
              {indoreHub.contractRate.toFixed(1)}% Franchise Share
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] font-bold uppercase">OCCUPANCY</span>
              <Armchair className="w-4 h-4 text-cyan-600" />
            </div>
            <div className="text-base font-black text-slate-900">
              {indoreHub.avgOccupancy}%
            </div>
            <div className="text-[10px] font-semibold text-slate-500 mt-0.5">
              124 Daily Trips
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] font-bold uppercase">PARCEL REV</span>
              <Package className="w-4 h-4 text-teal-600" />
            </div>
            <div className="text-base font-black text-slate-900">
              ₹1.42L
            </div>
            <div className="text-[10px] font-semibold text-slate-500 mt-0.5">
              1,120 Crates
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] font-bold uppercase">RENTALS</span>
              <Car className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-base font-black text-slate-900">
              ₹3.24L
            </div>
            <div className="text-[10px] font-semibold text-slate-500 mt-0.5">
              18 Charters
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-400 mb-1">
              <span className="text-[10px] font-bold uppercase">REFUNDS</span>
              <RotateCcw className="w-4 h-4 text-rose-600" />
            </div>
            <div className="text-base font-black text-slate-900">
              ₹{(state.totalRefundsPaid / 1000).toFixed(1)}k
            </div>
            <div className="text-[10px] font-semibold text-rose-600 mt-0.5">
              ≤25-min cutoff
            </div>
          </div>
        </div>

        {/* Indore Terminal & Corridors Google Map Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-xs overflow-hidden">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
                <MapIcon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-black text-slate-900">Indore Terminal & Corridors (Google Maps)</h3>
                <p className="text-[10px] text-slate-500">AICTSL ISBT &bull; NH-46 &bull; NH-52 &bull; Pithampur SEZ</p>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              Live AIS-140 GPS
            </span>
          </div>

          {/* Realtime Google Maps Transit Embed */}
          <div className="rounded-xl overflow-hidden shadow-xs border border-slate-200">
            <DummyGoogleMapsView
              heightClass="h-72"
              initialSelectedRouteId="corridor-ind-bhp"
              onSelectCorridor={onInspectCorridor}
            />
          </div>

          <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span className="flex items-center gap-1 text-slate-700 font-semibold">
              <Bus className="w-3.5 h-3.5 text-teal-700" />
              <span>46 Active Buses radiating from Indore Terminal</span>
            </span>
            <button
              onClick={() => onInspectCorridor(state.corridors[0])}
              className="text-teal-700 font-bold hover:underline"
            >
              Corridor Timetable →
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ================= TAB: ROUTES =================
  if (activeNavTab === 'routes') {
    return (
      <div className="space-y-3.5 pb-6">
        <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Corridor Matrix
            </span>
            <h2 className="text-base font-black text-slate-900 mt-0.5">
              Assigned Route Network
            </h2>
          </div>

          {/* Map vs List View Switcher */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200 text-xs">
            <button
              onClick={() => setRouteViewMode('map')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold transition text-[11px] ${
                routeViewMode === 'map'
                  ? 'bg-[#00a896] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Google Map</span>
            </button>
            <button
              onClick={() => setRouteViewMode('list')}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg font-bold transition text-[11px] ${
                routeViewMode === 'list'
                  ? 'bg-[#00a896] text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>List</span>
            </button>
          </div>
        </div>

        {routeViewMode === 'map' ? (
          <div className="space-y-3">
            <DummyGoogleMapsView
              onSelectCorridor={onInspectCorridor}
              heightClass="h-[460px]"
            />
          </div>
        ) : (
          <div className="space-y-3">
            {state.corridors.map((c) => (
              <div
                key={c.id}
                onClick={() => onInspectCorridor(c)}
                className="p-4 rounded-2xl border border-slate-200/80 bg-white shadow-xs hover:border-teal-400 transition cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center font-bold text-xs">
                      <Bus className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5 font-extrabold text-sm text-slate-900">
                        <span>{c.from}</span>
                        <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
                        <span>{c.to}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{c.via}</span>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-bold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                    {c.code}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-3 pt-2.5 border-t border-slate-100 text-xs">
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">Active Buses</span>
                    <span className="font-bold text-slate-900">{c.activeBuses} Units</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">Occupancy</span>
                    <span className="font-bold text-teal-700">{c.occupancy}%</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-400 uppercase font-bold block">Share (12%)</span>
                    <span className="font-bold text-emerald-700">₹{(c.franchiseShareAmount / 1000).toFixed(1)}k</span>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="flex items-center gap-1 text-teal-700 font-bold">
                    <MapIcon className="w-3.5 h-3.5" />
                    <span>View on Google Maps</span>
                  </span>
                  <div className="flex items-center gap-1 text-slate-500 font-semibold">
                    <span>Stoppages & Timetable</span>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ================= TAB: DEMAND =================
  if (activeNavTab === 'demand') {
    return (
      <div className="space-y-4 pb-6">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Realtime Load
          </span>
          <h2 className="text-base font-black text-slate-900 mt-0.5">
            Peak Slot Utilization
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Morning shifts (07:30 - 10:00) on Ujjain & Pithampur routes operate at <strong className="text-slate-800">94.6% max capacity</strong>.
          </p>
        </div>

        {/* SVG Curve */}
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <svg viewBox="0 0 350 140" className="w-full h-36">
            <defs>
              <linearGradient id="mobGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00a896" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#00a896" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path d="M 20 110 Q 70 20, 100 25 T 180 80 T 260 15 T 330 90 L 330 125 L 20 125 Z" fill="url(#mobGrad)" />
            <path d="M 20 110 Q 70 20, 100 25 T 180 80 T 260 15 T 330 90" fill="none" stroke="#00a896" strokeWidth="3" />
            <circle cx="100" cy="25" r="4" fill="#00a896" stroke="#fff" strokeWidth="2" />
            <circle cx="260" cy="15" r="4" fill="#00a896" stroke="#fff" strokeWidth="2" />
          </svg>
          <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-2 font-bold">
            <span>06:00</span>
            <span className="text-teal-700">10:00 (Peak)</span>
            <span>14:00</span>
            <span className="text-emerald-700">18:00 (Peak)</span>
            <span>22:00</span>
          </div>
        </div>

        {/* Shift breakdown cards */}
        <div className="space-y-2">
          <div className="p-3 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-slate-900">Ujjain Pilgrimage Corridor</span>
              <p className="text-[10px] text-slate-400">Peak shift: 06:00 - 10:30 (Morning Darshan)</p>
            </div>
            <span className="px-2 py-1 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px]">
              96% Occupancy
            </span>
          </div>

          <div className="p-3 bg-white rounded-xl border border-slate-200/80 flex items-center justify-between text-xs">
            <div>
              <span className="font-bold text-slate-900">Pithampur SEZ Industrial Transit</span>
              <p className="text-[10px] text-slate-400">Shift change: 07:00 & 19:00 OEM convoys</p>
            </div>
            <span className="px-2 py-1 rounded-md bg-teal-100 text-teal-800 font-bold text-[10px]">
              92% Occupancy
            </span>
          </div>
        </div>
      </div>
    );
  }

  // ================= TAB: FLEETS & RENTALS =================
  if (activeNavTab === 'fleets') {
    return (
      <div className="space-y-4 pb-6">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Charters & Shuttles
            </span>
            <h2 className="text-base font-black text-slate-900 mt-0.5">
              Tour & Rental Fleets
            </h2>
          </div>
          <button
            onClick={onOpenAssignRental}
            className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#00a896] hover:bg-[#008f80] text-white text-xs font-bold shadow-xs"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Book Charter</span>
          </button>
        </div>

        <div className="space-y-3.5">
          {state.rentalFleets.map((fleet) => (
            <div
              key={fleet.id}
              className="rounded-2xl border border-slate-200/80 bg-white shadow-xs overflow-hidden hover:shadow-md transition"
            >
              {fleet.imageUrl && (
                <div className="relative h-32 w-full overflow-hidden bg-slate-900">
                  <img
                    src={fleet.imageUrl}
                    alt={fleet.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20" />
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded-full bg-slate-900/80 backdrop-blur-xs text-white text-[10px] font-bold">
                      {fleet.category}
                    </span>
                  </div>
                  <div className="absolute top-2.5 right-2.5">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full shadow-xs ${
                        fleet.status === 'Booked'
                          ? 'bg-amber-500 text-slate-950 font-extrabold'
                          : 'bg-emerald-500 text-white font-extrabold'
                      }`}
                    >
                      {fleet.status}
                    </span>
                  </div>
                  <div className="absolute bottom-2 left-2.5 right-2.5 flex items-end justify-between text-white">
                    <div>
                      <h4 className="text-xs font-black drop-shadow-sm">{fleet.name}</h4>
                      <p className="text-[10px] text-slate-200 font-medium">{fleet.bookingPurpose}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-mono text-sm font-black text-teal-300 drop-shadow-sm">
                        ₹{fleet.ratePerDay.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[9px] text-slate-300 block">/day per diem</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Specs & Booking footer */}
              <div className="p-3 bg-white flex items-center justify-between gap-2 text-[10px]">
                <div className="flex items-center gap-2 text-slate-500 font-medium">
                  <span className="inline-flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-teal-600" />
                    AIS-140 GPS
                  </span>
                  <span>&bull;</span>
                  <span>AC Air Suspension</span>
                </div>
                <button
                  onClick={onOpenAssignRental}
                  className="px-2.5 py-1 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 font-bold text-[11px] transition"
                >
                  Manage Contract
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ================= TAB: LIVE FEED =================
  return (
    <div className="space-y-4 pb-6">
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Live Transit Feed
            </span>
            <h2 className="text-base font-black text-slate-900 mt-0.5">
              Realtime Telematics Pings
            </h2>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Listening
          </span>
        </div>
      </div>

      <div className="space-y-2.5">
        {state.telemetryFeed.map((item) => (
          <div
            key={item.id}
            className="p-3 rounded-2xl border border-slate-200/80 bg-white shadow-xs flex items-start gap-2.5"
          >
            <div className="p-2 rounded-xl bg-teal-50 text-teal-700 shrink-0 mt-0.5">
              <Bus className="w-4 h-4" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-900 truncate">{item.title}</span>
                <span className="text-[9px] font-mono text-slate-400 shrink-0">{item.timeAgo}</span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{item.detail}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

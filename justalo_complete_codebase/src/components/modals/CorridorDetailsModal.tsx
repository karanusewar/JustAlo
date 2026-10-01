import React from 'react';
import { RouteCorridor } from '../../types';
import { Route, X, MapPin, Bus, Clock, TrendingUp, Users, Map as MapIcon } from 'lucide-react';
import { DummyGoogleMapsView } from '../map/DummyGoogleMapsView';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  corridor: RouteCorridor | null;
}

export const CorridorDetailsModal: React.FC<Props> = ({ isOpen, onClose, corridor }) => {
  if (!isOpen || !corridor) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl max-w-xl w-full overflow-hidden border border-slate-200 max-h-[92vh] flex flex-col">
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto my-2 sm:hidden shrink-0" />
        <div className="bg-[#00a896] px-5 py-3.5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-white/10 rounded-lg">
              <Route className="w-5 h-5 text-teal-100" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">
                {corridor.from} → {corridor.to} ({corridor.code})
              </h3>
              <p className="text-[11px] text-teal-100">{corridor.via} &bull; {corridor.distanceKm} km</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-3.5 overflow-y-auto">
          {/* Live Google Maps Corridor View */}
          <div className="rounded-2xl overflow-hidden border border-slate-200 shadow-xs">
            <div className="bg-slate-100 px-3 py-1.5 border-b border-slate-200 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5 font-bold text-slate-800">
                <MapIcon className="w-3.5 h-3.5 text-teal-700" />
                <span>Live Google Maps Corridor Telematics</span>
              </div>
              <span className="text-[10px] text-emerald-700 font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                Live Geofence
              </span>
            </div>
            <DummyGoogleMapsView
              heightClass="h-52"
              initialSelectedRouteId={corridor.id}
            />
          </div>

          <div className="grid grid-cols-3 gap-2.5">
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
              <p className="text-[11px] font-semibold text-slate-500 uppercase">Active Units</p>
              <p className="text-xl font-extrabold text-slate-900 mt-1">{corridor.activeBuses}</p>
              <p className="text-[10px] text-teal-600 font-medium">{corridor.tripsPerDay} trips/day</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
              <p className="text-[11px] font-semibold text-slate-500 uppercase">Occupancy</p>
              <p className="text-xl font-extrabold text-teal-700 mt-1">{corridor.occupancy}%</p>
              <p className="text-[10px] text-slate-500 font-medium">Optimal yield</p>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-center">
              <p className="text-[11px] font-semibold text-slate-500 uppercase">Franchise Share</p>
              <p className="text-xl font-extrabold text-emerald-700 mt-1">₹{(corridor.franchiseShareAmount / 1000).toFixed(1)}k</p>
              <p className="text-[10px] text-slate-500 font-medium">{corridor.sharePercent}% Contract</p>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-600 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-teal-600" />
              Stoppage Sequence & Timetable Progression
            </h4>
            <div className="relative pl-6 space-y-4 before:content-[''] before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {corridor.stops.map((stop, idx) => (
                <div key={idx} className="relative flex items-center justify-between text-xs">
                  <div
                    className={`absolute -left-6 top-1 w-3.5 h-3.5 rounded-full border-2 bg-white ${
                      stop.status === 'departed'
                        ? 'border-emerald-600 bg-emerald-600'
                        : stop.status === 'current'
                        ? 'border-teal-600 animate-pulse bg-teal-500 ring-4 ring-teal-100'
                        : 'border-slate-300'
                    }`}
                  />
                  <div>
                    <span className="font-bold text-slate-900 text-sm">{stop.name}</span>
                    <span className="ml-2 text-[10px] font-medium text-slate-400 capitalize">
                      ({stop.status})
                    </span>
                  </div>
                  <span className="font-mono font-semibold text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                    {stop.time} IST
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-teal-50 border border-teal-200 rounded-xl p-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bus className="w-4 h-4 text-teal-700" />
              <span className="text-xs text-teal-900 font-semibold">AIS-140 GPS Corridor Geofence: Active</span>
            </div>
            <span className="text-[11px] font-mono font-bold text-teal-800">Latency: 28ms</span>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition"
            >
              Close Corridor Inspector
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

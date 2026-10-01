import React, { useState } from 'react';
import { Search, Bell, Menu, Shield, CheckCircle, Radio } from 'lucide-react';
import { useTransitBloc } from '../../state/blocStore';

interface Props {
  onOpenMobileMenu: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const SuperAdminHeader: React.FC<Props> = ({
  onOpenMobileMenu,
  searchQuery,
  setSearchQuery,
}) => {
  const { state, dispatch } = useTransitBloc();
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Brand */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-teal-600 to-cyan-500 flex items-center justify-center text-white font-black text-lg shadow-sm shadow-teal-500/30">
              J
            </div>
            <div>
              <div className="font-extrabold text-slate-900 text-sm tracking-tight flex items-center gap-1.5">
                <span>JUSTALO</span>
                <span className="font-semibold text-slate-500 text-xs hidden sm:inline">Admin Master Control</span>
              </div>
            </div>
          </div>
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search entities, nodes, transit IDs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-slate-50 hover:bg-slate-100 focus:bg-white text-xs border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
            />
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* System Operational pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>System Operational</span>
          </div>

          {/* Notification Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-full text-slate-600 hover:bg-slate-100 transition"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-slate-200 py-3 z-50 animate-fade-in">
                <div className="px-4 pb-2 border-b border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                    Operational Alerts
                  </span>
                  <span className="text-[10px] text-teal-700 font-semibold bg-teal-50 px-2 py-0.5 rounded-full">
                    Live Stream
                  </span>
                </div>
                <div className="max-h-64 overflow-y-auto divide-y divide-slate-100">
                  {state.telemetryFeed.slice(0, 4).map((feed) => (
                    <div key={feed.id} className="p-3 hover:bg-slate-50 transition text-xs">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-800">{feed.title}</span>
                        <span className="text-[10px] text-slate-400">{feed.timeAgo}</span>
                      </div>
                      <p className="text-slate-600 text-[11px] mt-0.5 line-clamp-2">{feed.detail}</p>
                    </div>
                  ))}
                </div>
                <div className="px-4 pt-2 border-t border-slate-100 text-center">
                  <span className="text-[11px] text-teal-600 font-semibold cursor-pointer hover:underline">
                    View Complete Telemetry Stream
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Admin Profile */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-300 overflow-hidden flex items-center justify-center text-white text-xs font-bold shadow-xs">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                alt="Super Admin Master Console"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="hidden md:block text-left">
              <div className="text-xs font-bold text-slate-900 leading-tight">
                Super Admin
              </div>
              <div className="text-[10px] text-slate-500 font-medium">Master Console</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

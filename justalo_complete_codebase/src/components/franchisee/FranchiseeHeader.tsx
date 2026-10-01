import React from 'react';
import { ChevronDown, Bell, Menu, ShieldCheck } from 'lucide-react';
import { useTransitBloc } from '../../state/blocStore';

interface Props {
  onOpenMobileMenu: () => void;
  selectedHubName?: string;
}

export const FranchiseeHeader: React.FC<Props> = ({
  onOpenMobileMenu,
  selectedHubName = 'Indore Hub - Central Zone',
}) => {
  const { state } = useTransitBloc();

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 py-3">
      <div className="flex items-center justify-between gap-4">
        {/* Left: Mobile Toggle & Scope */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileMenu}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-900 hover:text-teal-700 transition">
              <span className="w-2.5 h-2.5 rounded-full bg-teal-600"></span>
              <span>{selectedHubName}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>
            <span className="hidden sm:inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
              Franchisee Scope
            </span>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          {/* Operational Pill */}
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-800">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>System Operational (99.98%)</span>
          </div>

          {/* Notifications */}
          <button className="relative p-2 rounded-full text-slate-600 hover:bg-slate-100 transition">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-full bg-slate-900 border border-slate-300 overflow-hidden flex items-center justify-center text-white text-xs font-bold shadow-xs">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                alt="Aditya Sharma"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <div className="hidden md:block text-left">
              <div className="text-xs font-bold text-slate-900 leading-tight">
                Aditya Sharma
              </div>
              <div className="text-[10px] text-slate-500 font-medium">Hub Director</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

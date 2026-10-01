import React from 'react';
import {
  LayoutDashboard,
  Route,
  Bus,
  FileSpreadsheet,
  PieChart,
  Package,
  Car,
  Sliders,
  X,
  Radio,
} from 'lucide-react';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const FranchiseeSidebar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  isOpenMobile,
  onCloseMobile,
}) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'routes', label: 'Route & Stoppages', icon: Route },
    { id: 'fleet', label: 'Live Fleet & Drivers', icon: Bus },
    { id: 'manifests', label: 'Bookings & Manifests', icon: FileSpreadsheet },
    { id: 'pnl', label: 'Franchisee P&L', icon: PieChart },
    { id: 'parcel', label: 'Parcel Express', icon: Package },
    { id: 'rentals', label: 'Vehicle Rentals', icon: Car },
    { id: 'rules', label: 'Platform Rules', icon: Sliders },
  ];

  const content = (
    <aside className="w-64 bg-[#0a192f] text-slate-300 flex flex-col h-full border-r border-slate-800 select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#00a896] text-white flex items-center justify-center font-black text-sm shadow-sm">
            J
          </div>
          <div>
            <div className="font-extrabold text-white text-sm tracking-tight">
              JUSTALO
            </div>
            <div className="text-[10px] font-bold text-teal-400 tracking-wider uppercase">
              Franchise Ops
            </div>
          </div>
        </div>
        {isOpenMobile && (
          <button
            onClick={onCloseMobile}
            className="lg:hidden text-slate-400 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Assigned Hub Zone Box */}
      <div className="p-4 mx-3 my-2 rounded-xl bg-slate-800/60 border border-slate-700/60">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
            <span className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
              Assigned Hub
            </span>
          </div>
          <span className="px-1.5 py-0.5 rounded bg-teal-500/20 text-teal-300 text-[10px] font-bold">
            PRO
          </span>
        </div>
        <div className="font-bold text-white text-xs mt-1">Central MP Zone</div>
      </div>

      {/* Nav List */}
      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                if (isOpenMobile) onCloseMobile();
              }}
              className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition group ${
                isActive
                  ? 'bg-[#00a896] text-white shadow-md shadow-teal-900/40'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
              }`}
            >
              <Icon
                className={`w-4 h-4 transition ${
                  isActive ? 'text-white' : 'text-slate-400 group-hover:text-teal-400'
                }`}
              />
              <span className="text-[13px]">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Dispatch Sync Status Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/40 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2 text-slate-300 font-medium">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
          <span className="text-[11px]">Dispatch Sync Active</span>
        </div>
        <span className="text-[10px] font-mono text-slate-500">v2.8</span>
      </div>
    </aside>
  );

  return (
    <>
      <div className="hidden lg:block shrink-0">{content}</div>
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-slate-900/70 backdrop-blur-xs"
            onClick={onCloseMobile}
          />
          <div className="relative z-10">{content}</div>
        </div>
      )}
    </>
  );
};

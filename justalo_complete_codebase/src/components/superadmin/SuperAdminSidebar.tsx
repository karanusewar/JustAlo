import React from 'react';
import {
  LayoutDashboard,
  Building2,
  ShieldCheck,
  Route,
  Sliders,
  FileBarChart,
  Lock,
  Menu,
  X,
} from 'lucide-react';
import { useTransitBloc } from '../../state/blocStore';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const SuperAdminSidebar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  isOpenMobile,
  onCloseMobile,
}) => {
  const { state } = useTransitBloc();
  const pendingKycCount = state.kycVendors.filter((v) => v.status === 'pending_master' || v.status === 'documents_cleared').length;

  const navItems = [
    { id: 'overview', label: 'Global Overview', icon: LayoutDashboard },
    { id: 'franchisee', label: 'Franchisee Management', icon: Building2 },
    {
      id: 'kyc',
      label: 'Vendor Onboarding & KYC',
      icon: ShieldCheck,
      badge: pendingKycCount > 0 ? `${pendingKycCount}` : undefined,
    },
    { id: 'routes', label: 'Routes & Stoppages', icon: Route },
    { id: 'rules', label: 'Platform Rules & Fees', icon: Sliders },
    { id: 'audit', label: 'System Reports & Audit', icon: FileBarChart },
  ];

  const content = (
    <aside className="w-64 bg-[#0a192f] text-slate-300 flex flex-col h-full border-r border-slate-800 select-none">
      {/* Brand header */}
      <div className="p-5 border-b border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-teal-400"></div>
          <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase">
            Super Admin Platform
          </span>
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

      {/* Nav List */}
      <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
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
              className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-semibold transition group ${
                isActive
                  ? 'bg-[#00a896] text-white shadow-md shadow-teal-900/40'
                  : 'text-slate-300 hover:bg-slate-800/70 hover:text-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-teal-400'
                  }`}
                />
                <span className="text-[13px]">{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-amber-500 text-slate-950 font-mono">
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Security Level Footer */}
      <div className="p-4 border-t border-slate-800/80 bg-slate-900/50">
        <div className="flex items-center justify-between text-xs">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400">
              Security Level
            </div>
            <div className="font-semibold text-slate-200 text-[13px] mt-0.5">Tier 1 Master</div>
          </div>
          <div className="p-2 rounded-lg bg-slate-800 text-teal-400 border border-slate-700">
            <Lock className="w-4 h-4" />
          </div>
        </div>
      </div>
    </aside>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:block shrink-0">{content}</div>

      {/* Mobile drawer */}
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

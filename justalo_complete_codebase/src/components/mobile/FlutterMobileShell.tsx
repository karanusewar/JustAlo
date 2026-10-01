import React, { useState } from 'react';
import {
  LayoutDashboard,
  ShieldCheck,
  Sliders,
  History,
  Route,
  TrendingUp,
  Car,
  Radio,
  Bell,
  Wifi,
  Battery,
  Signal,
  CheckCircle2,
} from 'lucide-react';
import { JustaloLogo } from '../common/JustaloLogo';
import { MobileSuperAdminView } from './MobileSuperAdminView';
import { MobileFranchiseeView } from './MobileFranchiseeView';
import { EmergencyBroadcastModal } from '../modals/EmergencyBroadcastModal';
import { ProvisionHubModal } from '../modals/ProvisionHubModal';
import { OverrideScopingModal } from '../modals/OverrideScopingModal';
import { InspectKycModal } from '../modals/InspectKycModal';
import { AssignRentalFleetModal } from '../modals/AssignRentalFleetModal';
import { CorridorDetailsModal } from '../modals/CorridorDetailsModal';
import { SettlementExportModal } from '../modals/SettlementExportModal';
import { TelemetryStreamModal } from '../modals/TelemetryStreamModal';
import { FlutterCodeBottomSheet } from '../modals/FlutterCodeBottomSheet';
import { DownloadProjectModal } from '../modals/DownloadProjectModal';
import { FranchiseeHub, RouteCorridor, VendorKYC } from '../../types';
import { useTransitBloc } from '../../state/blocStore';
import { Code2, Download } from 'lucide-react';

export const FlutterMobileShell: React.FC = () => {
  const { state } = useTransitBloc();
  const [activeConsole, setActiveConsole] = useState<'superadmin' | 'franchisee'>('superadmin');
  const [adminTab, setAdminTab] = useState<'governance' | 'kyc' | 'rules' | 'audit'>('governance');
  const [franchiseeTab, setFranchiseeTab] = useState<'operations' | 'routes' | 'demand' | 'fleets' | 'feed'>('operations');

  // Modals state
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);
  const [isProvisionOpen, setIsProvisionOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isTelemetryOpen, setIsTelemetryOpen] = useState(false);
  const [isAssignRentalOpen, setIsAssignRentalOpen] = useState(false);
  const [isFlutterCodeOpen, setIsFlutterCodeOpen] = useState(false);
  const [isDownloadProjectOpen, setIsDownloadProjectOpen] = useState(false);
  const [overrideHub, setOverrideHub] = useState<FranchiseeHub | null>(null);
  const [inspectVendor, setInspectVendor] = useState<VendorKYC | null>(null);
  const [inspectCorridor, setInspectCorridor] = useState<RouteCorridor | null>(null);

  // Switch to franchisee view
  const handleSwitchToFranchisee = (hubId?: string) => {
    setActiveConsole('franchisee');
    setFranchiseeTab('operations');
  };

  return (
    <div className="min-h-screen bg-slate-900 flex justify-center selection:bg-teal-500 selection:text-white">
      {/* Mobile Device Canvas */}
      <div className="w-full max-w-md bg-[#f4f7f9] text-slate-800 flex flex-col h-screen overflow-hidden shadow-2xl relative">
        {/* Native Mobile Status Bar (iOS / Android Flutter Status Bar) */}
        <div className="bg-white border-b border-slate-100 px-5 pt-3 pb-1.5 flex items-center justify-between text-slate-900 text-xs font-semibold select-none shrink-0 z-30">
          <span className="font-bold tracking-tight">9:41</span>
          <div className="flex items-center gap-1.5 text-slate-700">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <Battery className="w-4 h-4" />
          </div>
        </div>

        {/* Flutter Top AppBar */}
        <header className="bg-white border-b border-slate-200 px-3 py-2 flex items-center justify-between gap-1.5 shrink-0 z-30 shadow-xs">
          {/* Official Justalo Logo Emblem */}
          <div className="flex items-center gap-1.5">
            <JustaloLogo size="sm" variant="full" />
          </div>

          <div className="flex items-center gap-1.5">
            {/* Console Role Switcher: Super Admin vs Franchisee */}
            <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200/80">
              <button
                onClick={() => setActiveConsole('superadmin')}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition ${
                  activeConsole === 'superadmin'
                    ? 'bg-[#00a896] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Admin
              </button>
              <button
                onClick={() => setActiveConsole('franchisee')}
                className={`px-2 py-1 rounded-lg text-[10px] font-bold transition ${
                  activeConsole === 'franchisee'
                    ? 'bg-[#00a896] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Franchisee
              </button>
            </div>

            {/* Flutter Code Sheet Trigger */}
            <button
              onClick={() => setIsFlutterCodeOpen(true)}
              className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center gap-1 transition"
              title="View Flutter (Dart) Source Code"
            >
              <Code2 className="w-3.5 h-3.5 text-teal-700" />
              <span className="hidden xs:inline">Dart</span>
            </button>

            {/* Complete Project Download Trigger */}
            <button
              onClick={() => setIsDownloadProjectOpen(true)}
              className="p-1.5 rounded-lg bg-teal-50 hover:bg-teal-100 text-teal-800 text-[10px] font-bold flex items-center gap-1 transition border border-teal-200"
              title="Download Complete Codebase (.ZIP)"
            >
              <Download className="w-3.5 h-3.5 text-teal-700" />
              <span>ZIP</span>
            </button>
          </div>
        </header>

        {/* Scrollable Mobile Body */}
        <main className="flex-1 overflow-y-auto p-4 overscroll-contain">
          {activeConsole === 'superadmin' ? (
            <MobileSuperAdminView
              activeNavTab={adminTab}
              onOpenEmergencySheet={() => setIsEmergencyOpen(true)}
              onOpenProvisionSheet={() => setIsProvisionOpen(true)}
              onOpenExportSheet={() => setIsExportOpen(true)}
              onOpenOverrideSheet={(hub) => setOverrideHub(hub)}
              onInspectVendor={(vendor) => setInspectVendor(vendor)}
              onOpenTelemetrySheet={() => setIsTelemetryOpen(true)}
              onSwitchToFranchisee={handleSwitchToFranchisee}
            />
          ) : (
            <MobileFranchiseeView
              activeNavTab={franchiseeTab}
              onInspectCorridor={(c) => setInspectCorridor(c)}
              onOpenAssignRental={() => setIsAssignRentalOpen(true)}
            />
          )}
        </main>

        {/* Flutter Native BottomNavigationBar */}
        <nav className="bg-white border-t border-slate-200 px-2 py-2 flex items-center justify-around shrink-0 z-30 shadow-lg">
          {activeConsole === 'superadmin' ? (
            <>
              <button
                onClick={() => setAdminTab('governance')}
                className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition ${
                  adminTab === 'governance'
                    ? 'text-[#00a896] font-bold'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span className="text-[10px]">Governance</span>
              </button>

              <button
                onClick={() => setAdminTab('kyc')}
                className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition relative ${
                  adminTab === 'kyc'
                    ? 'text-[#00a896] font-bold'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <ShieldCheck className="w-5 h-5" />
                <span className="text-[10px]">KYC Audit</span>
                {state.kycVendors.filter((v) => v.status !== 'approved').length > 0 && (
                  <span className="absolute top-0 right-3 w-2 h-2 bg-rose-500 rounded-full"></span>
                )}
              </button>

              <button
                onClick={() => setAdminTab('rules')}
                className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition ${
                  adminTab === 'rules'
                    ? 'text-[#00a896] font-bold'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Sliders className="w-5 h-5" />
                <span className="text-[10px]">Rule Engine</span>
              </button>

              <button
                onClick={() => setAdminTab('audit')}
                className={`flex flex-col items-center gap-1 py-1 px-3 rounded-xl transition ${
                  adminTab === 'audit'
                    ? 'text-[#00a896] font-bold'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <History className="w-5 h-5" />
                <span className="text-[10px]">Audit Logs</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setFranchiseeTab('operations')}
                className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition ${
                  franchiseeTab === 'operations'
                    ? 'text-[#00a896] font-bold'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span className="text-[10px]">Operations</span>
              </button>

              <button
                onClick={() => setFranchiseeTab('routes')}
                className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition ${
                  franchiseeTab === 'routes'
                    ? 'text-[#00a896] font-bold'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Route className="w-5 h-5" />
                <span className="text-[10px]">Routes</span>
              </button>

              <button
                onClick={() => setFranchiseeTab('demand')}
                className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition ${
                  franchiseeTab === 'demand'
                    ? 'text-[#00a896] font-bold'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <TrendingUp className="w-5 h-5" />
                <span className="text-[10px]">Demand</span>
              </button>

              <button
                onClick={() => setFranchiseeTab('fleets')}
                className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition ${
                  franchiseeTab === 'fleets'
                    ? 'text-[#00a896] font-bold'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Car className="w-5 h-5" />
                <span className="text-[10px]">Rentals</span>
              </button>

              <button
                onClick={() => setFranchiseeTab('feed')}
                className={`flex flex-col items-center gap-1 py-1 px-2.5 rounded-xl transition ${
                  franchiseeTab === 'feed'
                    ? 'text-[#00a896] font-bold'
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                <Radio className="w-5 h-5" />
                <span className="text-[10px]">Live Feed</span>
              </button>
            </>
          )}
        </nav>
      </div>

      {/* Interactive Bottom Sheet Modals */}
      <EmergencyBroadcastModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />
      <ProvisionHubModal
        isOpen={isProvisionOpen}
        onClose={() => setIsProvisionOpen(false)}
      />
      <OverrideScopingModal
        isOpen={!!overrideHub}
        hub={overrideHub}
        onClose={() => setOverrideHub(null)}
      />
      <InspectKycModal
        isOpen={!!inspectVendor}
        vendor={inspectVendor}
        onClose={() => setInspectVendor(null)}
      />
      <AssignRentalFleetModal
        isOpen={isAssignRentalOpen}
        onClose={() => setIsAssignRentalOpen(false)}
      />
      <CorridorDetailsModal
        isOpen={!!inspectCorridor}
        corridor={inspectCorridor}
        onClose={() => setInspectCorridor(null)}
      />
      <SettlementExportModal
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
      <TelemetryStreamModal
        isOpen={isTelemetryOpen}
        onClose={() => setIsTelemetryOpen(false)}
      />
      <FlutterCodeBottomSheet
        isOpen={isFlutterCodeOpen}
        onClose={() => setIsFlutterCodeOpen(false)}
      />
      <DownloadProjectModal
        isOpen={isDownloadProjectOpen}
        onClose={() => setIsDownloadProjectOpen(false)}
      />
    </div>
  );
};

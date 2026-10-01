import React, { useState } from 'react';
import { SuperAdminSidebar } from './SuperAdminSidebar';
import { SuperAdminHeader } from './SuperAdminHeader';
import { GovernanceSubheader } from './GovernanceSubheader';
import { KpiCardsGrid } from './KpiCardsGrid';
import { FranchiseeYieldTable } from './FranchiseeYieldTable';
import { VendorKycSection } from './VendorKycSection';
import { PlatformRulesEngine } from './PlatformRulesEngine';
import { SystemAuditLog } from './SystemAuditLog';
import { GlobalClusterHealth } from './GlobalClusterHealth';
import { EmergencyBroadcastModal } from '../modals/EmergencyBroadcastModal';
import { ProvisionHubModal } from '../modals/ProvisionHubModal';
import { OverrideScopingModal } from '../modals/OverrideScopingModal';
import { InspectKycModal } from '../modals/InspectKycModal';
import { SettlementExportModal } from '../modals/SettlementExportModal';
import { TelemetryStreamModal } from '../modals/TelemetryStreamModal';
import { FranchiseeHub, VendorKYC } from '../../types';
import { useTransitBloc } from '../../state/blocStore';
import { AlertTriangle, X } from 'lucide-react';

interface Props {
  onSwitchToFranchiseeView: (hubId?: string) => void;
}

export const SuperAdminDashboard: React.FC<Props> = ({ onSwitchToFranchiseeView }) => {
  const { state, dispatch } = useTransitBloc();
  const [activeTab, setActiveTab] = useState('overview');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Modals state
  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);
  const [isProvisionModalOpen, setIsProvisionModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isTelemetryModalOpen, setIsTelemetryModalOpen] = useState(false);
  const [overrideHub, setOverrideHub] = useState<FranchiseeHub | null>(null);
  const [inspectVendor, setInspectVendor] = useState<VendorKYC | null>(null);

  return (
    <div className="flex h-screen overflow-hidden bg-[#f4f7f9] text-slate-800">
      {/* Super Admin Left Sidebar */}
      <SuperAdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <SuperAdminHeader
          onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 overflow-y-auto">
          {/* Active Emergency Broadcast Alert Banner if dispatched */}
          {state.emergencyAlert && (
            <div className="bg-red-600 text-white px-6 py-3 flex items-center justify-between shadow-md animate-bounce-short">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-300 animate-pulse" />
                <div>
                  <span className="font-bold text-xs uppercase tracking-wider bg-red-800 px-2 py-0.5 rounded mr-2">
                    ACTIVE {state.emergencyAlert.severity.toUpperCase()} EMERGENCY
                  </span>
                  <span className="text-xs font-semibold">{state.emergencyAlert.title}</span>
                  <span className="text-[11px] text-red-200 ml-2">
                    ({state.emergencyAlert.totalTargeted} telemetry nodes notified)
                  </span>
                </div>
              </div>
              <button
                onClick={() => dispatch({ type: 'CLEAR_EMERGENCY' })}
                className="text-xs font-bold bg-red-700 hover:bg-red-800 px-3 py-1 rounded-lg text-white transition"
              >
                Dismiss Alert
              </button>
            </div>
          )}

          {/* Governance Subheader with scopes and action buttons */}
          <GovernanceSubheader
            onOpenEmergencyModal={() => setIsEmergencyModalOpen(true)}
          />

          <div className="p-4 sm:p-6 space-y-6 max-w-[1720px] mx-auto">
            {/* Top KPI Cards Grid */}
            <KpiCardsGrid />

            {/* Franchisee Yield Hub Table */}
            <FranchiseeYieldTable
              onOpenProvisionModal={() => setIsProvisionModalOpen(true)}
              onOpenExportModal={() => setIsExportModalOpen(true)}
              onOpenOverrideModal={(hub) => setOverrideHub(hub)}
              onSwitchToFranchiseeView={(hubId) => onSwitchToFranchiseeView(hubId)}
            />

            {/* Bottom 2-Column Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column (7 cols): KYC + System Audit Log */}
              <div className="lg:col-span-7 space-y-6">
                <VendorKycSection
                  onInspectVendor={(vendor) => setInspectVendor(vendor)}
                />
                <SystemAuditLog />
              </div>

              {/* Right Column (5 cols): Platform Rules + Global Health */}
              <div className="lg:col-span-5 space-y-6">
                <PlatformRulesEngine />
                <GlobalClusterHealth
                  onOpenTelemetryStream={() => setIsTelemetryModalOpen(true)}
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <EmergencyBroadcastModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
      />

      <ProvisionHubModal
        isOpen={isProvisionModalOpen}
        onClose={() => setIsProvisionModalOpen(false)}
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

      <SettlementExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
      />

      <TelemetryStreamModal
        isOpen={isTelemetryModalOpen}
        onClose={() => setIsTelemetryModalOpen(false)}
      />
    </div>
  );
};

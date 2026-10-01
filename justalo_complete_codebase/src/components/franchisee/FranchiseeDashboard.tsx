import React, { useState } from 'react';
import { FranchiseeSidebar } from './FranchiseeSidebar';
import { FranchiseeHeader } from './FranchiseeHeader';
import { FranchiseeBanner } from './FranchiseeBanner';
import { FranchiseeKpis } from './FranchiseeKpis';
import { AssignedRouteNetwork } from './AssignedRouteNetwork';
import { DemandCurveChart } from './DemandCurveChart';
import { IndoreTerminalMap } from './IndoreTerminalMap';
import { FranchiseeRuleTuning } from './FranchiseeRuleTuning';
import { LiveOperationalFeed } from './LiveOperationalFeed';
import { TourRentalFleets } from './TourRentalFleets';
import { AssignRentalFleetModal } from '../modals/AssignRentalFleetModal';
import { CorridorDetailsModal } from '../modals/CorridorDetailsModal';
import { RouteCorridor } from '../../types';
import { useTransitBloc } from '../../state/blocStore';
import { AlertTriangle } from 'lucide-react';

interface Props {
  selectedHubId?: string;
}

export const FranchiseeDashboard: React.FC<Props> = ({ selectedHubId = 'hub-ind-01' }) => {
  const { state, dispatch } = useTransitBloc();
  const [activeTab, setActiveTab] = useState('pnl');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [inspectCorridor, setInspectCorridor] = useState<RouteCorridor | null>(null);
  const [isAssignRentalModalOpen, setIsAssignRentalModalOpen] = useState(false);

  const activeHub = state.hubs.find((h) => h.id === selectedHubId) || state.hubs[0];

  return (
    <div className="flex h-screen overflow-hidden bg-[#f4f7f9] text-slate-800">
      {/* Franchisee Left Sidebar */}
      <FranchiseeSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpenMobile={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        {/* Top Header */}
        <FranchiseeHeader
          onOpenMobileMenu={() => setIsMobileSidebarOpen(true)}
          selectedHubName={`${activeHub.name} - ${activeHub.region}`}
        />

        {/* Scrollable Dashboard Body */}
        <main className="flex-1 overflow-y-auto">
          {/* Active Emergency Broadcast Alert Banner if dispatched */}
          {state.emergencyAlert && (
            <div className="bg-red-600 text-white px-6 py-3 flex items-center justify-between shadow-md">
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-300 animate-pulse" />
                <div>
                  <span className="font-bold text-xs uppercase tracking-wider bg-red-800 px-2 py-0.5 rounded mr-2">
                    SUPER ADMIN BROADCAST
                  </span>
                  <span className="text-xs font-semibold">{state.emergencyAlert.title}</span>
                </div>
              </div>
              <button
                onClick={() => dispatch({ type: 'CLEAR_EMERGENCY' })}
                className="text-xs font-bold bg-red-700 hover:bg-red-800 px-3 py-1 rounded-lg text-white transition"
              >
                Acknowledge Receipt
              </button>
            </div>
          )}

          {/* Franchisee Hub Banner */}
          <FranchiseeBanner />

          <div className="p-4 sm:p-6 space-y-6 max-w-[1720px] mx-auto">
            {/* Top 6 KPI Cards */}
            <FranchiseeKpis />

            {/* Main Center Grid: 8 cols Left, 4 cols Right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column (8 cols): Corridors + Demand Curve + Indore Map */}
              <div className="lg:col-span-8 space-y-6">
                <AssignedRouteNetwork
                  onInspectCorridor={(corridor) => setInspectCorridor(corridor)}
                />
                <DemandCurveChart />
                <IndoreTerminalMap />
              </div>

              {/* Right Column (4 cols): Rule Tuning + Live Feed + Rental Fleets */}
              <div className="lg:col-span-4 space-y-6">
                <FranchiseeRuleTuning />
                <LiveOperationalFeed />
                <TourRentalFleets
                  onOpenAssignModal={() => setIsAssignRentalModalOpen(true)}
                />
              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Corridor Modal */}
      <CorridorDetailsModal
        isOpen={!!inspectCorridor}
        corridor={inspectCorridor}
        onClose={() => setInspectCorridor(null)}
      />

      {/* Assign Rental Modal */}
      <AssignRentalFleetModal
        isOpen={isAssignRentalModalOpen}
        onClose={() => setIsAssignRentalModalOpen(false)}
      />
    </div>
  );
};

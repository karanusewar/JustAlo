import React, { useState } from 'react';
import {
  Wallet,
  Bus,
  Network,
  ShieldCheck,
  Receipt,
  Radio,
  Sliders,
  History,
  Download,
  PlusCircle,
  Eye,
  Percent,
  CheckCircle2,
  XCircle,
  FileText,
  Clock,
  Zap,
  TrendingUp,
  AlertTriangle,
  ChevronRight,
  Server,
  Terminal,
} from 'lucide-react';
import { useTransitBloc } from '../../state/blocStore';
import { FranchiseeHub, VendorKYC } from '../../types';
import { ASSETS } from '../../assets/assets';
import { DummyGoogleMapsView } from '../map/DummyGoogleMapsView';
import { MapPin, Map as MapIcon } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  onOpenEmergencySheet: () => void;
  onOpenProvisionSheet: () => void;
  onOpenExportSheet: () => void;
  onOpenOverrideSheet: (hub: FranchiseeHub) => void;
  onInspectVendor: (vendor: VendorKYC) => void;
  onOpenTelemetrySheet: () => void;
  onSwitchToFranchisee: (hubId?: string) => void;
  activeNavTab: string;
}

export const MobileSuperAdminView: React.FC<Props> = ({
  onOpenEmergencySheet,
  onOpenProvisionSheet,
  onOpenExportSheet,
  onOpenOverrideSheet,
  onInspectVendor,
  onOpenTelemetrySheet,
  onSwitchToFranchisee,
  activeNavTab,
}) => {
  const { state, dispatch } = useTransitBloc();
  const [convenienceFee, setConvenienceFee] = useState(state.rules.adminConvenienceFee);
  const [refundCutoff, setRefundCutoff] = useState(state.rules.universalRefundCutoffMinutes);
  const [insuranceSurcharge, setInsuranceSurcharge] = useState(state.rules.accidentalInsuranceSurcharge);
  const [pingRate, setPingRate] = useState(state.rules.telematicsPingRateSeconds);
  const [rulesSaved, setRulesSaved] = useState(false);
  const [showMapRadar, setShowMapRadar] = useState(true);

  const handleSaveRules = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: 'UPDATE_RULES',
      payload: {
        adminConvenienceFee: Number(convenienceFee),
        universalRefundCutoffMinutes: Number(refundCutoff),
        accidentalInsuranceSurcharge: Number(insuranceSurcharge),
        telematicsPingRateSeconds: Number(pingRate),
      },
    });
    setRulesSaved(true);
    confetti({ particleCount: 30, spread: 50, origin: { y: 0.8 } });
    setTimeout(() => setRulesSaved(false), 2000);
  };

  const handleApproveKyc = (vendorId: string) => {
    dispatch({
      type: 'APPROVE_KYC',
      payload: { vendorId },
    });
    confetti({ particleCount: 35, spread: 60, origin: { y: 0.7 } });
  };

  // ================= TAB: GOVERNANCE =================
  if (activeNavTab === 'governance') {
    return (
      <div className="space-y-4 pb-6">
        {/* Active Emergency Alert if present */}
        {state.emergencyAlert && (
          <div className="bg-red-600 text-white p-3.5 rounded-2xl shadow-sm flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <AlertTriangle className="w-5 h-5 text-amber-300 shrink-0 animate-pulse" />
              <div className="min-w-0">
                <span className="text-[10px] font-black uppercase tracking-wider bg-red-800 px-1.5 py-0.5 rounded">
                  SOS DISPATCH
                </span>
                <p className="text-xs font-bold truncate mt-0.5">{state.emergencyAlert.title}</p>
              </div>
            </div>
            <button
              onClick={() => dispatch({ type: 'CLEAR_EMERGENCY' })}
              className="px-2.5 py-1 text-[11px] font-bold bg-red-800 hover:bg-red-900 rounded-lg shrink-0"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Governance Title Card with Terminal Hero */}
        <div className="relative rounded-2xl overflow-hidden shadow-xs border border-slate-200/80 bg-slate-950 text-white">
          <img
            src={ASSETS.terminalHub}
            alt="Transit Hub"
            className="absolute inset-0 w-full h-full object-cover opacity-25 mix-blend-luminosity"
          />
          <div className="relative p-4 bg-gradient-to-t from-slate-950 via-slate-900/80 to-slate-900/60">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold tracking-wider text-teal-300 uppercase">
                  Platform Governance
                </span>
                <h2 className="text-base font-black text-white tracking-tight mt-0.5">
                  Cross-City Control Console
                </h2>
              </div>
              <button
                onClick={onOpenEmergencySheet}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-red-600 hover:bg-red-700 active:scale-95 text-white text-xs font-bold shadow-sm transition"
              >
                <Radio className="w-3.5 h-3.5 animate-pulse" />
                <span>Broadcast</span>
              </button>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                5 Regional Hubs Sync
              </span>
              <span className="text-[11px] text-slate-300 font-medium">
                342 Active Buses
              </span>
            </div>
          </div>
        </div>

        {/* 2x3 Mobile Metric Grid */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-600 mb-1">
              <span className="text-[10px] font-bold uppercase">GROSS GMV</span>
              <Wallet className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-base font-black text-slate-900">
              ₹{(state.totalGrossGmv / 100000).toFixed(2)}L
            </div>
            <div className="text-[10px] font-semibold text-emerald-600 mt-0.5">
              +14.2% DoD vs Y'day
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-600 mb-1">
              <span className="text-[10px] font-bold uppercase">ACTIVE FLEET</span>
              <Bus className="w-4 h-4 text-cyan-600" />
            </div>
            <div className="text-base font-black text-slate-900">
              {state.activeFleetCount} Units
            </div>
            <div className="text-[10px] font-semibold text-slate-500 mt-0.5">
              98.6% On-Schedule
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-600 mb-1">
              <span className="text-[10px] font-bold uppercase">CONVENIENCE</span>
              <Receipt className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-base font-black text-slate-900">
              ₹{(state.convenienceRevenue / 1000).toFixed(1)}k
            </div>
            <div className="text-[10px] font-semibold text-slate-500 mt-0.5">
              ₹{state.rules.adminConvenienceFee}/seat take
            </div>
          </div>

          <div className="bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-xs">
            <div className="flex items-center justify-between text-slate-600 mb-1">
              <span className="text-[10px] font-bold uppercase">FLEET SOS</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-base font-black text-slate-900">
              {state.activeSosAlerts} Active
            </div>
            <div className="text-[10px] font-semibold text-emerald-600 mt-0.5">
              Pings 99.98% OK
            </div>
          </div>
        </div>

        {/* Google Maps Live Fleet Radar Card */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-3.5 shadow-xs">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-2">
              <div className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
                <MapIcon className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-xs font-black text-slate-900">Live Fleet Radar (Google Maps)</h3>
                <p className="text-[10px] text-slate-500">Realtime AIS-140 GPS & Highway Corridors</p>
              </div>
            </div>

            <button
              onClick={() => setShowMapRadar(!showMapRadar)}
              className="text-[10px] font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 px-2.5 py-1 rounded-lg transition"
            >
              {showMapRadar ? 'Collapse' : 'Expand Radar'}
            </button>
          </div>

          {showMapRadar && (
            <div className="mt-2 rounded-xl overflow-hidden">
              <DummyGoogleMapsView heightClass="h-[360px]" />
            </div>
          )}
        </div>

        {/* Regional Franchisee Hubs Section */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-black text-slate-900">Regional Franchisee Hubs</h3>
              <p className="text-[11px] text-slate-500">{state.hubs.length} Active Nodes</p>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                onClick={onOpenExportSheet}
                className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700"
                title="Export Settlement"
              >
                <Download className="w-4 h-4" />
              </button>
              <button
                onClick={onOpenProvisionSheet}
                className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-[#00a896] hover:bg-[#008f80] text-white text-xs font-bold shadow-xs"
              >
                <PlusCircle className="w-3.5 h-3.5" />
                <span>New Hub</span>
              </button>
            </div>
          </div>

          <div className="space-y-2.5">
            {state.hubs.map((hub) => (
              <div
                key={hub.id}
                className="p-3 rounded-xl border border-slate-200/80 bg-slate-50/50 hover:bg-slate-50 transition"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-teal-100 text-teal-800 text-xs font-black flex items-center justify-center">
                      {hub.code.split('-')[1]}
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{hub.name}</h4>
                      <p className="text-[10px] text-slate-500 font-mono">{hub.code}</p>
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      hub.operationalStatus === 'peak'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}
                  >
                    {hub.statusLabel}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 mt-2.5 pt-2 border-t border-slate-200/60 text-[11px]">
                  <div>
                    <span className="text-[9px] text-slate-600 block uppercase font-bold">GMV</span>
                    <span className="font-bold text-slate-900">
                      ₹{(hub.todayGmv / 100000).toFixed(2)}L
                    </span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-600 block uppercase font-bold">Load</span>
                    <span className="font-bold text-teal-700">{hub.avgOccupancy}%</span>
                  </div>
                  <div>
                    <span className="text-[9px] text-slate-600 block uppercase font-bold">Share</span>
                    <span className="font-bold text-emerald-700">
                      ₹{(hub.hubShareAmount / 1000).toFixed(0)}k
                    </span>
                  </div>
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-200/60 flex items-center justify-end gap-1.5">
                  <button
                    onClick={() => onSwitchToFranchisee(hub.id)}
                    className="px-2.5 py-1 text-[11px] font-bold text-teal-700 bg-teal-50 hover:bg-teal-100 rounded-lg flex items-center gap-1"
                  >
                    <Eye className="w-3 h-3" />
                    <span>View Ops</span>
                  </button>
                  <button
                    onClick={() => onOpenOverrideSheet(hub)}
                    className="px-2.5 py-1 text-[11px] font-bold text-slate-700 bg-slate-200/80 hover:bg-slate-300 rounded-lg flex items-center gap-1"
                  >
                    <Sliders className="w-3 h-3" />
                    <span>Override</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Global Cluster Health Preview */}
        <div className="bg-white rounded-2xl border border-slate-200/80 p-4 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Server className="w-4 h-4 text-teal-600" />
              <h3 className="text-xs font-bold text-slate-900">Cluster Health: Nominal</h3>
            </div>
            <button
              onClick={onOpenTelemetrySheet}
              className="text-[11px] text-teal-700 font-bold flex items-center gap-1"
            >
              <Terminal className="w-3 h-3" />
              <span>Raw Stream</span>
            </button>
          </div>
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Primary Core: 24ms</span>
            <span>Relay: 31ms</span>
            <span className="font-mono text-emerald-700 font-bold">8,410 pings/min</span>
          </div>
        </div>
      </div>
    );
  }

  // ================= TAB: KYC VERIFICATION =================
  if (activeNavTab === 'kyc') {
    return (
      <div className="space-y-4 pb-6">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                Statutory Clearances
              </span>
              <h2 className="text-base font-black text-slate-900 mt-0.5">
                Vendor Onboarding & KYC
              </h2>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 text-[10px] font-bold">
              {state.kycVendors.filter((v) => v.status !== 'approved').length} Pending
            </span>
          </div>
        </div>

        <div className="space-y-3">
          {state.kycVendors.map((vendor) => {
            const isApproved = vendor.status === 'approved';
            return (
              <div
                key={vendor.id}
                className={`p-4 rounded-2xl border bg-white shadow-xs transition ${
                  isApproved ? 'border-emerald-200 bg-emerald-50/20' : 'border-slate-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Fleet Vehicle Thumbnail */}
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-900 shrink-0 relative border border-slate-200 shadow-xs">
                    <img
                      src={vendor.id === 'kyc-nar-01' ? ASSETS.luxuryCoach : ASSETS.executiveVan}
                      alt={vendor.vendorName}
                      className="w-full h-full object-cover"
                    />
                    <span className="absolute bottom-0 inset-x-0 bg-slate-950/80 text-[8px] text-center font-bold text-teal-300 py-0.5">
                      {vendor.fleetSize} Buses
                    </span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-1">
                      <h3 className="text-xs font-extrabold text-slate-900 truncate">{vendor.vendorName}</h3>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full shrink-0 ${
                          isApproved ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {isApproved ? 'Approved' : 'Pending'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">
                      {vendor.busTypeDescription}
                    </p>
                    <p className="text-[10px] text-slate-600 mt-0.5">
                      Via {vendor.hubName} ({vendor.submittedAgo})
                    </p>
                  </div>
                </div>

                {/* Badges */}
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {vendor.badges.map((b, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 bg-emerald-50 text-emerald-800 text-[9px] font-bold rounded border border-emerald-200 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                      <span>{b.label}</span>
                    </span>
                  ))}
                </div>

                {/* Actions */}
                <div className="mt-3.5 pt-2.5 border-t border-slate-100 flex items-center justify-end gap-2">
                  <button
                    onClick={() => onInspectVendor(vendor)}
                    className="px-3 py-1.5 text-xs font-bold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl"
                  >
                    Inspect
                  </button>
                  {!isApproved && (
                    <button
                      onClick={() => handleApproveKyc(vendor.id)}
                      className="px-3.5 py-1.5 text-xs font-bold text-white bg-[#00a896] hover:bg-[#008f80] rounded-xl flex items-center gap-1 shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Authorize Fleet</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // ================= TAB: RULES ENGINE =================
  if (activeNavTab === 'rules') {
    return (
      <div className="space-y-4 pb-6">
        <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
                Monetization Formulas
              </span>
              <h2 className="text-base font-black text-slate-900 mt-0.5">
                Platform Rules & Fee Engine
              </h2>
            </div>
            <span className="px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800 text-[10px] font-bold">
              Live Sync
            </span>
          </div>
        </div>

        <form onSubmit={handleSaveRules} className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs space-y-3.5">
          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
              <span>Admin Convenience Fee / Passenger</span>
              <span className="font-mono text-teal-700">₹{convenienceFee.toFixed(2)}</span>
            </div>
            <input
              type="number"
              step="0.5"
              value={convenienceFee}
              onChange={(e) => setConvenienceFee(Number(e.target.value))}
              className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00a896]"
            />
            <p className="text-[10px] text-slate-600 mt-1">Universal surcharge across all routes</p>
          </div>

          <div>
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
              <span>100% Refund Cutoff (Minutes)</span>
              <span className="font-mono text-teal-700">{refundCutoff} mins</span>
            </div>
            <input
              type="number"
              value={refundCutoff}
              onChange={(e) => setRefundCutoff(Number(e.target.value))}
              className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#00a896]"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[11px] font-bold text-slate-700 mb-1 block">Insurance Surcharge</label>
              <input
                type="number"
                value={insuranceSurcharge}
                onChange={(e) => setInsuranceSurcharge(Number(e.target.value))}
                className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
              />
            </div>
            <div>
              <label className="text-[11px] font-bold text-slate-700 mb-1 block">GPS Ping Rate (s)</label>
              <input
                type="number"
                value={pingRate}
                onChange={(e) => setPingRate(Number(e.target.value))}
                className="w-full text-xs font-bold p-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#00a896] hover:bg-[#008f80] active:scale-95 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-1.5"
          >
            {rulesSaved ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Deployed Across 5 Hubs!</span>
              </>
            ) : (
              <>
                <Zap className="w-4 h-4 text-cyan-200" />
                <span>Deploy Rules Platform-Wide</span>
              </>
            )}
          </button>
        </form>
      </div>
    );
  }

  // ================= TAB: AUDIT LOG =================
  return (
    <div className="space-y-4 pb-6">
      <div className="bg-white p-4 rounded-2xl border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-600">
              Immutable Ledger
            </span>
            <h2 className="text-base font-black text-slate-900 mt-0.5">
              System Audit Stream
            </h2>
          </div>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-bold rounded-full border border-emerald-200">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            Listening
          </span>
        </div>
      </div>

      <div className="space-y-2">
        {state.auditLogs.map((log) => (
          <div
            key={log.id}
            className="p-3 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-start justify-between gap-2"
          >
            <div className="flex items-start gap-2.5">
              <div className="p-1.5 rounded-lg bg-teal-50 text-teal-700 shrink-0 mt-0.5">
                <History className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 leading-tight">{log.title}</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{log.detail}</p>
              </div>
            </div>
            <span className="font-mono text-[9px] font-bold text-slate-600 shrink-0">
              {log.timestamp}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

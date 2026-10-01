import { useState, useEffect } from 'react';
import {
  FranchiseeHub,
  RouteCorridor,
  VendorKYC,
  PlatformRuleConfig,
  SystemAuditItem,
  LiveTelemetryFeedItem,
  RentalFleetItem,
  LiveBusTracking,
  EmergencyBroadcast,
} from '../types';
import {
  INITIAL_HUBS,
  INITIAL_CORRIDORS,
  INITIAL_KYC_VENDORS,
  INITIAL_RULES,
  INITIAL_AUDIT_LOGS,
  INITIAL_TELEMETRY_FEED,
  INITIAL_RENTAL_FLEET,
  LIVE_BUS_LOCATIONS,
} from '../data/initialData';

export interface TransitState {
  hubs: FranchiseeHub[];
  corridors: RouteCorridor[];
  kycVendors: VendorKYC[];
  rules: PlatformRuleConfig;
  auditLogs: SystemAuditItem[];
  telemetryFeed: LiveTelemetryFeedItem[];
  rentalFleets: RentalFleetItem[];
  liveBuses: LiveBusTracking[];
  emergencyAlert: EmergencyBroadcast | null;
  timeFilter: 'daily' | 'weekly';
  selectedRegion: string;
  isLiveRealtime: boolean;
  totalGrossGmv: number;
  activeFleetCount: number;
  convenienceRevenue: number;
  activeSosAlerts: number;
  totalRefundsPaid: number;
  isTelemetryLiveSync: boolean;
}

export type TransitEvent =
  | { type: 'UPDATE_RULES'; payload: Partial<PlatformRuleConfig> }
  | { type: 'APPROVE_KYC'; payload: { vendorId: string; adminNote?: string } }
  | { type: 'REJECT_KYC'; payload: { vendorId: string; reason: string } }
  | { type: 'PROVISION_HUB'; payload: Omit<FranchiseeHub, 'id'> }
  | { type: 'OVERRIDE_HUB_SCOPING'; payload: { hubId: string; contractRate: number; occupancyCap: number; status: FranchiseeHub['operationalStatus']; statusLabel: string } }
  | { type: 'DISPATCH_EMERGENCY'; payload: EmergencyBroadcast }
  | { type: 'CLEAR_EMERGENCY' }
  | { type: 'ASSIGN_RENTAL'; payload: { fleetId: string; clientName: string; purpose: string; ratePerDay: number } }
  | { type: 'SET_TIME_FILTER'; payload: 'daily' | 'weekly' }
  | { type: 'SET_REGION_SCOPE'; payload: string }
  | { type: 'TOGGLE_LIVE_STREAM' }
  | { type: 'SIMULATE_TELEMETRY_TICK' };

class TransitBloc {
  private state: TransitState;
  private listeners: Set<(state: TransitState) => void> = new Set();
  private timer: NodeJS.Timeout | null = null;

  constructor() {
    this.state = {
      hubs: INITIAL_HUBS,
      corridors: INITIAL_CORRIDORS,
      kycVendors: INITIAL_KYC_VENDORS,
      rules: INITIAL_RULES,
      auditLogs: INITIAL_AUDIT_LOGS,
      telemetryFeed: INITIAL_TELEMETRY_FEED,
      rentalFleets: INITIAL_RENTAL_FLEET,
      liveBuses: LIVE_BUS_LOCATIONS,
      emergencyAlert: null,
      timeFilter: 'daily',
      selectedRegion: 'all',
      isLiveRealtime: true,
      totalGrossGmv: 4865200,
      activeFleetCount: 342,
      convenienceRevenue: 412800,
      activeSosAlerts: 0,
      totalRefundsPaid: 38200,
      isTelemetryLiveSync: true,
    };

    this.startSimulation();
  }

  public getState(): TransitState {
    return this.state;
  }

  public subscribe(listener: (state: TransitState) => void): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  private notify(): void {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  public dispatch(event: TransitEvent): void {
    this.reduce(event);
    this.notify();
  }

  private reduce(event: TransitEvent): void {
    switch (event.type) {
      case 'UPDATE_RULES': {
        const updatedRules: PlatformRuleConfig = {
          ...this.state.rules,
          ...event.payload,
          lastUpdated: 'Just now',
          updatedBy: 'Admin Global Controller',
        };

        const newAuditItem: SystemAuditItem = {
          id: `audit-${Date.now()}`,
          title: `Platform Rules Updated: ₹${updatedRules.adminConvenienceFee} Fee / ${updatedRules.universalRefundCutoffMinutes}m Cutoff`,
          detail: `Parameters broadcast to 5 regional nodes & sync engine (Ping rate: ${updatedRules.telematicsPingRateSeconds}s)`,
          timestamp: new Date().toLocaleTimeString('en-IN', { hour12: false }) + ' IST',
          iconType: 'rules',
          hashSignature: '0x' + Math.random().toString(16).substring(2, 10),
        };

        this.state = {
          ...this.state,
          rules: updatedRules,
          auditLogs: [newAuditItem, ...this.state.auditLogs.slice(0, 19)],
        };
        break;
      }

      case 'APPROVE_KYC': {
        const { vendorId } = event.payload;
        const vendor = this.state.kycVendors.find((v) => v.id === vendorId);
        if (!vendor) return;

        const updatedKyc = this.state.kycVendors.map((v) =>
          v.id === vendorId ? { ...v, status: 'approved' as const } : v
        );

        const newAuditItem: SystemAuditItem = {
          id: `audit-${Date.now()}`,
          title: `Vendor KYC Approved & Fleet Activated: ${vendor.vendorName}`,
          detail: `Actor: superadmin_master • ${vendor.fleetSize} units added to ${vendor.hubName} active matrix`,
          timestamp: new Date().toLocaleTimeString('en-IN', { hour12: false }) + ' IST',
          iconType: 'check',
          hashSignature: '0x' + Math.random().toString(16).substring(2, 10),
        };

        const newFeedItem: LiveTelemetryFeedItem = {
          id: `feed-${Date.now()}`,
          category: 'dispatch',
          title: `${vendor.vendorName} Cleared`,
          detail: `Statutory permits authorized. Fleet authorized for live stage carriage`,
          timeAgo: 'Just now',
          badge: 'Verified',
        };

        this.state = {
          ...this.state,
          kycVendors: updatedKyc,
          activeFleetCount: this.state.activeFleetCount + vendor.fleetSize,
          auditLogs: [newAuditItem, ...this.state.auditLogs.slice(0, 19)],
          telemetryFeed: [newFeedItem, ...this.state.telemetryFeed.slice(0, 15)],
        };
        break;
      }

      case 'REJECT_KYC': {
        const { vendorId, reason } = event.payload;
        const vendor = this.state.kycVendors.find((v) => v.id === vendorId);
        if (!vendor) return;

        const updatedKyc = this.state.kycVendors.map((v) =>
          v.id === vendorId ? { ...v, status: 'rejected' as const } : v
        );

        const newAuditItem: SystemAuditItem = {
          id: `audit-${Date.now()}`,
          title: `Vendor KYC Clearance Rejected: ${vendor.vendorName}`,
          detail: `Reason: ${reason} • Documents returned to franchisee node for re-audit`,
          timestamp: new Date().toLocaleTimeString('en-IN', { hour12: false }) + ' IST',
          iconType: 'alert',
          hashSignature: '0x' + Math.random().toString(16).substring(2, 10),
        };

        this.state = {
          ...this.state,
          kycVendors: updatedKyc,
          auditLogs: [newAuditItem, ...this.state.auditLogs.slice(0, 19)],
        };
        break;
      }

      case 'PROVISION_HUB': {
        const newHub: FranchiseeHub = {
          ...event.payload,
          id: `hub-${Date.now()}`,
        };

        const newAuditItem: SystemAuditItem = {
          id: `audit-${Date.now()}`,
          title: `New Regional Hub Provisioned: ${newHub.name} (${newHub.code})`,
          detail: `Nodal: ${newHub.nodalEntity} • Base contract rate ${newHub.contractRate}% locked to Escrow`,
          timestamp: new Date().toLocaleTimeString('en-IN', { hour12: false }) + ' IST',
          iconType: 'payment',
          hashSignature: '0x' + Math.random().toString(16).substring(2, 10),
        };

        this.state = {
          ...this.state,
          hubs: [...this.state.hubs, newHub],
          auditLogs: [newAuditItem, ...this.state.auditLogs.slice(0, 19)],
        };
        break;
      }

      case 'OVERRIDE_HUB_SCOPING': {
        const { hubId, contractRate, occupancyCap, status, statusLabel } = event.payload;
        const targetHub = this.state.hubs.find((h) => h.id === hubId);
        if (!targetHub) return;

        const updatedHubs = this.state.hubs.map((hub) => {
          if (hub.id === hubId) {
            const newShare = Math.round((hub.todayGmv * contractRate) / 100);
            return {
              ...hub,
              contractRate,
              occupancyCap,
              operationalStatus: status,
              statusLabel,
              hubShareAmount: newShare,
            };
          }
          return hub;
        });

        const newAuditItem: SystemAuditItem = {
          id: `audit-${Date.now()}`,
          title: `Master Override Executed: ${targetHub.name}`,
          detail: `Contract margin: ${contractRate}% • Capacity limit: ${occupancyCap}% • Status: ${statusLabel}`,
          timestamp: new Date().toLocaleTimeString('en-IN', { hour12: false }) + ' IST',
          iconType: 'surge',
          hashSignature: '0x' + Math.random().toString(16).substring(2, 10),
        };

        this.state = {
          ...this.state,
          hubs: updatedHubs,
          auditLogs: [newAuditItem, ...this.state.auditLogs.slice(0, 19)],
        };
        break;
      }

      case 'DISPATCH_EMERGENCY': {
        const emergency = event.payload;
        const newAuditItem: SystemAuditItem = {
          id: `audit-${Date.now()}`,
          title: `EMERGENCY BROADCAST ISSUED: ${emergency.title}`,
          detail: `Scope: ${emergency.targetScope.toUpperCase()} • Severity: ${emergency.severity.toUpperCase()}`,
          timestamp: new Date().toLocaleTimeString('en-IN', { hour12: false }) + ' IST',
          iconType: 'alert',
          hashSignature: '0x' + Math.random().toString(16).substring(2, 10),
        };

        this.state = {
          ...this.state,
          emergencyAlert: emergency,
          activeSosAlerts: 1,
          auditLogs: [newAuditItem, ...this.state.auditLogs.slice(0, 19)],
        };
        break;
      }

      case 'CLEAR_EMERGENCY': {
        this.state = {
          ...this.state,
          emergencyAlert: null,
          activeSosAlerts: 0,
        };
        break;
      }

      case 'ASSIGN_RENTAL': {
        const { fleetId, clientName, purpose, ratePerDay } = event.payload;
        const updatedFleets = this.state.rentalFleets.map((f) =>
          f.id === fleetId
            ? {
                ...f,
                status: 'Booked' as const,
                bookingPurpose: `Booked: ${purpose} (${clientName})`,
                ratePerDay,
              }
            : f
        );

        const newAuditItem: SystemAuditItem = {
          id: `audit-${Date.now()}`,
          title: `Rental Fleet Assigned: ${purpose}`,
          detail: `Dispatched to ${clientName} at ₹${ratePerDay.toLocaleString('en-IN')}/day`,
          timestamp: new Date().toLocaleTimeString('en-IN', { hour12: false }) + ' IST',
          iconType: 'check',
        };

        this.state = {
          ...this.state,
          rentalFleets: updatedFleets,
          auditLogs: [newAuditItem, ...this.state.auditLogs.slice(0, 19)],
        };
        break;
      }

      case 'SET_TIME_FILTER': {
        const multiplier = event.payload === 'weekly' ? 6.8 : 1;
        this.state = {
          ...this.state,
          timeFilter: event.payload,
          totalGrossGmv: Math.round(4865200 * (event.payload === 'weekly' ? 6.8 : 1)),
          convenienceRevenue: Math.round(412800 * (event.payload === 'weekly' ? 6.8 : 1)),
          totalRefundsPaid: Math.round(38200 * (event.payload === 'weekly' ? 6.5 : 1)),
        };
        break;
      }

      case 'SET_REGION_SCOPE': {
        this.state = {
          ...this.state,
          selectedRegion: event.payload,
        };
        break;
      }

      case 'TOGGLE_LIVE_STREAM': {
        const nextSync = !this.state.isTelemetryLiveSync;
        if (nextSync && !this.timer) {
          this.startSimulation();
        } else if (!nextSync && this.timer) {
          clearInterval(this.timer);
          this.timer = null;
        }
        this.state = {
          ...this.state,
          isTelemetryLiveSync: nextSync,
          isLiveRealtime: nextSync,
        };
        break;
      }

      case 'SIMULATE_TELEMETRY_TICK': {
        // Small random fluctuations in live buses & pings
        const deltaSpeed = Math.floor(Math.random() * 5) - 2;
        const updatedBuses = this.state.liveBuses.map((b) => ({
          ...b,
          speedKmH: Math.max(45, Math.min(88, b.speedKmH + deltaSpeed)),
        }));

        this.state = {
          ...this.state,
          liveBuses: updatedBuses,
        };
        break;
      }
    }
  }

  private startSimulation() {
    if (this.timer) return;
    this.timer = setInterval(() => {
      if (this.state.isTelemetryLiveSync) {
        this.dispatch({ type: 'SIMULATE_TELEMETRY_TICK' });
      }
    }, 4000);
  }
}

// Global Singleton BLoC Instance
export const transitBloc = new TransitBloc();

export function useTransitBloc() {
  const [state, setState] = useState<TransitState>(transitBloc.getState());

  useEffect(() => {
    const unsubscribe = transitBloc.subscribe((newState) => {
      setState({ ...newState });
    });
    return unsubscribe;
  }, []);

  return {
    state,
    dispatch: (event: TransitEvent) => transitBloc.dispatch(event),
  };
}

export interface FranchiseeHub {
  id: string;
  code: string;
  name: string;
  nodalEntity: string;
  liveBuses: number;
  todayGmv: number;
  dodGrowth: number;
  avgOccupancy: number;
  occupancyCap: number;
  hubShareAmount: number;
  contractRate: number; // e.g. 12.0
  operationalStatus: 'healthy' | 'peak' | 'normal' | 'congested';
  statusLabel: string;
  region: string;
  restrictedCorridors: string[];
}

export interface RouteCorridor {
  id: string;
  from: string;
  to: string;
  code: string;
  distanceKm: number;
  via: string;
  activeBuses: number;
  tripsPerDay: number;
  occupancy: number;
  grossGmv: number;
  franchiseShareAmount: number;
  sharePercent: number;
  badge?: string;
  badgeType?: 'default' | 'express' | 'shuttle';
  stops: { name: string; time: string; status: 'departed' | 'current' | 'upcoming' }[];
}

export interface VendorKYC {
  id: string;
  vendorName: string;
  hubId: string;
  hubName: string;
  fleetSize: number;
  busTypeDescription: string;
  submittedAgo: string;
  status: 'pending_master' | 'documents_cleared' | 'approved' | 'rejected';
  badges: { label: string; verified: boolean }[];
  documents: {
    type: string;
    docNumber: string;
    validTill: string;
    fileUrl?: string;
  }[];
}

export interface PlatformRuleConfig {
  adminConvenienceFee: number;
  universalRefundCutoffMinutes: number;
  accidentalInsuranceSurcharge: number;
  telematicsPingRateSeconds: number;
  rentalDriverAllowancePerDay: number;
  lastUpdated: string;
  updatedBy: string;
}

export interface SystemAuditItem {
  id: string;
  title: string;
  detail: string;
  timestamp: string;
  iconType: 'check' | 'payment' | 'surge' | 'stoppage' | 'alert' | 'rules';
  hashSignature?: string;
}

export interface LiveTelemetryFeedItem {
  id: string;
  category: 'bus' | 'parcel' | 'refund' | 'dispatch' | 'emergency';
  title: string;
  detail: string;
  timeAgo: string;
  badge?: string;
}

export interface RentalFleetItem {
  id: string;
  name: string;
  category: string;
  ratePerDay: number;
  status: 'Booked' | 'Available' | 'Maintenance';
  bookingPurpose?: string;
  imageUrl?: string;
}

export interface LiveBusTracking {
  id: string;
  plateNumber: string;
  routeId: string;
  driverName: string;
  passengers: number;
  capacity: number;
  speedKmH: number;
  nextStop: string;
  etaNextStop: string;
  lat: number;
  lng: number;
  heading: number;
  status: 'On-Time' | 'Delayed' | 'Stationary';
  coordinates?: { x: number; y: number };
}

export interface EmergencyBroadcast {
  id: string;
  title: string;
  message: string;
  targetScope: 'all' | 'central_mp' | 'drivers_only' | 'passengers_only';
  severity: 'critical' | 'high' | 'advisory';
  timestamp: string;
  acknowledgedCount: number;
  totalTargeted: number;
}

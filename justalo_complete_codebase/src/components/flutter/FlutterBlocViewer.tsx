import React, { useState } from 'react';
import {
  Code2,
  Copy,
  Check,
  Download,
  Layers,
  Terminal,
  FileCode,
  Sparkles,
  Smartphone,
  ExternalLink,
} from 'lucide-react';

export const FlutterBlocViewer: React.FC = () => {
  const [activeFile, setActiveFile] = useState<'bloc' | 'events_states' | 'models' | 'admin_screen' | 'franchisee_screen' | 'pubspec'>('bloc');
  const [copied, setCopied] = useState(false);

  const flutterCodeSnippets = {
    bloc: `// lib/blocs/transit/transit_bloc.dart
import 'dart:async';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:equatable/equatable.dart';
import '../../models/transit_models.dart';
import '../../repositories/transit_repository.dart';

part 'transit_event.dart';
part 'transit_state.dart';

class TransitBloc extends Bloc<TransitEvent, TransitState> {
  final TransitRepository repository;
  Timer? _telemetryTimer;

  TransitBloc({required this.repository}) : super(TransitState.initial()) {
    on<LoadTransitPlatformEvent>(_onLoadPlatform);
    on<UpdatePlatformRulesEvent>(_onUpdateRules);
    on<ApproveKycVendorEvent>(_onApproveKycVendor);
    on<RejectKycVendorEvent>(_onRejectKycVendor);
    on<ProvisionHubEvent>(_onProvisionHub);
    on<OverrideHubScopingEvent>(_onOverrideHubScoping);
    on<DispatchEmergencyBroadcastEvent>(_onDispatchEmergency);
    on<ClearEmergencyAlertEvent>(_onClearEmergency);
    on<TelemetryStreamTickEvent>(_onTelemetryTick);
    on<ChangeTimeFilterEvent>(_onChangeTimeFilter);

    // Start Real-time Telematics Socket Polling
    _startTelematicsStream();
  }

  void _startTelematicsStream() {
    _telemetryTimer = Timer.periodic(const Duration(seconds: 4), (_) {
      if (state.isLiveSyncActive) {
        add(const TelemetryStreamTickEvent());
      }
    });
  }

  Future<void> _onLoadPlatform(
    LoadTransitPlatformEvent event,
    Emitter<TransitState> emit,
  ) async {
    emit(state.copyWith(status: TransitStatus.loading));
    try {
      final hubs = await repository.fetchHubs();
      final corridors = await repository.fetchCorridors();
      final kyc = await repository.fetchKycVendors();
      final rules = await repository.fetchRules();

      emit(state.copyWith(
        status: TransitStatus.loaded,
        hubs: hubs,
        corridors: corridors,
        kycVendors: kyc,
        rules: rules,
      ));
    } catch (e) {
      emit(state.copyWith(status: TransitStatus.failure, errorMessage: e.toString()));
    }
  }

  Future<void> _onUpdateRules(
    UpdatePlatformRulesEvent event,
    Emitter<TransitState> emit,
  ) async {
    final updatedRules = event.rules;
    final updatedAudit = [
      SystemAuditLog(
        id: DateTime.now().millisecondsSinceEpoch.toString(),
        title: 'Platform Rules Updated: ₹\${updatedRules.adminConvenienceFee} Fee',
        detail: 'Broadcasted to 5 regional nodes (Ping: \${updatedRules.telematicsPingRateSeconds}s)',
        timestamp: 'Just now',
        type: AuditType.rules,
      ),
      ...state.auditLogs,
    ];

    emit(state.copyWith(rules: updatedRules, auditLogs: updatedAudit));
  }

  Future<void> _onApproveKycVendor(
    ApproveKycVendorEvent event,
    Emitter<TransitState> emit,
  ) async {
    final updatedList = state.kycVendors.map((vendor) {
      if (vendor.id == event.vendorId) {
        return vendor.copyWith(status: KycStatus.approved);
      }
      return vendor;
    }).toList();

    emit(state.copyWith(
      kycVendors: updatedList,
      activeFleetCount: state.activeFleetCount + (event.fleetSize ?? 6),
    ));
  }

  Future<void> _onOverrideHubScoping(
    OverrideHubScopingEvent event,
    Emitter<TransitState> emit,
  ) async {
    final updatedHubs = state.hubs.map((hub) {
      if (hub.id == event.hubId) {
        final newShare = (hub.todayGmv * event.contractRate / 100).round();
        return hub.copyWith(
          contractRate: event.contractRate,
          occupancyCap: event.occupancyCap,
          statusLabel: event.statusLabel,
          hubShareAmount: newShare,
        );
      }
      return hub;
    }).toList();

    emit(state.copyWith(hubs: updatedHubs));
  }

  void _onDispatchEmergency(
    DispatchEmergencyBroadcastEvent event,
    Emitter<TransitState> emit,
  ) {
    emit(state.copyWith(
      emergencyAlert: event.broadcast,
      activeSosCount: 1,
    ));
  }

  void _onClearEmergency(
    ClearEmergencyAlertEvent event,
    Emitter<TransitState> emit,
  ) {
    emit(state.copyWith(
      emergencyAlert: null,
      activeSosCount: 0,
    ));
  }

  void _onTelemetryTick(
    TelemetryStreamTickEvent event,
    Emitter<TransitState> emit,
  ) {
    // High-performance state emit with minimal object allocation
    emit(state.copyWith(lastTelematicsPing: DateTime.now()));
  }

  void _onChangeTimeFilter(
    ChangeTimeFilterEvent event,
    Emitter<TransitState> emit,
  ) {
    emit(state.copyWith(timeFilter: event.filter));
  }

  @override
  Future<void> close() {
    _telemetryTimer?.cancel();
    return super.close();
  }
}`,

    events_states: `// lib/blocs/transit/transit_event.dart & transit_state.dart
import 'package:equatable/equatable.dart';
import '../../models/transit_models.dart';

abstract class TransitEvent extends Equatable {
  const TransitEvent();
  @override
  List<Object?> get props => [];
}

class LoadTransitPlatformEvent extends TransitEvent {}

class UpdatePlatformRulesEvent extends TransitEvent {
  final PlatformRules rules;
  const UpdatePlatformRulesEvent(this.rules);
  @override
  List<Object?> get props => [rules];
}

class ApproveKycVendorEvent extends TransitEvent {
  final String vendorId;
  final int? fleetSize;
  const ApproveKycVendorEvent(this.vendorId, {this.fleetSize});
  @override
  List<Object?> get props => [vendorId, fleetSize];
}

class RejectKycVendorEvent extends TransitEvent {
  final String vendorId;
  final String reason;
  const RejectKycVendorEvent(this.vendorId, this.reason);
  @override
  List<Object?> get props => [vendorId, reason];
}

class ProvisionHubEvent extends TransitEvent {
  final FranchiseeHub hub;
  const ProvisionHubEvent(this.hub);
  @override
  List<Object?> get props => [hub];
}

class OverrideHubScopingEvent extends TransitEvent {
  final String hubId;
  final double contractRate;
  final int occupancyCap;
  final String statusLabel;

  const OverrideHubScopingEvent({
    required this.hubId,
    required this.contractRate,
    required this.occupancyCap,
    required this.statusLabel,
  });

  @override
  List<Object?> get props => [hubId, contractRate, occupancyCap, statusLabel];
}

class DispatchEmergencyBroadcastEvent extends TransitEvent {
  final EmergencyBroadcast broadcast;
  const DispatchEmergencyBroadcastEvent(this.broadcast);
  @override
  List<Object?> get props => [broadcast];
}

class ClearEmergencyAlertEvent extends TransitEvent {}
class TelemetryStreamTickEvent extends TransitEvent {
  const TelemetryStreamTickEvent();
}

class ChangeTimeFilterEvent extends TransitEvent {
  final String filter; // 'daily' | 'weekly'
  const ChangeTimeFilterEvent(this.filter);
  @override
  List<Object?> get props => [filter];
}

// ==================== STATE ====================
enum TransitStatus { initial, loading, loaded, failure }

class TransitState extends Equatable {
  final TransitStatus status;
  final List<FranchiseeHub> hubs;
  final List<RouteCorridor> corridors;
  final List<VendorKYC> kycVendors;
  final PlatformRules rules;
  final List<SystemAuditLog> auditLogs;
  final EmergencyBroadcast? emergencyAlert;
  final int grossGmvToday;
  final int activeFleetCount;
  final int convenienceRevenue;
  final int activeSosCount;
  final bool isLiveSyncActive;
  final String timeFilter;
  final DateTime? lastTelematicsPing;
  final String? errorMessage;

  const TransitState({
    required this.status,
    required this.hubs,
    required this.corridors,
    required this.kycVendors,
    required this.rules,
    required this.auditLogs,
    this.emergencyAlert,
    required this.grossGmvToday,
    required this.activeFleetCount,
    required this.convenienceRevenue,
    required this.activeSosCount,
    required this.isLiveSyncActive,
    required this.timeFilter,
    this.lastTelematicsPing,
    this.errorMessage,
  });

  factory TransitState.initial() => TransitState(
    status: TransitStatus.initial,
    hubs: const [],
    corridors: const [],
    kycVendors: const [],
    rules: PlatformRules.defaults(),
    auditLogs: const [],
    grossGmvToday: 4865200,
    activeFleetCount: 342,
    convenienceRevenue: 412800,
    activeSosCount: 0,
    isLiveSyncActive: true,
    timeFilter: 'daily',
  );

  TransitState copyWith({
    TransitStatus? status,
    List<FranchiseeHub>? hubs,
    List<RouteCorridor>? corridors,
    List<VendorKYC>? kycVendors,
    PlatformRules? rules,
    List<SystemAuditLog>? auditLogs,
    EmergencyBroadcast? emergencyAlert,
    int? grossGmvToday,
    int? activeFleetCount,
    int? convenienceRevenue,
    int? activeSosCount,
    bool? isLiveSyncActive,
    String? timeFilter,
    DateTime? lastTelematicsPing,
    String? errorMessage,
  }) {
    return TransitState(
      status: status ?? this.status,
      hubs: hubs ?? this.hubs,
      corridors: corridors ?? this.corridors,
      kycVendors: kycVendors ?? this.kycVendors,
      rules: rules ?? this.rules,
      auditLogs: auditLogs ?? this.auditLogs,
      emergencyAlert: emergencyAlert ?? this.emergencyAlert,
      grossGmvToday: grossGmvToday ?? this.grossGmvToday,
      activeFleetCount: activeFleetCount ?? this.activeFleetCount,
      convenienceRevenue: convenienceRevenue ?? this.convenienceRevenue,
      activeSosCount: activeSosCount ?? this.activeSosCount,
      isLiveSyncActive: isLiveSyncActive ?? this.isLiveSyncActive,
      timeFilter: timeFilter ?? this.timeFilter,
      lastTelematicsPing: lastTelematicsPing ?? this.lastTelematicsPing,
      errorMessage: errorMessage ?? this.errorMessage,
    );
  }

  @override
  List<Object?> get props => [
    status,
    hubs,
    corridors,
    kycVendors,
    rules,
    auditLogs,
    emergencyAlert,
    grossGmvToday,
    activeFleetCount,
    convenienceRevenue,
    activeSosCount,
    isLiveSyncActive,
    timeFilter,
    lastTelematicsPing,
  ];
}`,

    models: `// lib/models/transit_models.dart
import 'package:equatable/equatable.dart';

class FranchiseeHub extends Equatable {
  final String id;
  final String code;
  final String name;
  final String nodalEntity;
  final int liveBuses;
  final int todayGmv;
  final double dodGrowth;
  final double avgOccupancy;
  final int occupancyCap;
  final int hubShareAmount;
  final double contractRate;
  final String statusLabel;

  const FranchiseeHub({
    required this.id,
    required this.code,
    required this.name,
    required this.nodalEntity,
    required this.liveBuses,
    required this.todayGmv,
    required this.dodGrowth,
    required this.avgOccupancy,
    required this.occupancyCap,
    required this.hubShareAmount,
    required this.contractRate,
    required this.statusLabel,
  });

  FranchiseeHub copyWith({
    double? contractRate,
    int? occupancyCap,
    String? statusLabel,
    int? hubShareAmount,
  }) {
    return FranchiseeHub(
      id: id,
      code: code,
      name: name,
      nodalEntity: nodalEntity,
      liveBuses: liveBuses,
      todayGmv: todayGmv,
      dodGrowth: dodGrowth,
      avgOccupancy: avgOccupancy,
      occupancyCap: occupancyCap ?? this.occupancyCap,
      hubShareAmount: hubShareAmount ?? this.hubShareAmount,
      contractRate: contractRate ?? this.contractRate,
      statusLabel: statusLabel ?? this.statusLabel,
    );
  }

  @override
  List<Object?> get props => [id, code, name, liveBuses, todayGmv, avgOccupancy, contractRate];
}

class RouteCorridor extends Equatable {
  final String id;
  final String from;
  final String to;
  final String code;
  final int distanceKm;
  final String via;
  final int activeBuses;
  final int tripsPerDay;
  final int occupancy;
  final int grossGmv;
  final int franchiseShareAmount;
  final int sharePercent;

  const RouteCorridor({
    required this.id,
    required this.from,
    required this.to,
    required this.code,
    required this.distanceKm,
    required this.via,
    required this.activeBuses,
    required this.tripsPerDay,
    required this.occupancy,
    required this.grossGmv,
    required this.franchiseShareAmount,
    required this.sharePercent,
  });

  @override
  List<Object?> get props => [id, code, from, to, activeBuses, occupancy, grossGmv];
}

enum KycStatus { pending, cleared, approved, rejected }

class VendorKYC extends Equatable {
  final String id;
  final String vendorName;
  final String hubName;
  final int fleetSize;
  final String busTypeDescription;
  final String submittedAgo;
  final KycStatus status;

  const VendorKYC({
    required this.id,
    required this.vendorName,
    required this.hubName,
    required this.fleetSize,
    required this.busTypeDescription,
    required this.submittedAgo,
    required this.status,
  });

  VendorKYC copyWith({KycStatus? status}) => VendorKYC(
    id: id,
    vendorName: vendorName,
    hubName: hubName,
    fleetSize: fleetSize,
    busTypeDescription: busTypeDescription,
    submittedAgo: submittedAgo,
    status: status ?? this.status,
  );

  @override
  List<Object?> get props => [id, vendorName, status, fleetSize];
}

class PlatformRules extends Equatable {
  final double adminConvenienceFee;
  final int universalRefundCutoffMinutes;
  final double accidentalInsuranceSurcharge;
  final int telematicsPingRateSeconds;
  final int rentalDriverAllowancePerDay;

  const PlatformRules({
    required this.adminConvenienceFee,
    required this.universalRefundCutoffMinutes,
    required this.accidentalInsuranceSurcharge,
    required this.telematicsPingRateSeconds,
    required this.rentalDriverAllowancePerDay,
  });

  factory PlatformRules.defaults() => const PlatformRules(
    adminConvenienceFee: 25.0,
    universalRefundCutoffMinutes: 25,
    accidentalInsuranceSurcharge: 15.0,
    telematicsPingRateSeconds: 8,
    rentalDriverAllowancePerDay: 600,
  );

  @override
  List<Object?> get props => [
    adminConvenienceFee,
    universalRefundCutoffMinutes,
    accidentalInsuranceSurcharge,
    telematicsPingRateSeconds,
    rentalDriverAllowancePerDay,
  ];
}

enum AuditType { check, payment, surge, stoppage, rules, alert }

class SystemAuditLog extends Equatable {
  final String id;
  final String title;
  final String detail;
  final String timestamp;
  final AuditType type;

  const SystemAuditLog({
    required this.id,
    required this.title,
    required this.detail,
    required this.timestamp,
    required this.type,
  });

  @override
  List<Object?> get props => [id, title, timestamp];
}

class EmergencyBroadcast extends Equatable {
  final String id;
  final String title;
  final String message;
  final String targetScope;
  final String severity;

  const EmergencyBroadcast({
    required this.id,
    required this.title,
    required this.message,
    required this.targetScope,
    required this.severity,
  });

  @override
  List<Object?> get props => [id, title, severity];
}`,

    admin_screen: `// lib/screens/super_admin_screen.dart
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../blocs/transit/transit_bloc.dart';
import '../models/transit_models.dart';

class SuperAdminGovernanceScreen extends StatelessWidget {
  const SuperAdminGovernanceScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF4F7F9),
      body: Row(
        children: [
          // Sidebar (Desktop / Tablet)
          if (MediaQuery.of(context).size.width > 900)
            _buildSuperAdminSidebar(context),

          // Main Scrollable Console
          Expanded(
            child: BlocBuilder<TransitBloc, TransitState>(
              builder: (context, state) {
                return CustomScrollView(
                  slivers: [
                    // Top App Bar
                    _buildGovernanceHeader(context, state),

                    // Active SOS Banner
                    if (state.emergencyAlert != null)
                      SliverToBoxAdapter(
                        child: _buildEmergencyBanner(context, state.emergencyAlert!),
                      ),

                    // KPI Metric Cards
                    SliverPadding(
                      padding: const EdgeInsets.all(24),
                      sliver: SliverToBoxAdapter(
                        child: _buildKpiGrid(context, state),
                      ),
                    ),

                    // Regional Yield Hub Table
                    SliverPadding(
                      padding: const EdgeInsets.symmetric(horizontal: 24),
                      sliver: SliverToBoxAdapter(
                        child: _buildYieldHubTable(context, state),
                      ),
                    ),

                    // Bottom Grid: KYC + Platform Rules
                    SliverPadding(
                      padding: const EdgeInsets.all(24),
                      sliver: SliverToBoxAdapter(
                        child: _buildBottomOperationalGrid(context, state),
                      ),
                    ),
                  ],
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSuperAdminSidebar(BuildContext context) {
    return Container(
      width: 250,
      color: const Color(0xFF0A192F),
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(20),
            alignment: Alignment.centerLeft,
            child: const Text(
              'SUPER ADMIN PLATFORM',
              style: TextStyle(color: Colors.white70, fontSize: 11, fontWeight: FontWeight.bold, letterSpacing: 1.2),
            ),
          ),
          ListTile(
            leading: const Icon(Icons.dashboard, color: Colors.white),
            title: const Text('Global Overview', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
            tileColor: const Color(0xFF00A896),
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          ),
          // Additional navigation tiles...
        ],
      ),
    );
  }

  Widget _buildGovernanceHeader(BuildContext context, TransitState state) {
    return SliverAppBar(
      pinned: true,
      backgroundColor: Colors.white,
      elevation: 1,
      title: const Text('Cross-City Operations Control', style: TextStyle(color: Colors.black87, fontWeight: FontWeight.bold)),
      actions: [
        ElevatedButton.icon(
          style: ElevatedButton.styleFrom(backgroundColor: const Color(0xFFC5221F)),
          icon: const Icon(Icons.emergency, color: Colors.white),
          label: const Text('Emergency Broadcast', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
          onPressed: () {
            // Trigger emergency broadcast via Bloc
          },
        ),
        const SizedBox(width: 16),
      ],
    );
  }

  Widget _buildKpiGrid(BuildContext context, TransitState state) {
    return LayoutBuilder(
      builder: (context, constraints) {
        final crossAxisCount = constraints.maxWidth > 1200 ? 6 : (constraints.maxWidth > 700 ? 3 : 2);
        return GridView.count(
          crossAxisCount: crossAxisCount,
          crossAxisSpacing: 16,
          mainAxisSpacing: 16,
          shrinkWrap: true,
          physics: const NeverScrollableScrollPhysics(),
          childAspectRatio: 1.6,
          children: [
            _buildKpiCard('GROSS GMV (TODAY)', '₹\${state.grossGmvToday}', Icons.account_balance_wallet, Colors.teal),
            _buildKpiCard('ACTIVE FLEET LIVE', '\${state.activeFleetCount}', Icons.directions_bus, Colors.cyan),
            _buildKpiCard('FRANCHISEE NODES', '\${state.hubs.length} Hubs', Icons.hub, Colors.blue),
            _buildKpiCard('CONVENIENCE REV', '₹\${state.convenienceRevenue}', Icons.receipt_long, Colors.indigo),
            _buildKpiCard('FLEET SOS', '\${state.activeSosCount} Active', Icons.security, Colors.red),
          ],
        );
      },
    );
  }

  Widget _buildKpiCard(String title, String value, IconData icon, Color color) {
    return Container(
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: Colors.black12)),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Text(title, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.bold, color: Colors.black54)),
          Text(value, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w900)),
        ],
      ),
    );
  }

  Widget _buildYieldHubTable(BuildContext context, TransitState state) {
    return Container(
      decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: Colors.black12)),
      padding: const EdgeInsets.all(20),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('Regional Franchisee Scoping & Yield Hub', style: TextStyle(fontSize: 16, fontWeight: FontWeight.bold)),
          const SizedBox(height: 16),
          // DataTable showing hubs, occupancy, and master overrides...
        ],
      ),
    );
  }

  Widget _buildBottomOperationalGrid(BuildContext context, TransitState state) {
    return Row(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        // KYC Column
        Expanded(child: Container(/* KYC Verification List */)),
        const SizedBox(width: 24),
        // Rule Engine Column
        Expanded(child: Container(/* Platform Rules Tuning */)),
      ],
    );
  }

  Widget _buildEmergencyBanner(BuildContext context, EmergencyBroadcast broadcast) {
    return Container(
      color: Colors.red,
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 12),
      child: Row(
        children: [
          const Icon(Icons.warning, color: Colors.white),
          const SizedBox(width: 12),
          Text(broadcast.title, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
          const Spacer(),
          TextButton(
            onPressed: () => context.read<TransitBloc>().add(ClearEmergencyAlertEvent()),
            child: const Text('DISMISS', style: TextStyle(color: Colors.white)),
          ),
        ],
      ),
    );
  }
}`,

    franchisee_screen: `// lib/screens/franchisee_dashboard_screen.dart
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../blocs/transit/transit_bloc.dart';
import '../models/transit_models.dart';

class FranchiseeDashboardScreen extends StatelessWidget {
  final String hubId;
  const FranchiseeDashboardScreen({super.key, this.hubId = 'hub-ind-01'});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF4F7F9),
      body: Row(
        children: [
          // Franchisee Sidebar
          if (MediaQuery.of(context).size.width > 900)
            _buildFranchiseeSidebar(context),

          // Main View
          Expanded(
            child: BlocBuilder<TransitBloc, TransitState>(
              builder: (context, state) {
                final hub = state.hubs.firstWhere(
                  (h) => h.id == hubId,
                  orElse: () => state.hubs.first,
                );

                return CustomScrollView(
                  slivers: [
                    // Hub Header
                    SliverAppBar(
                      pinned: true,
                      backgroundColor: Colors.white,
                      title: Text('\${hub.name} - Franchisee Operations', style: const TextStyle(color: Colors.black87, fontWeight: FontWeight.bold)),
                      actions: [
                        Chip(
                          avatar: const CircleAvatar(backgroundColor: Colors.green, radius: 4),
                          label: const Text('System Operational (99.98%)'),
                        ),
                        const SizedBox(width: 16),
                      ],
                    ),

                    // Scoped Query Guard Banner
                    SliverToBoxAdapter(
                      child: Container(
                        margin: const EdgeInsets.all(24),
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(color: Colors.white, borderRadius: BorderRadius.circular(16), border: Border.all(color: Colors.black12)),
                        child: Row(
                          children: [
                            const Icon(Icons.shield, color: Color(0xFF0F4C5C)),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text('\${hub.name} (\${hub.code})', style: const TextStyle(fontWeight: FontWeight.bold)),
                                  const Text('Restricted routing matrix: Indore-Bhopal (NH-46) • Indore-Dewas Bypass', style: TextStyle(fontSize: 11, color: Colors.black54)),
                                ],
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),

                    // Route Corridors & P&L Margins
                    SliverPadding(
                      padding: const EdgeInsets.symmetric(horizontal: 24),
                      sliver: SliverToBoxAdapter(
                        child: Column(
                          children: state.corridors.map((corridor) => Card(
                            margin: const EdgeInsets.only(bottom: 12),
                            child: ListTile(
                              leading: const CircleAvatar(backgroundColor: Color(0xFF0F4C5C), child: Icon(Icons.directions_bus, color: Colors.white)),
                              title: Text('\${corridor.from} → \${corridor.to} (\${corridor.code})'),
                              subtitle: Text('\${corridor.distanceKm} km • \${corridor.activeBuses} Active Buses • \${corridor.occupancy}% Load'),
                              trailing: Text('₹\${corridor.franchiseShareAmount}\\n12% Share', textAlign: TextAlign.right, style: const TextStyle(fontWeight: FontWeight.bold, color: Colors.green)),
                            ),
                          )).toList(),
                        ),
                      ),
                    ),
                  ],
                );
              },
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildFranchiseeSidebar(BuildContext context) {
    return Container(
      width: 250,
      color: const Color(0xFF0A192F),
      child: Column(
        children: [
          Container(
            padding: const EdgeInsets.all(20),
            child: const Text('JUSTALO FRANCHISE OPS', style: TextStyle(color: Colors.white, fontWeight: FontWeight.bold)),
          ),
          ListTile(
            leading: const Icon(Icons.pie_chart, color: Colors.white),
            title: const Text('Franchisee P&L', style: TextStyle(color: Colors.white)),
            tileColor: const Color(0xFF00A896),
          ),
        ],
      ),
    );
  }
}`,

    pubspec: `# pubspec.yaml
name: justalo_transit_governance
description: "JUSTALO Super Admin & Franchisee Operations Flutter Application"
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter

  # State Management (BLoC Pattern)
  flutter_bloc: ^8.1.3
  equatable: ^2.0.5

  # Networking & Realtime WebSockets
  dio: ^5.4.0
  web_socket_channel: ^2.4.1

  # UI, Icons, Typography & Charts
  google_fonts: ^6.1.0
  fl_chart: ^0.66.0
  intl: ^0.19.0
  lucide_icons: ^0.257.0

dev_dependencies:
  flutter_test:
    sdk: flutter
  flutter_lints: ^3.0.0
  bloc_test: ^9.1.5
  mocktail: ^1.0.3

flutter:
  uses-material-design: true
`,
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(flutterCodeSnippets[activeFile]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadFile = () => {
    const filename =
      activeFile === 'bloc'
        ? 'transit_bloc.dart'
        : activeFile === 'events_states'
        ? 'transit_event_and_state.dart'
        : activeFile === 'models'
        ? 'transit_models.dart'
        : activeFile === 'admin_screen'
        ? 'super_admin_screen.dart'
        : activeFile === 'franchisee_screen'
        ? 'franchisee_screen.dart'
        : 'pubspec.yaml';

    const blob = new Blob([flutterCodeSnippets[activeFile]], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className="h-full bg-slate-950 text-slate-200 flex flex-col overflow-hidden">
      {/* Top Banner */}
      <div className="bg-slate-900 border-b border-slate-800 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white tracking-tight">
                  Flutter BLoC Architecture & Source Code Export
                </h2>
                <span className="px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-mono font-bold">
                  flutter_bloc: ^8.1.3
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">
                Ready-to-integrate Dart code implementing reactive event-driven state management for both dashboards.
              </p>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={handleCopyCode}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold transition border border-slate-700"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span className="text-emerald-400">Copied to Clipboard!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Current File</span>
              </>
            )}
          </button>
          <button
            onClick={handleDownloadFile}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#00a896] hover:bg-[#008f80] text-white text-xs font-bold transition shadow-md"
          >
            <Download className="w-4 h-4" />
            <span>Download .dart</span>
          </button>
        </div>
      </div>

      {/* File Navigation Tabs */}
      <div className="bg-slate-900/60 border-b border-slate-800 px-6 flex items-center gap-2 overflow-x-auto">
        {[
          { key: 'bloc', label: 'transit_bloc.dart', icon: Terminal },
          { key: 'events_states', label: 'transit_event & state.dart', icon: Layers },
          { key: 'models', label: 'transit_models.dart', icon: FileCode },
          { key: 'admin_screen', label: 'super_admin_screen.dart', icon: Code2 },
          { key: 'franchisee_screen', label: 'franchisee_screen.dart', icon: Code2 },
          { key: 'pubspec', label: 'pubspec.yaml', icon: FileCode },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeFile === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveFile(tab.key as any)}
              className={`flex items-center gap-2 py-3 px-4 text-xs font-semibold border-b-2 transition whitespace-nowrap ${
                isActive
                  ? 'border-cyan-400 text-cyan-300 bg-slate-800/50'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Code Editor Window */}
      <div className="flex-1 p-6 overflow-hidden flex flex-col">
        <div className="flex-1 bg-slate-950 rounded-2xl border border-slate-800 p-4 overflow-y-auto font-mono text-xs leading-relaxed text-slate-300">
          <pre className="selection:bg-cyan-900 selection:text-white">
            <code>{flutterCodeSnippets[activeFile]}</code>
          </pre>
        </div>

        {/* Integration Architecture Tips */}
        <div className="mt-4 p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>
              <strong>BLoC Integration Guide:</strong> Wrap your <code className="text-cyan-300 bg-slate-800 px-1 py-0.5 rounded">MaterialApp</code> with <code className="text-cyan-300 bg-slate-800 px-1 py-0.5 rounded">BlocProvider(create: (_) =&gt; TransitBloc(repository: ...))</code> for reactive zero-rebuild performance across all devices.
            </span>
          </div>
          <span className="font-mono text-[11px] text-slate-500 shrink-0">Dart SDK 3.0+ &bull; Equatable 2.0</span>
        </div>
      </div>
    </div>
  );
};

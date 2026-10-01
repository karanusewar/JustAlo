import React, { useState } from 'react';
import {
  Code2,
  Copy,
  Check,
  Download,
  X,
  Smartphone,
  Layers,
  Terminal,
  FileCode,
} from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const FlutterCodeBottomSheet: React.FC<Props> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<'main' | 'bloc' | 'models' | 'screens' | 'pubspec'>('main');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const flutterSnippets = {
    main: `// lib/main.dart
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'blocs/transit_bloc.dart';
import 'repositories/transit_repository.dart';
import 'screens/mobile_shell_screen.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const JustaloTransitApp());
}

class JustaloTransitApp extends StatelessWidget {
  const JustaloTransitApp({super.key});

  @override
  Widget build(BuildContext context) {
    return RepositoryProvider(
      create: (context) => TransitRepository(),
      child: BlocProvider(
        create: (context) => TransitBloc(
          repository: context.read<TransitRepository>(),
        )..add(const LoadTransitPlatformEvent()),
        child: MaterialApp(
          title: 'JUSTALO Transit Mobility',
          debugShowCheckedModeBanner: false,
          theme: ThemeData(
            useMaterial3: true,
            colorScheme: ColorScheme.fromSeed(
              seedColor: const Color(0xFF00A896),
              primary: const Color(0xFF00A896),
            ),
            scaffoldBackgroundColor: const Color(0xFFF4F7F9),
          ),
          home: const MobileShellScreen(),
        ),
      ),
    );
  }
}`,

    bloc: `// lib/blocs/transit_bloc.dart
import 'dart:async';
import 'package:flutter_bloc/flutter_bloc.dart';
import 'package:equatable/equatable.dart';
import '../models/transit_models.dart';
import '../repositories/transit_repository.dart';

// EVENTS
abstract class TransitEvent extends Equatable {
  const TransitEvent();
  @override
  List<Object?> get props => [];
}

class LoadTransitPlatformEvent extends TransitEvent {
  const LoadTransitPlatformEvent();
}

class UpdatePlatformRulesEvent extends TransitEvent {
  final PlatformRules rules;
  const UpdatePlatformRulesEvent(this.rules);
}

class ApproveKycVendorEvent extends TransitEvent {
  final String vendorId;
  const ApproveKycVendorEvent(this.vendorId);
}

// STATE
class TransitState extends Equatable {
  final List<FranchiseeHub> hubs;
  final List<RouteCorridor> corridors;
  final List<VendorKYC> kycVendors;
  final PlatformRules rules;
  final int grossGmvToday;
  final int activeFleetCount;

  const TransitState({
    required this.hubs,
    required this.corridors,
    required this.kycVendors,
    required this.rules,
    required this.grossGmvToday,
    required this.activeFleetCount,
  });

  @override
  List<Object?> get props => [hubs, corridors, kycVendors, rules, grossGmvToday, activeFleetCount];
}

// BLOC
class TransitBloc extends Bloc<TransitEvent, TransitState> {
  final TransitRepository repository;

  TransitBloc({required this.repository}) : super(TransitState.initial()) {
    on<LoadTransitPlatformEvent>((event, emit) async {
      final data = await repository.fetchInitialData();
      emit(data);
    });

    on<ApproveKycVendorEvent>((event, emit) {
      final updatedKyc = state.kycVendors.map((v) {
        if (v.id == event.vendorId) return v.copyWith(status: KycStatus.approved);
        return v;
      }).toList();
      emit(state.copyWith(kycVendors: updatedKyc));
    });
  }
}`,

    models: `// lib/models/transit_models.dart
import 'package:equatable/equatable.dart';

class FranchiseeHub extends Equatable {
  final String id;
  final String code;
  final String name;
  final int liveBuses;
  final int todayGmv;
  final double avgOccupancy;
  final int hubShareAmount;
  final double contractRate;
  final String statusLabel;

  const FranchiseeHub({
    required this.id,
    required this.code,
    required this.name,
    required this.liveBuses,
    required this.todayGmv,
    required this.avgOccupancy,
    required this.hubShareAmount,
    required this.contractRate,
    required this.statusLabel,
  });

  @override
  List<Object?> get props => [id, code, name, liveBuses, todayGmv, contractRate];
}

class RouteCorridor extends Equatable {
  final String id;
  final String from;
  final String to;
  final String code;
  final int distanceKm;
  final int activeBuses;
  final int occupancy;
  final int grossGmv;
  final int franchiseShareAmount;

  const RouteCorridor({
    required this.id,
    required this.from,
    required this.to,
    required this.code,
    required this.distanceKm,
    required this.activeBuses,
    required this.occupancy,
    required this.grossGmv,
    required this.franchiseShareAmount,
  });

  @override
  List<Object?> get props => [id, code, from, to, occupancy];
}`,

    screens: `// lib/screens/mobile_shell_screen.dart
import 'package:flutter/material.dart';
import 'package:flutter_bloc/flutter_bloc.dart';
import '../blocs/transit_bloc.dart';
import 'views/super_admin_view.dart';
import 'views/franchisee_view.dart';

class MobileShellScreen extends StatefulWidget {
  const MobileShellScreen({super.key});

  @override
  State<MobileShellScreen> createState() => _MobileShellScreenState();
}

class _MobileShellScreenState extends State<MobileShellScreen> {
  int _roleIndex = 0; // 0: Super Admin, 1: Franchisee
  int _navIndex = 0;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0.5,
        title: Row(
          children: [
            // JUSTALO Logo
            Image.asset('assets/images/project_logo.png', height: 32),
            const SizedBox(width: 8),
            const Text(
              'JUSTALO',
              style: TextStyle(fontWeight: FontWeight.w900, fontSize: 16, color: Colors.black87),
            ),
          ],
        ),
        actions: [
          // Role switch segmented pill
          SegmentedButton<int>(
            segments: const [
              ButtonSegment(value: 0, label: Text('Super Admin', style: TextStyle(fontSize: 10))),
              ButtonSegment(value: 1, label: Text('Franchisee', style: TextStyle(fontSize: 10))),
            ],
            selected: {_roleIndex},
            onSelectionChanged: (set) => setState(() => _roleIndex = set.first),
          ),
          const SizedBox(width: 12),
        ],
      ),
      body: _roleIndex == 0
          ? SuperAdminView(tabIndex: _navIndex)
          : FranchiseeView(tabIndex: _navIndex),
      bottomNavigationBar: BottomNavigationBar(
        currentIndex: _navIndex,
        selectedItemColor: const Color(0xFF00A896),
        unselectedItemColor: Colors.grey,
        onTap: (i) => setState(() => _navIndex = i),
        items: _roleIndex == 0
            ? const [
                BottomNavigationBarItem(icon: Icon(Icons.dashboard), label: 'Governance'),
                BottomNavigationBarItem(icon: Icon(Icons.verified_user), label: 'KYC Audit'),
                BottomNavigationBarItem(icon: Icon(Icons.tune), label: 'Rules'),
                BottomNavigationBarItem(icon: Icon(Icons.history), label: 'Audit'),
              ]
            : const [
                BottomNavigationBarItem(icon: Icon(Icons.speed), label: 'Operations'),
                BottomNavigationBarItem(icon: Icon(Icons.alt_route), label: 'Routes'),
                BottomNavigationBarItem(icon: Icon(Icons.show_chart), label: 'Demand'),
                BottomNavigationBarItem(icon: Icon(Icons.directions_bus), label: 'Rentals'),
              ],
      ),
    );
  }
}`,

    pubspec: `# pubspec.yaml
name: justalo_transit
description: "JUSTALO Super Admin & Franchisee Mobile Transit App"
publish_to: 'none'
version: 1.0.0+1

environment:
  sdk: '>=3.0.0 <4.0.0'

dependencies:
  flutter:
    sdk: flutter
  flutter_bloc: ^8.1.3
  equatable: ^2.0.5
  dio: ^5.4.0
  google_fonts: ^6.1.0
  fl_chart: ^0.66.0
  google_maps_flutter: ^2.5.0

flutter:
  uses-material-design: true
  assets:
    - assets/images/project_logo.png
`,
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(flutterSnippets[activeTab]);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-950 rounded-t-3xl sm:rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-800 text-slate-200 max-h-[88vh] flex flex-col">
        {/* Mobile Drag Indicator */}
        <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto my-2 sm:hidden shrink-0" />

        {/* Header */}
        <div className="bg-slate-900 px-5 py-3 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-cyan-500/20 text-cyan-400 rounded-lg">
              <Smartphone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-sm">Flutter (Dart) Integration Code</h3>
              <p className="text-[10px] text-slate-400">Copy & paste directly into your Flutter project</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-1 px-4 py-2 bg-slate-900/60 border-b border-slate-800 overflow-x-auto shrink-0 text-xs">
          {[
            { key: 'main', label: 'main.dart' },
            { key: 'bloc', label: 'transit_bloc.dart' },
            { key: 'models', label: 'transit_models.dart' },
            { key: 'screens', label: 'mobile_shell.dart' },
            { key: 'pubspec', label: 'pubspec.yaml' },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-3 py-1.5 rounded-lg font-mono font-semibold transition whitespace-nowrap ${
                activeTab === tab.key
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Code Content */}
        <div className="p-4 flex-1 overflow-y-auto font-mono text-xs text-slate-300 leading-relaxed bg-slate-950">
          <pre>
            <code>{flutterSnippets[activeTab]}</code>
          </pre>
        </div>

        {/* Action Footer */}
        <div className="bg-slate-900 px-5 py-3 border-t border-slate-800 flex items-center justify-between text-xs shrink-0">
          <span className="text-[11px] text-slate-400 font-mono">
            State Management: flutter_bloc ^8.1.3
          </span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[#00a896] hover:bg-[#008f80] text-white font-bold text-xs transition shadow-sm"
          >
            {copied ? (
              <>
                <Check className="w-4 h-4" />
                <span>Copied Dart Code!</span>
              </>
            ) : (
              <>
                <Copy className="w-4 h-4" />
                <span>Copy Current File</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

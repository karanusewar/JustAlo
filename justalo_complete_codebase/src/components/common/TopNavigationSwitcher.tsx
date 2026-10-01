import React from 'react';
import {
  ShieldAlert,
  Building2,
  Code2,
  Monitor,
  Tablet,
  Smartphone,
  Radio,
  Play,
  Pause,
} from 'lucide-react';
import { useTransitBloc } from '../../state/blocStore';

export type DashboardView = 'superadmin' | 'franchisee' | 'flutter_bloc';
export type ViewportMode = 'responsive' | 'tablet' | 'mobile';

interface Props {
  activeView: DashboardView;
  setActiveView: (view: DashboardView) => void;
  viewportMode: ViewportMode;
  setViewportMode: (mode: ViewportMode) => void;
}

export const TopNavigationSwitcher: React.FC<Props> = ({
  activeView,
  setActiveView,
  viewportMode,
  setViewportMode,
}) => {
  const { state, dispatch } = useTransitBloc();

  return (
    <div className="bg-slate-900 border-b border-slate-800 text-white px-3 sm:px-6 py-2 select-none z-40 sticky top-0">
      <div className="flex flex-wrap items-center justify-between gap-3 max-w-[1920px] mx-auto">
        {/* Left: View Switcher Segmented Control */}
        <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-xl border border-slate-800">
          {/* Super Admin */}
          <button
            onClick={() => setActiveView('superadmin')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              activeView === 'superadmin'
                ? 'bg-[#00a896] text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>Super Admin Console</span>
          </button>

          {/* Franchisee Ops */}
          <button
            onClick={() => setActiveView('franchisee')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              activeView === 'franchisee'
                ? 'bg-[#00a896] text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Building2 className="w-3.5 h-3.5" />
            <span>Franchisee Ops (Indore Hub)</span>
          </button>

          {/* Flutter BLoC Code */}
          <button
            onClick={() => setActiveView('flutter_bloc')}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-bold transition ${
              activeView === 'flutter_bloc'
                ? 'bg-cyan-600 text-white shadow-xs'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            <Code2 className="w-3.5 h-3.5 text-cyan-300" />
            <span>Flutter BLoC Code</span>
            <span className="text-[9px] bg-cyan-400/20 text-cyan-300 px-1 rounded uppercase font-mono">
              Export
            </span>
          </button>
        </div>

        {/* Right: Viewport Simulator & Live Stream Controller */}
        <div className="flex items-center gap-3">
          {/* Live Sim Toggle */}
          <button
            onClick={() => dispatch({ type: 'TOGGLE_LIVE_STREAM' })}
            className={`hidden sm:flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-bold border transition ${
              state.isTelemetryLiveSync
                ? 'bg-emerald-950/60 border-emerald-500/40 text-emerald-400'
                : 'bg-slate-800 border-slate-700 text-slate-400'
            }`}
          >
            {state.isTelemetryLiveSync ? (
              <>
                <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>Live GPS Sim: Active</span>
              </>
            ) : (
              <>
                <Pause className="w-3 h-3 text-slate-400" />
                <span>GPS Sim: Paused</span>
              </>
            )}
          </button>

          {/* Responsive Viewport Simulator */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              title="Full Responsive"
              onClick={() => setViewportMode('responsive')}
              className={`p-1.5 rounded-lg transition ${
                viewportMode === 'responsive'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
            </button>
            <button
              title="Tablet View (768px)"
              onClick={() => setViewportMode('tablet')}
              className={`p-1.5 rounded-lg transition ${
                viewportMode === 'tablet'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" />
            </button>
            <button
              title="Mobile Device (390px)"
              onClick={() => setViewportMode('mobile')}
              className={`p-1.5 rounded-lg transition ${
                viewportMode === 'mobile'
                  ? 'bg-slate-800 text-white'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

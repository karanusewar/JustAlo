import React from 'react';
import { Bus, Package, RotateCcw, Send, Radio } from 'lucide-react';
import { useTransitBloc } from '../../state/blocStore';

export const LiveOperationalFeed: React.FC = () => {
  const { state } = useTransitBloc();

  const getFeedIcon = (category: string) => {
    switch (category) {
      case 'bus':
        return <Bus className="w-4 h-4 text-teal-700" />;
      case 'parcel':
        return <Package className="w-4 h-4 text-emerald-700" />;
      case 'refund':
        return <RotateCcw className="w-4 h-4 text-rose-600" />;
      default:
        return <Send className="w-4 h-4 text-cyan-700" />;
    }
  };

  const getFeedBg = (category: string) => {
    switch (category) {
      case 'bus':
        return 'bg-teal-50 border-teal-200';
      case 'parcel':
        return 'bg-emerald-50 border-emerald-200';
      case 'refund':
        return 'bg-rose-50 border-rose-200';
      default:
        return 'bg-cyan-50 border-cyan-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
          <h3 className="font-extrabold text-slate-900 text-sm">
            Live Operational Feed
          </h3>
        </div>
        <span className="text-[10px] text-slate-400 font-semibold tracking-wide uppercase">
          Realtime Bus & Consignment Ping
        </span>
      </div>

      {/* Feed list */}
      <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
        {state.telemetryFeed.map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:bg-slate-50 transition"
          >
            <div
              className={`p-2 rounded-lg border shrink-0 mt-0.5 ${getFeedBg(
                item.category
              )}`}
            >
              {getFeedIcon(item.category)}
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <span className="font-bold text-slate-900 text-xs truncate">
                  {item.title}
                </span>
                <span className="font-mono text-[10px] text-slate-400 shrink-0">
                  {item.timeAgo}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5 leading-snug line-clamp-2">
                {item.detail}
              </p>
              {item.badge && (
                <span className="inline-block mt-1 text-[9px] font-bold text-teal-800 bg-teal-50 px-1.5 py-0.5 rounded border border-teal-200">
                  {item.badge}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

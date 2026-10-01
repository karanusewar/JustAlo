import React from 'react';
import {
  History,
  CheckCircle,
  CreditCard,
  TrendingUp,
  MapPin,
  Sliders,
  AlertTriangle,
  Radio,
} from 'lucide-react';
import { SystemAuditItem } from '../../types';
import { useTransitBloc } from '../../state/blocStore';

export const SystemAuditLog: React.FC = () => {
  const { state } = useTransitBloc();

  const getIcon = (type: SystemAuditItem['iconType']) => {
    switch (type) {
      case 'check':
        return <CheckCircle className="w-4 h-4 text-emerald-600" />;
      case 'payment':
        return <CreditCard className="w-4 h-4 text-cyan-600" />;
      case 'surge':
        return <TrendingUp className="w-4 h-4 text-rose-500" />;
      case 'stoppage':
        return <MapPin className="w-4 h-4 text-teal-600" />;
      case 'rules':
        return <Sliders className="w-4 h-4 text-indigo-600" />;
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-red-600" />;
      default:
        return <History className="w-4 h-4 text-slate-500" />;
    }
  };

  const getIconBg = (type: SystemAuditItem['iconType']) => {
    switch (type) {
      case 'check':
        return 'bg-emerald-50 border-emerald-200';
      case 'payment':
        return 'bg-cyan-50 border-cyan-200';
      case 'surge':
        return 'bg-rose-50 border-rose-200';
      case 'stoppage':
        return 'bg-teal-50 border-teal-200';
      case 'rules':
        return 'bg-indigo-50 border-indigo-200';
      case 'alert':
        return 'bg-red-50 border-red-200';
      default:
        return 'bg-slate-50 border-slate-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <History className="w-5 h-5 text-teal-700" />
          <h3 className="font-extrabold text-slate-900 text-base">
            Platform Immutable System Audit Log
          </h3>
        </div>

        <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Listening to WebSocket Event Stream</span>
        </div>
      </div>

      <div className="space-y-3 max-h-[300px] overflow-y-auto pr-1">
        {state.auditLogs.map((log) => (
          <div
            key={log.id}
            className="flex items-start justify-between gap-3 p-3 rounded-xl bg-slate-50/70 border border-slate-200/80 hover:bg-slate-50 transition"
          >
            <div className="flex items-start gap-3">
              <div
                className={`p-2 rounded-lg border shrink-0 mt-0.5 ${getIconBg(
                  log.iconType
                )}`}
              >
                {getIcon(log.iconType)}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-xs">{log.title}</h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-relaxed">
                  {log.detail}
                </p>
              </div>
            </div>

            <div className="text-right shrink-0">
              <span className="font-mono text-[11px] font-bold text-slate-500">
                {log.timestamp}
              </span>
              {log.hashSignature && (
                <div className="text-[9px] font-mono text-slate-400 mt-0.5">
                  {log.hashSignature}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

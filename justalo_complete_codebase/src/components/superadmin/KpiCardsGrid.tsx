import React from 'react';
import {
  Wallet,
  Bus,
  Network,
  ShieldCheck,
  Receipt,
  ShieldAlert,
  TrendingUp,
} from 'lucide-react';
import { useTransitBloc } from '../../state/blocStore';

export const KpiCardsGrid: React.FC = () => {
  const { state } = useTransitBloc();

  const cards = [
    {
      title: 'GROSS GMV (TODAY)',
      value: `₹${state.totalGrossGmv.toLocaleString('en-IN')}`,
      trend: '+14.2% DoD vs Yesterday',
      trendPositive: true,
      subtext: null,
      icon: Wallet,
      iconBg: 'bg-emerald-50 text-emerald-700',
    },
    {
      title: 'ACTIVE FLEET LIVE',
      value: `${state.activeFleetCount}`,
      unit: 'Buses Tracking',
      subtext: '98.6% On-Schedule Telematics',
      subtextBullet: 'bg-emerald-500',
      icon: Bus,
      iconBg: 'bg-cyan-50 text-cyan-700',
    },
    {
      title: 'FRANCHISEE NODES',
      value: `${state.hubs.length} Regional`,
      unit: 'Hubs',
      subtext: 'Indore, Bhopal, Ujjain, Jabalpur...',
      icon: Network,
      iconBg: 'bg-blue-50 text-blue-700',
    },
    {
      title: 'VERIFIED FLEET VENDORS',
      value: '128',
      unit: 'Operators',
      subtext: 'Chartered, Hans, Bagdi, +125',
      icon: ShieldCheck,
      iconBg: 'bg-teal-50 text-teal-700',
    },
    {
      title: 'CONVENIENCE REVENUE',
      value: `₹${state.convenienceRevenue.toLocaleString('en-IN')}`,
      subtext: `Platform Take: Fixed ₹${state.rules.adminConvenienceFee}/seat`,
      icon: Receipt,
      iconBg: 'bg-indigo-50 text-indigo-700',
    },
    {
      title: 'FLEET SOS & SECURITY',
      value: `${state.activeSosAlerts}`,
      unit: 'Active',
      alertsLabel: 'Alerts',
      subtext: 'Socket Pings 99.98% • Latency <40ms',
      icon: ShieldAlert,
      iconBg: state.activeSosAlerts > 0 ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-700',
      isAlert: state.activeSosAlerts > 0,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden group"
          >
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                {card.title}
              </span>
              <div className={`p-2 rounded-xl ${card.iconBg}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-3">
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                  {card.value}
                </span>
                {card.unit && (
                  <span className="text-xs font-semibold text-slate-600">{card.unit}</span>
                )}
                {card.alertsLabel && (
                  <span className="text-xs font-bold text-slate-500">{card.alertsLabel}</span>
                )}
              </div>

              {card.trend && (
                <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{card.trend}</span>
                </div>
              )}

              {card.subtext && (
                <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500 truncate">
                  {card.subtextBullet && (
                    <span className={`w-1.5 h-1.5 rounded-full ${card.subtextBullet} shrink-0`} />
                  )}
                  <span className="truncate">{card.subtext}</span>
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

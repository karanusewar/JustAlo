import React from 'react';
import {
  Wallet,
  TrendingUp,
  Armchair,
  Package,
  Car,
  RotateCcw,
  Clock,
} from 'lucide-react';
import { useTransitBloc } from '../../state/blocStore';

export const FranchiseeKpis: React.FC = () => {
  const { state } = useTransitBloc();
  const indoreHub = state.hubs.find((h) => h.id === 'hub-ind-01') || state.hubs[0];

  const cards = [
    {
      title: 'GROSS REVENUE',
      value: `₹${indoreHub.todayGmv.toLocaleString('en-IN')}`,
      trend: `+${indoreHub.dodGrowth}% vs last month`,
      trendPositive: true,
      icon: Wallet,
      iconColor: 'text-emerald-700 bg-emerald-50',
    },
    {
      title: 'NET P&L MARGIN',
      value: `₹${indoreHub.hubShareAmount.toLocaleString('en-IN')}`,
      subtext: `${indoreHub.contractRate.toFixed(1)}% Franchise Share`,
      subtextColor: 'text-emerald-700',
      icon: TrendingUp,
      iconColor: 'text-emerald-700 bg-emerald-50',
    },
    {
      title: 'BUS OCCUPANCY',
      value: `${indoreHub.avgOccupancy}%`,
      subtext: '124 daily departures',
      icon: Armchair,
      iconColor: 'text-cyan-700 bg-cyan-50',
    },
    {
      title: 'PARCEL EXPRESS',
      value: '₹1,42,800',
      subtext: '1,120 consignments',
      icon: Package,
      iconColor: 'text-teal-700 bg-teal-50',
    },
    {
      title: 'VEHICLE RENTALS',
      value: '₹3,24,000',
      subtext: '18 Fleet Bookings',
      icon: Car,
      iconColor: 'text-blue-700 bg-blue-50',
    },
    {
      title: 'REFUNDS PAID',
      value: `₹${state.totalRefundsPaid.toLocaleString('en-IN')}`,
      subtext: `\u2264${state.rules.universalRefundCutoffMinutes}-min policy rule`,
      subtextColor: 'text-slate-500',
      isRefund: true,
      icon: RotateCcw,
      iconColor: 'text-rose-700 bg-rose-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-2xl p-4 border border-slate-200 shadow-xs hover:shadow-md transition-shadow relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <span className="text-[11px] font-bold tracking-wider text-slate-500 uppercase">
                {card.title}
              </span>
              <div className={`p-2 rounded-xl ${card.iconColor}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>

            <div className="mt-3">
              <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {card.value}
              </div>

              {card.trend && (
                <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
                  <TrendingUp className="w-3.5 h-3.5" />
                  <span>{card.trend}</span>
                </div>
              )}

              {card.subtext && (
                <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500">
                  {card.title === 'NET P&L MARGIN' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                  )}
                  {card.title === 'BUS OCCUPANCY' && (
                    <Clock className="w-3 h-3 text-slate-400" />
                  )}
                  {card.title === 'PARCEL EXPRESS' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-teal-500 shrink-0" />
                  )}
                  {card.title === 'VEHICLE RENTALS' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 shrink-0" />
                  )}
                  {card.isRefund && (
                    <Clock className="w-3 h-3 text-slate-400" />
                  )}
                  <span className={card.subtextColor || 'text-slate-600'}>
                    {card.subtext}
                  </span>
                </div>
              )}
            </div>

            {card.isRefund && (
              <div className="mt-3 w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-rose-500 w-[45%] rounded-full"></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';
import { useTransitBloc } from '../../state/blocStore';

export const FranchiseeBanner: React.FC = () => {
  const { state, dispatch } = useTransitBloc();

  return (
    <div className="bg-white border-b border-slate-200 px-4 sm:px-6 py-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Left: Hub Title & Query Guard */}
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-50 border border-teal-200 text-teal-800 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-5 h-5 text-teal-700" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-lg sm:text-xl font-extrabold text-slate-900 tracking-tight">
                Indore Metropolitan Franchise
              </h1>
              <span className="px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 font-mono font-bold text-xs">
                FR-IND-01
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Scoped Query Guard: ACTIVE</span>
              </span>
            </div>

            <p className="text-xs text-slate-500 mt-1">
              <span className="font-semibold text-slate-700">Restricted routing matrix:</span>{' '}
              Indore-Bhopal (NH-46) &bull; Indore-Dewas Bypass &bull; Indore-Pithampur SEZ &bull; Indore-Ujjain Pilgrimage
            </p>
          </div>
        </div>

        {/* Right: Daily / Weekly Switch */}
        <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 self-start md:self-auto">
          <button
            onClick={() => dispatch({ type: 'SET_TIME_FILTER', payload: 'daily' })}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              state.timeFilter === 'daily'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Daily
          </button>
          <button
            onClick={() => dispatch({ type: 'SET_TIME_FILTER', payload: 'weekly' })}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${
              state.timeFilter === 'weekly'
                ? 'bg-white text-slate-900 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Weekly
          </button>
        </div>
      </div>
    </div>
  );
};

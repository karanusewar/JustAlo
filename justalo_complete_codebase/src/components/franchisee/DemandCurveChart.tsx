import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export const DemandCurveChart: React.FC = () => {
  const [activeSlot, setActiveSlot] = useState<string | null>(null);

  const timeSlots = [
    { time: '06:00', bhopal: 72, ujjain: 88, pithampur: 96, label: 'Shift Start' },
    { time: '10:00', bhopal: 85, ujjain: 94, pithampur: 92, label: 'Morning Peak' },
    { time: '14:00', bhopal: 64, ujjain: 78, pithampur: 68, label: 'Midday Transit' },
    { time: '18:00', bhopal: 91, ujjain: 96, pithampur: 95, label: 'Evening Peak' },
    { time: '22:00', bhopal: 76, ujjain: 68, pithampur: 52, label: 'Night Sleepers' },
  ];

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6">
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        {/* Left Information */}
        <div className="max-w-md">
          <div className="flex items-center gap-1.5 text-[11px] font-bold tracking-wider uppercase text-slate-500">
            <TrendingUp className="w-3.5 h-3.5 text-teal-600" />
            <span>Demand Curve Insights</span>
          </div>

          <h3 className="text-lg font-extrabold text-slate-900 mt-1">
            Peak Slot Utilization
          </h3>

          <p className="text-xs text-slate-500 mt-1 leading-relaxed">
            Morning shifts (07:30 - 10:00) on the Ujjain & Pithampur corridors operate at{' '}
            <strong className="text-slate-900 font-bold">94.6% max capacity</strong> with instant seat turnaround.
          </p>

          {/* Legend */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#0f4c5c]"></span>
              <span className="text-slate-700">Intercity (Bhopal)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
              <span className="text-slate-700">Pilgrimage (Ujjain)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-500"></span>
              <span className="text-slate-700">Shuttle (Pithampur)</span>
            </div>
          </div>
        </div>

        {/* Right SVG Chart */}
        <div className="w-full lg:w-96 shrink-0 relative bg-slate-50/70 p-3 rounded-2xl border border-slate-100">
          <svg viewBox="0 0 400 160" className="w-full h-36 overflow-visible">
            <defs>
              <linearGradient id="curveGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0f4c5c" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#0f4c5c" stopOpacity="0.0" />
              </linearGradient>
              <linearGradient id="ujjainGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
                <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
              </linearGradient>
            </defs>

            {/* Grid Lines */}
            <line x1="20" y1="20" x2="380" y2="20" stroke="#e2e8f0" strokeDasharray="3 3" />
            <line x1="20" y1="70" x2="380" y2="70" stroke="#e2e8f0" strokeDasharray="3 3" />
            <line x1="20" y1="120" x2="380" y2="120" stroke="#e2e8f0" strokeDasharray="3 3" />

            {/* Area Path Ujjain */}
            <path
              d="M 30 120 Q 90 25, 120 30 T 210 90 T 300 20 T 370 110 L 370 140 L 30 140 Z"
              fill="url(#ujjainGradient)"
            />

            {/* Area Path Bhopal */}
            <path
              d="M 30 125 Q 90 50, 120 45 T 210 110 T 300 35 T 370 95 L 370 140 L 30 140 Z"
              fill="url(#curveGradient)"
            />

            {/* Stroke Lines */}
            <path
              d="M 30 125 Q 90 50, 120 45 T 210 110 T 300 35 T 370 95"
              fill="none"
              stroke="#0f4c5c"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M 30 120 Q 90 25, 120 30 T 210 90 T 300 20 T 370 110"
              fill="none"
              stroke="#10b981"
              strokeWidth="2.5"
              strokeDasharray="4 2"
              strokeLinecap="round"
            />
            <path
              d="M 30 130 Q 90 35, 120 40 T 210 100 T 300 30 T 370 125"
              fill="none"
              stroke="#06b6d4"
              strokeWidth="1.5"
              strokeLinecap="round"
            />

            {/* Interactive Data Points */}
            {[
              { cx: 30, cy: 125, label: '06:00' },
              { cx: 120, cy: 45, label: '10:00 (Peak)' },
              { cx: 210, cy: 110, label: '14:00' },
              { cx: 300, cy: 35, label: '18:00 (Peak)' },
              { cx: 370, cy: 95, label: '22:00' },
            ].map((pt, i) => (
              <g key={i}>
                <circle
                  cx={pt.cx}
                  cy={pt.cy}
                  r="4"
                  className="fill-[#0f4c5c] stroke-white stroke-2 cursor-pointer hover:r-6 transition-all"
                  onMouseEnter={() => setActiveSlot(pt.label)}
                  onMouseLeave={() => setActiveSlot(null)}
                />
              </g>
            ))}
          </svg>

          {/* Time Axis Labels */}
          <div className="flex justify-between text-[10px] font-mono font-bold text-slate-400 mt-2 px-1">
            <span>06:00</span>
            <span className="text-[#0f4c5c] font-bold">10:00 (Peak)</span>
            <span>14:00</span>
            <span className="text-emerald-700 font-bold">18:00 (Peak)</span>
            <span>22:00</span>
          </div>

          {activeSlot && (
            <div className="absolute top-2 right-2 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-md shadow-md">
              Slot: {activeSlot} &bull; Yield: 94.6%
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

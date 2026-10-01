import React from 'react';
import { Bus, PlusCircle, Car, CheckCircle2, Clock } from 'lucide-react';
import { useTransitBloc } from '../../state/blocStore';

interface Props {
  onOpenAssignModal: () => void;
}

export const TourRentalFleets: React.FC<Props> = ({ onOpenAssignModal }) => {
  const { state } = useTransitBloc();

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <Bus className="w-4 h-4 text-teal-600" />
          <h3 className="font-extrabold text-slate-900 text-sm">Tour & Rental Fleets</h3>
        </div>
      </div>

      <p className="text-[11px] text-slate-500 mb-4 leading-normal">
        Managed private charters, Ujjain Darshan pilgrimages & Pithampur OEM shift shuttles.
      </p>

      {/* Fleets list */}
      <div className="space-y-3">
        {state.rentalFleets.map((fleet) => {
          const isBooked = fleet.status === 'Booked';

          return (
            <div
              key={fleet.id}
              className="p-3 rounded-xl bg-slate-50/80 border border-slate-200/80 flex items-center justify-between gap-3 hover:bg-slate-50 transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-10 rounded-lg bg-slate-200 flex items-center justify-center shrink-0 overflow-hidden">
                  <Bus className="w-5 h-5 text-slate-600" />
                </div>
                <div>
                  <div className="font-extrabold text-slate-900 text-xs">
                    {fleet.name}
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5 truncate max-w-[150px]">
                    {fleet.bookingPurpose || fleet.category}
                  </div>
                </div>
              </div>

              <div className="text-right shrink-0">
                {isBooked ? (
                  <div className="font-extrabold text-slate-900 text-xs font-mono">
                    ₹{fleet.ratePerDay.toLocaleString('en-IN')}/day
                  </div>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    Standby
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Button */}
      <button
        onClick={onOpenAssignModal}
        className="w-full mt-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-bold transition flex items-center justify-center gap-2"
      >
        <PlusCircle className="w-4 h-4 text-teal-600" />
        <span>Assign New Rental Fleet</span>
      </button>
    </div>
  );
};

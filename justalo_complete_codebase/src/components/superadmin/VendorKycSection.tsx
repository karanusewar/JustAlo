import React from 'react';
import {
  FileCheck2,
  CheckCircle2,
  XCircle,
  FileText,
  Clock,
  ShieldCheck,
  Send,
  Bus,
} from 'lucide-react';
import { VendorKYC } from '../../types';
import { useTransitBloc } from '../../state/blocStore';
import confetti from 'canvas-confetti';

interface Props {
  onInspectVendor: (vendor: VendorKYC) => void;
}

export const VendorKycSection: React.FC<Props> = ({ onInspectVendor }) => {
  const { state, dispatch } = useTransitBloc();

  const pendingCount = state.kycVendors.filter(
    (v) => v.status === 'pending_master' || v.status === 'documents_cleared'
  ).length;

  const handleQuickApprove = (vendor: VendorKYC) => {
    dispatch({
      type: 'APPROVE_KYC',
      payload: { vendorId: vendor.id },
    });

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#0f4c5c', '#00a896', '#2ec4b6'],
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-5 sm:p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-teal-600" />
            <h3 className="font-extrabold text-slate-900 text-base">
              Vendor Onboarding & KYC Verification
            </h3>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Review statutory transport documentation, All-India permits, and fitness certs.
          </p>
        </div>

        {pendingCount > 0 && (
          <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-rose-100 text-rose-800 text-[11px] font-bold">
            {pendingCount} Pending Super Admin Clearance
          </span>
        )}
      </div>

      {/* Cards List */}
      <div className="space-y-4">
        {state.kycVendors.map((vendor) => {
          const isApproved = vendor.status === 'approved';
          const isPending = vendor.status === 'pending_master';

          return (
            <div
              key={vendor.id}
              className={`rounded-2xl border p-4 sm:p-5 transition ${
                isApproved
                  ? 'border-emerald-200 bg-emerald-50/20'
                  : 'border-slate-200 bg-slate-50/50 hover:border-slate-300'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-3">
                {/* Title & Metadata */}
                <div>
                  <div className="flex items-center gap-2.5 flex-wrap">
                    <h4 className="font-extrabold text-slate-900 text-sm">
                      {vendor.vendorName}
                    </h4>
                    <span className="px-2 py-0.5 rounded-md bg-slate-200 text-slate-700 text-[10px] font-bold">
                      Fleet Size: {vendor.fleetSize} Buses
                    </span>
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-slate-600">
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isApproved
                            ? 'bg-emerald-500'
                            : isPending
                            ? 'bg-rose-500 animate-pulse'
                            : 'bg-emerald-500'
                        }`}
                      ></span>
                      <span className={isPending ? 'text-rose-700 font-bold' : 'text-emerald-700'}>
                        {isApproved
                          ? 'Fleet Activated'
                          : isPending
                          ? 'Awaiting Master Approval'
                          : 'Documents Cleared'}
                      </span>
                    </span>
                  </div>

                  <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1.5">
                    <span>Submitted via {vendor.hubName}</span>
                    <span>•</span>
                    <Clock className="w-3 h-3 text-slate-400" />
                    <span>{vendor.submittedAgo}</span>
                  </p>
                </div>
              </div>

              {/* Badges Matrix */}
              <div className="mt-3.5 flex flex-wrap gap-2">
                {vendor.badges.map((badge, bIdx) => (
                  <span
                    key={bIdx}
                    className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-50 border border-emerald-200 text-[11px] font-semibold text-emerald-800"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{badge.label}</span>
                  </span>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-200/70 flex flex-wrap items-center justify-end gap-2.5">
                <button
                  onClick={() => onInspectVendor(vendor)}
                  className="px-3 py-1.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-semibold transition"
                >
                  Inspect Documents
                </button>

                {!isApproved && (
                  <>
                    <button
                      onClick={() => onInspectVendor(vendor)}
                      className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-700 bg-rose-50 hover:bg-rose-100 text-xs font-semibold transition"
                    >
                      Reject with Reason
                    </button>
                    <button
                      onClick={() => handleQuickApprove(vendor)}
                      className="px-4 py-1.5 rounded-xl bg-[#0f4c5c] hover:bg-[#0c3c49] text-white text-xs font-bold shadow-sm transition flex items-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>
                        {vendor.status === 'documents_cleared'
                          ? 'Dispatch Operating Authorization'
                          : 'Approve & Activate Fleet'}
                      </span>
                    </button>
                  </>
                )}

                {isApproved && (
                  <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" />
                    Permit Active in Indore Matrix
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

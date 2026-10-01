import React, { useState } from 'react';
import {
  FileCheck,
  X,
  CheckCircle2,
  XCircle,
  FileText,
  Calendar,
  AlertCircle,
  Bus,
} from 'lucide-react';
import { VendorKYC } from '../../types';
import { useTransitBloc } from '../../state/blocStore';
import { ASSETS } from '../../assets/assets';
import confetti from 'canvas-confetti';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  vendor: VendorKYC | null;
}

export const InspectKycModal: React.FC<Props> = ({ isOpen, onClose, vendor }) => {
  const { dispatch } = useTransitBloc();
  const [rejectReason, setRejectReason] = useState('');
  const [showRejectInput, setShowRejectInput] = useState(false);

  if (!isOpen || !vendor) return null;

  const handleApprove = () => {
    dispatch({
      type: 'APPROVE_KYC',
      payload: { vendorId: vendor.id },
    });

    confetti({
      particleCount: 60,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#059669', '#10B981', '#34D399'],
    });

    onClose();
  };

  const handleReject = () => {
    if (!rejectReason) {
      setShowRejectInput(true);
      return;
    }
    dispatch({
      type: 'REJECT_KYC',
      payload: {
        vendorId: vendor.id,
        reason: rejectReason,
      },
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col">
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto my-2 sm:hidden shrink-0" />
        <div className="bg-[#00a896] px-5 py-3.5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-white/10 rounded-lg">
              <FileCheck className="w-5 h-5 text-emerald-200" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight truncate max-w-[240px]">{vendor.vendorName}</h3>
              <p className="text-[11px] text-teal-100">
                Compliance Audit &bull; {vendor.hubName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 overflow-y-auto">
          {/* Vehicle Visual Header Card */}
          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-2xl border border-slate-200 overflow-hidden">
            <div className="w-20 h-16 rounded-xl overflow-hidden bg-slate-900 shrink-0 border border-slate-300">
              <img
                src={vendor.id === 'kyc-nar-01' ? ASSETS.luxuryCoach : ASSETS.executiveVan}
                alt={vendor.vendorName}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-1">
                <p className="text-xs font-black text-slate-900 truncate">{vendor.busTypeDescription}</p>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 shrink-0">
                  {vendor.status === 'approved' ? 'Approved' : 'Pending'}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Onboarding: <strong className="text-slate-800">{vendor.fleetSize} Buses</strong> &bull; RTO MP-09
              </p>
              <div className="mt-1 flex items-center gap-1 text-[10px] text-teal-700 font-semibold">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>AIS-140 Panic Button Ingestion Verified</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Statutory Documentation Verification Matrix
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {vendor.documents.map((doc, idx) => (
                <div
                  key={idx}
                  className="p-3 border border-slate-200 rounded-xl bg-white hover:border-teal-400 transition"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-teal-600" />
                      <span className="text-xs font-bold text-slate-800">{doc.type}</span>
                    </div>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-1.5 py-0.5 rounded">
                      VALID
                    </span>
                  </div>
                  <div className="mt-2 text-xs font-mono text-slate-600">
                    ID: <span className="font-semibold text-slate-900">{doc.docNumber}</span>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    <span>Expires: {doc.validTill}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {showRejectInput && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-xl space-y-2">
              <label className="block text-xs font-bold text-red-900">
                Specify Reason for Rejection / Clearance Hold:
              </label>
              <input
                type="text"
                placeholder="e.g. Vehicle fitness certificate renewal pending at RTO MP-09"
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                className="w-full text-xs p-2 rounded-lg border border-red-300 focus:outline-none focus:ring-1 focus:ring-red-500"
              />
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-slate-100">
            <div className="flex items-center gap-1.5 text-xs text-slate-500">
              <AlertCircle className="w-4 h-4 text-slate-400" />
              <span>AIS-140 GPS & Panic Button pre-tested on server socket</span>
            </div>
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={handleReject}
                className="px-4 py-2 text-xs font-semibold text-red-700 bg-red-50 hover:bg-red-100 rounded-lg transition border border-red-200 flex items-center gap-1.5"
              >
                <XCircle className="w-4 h-4" />
                {showRejectInput ? 'Confirm Rejection' : 'Reject with Reason'}
              </button>
              <button
                type="button"
                onClick={handleApprove}
                className="px-5 py-2 text-xs font-semibold text-white bg-emerald-700 hover:bg-emerald-800 active:bg-emerald-900 rounded-lg shadow-sm transition flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                Approve & Activate Fleet
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

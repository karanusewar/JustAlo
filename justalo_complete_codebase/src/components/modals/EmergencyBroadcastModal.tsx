import React, { useState } from 'react';
import { AlertTriangle, Send, X, ShieldAlert, Radio } from 'lucide-react';
import { useTransitBloc } from '../../state/blocStore';
import confetti from 'canvas-confetti';

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyBroadcastModal: React.FC<Props> = ({ isOpen, onClose }) => {
  const { dispatch } = useTransitBloc();
  const [title, setTitle] = useState('High Density Fleet Caution: Indore-Bhopal Highway');
  const [message, setMessage] = useState(
    'Dense fog advisory and heavy commercial convoy near Ashta toll. Speed governor enforced at 60 km/h. All active drivers must acknowledge via in-cabin telematics console.'
  );
  const [targetScope, setTargetScope] = useState<'all' | 'central_mp' | 'drivers_only' | 'passengers_only'>('all');
  const [severity, setSeverity] = useState<'critical' | 'high' | 'advisory'>('high');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch({
      type: 'DISPATCH_EMERGENCY',
      payload: {
        id: `sos-${Date.now()}`,
        title,
        message,
        targetScope,
        severity,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour12: false }) + ' IST',
        acknowledgedCount: 0,
        totalTargeted: targetScope === 'all' ? 342 : targetScope === 'central_mp' ? 146 : 82,
      },
    });

    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.6 },
      colors: ['#EF4444', '#DC2626', '#F87171'],
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-t-3xl sm:rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden border border-slate-200 max-h-[90vh] flex flex-col">
        {/* Mobile drag handle */}
        <div className="w-12 h-1.5 bg-slate-300 rounded-full mx-auto my-2 sm:hidden shrink-0" />
        
        <div className="bg-red-600 px-5 py-3.5 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 bg-white/20 rounded-lg">
              <ShieldAlert className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-base leading-tight">Master Emergency Broadcast</h3>
              <p className="text-[11px] text-red-100">Direct override push to telematics</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white/80 hover:text-white p-1 rounded-lg hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-3.5 overflow-y-auto">
          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Severity Level
            </label>
            <div className="grid grid-cols-3 gap-2">
              {(['advisory', 'high', 'critical'] as const).map((sev) => (
                <button
                  type="button"
                  key={sev}
                  onClick={() => setSeverity(sev)}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold uppercase tracking-wider border text-center transition ${
                    severity === sev
                      ? sev === 'critical'
                        ? 'bg-red-700 text-white border-red-700 shadow-sm'
                        : sev === 'high'
                        ? 'bg-amber-600 text-white border-amber-600 shadow-sm'
                        : 'bg-blue-600 text-white border-blue-600 shadow-sm'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {sev}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Target Audience & Telematics Scope
            </label>
            <select
              value={targetScope}
              onChange={(e) => setTargetScope(e.target.value as any)}
              className="w-full text-sm rounded-lg border-slate-300 py-2.5 px-3 bg-slate-50 border focus:bg-white focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              <option value="all">Platform-Wide (All 342 Buses + 5 Hubs + Passenger Apps)</option>
              <option value="central_mp">Indore & Bhopal Corridors Only (146 Buses)</option>
              <option value="drivers_only">On-Duty Drivers AIS-140 Cabin Units Only</option>
              <option value="passengers_only">Ticketed Passengers Active Trip Notification</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Broadcast Headline
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-sm rounded-lg border-slate-300 py-2 px-3 border focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
              Dispatch Message / Order
            </label>
            <textarea
              rows={3}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full text-sm rounded-lg border-slate-300 py-2 px-3 border focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            />
          </div>

          <div className="bg-red-50 border border-red-200 p-3 rounded-xl flex items-start gap-2.5">
            <Radio className="w-4 h-4 text-red-600 mt-0.5 shrink-0 animate-pulse" />
            <p className="text-xs text-red-700 leading-relaxed">
              <strong>Statutory Telematics Rule:</strong> Emergency broadcasts transmit over cellular IoT socket with audio chime in bus cabins. Driver must touch screen to confirm receipt.
            </p>
          </div>

          <div className="flex items-center justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm text-slate-600 hover:text-slate-800 font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Transmit Emergency Signal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

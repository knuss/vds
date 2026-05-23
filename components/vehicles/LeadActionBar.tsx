'use client';

import { useState } from 'react';
import LeadModal, { LeadType } from '@/components/leads/LeadModal';

interface LeadActionBarProps {
  vehicleId?: string;
  vehicleTitle?: string;
}

export default function LeadActionBar({ vehicleId, vehicleTitle }: LeadActionBarProps) {
  const [activeType, setActiveType] = useState<LeadType | null>(null);

  return (
    <>
      <div className="grid gap-3">
        <button
          type="button"
          onClick={() => setActiveType('inquiry')}
          className="rounded-full bg-slate-900 px-6 py-3 text-center text-sm font-semibold text-white"
        >
          Enquire Now
        </button>
        <button
          type="button"
          onClick={() => setActiveType('testDrive')}
          className="rounded-full border border-slate-300 px-6 py-3 text-center text-sm font-semibold text-slate-700"
        >
          Book Test Drive
        </button>
        <button
          type="button"
          onClick={() => setActiveType('tradeIn')}
          className="rounded-full border border-slate-300 px-6 py-3 text-center text-sm font-semibold text-slate-700"
        >
          Value My Trade-In
        </button>
      </div>

      {activeType && (
        <LeadModal
          type={activeType}
          open={Boolean(activeType)}
          onClose={() => setActiveType(null)}
          vehicleId={vehicleId}
          vehicleTitle={vehicleTitle}
        />
      )}
    </>
  );
}

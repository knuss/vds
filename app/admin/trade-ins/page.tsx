'use client';

import { useEffect, useState } from 'react';
import { collection, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

type TradeInStatus = 'new' | 'contacted' | 'valuation_sent' | 'appointment_booked' | 'purchased' | 'closed';

interface TradeInLead {
  id: string;
  name: string;
  phone: string;
  email: string;
  make?: string;
  model?: string;
  year?: string;
  mileage?: string;
  registration?: string;
  condition?: string;
  message?: string;
  status: TradeInStatus;
  createdAt: Date;
}

const STATUSES: TradeInStatus[] = ['new', 'contacted', 'valuation_sent', 'appointment_booked', 'purchased', 'closed'];

export default function TradeInLeadsPage() {
  const [leads, setLeads] = useState<TradeInLead[]>([]);
  const [selectedLead, setSelectedLead] = useState<TradeInLead | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeads();
  }, []);

  const fetchLeads = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'tradeInLeads'));
      const data = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
        createdAt: docSnap.data().createdAt?.toDate?.() || new Date(),
      })) as TradeInLead[];
      setLeads(data.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
    } catch (error) {
      console.error('Error fetching trade-in leads:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (leadId: string, status: TradeInStatus) => {
    try {
      await updateDoc(doc(db, 'tradeInLeads', leadId), { status });
      await fetchLeads();
      setSelectedLead(null);
    } catch (error) {
      console.error('Error updating lead:', error);
    }
  };

  const deleteLead = async (leadId: string) => {
    if (!window.confirm('Delete this trade-in lead?')) return;
    try {
      await deleteDoc(doc(db, 'tradeInLeads', leadId));
      await fetchLeads();
      setSelectedLead(null);
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
      <div className="lg:col-span-1">
        <h1 className="text-2xl font-bold mb-4">Trade-In Leads</h1>
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : leads.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600">No trade-in leads yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {leads.map((lead) => (
              <button
                key={lead.id}
                onClick={() => setSelectedLead(lead)}
                className={`w-full text-left p-4 rounded-lg transition ${
                  selectedLead?.id === lead.id
                    ? 'bg-blue-100 border-2 border-blue-600'
                    : lead.status === 'new'
                    ? 'bg-yellow-50 border border-yellow-200'
                    : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                <p className="font-semibold text-sm">{lead.name}</p>
                <p className="text-xs text-gray-600 truncate">{lead.email}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {lead.createdAt.toLocaleDateString()}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="lg:col-span-2">
        {selectedLead ? (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold">{selectedLead.name}</h2>
                <p className="text-gray-600">{selectedLead.email}</p>
                <p className="text-gray-600">{selectedLead.phone}</p>
              </div>
              <span className="px-3 py-1 rounded-full text-sm font-semibold bg-gray-100 text-gray-800">
                {selectedLead.status.replace('_', ' ')}
              </span>
            </div>

            <div className="space-y-2 text-sm text-gray-700">
              <p><strong>Vehicle:</strong> {selectedLead.make} {selectedLead.model}</p>
              <p><strong>Year:</strong> {selectedLead.year || 'Not provided'}</p>
              <p><strong>Mileage:</strong> {selectedLead.mileage || 'Not provided'}</p>
              <p><strong>Registration:</strong> {selectedLead.registration || 'Not provided'}</p>
              <p><strong>Condition:</strong> {selectedLead.condition || 'Not provided'}</p>
            </div>

            {selectedLead.message && (
              <div className="mt-4">
                <h3 className="font-semibold mb-2">Message</h3>
                <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedLead.message}</p>
              </div>
            )}

            <div className="mt-6 flex flex-wrap gap-2">
              {STATUSES.map((status) => (
                <button
                  key={status}
                  onClick={() => updateStatus(selectedLead.id, status)}
                  className="rounded-lg border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50"
                >
                  {status.replace('_', ' ')}
                </button>
              ))}
              <button
                onClick={() => deleteLead(selectedLead.id)}
                className="rounded-lg bg-red-600 px-4 py-2 text-sm text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center h-full flex items-center justify-center">
            <p className="text-gray-600">Select a lead to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}

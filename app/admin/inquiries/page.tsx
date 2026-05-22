'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { Inquiry } from '@/lib/types';

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'inquiries'));
      const inquiriesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      })) as Inquiry[];
      setInquiries(inquiriesData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
    } catch (error) {
      console.error('Error fetching inquiries:', error);
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (inquiryId: string) => {
    try {
      await updateDoc(doc(db, 'inquiries', inquiryId), {
        status: 'read',
      });
      fetchInquiries();
    } catch (error) {
      console.error('Error updating inquiry:', error);
    }
  };

  const deleteInquiry = async (inquiryId: string) => {
    if (window.confirm('Delete this inquiry?')) {
      try {
        await deleteDoc(doc(db, 'inquiries', inquiryId));
        fetchInquiries();
        setSelectedInquiry(null);
      } catch (error) {
        console.error('Error deleting inquiry:', error);
      }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Inquiries List */}
      <div className="lg:col-span-1">
        <h1 className="text-2xl font-bold mb-4">Inquiries</h1>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : inquiries.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600">No inquiries yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {inquiries.map((inquiry) => (
              <button
                key={inquiry.id}
                onClick={() => {
                  setSelectedInquiry(inquiry);
                  markAsRead(inquiry.id);
                }}
                className={`w-full text-left p-4 rounded-lg transition ${
                  selectedInquiry?.id === inquiry.id
                    ? 'bg-blue-100 border-2 border-blue-600'
                    : inquiry.status === 'new'
                    ? 'bg-yellow-50 border border-yellow-200'
                    : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                <p className="font-semibold text-sm">{inquiry.name}</p>
                <p className="text-xs text-gray-600 truncate">{inquiry.email}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {inquiry.createdAt.toLocaleDateString()}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Inquiry Details */}
      <div className="lg:col-span-2">
        {selectedInquiry ? (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold">{selectedInquiry.name}</h2>
                <p className="text-gray-600">{selectedInquiry.email}</p>
                <p className="text-gray-600">{selectedInquiry.phone}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  selectedInquiry.status === 'new'
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-green-100 text-green-800'
                }`}
              >
                {selectedInquiry.status.charAt(0).toUpperCase() + selectedInquiry.status.slice(1)}
              </span>
            </div>

            <div className="mb-6">
              <h3 className="font-semibold mb-2">Message</h3>
              <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedInquiry.message}</p>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600">
                Received: {selectedInquiry.createdAt.toLocaleString()}
              </p>
            </div>

            <div className="space-y-2">
              <p className="text-sm text-gray-600 mb-4">
                Vehicle ID: {selectedInquiry.vehicleId}
              </p>
              <button
                onClick={() => deleteInquiry(selectedInquiry.id)}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Delete Inquiry
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center h-full flex items-center justify-center">
            <p className="text-gray-600">Select an inquiry to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}

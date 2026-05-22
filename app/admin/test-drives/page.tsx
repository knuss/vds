'use client';

import { useEffect, useState } from 'react';
import { db } from '@/lib/firebase';
import { collection, getDocs, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import { TestDrive } from '@/lib/types';

export default function TestDrivesPage() {
  const [testDrives, setTestDrives] = useState<TestDrive[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBooking, setSelectedBooking] = useState<TestDrive | null>(null);

  useEffect(() => {
    fetchTestDrives();
  }, []);

  const fetchTestDrives = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'testDrives'));
      const testDrivesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate?.() || new Date(),
      })) as TestDrive[];
      setTestDrives(testDrivesData.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()));
    } catch (error) {
      console.error('Error fetching test drives:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (testDriveId: string, status: string) => {
    try {
      await updateDoc(doc(db, 'testDrives', testDriveId), {
        status,
      });
      fetchTestDrives();
      setSelectedBooking(null);
    } catch (error) {
      console.error('Error updating test drive:', error);
    }
  };

  const deleteTestDrive = async (testDriveId: string) => {
    if (window.confirm('Delete this test drive booking?')) {
      try {
        await deleteDoc(doc(db, 'testDrives', testDriveId));
        fetchTestDrives();
        setSelectedBooking(null);
      } catch (error) {
        console.error('Error deleting test drive:', error);
      }
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Test Drives List */}
      <div className="lg:col-span-1">
        <h1 className="text-2xl font-bold mb-4">Test Drive Bookings</h1>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : testDrives.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center">
            <p className="text-gray-600">No test drive bookings yet</p>
          </div>
        ) : (
          <div className="space-y-2">
            {testDrives.map((booking) => (
              <button
                key={booking.id}
                onClick={() => setSelectedBooking(booking)}
                className={`w-full text-left p-4 rounded-lg transition ${
                  selectedBooking?.id === booking.id
                    ? 'bg-blue-100 border-2 border-blue-600'
                    : booking.status === 'pending'
                    ? 'bg-yellow-50 border border-yellow-200'
                    : 'bg-gray-50 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                <p className="font-semibold text-sm">{booking.name}</p>
                <p className="text-xs text-gray-600">{booking.preferredDate}</p>
                <p className="text-xs text-gray-500 mt-1">
                  {booking.createdAt.toLocaleDateString()}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Booking Details */}
      <div className="lg:col-span-2">
        {selectedBooking ? (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-2xl font-bold">{selectedBooking.name}</h2>
                <p className="text-gray-600">{selectedBooking.email}</p>
                <p className="text-gray-600">{selectedBooking.phone}</p>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(
                  selectedBooking.status
                )}`}
              >
                {selectedBooking.status.charAt(0).toUpperCase() +
                  selectedBooking.status.slice(1)}
              </span>
            </div>

            <div className="mb-6 bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-3">Test Drive Details</h3>
              <div className="space-y-2">
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p className="font-semibold">{selectedBooking.preferredDate}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p className="font-semibold">{selectedBooking.preferredTime}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Vehicle ID</p>
                  <p className="font-semibold">{selectedBooking.vehicleId}</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm text-gray-600">
                Booked: {selectedBooking.createdAt.toLocaleString()}
              </p>
            </div>

            <div className="space-y-2">
              <div className="flex gap-2">
                <button
                  onClick={() => updateStatus(selectedBooking.id, 'confirmed')}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                >
                  Confirm
                </button>
                <button
                  onClick={() => updateStatus(selectedBooking.id, 'completed')}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Mark Complete
                </button>
              </div>
              <button
                onClick={() => updateStatus(selectedBooking.id, 'cancelled')}
                className="w-full bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => deleteTestDrive(selectedBooking.id)}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Delete Booking
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center h-full flex items-center justify-center">
            <p className="text-gray-600">Select a booking to view details</p>
          </div>
        )}
      </div>
    </div>
  );
}

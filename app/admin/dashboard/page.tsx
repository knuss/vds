"use client";

import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import { collection, getDocs, query } from "firebase/firestore";

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalVehicles: 0,
    publishedVehicles: 0,
    featuredVehicles: 0,
    soldVehicles: 0,
    reservedVehicles: 0,
    totalInquiries: 0,
    pendingTestDrives: 0,
    tradeInLeads: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const vehiclesSnap = await getDocs(collection(db, "vehicles"));
        const inquiriesSnap = await getDocs(collection(db, "inquiries"));
        const testDrivesSnap = await getDocs(
          query(collection(db, "testDrives")),
        );
        const tradeInsSnap = await getDocs(collection(db, "tradeInLeads"));

        const publishedVehicles = vehiclesSnap.docs.filter(
          (doc) => !doc.data().isSold && !doc.data().isReserved,
        ).length;

        const featuredVehicles = vehiclesSnap.docs.filter(
          (doc) => doc.data().isFeatured,
        ).length;

        const soldVehicles = vehiclesSnap.docs.filter(
          (doc) => doc.data().isSold,
        ).length;

        const reservedVehicles = vehiclesSnap.docs.filter(
          (doc) => doc.data().isReserved,
        ).length;

        const pendingTestDrives = testDrivesSnap.docs.filter(
          (doc) => doc.data().status === "pending",
        ).length;

        setStats({
          totalVehicles: vehiclesSnap.size,
          publishedVehicles,
          featuredVehicles,
          soldVehicles,
          reservedVehicles,
          totalInquiries: inquiriesSnap.size,
          pendingTestDrives,
          tradeInLeads: tradeInsSnap.size,
        });
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-8 text-gray-900">Dashboard</h1>

      {loading ? (
        <div className="text-center py-12">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Vehicles */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Vehicles</p>
                <p className="text-4xl font-bold text-gray-900">
                  {stats.totalVehicles}
                </p>
              </div>
              <div className="bg-blue-100 rounded-lg p-3">
                <span className="text-2xl">🚗</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Published Vehicles</p>
                <p className="text-4xl font-bold text-gray-900">
                  {stats.publishedVehicles}
                </p>
              </div>
              <div className="bg-blue-50 rounded-lg p-3">
                <span className="text-2xl">✅</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Featured Vehicles</p>
                <p className="text-4xl font-bold text-gray-900">
                  {stats.featuredVehicles}
                </p>
              </div>
              <div className="bg-amber-100 rounded-lg p-3">
                <span className="text-2xl">⭐</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Sold Vehicles</p>
                <p className="text-4xl font-bold text-gray-900">
                  {stats.soldVehicles}
                </p>
              </div>
              <div className="bg-emerald-100 rounded-lg p-3">
                <span className="text-2xl">🏁</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Reserved Vehicles</p>
                <p className="text-4xl font-bold text-gray-900">
                  {stats.reservedVehicles}
                </p>
              </div>
              <div className="bg-purple-100 rounded-lg p-3">
                <span className="text-2xl">🔖</span>
              </div>
            </div>
          </div>

          {/* Total Inquiries */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Total Inquiries</p>
                <p className="text-4xl font-bold text-gray-900">
                  {stats.totalInquiries}
                </p>
              </div>
              <div className="bg-green-100 rounded-lg p-3">
                <span className="text-2xl">📧</span>
              </div>
            </div>
          </div>

          {/* Pending Test Drives */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Pending Test Drives</p>
                <p className="text-4xl font-bold text-gray-900">
                  {stats.pendingTestDrives}
                </p>
              </div>
              <div className="bg-orange-100 rounded-lg p-3">
                <span className="text-2xl">📅</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm">Trade-In Leads</p>
                <p className="text-4xl font-bold text-gray-900">
                  {stats.tradeInLeads}
                </p>
              </div>
              <div className="bg-slate-100 rounded-lg p-3">
                <span className="text-2xl">🔁</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/admin/vehicles/new"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-semibold text-center"
          >
            Add New Vehicle
          </a>
          <a
            href="/admin/inquiries"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition font-semibold text-center"
          >
            View Inquiries
          </a>
          <a
            href="/admin/test-drives"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition font-semibold text-center"
          >
            View Test Drives
          </a>
          <a
            href="/admin/trade-ins"
            className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition font-semibold text-center"
          >
            Trade-In Leads
          </a>
        </div>
      </div>
    </div>
  );
}

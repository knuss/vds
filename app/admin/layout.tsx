'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { auth } from '@/lib/firebase';
import { useEffect, useState } from 'react';
import { signOut } from 'firebase/auth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const isLoginRoute = pathname === '/admin/login';

  useEffect(() => {
    if (isLoginRoute) {
      setLoading(false);
      return;
    }

    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        setLoading(false);
        router.push('/admin/login');
      }
    });
    return () => unsubscribe();
  }, [isLoginRoute, router]);

  if (isLoginRoute) {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 text-white">
        <div className="p-6">
          <Link href="/admin/dashboard" className="text-2xl font-bold">
            Admin Panel
          </Link>
        </div>
        <nav className="mt-8">
          <Link
            href="/admin/dashboard"
            className="block px-6 py-3 hover:bg-gray-800 transition"
          >
            Dashboard
          </Link>
          <Link
            href="/admin/vehicles"
            className="block px-6 py-3 hover:bg-gray-800 transition"
          >
            Vehicles
          </Link>
          <Link
            href="/admin/inquiries"
            className="block px-6 py-3 hover:bg-gray-800 transition"
          >
            Inquiries
          </Link>
          <Link
            href="/admin/test-drives"
            className="block px-6 py-3 hover:bg-gray-800 transition"
          >
            Test Drives
          </Link>
          <Link
            href="/admin/trade-ins"
            className="block px-6 py-3 hover:bg-gray-800 transition"
          >
            Trade-In Leads
          </Link>
        </nav>
        <div className="absolute bottom-0 w-64 p-6 border-t border-gray-800">
          <p className="text-sm text-gray-400 mb-4">{user?.email}</p>
          <button
            onClick={handleLogout}
            className="w-full bg-red-600 hover:bg-red-700 transition px-4 py-2 rounded"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </div>
    </div>
  );
}

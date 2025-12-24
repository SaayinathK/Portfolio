"use client";

import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <AdminSidebar />
      
      <div className="flex-1 flex flex-col">
        {/* Header / optional top bar */}
        <header className="bg-white shadow-md p-4 md:p-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">Admin Dashboard</h1>
          {/* You can add user avatar, notifications, etc. here */}
        </header>

        {/* Main content */}
        <main className="flex-1 p-4 md:p-8 bg-gradient-to-br from-gray-50 to-gray-100 rounded-tl-lg shadow-inner">
          {children}
        </main>
      </div>
    </div>
  );
}

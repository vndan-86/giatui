import React from 'react';

export default function AdminDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8 border-b pb-4">
          <h1 className="text-2xl font-bold tracking-tight">Hệ Thống Quản Trị Chuỗi Giặt Ủi (Admin)</h1>
          <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-medium">Bản v1.0 MVP</span>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500">Đơn hàng hôm nay</h3>
            <p className="text-3xl font-extrabold mt-2 text-slate-900">0</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500">Khối lượng giặt (kg)</h3>
            <p className="text-3xl font-extrabold mt-2 text-slate-900">0.0 kg</p>
          </div>
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h3 className="text-sm font-medium text-slate-500">Sự cố cần xử lý</h3>
            <p className="text-3xl font-extrabold mt-2 text-amber-600">0</p>
          </div>
        </div>
      </div>
    </main>
  );
}

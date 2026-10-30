import React from 'react';

export default function CustomerHomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-800 p-6 flex flex-col items-center justify-center">
      <div className="max-w-md w-full text-center space-y-4">
        <h1 className="text-3xl font-bold text-sky-600">Dịch Vụ Giặt Sấy Chuyên Nghiệp</h1>
        <p className="text-slate-600">Tra cứu đơn hàng và đặt lịch giặt đồ trực tuyến.</p>
        <div className="pt-4">
          <input 
            type="text" 
            placeholder="Nhập mã đơn hàng..." 
            className="w-full border border-slate-300 rounded-lg p-3 text-center outline-none focus:border-sky-500 mb-3"
          />
          <button className="w-full bg-sky-600 hover:bg-sky-500 text-white font-medium py-3 rounded-lg transition">
            Tra Cứu Đơn Hàng
          </button>
        </div>
      </div>
    </main>
  );
}

'use client';

import React, { useState } from 'react';
import { createClient } from '@laundry/shared/src/supabaseClient';

export default function StaffIntakePage() {
  const supabase = createClient();
  const [orderCode, setOrderCode] = useState('');
  const [weight, setWeight] = useState('');
  const [status, setStatus] = useState<string | null>(null);

  const handleQuickIntake = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Đang ghi nhận...');

    const { data, error } = await supabase.from('branches').select('id, name').limit(1);

    if (error) {
      setStatus(`Lỗi: ${error.message}`);
    } else {
      setStatus(`Kết nối Supabase thành công! Chi nhánh mẫu: ${data[0]?.name || 'Chưa tạo'}`);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-slate-100 p-6 flex flex-col items-center">
      <div className="w-full max-w-md bg-slate-800 p-6 rounded-2xl shadow-xl border border-slate-700">
        <h1 className="text-xl font-bold mb-4 text-emerald-400">Trạm Tiếp Nhận Giặt Ủi (Staff PWA)</h1>
        
        <form onSubmit={handleQuickIntake} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Mã túi / Mã QR</label>
            <input 
              type="text" 
              placeholder="Quét mã QR..." 
              value={orderCode} 
              onChange={(e) => setOrderCode(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Khối lượng cân thực tế (kg)</label>
            <input 
              type="number" 
              step="0.1" 
              placeholder="VD: 5.5" 
              value={weight} 
              onChange={(e) => setWeight(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-white outline-none focus:border-emerald-500"
            />
          </div>

          <button 
            type="submit" 
            className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold py-3 rounded-lg transition"
          >
            Xác Nhận Cân & Kiểm Tra
          </button>
        </form>

        {status && (
          <div className="mt-4 p-3 bg-slate-950 border border-slate-700 rounded-lg text-sm text-center">
            {status}
          </div>
        )}
      </div>
    </main>
  );
}

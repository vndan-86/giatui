'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@laundry/shared/src/supabaseClient';
import { getCurrentUserProfile, CurrentUserProfile } from '@laundry/shared/src/auth';

export default function AdminDashboardPage() {
  const router = useRouter();
  const supabase = createClient();
  const [profile, setProfile] = useState<CurrentUserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      const u = await getCurrentUserProfile();
      if (!u) {
        router.push('/login');
        return;
      }
      setProfile(u);
      setLoading(false);
    }
    init();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center text-slate-500">
        Đang kiểm tra quyền quản trị...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8 border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Hệ Thống Quản Trị Chuỗi Giặt Ủi (Admin)</h1>
            <p className="text-sm text-slate-500 mt-1">
              Đang đăng nhập: <span className="font-semibold">{profile?.name}</span> ({profile?.role?.name || profile?.role?.slug})
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="bg-emerald-100 text-emerald-800 text-xs px-2.5 py-1 rounded-full font-medium">v1.0 MVP</span>
            <button
              onClick={handleSignOut}
              className="text-xs bg-slate-200 hover:bg-slate-300 text-slate-700 px-3 py-1.5 rounded-md transition"
            >
              Đăng xuất
            </button>
          </div>
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

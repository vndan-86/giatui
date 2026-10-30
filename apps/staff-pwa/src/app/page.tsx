'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@laundry/shared/src/supabaseClient';
import { getCurrentUserProfile, CurrentUserProfile } from '@laundry/shared/src/auth';

export default function StaffIntakePage() {
  const router = useRouter();
  const supabase = createClient();
  const [userProfile, setUserProfile] = useState<CurrentUserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkAuth() {
      const profile = await getCurrentUserProfile();
      if (!profile) {
        router.push('/login');
        return;
      }
      setUserProfile(profile);
      setLoading(false);
    }
    checkAuth();
  }, [router]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center text-slate-400">
        Đang tải thông tin ca làm việc...
      </div>
    );
  }

  const primaryBranch = userProfile?.branches.find(b => b.is_primary) || userProfile?.branches[0];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 p-4 flex flex-col items-center">
      <header className="w-full max-w-md flex justify-between items-center mb-6 pb-3 border-b border-slate-800">
        <div>
          <h2 className="font-bold text-white text-sm">{userProfile?.name}</h2>
          <span className="text-xs text-emerald-400">
            {primaryBranch ? primaryBranch.name : 'Chưa gán chi nhánh'}
          </span>
        </div>
        <button
          onClick={handleSignOut}
          className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-md transition"
        >
          Đăng xuất
        </button>
      </header>

      <div className="w-full max-w-md bg-slate-900 p-5 rounded-2xl border border-slate-800 shadow-xl space-y-4">
        <h1 className="text-lg font-bold text-emerald-400">Trạm Tiếp Nhận Giặt Ủi</h1>
        <p className="text-xs text-slate-400">Sẵn sàng nhận đồ và gán mã QR cho túi giặt.</p>
        
        <div className="p-4 bg-slate-950 border border-dashed border-slate-700 rounded-xl text-center">
          <p className="text-xs text-slate-400">Chờ quét mã QR túi giặt hoặc tạo đơn mới</p>
        </div>
      </div>
    </main>
  );
}

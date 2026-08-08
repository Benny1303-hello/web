'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, Mail, Package, ShieldCheck, UserCircle } from 'lucide-react';
import Reveal from '@/components/Reveal';
import { useAuth } from '@/context/AuthContext';

export default function AccountView() {
  const { user, profile, loading } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [tab, setTab] = useState(searchParams.get('tab') === 'orders' ? 'orders' : 'profile');

  useEffect(() => {
    if (!loading && !user) {
      router.replace('/');
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <Loader2 size={28} className="animate-spin text-brand-500" />
      </div>
    );
  }

  const name = profile?.username || user.displayName || user.email?.split('@')[0];
  const initial = name?.charAt(0).toUpperCase() || '?';
  const createdAt = profile?.createdAt?.toDate
    ? profile.createdAt.toDate().toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric' })
    : '—';

  return (
    <section className="bg-white py-16">
      <div className="container-page">
        <Reveal className="flex items-center gap-4">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-brand-500 to-cyan-400 font-display text-2xl font-bold text-navy-950">
            {initial}
          </span>
          <div>
            <h1 className="font-display text-2xl font-bold text-navy-900">{name}</h1>
            <p className="text-sm text-ink-400">{user.email}</p>
          </div>
        </Reveal>

        <div className="mt-8 flex gap-2 border-b border-black/10">
          <TabButton active={tab === 'profile'} onClick={() => setTab('profile')} icon={UserCircle}>
            Thông tin tài khoản
          </TabButton>
          <TabButton active={tab === 'orders'} onClick={() => setTab('orders')} icon={Package}>
            Đơn hàng của tôi
          </TabButton>
        </div>

        <div className="mt-8">
          {tab === 'profile' ? (
            <Reveal>
              <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <InfoCard icon={UserCircle} label="Tên người dùng" value={name} />
                <InfoCard icon={Mail} label="Email" value={user.email} />
                <InfoCard icon={ShieldCheck} label="Trạng thái xác thực" value={user.emailVerified ? 'Đã xác thực' : 'Chưa xác thực email'} />
                <InfoCard icon={UserCircle} label="Thành viên từ" value={createdAt} />
              </dl>
            </Reveal>
          ) : (
            <Reveal className="flex flex-col items-center justify-center rounded-2xl bg-mist-50 px-6 py-16 text-center">
              <Package size={36} className="text-ink-400" />
              <h3 className="mt-4 font-display text-lg font-bold text-ink-900">Chưa có đơn hàng nào</h3>
              <p className="mt-2 max-w-sm text-sm text-ink-400">
                Lịch sử đơn hàng và yêu cầu dịch vụ của bạn sẽ hiển thị tại đây.
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}

function TabButton({ active, onClick, icon: Icon, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 border-b-2 px-1 pb-3 text-sm font-medium transition-colors ${
        active ? 'border-brand-500 text-navy-900' : 'border-transparent text-ink-400 hover:text-ink-700'
      }`}
    >
      <Icon size={16} />
      {children}
    </button>
  );
}

function InfoCard({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl bg-mist-50 p-5 ring-1 ring-black/5">
      <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-ink-400">
        <Icon size={14} className="text-brand-500" />
        {label}
      </dt>
      <dd className="mt-2 text-sm font-medium text-ink-900">{value}</dd>
    </div>
  );
}

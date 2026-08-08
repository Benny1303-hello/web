import { Suspense } from 'react';
import { Loader2 } from 'lucide-react';
import PageHero from '@/components/PageHero';
import AccountView from '@/components/account/AccountView';

export const metadata = {
  title: 'Tài khoản của tôi',
};

export default function AccountPage() {
  return (
    <>
      <PageHero crumb="Tài khoản" eyebrow="Khu vực cá nhân" title="Tài khoản của tôi" />
      <Suspense
        fallback={
          <div className="flex min-h-[50vh] items-center justify-center">
            <Loader2 size={28} className="animate-spin text-brand-500" />
          </div>
        }
      >
        <AccountView />
      </Suspense>
    </>
  );
}

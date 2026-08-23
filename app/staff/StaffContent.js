'use client';

import StaffDirectory from '@/components/StaffDirectory';
import { distributionStaff } from '@/lib/content';

export default function StaffContent() {
  return <StaffDirectory tPrefix="pages.staff" groups={distributionStaff} />;
}

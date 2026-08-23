'use client';

import StaffDirectory from '@/components/StaffDirectory';
import { consultingStaff } from '@/lib/content';

export default function StaffContent() {
  return <StaffDirectory tPrefix="pages.systemIntegrationStaff" groups={consultingStaff} />;
}

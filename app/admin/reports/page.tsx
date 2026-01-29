// app/admin/reports/page.tsx - SUSPENSE WRAPPED
'use client';

import { Suspense } from 'react';
import ReportEditor from './ReportEditor';

export default function AdminReportsPage() {
  return (
    <Suspense fallback={<div className="p-8">Loading editor...</div>}>
      <ReportEditor />
    </Suspense>
  );
}
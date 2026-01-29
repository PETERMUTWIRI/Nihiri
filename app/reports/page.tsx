// app/reports/page.tsx - ANNUAL REPORTS (blog-pattern)
import { PrismaClient } from '@prisma/client';
import ReportsClient from './ReportsClient';
import { unstable_cache } from 'next/cache';

const prisma = new PrismaClient();

const getCachedReports = unstable_cache(
  async () => {
    const rows = await prisma.annualReport.findMany({ where: { published: true }, orderBy: { year: 'desc' } });
    return rows.map((r) => ({
      id: r.id,
      year: r.year,
      title: r.title,
      cover: r.cover,
      canvaUrl: r.canvaurl, // ← cast snake-case → camelCase
      published: r.published,
    }));
  },
  ['annual-reports'],
  { revalidate: 60 }
);

export default async function ReportsPage() {
  const reports = await getCachedReports();
  if (!reports.length)
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">No reports yet</h2>
          <p className="text-gray-600">Check back later!</p>
        </div>
      </div>
    );
  return <ReportsClient initialReports={reports} />;
}
// app/admin/DashboardContent.tsx - CLIENT COMPONENT WITH SWR
'use client';

import useSWR from 'swr';
import Link from 'next/link';
import { FaEdit, FaTrash, FaPlus, FaCalendar, FaFileAlt, FaPen } from 'react-icons/fa';

/* ---------- types ---------- */
interface Post {
  id: number;
  title: string;
  category: string;
  publishedAt: string;
  cover?: string;
}

interface Event {
  id: number;
  title: string;
  category: string;
  startDate: string;
  cover?: string;
}

interface Report {
  id: number;
  year: number;
  title: string;
  cover?: string;
  published: boolean;
}

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export default function DashboardContent() {
  const { data: posts, mutate: mutatePosts } = useSWR<Post[]>('/api/blog', fetcher);
  const { data: events, mutate: mutateEvents } = useSWR<Event[]>('/api/events', fetcher);
  const { data: reports, mutate: mutateReports } = useSWR<Report[]>('/api/reports', fetcher);

  const deletePost = async (id: number) => {
    if (!confirm('Delete this post?')) return;
    await fetch(`/api/blog?id=${id}`, { method: 'DELETE' });
    mutatePosts(posts?.filter((p) => p.id !== id) ?? [], false);
  };

  const deleteEvent = async (id: number) => {
    if (!confirm('Delete this event?')) return;
    await fetch(`/api/events?id=${id}`, { method: 'DELETE' });
    mutateEvents(events?.filter((e) => e.id !== id) ?? [], false);
  };

  const deleteReport = async (id: number) => {
    if (!confirm('Delete this report?')) return;
    await fetch(`/api/reports?id=${id}`, { method: 'DELETE' });
    mutateReports(reports?.filter((r) => r.id !== id) ?? [], false);
  };

  /* ---------- skeleton while loading ---------- */
  if (!posts || !events || !reports)
    return (
      <div className="max-w-7xl mx-auto p-8">
        <div className="h-10 bg-gray-200 rounded mb-8 animate-pulse" />
        <div className="grid md:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-white rounded-2xl shadow p-6">
              <div className="h-6 bg-gray-200 rounded mb-4 animate-pulse" />
              <div className="space-y-3">
                {[...Array(4)].map((_, j) => (
                  <div key={j} className="h-12 bg-gray-100 rounded animate-pulse" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );

  /* ---------- dashboard ---------- */
  return (
    <div className="max-w-7xl mx-auto p-8">
      <h1 className="text-3xl font-black text-gray-900 mb-8">Admin Dashboard</h1>

      {/* KPI CARDS */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <MetricCard label="Blog Posts" value={posts.length} icon={<FaPen />} href="/admin/blog" />
        <MetricCard label="Events" value={events.length} icon={<FaCalendar />} href="/admin/events" />
        <MetricCard label="Reports" value={reports.length} icon={<FaFileAlt />} href="/admin/reports" />
        <MetricCard label="Quick Add" value="+" icon={<FaPlus />} href="/admin" />
      </div>

      {/* CONTENT GRID */}
      <div className="grid md:grid-cols-3 gap-8">
        {/* BLOG SECTION */}
        <SectionCard
          title="Blog Posts"
          href="/admin/blog"
          onNew="/admin/blog"
          items={posts}
          render={(p) => (
            <ItemRow
              id={p.id}
              title={p.title}
              subtitle={p.category}
              cover={p.cover}
              editLink={`/admin/blog?id=${p.id}`}
              onDelete={() => deletePost(p.id)}
            />
          )}
        />

        {/* EVENTS SECTION */}
        <SectionCard
          title="Events"
          href="/admin/events"
          onNew="/admin/events"
          items={events}
          render={(e) => (
            <ItemRow
              id={e.id}
              title={e.title}
              subtitle={new Date(e.startDate).toLocaleDateString()}
              cover={e.cover}
              editLink={`/admin/events?id=${e.id}`}
              onDelete={() => deleteEvent(e.id)}
            />
          )}
        />

        {/* REPORTS SECTION */}
        <SectionCard
          title="Annual Reports"
          href="/admin/reports"
          onNew="/admin/reports"
          items={reports}
          render={(r) => (
            <ItemRow
              id={r.id}
              title={r.title}
              subtitle={`Year: ${r.year}`}
              cover={r.cover}
              editLink={`/admin/reports?id=${r.id}`}
              onDelete={() => deleteReport(r.id)}
            />
          )}
        />
      </div>
    </div>
  );
}

/* ---------- re-usable components ---------- */
function MetricCard({ label, value, icon, href }: { label: string; value: string | number; icon: React.ReactNode; href: string }) {
  return (
    <Link href={href} className="group bg-white rounded-2xl shadow p-6 hover:shadow-xl transition">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-3xl font-black text-gray-900 mt-1">{value}</p>
        </div>
        <div className="text-3xl text-gray-400 group-hover:text-blue-600 transition">{icon}</div>
      </div>
    </Link>
  );
}

function SectionCard<T>({
  title,
  href,
  onNew,
  items,
  render,
}: {
  title: string;
  href: string;
  onNew: string;
  items: T[];
  render: (item: T) => React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-black text-gray-900">{title}</h2>
        <Link href={onNew} className="text-blue-600 hover:text-blue-800 text-sm font-bold flex items-center gap-1">
          <FaPlus /> New
        </Link>
      </div>
      <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
        {items.length ? (
          items.map(render)
        ) : (
          <p className="text-sm text-gray-500">No items yet</p>
        )}
      </div>
      <div className="mt-4 border-t pt-4">
        <Link href={href} className="text-sm text-blue-600 hover:underline font-semibold">View all →</Link>
      </div>
    </div>
  );
}

function ItemRow({ id, title, subtitle, cover, editLink, onDelete }: { id: number; title: string; subtitle: string; cover?: string; editLink: string; onDelete: () => void }) {
  return (
    <div className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg border group hover:bg-gray-100 transition">
      {cover && <img src={cover} alt="" className="w-12 h-12 object-cover rounded" />}
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm truncate">{title}</p>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
        <Link href={editLink} className="text-blue-600 hover:text-blue-800 p-1" title="Edit">
          <FaEdit />
        </Link>
        <button onClick={onDelete} className="text-red-600 hover:text-red-800 p-1" title="Delete">
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
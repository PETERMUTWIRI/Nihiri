// app/api/events/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/* GET /api/events?category=Upcoming  (default) */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') || 'Upcoming';
  const events = await prisma.event.findMany({
    where: { category },
    orderBy: { startDate: category === 'Upcoming' ? 'asc' : 'desc' },
  });
  return NextResponse.json(events);
}

/* POST /api/events  (admin only) */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, description, category, cover, startDate, endDate, location } = body;
  const slug = slugify(title);
  const event = await prisma.event.create({
    data: { title, slug, description, category, cover, startDate: new Date(startDate), endDate: endDate ? new Date(endDate) : null, location },
  });
  return NextResponse.json(event);
}

const slugify = (str: string) => str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
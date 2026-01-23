// app/api/events/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/auth/middleware';

const prisma = new PrismaClient();

/* GET /api/events?category=Upcoming or GET /api/events?id=1 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const category = searchParams.get('category');

    if (id) {
      // Get single event by ID
      const event = await prisma.event.findUnique({
        where: { id: Number(id) },
      });
      if (!event) {
        return NextResponse.json({ error: 'Event not found' }, { status: 404 });
      }
      return NextResponse.json(event);
    }

    // Get all events with optional category filter
    const eventCategory = category || 'Upcoming';
    const events = await prisma.event.findMany({
      where: { category: eventCategory },
      orderBy: { startDate: eventCategory === 'Upcoming' ? 'asc' : 'desc' },
    });
    return NextResponse.json(events);
  } catch (error) {
    console.error('GET /api/events error:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

/* POST /api/events  (admin only) */
export async function POST(req: NextRequest) {
  try {
    const auth = await verifyAdminAuth(req);
    if (!auth.authorized) return unauthorizedResponse();

    const body = await req.json();
    const { title, description, category, cover, startDate, endDate, location } = body;
    const slug = slugify(title);

    const event = await prisma.event.create({
      data: { 
        title, 
        slug, 
        description, 
        category, 
        cover, 
        startDate: new Date(startDate), 
        endDate: endDate ? new Date(endDate) : null, 
        location 
      },
    });
    return NextResponse.json(event);
  } catch (error) {
    console.error('POST /api/events error:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}

/* PUT /api/events?id=1  (admin only) */
export async function PUT(req: NextRequest) {
  try {
    const auth = await verifyAdminAuth(req);
    if (!auth.authorized) return unauthorizedResponse();

    const id = Number(req.nextUrl.searchParams.get('id'));
    const body = await req.json();
    const { title, description, category, cover, startDate, endDate, location } = body;

    const event = await prisma.event.update({
      where: { id },
      data: { 
        title, 
        description, 
        category, 
        cover, 
        startDate: new Date(startDate), 
        endDate: endDate ? new Date(endDate) : null, 
        location 
      },
    });
    return NextResponse.json(event);
  } catch (error) {
    console.error('PUT /api/events error:', error);
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}

/* DELETE /api/events?id=1  (admin only) */
export async function DELETE(req: NextRequest) {
  try {
    const auth = await verifyAdminAuth(req);
    if (!auth.authorized) return unauthorizedResponse();

    const id = Number(req.nextUrl.searchParams.get('id'));
    await prisma.event.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('DELETE /api/events error:', error);
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}

const slugify = (str: string) => str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
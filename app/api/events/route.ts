// app/api/events/route.ts - COMPLETE WORKING VERSION
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/auth/middleware';

const prisma = new PrismaClient();

// Flexible date validator - accepts multiple formats
const flexibleDateTime = z.string().refine(
  (val) => {
    if (!val) return false;
    const date = new Date(val);
    return !isNaN(date.getTime());
  },
  {
    message: 'Invalid date format. Use: YYYY-MM-DDTHH:MM (e.g., 2026-01-25T09:00)',
  }
);

// Validation schema - NO strict datetime validation
const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  category: z.enum(['Upcoming', 'Past']),
  cover: z.string().optional(),
  location: z.string().min(1, 'Location is required'),
  startDate: flexibleDateTime,
  endDate: flexibleDateTime.optional().nullable(),
  author: z.string().optional(),
  metaTitle: z.string().max(100).optional(),
  metaDesc: z.string().max(160).optional(),
  ogImage: z.string().optional(),
  venue: z.string().optional(),
  address: z.string().optional(),
  registrationLink: z.string().optional(),
  maxAttendees: z.number().int().positive().optional(),
  isFree: z.boolean().default(true),
  ticketPrice: z.string().optional(),
});

/* GET /api/events?category=Upcoming or GET /api/events?id=1 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const category = searchParams.get('category');

    if (id) {
      const event = await prisma.event.findUnique({
        where: { id: Number(id), deletedAt: null },
      });
      if (!event) {
        return NextResponse.json({ error: 'Event not found' }, { status: 404 });
      }
      return NextResponse.json(event);
    }

    const where: any = { deletedAt: null };
    if (category && category !== 'All') {
      where.category = category;
    }

    const events = await prisma.event.findMany({
      where,
      orderBy: { startDate: category === 'Past' ? 'desc' : 'asc' },
    });

    return NextResponse.json(events);
  } catch (error) {
    console.error('GET /api/events error:', error);
    return NextResponse.json({ error: 'Failed to fetch events' }, { status: 500 });
  }
}

/* POST /api/events (admin only) */
export async function POST(req: NextRequest) {
  try {
    const auth = await verifyAdminAuth(req);
    if (!auth.authorized) return unauthorizedResponse();

    const body = await req.json();
    console.log('POST body:', body);

    // Validate input
    const validation = eventSchema.safeParse(body);
    if (!validation.success) {
      console.error('Validation failed:', validation.error.issues);
      return NextResponse.json({ 
        error: 'Validation failed', 
        details: validation.error.issues 
      }, { status: 400 });
    }

    const data = validation.data;
    
    // Generate unique slug
    const baseSlug = slugify(data.title);
    const slug = `${baseSlug}-${Date.now()}`;

    const event = await prisma.event.create({
      data: {
        title: data.title,
        slug,
        description: data.description || null,
        category: data.category,
        cover: data.cover || null,
        location: data.location,
        startDate: new Date(data.startDate), // Flexible Date parsing
        endDate: data.endDate ? new Date(data.endDate) : null,
        author: data.author || null,
        metaTitle: data.metaTitle || null,
        metaDesc: data.metaDesc || null,
        ogImage: data.ogImage || null,
        venue: data.venue || null,
        address: data.address || null,
        registrationLink: data.registrationLink || null,
        maxAttendees: data.maxAttendees || null,
        isFree: data.isFree,
        ticketPrice: data.isFree ? null : data.ticketPrice || null,
      },
    });

    console.log('Event created:', event.id);
    return NextResponse.json(event, { status: 201 });
  } catch (error) {
    console.error('POST /api/events error:', error);
    return NextResponse.json({ error: 'Failed to create event' }, { status: 500 });
  }
}

/* PUT /api/events?id=1 (admin only) */
export async function PUT(req: NextRequest) {
  try {
    const auth = await verifyAdminAuth(req);
    if (!auth.authorized) return unauthorizedResponse();

    const id = Number(req.nextUrl.searchParams.get('id'));
    if (!id || isNaN(id)) {
      return NextResponse.json({ error: 'Invalid event ID' }, { status: 400 });
    }

    const body = await req.json();
    console.log('PUT body:', body);

    // Allow partial updates - make all fields optional
    const updateSchema = z.object({
      title: z.string().min(1).optional(),
      description: z.string().optional(),
      category: z.enum(['Upcoming', 'Past']).optional(),
      cover: z.string().optional(),
      location: z.string().min(1).optional(),
      startDate: flexibleDateTime.optional(),
      endDate: flexibleDateTime.optional().nullable(),
      author: z.string().optional(),
      metaTitle: z.string().max(100).optional(),
      metaDesc: z.string().max(160).optional(),
      ogImage: z.string().optional(),
      venue: z.string().optional(),
      address: z.string().optional(),
      registrationLink: z.string().optional(),
      maxAttendees: z.number().int().positive().optional(),
      isFree: z.boolean().optional(),
      ticketPrice: z.string().optional(),
    });

    const validation = updateSchema.safeParse(body);
    
    if (!validation.success) {
      console.error('Validation failed:', validation.error.issues);
      return NextResponse.json({ 
        error: 'Validation failed', 
        details: validation.error.issues 
      }, { status: 400 });
    }

    const data = validation.data;

    // Build update data dynamically
    const updateData: any = {};
    if (data.title !== undefined) updateData.title = data.title;
    if (data.description !== undefined) updateData.description = data.description;
    if (data.category !== undefined) updateData.category = data.category;
    if (data.cover !== undefined) updateData.cover = data.cover;
    if (data.location !== undefined) updateData.location = data.location;
    if (data.startDate !== undefined) updateData.startDate = new Date(data.startDate);
    if (data.endDate !== undefined) updateData.endDate = data.endDate ? new Date(data.endDate) : null;
    if (data.author !== undefined) updateData.author = data.author;
    if (data.metaTitle !== undefined) updateData.metaTitle = data.metaTitle;
    if (data.metaDesc !== undefined) updateData.metaDesc = data.metaDesc;
    if (data.ogImage !== undefined) updateData.ogImage = data.ogImage;
    if (data.venue !== undefined) updateData.venue = data.venue;
    if (data.address !== undefined) updateData.address = data.address;
    if (data.registrationLink !== undefined) updateData.registrationLink = data.registrationLink;
    if (data.maxAttendees !== undefined) updateData.maxAttendees = data.maxAttendees;
    if (data.isFree !== undefined) updateData.isFree = data.isFree;
    if (data.ticketPrice !== undefined) updateData.ticketPrice = data.isFree ? null : data.ticketPrice;

    const event = await prisma.event.update({
      where: { id },
      data: updateData,
    });

    console.log('Event updated:', event.id);
    return NextResponse.json(event);
  } catch (error) {
    console.error('PUT /api/events error:', error);
    return NextResponse.json({ error: 'Failed to update event' }, { status: 500 });
  }
}

/* DELETE /api/events?id=1 (admin only) - Soft delete */
export async function DELETE(req: NextRequest) {
  try {
    const auth = await verifyAdminAuth(req);
    if (!auth.authorized) return unauthorizedResponse();

    const id = Number(req.nextUrl.searchParams.get('id'));
    if (!id || isNaN(id)) {
      return NextResponse.json({ error: 'Invalid event ID' }, { status: 400 });
    }

    await prisma.event.update({
      where: { id },
      data: { deletedAt: new Date() },
    });

    return NextResponse.json({ ok: true, message: 'Event deleted' });
  } catch (error) {
    console.error('DELETE /api/events error:', error);
    return NextResponse.json({ error: 'Failed to delete event' }, { status: 500 });
  }
}

const slugify = (str: string) => 
  str.toLowerCase().trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
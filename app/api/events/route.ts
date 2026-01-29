// app/api/events/route.ts - FULL CRUD WITH SAFE PUT
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/auth/middleware';

const prisma = new PrismaClient();

/* ---------- validation ---------- */
const eventSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  category: z.enum(['Upcoming', 'Past']),
  cover: z.string().optional(),
  location: z.string().min(1, 'Location is required'),
  startDate: z.string().min(1),
  endDate: z.string().optional().nullable(),
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
  gallery: z.array(z.string()).max(10).optional(),
});

/* ---------- GET ---------- */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const category = searchParams.get('category');

  if (id) {
    const event = await prisma.event.findUnique({ where: { id: Number(id), deletedAt: null } });
    return event ? NextResponse.json(event) : NextResponse.json({ error: 'Not found' }, { status: 404 });
  }

  const where: any = { deletedAt: null };
  if (category && category !== 'All') where.category = category;

  const events = await prisma.event.findMany({ where, orderBy: { startDate: category === 'Past' ? 'desc' : 'asc' } });
  return NextResponse.json(events);
}

/* ---------- POST ---------- */
export async function POST(req: NextRequest) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) return unauthorizedResponse();

  const raw = await req.json();
  console.log('POST body:', raw);

  /* ---- cast / clean ---- */
  if (raw.maxAttendees === null || raw.maxAttendees === '') {
    delete raw.maxAttendees; // so z.number().optional() passes
  } else {
    raw.maxAttendees = Number(raw.maxAttendees);
  }

  const body = eventSchema.parse(raw);

  const slug = slugify(body.title) + '-' + Date.now();

  const event = await prisma.event.create({
    data: {
      title: body.title,
      slug,
      description: body.description || null,
      category: body.category,
      cover: body.cover || null,
      location: body.location,
      startDate: new Date(body.startDate),
      endDate: body.endDate ? new Date(body.endDate) : null,
      author: body.author || null,
      metaTitle: body.metaTitle || null,
      metaDesc: body.metaDesc || null,
      ogImage: body.ogImage || null,
      venue: body.venue || null,
      address: body.address || null,
      registrationLink: body.registrationLink || null,
      maxAttendees: body.maxAttendees || null,
      isFree: body.isFree,
      ticketPrice: body.isFree ? null : body.ticketPrice || null,
      gallery: body.gallery || [],
    },
  });

  console.log('Event created:', event.id);
  return NextResponse.json(event, { status: 201 });
}

/* ---------- PUT (BULLETPROOF) ---------- */
export async function PUT(req: NextRequest) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) return unauthorizedResponse();

  const id = Number(new URL(req.url).searchParams.get('id'));
  if (!id) return NextResponse.json({ error: 'ID required' }, { status: 400 });

  const raw = await req.json();
  console.log('PUT /api/events body:', raw); // ← log what arrived

  // cast maxAttendees before validation
  if (raw.maxAttendees === null || raw.maxAttendees === '') {
    delete raw.maxAttendees; // remove so z.number().optional() passes
  } else {
    raw.maxAttendees = Number(raw.maxAttendees);
  }

  // partial update schema
  const updateSchema = eventSchema.partial();
  const body = updateSchema.parse(raw);

  // whitelist ONLY columns that exist in DB
  const data: any = {};
  if (body.title !== undefined) data.title = body.title;
  if (body.description !== undefined) data.description = body.description;
  if (body.category !== undefined) data.category = body.category;
  if (body.cover !== undefined) data.cover = body.cover;
  if (body.location !== undefined) data.location = body.location;
  if (body.startDate !== undefined) data.startDate = new Date(body.startDate);
  if (body.endDate !== undefined) data.endDate = body.endDate ? new Date(body.endDate) : null;
  if (body.author !== undefined) data.author = body.author;
  if (body.metaTitle !== undefined) data.metaTitle = body.metaTitle;
  if (body.metaDesc !== undefined) data.metaDesc = body.metaDesc;
  if (body.ogImage !== undefined) data.ogImage = body.ogImage;
  if (body.venue !== undefined) data.venue = body.venue;
  if (body.address !== undefined) data.address = body.address;
  if (body.registrationLink !== undefined) data.registrationLink = body.registrationLink;
  if (body.maxAttendees !== undefined) data.maxAttendees = body.maxAttendees;
  if (body.isFree !== undefined) data.isFree = body.isFree;
  if (body.ticketPrice !== undefined) data.ticketPrice = body.isFree ? null : body.ticketPrice;
  if (body.gallery !== undefined) data.gallery = body.gallery;

  const updated = await prisma.event.update({ where: { id }, data });
  console.log('Event updated:', updated.id);
  return NextResponse.json(updated);
}

/* ---------- DELETE ---------- */
export async function DELETE(req: NextRequest) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) return unauthorizedResponse();

  const id = Number(new URL(req.url).searchParams.get('id'));
  await prisma.event.update({ where: { id }, data: { deletedAt: new Date() } });
  return NextResponse.json({ ok: true });
}

const slugify = (str: string) =>
  str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
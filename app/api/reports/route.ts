// app/api/reports/route.ts - FIXED canvaUrl → canvaurl mapping
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { verifyAdminAuth } from '@/lib/auth/middleware';

const prisma = new PrismaClient();

/* ---------- validation ---------- */
const schema = z.object({
  year: z.number().int().min(2000).max(2100),
  title: z.string().min(1),
  cover: z.string().optional(),
  canvaUrl: z.string().url(),
  published: z.boolean().optional().default(true),
});

/* ---------- GET ---------- */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  if (id) {
    const r = await prisma.annualReport.findUnique({ where: { id: Number(id) } });
    return r ? NextResponse.json(r) : NextResponse.json({ error: 'Not found' }, { status: 404 });
  }
  const list = await prisma.annualReport.findMany({ where: { published: true }, orderBy: { year: 'desc' } });
  return NextResponse.json(list);
}

/* ---------- POST ---------- */
export async function POST(req: NextRequest) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const body = schema.parse(await req.json());
  const data = {
    year: body.year,
    title: body.title,
    cover: body.cover,
    canvaurl: body.canvaUrl, // ← camelCase → snake_case
    published: body.published,
  };

  const created = await prisma.annualReport.create({ data });
  return NextResponse.json(created, { status: 201 });
}

/* ---------- PUT ---------- */
export async function PUT(req: NextRequest) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const id = Number(new URL(req.url).searchParams.get('id'));
  const body = schema.parse(await req.json());

  const data: any = {};
  if (body.year !== undefined) data.year = body.year;
  if (body.title !== undefined) data.title = body.title;
  if (body.cover !== undefined) data.cover = body.cover;
  if (body.canvaUrl !== undefined) data.canvaurl = body.canvaUrl; // ←
  if (body.published !== undefined) data.published = body.published;

  const updated = await prisma.annualReport.update({ where: { id }, data });
  return NextResponse.json(updated);
}

/* ---------- DELETE ---------- */
export async function DELETE(req: NextRequest) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const id = Number(new URL(req.url).searchParams.get('id'));
  await prisma.annualReport.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}
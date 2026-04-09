import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/auth/middleware';

const prisma = new PrismaClient();

const gallerySchema = z.object({
  imageUrl: z.string().url('Image URL must be valid'),
  description: z.string().max(500).optional().nullable(),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (id) {
    const item = await prisma.galleryImage.findUnique({ where: { id: Number(id) } });
    return item ? NextResponse.json(item) : NextResponse.json({ error: 'Gallery item not found' }, { status: 404 });
  }

  const items = await prisma.galleryImage.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) return unauthorizedResponse();

  const raw = await req.json();
  const body = gallerySchema.parse({
    imageUrl: raw.imageUrl,
    description: raw.description === '' ? null : raw.description,
  });

  const item = await prisma.galleryImage.create({
    data: {
      imageUrl: body.imageUrl,
      description: body.description || null,
    },
  });

  return NextResponse.json(item, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) return unauthorizedResponse();

  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get('id'));
  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

  const raw = await req.json();
  const body = gallerySchema.partial().parse({
    imageUrl: raw.imageUrl,
    description: raw.description === '' ? null : raw.description,
  });

  const data: any = {};
  if (body.imageUrl !== undefined) data.imageUrl = body.imageUrl;
  if (body.description !== undefined) data.description = body.description;

  const updated = await prisma.galleryImage.update({ where: { id }, data });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) return unauthorizedResponse();

  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get('id'));
  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

  await prisma.galleryImage.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

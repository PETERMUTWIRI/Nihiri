import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/auth/middleware';

const prisma = new PrismaClient();

const rewardSchema = z.object({
  imageUrl: z.string().url('Image URL must be valid'),
  title: z.string().min(1, 'Title is required').max(255),
  description: z.string().max(500).optional().nullable(),
  awardedBy: z.string().max(255).optional().nullable(),
  awardedDate: z.string().optional().nullable(),
});

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (id) {
    const item = await prisma.rewardRecognition.findUnique({ where: { id: Number(id) } });
    return item ? NextResponse.json(item) : NextResponse.json({ error: 'Reward not found' }, { status: 404 });
  }

  const items = await prisma.rewardRecognition.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) return unauthorizedResponse();

  const raw = await req.json();
  const body = rewardSchema.parse({
    imageUrl: raw.imageUrl,
    title: raw.title,
    description: raw.description === '' ? null : raw.description,
    awardedBy: raw.awardedBy === '' ? null : raw.awardedBy,
    awardedDate: raw.awardedDate || null,
  });

  const item = await prisma.rewardRecognition.create({
    data: {
      imageUrl: body.imageUrl,
      title: body.title,
      description: body.description || null,
      awardedBy: body.awardedBy || null,
      awardedDate: body.awardedDate ? new Date(body.awardedDate) : null,
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
  const body = rewardSchema.partial().parse({
    imageUrl: raw.imageUrl,
    title: raw.title,
    description: raw.description === '' ? null : raw.description,
    awardedBy: raw.awardedBy === '' ? null : raw.awardedBy,
    awardedDate: raw.awardedDate || null,
  });

  const data: any = {};
  if (body.imageUrl !== undefined) data.imageUrl = body.imageUrl;
  if (body.title !== undefined) data.title = body.title;
  if (body.description !== undefined) data.description = body.description;
  if (body.awardedBy !== undefined) data.awardedBy = body.awardedBy;
  if (body.awardedDate !== undefined) data.awardedDate = body.awardedDate ? new Date(body.awardedDate) : null;

  const updated = await prisma.rewardRecognition.update({ where: { id }, data });
  return NextResponse.json(updated);
}

export async function DELETE(req: NextRequest) {
  const auth = await verifyAdminAuth(req);
  if (!auth.authorized) return unauthorizedResponse();

  const { searchParams } = new URL(req.url);
  const id = Number(searchParams.get('id'));
  if (!id) return NextResponse.json({ error: 'ID is required' }, { status: 400 });

  await prisma.rewardRecognition.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

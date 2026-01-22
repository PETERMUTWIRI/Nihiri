import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const prisma = new PrismaClient();

const createSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  category: z.enum(['News','Impact Story','Event Recap','Advocacy','Opinion']),
  cover: z.string().optional(),
});

/* GET /api/blog?category=News */
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const posts = await prisma.post.findMany({
    where: category && category !== 'All' ? { category } : {},
    orderBy: { publishedAt: 'desc' },
  });
  return NextResponse.json(posts);
}

/* POST /api/blog  (admin only) */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { title, content, category, cover } = createSchema.parse(body);
  const slug = slugify(title);
  const post = await prisma.post.create({
    data: { title, slug, content, category, cover, excerpt: content.slice(0,200) },
  });
  return NextResponse.json(post);
}

/* DELETE /api/blog?id=3 */
export async function DELETE(req: NextRequest) {
  const id = Number(req.nextUrl.searchParams.get('id'));
  await prisma.post.delete({ where: { id } });
  return NextResponse.json({ ok: true });
}

const slugify = (str: string) =>
  str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
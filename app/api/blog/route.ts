import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import { verifyAdminAuth, unauthorizedResponse } from '@/lib/auth/middleware';

const prisma = new PrismaClient();

const createSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
  category: z.enum(['News','Impact Story','Event Recap','Advocacy','Opinion']),
  cover: z.string().optional(),
});

/* GET /api/blog?category=News or GET /api/blog?id=1 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    const category = searchParams.get('category');

    if (id) {
      // Get single post by ID
      const post = await prisma.post.findUnique({
        where: { id: Number(id) },
      });
      if (!post) {
        return NextResponse.json({ error: 'Post not found' }, { status: 404 });
      }
      return NextResponse.json(post);
    }

    // Get all posts with optional category filter
    const posts = await prisma.post.findMany({
      where: category && category !== 'All' ? { category } : {},
      orderBy: { publishedAt: 'desc' },
    });
    return NextResponse.json(posts);
  } catch (error) {
    console.error('GET /api/blog error:', error);
    return NextResponse.json({ error: 'Failed to fetch posts' }, { status: 500 });
  }
}

/* POST /api/blog  (admin only) */
export async function POST(req: NextRequest) {
  try {
    const auth = await verifyAdminAuth(req);
    if (!auth.authorized) return unauthorizedResponse();

    const body = await req.json();
    const { title, content, category, cover } = createSchema.parse(body);
    const slug = slugify(title);

    const post = await prisma.post.create({
      data: { 
        title, 
        slug, 
        content, 
        category, 
        cover, 
        excerpt: content.slice(0, 200).replace(/<[^>]*>/g, '') 
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    console.error('POST /api/blog error:', error);
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request data', details: error.issues }, { status: 400 });
    }
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}

/* PUT /api/blog?id=3  (admin only) */
export async function PUT(req: NextRequest) {
  try {
    const auth = await verifyAdminAuth(req);
    if (!auth.authorized) return unauthorizedResponse();

    const id = Number(req.nextUrl.searchParams.get('id'));
    const body = await req.json();
    const { title, content, category, cover } = createSchema.parse(body);

    const post = await prisma.post.update({
      where: { id },
      data: { 
        title, 
        content, 
        category, 
        cover,
        excerpt: content.slice(0, 200).replace(/<[^>]*>/g, '')
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    console.error('PUT /api/blog error:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

/* DELETE /api/blog?id=3 (admin only) */
export async function DELETE(req: NextRequest) {
  try {
    const auth = await verifyAdminAuth(req);
    if (!auth.authorized) return unauthorizedResponse();

    const id = Number(req.nextUrl.searchParams.get('id'));
    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('DELETE /api/blog error:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}

const slugify = (str: string) =>
  str.toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/[\s_-]+/g, '-').replace(/^-+|-+$/g, '');
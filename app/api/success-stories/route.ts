import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch approved success stories
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const featured = searchParams.get('featured');
    const limit = parseInt(searchParams.get('limit') || '10');

    const stories = await prisma.successStory.findMany({
      where: {
        approved: true,
        deletedAt: null,
        ...(featured === 'true' && { featured: true }),
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
    });

    return NextResponse.json({ success: true, stories });
  } catch (error: any) {
    // If table doesn't exist yet, return empty array
    if (error?.code === 'P2021') {
      return NextResponse.json({ success: true, stories: [] });
    }
    console.error('Error fetching success stories:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch success stories' },
      { status: 500 }
    );
  }
}

// POST - Submit a new success story
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, organization, story, imageUrl } = body;

    // Validation
    if (!name || !name.trim()) {
      return NextResponse.json(
        { success: false, error: 'Name is required' },
        { status: 400 }
      );
    }

    if (!story || !story.trim()) {
      return NextResponse.json(
        { success: false, error: 'Story is required' },
        { status: 400 }
      );
    }

    if (story.length > 2000) {
      return NextResponse.json(
        { success: false, error: 'Story must be less than 2000 characters' },
        { status: 400 }
      );
    }

    const newStory = await prisma.successStory.create({
      data: {
        name: name.trim(),
        organization: organization?.trim() || null,
        story: story.trim(),
        imageUrl: imageUrl?.trim() || null,
        approved: false, // Requires admin approval
      },
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you for sharing your story! It will be reviewed and published soon.',
      story: newStory,
    });
  } catch (error: any) {
    // If table doesn't exist yet
    if (error?.code === 'P2021') {
      return NextResponse.json(
        { success: false, error: 'Story submission is temporarily unavailable. Please try again later.' },
        { status: 503 }
      );
    }
    console.error('Error creating success story:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit story' },
      { status: 500 }
    );
  }
}

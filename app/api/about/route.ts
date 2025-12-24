import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import About from '@/models/About';

// GET: Fetch about information
export async function GET() {
  try {
    await dbConnect();
    const about = await About.findOne({}).lean();
    if (!about) {
      return NextResponse.json([], { status: 200 }); // Return empty array for consistency
    }
    return NextResponse.json([about], { status: 200 }); // Return as array for frontend .map compatibility
  } catch (error) {
    console.error('GET about error:', error);
    return NextResponse.json({ error: 'Failed to fetch about information' }, { status: 500 });
  }
}

// POST: Create about information (only one document allowed)
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    // Check if about already exists
    const existing = await About.findOne({});
    if (existing) {
      return NextResponse.json(
        { error: 'About information already exists. Use PUT to update.' },
        { status: 400 }
      );
    }

    const about = new About(body);
    await about.save();
    return NextResponse.json(about, { status: 201 });
  } catch (error) {
    console.error('POST about error:', error);
    return NextResponse.json({ error: 'Failed to create about information' }, { status: 500 });
  }
}

// PUT: Update about information
export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const about = await About.findOneAndUpdate(
      {},
      {
        ...body,
        updatedAt: new Date(),
      },
      { new: true, upsert: true }
    ).lean();

    return NextResponse.json(about);
  } catch (error) {
    console.error('PUT about error:', error);
    return NextResponse.json({ error: 'Failed to update about information' }, { status: 500 });
  }
}

// DELETE: Delete about information
export async function DELETE(req: Request) {
  try {
    await dbConnect();

    const result = await About.findOneAndDelete({}).lean();
    
    if (!result) {
      return NextResponse.json(
        { message: 'About content not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE about error:', error);
    return NextResponse.json({ error: 'Failed to delete about information' }, { status: 500 });
  }
}
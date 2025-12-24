import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Experience from '@/models/Experience';

// GET: Fetch all experiences
export async function GET() {
  try {
    await dbConnect();
    const experiences = await Experience.find({}).sort({ startDate: -1 }).lean();
    // Always return an array for frontend .map compatibility
    return NextResponse.json(Array.isArray(experiences) ? experiences : []);
  } catch (error) {
    console.error('GET experiences error:', error);
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 });
  }
}

// POST: Create a new experience
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    
    const payload = {
      ...body,
      startDate: body.startDate ? new Date(body.startDate) : new Date(),
      endDate: body.endDate ? new Date(body.endDate) : undefined,
      achievements: Array.isArray(body.achievements) 
        ? body.achievements 
        : body.achievements?.split('\n').map((a: string) => a.trim()).filter(Boolean) || [],
    };
    
    const experience = new Experience(payload);
    await experience.save();
    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    console.error('POST experience error:', error);
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 });
  }
}

// PUT: Update an existing experience (expects _id in body)
export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { _id, ...update } = body;

    if (!_id) {
      return NextResponse.json({ message: 'Experience _id is required' }, { status: 400 });
    }

    const payload = {
      ...update,
      startDate: update.startDate ? new Date(update.startDate) : undefined,
      endDate: update.endDate ? new Date(update.endDate) : undefined,
      achievements: Array.isArray(update.achievements) 
        ? update.achievements 
        : update.achievements?.split('\n').map((a: string) => a.trim()).filter(Boolean) || [],
    };

    const experience = await Experience.findOneAndUpdate(
      { _id },
      payload,
      { new: true }
    ).lean();
    
    if (!experience) {
      return NextResponse.json({ message: 'Experience not found' }, { status: 404 });
    }
    
    return NextResponse.json(experience);
  } catch (error) {
    console.error('PUT experience error:', error);
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 });
  }
}

// DELETE: Delete an experience (expects _id in body)
export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { _id } = await req.json();

    if (!_id) {
      return NextResponse.json({ message: 'Experience _id is required' }, { status: 400 });
    }

    const result = await Experience.findOneAndDelete({ _id }).lean();
    
    if (!result) {
      return NextResponse.json({ message: 'Experience not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE experience error:', error);
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 });
  }
}

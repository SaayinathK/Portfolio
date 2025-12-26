import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Achievement from '@/models/Achievement';

// GET: Fetch all achievements
export async function GET() {
  try {
    await dbConnect();
    const achievements = await Achievement.find({}).sort({ createdAt: -1 }).lean();
    // Always return an array for frontend .map compatibility
      return NextResponse.json(Array.isArray(achievements) ? achievements : []);
  } catch (error) {
    console.error('GET achievements error:', error);
    return NextResponse.json({ error: 'Failed to fetch achievements' }, { status: 500 });
  }
}

// POST: Create a new achievement
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const achievement = new Achievement(body);
    await achievement.save();
    return NextResponse.json(achievement, { status: 201 });
  } catch (error) {
    console.error('POST achievement error:', error);
    return NextResponse.json({ error: 'Failed to create achievement' }, { status: 500 });
  }
}

// PUT: Update an existing achievement (expects _id in body)
export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { _id, ...update } = body;

    if (!_id) {
      return NextResponse.json({ message: 'Achievement _id is required' }, { status: 400 });
    }

    const achievement = await Achievement.findOneAndUpdate(
      { _id },
      update,
      { new: true }
    ).lean();
    
    if (!achievement) {
      return NextResponse.json({ message: 'Achievement not found' }, { status: 404 });
    }
    
    return NextResponse.json(achievement);
  } catch (error) {
    console.error('PUT achievement error:', error);
    return NextResponse.json({ error: 'Failed to update achievement' }, { status: 500 });
  }
}

// DELETE: Delete an achievement (expects _id in body)
export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { _id } = await req.json();

    if (!_id) {
      return NextResponse.json({ message: 'Achievement _id is required' }, { status: 400 });
    }

    const result = await Achievement.findOneAndDelete({ _id }).lean();
    
    if (!result) {
      return NextResponse.json({ message: 'Achievement not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE achievement error:', error);
    return NextResponse.json({ error: 'Failed to delete achievement' }, { status: 500 });
  }
}



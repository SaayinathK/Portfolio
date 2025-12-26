import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Experience from '@/models/Experience';

/* GET: Fetch all experiences */
export async function GET() {
  try {
    await dbConnect();
    const experiences = await Experience.find({})
      .sort({ startDate: -1 })
      .lean();
    return NextResponse.json(Array.isArray(experiences) ? experiences : []);
  } catch (error) {
    console.error('GET /api/experience error:', error);
    return NextResponse.json({ error: 'Failed to fetch experiences' }, { status: 500 });
  }
}

/* POST: Create a new experience */
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

    const experience = await Experience.create(payload);
    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    console.error('POST /api/experience error:', error);
    return NextResponse.json({ error: 'Failed to create experience' }, { status: 500 });
  }
}

/* PUT: Update an existing experience */
export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { _id, ...update } = body;

    if (!_id) {
      return NextResponse.json({ error: 'Experience _id is required' }, { status: 400 });
    }

    const payload: any = {
      ...update,
      startDate: update.startDate ? new Date(update.startDate) : undefined,
      endDate: update.endDate ? new Date(update.endDate) : undefined,
      achievements: Array.isArray(update.achievements)
        ? update.achievements
        : update.achievements?.split('\n').map((a: string) => a.trim()).filter(Boolean) || [],
    };

    // Remove undefined fields to prevent overwriting existing data
    Object.keys(payload).forEach(key => payload[key] === undefined && delete payload[key]);

    const experience = await Experience.findOneAndUpdate({ _id }, payload, { new: true }).lean();

    if (!experience) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }

    return NextResponse.json(experience);
  } catch (error) {
    console.error('PUT /api/experience error:', error);
    return NextResponse.json({ error: 'Failed to update experience' }, { status: 500 });
  }
}

/* DELETE: Delete an experience */
export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { _id } = await req.json();

    if (!_id) {
      return NextResponse.json({ error: 'Experience _id is required' }, { status: 400 });
    }

    const deleted = await Experience.findOneAndDelete({ _id }).lean();

    if (!deleted) {
      return NextResponse.json({ error: 'Experience not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/experience error:', error);
    return NextResponse.json({ error: 'Failed to delete experience' }, { status: 500 });
  }
}

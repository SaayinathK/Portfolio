import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Education from '@/models/Education';

// GET: Fetch all education records
export async function GET() {
  try {
    await dbConnect();
    const educations = await Education.find({}).sort({ startDate: -1 }).lean();
    return NextResponse.json(educations);
  } catch (error) {
    console.error('GET education error:', error);
    return NextResponse.json({ error: 'Failed to fetch education records' }, { status: 500 });
  }
}

// POST: Create a new education record
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    const payload = {
      ...body,
      activities: Array.isArray(body.activities)
        ? body.activities
        : body.activities?.split('\n').map((a: string) => a.trim()).filter(Boolean) || [],
    };

    const education = new Education(payload);
    await education.save();
    return NextResponse.json(education, { status: 201 });
  } catch (error) {
    console.error('POST education error:', error);
    return NextResponse.json({ error: 'Failed to create education record' }, { status: 500 });
  }
}

// PUT: Update an existing education record
export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { _id, ...update } = body;

    if (!_id) {
      return NextResponse.json({ message: 'Education _id is required' }, { status: 400 });
    }

    const payload = {
      ...update,
      activities: Array.isArray(update.activities)
        ? update.activities
        : update.activities?.split('\n').map((a: string) => a.trim()).filter(Boolean) || [],
      updatedAt: new Date(),
    };

    const education = await Education.findOneAndUpdate(
      { _id },
      payload,
      { new: true }
    ).lean();

    if (!education) {
      return NextResponse.json({ message: 'Education record not found' }, { status: 404 });
    }

    return NextResponse.json(education);
  } catch (error) {
    console.error('PUT education error:', error);
    return NextResponse.json({ error: 'Failed to update education record' }, { status: 500 });
  }
}

// DELETE: Delete an education record
export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { _id } = await req.json();

    if (!_id) {
      return NextResponse.json({ message: 'Education _id is required' }, { status: 400 });
    }

    const result = await Education.findOneAndDelete({ _id }).lean();

    if (!result) {
      return NextResponse.json({ message: 'Education record not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE education error:', error);
    return NextResponse.json({ error: 'Failed to delete education record' }, { status: 500 });
  }
}
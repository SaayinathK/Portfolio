import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Skill from '@/models/Skill';

/* GET: Fetch all skills */
export async function GET() {
  try {
    await dbConnect();
    const skills = await Skill.find({}).sort({ createdAt: -1 }).lean();
    // Always return an array for frontend .map/filter
    return NextResponse.json(Array.isArray(skills) ? skills : []);
  } catch (error) {
    console.error('GET /api/skills error:', error);
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
  }
}

/* POST: Create a new skill */
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    // Validate required fields
    if (!body.type || !body.name) {
      return NextResponse.json(
        { error: 'Skill type and name are required' },
        { status: 400 }
      );
    }

    const skill = await Skill.create(body);
    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.error('POST /api/skills error:', error);
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 });
  }
}

/* PUT: Update an existing skill */
export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { _id, ...update } = body;

    if (!_id) {
      return NextResponse.json({ error: 'Skill _id is required' }, { status: 400 });
    }

    const skill = await Skill.findOneAndUpdate({ _id }, update, { new: true }).lean();

    if (!skill) {
      return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
    }

    return NextResponse.json(skill);
  } catch (error) {
    console.error('PUT /api/skills error:', error);
    return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 });
  }
}

/* DELETE: Delete a skill */
export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { _id } = await req.json();

    if (!_id) {
      return NextResponse.json({ error: 'Skill _id is required' }, { status: 400 });
    }

    const deleted = await Skill.findOneAndDelete({ _id }).lean();

    if (!deleted) {
      return NextResponse.json({ error: 'Skill not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/skills error:', error);
    return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 });
  }
}

import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Skill from '@/models/Skill';

// GET: Fetch all skills
export async function GET() {
  try {
    await dbConnect();
    const skills = await Skill.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(skills);
  } catch (error) {
    console.error('GET skills error:', error);
    return NextResponse.json({ error: 'Failed to fetch skills' }, { status: 500 });
  }
}

// POST: Create a new skill
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const skill = new Skill(body);
    await skill.save();
    return NextResponse.json(skill, { status: 201 });
  } catch (error) {
    console.error('POST skill error:', error);
    return NextResponse.json({ error: 'Failed to create skill' }, { status: 500 });
  }
}

// PUT: Update an existing skill (expects _id in body)
export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { _id, ...update } = body;

    if (!_id) {
      return NextResponse.json({ message: 'Skill _id is required' }, { status: 400 });
    }

    const skill = await Skill.findOneAndUpdate(
      { _id },
      update,
      { new: true }
    ).lean();

    if (!skill) {
      return NextResponse.json({ message: 'Skill not found' }, { status: 404 });
    }

    return NextResponse.json(skill);
  } catch (error) {
    console.error('PUT skill error:', error);
    return NextResponse.json({ error: 'Failed to update skill' }, { status: 500 });
  }
}

// DELETE: Delete a skill (expects _id in body)
export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { _id } = await req.json();

    if (!_id) {
      return NextResponse.json({ message: 'Skill _id is required' }, { status: 400 });
    }

    const result = await Skill.findOneAndDelete({ _id }).lean();

    if (!result) {
      return NextResponse.json({ message: 'Skill not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE skill error:', error);
    return NextResponse.json({ error: 'Failed to delete skill' }, { status: 500 });
  }
}



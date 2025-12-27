import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';

/* GET: Fetch all projects */
export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(Array.isArray(projects) ? projects : []);
  } catch (error) {
    console.error('GET /api/projects error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

/* POST: Create a new project (base64 image, like achievements) */
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    // Accepts imageUrl as base64 string (like achievements)
    const payload = {
      ...body,
      tags: Array.isArray(body.tags) ? body.tags : (body.tags?.split(',').map((t: string) => t.trim()).filter(Boolean) || []),
      technologies: Array.isArray(body.technologies) ? body.technologies : (body.technologies?.split(',').map((t: string) => t.trim()).filter(Boolean) || []),
    };

    const project = await Project.create(payload);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('POST /api/projects error:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

/* PUT: Update existing project */
export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { _id, ...update } = body;

    if (!_id) return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });

    const payload = {
      ...update,
      tags: Array.isArray(update.tags) ? update.tags : (update.tags?.split(',').map((t: string) => t.trim()).filter(Boolean) || []),
      technologies: Array.isArray(update.technologies) ? update.technologies : (update.technologies?.split(',').map((t: string) => t.trim()).filter(Boolean) || []),
    };

    const project = await Project.findOneAndUpdate({ _id }, payload, { new: true }).lean();
    if (!project) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

    return NextResponse.json(project);
  } catch (error) {
    console.error('PUT /api/projects error:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

/* DELETE: Delete a project */
export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { _id } = await req.json();
    if (!_id) return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });

    const deleted = await Project.findOneAndDelete({ _id }).lean();
    if (!deleted) return NextResponse.json({ error: 'Project not found' }, { status: 404 });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE /api/projects error:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}

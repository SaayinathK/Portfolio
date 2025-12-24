import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Project from '@/models/Project';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// GET: Fetch all projects
export async function GET() {
  try {
    await dbConnect();
    const projects = await Project.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(projects);
  } catch (error) {
    console.error('GET projects error:', error);
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 });
  }
}

// POST: Handle both upload and create project
export async function POST(req: Request) {
  const url = new URL(req.url);
  
  // Handle image upload
  if (url.searchParams.get('action') === 'upload') {
    try {
      const formData = await req.formData();
      const file = formData.get('file') as File;

      if (!file) {
        return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        return NextResponse.json({ error: 'Only image files are allowed' }, { status: 400 });
      }

      // Validate file size (5MB)
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json({ error: 'File size must be less than 5MB' }, { status: 400 });
      }

      // Convert file to buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Generate unique filename
      const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
      const ext = path.extname(file.name);
      const nameWithoutExt = path.basename(file.name, ext);
      const filename = `${nameWithoutExt}-${uniqueSuffix}${ext}`.replace(/\s/g, '-');
      
      // Create uploads directory if it doesn't exist
      const uploadDir = path.join(process.cwd(), 'public', 'uploads');
      await mkdir(uploadDir, { recursive: true });

      // Save file
      const filepath = path.join(uploadDir, filename);
      await writeFile(filepath, buffer);

      // Return public URL
      const imageUrl = `/uploads/${filename}`;
      return NextResponse.json({ 
        url: imageUrl, 
        filename,
        size: file.size,
        type: file.type 
      }, { status: 200 });

    } catch (error) {
      console.error('Upload error:', error);
      return NextResponse.json({ 
        error: 'Upload failed', 
        details: error instanceof Error ? error.message : 'Unknown error' 
      }, { status: 500 });
    }
  }

  // Handle create project
  try {
    await dbConnect();
    const body = await req.json();
    
    const payload = {
      ...body,
      tags: Array.isArray(body.tags) ? body.tags : body.tags?.split(',').map((t: string) => t.trim()).filter(Boolean) || [],
      technologies: Array.isArray(body.technologies) ? body.technologies : body.technologies?.split(',').map((t: string) => t.trim()).filter(Boolean) || [],
    };
    
    const project = new Project(payload);
    await project.save();
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error('POST project error:', error);
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 });
  }
}

// PUT: Update an existing project
export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { _id, ...update } = body;

    if (!_id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    const payload = {
      ...update,
      tags: Array.isArray(update.tags) ? update.tags : update.tags?.split(',').map((t: string) => t.trim()).filter(Boolean) || [],
      technologies: Array.isArray(update.technologies) ? update.technologies : update.technologies?.split(',').map((t: string) => t.trim()).filter(Boolean) || [],
    };

    const project = await Project.findOneAndUpdate(
      { _id },
      payload,
      { new: true }
    ).lean();
    
    if (!project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    
    return NextResponse.json(project);
  } catch (error) {
    console.error('PUT project error:', error);
    return NextResponse.json({ error: 'Failed to update project' }, { status: 500 });
  }
}

// DELETE: Delete a project
export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { _id } = await req.json();

    if (!_id) {
      return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
    }

    const result = await Project.findOneAndDelete({ _id }).lean();
    
    if (!result) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE project error:', error);
    return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
  }
}



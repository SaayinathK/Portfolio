import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Gallery from '@/models/Gallery';

// GET: Fetch all gallery items
export async function GET() {
  try {
    await dbConnect();
    const items = await Gallery.find({}).sort({ createdAt: -1 }).lean();
    return NextResponse.json(items);
  } catch (error) {
    console.error('GET gallery error:', error);
    return NextResponse.json({ error: 'Failed to fetch gallery items' }, { status: 500 });
  }
}

// POST: Create a new gallery item
export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const item = new Gallery(body);
    await item.save();
    return NextResponse.json(item, { status: 201 });
  } catch (error) {
    console.error('POST gallery error:', error);
    return NextResponse.json({ error: 'Failed to create gallery item' }, { status: 500 });
  }
}

// PUT: Update an existing gallery item
export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const { _id, ...update } = body;

    if (!_id) {
      return NextResponse.json({ message: 'Gallery _id is required' }, { status: 400 });
    }

    const item = await Gallery.findOneAndUpdate(
      { _id },
      update,
      { new: true }
    ).lean();
    
    if (!item) {
      return NextResponse.json({ message: 'Gallery item not found' }, { status: 404 });
    }
    
    return NextResponse.json(item);
  } catch (error) {
    console.error('PUT gallery error:', error);
    return NextResponse.json({ error: 'Failed to update gallery item' }, { status: 500 });
  }
}

// DELETE: Delete a gallery item
export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const { _id } = await req.json();

    if (!_id) {
      return NextResponse.json({ message: 'Gallery _id is required' }, { status: 400 });
    }

    const result = await Gallery.findOneAndDelete({ _id }).lean();
    
    if (!result) {
      return NextResponse.json({ message: 'Gallery item not found' }, { status: 404 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('DELETE gallery error:', error);
    return NextResponse.json({ error: 'Failed to delete gallery item' }, { status: 500 });
  }
}



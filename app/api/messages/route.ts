import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Message from "@/models/Message";

export async function GET() {
  await dbConnect();
  const items = await Message.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();

    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "name, email, and message are required" },
        { status: 400 }
      );
    }

    const created = await Message.create({
      name: body.name,
      email: body.email,
      message: body.message,
      status: body.status || "new",
    });

    return NextResponse.json(created, { status: 201 });
  } catch (error: any) {
    console.error("Error creating message:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create message" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  await dbConnect();
  const body = await req.json();
  if (!body._id) return NextResponse.json({ error: "_id is required" }, { status: 400 });
  const updated = await Message.findByIdAndUpdate(body._id, body, { new: true }).lean();
  return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
  await dbConnect();
  const body = await req.json();
  if (!body._id) return NextResponse.json({ error: "_id is required" }, { status: 400 });
  await Message.findByIdAndDelete(body._id);
  return NextResponse.json({ ok: true });
}

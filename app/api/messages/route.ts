import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Message from "@/models/Message";

export async function GET() {
  try {
    await dbConnect();
    const items = await Message.find().sort({ createdAt: -1 }).lean();
    // Always return an array for frontend .map compatibility
    return NextResponse.json(Array.isArray(items) ? items : []);
  } catch (error) {
    console.error("GET messages error:", error);
    return NextResponse.json({ error: "Failed to fetch messages" }, { status: 500 });
  }
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
    console.error("POST message error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create message" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    if (!body._id) return NextResponse.json({ error: "_id is required" }, { status: 400 });
    const updated = await Message.findByIdAndUpdate(body._id, body, { new: true }).lean();
    if (!updated) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT message error:", error);
    return NextResponse.json({ error: "Failed to update message" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    if (!body._id) return NextResponse.json({ error: "_id is required" }, { status: 400 });
    const deleted = await Message.findByIdAndDelete(body._id);
    if (!deleted) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE message error:", error);
    return NextResponse.json({ error: "Failed to delete message" }, { status: 500 });
  }
}

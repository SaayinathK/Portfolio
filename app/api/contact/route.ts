import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Contact from "@/models/Contact";

export async function GET() {
  try {
    await dbConnect();
    const items = await Contact.find().sort({ createdAt: -1 }).lean();
    // Always return an array for frontend .map compatibility
    return NextResponse.json(Array.isArray(items) ? items : []);
  } catch (error) {
    console.error("GET contact error:", error);
    return NextResponse.json({ error: "Failed to fetch contacts" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    const created = await Contact.create(body);
    return NextResponse.json(created, { status: 201 });
  } catch (error) {
    console.error("POST contact error:", error);
    return NextResponse.json({ error: "Failed to create contact" }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    if (!body._id) return NextResponse.json({ error: "_id is required" }, { status: 400 });
    const updated = await Contact.findByIdAndUpdate(body._id, body, { new: true }).lean();
    if (!updated) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }
    return NextResponse.json(updated);
  } catch (error) {
    console.error("PUT contact error:", error);
    return NextResponse.json({ error: "Failed to update contact" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  try {
    await dbConnect();
    const body = await req.json();
    if (!body._id) return NextResponse.json({ error: "_id is required" }, { status: 400 });
    const deleted = await Contact.findByIdAndDelete(body._id);
    if (!deleted) {
      return NextResponse.json({ error: "Contact not found" }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("DELETE contact error:", error);
    return NextResponse.json({ error: "Failed to delete contact" }, { status: 500 });
  }
}
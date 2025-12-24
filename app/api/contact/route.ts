import { NextResponse } from "next/server";
import dbConnect from "@/lib/db";
import Contact from "@/models/Contact";

export async function GET() {
  await dbConnect();
  const items = await Contact.find().sort({ createdAt: -1 }).lean();
  return NextResponse.json(items);
}

export async function POST(req: Request) {
  await dbConnect();
  const body = await req.json();
  const created = await Contact.create(body);
  return NextResponse.json(created, { status: 201 });
}

export async function PUT(req: Request) {
  await dbConnect();
  const body = await req.json();
  if (!body._id) return NextResponse.json({ error: "_id is required" }, { status: 400 });
  const updated = await Contact.findByIdAndUpdate(body._id, body, { new: true }).lean();
  return NextResponse.json(updated);
}

export async function DELETE(req: Request) {
  await dbConnect();
  const body = await req.json();
  if (!body._id) return NextResponse.json({ error: "_id is required" }, { status: 400 });
  await Contact.findByIdAndDelete(body._id);
  return NextResponse.json({ ok: true });
}
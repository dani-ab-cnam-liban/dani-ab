import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signToken, setSessionCookie, publicUser } from "@/lib/auth";
 
const HANDLE_RE = /^[a-zA-Z0-9_]{3,15}$/;
 
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }
 
  const { handle, email, password, displayName } = body;
 
  if (!handle || !HANDLE_RE.test(handle)) {
    return NextResponse.json(
      { error: "Handle must be 3-15 characters: letters, numbers, underscores." },
      { status: 400 }
    );
  }
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }
  if (!password || password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters." },
      { status: 400 }
    );
  }
  if (!displayName || !displayName.trim()) {
    return NextResponse.json({ error: "Display name is required." }, { status: 400 });
  }
 
  const existing = await prisma.user.findFirst({
    where: { OR: [{ handle }, { email }] },
  });
  if (existing) {
    return NextResponse.json(
      { error: "Handle or email already in use." },
      { status: 409 }
    );
  }
 
  
  const hashedPassword = await bcrypt.hash(password, 10);
 
  const user = await prisma.user.create({
    data: { handle, email, passwordHash: hashedPassword, displayName: displayName.trim() },
  });
 
  const token = signToken(user.id);
  await setSessionCookie(token);
 
  return NextResponse.json({ user: publicUser(user) }, { status: 201 });
}
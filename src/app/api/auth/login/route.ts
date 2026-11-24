import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { signToken, setSessionCookie, publicUser } from "@/lib/auth";
 
export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => null);
  if (!body?.identifier || !body?.password) {
    return NextResponse.json(
      { error: "Email/handle and password are required." },
      { status: 400 }
    );
  }
 
  const { identifier, password } = body;
 
  const user = await prisma.user.findFirst({
    where: { OR: [{ email: identifier }, { handle: identifier }] },
  });
 
  if (!user) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }
 
  
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    return NextResponse.json({ error: "Invalid credentials." }, { status: 401 });
  }
 
  const token = signToken(user.id);
  await setSessionCookie(token);
 
  return NextResponse.json({ user: publicUser(user) });
}
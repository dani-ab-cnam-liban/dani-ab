import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { prisma } from "./prisma";
import type { User } from "@/generated/prisma/client";
 
const JWT_SECRET = process.env.JWT_SECRET || "dev-only-secret-change-me";
const COOKIE_NAME = "session";
const SESSION_DAYS = 7;
 
export type SafeUser = Omit<User, "passwordHash">;
 
interface TokenPayload {
  sub: string;
}
 
export function signToken(userId: string): string {
  return jwt.sign({ sub: userId }, JWT_SECRET, {
    expiresIn: `${SESSION_DAYS}d`,
  });
}
 
export function verifyToken(token: string): TokenPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as TokenPayload;
  } catch {
    return null;
  }
}
 
// cookies() is async as of Next.js 15+ — every caller must await these.
export async function setSessionCookie(token: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_DAYS * 24 * 60 * 60,
  });
}
 
export async function clearSessionCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, "", { path: "/", maxAge: 0 });
}
 
export async function getCurrentUser(): Promise<SafeUser | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  if (!token) return null;
 
  const payload = verifyToken(token);
  if (!payload?.sub) return null;
 
  const user = await prisma.user.findUnique({ where: { id: payload.sub } });
  if (!user) return null;
 
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}
 
export function publicUser(user: User): Omit<User, "passwordHash" | "email"> {
  const { passwordHash, email, ...rest } = user;
  return rest;
}
import { NextResponse } from "next/server";
import { verifyCredentials, signToken } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    const text = await request.text();
    let email: string;
    let password: string;

    try {
      const parsed = JSON.parse(text);
      email = parsed.email;
      password = parsed.password;
    } catch {
      return NextResponse.json({ error: "Invalid JSON body", received: text.substring(0, 200) }, { status: 400 });
    }

    if (!email || !password) {
      return NextResponse.json({ error: "Missing fields", email: !!email, password: !!password }, { status: 400 });
    }

    const envEmail = process.env.ADMIN_EMAIL;
    const envPass = process.env.ADMIN_PASSWORD;

    if (!envEmail || !envPass) {
      return NextResponse.json({ error: "Env vars not set", emailSet: !!envEmail, passSet: !!envPass }, { status: 500 });
    }

    if (!verifyCredentials(email, password)) {
      return NextResponse.json({ error: "Invalid credentials", receivedEmail: email, expectedEmail: envEmail }, { status: 401 });
    }

    const token = await signToken({ email });

    const response = NextResponse.json({ success: true });
    response.cookies.set("admin_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24,
      path: "/",
    });

    return response;
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: "Login failed", details: message }, { status: 500 });
  }
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set("admin_token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 0,
    path: "/",
  });
  return response;
}

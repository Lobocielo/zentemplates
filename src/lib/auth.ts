import crypto from "crypto";

const SECRET = process.env.NEXTAUTH_SECRET || "zentemplates-default-secret-change-me";

export function signToken(payload: { email: string }): string {
  const header = Buffer.from(JSON.stringify({ alg: "HS256", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(JSON.stringify({ ...payload, iat: Date.now(), exp: Date.now() + 24 * 60 * 60 * 1000 })).toString("base64url");
  const signature = crypto.createHmac("sha256", SECRET).update(`${header}.${body}`).digest("base64url");
  return `${header}.${body}.${signature}`;
}

export function verifyToken(token: string): { email: string } | null {
  try {
    const [header, body, signature] = token.split(".");
    const expectedSig = crypto.createHmac("sha256", SECRET).update(`${header}.${body}`).digest("base64url");

    if (signature !== expectedSig) return null;

    const payload = JSON.parse(Buffer.from(body, "base64url").toString());
    if (payload.exp < Date.now()) return null;

    return { email: payload.email };
  } catch {
    return null;
  }
}

export function verifyCredentials(email: string, password: string): boolean {
  return (
    email === process.env.ADMIN_EMAIL &&
    password === process.env.ADMIN_PASSWORD
  );
}

const SECRET = process.env.NEXTAUTH_SECRET || "zentemplates-default-secret-change-me";

function base64url(str: string): string {
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64urlDecode(str: string): string {
  return atob(str.replace(/-/g, "+").replace(/_/g, "/"));
}

export async function signToken(payload: { email: string }): Promise<string> {
  const header = base64url(JSON.stringify({ alg: "HS256", typ: "JWT" }));
  const body = base64url(JSON.stringify({ ...payload, iat: Date.now(), exp: Date.now() + 24 * 60 * 60 * 1000 }));
  const sigData = `${header}.${body}.${SECRET}`;
  const signature = base64url(sigData);
  return `${header}.${body}.${signature}`;
}

export async function verifyToken(token: string): Promise<{ email: string } | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const [header, body, signature] = parts;
    const sigData = `${header}.${body}.${SECRET}`;
    const expectedSig = base64url(sigData);
    if (signature !== expectedSig) return null;
    const payload = JSON.parse(base64urlDecode(body));
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

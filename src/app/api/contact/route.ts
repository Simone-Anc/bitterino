import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(80).trim(),
  email: z.string().email().max(200).trim(),
  message: z.string().min(10).max(2000).trim(),
});

// Simple in-memory rate limiter: max 5 requests per IP per 10 minutes
const rateMap = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQ = 5;

function checkRate(ip: string): boolean {
  const now = Date.now();
  const entry = rateMap.get(ip);
  if (!entry || now > entry.reset) {
    rateMap.set(ip, { count: 1, reset: now + WINDOW_MS });
    return true;
  }
  if (entry.count >= MAX_REQ) return false;
  entry.count++;
  return true;
}

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown";

  if (!checkRate(ip)) {
    return NextResponse.json(
      { error: "Troppe richieste. Riprova tra qualche minuto." },
      { status: 429 }
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Payload non valido." }, { status: 400 });
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Dati non validi.", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { name, email, message } = parsed.data;

  // TODO: integrate a real email provider (Resend, SendGrid, Nodemailer…)
  // Example with Resend:
  // await resend.emails.send({ from: "no-reply@bitterino.it", to: "info@bitterino.it",
  //   subject: `Nuovo messaggio da ${name}`, text: message, replyTo: email });
  console.info("[contact]", { name, email, message: message.slice(0, 40) });

  return NextResponse.json({ ok: true }, { status: 200 });
}

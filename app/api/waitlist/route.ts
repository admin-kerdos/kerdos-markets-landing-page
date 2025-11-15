import { NextResponse } from "next/server";
import { saveWaitlistEntry } from "@/lib/waitlist";
import { isValidEmail } from "@/lib/utils";

type WaitlistPayload = {
  email?: unknown;
  locale?: unknown;
};

export async function POST(request: Request) {
  let payload: WaitlistPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const email = typeof payload.email === "string" ? payload.email : "";
  if (!isValidEmail(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const locale = typeof payload.locale === "string" ? payload.locale : undefined;

  try {
    const result = await saveWaitlistEntry({
      email,
      locale,
      ip: request.headers.get("x-forwarded-for") ?? undefined,
      userAgent: request.headers.get("user-agent") ?? undefined
    });

    if (result.status === "duplicate") {
      return NextResponse.json({ error: "duplicate" }, { status: 409 });
    }

    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    console.error("Failed to store waitlist email", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

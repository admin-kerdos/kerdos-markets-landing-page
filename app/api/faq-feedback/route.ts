import { NextResponse } from "next/server";
import { saveFaqFeedback } from "@/lib/faq-feedback";

type FeedbackPayload = {
  questionId?: unknown;
  choice?: unknown;
  locale?: unknown;
};

export async function POST(request: Request) {
  let payload: FeedbackPayload;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const questionId = typeof payload.questionId === "string" ? payload.questionId : "";
  const choice = payload.choice === "up" || payload.choice === "down" ? payload.choice : "";

  if (!questionId || !choice) {
    return NextResponse.json({ error: "invalid_payload" }, { status: 400 });
  }

  const locale = typeof payload.locale === "string" ? payload.locale : undefined;

  try {
    await saveFaqFeedback({
      questionId,
      choice,
      locale,
      ip: request.headers.get("x-forwarded-for") ?? undefined,
      userAgent: request.headers.get("user-agent") ?? undefined
    });
    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Failed to store faq feedback", error);
    return NextResponse.json({ error: "server_error" }, { status: 500 });
  }
}

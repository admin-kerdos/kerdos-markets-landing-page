import { supabaseAdmin } from "@/lib/supabase";

type FeedbackChoice = "up" | "down";

export type FaqFeedbackInput = {
  questionId: string;
  choice: FeedbackChoice;
  locale?: string;
  ip?: string;
  userAgent?: string;
};

export async function saveFaqFeedback(input: FaqFeedbackInput) {
  const { error } = await supabaseAdmin.from("faq_feedback").insert({
    question_id: input.questionId,
    choice: input.choice,
    locale: input.locale,
    ip: input.ip,
    user_agent: input.userAgent
  });

  if (error) {
    throw error;
  }
}

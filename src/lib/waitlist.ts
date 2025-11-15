import { PostgrestError } from "@supabase/supabase-js";
import { supabaseAdmin } from "@/lib/supabase";

type WaitlistEntryInput = {
  email: string;
  locale?: string;
  ip?: string;
  userAgent?: string;
};

export type WaitlistEntry = WaitlistEntryInput & {
  id: string;
  createdAt: string;
};

export type WaitlistResult =
  | { status: "created"; entry: WaitlistEntry }
  | { status: "duplicate" };

export async function saveWaitlistEntry(input: WaitlistEntryInput): Promise<WaitlistResult> {
  const normalizedEmail = input.email.trim().toLowerCase();
  const { data, error } = await supabaseAdmin
    .from("waitlist_entries")
    .insert([
      {
        email: normalizedEmail,
        locale: input.locale,
        ip: input.ip,
        user_agent: input.userAgent
      }
    ])
    .select("id,email,locale,ip,user_agent,created_at")
    .single();

  if (error) {
    if (isUniqueViolation(error)) {
      return { status: "duplicate" };
    }
    throw error;
  }

  return {
    status: "created",
    entry: {
      id: data.id,
      email: data.email,
      locale: data.locale ?? undefined,
      ip: data.ip ?? undefined,
      userAgent: data.user_agent ?? undefined,
      createdAt: data.created_at
    }
  };
}

function isUniqueViolation(error: PostgrestError) {
  return error.code === "23505" || /duplicate key/i.test(error.message);
}

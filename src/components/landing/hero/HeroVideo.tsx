"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import successAnimation from "@/../public/landing/Success.json";
import { cn, isValidEmail } from "@/lib/utils";
import { useLanguage } from "@/contexts/language-context";
import { FlowButton } from "@/components/ui/flow-button";
import { ShimmerButton } from "@/components/ui/shimmer-button";

export type HeroVideoProps = {
  src?: string;
  srcAlt?: string;
  poster?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  className?: string;
};

const defaultMp4 = "/landing/messi.mp4";
const defaultWebm = "/landing/messi.mp4";
const defaultPoster = "/landing/messi.mp4";

type SubmissionStatus = "idle" | "loading" | "success" | "duplicate" | "error";

export function HeroVideo({
  src = defaultMp4,
  srcAlt = defaultWebm,
  poster = defaultPoster,
  autoPlay = true,
  muted = true,
  loop = true,
  playsInline = true,
  className
}: HeroVideoProps) {
  const { t, language } = useLanguage();
  const heroTitle = t.hero.title;
  const heroSubtitle = t.hero.subtitle;
  const [showWaitlist, setShowWaitlist] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [feedback, setFeedback] = useState("");
  const [celebrationTrigger, setCelebrationTrigger] = useState(0);
  const wordDelay = 0.09;
  const titleWords = heroTitle.split(" ");
  const subtitleWords = heroSubtitle.split(" ");
  const subtitleBaseDelay = titleWords.length * wordDelay + 0.3;

  const renderWord = (word: string, index: number, total: number, baseDelay = 0) => (
    <span
      key={`${word}-${index}`}
      className="hero-word"
      style={{ animationDelay: `${baseDelay + index * wordDelay}s` }}
    >
      {word}
      {index < total - 1 ? "\u00A0" : ""}
    </span>
  );

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setStatus("error");
      setFeedback(t.hero.invalid);
      return;
    }

    setStatus("loading");
    setFeedback("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, locale: language })
      });

      if (response.ok) {
        setStatus("success");
        setFeedback(t.hero.success);
        setEmail("");
        setCelebrationTrigger((id) => id + 1);
        return;
      }

      if (response.status === 409) {
        setStatus("duplicate");
        setFeedback(t.hero.duplicate);
        return;
      }

      if (response.status === 400) {
        setStatus("error");
        setFeedback(t.hero.invalid);
        return;
      }

      throw new Error("waitlist submission failed");
    } catch (error) {
      console.error(error);
      setStatus("error");
      setFeedback(t.hero.error);
    }
  };

  return (
    <div className={cn("relative isolate overflow-hidden bg-black", className)}>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
      <video
        data-testid="hero-video"
        className="block h-[100svh] w-full object-cover bg-black"
        autoPlay={autoPlay}
        muted={muted}
        loop={loop}
        playsInline={playsInline}
        poster={poster}
        controls={false}
      >
        <source src={srcAlt} type="video/webm" />
        <source src={src} type="video/mp4" />
      </video>
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-6 text-center">
        <div className="pointer-events-auto flex w-full max-w-3xl flex-col items-center gap-6">
          <p className="text-3xl font-semibold tracking-tight text-white drop-shadow-[0_6px_25px_rgba(0,0,0,0.75)] sm:text-4xl lg:text-5xl">
            {titleWords.map((word, index) => renderWord(word, index, titleWords.length))}
          </p>
          <p className="text-base font-medium text-white/90 drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)] sm:text-lg">
            {subtitleWords.map((word, index) =>
              renderWord(word, index, subtitleWords.length, subtitleBaseDelay)
            )}
          </p>
          {!showWaitlist && (
            <FlowButton
              text={t.hero.ctaButton}
              theme="dark"
              onClick={() => {
                setShowWaitlist(true);
                setStatus("idle");
                setFeedback("");
              }}
            />
          )}
          {showWaitlist && (
            <div className="relative w-full max-w-lg min-h-[140px] text-left sm:text-center">
              <WaitlistCelebration trigger={celebrationTrigger} />
              <AnimatePresence>
                {status !== "success" ? (
                  <motion.form
                    key="waitlist-form"
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.25 }}
                    className="flex w-full flex-col gap-3 rounded-2xl bg-black/40 p-3 text-left shadow-[0_15px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm sm:flex-row sm:items-center sm:gap-2"
                  >
                    <label className="sr-only" htmlFor="waitlist-email">
                      {t.hero.emailPlaceholder}
                    </label>
                    <input
                      id="waitlist-email"
                      type="email"
                      value={email}
                      onChange={(event) => {
                        setEmail(event.target.value);
                        setStatus("idle");
                        setFeedback("");
                      }}
                      required
                      placeholder={t.hero.emailPlaceholder}
                      className="flex-1 rounded-xl border border-white/30 bg-white/95 px-3 py-2 text-black transition focus:border-[#fd7e14] focus:outline-none focus:ring-1 focus:ring-[#fd7e14]/40"
                    />
                    <ShimmerButton
                      type="submit"
                      disabled={status === "loading"}
                      background="rgba(253, 126, 20, 1)"
                      shimmerColor="#fff4e6"
                      shimmerDuration="2s"
                      className="px-5 py-2 text-sm font-semibold text-white"
                    >
                      <span className="relative z-10">
                        {status === "loading" ? `${t.hero.submitLabel}...` : t.hero.submitLabel}
                      </span>
                    </ShimmerButton>
                  </motion.form>
                ) : null}
              </AnimatePresence>
              <AnimatePresence>
                {status !== "idle" && feedback && status !== "success" ? (
                  <motion.p
                    key="waitlist-feedback"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.2 }}
                    className="mt-3 text-sm font-medium text-white/90 sm:text-center"
                    role="status"
                  >
                    {feedback}
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function WaitlistCelebration({ trigger }: { trigger: number }) {
  const [visible, setVisible] = useState(false);
  const animationRef = useRef<LottieRefCurrentProps>(null);

  useEffect(() => {
    if (!trigger) {
      return;
    }
    setVisible(true);
    animationRef.current?.stop();
    requestAnimationFrame(() => {
      animationRef.current?.goToAndPlay(0, true);
    });
  }, [trigger]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key={trigger}
          className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-48 max-w-full sm:w-56"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          >
            <Lottie
              key={`success-${trigger}`}
              lottieRef={animationRef}
              animationData={successAnimation}
              loop={false}
              autoplay
              onComplete={() => setVisible(false)}
              style={{ width: "100%", height: "100%" }}
              aria-hidden="true"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

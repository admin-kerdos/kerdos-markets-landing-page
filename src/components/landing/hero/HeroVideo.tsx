import { cn } from "@/lib/utils";

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
  const heroTitle = "Apostá por lo que sabés.";
  const heroSubtitle =
    "Predicción en español y portugués, precio es probabilidad y sin casa en contra.";
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
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-3xl font-semibold tracking-tight text-white drop-shadow-[0_6px_25px_rgba(0,0,0,0.75)] sm:text-4xl lg:text-5xl">
          {titleWords.map((word, index) => renderWord(word, index, titleWords.length))}
        </p>
        <p className="text-base font-medium text-white/90 drop-shadow-[0_4px_20px_rgba(0,0,0,0.7)] sm:text-lg">
          {subtitleWords.map((word, index) =>
            renderWord(word, index, subtitleWords.length, subtitleBaseDelay)
          )}
        </p>
      </div>
    </div>
  );
}

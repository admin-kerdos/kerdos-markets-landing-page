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
    </div>
  );
}

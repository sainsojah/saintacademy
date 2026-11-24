import { marqueeItems } from "@/lib/content";

function Group() {
  return (
    <div className="flex shrink-0 items-center gap-gutter-xl pr-gutter-xl">
      {marqueeItems.map((t) => (
        <span key={t} className="flex items-center gap-gutter-xl">
          <span className="font-mono text-mono-sm uppercase tracking-widest text-on-surface-variant">{t}</span>
          <span className="text-primary" aria-hidden="true">◆</span>
        </span>
      ))}
    </div>
  );
}

export function Marquee() {
  return (
    <div className="overflow-hidden border-y border-outline-variant bg-surface-container-lowest py-4" aria-hidden="true">
      <div className="marquee-track flex w-max animate-marquee whitespace-nowrap hover:[animation-play-state:paused]">
        <Group />
        <Group />
      </div>
    </div>
  );
}

import { skills } from "@/data/portfolio";

// Bandeau défilant de toutes les technologies (liste doublée pour une boucle sans saut).
export function StackMarquee() {
  const items = [...skills, ...skills];
  return (
    <div
      aria-label="Technologies utilisées"
      className="relative overflow-hidden border-y border-line bg-ink-2 py-5 [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
    >
      <ul className="animate-marquee flex w-max gap-10 whitespace-nowrap font-mono text-sm text-muted">
        {items.map((s, i) => (
          <li key={`${s.id}-${i}`} aria-hidden={i >= skills.length} className="flex items-center gap-10">
            {s.label}
            <span className="text-accent/50">✦</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

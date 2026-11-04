import Link from "next/link";
import { projectUrl, projects, type Project } from "@/data/portfolio";
import { Reveal, SectionTitle } from "./Reveal";

// Regroupe les projets par mois, du plus récent au plus ancien.
const byMonth = [...projects]
  .sort((a, b) => b.date.localeCompare(a.date))
  .reduce<[string, Project[]][]>((groups, p) => {
    const last = groups.at(-1);
    if (last?.[0] === p.date) last[1].push(p);
    else groups.push([p.date, [p]]);
    return groups;
  }, []);

const monthLabel = (d: string) =>
  new Date(`${d}-01T12:00:00`).toLocaleDateString("fr-FR", { month: "long", year: "numeric" });

export function Timeline() {
  return (
    <section>
      <div className="mx-auto max-w-6xl px-5 pt-36 pb-28">
        <SectionTitle kicker="Parcours" title="Une année de projets, mois par mois." />

        <ol className="relative ml-1 border-l border-line pl-8">
          {byMonth.map(([month, items], i) => (
            <li key={month} className="relative pb-12 last:pb-0">
              <span className="absolute top-1 -left-[37px] size-2.5 rounded-full bg-accent ring-4 ring-ink" />
              <Reveal delay={Math.min(i * 0.05, 0.3)}>
                <p className="font-mono text-xs uppercase tracking-widest text-accent">{monthLabel(month)}</p>
                <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                  {items.map((p) => (
                    <li key={p.repo}>
                      <Link
                        href={projectUrl(p)}
                        className="block rounded-xl border border-line p-4 transition-colors hover:border-accent/40 hover:bg-white/[0.03]"
                      >
                        <p className="font-medium">{p.title}</p>
                        <p className="mt-1 text-sm text-muted">{p.tagline}</p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/data/portfolio";
import { ProjectCard } from "./ProjectCard";
import { Reveal, SectionTitle } from "./Reveal";

const featured = projects.filter((p) => p.featured).sort((a, b) => b.date.localeCompare(a.date));

// Aperçu des projets phares sur l'accueil, avec liens vers les autres pages.
export function FeaturedProjects() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-28">
      <SectionTitle kicker="Projets phares" title="Une sélection de ce que j'ai construit." />

      <ul className="grid gap-5 md:grid-cols-2">
        {featured.map((p) => (
          <ProjectCard key={p.repo} project={p} />
        ))}
      </ul>

      <Reveal className="mt-12 grid gap-4 sm:grid-cols-3">
        {[
          { href: "/competences", title: "Toutes les compétences", text: `${projects.length} projets filtrables par technologie` },
          { href: "/parcours", title: "Mon parcours", text: "Les projets mois par mois" },
          { href: "/contact", title: "Me contacter", text: "Stage, alternance ou projet" },
        ].map((c) => (
          <Link
            key={c.href}
            href={c.href}
            className="group rounded-2xl border border-line bg-ink-2 p-6 transition-colors hover:border-accent/50"
          >
            <p className="flex items-center justify-between font-display text-lg font-semibold">
              {c.title}
              <ArrowRight className="size-4 text-accent transition-transform group-hover:translate-x-1" />
            </p>
            <p className="mt-1 text-sm text-muted">{c.text}</p>
          </Link>
        ))}
      </Reveal>
    </section>
  );
}

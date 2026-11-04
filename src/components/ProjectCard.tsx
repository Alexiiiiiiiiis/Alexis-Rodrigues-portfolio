"use client";

import type { MouseEvent } from "react";
import { ArrowUpRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { projectUrl, repoUrl, skills, type Project } from "@/data/portfolio";

export const skillById = new Map(skills.map((s) => [s.id, s]));

const formatDate = (d: string) =>
  new Date(`${d}-01T12:00:00`).toLocaleDateString("fr-FR", { month: "short", year: "numeric" });

export const cardClass =
  "spotlight group flex flex-col rounded-2xl border border-line bg-ink-2 p-6 transition-colors hover:border-accent/30";

// Place le halo de la carte sous le curseur.
export const onSpotlightMove = (e: MouseEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
};

// Carte simple (sans librairie d'animation), utilisée sur l'accueil.
export function ProjectCard({ project }: { project: Project }) {
  return (
    <li onMouseMove={onSpotlightMove} className={`card-in ${cardClass}`}>
      <ProjectCardBody project={project} />
    </li>
  );
}

export function ProjectCardBody({ project: p, highlight = null }: { project: Project; highlight?: string | null }) {
  return (
    <>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-xs text-muted">
            {formatDate(p.date)} · {p.tagline}
          </p>
          <h3 className="mt-2 flex items-center gap-2 font-display text-2xl font-semibold tracking-tight">
            {/* Le lien couvre toute la carte (::after) ; le bouton GitHub passe au-dessus grâce à z-10. */}
            <Link href={projectUrl(p)} className="after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none focus-visible:after:ring-2 focus-visible:after:ring-accent">
              {p.title}
            </Link>
            {p.featured && <Sparkles className="size-4 text-accent-3" aria-label="Projet phare" />}
          </h3>
        </div>
        <a
          href={repoUrl(p.repo)}
          target="_blank"
          rel="noreferrer"
          aria-label={`Voir ${p.title} sur GitHub`}
          className="relative z-10 shrink-0 rounded-full border border-line p-2 text-muted transition-all group-hover:border-accent/50 group-hover:text-fg hover:rotate-45"
        >
          <ArrowUpRight className="size-4" />
        </a>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted">{p.description}</p>

      {p.highlights && (
        <ul className="mt-4 space-y-1.5 text-sm">
          {p.highlights.map((h) => (
            <li key={h} className="flex gap-2">
              <span className="text-accent-2">→</span> {h}
            </li>
          ))}
        </ul>
      )}

      <ul className="mt-auto flex flex-wrap gap-1.5 pt-6">
        {p.skills.map((id) => (
          <li
            key={id}
            className={`rounded-md px-2 py-0.5 font-mono text-[11px] ${
              id === highlight ? "bg-accent text-ink" : "bg-white/5 text-muted"
            }`}
          >
            {skillById.get(id)?.label ?? id}
          </li>
        ))}
      </ul>
    </>
  );
}

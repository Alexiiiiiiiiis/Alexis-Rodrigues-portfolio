"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { domains, projects, skills, type DomainId, type Project } from "@/data/portfolio";
import { cardClass, onSpotlightMove, ProjectCardBody, skillById } from "./ProjectCard";
import { SectionTitle } from "./Reveal";

const countBySkill = new Map(skills.map((s) => [s.id, projects.filter((p) => p.skills.includes(s.id)).length]));

// Projets mis en avant d'abord, puis du plus récent au plus ancien.
const sorted = [...projects].sort(
  (a, b) => Number(!!b.featured) - Number(!!a.featured) || b.date.localeCompare(a.date),
);

export function SkillsAndProjects() {
  const [domain, setDomain] = useState<DomainId | "all">("all");
  const [skill, setSkill] = useState<string | null>(null);

  const visibleSkills = domain === "all" ? skills : skills.filter((s) => s.domain === domain);

  const visibleProjects = useMemo(() => {
    if (skill) return sorted.filter((p) => p.skills.includes(skill));
    if (domain === "all") return sorted;
    return sorted.filter((p) => p.skills.some((id) => skillById.get(id)?.domain === domain));
  }, [domain, skill]);

  const pickDomain = (d: DomainId | "all") => {
    setDomain(d);
    setSkill(null);
  };

  const activeLabel = skill
    ? skillById.get(skill)?.label
    : domain === "all"
      ? null
      : domains.find((d) => d.id === domain)?.label;

  return (
    <section className="mx-auto max-w-6xl px-5 pt-36 pb-28">
      <SectionTitle kicker="Compétences & projets" title="Ce que je sais faire, preuves à l'appui.">
        Choisis un domaine ou une technologie : les projets qui l&apos;utilisent s&apos;affichent en dessous.
      </SectionTitle>

      {/* Domaines */}
      <div role="tablist" aria-label="Domaines" className="flex flex-wrap gap-2">
        {[{ id: "all" as const, label: "Tout" }, ...domains].map((d) => {
          const active = domain === d.id;
          return (
            <button
              key={d.id}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => pickDomain(d.id)}
              className={`relative rounded-full px-4 py-2 text-sm transition-colors ${
                active ? "text-ink" : "text-muted hover:text-fg"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="domain-pill"
                  className="absolute inset-0 rounded-full bg-fg"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.5 }}
                />
              )}
              <span className="relative">{d.label}</span>
            </button>
          );
        })}
      </div>

      {domain !== "all" && <p className="mt-4 text-sm text-muted">{domains.find((d) => d.id === domain)?.blurb}</p>}

      {/* Technologies */}
      <div className="mt-6 flex flex-wrap gap-2">
        {visibleSkills.map((s) => {
          const active = skill === s.id;
          return (
            <button
              key={s.id}
              type="button"
              aria-pressed={active}
              onClick={() => setSkill(active ? null : s.id)}
              className={`inline-flex items-center gap-2 rounded-lg border px-3 py-1.5 font-mono text-xs transition-colors ${
                active
                  ? "border-accent bg-accent/15 text-fg"
                  : "border-line bg-white/[0.02] text-muted hover:border-accent/40 hover:text-fg"
              }`}
            >
              {s.label}
              <span className={`rounded px-1.5 py-0.5 text-[10px] ${active ? "bg-accent text-ink" : "bg-white/5"}`}>
                {countBySkill.get(s.id)}
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-12 flex items-baseline justify-between border-b border-line pb-4">
        <p className="text-sm text-muted" aria-live="polite">
          <span className="font-display text-2xl font-semibold text-fg">{visibleProjects.length}</span> projet
          {visibleProjects.length > 1 ? "s" : ""}
          {activeLabel && (
            <>
              {" "}
              avec <span className="text-accent">{activeLabel}</span>
            </>
          )}
        </p>
        {(skill || domain !== "all") && (
          <button
            type="button"
            onClick={() => pickDomain("all")}
            className="text-sm text-muted underline-offset-4 hover:text-fg hover:underline"
          >
            Réinitialiser
          </button>
        )}
      </div>

      <motion.ul layout className="mt-8 grid gap-5 md:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {visibleProjects.map((p) => (
            <AnimatedProjectCard key={p.repo} project={p} highlight={skill} />
          ))}
        </AnimatePresence>
      </motion.ul>
    </section>
  );
}

function AnimatedProjectCard({ project, highlight }: { project: Project; highlight: string | null }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.3 }}
      onMouseMove={onSpotlightMove}
      className={cardClass}
    >
      <ProjectCardBody project={project} highlight={highlight} />
    </motion.li>
  );
}

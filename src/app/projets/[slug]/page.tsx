import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArrowLeft, ArrowRight, ExternalLink, Users } from "lucide-react";
import { profile, projectUrl, projects, repoUrl, skills } from "@/data/portfolio";
import { projectDetails, type ProjectImage } from "@/data/project-details";
import { GithubIcon } from "@/components/icons";

const ordered = [...projects].sort((a, b) => b.date.localeCompare(a.date));
const skillById = new Map(skills.map((s) => [s.id, s]));

const formatDate = (d: string) =>
  new Date(`${d}-01T12:00:00`).toLocaleDateString("fr-FR", { month: "long", year: "numeric" });

const findProject = (slug: string) => ordered.find((p) => p.slug === slug);

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: PageProps<"/projets/[slug]">): Promise<Metadata> {
  const project = findProject((await params).slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${profile.name}`,
    description: project.description,
  };
}

// Avec cacheComponents, `params` doit être lu à l'intérieur d'un <Suspense> :
// la page elle-même n'attend rien, c'est ProjectContent qui lit le slug.
export default function ProjectPage({ params }: PageProps<"/projets/[slug]">) {
  return (
    <Suspense fallback={<div className="min-h-dvh" />}>
      <ProjectContent params={params} />
    </Suspense>
  );
}

async function ProjectContent({ params }: Pick<PageProps<"/projets/[slug]">, "params">) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  const d = projectDetails[slug];
  const index = ordered.indexOf(project);
  const newer = ordered[index - 1];
  const older = ordered[index + 1];
  const phoneShots = d?.images?.filter((i) => i.height > i.width) ?? [];
  const wideShots = d?.images?.filter((i) => i.height <= i.width) ?? [];

  return (
    <article className="mx-auto max-w-6xl px-5 pt-32 pb-24">
      <Link href="/competences" className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
        <ArrowLeft className="size-4" /> Tous les projets
      </Link>

      {/* En-tête */}
      <header className="fade-up mt-8 max-w-3xl">
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
          {formatDate(project.date)}
          {d?.context && <> · {d.context}</>}
        </p>
        <h1 className="mt-4 font-display text-5xl font-semibold tracking-tight sm:text-6xl">{project.title}</h1>
        <p className="mt-3 text-xl text-muted">{project.tagline}</p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <a
            href={repoUrl(project.repo)}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-fg px-5 py-2.5 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
          >
            <GithubIcon className="size-4" /> Voir le code
          </a>
          {d?.live && (
            <a
              href={d.live}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent/60 hover:bg-white/5"
            >
              <ExternalLink className="size-4" /> Voir en ligne
            </a>
          )}
          {d?.team && (
            <span className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-muted">
              <Users className="size-4 text-accent-2" /> {d.team}
            </span>
          )}
        </div>
      </header>

      {/* Chiffres clés */}
      {d?.figures && (
        <dl className="fade-up mt-14 grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-px overflow-hidden rounded-2xl border border-line bg-line" style={{ animationDelay: "0.1s" }}>
          {d.figures.map((f) => (
            <div key={f.label} className="bg-ink-2 p-6">
              <dt className="sr-only">{f.label}</dt>
              <dd className="font-display text-3xl font-semibold text-gradient">{f.value}</dd>
              <dd className="mt-1 text-sm text-muted">{f.label}</dd>
            </div>
          ))}
        </dl>
      )}

      <div className="mt-16 grid gap-16 lg:grid-cols-[1fr_280px]">
        <div className="fade-up space-y-14" style={{ animationDelay: "0.2s" }}>
          <Section title="Le projet">
            {(d?.summary.length ? d.summary : [project.description]).map((p) => (
              <p key={p} className="leading-relaxed text-muted">
                {p}
              </p>
            ))}
          </Section>

          {wideShots.length > 0 && <Gallery images={wideShots} />}

          {d?.contributions && (
            <Section title={d.team ? "Ma part" : "En plus du sujet"}>
              <Bullets items={d.contributions} />
            </Section>
          )}

          {d?.features && (
            <Section title="Fonctionnalités">
              <Bullets items={d.features} />
            </Section>
          )}

          {phoneShots.length > 0 && (
            <Section title="Captures">
              <Gallery images={phoneShots} phone />
            </Section>
          )}

          {d?.challenges && (
            <Section title="Difficultés & solutions">
              <div className="grid gap-4">
                {d.challenges.map((c) => (
                  <div key={c.title} className="rounded-2xl border border-line bg-ink-2 p-6">
                    <h3 className="font-display text-lg font-semibold">{c.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{c.text}</p>
                  </div>
                ))}
              </div>
            </Section>
          )}
        </div>

        {/* Colonne technologies */}
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <h2 className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Technologies</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {project.skills.map((id) => (
              <li key={id} className="rounded-lg border border-line bg-white/[0.02] px-3 py-1.5 font-mono text-xs">
                {skillById.get(id)?.label ?? id}
              </li>
            ))}
          </ul>
        </aside>
      </div>

      {/* Projet précédent / suivant */}
      <nav aria-label="Autres projets" className="mt-24 grid gap-4 border-t border-line pt-10 sm:grid-cols-2">
        {newer ? (
          <Link href={projectUrl(newer)} className="group rounded-2xl border border-line p-5 transition-colors hover:border-accent/50">
            <span className="flex items-center gap-2 text-xs text-muted">
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-1" /> Plus récent
            </span>
            <span className="mt-1 block font-display text-lg font-semibold">{newer.title}</span>
          </Link>
        ) : (
          <span />
        )}
        {older && (
          <Link href={projectUrl(older)} className="group rounded-2xl border border-line p-5 text-right transition-colors hover:border-accent/50">
            <span className="flex items-center justify-end gap-2 text-xs text-muted">
              Plus ancien <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-1" />
            </span>
            <span className="mt-1 block font-display text-lg font-semibold">{older.title}</span>
          </Link>
        )}
      </nav>
    </article>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-4">
      <h2 className="font-display text-2xl font-semibold tracking-tight">{title}</h2>
      {children}
    </section>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 leading-relaxed text-muted">
          <span className="mt-0.5 text-accent-2">→</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function Gallery({ images, phone = false }: { images: ProjectImage[]; phone?: boolean }) {
  return (
    <ul className={phone ? "grid grid-cols-2 gap-4 sm:grid-cols-3" : "grid gap-4"}>
      {images.map((img) => (
        <li key={img.src}>
          <figure>
            <Image
              src={img.src}
              alt={img.alt}
              width={img.width}
              height={img.height}
              sizes={phone ? "(min-width: 1024px) 220px, (min-width: 640px) 30vw, 45vw" : "(min-width: 1024px) 800px, 100vw"}
              className={`w-full border border-line bg-ink-2 ${phone ? "rounded-2xl" : "rounded-xl"}`}
            />
            <figcaption className="mt-2 text-xs text-muted">{img.alt}</figcaption>
          </figure>
        </li>
      ))}
    </ul>
  );
}

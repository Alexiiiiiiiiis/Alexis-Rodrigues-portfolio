import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { domains, profile, projects, skills } from "@/data/portfolio";
import { GithubIcon } from "./icons";

const stats = [
  { value: projects.length, label: "projets" },
  { value: skills.length, label: "technologies" },
  { value: domains.length, label: "domaines" },
];

// Composant serveur : les animations d'entrée sont en CSS (classe `fade-up`).
// Le titre n'est pas animé en opacité pour s'afficher tout de suite (meilleur LCP).
const delay = (s: number) => ({ animationDelay: `${s}s` });

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-36 pb-24 sm:pt-44">
      <div className="bg-grid pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(167_139_250/0.2),transparent)]" />

      <div className="relative mx-auto max-w-6xl px-5">
        <div className="fade-up flex items-center gap-3">
          <Image
            src={profile.avatar}
            alt={profile.name}
            width={44}
            height={44}
            preload
            className="rounded-full ring-2 ring-accent/40"
          />
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/5 px-3 py-1 text-xs text-muted">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Ouvert aux opportunités
          </span>
        </div>

        <h1 className="mt-8 font-display text-5xl font-semibold leading-[1.02] tracking-tight sm:text-7xl lg:text-8xl">
          {profile.name}
          <br />
          <span className="text-gradient">{profile.role}</span>
        </h1>

        <p className="mt-8 max-w-2xl text-lg text-muted sm:text-xl">{profile.pitch}</p>

        <div className="fade-up mt-10 flex flex-wrap gap-3" style={delay(0.3)}>
          <Link
            href="/competences"
            className="group inline-flex items-center gap-2 rounded-full bg-fg px-6 py-3 text-sm font-medium text-ink transition-transform hover:-translate-y-0.5"
          >
            Voir mes projets
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-medium transition-colors hover:border-accent/60 hover:bg-white/5"
          >
            <GithubIcon className="size-4" /> @{profile.handle}
          </a>
        </div>

        <dl className="fade-up mt-20 grid max-w-xl grid-cols-3 gap-6 border-t border-line pt-8" style={delay(0.4)}>
          {stats.map((s) => (
            <div key={s.label}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="font-display text-4xl font-semibold">{s.value}</dd>
              <dd className="mt-1 text-sm text-muted">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

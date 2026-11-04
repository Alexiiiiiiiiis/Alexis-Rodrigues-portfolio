import type { ComponentType } from "react";
import { Mail } from "lucide-react";
import { profile } from "@/data/portfolio";
import { GithubIcon, LinkedinIcon } from "./icons";
import { Reveal } from "./Reveal";

type Channel = { href: string; label: string; value: string; Icon: ComponentType<{ className?: string }> };

// L'e-mail et LinkedIn n'apparaissent que s'ils sont renseignés dans `profile`.
const channels: Channel[] = [
  { href: profile.github, label: "GitHub", value: `@${profile.handle}`, Icon: GithubIcon },
  ...(profile.email ? [{ href: `mailto:${profile.email}`, label: "E-mail", value: profile.email, Icon: Mail }] : []),
  ...(profile.linkedin ? [{ href: profile.linkedin, label: "LinkedIn", value: "Profil LinkedIn", Icon: LinkedinIcon }] : []),
];

export function Contact() {
  return (
    <section className="relative flex min-h-[calc(100dvh-5rem)] items-center overflow-hidden">
      <div className="pointer-events-none absolute -bottom-48 left-1/2 h-[420px] w-[720px] -translate-x-1/2 bg-[radial-gradient(closest-side,rgb(34_211_238/0.15),transparent)]" />
      <div className="relative mx-auto max-w-6xl px-5 pt-36 pb-24 text-center">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">Contact</p>
          <h2 className="mx-auto mt-4 max-w-3xl font-display text-5xl font-semibold tracking-tight sm:text-6xl">
            Un projet, un stage, une alternance&nbsp;? <span className="text-gradient">Parlons-en.</span>
          </h2>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 flex flex-wrap justify-center gap-4">
          {channels.map(({ href, label, value, Icon }) => {
            const external = !href.startsWith("mailto:");
            return (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noreferrer" : undefined}
                className="flex items-center gap-3 rounded-2xl border border-line bg-ink-2 px-6 py-4 text-left transition-colors hover:border-accent/50"
              >
                <Icon className="size-5 text-accent" />
                <span>
                  <span className="block text-xs text-muted">{label}</span>
                  <span className="block text-sm font-medium">{value}</span>
                </span>
              </a>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

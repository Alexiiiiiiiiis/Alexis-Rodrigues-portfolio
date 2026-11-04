"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/portfolio";
import { GithubIcon } from "./icons";

const links = [
  { href: "/competences", label: "Compétences" },
  { href: "/parcours", label: "Parcours" },
  { href: "/contact", label: "Contact" },
];

export function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open ? "border-b border-line bg-ink/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" onClick={() => setOpen(false)} className="font-display text-lg font-semibold tracking-tight">
          AR<span className="text-accent">.</span>
        </Link>

        <ul className="hidden items-center gap-8 text-sm md:flex">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`transition-colors hover:text-fg ${isActive(l.href) ? "text-fg" : "text-muted"}`}
              >
                {l.label}
                {isActive(l.href) && <span className="mx-auto mt-1 block h-px w-full bg-accent" />}
              </Link>
            </li>
          ))}
          <li>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-line px-4 py-1.5 text-fg transition-colors hover:border-accent/60"
            >
              <GithubIcon className="size-4" /> GitHub
            </a>
          </li>
        </ul>

        <button
          type="button"
          className="md:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </nav>

      {open && (
        <ul className="space-y-1 px-5 pb-5 md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(l.href) ? "page" : undefined}
                className={`block rounded-lg px-3 py-2 hover:bg-white/5 hover:text-fg ${
                  isActive(l.href) ? "bg-white/5 text-fg" : "text-muted"
                }`}
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li>
            <a href={profile.github} target="_blank" rel="noreferrer" className="block rounded-lg px-3 py-2 text-muted hover:bg-white/5 hover:text-fg">
              GitHub
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}

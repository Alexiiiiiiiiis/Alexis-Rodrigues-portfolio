"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

// Fait apparaître son contenu en fondu lorsqu'il entre dans l'écran (CSS + IntersectionObserver, sans librairie).
export function Reveal({ children, delay = 0, className = "" }: { children: ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    // Sans IntersectionObserver, ou si l'élément est déjà à l'écran au montage : on affiche tout de suite.
    const top = el.getBoundingClientRect().top;
    if (typeof IntersectionObserver === "undefined" || top < window.innerHeight) {
      setShown(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -80px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-shown={shown}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
      className={`reveal ${className}`}
    >
      {children}
    </div>
  );
}

export function SectionTitle({ kicker, title, children }: { kicker: string; title: string; children?: ReactNode }) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-accent">{kicker}</p>
      <h2 className="mt-3 font-display text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h2>
      {children && <p className="mt-4 text-muted">{children}</p>}
    </Reveal>
  );
}

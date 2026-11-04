import { profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-line py-8 text-center text-xs text-muted">
      {profile.name} Portfolio · Créé avec Next.js, React, TypeScript et Tailwind CSS
    </footer>
  );
}

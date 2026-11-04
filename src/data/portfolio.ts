// Toutes les données du portfolio, extraites des dépôts GitHub.
// Pour ajouter un projet : ajoute-le dans `projects` avec les ids de compétences qu'il utilise.

export const profile = {
  name: "Alexis Rodrigues",
  handle: "Alexiiiiiiiiis",
  role: "Développeur full-stack",
  school: "IPSSI",
  pitch:
    "Je construis des applications web et mobiles de bout en bout : API Symfony & Laravel, interfaces React & Angular, apps Flutter, intégration d'IA et pipelines DevOps jusqu'à Kubernetes.",
  github: "https://github.com/Alexiiiiiiiiis",
  avatar: "https://github.com/Alexiiiiiiiiis.png",
  // Renseigne ces champs pour les afficher dans la section contact.
  email: "",
  linkedin: "",
};

export type DomainId = "frontend" | "backend" | "data" | "mobile" | "devops" | "ai" | "quality";

export const domains: { id: DomainId; label: string; blurb: string }[] = [
  { id: "frontend", label: "Frontend", blurb: "Interfaces réactives, typées et composables." },
  { id: "backend", label: "Backend & API", blurb: "API REST sécurisées, rôles, ORM." },
  { id: "devops", label: "DevOps & Cloud", blurb: "Conteneurs, CI/CD, orchestration, supervision." },
  { id: "ai", label: "IA & LLM", blurb: "Chatbots, streaming, RAG, LLM locaux." },
  { id: "mobile", label: "Mobile", blurb: "Apps cross-platform avec Flutter." },
  { id: "data", label: "Bases de données", blurb: "Relationnel, cache et modélisation." },
  { id: "quality", label: "Qualité & Sécurité", blurb: "Tests automatisés, audit de code, agilité." },
];

export type Skill = { id: string; label: string; domain: DomainId };

export const skills: Skill[] = [
  // Frontend
  { id: "react", label: "React", domain: "frontend" },
  { id: "angular", label: "Angular", domain: "frontend" },
  { id: "typescript", label: "TypeScript", domain: "frontend" },
  { id: "javascript", label: "JavaScript", domain: "frontend" },
  { id: "html-css", label: "HTML / CSS", domain: "frontend" },
  { id: "tailwind", label: "Tailwind CSS", domain: "frontend" },
  { id: "vite", label: "Vite", domain: "frontend" },
  { id: "rxjs", label: "RxJS & Signals", domain: "frontend" },
  { id: "styled", label: "styled-components", domain: "frontend" },
  { id: "bootstrap", label: "Bootstrap", domain: "frontend" },
  { id: "blade", label: "Blade", domain: "frontend" },
  // Backend
  { id: "php", label: "PHP", domain: "backend" },
  { id: "symfony", label: "Symfony", domain: "backend" },
  { id: "laravel", label: "Laravel", domain: "backend" },
  { id: "node", label: "Node.js", domain: "backend" },
  { id: "express", label: "Express", domain: "backend" },
  { id: "python", label: "Python", domain: "backend" },
  { id: "django", label: "Django", domain: "backend" },
  { id: "rest", label: "API REST", domain: "backend" },
  { id: "auth", label: "JWT & OAuth", domain: "backend" },
  { id: "doctrine", label: "Doctrine ORM", domain: "backend" },
  // Data
  { id: "mysql", label: "MySQL", domain: "data" },
  { id: "postgres", label: "PostgreSQL", domain: "data" },
  { id: "redis", label: "Redis", domain: "data" },
  // Mobile
  { id: "flutter", label: "Flutter", domain: "mobile" },
  { id: "dart", label: "Dart", domain: "mobile" },
  // DevOps
  { id: "docker", label: "Docker & Compose", domain: "devops" },
  { id: "ci", label: "GitHub Actions CI/CD", domain: "devops" },
  { id: "k8s", label: "Kubernetes", domain: "devops" },
  { id: "monitoring", label: "Prometheus & Grafana", domain: "devops" },
  { id: "nginx", label: "nginx", domain: "devops" },
  // IA
  { id: "llm", label: "API LLM (Mistral, Groq…)", domain: "ai" },
  { id: "ollama", label: "Ollama (LLM local)", domain: "ai" },
  { id: "sse", label: "Streaming SSE", domain: "ai" },
  { id: "rag", label: "RAG & Vector store", domain: "ai" },
  // Qualité
  { id: "tests", label: "Tests automatisés", domain: "quality" },
  { id: "security", label: "Sécurité (OWASP, Semgrep)", domain: "quality" },
  { id: "agile", label: "Gestion de projet agile", domain: "quality" },
  { id: "git", label: "Git & GitHub", domain: "quality" },
];

export type Project = {
  repo: string;
  slug: string; // adresse de la page : /projets/<slug>
  title: string;
  tagline: string;
  description: string;
  skills: string[];
  date: string; // AAAA-MM
  featured?: boolean;
  highlights?: string[];
};

export const projects: Project[] = [
  {
    repo: "Projet_ANCF",
    slug: "transport-ancf",
    title: "Transport ANCF",
    tagline: "Projet de fin d'année",
    description:
      "Système d'information en temps réel pour les transports d'Île-de-France (RER, Métro, Tram, Bus) : API Symfony, front React, cache Redis, le tout dockerisé.",
    skills: ["symfony", "php", "react", "typescript", "vite", "mysql", "redis", "docker", "ci", "auth", "doctrine", "rest", "git"],
    date: "2026-09",
    featured: true,
    highlights: ["Données IDFM temps réel", "Auth JWT + rôles", "Stack 100 % Docker"],
  },
  {
    repo: "todo-api_docker",
    slug: "todo-api-devops",
    title: "Todo API — DevOps",
    tagline: "Du code au cluster Kubernetes",
    description:
      "API Node.js + PostgreSQL : Dockerfile multi-stage, CI/CD, déploiement automatisé, supervision Prometheus/Grafana et cluster Kubernetes à 3 replicas avec rolling update.",
    skills: ["node", "express", "postgres", "docker", "ci", "k8s", "monitoring", "tests", "python", "rest", "git"],
    date: "2026-08",
    featured: true,
    highlights: ["git push → cluster à jour", "Rolling update sans coupure", "Rollback en une commande"],
  },
  {
    repo: "Hackathon",
    slug: "securescan",
    title: "SecureScan",
    tagline: "Hackathon — groupe 2",
    description:
      "Plateforme d'analyse de sécurité de code : soumission d'un dépôt Git, scans automatiques (Semgrep, TruffleHog, npm audit), classement OWASP et rapports PDF.",
    skills: ["symfony", "php", "postgres", "doctrine", "auth", "security", "javascript", "html-css", "react", "vite", "rest"],
    date: "2026-03",
    featured: true,
    highlights: ["OAuth GitHub", "Vulnérabilités par catégorie OWASP", "Rapports HTML / PDF"],
  },
  {
    repo: "APOCALIPSSI---GROUPE-20",
    slug: "edututor-ia",
    title: "EduTutor IA",
    tagline: "Semaine immersive APOCAL'IPSSI",
    description:
      "Plateforme de révision personnalisée à base de LLM open source : génération de quiz, back-office, gestion de projet agile sous perturbations.",
    skills: ["python", "django", "react", "typescript", "postgres", "ollama", "llm", "docker", "tests", "agile", "ci"],
    date: "2026-07",
    featured: true,
    highlights: ["Quiz générés par LLM local", "Multi-fournisseurs LLM", "Agilité & ADR"],
  },
  {
    repo: "Angular-CineTrack",
    slug: "cinetrack",
    title: "CinéTrack",
    tagline: "Angular 21, signals & JWT",
    description:
      "Bibliothèque musicale branchée sur une API REST sécurisée : composants standalone, Signal Forms, intercepteurs, lazy loading et guards.",
    skills: ["angular", "typescript", "rxjs", "auth", "rest"],
    date: "2026-06",
    featured: true,
    highlights: ["Signals & OnPush", "Intercepteurs JWT", "Lazy loading + guards"],
  },
  {
    repo: "flutter_meteo",
    slug: "meteo-flutter",
    title: "Météo Flutter",
    tagline: "App mobile + API OpenWeatherMap",
    description:
      "Météo d'une ville ou de la position GPS, villes favorites persistées, clé API injectée à la compilation, 25 tests.",
    skills: ["flutter", "dart", "rest", "tests"],
    date: "2026-07",
    featured: true,
    highlights: ["Géolocalisation", "Favoris persistants", "25 tests"],
  },
  {
    repo: "Chatbot_et_cas_d-Usage",
    slug: "chatbot-cli",
    title: "Chatbot CLI multi-provider",
    tagline: "Node.js & LLM",
    description:
      "Chatbot terminal avec mémoire conversationnelle, streaming SSE, compression automatique du contexte et mini API Express (Mistral / Groq).",
    skills: ["node", "express", "llm", "sse", "rest"],
    date: "2026-05",
  },
  {
    repo: "-Projet-agent-websearch-premier-vector-store",
    slug: "agent-web-search",
    title: "Agent web search & vector store",
    tagline: "IA appliquée",
    description: "Construction d'un agent capable de chercher sur le web, couplé à un premier vector store pour du RAG.",
    skills: ["llm", "rag", "node"],
    date: "2026-05",
  },
  {
    repo: "Ipssi-IA",
    slug: "ipssi-ia",
    title: "Ipssi-IA",
    tagline: "Communication avec une IA",
    description: "Premiers échanges Node.js avec une API d'IA générative.",
    skills: ["node", "llm"],
    date: "2026-04",
  },
  {
    repo: "RPG-REACT",
    slug: "rpg-react",
    title: "RPG React",
    tagline: "React 19 + TypeScript",
    description: "Jeu de rôle web avec routing, graphiques de stats (Recharts), styled-components et API mockée json-server.",
    skills: ["react", "typescript", "vite", "styled", "rest"],
    date: "2026-04",
  },
  {
    repo: "clickfast",
    slug: "clickfast",
    title: "ClickFast",
    tagline: "Première pipeline CI/CD",
    description: "Jeu de clics en JS pur servi par nginx dans un conteneur, testé et construit par une pipeline GitHub Actions.",
    skills: ["javascript", "html-css", "docker", "nginx", "ci", "tests"],
    date: "2026-08",
  },
  {
    repo: "application_fruits",
    slug: "application-fruits",
    title: "Application Fruits",
    tagline: "Flutter, navigation multi-écrans",
    description: "App Flutter fidèle aux maquettes : onboarding en slider, liste, détail nutritionnel et réglages.",
    skills: ["flutter", "dart"],
    date: "2026-07",
  },
  {
    repo: "TP--LARAVEL-2026-27-",
    slug: "mcb-bank",
    title: "MCB Bank",
    tagline: "Banque en ligne Laravel",
    description: "Site bancaire avec trois espaces (client, manager, caissier), virements, notifications et Query Builder.",
    skills: ["laravel", "php", "blade", "tailwind", "vite", "mysql"],
    date: "2026-10",
  },
  {
    repo: "projet_laravel_freshshop",
    slug: "freshshop",
    title: "FreshShop",
    tagline: "Laravel & Blade",
    description: "Boutique en ligne : templating Blade, routage et contrôleurs.",
    skills: ["laravel", "php", "blade", "javascript"],
    date: "2026-10",
  },
  {
    repo: "Mini_blog_symfony",
    slug: "mini-blog-symfony",
    title: "Mini blog Symfony",
    tagline: "Symfony 7 + Bootstrap 5",
    description: "Blog complet avec gestion des rôles (admin, utilisateur, visiteur), commentaires modérés et catégories.",
    skills: ["symfony", "php", "doctrine", "bootstrap", "mysql"],
    date: "2026-02",
  },
  {
    repo: "TD_symfony",
    slug: "td-symfony",
    title: "TD Symfony",
    tagline: "Formulaires & sécurité",
    description: "Création de formulaires, liaison en base de données et sécurisation des données.",
    skills: ["symfony", "php", "doctrine", "security"],
    date: "2026-02",
  },
  {
    repo: "projet_laravel",
    slug: "projet-laravel",
    title: "Projet Laravel",
    tagline: "Fondamentaux Laravel",
    description: "Prise en main du framework : routes, contrôleurs, vues et migrations.",
    skills: ["laravel", "php", "blade"],
    date: "2026-10",
  },
];

export function projectsForSkill(skillId: string) {
  return projects.filter((p) => p.skills.includes(skillId));
}

export const projectUrl = (p: Pick<Project, "slug">) => `/projets/${p.slug}`;

export const repoUrl = (repo: string) => `${profile.github}/${repo}`;

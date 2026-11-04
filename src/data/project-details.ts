// Contenu des pages /projets/<slug>, rédigé à partir des README et de l'historique git de chaque dépôt.
// Tous les champs sont facultatifs : une page sans détails affiche simplement la description du projet.
// Pour ajouter des captures : dépose les images dans public/projets/<slug>/ et référence-les dans `images`.

export type ProjectImage = { src: string; alt: string; width: number; height: number };

export type ProjectDetails = {
  context: string; // cadre du projet (cours, hackathon…)
  team?: string;
  live?: string; // URL de la version en ligne
  summary: string[]; // paragraphes de présentation
  contributions?: string[]; // ma part, pour les projets en équipe
  features?: string[];
  figures?: { value: string; label: string }[];
  challenges?: { title: string; text: string }[]; // difficultés rencontrées et solutions
  images?: ProjectImage[];
};

const phone = (slug: string, file: string, alt: string): ProjectImage => ({
  src: `/projets/${slug}/${file}`,
  alt,
  width: 1080,
  height: 2400,
});

export const projectDetails: Record<string, ProjectDetails> = {
  "transport-ancf": {
    context: "Projet de fin d'année — Bachelor CDA 2025-2026, IPSSI Paris",
    live: "https://transport-ancf.vercel.app",
    summary: [
      "Application web qui affiche en temps réel les horaires des transports d'Île-de-France (RER, Métro, Tramway, Bus) à partir des données IDFM.",
      "Une API Symfony 7 alimente un front React 18. MySQL stocke les comptes et les favoris, Redis met en cache les appels à l'API IDFM, et toute la pile tourne dans Docker. En production, le front est sur Vercel et l'API sur AlwaysData.",
    ],
    features: [
      "Recherche d'arrêts et arrêts à proximité (géolocalisation, rayon réglable)",
      "Prochains départs, état du trafic et alertes par ligne",
      "Carte interactive Leaflet + OpenStreetMap",
      "Calcul d'itinéraire et favoris réordonnables pour les utilisateurs connectés",
      "Compte complet : JWT, mot de passe oublié, suppression du compte et des données (RGPD)",
      "Back-office : statistiques et quota IDFM, gestion des utilisateurs, journal des appels API, paramètres appliqués à chaud (mode maintenance, durées de cache)",
    ],
    figures: [
      { value: "31", label: "routes d'API REST" },
      { value: "1 000", label: "requêtes IDFM / jour à ne pas dépasser" },
      { value: "2", label: "hébergeurs en production" },
    ],
    challenges: [
      {
        title: "Un quota de 1 000 requêtes par jour",
        text: "L'API IDFM peut être épuisée en quelques heures. Les réponses sont mises en cache dans Redis, avec des durées réglables depuis l'administration mais bornées côté serveur : un cache à 0 saisi par erreur viderait le quota.",
      },
      {
        title: "Des choix techniques justifiés plutôt que subis",
        text: "Quatre technologies du cahier des charges ont été remplacées, chacune avec sa justification : Tailwind au lieu de Material-UI, Vitest au lieu de Jest, des contrôleurs Symfony au lieu de FOSRestBundle (plus maintenu), Leaflet + OpenStreetMap au lieu de Mapbox (quota gratuit limité).",
      },
      {
        title: "Une API qui ne peut pas aller sur Vercel",
        text: "Vercel ne fait tourner ni PHP au long cours, ni MySQL, ni Redis. L'API est donc hébergée sur AlwaysData, sans Redis : le même code bascule automatiquement sur un cache disque quand REDIS_URL est vide.",
      },
      {
        title: "Sécurité",
        text: "Requêtes paramétrées via Doctrine, API sans état (JWT dans l'en-tête, donc pas de CSRF), limitation des tentatives de connexion (5 essais puis 15 minutes de blocage), CORS restreint, clés uniquement en variables d'environnement.",
      },
    ],
  },

  "todo-api-devops": {
    context: "Projet fil rouge du cours DevOps — 4 jours",
    summary: [
      "Une API de gestion de tâches en Node.js avec sa base PostgreSQL. L'application est volontairement simple : le vrai sujet, c'est tout le chemin jusqu'à la production.",
      "À la fin, un git push sur main teste, construit, publie l'image et met à jour un cluster Kubernetes sans aucune commande manuelle. Chaque étape a été mesurée et documentée dans un journal de bord.",
    ],
    features: [
      "Jour 1 — l'API, un Dockerfile multi-stage (Alpine, utilisateur non-root) et docker compose",
      "Jour 2 — première intégration continue, sur le projet d'échauffement ClickFast",
      "Jour 3 — déploiement automatisé, tests d'intégration, supervision Prometheus / Grafana, procédure d'exploitation",
      "Jour 4 — cluster Kubernetes : 3 replicas, rolling update sans coupure, sondes, retour arrière en une commande",
    ],
    figures: [
      { value: "57 Mo", label: "image finale, contre 397 Mo pour la version naïve" },
      { value: "0 / 203", label: "requêtes perdues pendant un retour arrière" },
      { value: "34 + 9", label: "tests unitaires et d'intégration" },
      { value: "20 s", label: "du constat de la panne au service rétabli" },
    ],
    challenges: [
      {
        title: "Un rolling update qui coupait encore des connexions",
        text: "maxUnavailable: 0 garantit le nombre de pods, pas l'absence de coupures : le routeur envoie encore du trafic au pod qui s'arrête. Un preStop de 5 secondes a fait passer les requêtes perdues de 10 à 0, au prix d'un déploiement plus lent.",
      },
      {
        title: "Des tests verts pendant une régression en production",
        text: "Une régression volontaire (un champ disparu des réponses) est passée avec 28 tests unitaires au vert : ils ne testaient que les erreurs. Les tests d'intégration contre un vrai PostgreSQL ont été écrits juste après, et l'attrapent désormais.",
      },
      {
        title: "Le dépôt qui écrasait la production",
        text: "Le manifeste Kubernetes contenait une version figée : un kubectl apply manuel ramenait la production en arrière. Il porte maintenant un marqueur remplacé au moment du déploiement — seul le cluster sait quelle version tourne.",
      },
      {
        title: "Le mauvais PostgreSQL",
        text: "Un PostgreSQL installé sous Windows occupait déjà le port 5432 et répondait à la place du conteneur. Leçon retenue : « quelque chose répond » ne prouve rien, il faut savoir qui répond.",
      },
    ],
  },

  securescan: {
    context: "Hackathon IPSSI",
    team: "Équipe de 4 — 30 commits sur 92",
    summary: [
      "Plateforme web d'analyse de sécurité de code : on soumet un dépôt Git ou un fichier ZIP, plusieurs outils l'analysent automatiquement, et les vulnérabilités sont centralisées par sévérité et par catégorie OWASP.",
      "Les résultats se consultent dans un tableau de bord avec historique. Des corrections sont proposées et peuvent être appliquées ou rejetées, puis un rapport HTML ou PDF est généré.",
    ],
    contributions: [
      "Inscription et connexion par JWT, puis connexion avec GitHub (OAuth2)",
      "Moteur de scan multi-outils : Semgrep, npm audit, TruffleHog (secrets exposés), ESLint sécurité",
      "Module d'analyse côté front : glisser-déposer d'un ZIP ou saisie d'une URL Git",
      "Infrastructure de tests PHPUnit et 68 tests unitaires (sévérités, OWASP, résultats de scan, corrections)",
      "Gestion uniforme des erreurs de l'API en JSON",
    ],
    features: [
      "Backend Symfony 7.4, Doctrine, PostgreSQL",
      "Front en HTML / CSS / JavaScript",
      "Rapports PDF générés avec dompdf",
    ],
    figures: [
      { value: "4", label: "outils d'analyse intégrés" },
      { value: "68", label: "tests unitaires écrits" },
    ],
  },

  "edututor-ia": {
    context: "Semaine immersive APOCAL'IPSSI 2026",
    team: "Équipe de 5 étudiants",
    summary: [
      "Plateforme de révision : l'étudiant dépose un cours (PDF ou texte), un LLM open source génère 10 QCM, puis la correction, le score et l'historique sont enregistrés.",
      "L'équipe partait d'un kit de démarrage fourni, à reprendre et compléter en méthode agile. Cinq perturbations imposées pendant la semaine changeaient les règles en cours de route : périmètre, latence du LLM, injection de prompt, RGPD et crise de livraison.",
    ],
    contributions: [
      "Refonte de la génération des quiz et des contrôles de validation",
      "Mise à jour des modèles LLM utilisés et de la politique de conservation des données",
      "Politique de confidentialité (RGPD), avec un coéquipier",
      "Matrice des risques et sprint backlog",
    ],
    features: [
      "Backend Django + Django REST Framework, front React + Vite + TypeScript",
      "PostgreSQL et LLM local avec Ollama, le tout dans Docker",
      "Gestion de projet : ADR, backlog, revue des risques",
    ],
  },

  cinetrack: {
    context: "Projet fil rouge Angular — 4 jours",
    summary: [
      "Application Angular 21 de gestion d'une bibliothèque musicale, branchée sur une API REST sécurisée par JWT.",
      "Le projet suit une progression sur quatre jours : afficher les données, les rendre interactives, les brancher sur une vraie API, puis naviguer, sécuriser et livrer.",
    ],
    features: [
      "Composants standalone en OnPush, état géré avec les signals",
      "Formulaires validés avec Signal Forms",
      "Recherche côté serveur avec debounceTime, distinctUntilChanged et switchMap",
      "Intercepteurs JWT et d'erreurs, routes en lazy loading protégées par des guards",
      "Favoris pilotés par un feature flag",
    ],
    contributions: [
      "Ajouts personnels au-delà du sujet : tri côté serveur, filtre des favoris, pagination, notifications toast et session persistante",
    ],
  },

  "meteo-flutter": {
    context: "TP Flutter",
    summary: [
      "Application mobile qui affiche la météo d'une ville ou de la position GPS, à partir de l'API OpenWeatherMap, avec une liste de villes favorites conservée d'un lancement à l'autre.",
      "Chaque cas d'erreur du cahier des charges a été déclenché en conditions réelles sur émulateur Android, et a son message en français.",
    ],
    features: [
      "Recherche par ville ou par position GPS",
      "Ressenti, minimum / maximum, humidité, vent ; fond dégradé selon la météo et le jour ou la nuit",
      "Favoris persistants, suppression avec possibilité d'annuler",
      "Clé API injectée à la compilation, jamais écrite dans le code",
      "Un message clair pour chaque erreur : hors ligne, ville introuvable, GPS coupé, permission refusée…",
    ],
    figures: [
      { value: "25", label: "tests automatisés" },
      { value: "10", label: "cas d'erreur gérés" },
    ],
    challenges: [
      {
        title: "Ne pas exposer la clé API",
        text: "flutter_dotenv aurait embarqué le fichier .env en clair dans l'APK. La clé est injectée avec --dart-define-from-file : elle n'apparaît nulle part dans le code source.",
      },
      {
        title: "Deux requêtes qui se chevauchent",
        text: "Cliquer sur Lille puis Paris pouvait afficher Lille si sa réponse arrivait en dernier. Un compteur de requêtes ignore les réponses périmées ; le test a été vérifié en désactivant le garde-fou.",
      },
      {
        title: "Les villes homonymes",
        text: "Un favori « Saint-Denis » réinterrogé par son nom pouvait renvoyer La Réunion. Les favoris mémorisent donc aussi les coordonnées, sans jamais stocker de météo.",
      },
    ],
    images: [
      phone("meteo", "02-resultat-recherche.png", "Résultat d'une recherche de ville"),
      phone("meteo", "01-accueil.png", "Écran d'accueil"),
      phone("meteo", "11-persistance-apres-redemarrage.png", "Favori conservé après redémarrage"),
      phone("meteo", "04-erreur-ville-introuvable.png", "Erreur : ville introuvable"),
      phone("meteo", "05-erreur-reseau.png", "Erreur : pas de réseau"),
      phone("meteo", "08-erreur-localisation-desactivee.png", "Erreur : localisation désactivée"),
    ],
  },

  "chatbot-cli": {
    context: "Cours IA appliquée",
    summary: [
      "Chatbot en ligne de commande avec Node.js, qui peut changer de fournisseur de LLM (Mistral ou Groq) en pleine conversation. Une mini API Express expose le même chatbot en HTTP.",
    ],
    features: [
      "Mémoire de la conversation",
      "Réponses en streaming (SSE), affichées au fil de l'eau",
      "Résumé automatique du contexte au-delà de 20 messages",
      "Latence, tokens et coût estimés affichés après chaque réponse",
      "Commandes /provider, /history, /resume, /translate",
      "Prompt système renforcé contre les tentatives d'injection",
    ],
  },

  "agent-web-search": {
    context: "Cours IA appliquée",
    summary: [
      "Construction en deux parties qui se rejoignent à la fin : un agent capable de chercher sur le web, et un premier vector store pour faire du RAG.",
    ],
  },

  "ipssi-ia": {
    context: "Cours IA appliquée",
    summary: ["Premiers échanges entre une application Node.js et une API d'IA générative."],
  },

  clickfast: {
    context: "Cours DevOps — jour 2, échauffement CI/CD",
    summary: [
      "Un jeu de clics : 10 secondes pour cliquer le plus possible, avec le score en clics par seconde et le record gardé dans le navigateur.",
      "Le jeu est volontairement simple (HTML, CSS et JavaScript, servi par nginx dans un conteneur) : l'objectif était de construire une première pipeline CI/CD.",
    ],
    features: [
      "Tests de la logique du jeu avec le lanceur intégré à Node (node --test)",
      "Pipeline GitHub Actions en deux jobs : tests, puis build de l'image seulement s'ils passent",
      "La pipeline démarre l'image et interroge /health pour vérifier qu'elle fonctionne",
    ],
    figures: [{ value: "19 s", label: "durée totale de la pipeline" }],
    images: [{ src: "/projets/clickfast/jeu.png", alt: "Écran de jeu ClickFast", width: 1280, height: 800 }],
  },

  "application-fruits": {
    context: "TP Flutter",
    summary: [
      "Application Flutter de découverte de fruits, construite à partir des ressources fournies (images, couleurs, données) et fidèle aux maquettes.",
    ],
    features: [
      "Accueil en slider de cartes, puis liste des 13 fruits",
      "Fiche détaillée : image sur dégradé, valeurs nutritionnelles, description",
      "Écran de réglages avec option pour revoir l'accueil",
      "24 couleurs Xcode converties en constantes Dart, données SwiftUI converties en Dart",
    ],
    images: [
      phone("fruits", "01_content_view.png", "Accueil en slider"),
      phone("fruits", "02_fruit_list.png", "Liste des fruits"),
      phone("fruits", "04_detail_nutrition.png", "Fiche détaillée d'un fruit"),
      phone("fruits", "05_settings.png", "Réglages"),
    ],
  },

  "mcb-bank": {
    context: "TP Laravel",
    summary: [
      "Site de banque en ligne avec trois espaces : client, manager et caissier. L'accès aux données passe par le Query Builder de Laravel, sans modèles Eloquent.",
    ],
    features: [
      "Client : comptes, relevés, virements avec recherche du bénéficiaire",
      "Manager : création et suppression de comptes, gestion des caissiers, notifications, modération des avis",
      "Caissier : dépôts et retraits",
      "Connexion par rôle et formulaire d'avis",
    ],
  },

  "mini-blog-symfony": {
    context: "Projet Symfony",
    summary: [
      "Blog complet avec trois niveaux d'accès : le visiteur lit, l'utilisateur connecté commente et gère son profil, l'administrateur gère tout.",
    ],
    features: [
      "Administration des articles, catégories et utilisateurs",
      "Modération des commentaires",
      "Inscription, connexion et profil",
      "Symfony 7, Doctrine, Twig et Bootstrap 5",
    ],
  },

  "rpg-react": { context: "Projet React", summary: [] },
  freshshop: { context: "Cours Laravel", summary: [] },
  "projet-laravel": { context: "Cours Laravel", summary: [] },
  "td-symfony": { context: "TD Symfony", summary: [] },
};

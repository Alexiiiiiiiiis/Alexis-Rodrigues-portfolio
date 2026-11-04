# Alexis Rodrigues — Portfolio

Portfolio de développeur full-stack : mes compétences, mes projets et mon parcours, avec une page détaillée pour chaque projet.

**Stack :** Next.js 16 · React 19 · TypeScript · Tailwind CSS 4

## Pages

| Page | Contenu |
| --- | --- |
| `/` | Présentation, technologies et projets phares |
| `/competences` | Compétences par domaine, avec filtre des projets par technologie |
| `/parcours` | Frise chronologique des projets, mois par mois |
| `/contact` | Liens pour me contacter |
| `/projets/<slug>` | Détail d'un projet : contexte, fonctionnalités, ma part, difficultés et captures |

## Lancer le projet

Prérequis : Node.js 20.9 ou plus récent.

```bash
npm install
npm run dev
```

Le site est alors disponible sur [http://localhost:3000](http://localhost:3000).

| Commande | Rôle |
| --- | --- |
| `npm run dev` | Serveur de développement |
| `npm run build` | Build de production |
| `npm run start` | Lance le build de production |
| `npm run lint` | Vérifie le code avec ESLint |

## Structure

```
src/
├── app/            # Pages (App Router)
│   ├── competences/
│   ├── contact/
│   ├── parcours/
│   └── projets/[slug]/
├── components/     # Composants de l'interface
└── data/
    ├── portfolio.ts         # Profil, compétences et liste des projets
    └── project-details.ts   # Contenu des pages de détail
public/projets/     # Captures d'écran des projets
```

## Modifier le contenu

Tout le contenu est dans `src/data/`, aucune page n'est à toucher :

- **Ajouter un projet** : ajoute-le dans `projects` (`portfolio.ts`) avec son `slug` et les ids des compétences utilisées. Sa page `/projets/<slug>` est générée automatiquement.
- **Détailler un projet** : ajoute une entrée avec le même `slug` dans `project-details.ts`.
- **Ajouter des captures** : dépose les images dans `public/projets/<dossier>/` et référence-les dans le champ `images` du projet.
- **Coordonnées** : renseigne `email` et `linkedin` dans `profile` pour les afficher sur la page contact.

## Branches

- `main` : version en production
- `dev` : intégration des nouvelles fonctionnalités, une branche par fonctionnalité

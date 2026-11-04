import type { Metadata } from "next";
import { SkillsAndProjects } from "@/components/SkillsAndProjects";

export const metadata: Metadata = {
  title: "Compétences & projets — Alexis Rodrigues",
  description: "Toutes mes compétences, classées par domaine, et les projets qui les mettent en œuvre.",
};

export default function CompetencesPage() {
  return <SkillsAndProjects />;
}

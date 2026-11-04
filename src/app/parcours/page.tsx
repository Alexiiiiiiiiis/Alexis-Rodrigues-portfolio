import type { Metadata } from "next";
import { Timeline } from "@/components/Timeline";

export const metadata: Metadata = {
  title: "Parcours — Alexis Rodrigues",
  description: "Mes projets mois par mois.",
};

export default function ParcoursPage() {
  return <Timeline />;
}

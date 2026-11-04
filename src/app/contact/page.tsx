import type { Metadata } from "next";
import { Contact } from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact — Alexis Rodrigues",
  description: "Me contacter pour un projet, un stage ou une alternance.",
};

export default function ContactPage() {
  return <Contact />;
}

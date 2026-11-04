import { Hero } from "@/components/Hero";
import { StackMarquee } from "@/components/StackMarquee";
import { FeaturedProjects } from "@/components/FeaturedProjects";

export default function Home() {
  return (
    <>
      <Hero />
      <StackMarquee />
      <FeaturedProjects />
    </>
  );
}

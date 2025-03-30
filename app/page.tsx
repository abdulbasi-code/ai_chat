// src/app/page.tsx
"use client";

import { AboutSection } from "./components/AboutSection";
import { AnimateInView } from "./components/AnimateInView";
import { ContactSection } from "./components/ContactSection";
import { HeroSection } from "./components/HeroSection";
import { ProjectsSection } from "./components/ProjectsSection";
import { SkillsSection } from "./components/SkillsSection";

export default function Home() {
  return (
    <>
      <AnimateInView>
        <HeroSection />
      </AnimateInView>

      <AnimateInView delay={0.1}>
        <AboutSection />
      </AnimateInView>

      <AnimateInView delay={0.1}>
        <ProjectsSection />
      </AnimateInView>

      <AnimateInView delay={0.1}>
        <SkillsSection />
      </AnimateInView>

      <AnimateInView delay={0.1}>
        <ContactSection />
      </AnimateInView>
    </>
  );
}

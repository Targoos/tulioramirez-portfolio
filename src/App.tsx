/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { StackSection } from "@/components/sections/StackSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/Footer";
import { BottomNav } from "@/components/BottomNav";

export default function App() {
  return (
    <div className="min-h-screen">
      <CustomCursor />
      <Navbar />
      <HeroSection />
      <AboutSection />
      <StackSection />
      <ProjectsSection />
      <ContactSection />
      <Footer />
      <BottomNav />
    </div>
  );
}

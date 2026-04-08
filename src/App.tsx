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
import { ChatBubble } from "@/components/ChatBubble";

export default function App() {
  return (
    <div className="min-h-screen">
      {/* Skip link for keyboard / screen-reader navigation */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-primary focus:text-on-primary focus:font-label focus:text-xs focus:uppercase focus:tracking-widest"
      >
        Skip to content
      </a>
      <CustomCursor />
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <StackSection />
        <ProjectsSection />
        <ContactSection />
      </main>
      <Footer />
      <BottomNav />
      <ChatBubble />
    </div>
  );
}

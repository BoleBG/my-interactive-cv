"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Mail, Linkedin, Github, ArrowUpRight, Users, Cpu, GitBranch, Sparkles } from "lucide-react";

import { ParticleBackground } from "@/components/ParticleBackground";
import { StatsSection } from "@/components/AnimatedCounter";
import { InteractiveTimeline } from "@/components/InteractiveTimeline";
import { TechRadar } from "@/components/TechRadar";
import { ProjectCarousel } from "@/components/ProjectCarousel";
import { ThemeToggle } from "@/components/ThemeToggle";
import { FocusAreas } from "@/components/FocusAreas";
import { LeadershipPhilosophy } from "@/components/LeadershipPhilosophy";


// --- Tilt Card (unchanged from before) ---
interface TiltCardProps {
  icon: React.ComponentType<{ size?: number }>;
  title: string;
  description: string;
}

const TiltCard = ({ icon: Icon, title, description }: TiltCardProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-150, 150], [10, -10]);
  const rotateY = useTransform(x, [-150, 150], [-10, 10]);
  const glareX = useTransform(x, [-150, 150], ["0%", "100%"]);
  const glareY = useTransform(y, [-150, 150], ["0%", "100%"]);

  function handleMouse(event: React.MouseEvent<HTMLDivElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set(event.clientX - rect.left - rect.width / 2);
    y.set(event.clientY - rect.top - rect.height / 2);
  }
  function handleMouseLeave() { x.set(0); y.set(0); }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative group p-8 rounded-2xl bg-slate-900/50 dark:bg-slate-900/50 light:bg-white/80 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/50 transition-colors duration-500 overflow-hidden"
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
        style={{ background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(6, 182, 212, 0.4), transparent 50%)` }}
      />
      <div style={{ transform: "translateZ(20px)" }} className="relative z-10">
        <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4 text-cyan-400 border border-cyan-500/20">
          <Icon size={24} />
        </div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed">{description}</p>
      </div>
    </motion.div>
  );
};

// --- Magnetic Button (unchanged) ---
interface MagneticButtonProps {
  children: React.ReactNode;
  href: string;
}

const MagneticButton = ({ children, href }: MagneticButtonProps) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  function handleMouse(event: React.MouseEvent<HTMLAnchorElement>) {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((event.clientX - centerX) * 0.3);
    y.set((event.clientY - centerY) * 0.3);
  }
  function handleMouseLeave() { x.set(0); y.set(0); }

  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className="relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:border-cyan-500/50 transition-all duration-300 group"
    >
      {children}
      <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
    </motion.a>
  );
};

// --- Main Page ---
export default function Home() {
  const focusAreas = [
    { icon: Users, title: "People & Culture", description: "Leading diverse teams of up to 100. Fostering ownership, psychological safety, and helping individuals become the best versions of themselves." },
    { icon: GitBranch, title: "Architecture & Process", description: "Aligning engineering with early product stages. Setting up scalable architecture and optimizing processes for maximum delivery speed." },
    { icon: Sparkles, title: "AI Integration", description: "Implementing AI into everyday workflows to drastically increase efficiency, speed up tasks, and augment team capabilities." },
    { icon: Cpu, title: "Technical Leadership", description: "30+ years of experience bridging the gap between deep technical execution (.NET, React, Cloud) and high-level business strategy." }
  ];

  return (
    <main className="min-h-screen bg-slate-950 light:bg-slate-50 text-white light:text-slate-900 overflow-x-hidden selection:bg-cyan-500/30 transition-colors duration-500">
      
      {/* Theme Toggle - Fixed Position */}
      <div className="fixed top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      {/* HERO SECTION with Particle Background */}
      <section className="relative min-h-screen flex items-center">
        <ParticleBackground />
        
        {/* Ambient Background Glow */}
        <div className="fixed inset-0 z-0 pointer-events-none">
          <div className="absolute top-[-10%] left-[10%] w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[10%] w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto px-6 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur border border-slate-800 text-xs text-cyan-400 mb-8">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Available for Engineering Leadership
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              Engineering Leader. <br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Architect of Teams & Systems.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mb-10 leading-relaxed">
              I help organizations build high-performing engineering cultures, design scalable architectures, and seamlessly integrate AI into everyday workflows. 
              Currently translating 30+ years of technical expertise into strategic impact.
            </p>

            <div className="flex flex-wrap gap-4">
              <MagneticButton href="https://linkedin.com/in/bosko-cvetkovic-3953779">
                <Linkedin size={18} /> Connect on LinkedIn
              </MagneticButton>
              <MagneticButton href="mailto:boskocvetkovic@gmail.com">
                <Mail size={18} /> Get in Touch
              </MagneticButton>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS SECTION */}
      <StatsSection />

      {/* LEADERSHIP PHILOSOPHY */}
      <LeadershipPhilosophy />

      {/* INTERACTIVE FOCUS AREAS */}
      <FocusAreas />

      {/* PROJECT CAROUSEL */}
      <ProjectCarousel />

      {/* TIMELINE */}
      <InteractiveTimeline />

      {/* TECH RADAR */}
      <TechRadar />

      {/* FOOTER */}
      <footer className="py-20 border-t border-slate-900">
        <div className="text-center max-w-6xl mx-auto px-6">
          <h3 className="text-2xl font-semibold mb-4">Let's build something exceptional.</h3>
          <p className="text-slate-500 mb-8">No forms, no friction. Just reach out directly.</p>
          <div className="flex justify-center gap-6 text-slate-400 flex-wrap">
            <a href="mailto:hello@myinteractivecv.com" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
              <Mail size={18} /> hello@myinteractivecv.com
            </a>
            <span className="text-slate-800 hidden md:inline">|</span>
            <a href="https://linkedin.com/in/yourprofile" className="hover:text-cyan-400 transition-colors flex items-center gap-2">
              <Linkedin size={18} /> LinkedIn
            </a>
          </div>
          <div className="mt-12 text-xs text-slate-600">
            Built with Next.js, React Three Fiber & Framer Motion
          </div>
        </div>
      </footer>
    </main>
  );
}
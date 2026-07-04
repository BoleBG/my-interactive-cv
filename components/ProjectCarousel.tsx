"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "AI-Powered Developer Platform",
    category: "AI Integration",
    year: "2025",
    description: "Built an internal platform integrating LLMs into developer workflows. Reduced code review time by 60% and accelerated feature delivery across 15 teams.",
    tech: ["OpenAI", "RAG", "Next.js", "PostgreSQL"],
    gradient: "from-cyan-500 to-blue-600",
    metrics: ["60% faster reviews", "15 teams adopted", "3 months to launch"],
  },
  {
    title: "Global Engineering Transformation",
    category: "Leadership",
    year: "2024",
    description: "Restructured a 100+ person engineering org across 4 continents. Established unified architecture standards and async-first culture.",
    tech: ["Microservices", "Event-Driven", "DDD", "Cloud"],
    gradient: "from-purple-500 to-pink-600",
    metrics: ["100+ engineers", "4 continents", "98% retention"],
  },
  {
    title: "Real-Time Analytics Engine",
    category: "Architecture",
    year: "2023",
    description: "Designed and shipped a high-throughput analytics system processing 1M+ events/second with sub-second latency for enterprise customers.",
    tech: [".NET", "Kafka", "Redis", "Azure"],
    gradient: "from-emerald-500 to-teal-600",
    metrics: ["1M+ events/sec", "<1s latency", "99.99% uptime"],
  },
  {
    title: "Engineering Excellence Framework",
    category: "Process",
    year: "2022",
    description: "Created a company-wide engineering framework covering hiring, onboarding, code review, and incident response. Became the blueprint for 3 business units.",
    tech: ["DORA", "OKRs", "RFC Process", "Mentorship"],
    gradient: "from-orange-500 to-red-600",
    metrics: ["3 BUs adopted", "40% faster onboarding", "2x deployment frequency"],
  },
];

export const ProjectCarousel = () => {
  const [[activeIndex, direction], setActive] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    const newIndex = (activeIndex + newDirection + projects.length) % projects.length;
    setActive([newIndex, newDirection]);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      rotateY: direction > 0 ? 15 : -15,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      rotateY: 0,
      zIndex: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.9,
      rotateY: direction < 0 ? 15 : -15,
      zIndex: 0,
    }),
  };

  const current = projects[activeIndex];

  return (
    <section className="py-32 max-w-6xl mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-4 text-center"
      >
        Featured <span className="text-cyan-400">Case Studies</span>
      </motion.h2>
      <p className="text-slate-500 text-center mb-16">A selection of transformative projects</p>

      <div className="relative max-w-5xl mx-auto">
        {/* Navigation Arrows */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 rounded-full bg-slate-900/80 backdrop-blur border border-slate-700 hover:border-cyan-500 hover:text-cyan-400 flex items-center justify-center transition-all"
          aria-label="Previous project"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          onClick={() => paginate(1)}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 rounded-full bg-slate-900/80 backdrop-blur border border-slate-700 hover:border-cyan-500 hover:text-cyan-400 flex items-center justify-center transition-all"
          aria-label="Next project"
        >
          <ChevronRight size={24} />
        </button>

        {/* Carousel Container */}
        <div className="relative h-[500px] overflow-hidden" style={{ perspective: "1500px" }}>
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={activeIndex}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 },
                scale: { duration: 0.3 },
                rotateY: { duration: 0.4 },
              }}
              className="absolute inset-0 p-8 rounded-3xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${current.gradient} text-white mb-3`}>
                    {current.category}
                  </div>
                  <h3 className="text-3xl font-bold text-white mb-1">{current.title}</h3>
                  <div className="text-slate-500 text-sm">{current.year}</div>
                </div>
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${current.gradient} opacity-80 flex items-center justify-center`}>
                  <ExternalLink size={24} className="text-white" />
                </div>
              </div>

              {/* Description */}
              <p className="text-slate-300 leading-relaxed mb-6 flex-grow">
                {current.description}
              </p>

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-4 mb-6 pt-6 border-t border-slate-800">
                {current.metrics.map((metric) => (
                  <div key={metric} className="text-center">
                    <div className="text-cyan-400 font-semibold text-sm md:text-base">{metric}</div>
                  </div>
                ))}
              </div>

              {/* Tech Stack */}
              <div className="flex flex-wrap gap-2">
                {current.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-xs rounded-full bg-slate-800 text-slate-300 border border-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive([i, i > activeIndex ? 1 : -1])}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === activeIndex ? "w-8 bg-cyan-400" : "w-2 bg-slate-700 hover:bg-slate-600"
              }`}
              aria-label={`Go to project ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
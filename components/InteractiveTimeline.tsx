"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const timelineData = [
  {
    year: "2023 - Present",
    role: "Head of Engineering",
    company: "Enterprise Scale",
    description: "Leading 100+ person global engineering organization across multiple continents. Driving AI integration strategy and architectural transformation.",
    highlights: ["AI Strategy", "Global Team Leadership", "Architecture Overhaul"]
  },
  {
    year: "2020 - 2023",
    role: "Engineering Manager",
    company: "Scale-up Phase",
    description: "Scaled engineering teams from 20 to 60. Implemented engineering excellence frameworks and aligned technical strategy with product vision.",
    highlights: ["Team Scaling", "Process Optimization", "Product Alignment"]
  },
  {
    year: "2017 - 2020",
    role: "VP of Engineering",
    company: "Growth Stage",
    description: "Owned the entire engineering organization. Built hiring pipelines, established architecture review boards, and drove cloud migration initiatives.",
    highlights: ["Cloud Migration", "Hiring Pipeline", "Architecture Governance"]
  },
  {
    year: "2012 - 2017",
    role: "Team Lead / Senior Architect",
    company: "Technical Foundation",
    description: "Led complex .NET and React projects. Designed microservices architectures and mentored junior engineers into senior roles.",
    highlights: [".NET", "React", "Microservices", "Mentorship"]
  }
];

export const InteractiveTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section ref={containerRef} className="py-32 relative max-w-6xl mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-20 text-center"
      >
        The <span className="text-cyan-400">Journey</span>
      </motion.h2>

      <div className="relative max-w-5xl mx-auto">
        
        {/* The Animated Progress Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-800 md:-translate-x-1/2">
          <motion.div
            style={{ height: lineHeight }}
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_15px_rgba(6,182,212,0.6)]"
          />
        </div>

        {timelineData.map((item, index) => (
          <TimelineCard key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
};

interface TimelineItem {
  year: string;
  role: string;
  company: string;
  description: string;
  highlights: string[];
}

interface TimelineCardProps {
  item: TimelineItem;
  index: number;
}

const TimelineCard = ({ item, index }: TimelineCardProps) => {
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative flex items-center mb-16 md:w-1/2 ${
        isLeft ? "md:pr-12 md:ml-0" : "md:pl-12 md:ml-auto"
      } pl-16 md:pl-0`}
    >
      {/* The Glowing Dot */}
      <div className={`absolute left-8 md:left-auto ${isLeft ? "md:-right-[9px]" : "md:-left-[9px]"} w-4 h-4 rounded-full bg-cyan-400 ring-4 ring-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.8)] z-10`} />

      {/* The Card */}
      <motion.div
        whileHover={{ scale: 1.02, rotateY: isLeft ? 3 : -3 }}
        transition={{ type: "spring", stiffness: 300 }}
        className="w-full p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/50 transition-colors duration-500 group"
      >
        <div className="text-cyan-400 text-sm font-mono mb-2 tracking-wider">{item.year}</div>
        <h3 className="text-xl font-bold text-white mb-1">{item.role}</h3>
        <div className="text-slate-500 text-sm mb-3">{item.company}</div>
        <p className="text-slate-400 text-sm leading-relaxed mb-4">{item.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {item.highlights.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs rounded-full bg-slate-800/80 text-slate-300 border border-slate-700 group-hover:border-cyan-500/30 transition-colors"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};
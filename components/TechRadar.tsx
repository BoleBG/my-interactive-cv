"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const skillCategories = [
  { 
    name: "Frontend", 
    level: 95, 
    techs: ["React", "TypeScript", "Next.js", "Tailwind", "Framer Motion"] 
  },
  { 
    name: "Backend", 
    level: 90, 
    techs: [".NET", "C#", "Node.js", "REST", "GraphQL"] 
  },
  { 
    name: "Cloud", 
    level: 85, 
    techs: ["Azure", "AWS", "Docker", "Kubernetes", "Terraform"] 
  },
  { 
    name: "Architecture", 
    level: 95, 
    techs: ["Microservices", "Event-Driven", "DDD", "System Design"] 
  },
  { 
    name: "Leadership", 
    level: 98, 
    techs: ["100+ Teams", "Hiring", "Mentorship", "Strategy"] 
  },
  { 
    name: "AI / ML", 
    level: 80, 
    techs: ["LLM Integration", "Prompt Engineering", "AI Workflows", "RAG"] 
  },
  { 
    name: "Databases", 
    level: 88, 
    techs: ["PostgreSQL", "SQL Server", "MongoDB", "Redis", "CosmosDB"] 
  },
  { 
    name: "DevOps", 
    level: 75, 
    techs: ["CI/CD", "GitHub Actions", "Azure DevOps", "Monitoring"] 
  }
];

export const TechRadar = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  
  const size = 400;
  const center = size / 2;
  const maxRadius = 150;
  const levels = 5;

  const getPoint = (index: number, radius: number) => {
    const angle = (Math.PI * 2 * index) / skillCategories.length - Math.PI / 2;
    return {
      x: center + radius * Math.cos(angle),
      y: center + radius * Math.sin(angle),
    };
  };

  const buildPolygonPath = () => {
    return skillCategories
      .map((skill, i) => {
        const radius = (skill.level / 100) * maxRadius;
        const { x, y } = getPoint(i, radius);
        return `${i === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ") + " Z";
  };

  return (
    <section className="py-32 max-w-6xl mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-4 text-center"
      >
        Technical <span className="text-cyan-400">Arsenal</span>
      </motion.h2>
      <p className="text-slate-500 text-center mb-16">Hover over any axis to explore the stack</p>

      <div className="relative max-w-2xl mx-auto flex flex-col items-center">
        
        {/* The SVG Radar */}
        <svg width={size} height={size} className="overflow-visible">
          {/* Background Grid Rings */}
          {Array.from({ length: levels }).map((_, i) => {
            const radius = (maxRadius / levels) * (i + 1);
            const points = skillCategories
              .map((_, idx) => {
                const { x, y } = getPoint(idx, radius);
                return `${x},${y}`;
              })
              .join(" ");
            return (
              <polygon
                key={i}
                points={points}
                fill="none"
                stroke="rgb(30 41 59)"
                strokeWidth="1"
                opacity={0.5}
              />
            );
          })}

          {/* Axis Lines */}
          {skillCategories.map((_, i) => {
            const { x, y } = getPoint(i, maxRadius);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="rgb(30 41 59)"
                strokeWidth="1"
                opacity={0.5}
              />
            );
          })}

          {/* The Animated Skill Polygon */}
          <motion.path
            d={buildPolygonPath()}
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 2, ease: "easeInOut" }}
            fill="rgba(6, 182, 212, 0.15)"
            stroke="url(#radarGradient)"
            strokeWidth="2"
            className="drop-shadow-[0_0_10px_rgba(6,182,212,0.5)]"
          />

          {/* Gradient Definition */}
          <defs>
            <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#a855f7" />
            </linearGradient>
          </defs>

          {/* Interactive Data Points */}
          {skillCategories.map((skill, i) => {
            const radius = (skill.level / 100) * maxRadius;
            const { x, y } = getPoint(i, radius);
            const isActive = activeIndex === i;
            return (
              <motion.circle
                key={i}
                cx={x}
                cy={y}
                r={isActive ? 8 : 5}
                fill={isActive ? "#06b6d4" : "#0e7490"}
                stroke="#06b6d4"
                strokeWidth="2"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i }}
                onMouseEnter={() => setActiveIndex(i)}
                onMouseLeave={() => setActiveIndex(null)}
                className="cursor-pointer"
                style={{ filter: isActive ? "drop-shadow(0 0 8px #06b6d4)" : "none" }}
              />
            );
          })}

          {/* Axis Labels */}
          {skillCategories.map((skill, i) => {
            const { x, y } = getPoint(i, maxRadius + 30);
            return (
              <text
                key={i}
                x={x}
                y={y}
                textAnchor="middle"
                dominantBaseline="middle"
                className="fill-slate-400 text-xs font-medium pointer-events-none"
                style={{ fontSize: "12px" }}
              >
                {skill.name}
              </text>
            );
          })}
        </svg>

        {/* Dynamic Tooltip */}
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-8 min-h-[80px] text-center"
        >
          {activeIndex !== null ? (
            <>
              <div className="text-cyan-400 font-semibold mb-2">
                {skillCategories[activeIndex].name} 
                <span className="text-slate-500 font-normal ml-2">
                  {skillCategories[activeIndex].level}%
                </span>
              </div>
              <div className="flex flex-wrap justify-center gap-2 max-w-md">
                {skillCategories[activeIndex].techs.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 text-xs rounded-full bg-slate-900 border border-cyan-500/30 text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <div className="text-slate-600 text-sm">Hover over a point on the radar</div>
          )}
        </motion.div>
      </div>
    </section>
  );
};
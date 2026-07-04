"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface TimelineItem {
  year: string;
  role: string;
  company: string;
  description: string;
  highlights: string[];
  detailedInfo: {
    responsibilities: string[];
    achievements: string[];
    technologies: string[];
    teamSize?: string;
    scope?: string;
  };
}

const timelineData: TimelineItem[] = [
  {
    year: "2023 - Present",
    role: "Head of Engineering",
    company: "Enterprise Scale",
    description: "Leading 100+ person global engineering organization across multiple continents. Driving AI integration strategy and architectural transformation.",
    highlights: ["AI Strategy", "Global Team Leadership", "Architecture Overhaul"],
    detailedInfo: {
      responsibilities: [
        "Leading a global engineering organization of 100+ engineers across 4 continents",
        "Defining and executing the company's AI integration strategy",
        "Overseeing architectural transformation from monolith to microservices",
        "Establishing engineering culture and best practices across distributed teams",
        "Partnering with C-suite to align technical strategy with business objectives",
        "Building and scaling high-performing engineering leadership team"
      ],
      achievements: [
        "Successfully integrated AI tools into development workflows, reducing code review time by 60%",
        "Led architectural overhaul that improved system scalability by 10x",
        "Established unified engineering culture across 4 continents with 98% retention rate",
        "Implemented engineering excellence framework adopted by 3 business units",
        "Reduced time-to-market by 40% through process optimization",
        "Built mentorship program that promoted 15 engineers to senior roles in 18 months"
      ],
      technologies: ["AI/ML", "Microservices", "Event-Driven Architecture", "Cloud-Native", "DDD"],
      teamSize: "100+ engineers across 4 continents",
      scope: "Global engineering organization with multiple product lines"
    }
  },
  {
    year: "2020 - 2023",
    role: "Engineering Manager",
    company: "Scale-up Phase",
    description: "Scaled engineering teams from 20 to 60. Implemented engineering excellence frameworks and aligned technical strategy with product vision.",
    highlights: ["Team Scaling", "Process Optimization", "Product Alignment"],
    detailedInfo: {
      responsibilities: [
        "Scaling engineering organization from 20 to 60 engineers",
        "Implementing engineering excellence frameworks and best practices",
        "Aligning technical strategy with product roadmap and business goals",
        "Managing multiple engineering teams across different product areas",
        "Establishing hiring pipelines and onboarding processes",
        "Driving technical debt reduction and architecture improvements"
      ],
      achievements: [
        "Successfully scaled team 3x while maintaining velocity and quality",
        "Implemented DORA metrics tracking, improving deployment frequency by 2x",
        "Established architecture review board that reduced production incidents by 45%",
        "Created career development framework that improved retention by 30%",
        "Led cloud migration project with zero downtime",
        "Built async-first culture enabling effective collaboration across time zones"
      ],
      technologies: [".NET", "React", "Azure", "Kubernetes", "CI/CD"],
      teamSize: "Grew from 20 to 60 engineers",
      scope: "Multiple product teams with diverse technical stacks"
    }
  },
  {
    year: "2017 - 2020",
    role: "VP of Engineering",
    company: "Growth Stage",
    description: "Owned the entire engineering organization. Built hiring pipelines, established architecture review boards, and drove cloud migration initiatives.",
    highlights: ["Cloud Migration", "Hiring Pipeline", "Architecture Governance"],
    detailedInfo: {
      responsibilities: [
        "Full ownership of engineering organization and technical strategy",
        "Building scalable hiring pipelines and talent acquisition processes",
        "Establishing architecture review boards and governance processes",
        "Driving enterprise-wide cloud migration initiatives",
        "Setting engineering budgets and resource allocation",
        "Defining technical standards and best practices across the organization"
      ],
      achievements: [
        "Led successful cloud migration from on-premise to Azure, reducing infrastructure costs by 35%",
        "Built hiring pipeline that scaled team from 15 to 50 engineers in 2 years",
        "Established architecture review board that improved system reliability by 60%",
        "Implemented engineering metrics dashboard for data-driven decision making",
        "Created technical career ladder that improved engineer satisfaction scores by 40%",
        "Reduced technical debt by 50% through systematic refactoring initiatives"
      ],
      technologies: ["Azure", "AWS", "Docker", "Terraform", "Microservices"],
      teamSize: "15 to 50 engineers",
      scope: "Entire engineering organization and technical infrastructure"
    }
  },
  {
    year: "2012 - 2017",
    role: "Team Lead / Senior Architect",
    company: "Technical Foundation",
    description: "Led complex .NET and React projects. Designed microservices architectures and mentored junior engineers into senior roles.",
    highlights: [".NET", "React", "Microservices", "Mentorship"],
    detailedInfo: {
      responsibilities: [
        "Leading technical design and architecture for complex projects",
        "Mentoring junior engineers and conducting code reviews",
        "Designing and implementing microservices architectures",
        "Making technology stack decisions and establishing best practices",
        "Collaborating with product managers on technical feasibility",
        "Hands-on coding and technical problem-solving"
      ],
      achievements: [
        "Designed microservices architecture that became the foundation for company's platform",
        "Mentored 8 junior engineers who were promoted to senior roles",
        "Led migration from legacy monolith to modern microservices architecture",
        "Implemented automated testing strategy that increased code coverage from 30% to 85%",
        "Reduced deployment time from days to hours through CI/CD implementation",
        "Established code review practices that improved code quality and knowledge sharing"
      ],
      technologies: [".NET", "C#", "React", "SQL Server", "Azure"],
      scope: "Multiple product teams and technical architecture decisions"
    }
  }
];

export const InteractiveTimeline = () => {
  const containerRef = useRef(null);
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

const TimelineCard = ({ item, index }: { item: TimelineItem; index: number }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`relative flex items-start mb-16 md:w-1/2 ${
        isLeft ? "md:pr-12 md:ml-0" : "md:pl-12 md:ml-auto"
      } pl-16 md:pl-0`}
    >
      {/* The Glowing Dot */}
      <div className={`absolute left-8 md:left-auto ${isLeft ? "md:-right-[9px]" : "md:-left-[9px]"} w-4 h-4 rounded-full bg-cyan-400 ring-4 ring-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.8)] z-10`} />

      {/* The Card */}
      <motion.div
        layout
        className="w-full rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/50 transition-colors duration-500 group overflow-hidden"
      >
        <div className="p-6">
          <div className="text-cyan-400 text-sm font-mono mb-2 tracking-wider">{item.year}</div>
          <h3 className="text-xl font-bold text-white mb-1">{item.role}</h3>
          <div className="text-slate-500 text-sm mb-3">{item.company}</div>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">{item.description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {item.highlights.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full bg-slate-800/80 text-slate-300 border border-slate-700 group-hover:border-cyan-500/30 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Show/Hide Details Button */}
          <motion.button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-400 transition-all duration-300 group/btn"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="text-sm font-medium">
              {isExpanded ? "Hide Details" : "Show Details"}
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </motion.div>
          </motion.button>
        </div>

        {/* Expandable Details Section */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="px-6 pb-6 pt-2 border-t border-slate-800">
                
                {/* Team Size & Scope */}
                {(item.detailedInfo.teamSize || item.detailedInfo.scope) && (
                  <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    {item.detailedInfo.teamSize && (
                      <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                        <div className="text-xs uppercase tracking-wider text-cyan-400 mb-1">Team Size</div>
                        <div className="text-slate-300 text-sm">{item.detailedInfo.teamSize}</div>
                      </div>
                    )}
                    {item.detailedInfo.scope && (
                      <div className="p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
                        <div className="text-xs uppercase tracking-wider text-cyan-400 mb-1">Scope</div>
                        <div className="text-slate-300 text-sm">{item.detailedInfo.scope}</div>
                      </div>
                    )}
                  </div>
                )}

                {/* Responsibilities */}
                <div className="mb-6">
                  <div className="text-xs uppercase tracking-wider text-cyan-400 mb-3">Key Responsibilities</div>
                  <ul className="space-y-2">
                    {item.detailedInfo.responsibilities.map((resp, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-start gap-3 text-slate-300 text-sm"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                        <span>{resp}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Achievements */}
                <div className="mb-6">
                  <div className="text-xs uppercase tracking-wider text-purple-400 mb-3">Key Achievements</div>
                  <ul className="space-y-2">
                    {item.detailedInfo.achievements.map((achievement, i) => (
                      <motion.li
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 + i * 0.05 }}
                        className="flex items-start gap-3 text-slate-300 text-sm"
                      >
                        <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                        <span>{achievement}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <div className="text-xs uppercase tracking-wider text-slate-400 mb-3">Technologies & Tools</div>
                  <div className="flex flex-wrap gap-2">
                    {item.detailedInfo.technologies.map((tech, i) => (
                      <motion.span
                        key={tech}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + i * 0.05 }}
                        className="px-3 py-1 text-xs rounded-full bg-slate-800 text-slate-300 border border-slate-700"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
};
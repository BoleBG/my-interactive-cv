"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown, ChevronUp, CheckCircle2, ArrowRight } from "lucide-react";

// --- TypeScript Interface for Timeline Data ---
interface TimelineDetails {
  summary: string;
  achievements: string[];
  techStack: string[];
}

interface TimelineItem {
  year: string;
  role: string;
  company: string;
  description: string;
  highlights: string[];
  details: TimelineDetails;
}

// 📝 REPLACE THE CONTENT BELOW WITH YOUR EXACT ORIGINAL WEBSITE TEXT
const timelineData: TimelineItem[] = [
  {
    year: "2023 - Present",
    role: "Head of Engineering",
    company: "Global Enterprise",
    description: "Leading 100+ person engineering organization across multiple continents. Driving AI integration strategy and architectural transformation.",
    highlights: ["AI Strategy", "Global Team Leadership", "Architecture Overhaul"],
    details: {
      summary: "Transformed a fragmented engineering organization into a cohesive, high-performing global team. Established engineering excellence frameworks, drove cloud-native migration, and embedded AI tools into developer workflows.",
      achievements: [
        "Scaled engineering org from 40 to 100+ engineers while improving deployment frequency by 3x",
        "Implemented AI-assisted code review, reducing review time by 60% across 15 product teams",
        "Established async-first culture across 4 time zones, improving cross-continental collaboration",
        "Led architectural modernization, decomposing monoliths into event-driven microservices"
      ],
      techStack: [".NET Core", "React/Next.js", "Azure/AWS", "Kubernetes", "Kafka", "AI/LLMs"]
    }
  },
  {
    year: "2020 - 2023",
    role: "Engineering Manager",
    company: "High-Growth Scale-up",
    description: "Scaled engineering teams from 20 to 60. Implemented engineering excellence frameworks and aligned technical strategy with product vision.",
    highlights: ["Team Scaling", "Process Optimization", "Product Alignment"],
    details: {
      summary: "Built and scaled multiple engineering teams from the ground up. Focused on creating sustainable processes, mentoring engineers into leadership roles, and establishing clear technical roadmaps aligned with business objectives.",
      achievements: [
        "Grew engineering team from 20 to 60 while maintaining <1% attrition rate",
        "Introduced DORA metrics and CI/CD automation, increasing deployment frequency from monthly to daily",
        "Established career progression framework adopted company-wide",
        "Partnered with Product to implement outcome-driven roadmapping"
      ],
      techStack: ["Microservices", "React", ".NET", "PostgreSQL", "Docker", "GitHub Actions"]
    }
  },
  {
    year: "2017 - 2020",
    role: "VP of Engineering",
    company: "Product-Led Growth Company",
    description: "Owned the entire engineering organization. Built hiring pipelines, established architecture review boards, and drove cloud migration initiatives.",
    highlights: ["Cloud Migration", "Hiring Pipeline", "Architecture Governance"],
    details: {
      summary: "Led the engineering function through a critical growth phase, transitioning from legacy infrastructure to modern cloud-native architectures while maintaining high product velocity.",
      achievements: [
        "Led zero-downtime migration from on-premise to cloud, reducing infrastructure costs by 35%",
        "Built technical hiring pipeline that reduced time-to-hire from 60 to 28 days",
        "Established Architecture Review Board (ARB) to ensure scalable, maintainable system design",
        "Mentored 3 engineering managers who went on to lead their own departments"
      ],
      techStack: ["Azure", "AWS", "Terraform", "C#", "Angular/React", "SQL Server", "Redis"]
    }
  },
  {
    year: "2012 - 2017",
    role: "Team Lead / Senior Architect",
    company: "Technical Foundation",
    description: "Led complex .NET and React projects. Designed microservices architectures and mentored junior engineers into senior roles.",
    highlights: [".NET", "React", "Microservices", "Mentorship"],
    details: {
      summary: "Hands-on technical leadership phase where I bridged architecture design with team delivery. Focused on establishing scalable patterns, code quality standards, and a culture of continuous improvement.",
      achievements: [
        "Designed and delivered first microservices architecture handling 1M+ daily transactions",
        "Introduced automated testing and code review standards, reducing production incidents by 70%",
        "Mentored 8 junior developers into mid/senior roles within 3 years",
        "Led cross-functional teams to deliver complex enterprise SaaS products"
      ],
      techStack: [".NET Framework/Core", "React", "Entity Framework", "RabbitMQ", "Azure DevOps", "SQL"]
    }
  }
];

export const InteractiveTimeline = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  const toggleDetails = (index: number) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };

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
        {/* Animated Progress Line */}
        <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-[2px] bg-slate-800 md:-translate-x-1/2">
          <motion.div
            style={{ height: lineHeight }}
            className="absolute top-0 left-0 w-full bg-gradient-to-b from-cyan-400 via-blue-500 to-purple-600 shadow-[0_0_15px_rgba(6,182,212,0.6)]"
          />
        </div>

        {timelineData.map((item, index) => (
          <TimelineCard
            key={index}
            item={item}
            index={index}
            isExpanded={expandedIndex === index}
            onToggle={() => toggleDetails(index)}
          />
        ))}
      </div>
    </section>
  );
};

const TimelineCard = ({
  item,
  index,
  isExpanded,
  onToggle,
}: {
  item: TimelineItem;
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}) => {
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
      {/* Glowing Dot */}
      <div
        className={`absolute left-8 md:left-auto top-0 w-4 h-4 rounded-full bg-cyan-400 ring-4 ring-slate-950 shadow-[0_0_20px_rgba(6,182,212,0.8)] z-10 ${
          isLeft ? "md:-right-[9px]" : "md:-left-[9px]"
        }`}
      />

      {/* Card Container */}
      <div className="w-full">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="w-full p-6 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/50 transition-colors duration-500 group"
        >
          <div className="text-cyan-400 text-sm font-mono mb-2 tracking-wider">
            {item.year}
          </div>
          <h3 className="text-xl font-bold text-white mb-1">{item.role}</h3>
          <div className="text-slate-500 text-sm mb-3">{item.company}</div>
          <p className="text-slate-400 text-sm leading-relaxed mb-4">
            {item.description}
          </p>

          {/* Highlights Tags */}
          <div className="flex flex-wrap gap-2 mb-5">
            {item.highlights.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-xs rounded-full bg-slate-800/80 text-slate-300 border border-slate-700 group-hover:border-cyan-500/30 transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Toggle Button */}
          <button
            onClick={onToggle}
            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-cyan-400 transition-all duration-300 group/btn"
            aria-expanded={isExpanded}
          >
            <span className="text-sm font-medium">
              {isExpanded ? "Hide Details" : "Show Details"}
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </motion.div>
          </button>
        </motion.div>

        {/* Expandable Details Section */}
        <motion.div
          initial={false}
          animate={{
            height: isExpanded ? "auto" : 0,
            opacity: isExpanded ? 1 : 0,
          }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="overflow-hidden"
        >
          <div className="pt-2 pb-4 px-1">
            <div className="p-5 rounded-xl bg-slate-900/40 border border-slate-800 backdrop-blur-sm">
              {/* Summary */}
              <p className="text-slate-300 text-sm leading-relaxed mb-4 italic border-l-2 border-cyan-500/30 pl-4">
                "{item.details.summary}"
              </p>

              {/* Achievements */}
              <div className="mb-5">
                <h4 className="text-xs uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
                  <CheckCircle2 size={14} /> Key Achievements
                </h4>
                <ul className="space-y-2">
                  {item.details.achievements.map((achievement, i) => (
                    <li key={i} className="flex items-start gap-2 text-slate-300 text-sm">
                      <ArrowRight size={14} className="mt-1 text-slate-500 flex-shrink-0" />
                      <span>{achievement}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Tech Stack */}
              <div>
                <h4 className="text-xs uppercase tracking-wider text-purple-400 mb-2">
                  Technologies & Tools
                </h4>
                <div className="flex flex-wrap gap-2">
                  {item.details.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 text-xs rounded-md bg-slate-800 text-slate-400 border border-slate-700/50"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};InteractiveTimeline copy
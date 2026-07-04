"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useMotionValue, useTransform, AnimatePresence } from "framer-motion";
import { X, Users, Settings, Building2, Bot, Target, Compass } from "lucide-react";

interface FocusArea {
  icon: any;
  title: string;
  description: string;
  detailedInfo: {
    title: string;
    overview: string;
    approach: string;
    outcomes: string[];
    keyPractices: string[];
  };
}

const focusAreasData: FocusArea[] = [
  {
    icon: Users,
    title: "People Development",
    description: "Identifying unique growth paths for each engineer. Fostering mentor-mentee relationships to accelerate learning and build stronger, more autonomous teams.",
    detailedInfo: {
      title: "Building Exceptional Engineering Talent",
      overview: "People are the foundation of great engineering. My approach focuses on understanding each engineer's unique strengths, aspirations, and growth areas to create personalized development paths.",
      approach: "I believe in creating environments where engineers feel ownership over their work and are motivated to grow. This means establishing strong mentor-mentee relationships, providing regular feedback, and creating opportunities for engineers to stretch beyond their comfort zones.",
      outcomes: [
        "Engineers consistently promoted to senior and staff roles",
        "Higher retention rates through meaningful career progression",
        "Stronger team autonomy and reduced dependency on management",
        "Culture of continuous learning and knowledge sharing"
      ],
      keyPractices: [
        "Individual development plans tailored to each engineer",
        "Structured mentorship programs pairing senior and junior engineers",
        "Regular 1:1s focused on growth, not just status updates",
        "Creating safe spaces for experimentation and learning from failures"
      ]
    }
  },
  {
    icon: Settings,
    title: "Process Optimization",
    description: "Evaluating and evolving engineering practices to enhance team effectiveness, quality, and predictability while reducing friction and waste.",
    detailedInfo: {
      title: "Engineering Excellence Through Process",
      overview: "Great processes don't slow teams down — they accelerate them by removing friction, reducing cognitive load, and creating predictable outcomes. I focus on continuous improvement of how we work.",
      approach: "I evaluate existing processes through the lens of developer experience and delivery velocity. The goal is to find the right balance between structure and autonomy, ensuring teams have clear guardrails without unnecessary bureaucracy.",
      outcomes: [
        "2-3x improvement in deployment frequency",
        "Reduced lead time from idea to production",
        "Higher code quality and fewer production incidents",
        "Better predictability in delivery timelines"
      ],
      keyPractices: [
        "Implementing DORA metrics to measure engineering performance",
        "Streamlining CI/CD pipelines for faster, safer deployments",
        "Establishing clear definition of done and quality standards",
        "Regular retrospectives with actionable improvements",
        "Automating repetitive tasks to reduce cognitive load"
      ]
    }
  },
  {
    icon: Building2,
    title: "Architecture & Setup",
    description: "Guiding teams in building robust, scalable, and maintainable system architectures that support long-term product evolution.",
    detailedInfo: {
      title: "Scalable Architecture for Long-Term Success",
      overview: "Architecture decisions made today shape the product's ability to evolve tomorrow. I focus on building systems that are robust enough to handle current needs while remaining flexible for future growth.",
      approach: "I work closely with teams to establish architectural principles and patterns that promote maintainability and scalability. This includes making thoughtful technology choices, establishing clear boundaries between services, and ensuring systems can evolve without complete rewrites.",
      outcomes: [
        "Systems that scale seamlessly with business growth",
        "Reduced technical debt through proactive architecture reviews",
        "Faster onboarding for new engineers through clear documentation",
        "Lower operational costs through efficient resource utilization"
      ],
      keyPractices: [
        "Architecture Decision Records (ADRs) for transparent decision-making",
        "Regular architecture reviews and health checks",
        "Domain-Driven Design principles for clear service boundaries",
        "Infrastructure as Code for reproducible environments",
        "Performance and scalability testing as part of development workflow"
      ]
    }
  },
  {
    icon: Bot,
    title: "AI Integration",
    description: "Embedding AI tools into daily workflows to boost efficiency, reduce repetitive work, and enable engineers to focus on high-value tasks.",
    detailedInfo: {
      title: "Augmenting Engineering with AI",
      overview: "AI is not about replacing engineers — it's about amplifying their capabilities. I focus on strategically integrating AI tools into workflows to eliminate repetitive tasks and accelerate development.",
      approach: "I evaluate AI tools based on their ability to genuinely improve developer productivity and code quality. This means being selective, measuring impact, and ensuring AI augments rather than complicates the development process.",
      outcomes: [
        "60% reduction in time spent on code reviews",
        "Faster prototyping and proof-of-concept development",
        "Improved code quality through AI-assisted testing",
        "Engineers spending more time on creative problem-solving"
      ],
      keyPractices: [
        "Integrating AI code assistants into development workflows",
        "Using AI for automated code review and quality checks",
        "Leveraging AI for documentation generation and maintenance",
        "Implementing AI-powered testing and bug detection",
        "Training teams on effective prompt engineering"
      ]
    }
  },
  {
    icon: Target,
    title: "Engineering & Product Alignment",
    description: "Ensuring engineering capabilities and constraints are central to product definition, roadmap planning, and strategic decision-making from the outset.",
    detailedInfo: {
      title: "Bridging Engineering and Product Strategy",
      overview: "Great products require tight alignment between what's valuable to users and what's feasible to build. I ensure engineering is a strategic partner in product development, not just an execution function.",
      approach: "I embed engineering leadership early in the product discovery process, ensuring technical feasibility, scalability considerations, and architectural implications inform product decisions from day one.",
      outcomes: [
        "More realistic product roadmaps with achievable timelines",
        "Reduced rework through early technical validation",
        "Better balance between feature development and technical investment",
        "Stronger collaboration between product and engineering teams"
      ],
      keyPractices: [
        "Engineering representation in product strategy sessions",
        "Technical feasibility assessments before roadmap commitment",
        "Joint product-engineering planning and prioritization",
        "Clear communication of technical constraints and trade-offs",
        "Balancing feature work with technical debt reduction"
      ]
    }
  },
  {
    icon: Compass,
    title: "Technical Strategy & Roadmapping",
    description: "Defining technical direction and long-term architecture strategies that align with business goals and support sustainable growth.",
    detailedInfo: {
      title: "Strategic Technical Leadership",
      overview: "Technical strategy is about making intentional choices today that position the organization for success tomorrow. I focus on creating clear technical visions that align with business objectives.",
      approach: "I work with executive leadership to understand business goals and translate them into technical strategies. This involves making deliberate technology choices, planning for scalability, and ensuring the technical foundation supports long-term growth.",
      outcomes: [
        "Clear technical roadmap aligned with business objectives",
        "Proactive technology adoption rather than reactive migrations",
        "Reduced risk through strategic technology choices",
        "Engineering organization positioned for future growth"
      ],
      keyPractices: [
        "Annual technology strategy reviews and updates",
        "Technology radar for tracking emerging tools and practices",
        "Strategic partnerships with key technology vendors",
        "Investment in engineering platform and developer experience",
        "Succession planning and knowledge distribution"
      ]
    }
  }
];

// --- 3D Tilt Card with Click Functionality ---
const TiltCard = ({ area, onClick }: { area: FocusArea; onClick: () => void }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-150, 150], [10, -10]);
  const rotateY = useTransform(x, [-150, 150], [-10, 10]);
  const glareX = useTransform(x, [-150, 150], ["0%", "100%"]);
  const glareY = useTransform(y, [-150, 150], ["0%", "100%"]);

  function handleMouse(event: React.MouseEvent) {
    const rect = ref.current!.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    x.set(mouseX - width / 2);
    y.set(mouseY - height / 2);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  const Icon = area.icon;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      className="relative group p-8 rounded-2xl bg-slate-900/50 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/50 transition-colors duration-500 overflow-hidden cursor-pointer hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]"
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
    >
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none"
        style={{
          background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(6, 182, 212, 0.4), transparent 50%)`,
        }}
      />
      
      <div style={{ transform: "translateZ(20px)" }} className="relative z-10">
        <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4 text-cyan-400 border border-cyan-500/20">
          <Icon size={24} />
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{area.title}</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-3">{area.description}</p>
        
        <div className="text-xs text-cyan-500/70 group-hover:text-cyan-400 transition-colors flex items-center gap-1">
          <span>Click to learn more</span>
          <motion.span
            animate={{ x: [0, 4, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
          >
            →
          </motion.span>
        </div>
      </div>
    </motion.div>
  );
};

// --- Focus Area Modal (FIXED: Scrollable with Sticky Header) ---
const FocusAreaModal = ({ area, onClose }: { area: FocusArea | null; onClose: () => void }) => {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (area) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [area]);

  if (!area) return null;

  const Icon = area.icon;

  return (
    <AnimatePresence>
      {area && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-slate-950/80 backdrop-blur-md"
          />

          {/* Modal Container - Now with max-height and proper scrolling */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ 
                opacity: 0, 
                scale: 0.8, 
                y: 40,
                rotateX: -15 
              }}
              animate={{ 
                opacity: 1, 
                scale: 1, 
                y: 0,
                rotateX: 0 
              }}
              exit={{ 
                opacity: 0, 
                scale: 0.85, 
                y: 30,
                rotateX: 10 
              }}
              transition={{ 
                type: "spring", 
                stiffness: 260, 
                damping: 25 
              }}
              onClick={(e) => e.stopPropagation()}
              className="relative pointer-events-auto w-full max-w-2xl max-h-[90vh] rounded-3xl bg-slate-900/95 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_0_60px_rgba(6,182,212,0.2)] overflow-hidden flex flex-col"
              style={{ perspective: "1000px" }}
            >
              {/* 🔒 STICKY HEADER - Always Visible */}
              <div className="relative flex-shrink-0">
                {/* Decorative Gradient Glow at Top */}
                <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-cyan-500/20 to-transparent pointer-events-none" />
                
                {/* Close Button - Always Visible */}
                <motion.button
                  onClick={onClose}
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-800/90 backdrop-blur border border-slate-700 hover:border-cyan-500 hover:text-cyan-400 flex items-center justify-center transition-colors shadow-lg"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </motion.button>

                {/* Header Content */}
                <div className="relative p-8 pb-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 flex items-center justify-center mb-4 text-cyan-400 border border-cyan-500/20">
                      <Icon size={32} />
                    </div>
                    <h2 className="text-3xl font-bold text-white mb-2 pr-12">
                      {area.title}
                    </h2>
                    <p className="text-slate-400 text-sm">
                      {area.detailedInfo.title}
                    </p>
                  </motion.div>

                  {/* Divider */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                    className="h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent mt-6 origin-left"
                  />
                </div>
              </div>

              {/* 📜 SCROLLABLE CONTENT AREA */}
              <div className="relative flex-1 overflow-y-auto overflow-x-hidden px-8 pb-8 custom-scrollbar">
                <div className="pr-2">
                  {/* Overview */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    className="mb-6"
                  >
                    <p className="text-slate-300 leading-relaxed">
                      {area.detailedInfo.overview}
                    </p>
                  </motion.div>

                  {/* Approach */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mb-6"
                  >
                    <div className="text-xs uppercase tracking-wider text-cyan-400 mb-2">
                      My Approach
                    </div>
                    <p className="text-slate-300 leading-relaxed">
                      {area.detailedInfo.approach}
                    </p>
                  </motion.div>

                  {/* Outcomes */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    className="mb-6"
                  >
                    <div className="text-xs uppercase tracking-wider text-cyan-400 mb-3">
                      Key Outcomes
                    </div>
                    <ul className="space-y-2">
                      {area.detailedInfo.outcomes.map((outcome, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 + i * 0.05 }}
                          className="flex items-start gap-3 text-slate-300 text-sm"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                          <span>{outcome}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Key Practices */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="mb-6"
                  >
                    <div className="text-xs uppercase tracking-wider text-cyan-400 mb-3">
                      Key Practices
                    </div>
                    <ul className="space-y-2">
                      {area.detailedInfo.keyPractices.map((practice, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.55 + i * 0.05 }}
                          className="flex items-start gap-3 text-slate-300 text-sm"
                        >
                          <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                          <span>{practice}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>

                  {/* Footer Hint */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="mt-8 pt-6 border-t border-slate-800 text-xs text-slate-500 text-center"
                  >
                    Press <kbd className="px-2 py-0.5 rounded bg-slate-800 border border-slate-700 text-slate-300">ESC</kbd> or click outside to close
                  </motion.div>
                </div>
              </div>

              {/* Bottom Gradient Fade (visual hint that content is scrollable) */}
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-900/95 to-transparent pointer-events-none opacity-60" />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Main Focus Areas Section ---
export const FocusAreas = () => {
  const [selectedArea, setSelectedArea] = useState<FocusArea | null>(null);

  return (
    <section className="py-20 max-w-6xl mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-3xl md:text-4xl font-bold mb-12 text-center"
      >
        My <span className="text-cyan-400">Operating System</span>
      </motion.h2>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ perspective: "1000px" }}>
        {focusAreasData.map((area, index) => (
          <motion.div
            key={area.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <TiltCard 
              area={area} 
              onClick={() => setSelectedArea(area)} 
            />
          </motion.div>
        ))}
      </div>

      {/* The Floating Modal */}
      <FocusAreaModal 
        area={selectedArea} 
        onClose={() => setSelectedArea(null)} 
      />
    </section>
  );
};
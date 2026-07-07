"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
  additionalInfo?: {
    title: string;
    description: string;
    highlights?: string[];
  };
}

// --- Individual Animated Counter Card (Clickable) ---
export const AnimatedCounter = ({ 
  value, 
  suffix = "", 
  prefix = "", 
  label, 
  duration = 2,
  additionalInfo,
  onClick 
}: CounterProps & { onClick?: () => void }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => `${prefix}${Math.round(latest)}${suffix}`);

  useEffect(() => {
    if (inView) {
      const controls = animate(count, value, { duration, ease: "easeOut" });
      return controls.stop;
    }
  }, [inView, value, duration, count]);

  const isClickable = !!additionalInfo;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={isClickable ? { y: -4, scale: 1.02 } : {}}
      whileTap={isClickable ? { scale: 0.98 } : {}}
      onClick={onClick}
      className={`relative group p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800 transition-all duration-500 ${
        isClickable ? "cursor-pointer hover:border-cyan-500/50 hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]" : ""
      }`}
    >
      {/* Hover Glow Effect */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 transition-all duration-500" />
      
      <div className="relative">
        <div className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          <motion.span ref={ref}>{rounded}</motion.span>
        </div>
        <div className="text-slate-400 text-sm uppercase tracking-wider">
          {label}
        </div>
        {isClickable && (
          <div className="mt-3 text-xs text-cyan-500/70 group-hover:text-cyan-400 transition-colors flex items-center gap-1">
            <span>Click to learn more</span>
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </div>
        )}
      </div>
    </motion.div>
  );
};

// --- The Floating Modal (FIXED: Scrollable with Sticky Header) ---
const StatModal = ({ stat, onClose }: { stat: CounterProps | null; onClose: () => void }) => {
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
    if (stat) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [stat]);

  if (!stat) return null;

  return (
    <AnimatePresence>
      {stat && (
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
              className="relative pointer-events-auto w-full max-w-lg max-h-[90vh] rounded-3xl bg-slate-900/95 backdrop-blur-2xl border border-cyan-500/30 shadow-[0_0_60px_rgba(6,182,212,0.2)] overflow-hidden flex flex-col"
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
                    <div className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">
                      {stat.prefix}{stat.value}{stat.suffix}
                    </div>
                    <div className="text-slate-400 text-sm uppercase tracking-wider">
                      {stat.label}
                    </div>
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
                  {/* Title & Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                  >
                    <h3 className="text-2xl font-bold text-white mb-3">
                      {stat.additionalInfo?.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed mb-6">
                      {stat.additionalInfo?.description}
                    </p>
                  </motion.div>

                  {/* Highlights */}
                  {stat.additionalInfo?.highlights && stat.additionalInfo.highlights.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.35 }}
                    >
                      <div className="text-xs uppercase tracking-wider text-cyan-400 mb-3">
                        Key Highlights
                      </div>
                      <ul className="space-y-2">
                        {stat.additionalInfo.highlights.map((highlight, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4 + i * 0.05 }}
                            className="flex items-start gap-3 text-slate-300 text-sm"
                          >
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                            <span>{highlight}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}

                  {/* Footer Hint */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
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

// --- Stats Section with Modal Integration ---
export const StatsSection = () => {
  const [selectedStat, setSelectedStat] = useState<CounterProps | null>(null);

  const stats: CounterProps[] = [
    { 
      value: 30, 
      suffix: "+", 
      label: "Years of Experience",
      additionalInfo: {
        title: "Three Decades of Engineering Excellence",
        description: "From writing my first lines of code to leading global engineering organizations, my journey spans the entire evolution of modern software development.",
        highlights: [
          "Started in the era of on-premise servers, evolved through cloud-native revolution",
          "Witnessed and shaped the transition from monoliths to microservices",
          "Led teams through multiple technology paradigm shifts",
          "Continuous learner — from .NET frameworks to cutting-edge AI integration"
        ]
      }
    },
    { 
      value: 100, 
      suffix: "+", 
      label: "Engineers Led",
      additionalInfo: {
        title: "Building High-Performing Teams",
        description: "Leading diverse, global engineering organizations across multiple continents. My focus is on creating environments where engineers do the best work of their careers.",
        highlights: [
          "Scaled teams from 20 to 100+ while maintaining velocity and quality",
          "Built inclusive cultures with engineers across 4+ continents",
          "Mentored dozens of engineers into senior and staff roles",
          "Established career frameworks that promote growth and ownership"
        ]
      }
    },
    { 
      value: 4, 
      label: "Continents Worked",
      additionalInfo: {
        title: "Global Engineering Leadership",
        description: "Having worked across multiple continents, I bring a unique perspective on building distributed teams that operate seamlessly across time zones and cultures.",
        highlights: [
          "Led teams across Europe, Asia, Americas, and Oceania",
          "Established async-first communication practices",
          "Built follow-the-sun engineering workflows",
          "Navigated cultural differences to create unified engineering culture"
        ]
      }
    },
    { 
      value: 50, 
      suffix: "+", 
      label: "Projects Delivered",
      additionalInfo: {
        title: "Shipping at Scale",
        description: "A proven track record of delivering complex, high-impact projects — from greenfield architecture builds to large-scale transformations and AI integrations.",
        highlights: [
          "Delivered mission-critical systems processing millions of events daily",
          "Led cloud migrations with zero downtime",
          "Shipped AI-powered platforms adopted by thousands of developers",
          "Consistently met aggressive timelines without compromising quality"
        ]
      }
    },
  ];

  return (
    <section className="py-20 max-w-6xl mx-auto px-6">
      <motion.h2 
        initial={{ opacity: 0 }} 
        whileInView={{ opacity: 1 }} 
        viewport={{ once: true }} 
        className="text-3xl md:text-4xl font-bold mb-12 text-center"
      >
        Impact in <span className="text-cyan-400">Numbers</span>
      </motion.h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <AnimatedCounter 
            key={stat.label} 
            {...stat} 
            onClick={() => setSelectedStat(stat)}
          />
        ))}
      </div>

      {/* The Floating Modal */}
      <StatModal 
        stat={selectedStat} 
        onClose={() => setSelectedStat(null)} 
      />
    </section>
  );
};
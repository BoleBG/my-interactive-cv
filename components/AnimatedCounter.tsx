"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useMotionValue, useTransform, animate } from "framer-motion";

interface CounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  duration?: number;
}

export const AnimatedCounter = ({ value, suffix = "", prefix = "", label, duration = 2 }: CounterProps) => {
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="relative group p-8 rounded-2xl bg-slate-900/40 backdrop-blur-xl border border-slate-800 hover:border-cyan-500/50 transition-all duration-500"
    >
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-500/0 to-purple-500/0 group-hover:from-cyan-500/5 group-hover:to-purple-500/5 transition-all duration-500" />
      <div className="relative">
        <div className="text-5xl md:text-6xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          <motion.span ref={ref}>{rounded}</motion.span>
        </div>
        <div className="text-slate-400 text-sm uppercase tracking-wider">{label}</div>
      </div>
    </motion.div>
  );
};

export const StatsSection = () => {
  const stats = [
    { value: 30, suffix: "+", label: "Years of Experience" },
    { value: 100, suffix: "+", label: "Engineers Led" },
    { value: 4, label: "Continents Worked" },
    { value: 50, suffix: "+", label: "Projects Delivered" },
  ];

  return (
    <section className="py-20 max-w-6xl mx-auto px-6">
      <motion.h2 initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} className="text-3xl md:text-4xl font-bold mb-12 text-center">
        Impact in <span className="text-cyan-400">Numbers</span>
      </motion.h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((stat) => <AnimatedCounter key={stat.label} {...stat} />)}
      </div>
    </section>
  );
};
"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Quote, Heart, Users, Target, TrendingUp, Zap, Shield, BarChart3, GitBranch } from "lucide-react";

export const LeadershipPhilosophy = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Parallax effect for decorative elements
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="py-32 relative overflow-hidden">
      {/* Ambient Background Effects */}
      <motion.div
        style={{ y: y1, opacity }}
        className="absolute top-20 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-[100px] pointer-events-none"
      />
      <motion.div
        style={{ y: y2, opacity }}
        className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/60 backdrop-blur border border-slate-800 mb-6">
            <Heart size={16} className="text-cyan-400" />
            <span className="text-xs uppercase tracking-wider text-slate-400">Core Beliefs</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            My Engineering <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Leadership Philosophy
            </span>
          </h2>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative p-8 md:p-12 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-slate-800 shadow-2xl"
        >
          {/* Decorative Quote Mark */}
          <div className="absolute -top-6 -left-6 w-20 h-20 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-purple-500/20 backdrop-blur border border-cyan-500/30 flex items-center justify-center">
            <Quote size={32} className="text-cyan-400" />
          </div>

          {/* Content Sections */}
          <div className="space-y-8">
            
            {/* Opening Statement */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative pl-6 border-l-2 border-cyan-500/50"
            >
              <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
                Organizations thrive when their <span className="text-cyan-400">people thrive</span>.
              </p>
              <p className="text-lg text-slate-300 mt-3 leading-relaxed">
                My primary goal is to create an environment where engineers feel <span className="text-purple-400">empowered, valued, and challenged</span>.
              </p>
            </motion.div>

            {/* Core Principle 1: Individual Recognition */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex gap-4 p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-cyan-500/30 transition-colors"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center">
                <Users size={24} className="text-cyan-400" />
              </div>
              <div>
                <p className="text-slate-300 leading-relaxed">
                  I believe in recognizing that <span className="text-white font-medium">every individual is unique</span>, bringing different strengths and perspectives. By tailoring my approach to each person, I help them become the best version of themselves within the team context.
                </p>
              </div>
            </motion.div>

            {/* Core Principle 2: Culture Building */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex gap-4 p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-purple-500/30 transition-colors"
            >
              <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <Target size={24} className="text-purple-400" />
              </div>
              <div>
                <p className="text-slate-300 leading-relaxed">
                  By fostering a culture of <span className="text-cyan-400">ownership</span>, <span className="text-purple-400">continuous learning</span>, and <span className="text-blue-400">open communication</span>, we build not just great products, but resilient, high-performing teams.
                </p>
                <p className="text-slate-400 text-sm mt-3 italic">
                  Leading teams of up to 100 people reinforces the need for scalable people-centric practices and robust processes.
                </p>
              </div>
            </motion.div>

            {/* Closing Statement */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="relative pl-6 border-l-2 border-purple-500/50"
            >
              <div className="flex items-start gap-3">
                <TrendingUp size={20} className="text-purple-400 mt-1 flex-shrink-0" />
                <p className="text-lg md:text-xl text-slate-200 leading-relaxed">
                  Ultimately, <span className="text-white font-semibold">investing in people and processes</span> directly translates into <span className="text-cyan-400">better products</span> and <span className="text-purple-400">stronger organizational outcomes</span>.
                </p>
              </div>
            </motion.div>

          </div>

          {/* Decorative Bottom Gradient */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-900/40 to-transparent pointer-events-none rounded-b-3xl" />
        </motion.div>

        {/* Key Values Grid - Now with Lucide Icons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12"
        >
          {[
            { label: "Empowerment", icon: Zap },
            { label: "Ownership", icon: Shield },
            { label: "Growth", icon: BarChart3 },
            { label: "Collaboration", icon: GitBranch }
          ].map((value, i) => (
            <motion.div
              key={value.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 + i * 0.1 }}
              whileHover={{ y: -4, scale: 1.02 }}
              className="p-4 rounded-xl bg-slate-900/40 backdrop-blur border border-slate-800 hover:border-cyan-500/30 transition-all text-center group"
            >
              <div className="flex justify-center mb-2">
                <value.icon size={24} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
              </div>
              <div className="text-sm text-slate-400 font-medium">{value.label}</div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};
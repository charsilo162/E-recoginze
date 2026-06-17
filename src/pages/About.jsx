import React from 'react';
import { motion } from 'framer-motion';

export default function About() {
  // Stagger animation container rules
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="min-h-screen bg-slate-50 antialiased text-slate-800">
      
      {/* 🚀 Section 1: Minimalist High-Impact Hero Block */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-white border-b border-slate-200/60">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/30 to-white pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-amber-500/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-[11px] font-black tracking-widest text-amber-600 uppercase bg-amber-500/10 px-3 py-1.5 rounded-md inline-block mb-4"
          >
            Our Shared Genesis
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.1]"
          >
            We calibrate validation systems for modern ecosystems.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-base md:text-lg text-slate-500 mt-6 leading-relaxed max-w-2xl mx-auto font-medium"
          >
            E-Recognize eliminates friction from consensus operations, bringing bulletproof transparency, auditability, and beautiful visual analytical interfaces to peer assessment programs globally.
          </motion.p>
        </div>
      </section>

      {/* 📊 Section 2: Core Metric Counters Performance Grid */}
      <section className="max-w-5xl mx-auto px-4 -mt-8 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { value: "4.8M+", label: "Audited Ballots Cast" },
            { value: "100%", label: "Tamper-Proof Integrity" },
            { value: "24ms", label: "Real-time Node Synced" },
            { value: "500+", label: "Enterprise Coalitions" }
          ].map((stat, i) => (
            <div key={i} className="bg-slate-900 text-white p-6 rounded-2xl border border-slate-800 shadow-xl text-center">
              <p className="text-2xl md:text-3xl font-black text-amber-500 tracking-tight">{stat.value}</p>
              <p className="text-[11px] font-bold text-slate-400 mt-1 uppercase tracking-wider">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 🛡️ Section 3: Value Proposition Pillars (DRY Array Map Layout) */}
      <section className="max-w-5xl mx-auto px-4 py-24">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">The Architecture of Trust</h2>
          <p className="text-sm text-slate-400 mt-1">Why structural platforms depend entirely on our design integrity framework</p>
        </div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            {
              icon: "🛡️",
              title: "Immutable Accountability",
              desc: "Every vote, nomination status update, and parameter transition logs dynamically into centralized database tracking layers, isolating data pipelines against corruption vectors."
            },
            {
              icon: "⚡",
              title: "Zustand Streaming Matrix",
              desc: "Our fully responsive application framework processes complex database counts and distributes progress streams instantly to global consumer screens without delay."
            },
            {
              icon: "🔒",
              title: "Administrative Sovereignty",
              desc: "Grant operational managers absolute ecosystem command tools, enabling transparent ballot visibility toggles and real-time voter verification audit locks."
            }
          ].map((pillar, idx) => (
            <motion.div 
              key={idx} 
              variants={itemVariants}
              className="bg-white border border-slate-200/70 p-8 rounded-2xl shadow-sm hover:shadow-md hover:border-slate-300 transition-all group duration-300"
            >
              <div className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-xl flex items-center justify-center text-xl shadow-inner group-hover:bg-amber-500/10 group-hover:border-amber-500/20 transition-colors">
                {pillar.icon}
              </div>
              <h3 className="font-bold text-slate-900 mt-5 text-base md:text-lg tracking-tight">{pillar.title}</h3>
              <p className="text-xs md:text-sm text-slate-500 mt-2.5 leading-relaxed font-medium">{pillar.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 👥 Section 4: Premium Minimal Executive Leadership Grid */}
      <section className="bg-white border-t border-slate-200/60 py-24">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tight">The Steering Matrix</h2>
            <p className="text-sm text-slate-400 mt-1">The engineers, developers, and architects backing your system consensus</p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                name: "Alexander Mercer",
                role: "Chief Software Architect",
                image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop"
              },
              {
                name: "Sophia Vance",
                role: "Lead Interface Engineer",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop"
              },
              {
                name: "Marcus Kaelen",
                role: "Database Systems Director",
                image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop"
              }
            ].map((member, i) => (
              <div key={i} className="group">
                <div className="w-full aspect-square rounded-2xl overflow-hidden bg-slate-100 border border-slate-200 shadow-sm relative">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                </div>
                <div className="mt-4 pl-1">
                  <h4 className="font-bold text-slate-900 text-base">{member.name}</h4>
                  <p className="text-[11px] font-black text-amber-600 tracking-wider uppercase mt-0.5">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ✉️ Section 5: Editorial Call-to-Action Panel */}
      {/* <section className="max-w-5xl mx-auto px-4 py-24 text-center">
        <div className="bg-gradient-to-br from-slate-900 to-zinc-950 p-10 md:p-16 rounded-3xl text-white shadow-2xl border border-slate-800 relative overflow-hidden">
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="max-w-xl mx-auto relative z-10">
            <h2 className="text-3xl font-black tracking-tight leading-none">Ready to anchor transparency inside your organization?</h2>
            <p className="text-xs md:text-sm text-slate-400 mt-4 leading-relaxed font-medium">
              Connect our high-performance PHP/Laravel API infrastructure directly to your operational stack and transform consensus tracking overnight.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <button className="bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-black uppercase tracking-wider px-6 py-3.5 rounded-xl shadow-lg shadow-amber-500/20 active:scale-95 transition-all">
                Initialize System Deployment
              </button>
              <button className="bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-slate-600 text-white text-xs font-black uppercase tracking-wider px-6 py-3.5 rounded-xl active:scale-95 transition-all">
                Read API Specifications
              </button>
            </div>
          </div>
        </div>
      </section> */}

    </div>
  );
}
import React from 'react';
import { motion } from 'framer-motion';
import { Camera, Users, Projector, Code, Coffee, Globe } from 'lucide-react';

const stats = [
  { label: "Participants", value: "500+", icon: Users },
  { label: "Projects Built", value: "120+", icon: Code },
  { label: "Hours of Hacking", value: "36", icon: Coffee },
  { label: "Cities Represented", value: "25+", icon: Globe }
];

const moments = [
  { title: "Opening Ceremony", year: "2023", desc: "Energy was at an all-time high as the hackathon kicked off." },
  { title: "Midnight Coding", year: "2023", desc: "Fueled by caffeine and passion, teams worked through the night." },
  { title: "Project Demo Day", year: "2023", desc: "Showcasing innovation and technical brilliance." },
  { title: "Winner Announcement", year: "2023", desc: "Celebrating the spirit of hacking and creativity." }
];

const HighlightsPage = () => {
  return (
    <div className="min-h-screen bg-white text-black pt-24 pb-20 selection:bg-black selection:text-white uppercase">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <header className="mb-24 text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="text-7xl md:text-9xl font-black tracking-tighter mb-4"
          >
            Highlights.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-xl md:text-2xl text-neutral-400 tracking-widest font-medium"
          >
            Rewriting the Future, One Line at a Time
          </motion.p>
        </header>

        {/* Stats Grid */}
        <section className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 border-y-2 border-black py-16">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <stat.icon size={32} className="mx-auto mb-6 text-neutral-400" />
              <h2 className="text-5xl font-black mb-2">{stat.value}</h2>
              <p className="text-sm font-bold tracking-widest text-neutral-500">{stat.label}</p>
            </div>
          ))}
        </section>

        {/* Moments */}
        <section className="space-y-32">
          {moments.map((moment, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}
            >
              <div className="w-full md:w-1/2 aspect-video bg-neutral-100 border-2 border-black flex items-center justify-center relative overflow-hidden group">
                <Camera size={64} className="text-neutral-200 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-black text-white px-4 py-1 text-sm font-bold">
                  {moment.year}
                </div>
              </div>
              <div className="w-full md:w-1/2 space-y-6">
                <span className="text-sm font-black text-neutral-400 tracking-[0.3em]">Moment {i + 1}</span>
                <h3 className="text-4xl md:text-5xl font-black leading-none">{moment.title}</h3>
                <p className="text-lg text-neutral-500 font-medium normal-case leading-relaxed">
                  {moment.desc}
                </p>
                <button className="border-b-2 border-black pb-1 text-sm font-black tracking-widest hover:text-neutral-500 hover:border-neutral-500 transition-all">
                  VIEW FULL GALLERY
                </button>
              </div>
            </motion.div>
          ))}
        </section>

        {/* Video Section Mockup */}
        <section className="mt-40 text-center">
          <div className="border-2 border-black p-20 bg-black text-white relative group cursor-pointer overflow-hidden">
            <motion.div 
              className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity"
            />
            <Projector size={80} className="mx-auto mb-8" />
            <h2 className="text-5xl font-black mb-4">Official Aftermovie</h2>
            <p className="text-neutral-400 tracking-widest font-bold">Experience the adrenaline again</p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HighlightsPage;

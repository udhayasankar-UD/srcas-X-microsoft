import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Code2, Sparkles, ArrowUpRight } from 'lucide-react';
import { CardBody, CardContainer, CardItem } from '../components/ui/3d-card';
import MagnetLines from '../components/ui/MagnetLines';
import MagneticButton from '../components/ui/MagneticButton';

// Assets
import srcasLogo from '../assets/logo/srcas-1-logo.png';
import pcLogo from '../assets/logo/programming-club-2-logo.png';
import microsoftLogo from '../assets/logo/microsoft.png';

const PartnersPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } }
  };

  const titleLetters = "PARTNERS".split("");

  return (
    <div 
      className="relative min-h-screen bg-[#f8f8f5] text-black overflow-x-hidden pt-32 pb-32 selection:bg-black selection:text-white"
      style={{ fontFamily: "'Plus Jakarta Sans', Inter, system-ui, sans-serif" }}
    >
      {/* Background Effect */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] z-0">
        <MagnetLines 
          rows={12} 
          columns={12} 
          containerSize="100%" 
          lineColor="#000" 
          lineWidth="1px" 
          lineHeight="40px" 
        />
      </div>

      {/* Main Content Area - Guaranteed Margin to avoid Sidebar Dock */}
      <div 
        className="relative z-10 w-full pr-6 sm:pr-12 md:pr-16 lg:pr-32"
        style={{ 
          marginLeft: 'clamp(100px, 18vw, 320px)',
          width: 'calc(100% - clamp(100px, 18vw, 320px))' 
        }}
      >
        {/* Header Section */}
        <header className="mb-64">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-3 px-5 py-2 rounded-full border border-black/10 bg-white/50 backdrop-blur-sm text-[11px] font-black tracking-[0.3em] uppercase mb-16"
          >
            <Sparkles size={14} className="text-neutral-400" />
            Collaborating for Innovation
          </motion.div>
          
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="mb-16 flex flex-wrap gap-y-4"
          >
            {titleLetters.map((letter, i) => (
              <motion.span
                key={i}
                variants={itemVariants}
                className="text-7xl sm:text-8xl md:text-9xl lg:text-[11rem] font-black tracking-tighter leading-none inline-block mr-2"
              >
                {letter}
              </motion.span>
            ))}
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 1 }}
            className="text-xl md:text-2xl lg:text-3xl text-neutral-500 max-w-3xl font-medium leading-relaxed mt-8"
          >
            Join forces with industry leaders and academic pioneers to shape the next generation of builders and innovators.
          </motion.p>
        </header>

        {/* Organizers Section */}
        <section className="mb-64">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-24 gap-8">
            <div className="max-w-xl">
              <span className="text-[11px] font-black tracking-[0.4em] uppercase text-neutral-400 mb-4 block">Founding Team</span>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">The Architects</h2>
            </div>
            <div className="h-[1px] flex-1 bg-black/10 hidden md:block" />
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-16">
            {/* SRCAS Card */}
            <CardContainer containerClassName="xl:col-span-7 w-full py-0" className="w-full h-full">
              <CardBody className="bg-white border border-black/10 shadow-2xl shadow-black/5 rounded-[50px] p-10 md:p-16 w-full h-full min-h-[550px] flex flex-col justify-between group/card transition-all duration-500 hover:shadow-black/10">
                <CardItem translateZ="50" className="flex justify-between items-start w-full">
                  <div className="h-20 w-20 md:h-28 md:w-28 rounded-[30px] bg-[#f7f7f2] border border-black/5 flex items-center justify-center p-6 shadow-inner">
                    <img src={srcasLogo} alt="SRCAS" className="max-h-full max-w-full object-contain filter grayscale group-hover/card:grayscale-0 transition-all duration-700" />
                  </div>
                  <div className="bg-black text-white p-4 md:p-5 rounded-3xl shadow-xl">
                    <Building2 size={28} />
                  </div>
                </CardItem>
                
                <div className="mt-16">
                  <CardItem translateZ="60" className="text-[11px] font-black text-neutral-400 uppercase tracking-[0.4em] mb-6">
                    Host Institution
                  </CardItem>
                  <CardItem translateZ="80" className="text-5xl md:text-6xl font-black mb-8 tracking-tighter leading-none">
                    SRCAS
                  </CardItem>
                  <CardItem translateZ="100" className="text-xl md:text-2xl text-neutral-600 font-medium leading-relaxed max-w-lg mt-4">
                    Sri Ramakrishna College of Arts and Science brings academic strength and an innovation-first environment to the hackathon.
                  </CardItem>
                </div>

                <CardItem translateZ="40" className="mt-16 pt-10 border-t border-black/5 flex items-center justify-between w-full">
                  <span className="text-xs font-black text-neutral-400 uppercase tracking-[0.2em]">Coimbatore, India</span>
                  <motion.div whileHover={{ x: 10 }} className="flex items-center gap-3 text-sm font-black tracking-widest cursor-pointer group">
                    VISIT PORTAL <ArrowUpRight size={18} className="group-hover:text-blue-600 transition-colors" />
                  </motion.div>
                </CardItem>
              </CardBody>
            </CardContainer>

            {/* Programming Club Card */}
            <CardContainer containerClassName="xl:col-span-5 w-full py-0" className="w-full h-full">
              <CardBody className="bg-[#0a0a0a] text-white rounded-[50px] p-10 md:p-16 w-full h-full min-h-[550px] flex flex-col justify-between relative overflow-hidden group/card shadow-2xl">
                <div className="absolute top-0 right-0 p-16 opacity-10 rotate-12 group-hover/card:rotate-0 transition-transform duration-1000">
                  <Code2 size={180} />
                </div>

                <CardItem translateZ="50" className="relative z-10">
                  <div className="h-20 w-20 md:h-24 md:w-24 rounded-3xl bg-white/5 backdrop-blur-2xl border border-white/10 flex items-center justify-center p-5">
                    <img src={pcLogo} alt="PC" className="max-h-full max-w-full object-contain" />
                  </div>
                </CardItem>

                <div className="mt-16 relative z-10">
                  <CardItem translateZ="60" className="text-[11px] font-black text-white/40 uppercase tracking-[0.4em] mb-6">
                    Organizing Team
                  </CardItem>
                  <CardItem translateZ="80" className="text-4xl md:text-5xl font-black mb-8 tracking-tighter leading-none">
                    Programming <br /> Club 2.0
                  </CardItem>
                  <CardItem translateZ="100" className="text-lg md:text-xl text-white/50 font-medium leading-relaxed mt-4">
                    The creative force behind the hackathon experience, turning complex ideas into seamless reality.
                  </CardItem>
                </div>

                <CardItem translateZ="40" className="mt-16 pt-10 border-t border-white/10 flex items-center justify-between w-full relative z-10">
                  <div className="flex -space-x-3">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="h-10 w-10 rounded-full border-2 border-[#0a0a0a] bg-neutral-800 flex items-center justify-center text-[10px] font-black text-white/40">
                        {String.fromCharCode(64+i)}
                      </div>
                    ))}
                  </div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-white/20">Active Core</span>
                </CardItem>
              </CardBody>
            </CardContainer>
          </div>
        </section>

        {/* Partners Grid */}
        <section className="mb-64">
          <div className="mb-32">
            <span className="text-[11px] font-black tracking-[0.5em] uppercase text-neutral-400 mb-6 block">Our Ecosystem</span>
            <h2 className="text-6xl md:text-8xl font-black tracking-tighter leading-none">Powering Progress</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Microsoft */}
            <motion.div
              whileHover={{ y: -15 }}
              className="bg-white rounded-[60px] p-12 md:p-20 border border-black/5 shadow-2xl shadow-black/5 flex flex-col items-center text-center relative overflow-hidden group"
            >
              <div className="absolute top-10 right-10">
                 <div className="px-5 py-2 rounded-full bg-[#0078D4]/10 text-[#0078D4] text-[11px] font-black uppercase tracking-widest">Strategic Partner</div>
              </div>
              
              <div className="h-32 md:h-44 w-full flex items-center justify-center mb-16 group-hover:scale-110 transition-transform duration-700">
                <img src={microsoftLogo} alt="Microsoft" className="max-h-full max-w-[85%] object-contain" />
              </div>

              <h3 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">Microsoft</h3>
              <p className="text-neutral-500 font-medium text-lg md:text-2xl leading-relaxed mb-16 max-w-lg">
                Empowering every student with cloud-native tools and AI infrastructure to build what's next.
              </p>
              
              <MagneticButton variant="dark" size="md">
                <span className="flex items-center gap-3 px-4">Azure Resources <ArrowUpRight size={22} /></span>
              </MagneticButton>
            </motion.div>

            {/* Igenius AI */}
            <motion.div
              whileHover={{ y: -15 }}
              className="bg-black text-white rounded-[60px] p-12 md:p-20 flex flex-col items-center text-center relative overflow-hidden group shadow-2xl"
            >
              <div className="absolute top-10 right-10">
                 <div className="px-5 py-2 rounded-full bg-white/10 text-white/40 text-[11px] font-black uppercase tracking-widest">Associate Partner</div>
              </div>
              
              <div className="h-32 md:h-44 w-full flex flex-col items-center justify-center mb-16">
                 <span className="text-5xl md:text-8xl font-black tracking-tighter mb-4">Igenius</span>
                 <span className="text-[12px] font-black tracking-[0.6em] uppercase text-white/30">Artificial Intelligence</span>
              </div>

              <h3 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter">Igenius AI</h3>
              <p className="text-white/40 font-medium text-lg md:text-2xl leading-relaxed mb-16 max-w-lg">
                Bridging the gap between theoretical AI and production-ready applications for students.
              </p>
              
              <MagneticButton variant="light" size="md">
                <span className="flex items-center gap-3 px-4">Explore Training <ArrowUpRight size={22} /></span>
              </MagneticButton>
            </motion.div>
          </div>
        </section>

        {/* CTA Footer */}
        <section className="relative overflow-hidden bg-[#0a0a0a] rounded-[80px] p-20 md:p-40 text-center mb-32">
          <div className="absolute inset-0 opacity-30 pointer-events-none">
             <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-blue-600/30 via-transparent to-transparent" />
          </div>
          
          <div className="relative z-10 max-w-4xl mx-auto">
            <h2 className="text-6xl md:text-9xl font-black text-white mb-16 tracking-tighter leading-none uppercase">
              SHAPE THE <br /> FUTURE
            </h2>
            <p className="text-white/40 text-xl md:text-2xl font-medium mb-24 max-w-2xl mx-auto leading-relaxed">
              Join our ecosystem of innovation. Let's create something extraordinary that impacts the world.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-12">
              <MagneticButton variant="light" size="lg">
                Become a Partner
              </MagneticButton>
              <button className="text-white text-sm font-black tracking-[0.3em] uppercase flex items-center gap-5 group">
                Download Prospectus <ArrowUpRight size={24} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300" />
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PartnersPage;

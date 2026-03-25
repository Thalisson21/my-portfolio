'use client';

import { motion } from 'framer-motion';

export default function HomePage() {
  // Variável semântica simples controlando a animação de entrada
  const fadeUpVariant = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0, 
      // Curva de bezier customizada para aquele toque "Apple" suave
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 flex flex-col items-center justify-center min-h-[80vh] text-center">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUpVariant}
        className="flex flex-col items-center gap-8"
      >
        {/* Pill Tag superior para criar hierarquia visual */}
        <div className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/60 tracking-widest uppercase mb-2">
          Backend Developer
        </div>

        {/* Título principal com contraste monocromático */}
        <h1 className="text-5xl md:text-7xl font-bold tracking-tighter text-white max-w-4xl leading-tight">
          Engineering robust <br className="hidden md:block"/> 
          <span className="text-white/40">systems for the future.</span>
        </h1>

        {/* Subtítulo simétrico */}
        <p className="text-lg md:text-xl text-white/50 max-w-2xl font-light">
          Specializing in scalable architectures and seamless integrations. 
          Crafting impeccable digital experiences through clean code.
        </p>

        {/* Call to Actions com espaçamento consistente */}
        <div className="mt-8 flex items-center gap-6">
          <button className="px-8 py-4 bg-white text-black rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors">
            View Projects
          </button>
          <button className="px-8 py-4 bg-transparent border border-white/20 text-white rounded-full text-sm font-semibold hover:bg-white/10 transition-colors">
            Contact Me
          </button>
        </div>
      </motion.div>
    </div>
  );
}
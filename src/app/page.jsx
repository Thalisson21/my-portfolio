'use client';

// 1. Adicione o useSpring no import
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

export default function HomePage() {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // 2. O Amortecedor: Envolvemos o scroll bruto em uma física de mola
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100, // Força da mola
    damping: 30,    // Resistência (evita o efeito chicote)
    restDelta: 0.001
  });

  // 3. Trocamos scrollYProgress por smoothProgress nas transformações
  const textY = useTransform(smoothProgress, [0, 1], ["0%", "150%"]);
  const opacity = useTransform(smoothProgress, [0, 0.8], [1, 0]);
  const rotateX = useTransform(smoothProgress, [0, 1], [0, 15]);

  // Variantes para a animação de entrada tipográfica (Intro)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12, // Atraso entre a animação de cada filho (letra/palavra)
        delayChildren: 0.3,   // Atraso antes de começar a animação do primeiro filho
      },
    },
  };

  const itemVariants = {
    hidden: { y: 80, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      // Usamos a curva de Bezier "Apple-style" para fluidez máxima
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  // Separamos o título em palavras para animar uma por uma (Tipografia Dinâmica)
  const titleWords = "Thalisson Araújo".split(" ");

  return (
    <div ref={containerRef} className="relative w-full h-[180vh] bg-background">
      {/* Hero Section (Primeira Dobra Fixed)
        Fica 'sticky' no topo enquanto o usuário rola para aplicar o parallax.
      */}
      <section className="sticky top-0 w-full h-screen flex justify-center overflow-hidden">
        <div className="relative w-full max-w-7xl mx-auto px-6 h-full flex flex-col items-center justify-center text-center">
        {/*
          motion.div com estilos 3D
          style={{ y: textY, opacity, rotateX, perspective: 1000 }}
          A perspective é crucial para que a rotação X pareça 3D de verdade.
        */}
        <motion.div
          style={{ y: textY, opacity, rotateX, perspective: 1000 }}
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="flex flex-col items-center gap-6 z-10"
        >
          {/* Pill Tag (Entrada Suave) */}
          <motion.div 
            variants={itemVariants}
            className="px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-xs font-medium text-white/60 tracking-widest uppercase mb-4"
          >
            Desenvolvedor Frontend
          </motion.div>

          {/* Título Principal com Animação Tipográfica Word-by-Word */}
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter text-white max-w-5xl leading-[0.95] flex flex-wrap justify-center gap-x-4 gap-y-1">
            {titleWords.map((word, index) => (
              <span key={index} className="relative overflow-hidden inline-block pb-2">
                <motion.span
                  variants={itemVariants}
                  className="inline-block"
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          {/* Subtítulo (Entrada Suave) */}
          <motion.p 
            variants={itemVariants}
            className="mt-6 text-lg md:text-2xl text-white/50 max-w-3xl font-light leading-relaxed"
          >
           Desenvolvedor apaixonado por design e <br className="hidden md:block"/>
            experiências de usuário impecáveis que unem forma e função.
          </motion.p>

          {/* Call to Actions (Entrada Suave) */}
          <motion.div 
            variants={itemVariants}
            className="mt-12 flex items-center gap-6"
          >
            <Link href="/projects" className="px-10 py-5 bg-white text-black rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors">
              Meus projetos
            </Link>
            <Link href="/contacts" className="px-10 py-5 bg-transparent border border-white/20 text-white rounded-full text-sm font-semibold hover:bg-white/10 transition-colors">
              Vamos conversar
            </Link>
          </motion.div>
        </motion.div>

        {/* Indicador de Scroll Minimalista (Animação Infinita) */}
       <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20">
          
          {/* O motion.div agora só se preocupa com a física de subir e descer */}
          <motion.div 
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="text-white/30 flex flex-col items-center gap-2"
            
          >
            <span className="text-xs uppercase tracking-widest font-mono">Scroll</span>
            <div className="w-px h-12 bg-white/20 relative overflow-hidden">
              <motion.div 
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="absolute top-0 left-0 w-full h-1/2 bg-white"
              />
            </div>
          </motion.div>
          
        </div>
        </div>
      </section>

      {/* Próxima Seção (Espaço em branco para teste de scroll)
        Aqui entraremos com o 'reveal' na próxima etapa.
      */}
      <section className="relative w-full h-screen bg-black z-20 flex items-center justify-center border-t border-white/10">
        <h2 className="text-4xl text-white/20 font-bold tracking-tighter">Next Section (About Me)</h2>
      </section>
    </div>
  );
}
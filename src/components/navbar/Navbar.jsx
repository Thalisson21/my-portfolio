'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { name: 'Início', path: '/' },
  { name: 'Sobre mim', path: '/about' },
  { name: 'Projetos', path: '/projects' },
  { name: 'Contato', path: '/contacts' },
];

export default function Navbar() {
  const [hoveredLink, setHoveredLink] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false); // NOVO: Controla se a navbar está escondida

  const pathname = usePathname();
  const { scrollY } = useScroll(); // NOVO: Monitora a posição do scroll

  // NOVO: Lógica para esconder/mostrar a Navbar baseada na direção do scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    
    setHasScrolled(latest > 100);

    // Só reage se o scroll for maior que 5 pixels de uma vez (ignora micro-tremores)
    const isScrollingDown = latest > previous && latest - previous > 5;
    const isScrollingUp = previous > latest && previous - latest > 5;

    if (latest > 150 && isScrollingDown) {
      setIsHidden(true);
    } else if (isScrollingUp) {
      setIsHidden(false);
    }
  });

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  const menuVariants = {
    closed: { y: '-100%', opacity: 0 },
    open: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 80, damping: 20 }
    }
  };

  const linkVariants = {
    closed: { y: 20, opacity: 0 },
    open: { 
      y: 0, 
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  const navbarVariants = {
    hidden: { 
      y: '-100%',
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    },
    visible: { 
      y: 0, 
      transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <>
      {/* Trocamos a tag <nav> normal por <motion.nav> */}
      <motion.nav
        variants={navbarVariants}
        initial="hidden" // Começa escondida ao carregar a página
        animate={isHidden ? "hidden" : "visible"} // Alterna baseado no scroll
        className={`fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
          hasScrolled 
            ? 'bg-black/70 backdrop-blur-md border-b border-white/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          <Link href="/" className="text-xl font-bold tracking-tighter z-50 relative">
            <span className="text-white/50">[</span> dev <span className="text-white/50">]</span>
          </Link>

          <ul 
            className="hidden md:flex space-x-2"
            onMouseLeave={() => setHoveredLink(null)}
          >
            {navLinks.map((link, index) => {
              const isActive = pathname === link.path;

              return (
                <li 
                  key={link.path}
                  onMouseEnter={() => setHoveredLink(link.path)}
                >
                  <Link 
                    href={link.path}
                    className={`relative px-5 py-2 text-sm font-medium transition-colors flex items-center gap-2 group ${
                      isActive ? 'text-white' : 'text-white/70 hover:text-white'
                    }`}
                  >
                    {hoveredLink === link.path && (
                      <motion.div
                        layoutId="navPill"
                        className="absolute inset-0 bg-white/10 rounded-full z-[-1]"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}
                    
                    {isActive && (
                      <motion.div
                        layoutId="activeIndicator"
                        className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"
                        transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                      />
                    )}

                    <span className={`text-xs transition-colors ${isActive ? 'text-white/50' : 'text-white/30 group-hover:text-white/50'}`}>
                      0{index + 1}
                    </span>
                    <span className="relative z-10">{link.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <button 
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden z-50 relative p-2 text-white/70 hover:text-white flex flex-col gap-1.5"
            aria-label="Toggle menu"
          >
            <motion.span 
              animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-current block transition-all"
            />
            <motion.span 
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-0.5 bg-current block transition-all"
            />
            <motion.span 
              animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              className="w-6 h-0.5 bg-current block transition-all"
            />
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center"
          >
            <ul className="flex flex-col space-y-8 text-center">
              {navLinks.map((link, index) => {
                const isActive = pathname === link.path;
                
                return (
                  <motion.li 
                    key={link.path}
                    variants={linkVariants}
                    initial="closed"
                    animate="open"
                    transition={{ delay: 0.1 * index }} 
                  >
                    <Link 
                      href={link.path}
                      onClick={() => setIsOpen(false)}
                      className={`text-4xl font-light transition-colors flex flex-col items-center gap-2 ${
                        isActive ? 'text-white' : 'text-white/70 hover:text-white'
                      }`}
                    >
                      <span className="text-sm text-white/30 font-mono">0{index + 1}</span>
                      {link.name}
                    </Link>
                  </motion.li>
                );
              })}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
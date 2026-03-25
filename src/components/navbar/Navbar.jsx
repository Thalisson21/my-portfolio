'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/projects' },
  { name: 'Contact', path: '/contacts' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);

  // Escuta o scroll para adicionar uma borda sutil quando o usuário descer a página
  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Controla o scroll do body quando o menu mobile está aberto
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isOpen]);

  // Variáveis de animação do Framer Motion
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

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          hasScrolled 
            ? 'bg-black/70 backdrop-blur-md border-b border-white/10' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="text-xl font-bold tracking-tighter z-50 relative">
            <span className="text-white/50">[</span> dev <span className="text-white/50">]</span>
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex space-x-8">
            {navLinks.map((link, index) => (
              <li key={link.path}>
                <Link 
                  href={link.path}
                  className="text-sm font-medium text-white/70 hover:text-white transition-colors flex items-center gap-2 group"
                >
                  <span className="text-xs text-white/30 group-hover:text-white/50 transition-colors">
                    0{index + 1}
                  </span>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>

          {/* Mobile Menu Toggle */}
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
      </nav>

      {/* Mobile Menu Overlay */}
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
              {navLinks.map((link, index) => (
                <motion.li 
                  key={link.path}
                  variants={linkVariants}
                  initial="closed"
                  animate="open"
                  // Stagger effect: cada link entra com um pequeno atraso baseado no seu index
                  transition={{ delay: 0.1 * index }} 
                >
                  <Link 
                    href={link.path}
                    onClick={() => setIsOpen(false)}
                    className="text-4xl font-light text-white/70 hover:text-white transition-colors flex flex-col items-center gap-2"
                  >
                    <span className="text-sm text-white/30 font-mono">0{index + 1}</span>
                    {link.name}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
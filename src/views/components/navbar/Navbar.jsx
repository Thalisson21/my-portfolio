import { useState, useEffect, useRef } from 'react';
import './Navbar.css';

const links = [
  { href: '/', label: 'Home',     num: '01' },
  { href: '/about', label: 'About',    num: '02' },
  { href: '/projects', label: 'Projects', num: '03' },
  { href: '/contacts', label: 'Contact',  num: '04' },
];

function Navbar() {
  const [active, setActive]     = useState('/');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [hovered, setHovered]   = useState(null);
  const navRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
  }, [menuOpen]);

  return (
    <>
      <nav
        id="navbar"
        ref={navRef}
        className={[
          'navbar',
          scrolled  ? 'navbar--scrolled'  : '',
          menuOpen  ? 'navbar--open'      : '',
        ].join(' ')}
      >
        {/* ── Logo / wordmark ── */}
        <a href="/" className="navbar__logo" aria-label="Home">
          <span className="navbar__logo-bracket">[</span>
          <span className="navbar__logo-text">dev</span>
          <span className="navbar__logo-bracket">]</span>
          <span className="navbar__logo-cursor" />
        </a>

        {/* ── Desktop links ── */}
        <ul className="navbar__links" role="list">
          {links.map(({ href, label, num }) => (
            <li key={href} className="navbar__item">
              <a
                href={href}
                className={`navbar__link ${active === href ? 'navbar__link--active' : ''}`}
                onClick={() => setActive(href)}
                onMouseEnter={() => setHovered(href)}
                onMouseLeave={() => setHovered(null)}
              >
                <span className="navbar__link-num">{num}</span>
                <span className="navbar__link-label">{label}</span>
                <span
                  className={`navbar__link-line ${hovered === href || active === href ? 'navbar__link-line--visible' : ''}`}
                />
              </a>
            </li>
          ))}
        </ul>

        {/* ── CTA button (desktop) ── */}
        <a href="/contacts" className="navbar__cta">
          <span>Let's talk</span>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
            <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        {/* ── Hamburger (mobile) ── */}
        <button
          className={`navbar__burger ${menuOpen ? 'navbar__burger--open' : ''}`}
          onClick={() => setMenuOpen(v => !v)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* ── Mobile overlay ── */}
      <div
        className={`mobile-menu ${menuOpen ? 'mobile-menu--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        <ul className="mobile-menu__links" role="list">
          {links.map(({ href, label, num }, i) => (
            <li
              key={href}
              className="mobile-menu__item"
              style={{ '--i': i }}
            >
              <a
                href={href}
                className={`mobile-menu__link ${active === href ? 'mobile-menu__link--active' : ''}`}
                onClick={() => { setActive(href); setMenuOpen(false); }}
              >
                <sup className="mobile-menu__num">{num}</sup>
                {label}
              </a>
            </li>
          ))}
        </ul>
        <p className="mobile-menu__footer">© 2025 — portfolio</p>
      </div>
    </>
  );
}

export default Navbar;
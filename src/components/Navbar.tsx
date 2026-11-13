import { Fragment, useEffect, useState } from 'react';

const NAV_LINKS = [
  { label: 'Labs', href: '#labs' },
  { label: 'Studio', href: '#studio' },
  { label: 'Openings', href: '#openings' },
  { label: 'Shop', href: '#shop' },
] as const;

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-10 w-full px-5 sm:px-8 py-4 sm:py-5 flex flex-row justify-between items-center">
        <a
          href="#top"
          className="flex flex-row items-center gap-3 text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-sm"
        >
          <span className="font-heading text-[21px] sm:text-[26px] tracking-tight text-white">
            Mainframe®
          </span>
          <span
            aria-hidden="true"
            className="text-[25px] sm:text-[30px] text-white select-none tracking-[-0.02em] leading-none"
          >
            ✳︎
          </span>
        </a>

        <nav
          aria-label="Primary navigation"
          className="hidden md:flex flex-row items-center text-[23px] text-white"
        >
          {NAV_LINKS.map((link, index) => (
            <Fragment key={link.label}>
              <a
                href={link.href}
                className="hover:opacity-60 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-sm"
              >
                {link.label}
              </a>
              {index < NAV_LINKS.length - 1 && (
                <span aria-hidden="true" className="whitespace-pre">
                  ,{' '}
                </span>
              )}
            </Fragment>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden md:inline-block text-[23px] text-white underline underline-offset-2 hover:opacity-60 transition-opacity focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-sm"
        >
          Get in touch
        </a>

        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu-overlay"
          className="md:hidden flex flex-col justify-center items-center gap-[5px] p-2 -mr-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white/80 rounded-sm"
        >
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
              menuOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`block w-6 h-[2px] bg-white transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </header>

      <div
        id="mobile-menu-overlay"
        aria-hidden={!menuOpen}
        className={`fixed inset-0 z-[9] bg-black/90 backdrop-blur-md flex flex-col justify-center items-start px-8 gap-8 md:hidden transition-opacity duration-300 ${
          menuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        <nav
          aria-label="Mobile navigation"
          className="flex flex-col items-start gap-8"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={closeMenu}
              tabIndex={menuOpen ? 0 : -1}
              className="text-[32px] font-medium text-white hover:opacity-60 transition-opacity"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={closeMenu}
            tabIndex={menuOpen ? 0 : -1}
            className="text-[32px] font-medium text-white underline underline-offset-4 hover:opacity-60 transition-opacity"
          >
            Get in touch
          </a>
        </nav>
      </div>
    </>
  );
}

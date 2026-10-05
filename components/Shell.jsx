'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { brand } from '../lib/brand';
import { useCart } from '../lib/cart';
import AIAssistant from './AIAssistant';

const links = [
  { href: '/shop', label: brand.nav[0] },
  { href: '/special', label: brand.nav[1] },
  { href: '/#brew-lab', label: brand.nav[2] },
  { href: '/#origins', label: brand.nav[3] },
];

export default function Shell({ children }) {
  const { count } = useCart();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <div data-diamond="batch-1" className="rt-shell">
      <a href="#main" className="skip-link">Skip to roast floor</a>
      <div className="offer-banner rt-banner">{brand.offer.code} — {brand.offer.label} · {brand.offer.detail}</div>
      <header className="rt-header">
        <div className="rt-header-inner">
          <Link href="/" className="rt-logo">
            <span className="rt-logo-ring" aria-hidden="true" />
            <span className="font-display rt-logo-text">{brand.name}</span>
          </Link>
          <nav className="rt-nav" aria-label="Primary">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="rt-nav-link">{l.label}</Link>
            ))}
            <Link href="/cart" className="btn-brand rt-cart">Bag{count > 0 ? ` · ${count}` : ''}</Link>
          </nav>
          <div className="rt-mobile">
            <Link href="/cart" className="btn-brand !py-2 !px-3 text-sm">Bag {count || ''}</Link>
            <button type="button" className="rt-burger" aria-expanded={open} aria-controls="rt-drawer" onClick={() => setOpen((v) => !v)}>
              <span /><span />
              <span className="sr-only">Menu</span>
            </button>
          </div>
        </div>
        <div id="rt-drawer" className={`rt-drawer ${open ? 'is-open' : ''}`} hidden={!open}>
          <nav aria-label="Mobile">
            {links.map((l) => (
              <Link key={l.href} href={l.href} onClick={() => setOpen(false)}>{l.label}</Link>
            ))}
            <Link href="/cart" onClick={() => setOpen(false)}>Bag{count > 0 ? ` · ${count}` : ''}</Link>
          </nav>
        </div>
      </header>
      <main id="main">{children}</main>
      <footer className="rt-footer">
        <div className="rt-footer-grid">
          <div>
            <p className="font-display rt-footer-brand">{brand.name}</p>
            <p className="text-muted mt-2 max-w-sm">{brand.description}</p>
            <p className="rt-est mt-4">Est. roast lab · origin science</p>
          </div>
          <div>
            <p className="rt-footer-h">On the board</p>
            <ul>
              {links.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}
            </ul>
          </div>
          <div>
            <p className="rt-footer-h">Cup desk</p>
            <ul>
              <li>Secure checkout UI (demo)</li>
              <li>Wishlist & loyalty</li>
              <li>{brand.aiName} brew help</li>
            </ul>
          </div>
          <div>
            <p className="rt-footer-h">Roast list</p>
            <form className="rt-mail" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Email for drop alerts" aria-label="Email for drop alerts" />
              <button type="submit" className="btn-brand !py-2">Join</button>
            </form>
          </div>
        </div>
        <p className="rt-legal">Demo storefront · no real payments · {brand.name}</p>
      </footer>
      <div className="sticky-cta md:hidden">
        <Link href="/shop" className="btn-brand !py-2 !px-4 text-sm">{brand.nav[0]}</Link>
        <Link href="/special" className="btn-ghost !py-2 !px-4 text-sm">{brand.nav[1]}</Link>
      </div>
      <AIAssistant />
    </div>
  );
}

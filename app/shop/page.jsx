'use client';
import Link from 'next/link';
import { useMemo, useState } from 'react';
import { brand, products } from '../../lib/brand';
import { useCart } from '../../lib/cart';

export default function ShopPage() {
  const [q, setQ] = useState('');
  const [cat, setCat] = useState('All');
  const [roast, setRoast] = useState('All');
  const [sort, setSort] = useState('featured');
  const { toggleWish, wish } = useCart();
  const cats = ['All', ...Array.from(new Set(products.map((p) => p.cat)))];
  const roasts = ['All', ...Array.from(new Set(products.map((p) => p.roast).filter(Boolean)))];

  const list = useMemo(() => {
    let out = products.filter((p) => {
      const hay = (p.name + ' ' + p.blurb + ' ' + (p.origin || '') + ' ' + (p.tags || []).join(' ')).toLowerCase();
      return (cat === 'All' || p.cat === cat)
        && (roast === 'All' || p.roast === roast)
        && hay.includes(q.toLowerCase());
    });
    if (sort === 'price-asc') out = [...out].sort((a, b) => a.price - b.price);
    if (sort === 'price-desc') out = [...out].sort((a, b) => b.price - a.price);
    if (sort === 'rating') out = [...out].sort((a, b) => b.rating - a.rating);
    return out;
  }, [q, cat, roast, sort]);

  return (
    <div className="rt-shop">
      <header className="rt-shop-hero">
        <p className="rt-shop-kicker">Vinyl board · poster bins</p>
        <h1 className="font-display">{brand.nav[0]}</h1>
        <p className="text-muted mt-2">Flip the sleeves — filter by roast, origin story, and grind destiny.</p>
        <div className="rt-shop-controls">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search bags, origins…" className="rt-input" aria-label="Search coffees" />
          <select value={cat} onChange={(e) => setCat(e.target.value)} className="rt-input" aria-label="Category">
            {cats.map((c) => <option key={c}>{c}</option>)}
          </select>
          <select value={roast} onChange={(e) => setRoast(e.target.value)} className="rt-input" aria-label="Roast">
            {roasts.map((r) => <option key={r}>{r}</option>)}
          </select>
          <select value={sort} onChange={(e) => setSort(e.target.value)} className="rt-input" aria-label="Sort">
            <option value="featured">Featured</option>
            <option value="price-asc">Price ↑</option>
            <option value="price-desc">Price ↓</option>
            <option value="rating">Top rated</option>
          </select>
        </div>
        <div className="rt-filter-chips">
          {cats.map((c) => (
            <button key={c} type="button" className={`chip ${cat === c ? 'rt-chip-on' : ''}`} onClick={() => setCat(c)}>{c}</button>
          ))}
        </div>
      </header>

      <div className="rt-vinyl-grid">
        {list.map((p) => (
          <article key={p.id} className="rt-vinyl">
            <Link href={`/product/${p.id}`} className="rt-vinyl-sleeve">
              <img src={p.img} alt={p.name} />
              <span className="rt-vinyl-hole" aria-hidden="true" />
            </Link>
            <div className="rt-vinyl-meta">
              <div className="flex justify-between gap-2 items-start">
                <Link href={`/product/${p.id}`} className="font-display text-xl" style={{ color: 'var(--accent)' }}>{p.name}</Link>
                <button type="button" onClick={() => toggleWish(p.id)} aria-label="Wishlist" className="text-lg">{wish.includes(p.id) ? '♥' : '♡'}</button>
              </div>
              <p className="text-sm text-muted mt-1">{p.origin || p.cat}{p.roast ? ` · ${p.roast}` : ''}</p>
              <p className="text-sm mt-2 line-clamp-2">{p.blurb}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="font-semibold">${p.price}</span>
                <span className="text-xs text-muted">★ {p.rating}</span>
              </div>
            </div>
          </article>
        ))}
      </div>
      {!list.length && <p className="rt-empty">No matches — try another filter on the board.</p>}
    </div>
  );
}

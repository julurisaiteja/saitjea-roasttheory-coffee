'use client';
import Link from 'next/link';
import { brand, products } from '../lib/brand';
import { useEffect, useState } from 'react';

function Stars({ n }) {
  return <span className="stars">{'★'.repeat(Math.round(n))}{'☆'.repeat(5 - Math.round(n))}</span>;
}

export default function HomePage() {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setTick((x) => x + 1), 2800);
    return () => clearInterval(t);
  }, []);
  const live = typeof brand.stats[0].value === 'number' ? brand.stats[0].value + (tick % 7) : brand.stats[0].value;
  const bags = products.filter((p) => p.cat !== 'Gear');
  const origins = [...new Set(bags.map((p) => p.origin).filter(Boolean))];

  return (
    <>
      <section className="retro-hero">
        <video autoPlay muted loop playsInline poster={brand.poster}>
          <source src={brand.video} type="video/mp4" />
        </video>
        <div className="retro-grain" />
        <div className="retro-badge">
          <div className="retro-badge-inner">
            <p className="text-xs tracking-[0.25em] uppercase" style={{ color: 'var(--accent)' }}>Est. roast lab</p>
            <p className="retro-brand">{brand.name}</p>
            <h1 className="mt-3 text-lg" style={{ color: '#f6e8d4' }}>{brand.tagline}</h1>
            <div className="mt-6 flex flex-col gap-3 items-center">
              <Link href="/shop" className="btn-brand">Shop bags</Link>
              <Link href="/special" className="btn-ghost">Subscribe</Link>
            </div>
          </div>
        </div>
      </section>

      <p className="rt-marquee-bar reveal-up">{brand.offer.code} — {brand.offer.label}</p>

      <section className="rt-stats">
        {brand.stats.map((s, i) => (
          <div key={s.label} className={`rt-stat-card reveal-up delay-${i + 1}`}>
            <p className="font-display rt-stat-val">{i === 0 ? live : s.value}</p>
            <p className="rt-stat-label">{s.label}</p>
          </div>
        ))}
      </section>

      <div className="retro-strip">
        {bags.map((p) => (
          <Link key={p.id} href={`/product/${p.id}`} className="float-soft">
            <img src={p.img} alt={p.name} />
            <div className="p-3">
              <p className="font-display text-lg" style={{ color: 'var(--accent)' }}>{p.name}</p>
              <p className="text-sm text-muted">{p.origin || p.cat} · ${p.price}</p>
            </div>
          </Link>
        ))}
      </div>

      <section id="brew-lab" className="rt-lab reveal-up">
        <div className="rt-lab-copy">
          <h2 className="font-display">{brand.nav[2]}</h2>
          <p className="text-muted mt-2">Grind curves for pour-over, espresso, press, AeroPress, and cold brew — matched on every bag.</p>
          <div className="rt-grind-row">
            {brand.variants.grinds.map((g) => (
              <span key={g} className="chip">{g}</span>
            ))}
          </div>
          <Link href="/special" className="btn-brand mt-6">Build a subscription</Link>
        </div>
        <div className="rt-poster" aria-hidden="true">
          <p className="font-display">1:16</p>
          <p>205°F · bloom 45s</p>
        </div>
      </section>

      <section id="origins" className="rt-origins">
        <h2 className="font-display reveal-up">{brand.nav[3]}</h2>
        <p className="text-muted mt-2 reveal-up delay-1">Lots cupped, scored, and roasted in small batches.</p>
        <div className="rt-origin-grid">
          {origins.map((o) => (
            <div key={o} className="rt-origin-card reveal-up delay-2">
              <p className="font-display">{o}</p>
              <p className="text-sm text-muted mt-1">Cup science on the PDP</p>
            </div>
          ))}
        </div>
      </section>

      <section id="reviews" className="px-4 py-16 max-w-5xl mx-auto grid gap-6 md:grid-cols-2">
        {brand.reviews.map((r) => (
          <blockquote key={r.name} className="card-soft p-5 reveal-up">
            <Stars n={r.stars} />
            <p className="mt-3 font-display text-xl" style={{ color: 'var(--accent)' }}>&ldquo;{r.text}&rdquo;</p>
            <footer className="mt-3 text-sm text-muted">{r.name}</footer>
          </blockquote>
        ))}
      </section>
    </>
  );
}

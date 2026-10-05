'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { brand, products } from '../../lib/brand';
import { useCart } from '../../lib/cart';
export default function SpecialPage(){
  const coffees=products.filter(p=>p.cat!=='Gear');
  const [bean,setBean]=useState(coffees[0]); const [grind,setGrind]=useState(brand.variants.grinds[2]);
  const [cadence,setCadence]=useState(brand.variants.cadence[0]);
  const { add }=useCart(); const router=useRouter();
  function sub(){ add({ id:bean.id, name:bean.name+' Subscription', price:bean.price, img:bean.img, qty:1, lineKey:`sub-${bean.id}-${cadence}`, meta:`${grind} · ${cadence}` }); router.push('/checkout'); }
  return (
    <div className="rt-special">
      <header className="rt-special-hero">
        <p className="rt-shop-kicker">{brand.nav[1]} · {brand.nav[2]}</p>
        <h1 className="font-display">Subscribe · Brew lab</h1>
        <p className="text-muted mt-2">Origin, grind curve, roast cadence.</p>
      </header>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{coffees.map(p=><button key={p.id} onClick={()=>setBean(p)} className="card-soft overflow-hidden text-left" style={{outline:bean.id===p.id?'2px solid var(--brand)':undefined}}>
        <img src={p.img} alt="" className="aspect-video w-full object-cover" />
        <div className="p-3"><p className="font-semibold text-sm">{p.name}</p><p className="text-xs text-muted">{p.origin} · {p.roast}</p></div>
      </button>)}</div>
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <div><p className="font-semibold mb-2">Grind for brewer</p><div className="flex flex-wrap gap-2">{brand.variants.grinds.map(g=><button key={g} onClick={()=>setGrind(g)} className="chip" style={{outline:grind===g?'2px solid var(--brand)':undefined}}>{g}</button>)}</div></div>
        <div><p className="font-semibold mb-2">Cadence</p><div className="flex flex-wrap gap-2">{brand.variants.cadence.map(g=><button key={g} onClick={()=>setCadence(g)} className="chip" style={{outline:cadence===g?'2px solid var(--brand)':undefined}}>{g}</button>)}</div></div>
      </div>
      <div className="card-soft mt-8 p-6"><p className="font-semibold">Lab recipe for {bean.name}</p><p className="text-muted text-sm mt-2">{bean.blurb} · Try 1:16 · 205°F · 3:00 bloom 45s.</p>
        <button className="btn-brand mt-4" onClick={sub}>Start subscription · ${bean.price}</button></div>
    </div>
  );
}

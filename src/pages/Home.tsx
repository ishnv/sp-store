import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import {
  Star, ShieldCheck, Sparkles, BadgeIndianRupee, HeartHandshake,
  MessageCircle, MapPin, Clock, Phone, Instagram, Facebook, Youtube,
  ArrowRight, Menu, X, Copy, PhoneCall, ChevronLeft, ChevronRight,
  Flame, Award, Zap, CheckCircle2, ShoppingBag, Percent, Timer,
} from "lucide-react";
import { toast } from "sonner";
import { AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { FAQS } from "@/data/faq";
import { PRODUCTS, CATEGORIES, STORE, type Product } from "@/data/products";

const telHref = `tel:${STORE.phone.replace(/\s/g, "")}`;

const waLink = (product?: string, variant?: string) => {
  let text = product
    ? `Hi ${STORE.name}, I want to buy "${product}"${variant ? ` (${variant})` : ""}. Is it available?`
    : `Hi ${STORE.name}, I'm interested in your cookware and essentials. Can you help?`;
  return `https://wa.me/${STORE.whatsapp}?text=${encodeURIComponent(text)}`;
};

const openWhatsApp = (e: React.MouseEvent<HTMLAnchorElement>) => {
  const href = e.currentTarget.href;
  e.preventDefault();
  const win = window.open(href, "_blank", "noopener,noreferrer");
  if (win) return;
  try { window.top!.location.href = href; } catch { window.location.href = href; }
};

const copyNumber = async () => {
  try {
    await navigator.clipboard.writeText(STORE.phone);
    toast.success("Number copy ho gaya!", { description: STORE.phone });
  } catch {
    toast.info(`Hamara number: ${STORE.phone}`);
  }
};

function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => { if (entries.some((e) => e.isIntersecting)) { setStarted(true); io.disconnect(); } },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    let startTime: number;
    let raf: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [started, end, duration]);
  return { count, ref };
}

function SectionHeading({ eyebrow, title, subtitle, hinglishSubtitle }: {
  eyebrow: string; title: string; subtitle: string; hinglishSubtitle?: string;
}) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <span className="inline-flex items-center gap-2 rounded-full border border-copper/30 bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-copper">{eyebrow}</span>
      <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl lg:text-5xl">{title}</h2>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">{subtitle}</p>
      {hinglishSubtitle && <p className="mt-1 text-sm font-medium text-copper/80 italic">{hinglishSubtitle}</p>}
    </div>
  );
}

function ContactActions({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <a href={telHref} className="magnetic-btn inline-flex items-center gap-2 rounded-full border border-copper/35 bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-accent">
        <PhoneCall className="h-4 w-4 text-copper" /> Call {STORE.phone}
      </a>
      <button type="button" onClick={copyNumber} className="magnetic-btn inline-flex items-center gap-2 rounded-full border border-border bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-accent">
        <Copy className="h-4 w-4 text-copper" /> Copy number
      </button>
    </div>
  );
}

function ImageGallery({ images, alt }: { images: string[]; alt: string }) {
  const [current, setCurrent] = useState(0);
  if (images.length === 1) {
    return (
      <div className="img-zoom relative aspect-square overflow-hidden rounded-2xl bg-muted">
        <img src={images[0]} alt={alt} loading="lazy" className="h-full w-full object-cover" />
      </div>
    );
  }
  return (
    <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
      <div className="flex h-full transition-transform duration-500 ease-out" style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((img, i) => (
          <div key={i} className="img-zoom h-full w-full shrink-0">
            <img src={img} alt={`${alt} — view ${i + 1}`} loading="lazy" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>
      {images.length > 1 && (
        <>
          <button onClick={() => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1))} className="absolute left-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-card/80 text-foreground backdrop-blur transition hover:bg-card" aria-label="Previous image">
            <ChevronLeft className="h-4 w-4" />
          </button>
          <button onClick={() => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1))} className="absolute right-2 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-card/80 text-foreground backdrop-blur transition hover:bg-card" aria-label="Next image">
            <ChevronRight className="h-4 w-4" />
          </button>
          <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {images.map((_, i) => (
              <button key={i} onClick={() => setCurrent(i)} className={`h-1.5 rounded-full transition-all ${i === current ? "w-6 bg-copper" : "w-1.5 bg-white/60"}`} aria-label={`Go to image ${i + 1}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const NAV = [
  { label: "Catalog", href: "#catalog" },
  { label: "Why Us", href: "#why-us" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Visit Us", href: "#visit" },
];

function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`sticky top-0 z-40 border-b transition-all duration-300 ${scrolled ? "border-border bg-background/80 shadow-[var(--shadow-soft)] backdrop-blur-xl" : "border-border/50 bg-background/60 backdrop-blur-md"}`}>
      <div className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-300 ${scrolled ? "py-2" : "py-3.5"}`}>
        <Link to="/" className="flex items-center gap-3">
          <span className={`gradient-copper flex items-center justify-center rounded-xl font-display font-bold text-copper-foreground shadow-[var(--shadow-soft)] transition-all duration-300 ${scrolled ? "h-9 w-9 text-base" : "h-10 w-10 text-lg"}`}>SP</span>
          <span className="leading-tight">
            <span className={`block font-display font-bold transition-all duration-300 ${scrolled ? "text-base" : "text-lg"}`}>Bartan Store</span>
            <span className="block text-[11px] uppercase tracking-[0.18em] text-muted-foreground">Your Neighborhood Store · Since {STORE.since}</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-8 md:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="nav-link text-sm font-medium text-muted-foreground transition-colors hover:text-copper">{n.label}</a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <a href={waLink()} target="_blank" rel="noopener noreferrer" onClick={openWhatsApp} className="pulse-glow hidden rounded-full bg-copper px-5 py-2.5 text-sm font-semibold text-copper-foreground transition-transform hover:-translate-y-0.5 sm:inline-block">WhatsApp Pe Pucho</a>
          <button onClick={() => setOpen((v) => !v)} aria-label="Toggle navigation menu" aria-expanded={open} className="relative rounded-lg border border-border p-2 transition-colors hover:border-copper/50 md:hidden">
            <Menu className={`h-5 w-5 transition-all duration-300 ${open ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"}`} />
            <X className={`absolute inset-0 m-auto h-5 w-5 transition-all duration-300 ${open ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"}`} />
          </button>
        </div>
      </div>
      {open && (
        <nav className="animate-slide-down border-t border-border bg-card px-5 py-3 md:hidden">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} onClick={() => setOpen(false)} className="block py-2.5 text-sm font-medium text-foreground">{n.label}</a>
          ))}
        </nav>
      )}
    </header>
  );
}

function Hero() {
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      if (!parallaxRef.current) return;
      const rect = parallaxRef.current.getBoundingClientRect();
      setOffset(Math.max(0, -rect.top) * 0.3);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const highlights = [
    { label: "100% Authentic Products", sub: "Warranty backed guarantee" },
    { label: "Flat 50% Off MRP", sub: "Every item, every day" },
    { label: "5 Year Warranty", sub: "On pressure cookers" },
  ];
  return (
    <section id="top" className="surface-warm relative overflow-hidden">
      <div ref={parallaxRef} className="absolute inset-0 z-0 opacity-20" style={{ transform: `translateY(${offset}px)` }}>
        <img src="/images/pnb-triply-kadai-stove.png" alt="" className="h-[120%] w-full object-cover" />
      </div>
      <div className="relative z-10 mx-auto grid max-w-7xl items-center gap-12 px-5 py-14 md:py-20 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-copper/30 bg-card px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.14em] text-copper">
            <Sparkles className="h-3.5 w-3.5" /> Your Neighborhood Essentials Hub
          </span>
          <h1 className="mt-6 font-display text-4xl font-bold leading-[1.05] sm:text-5xl lg:text-6xl">
            Quality Products.
            <span className="block bg-[linear-gradient(120deg,var(--copper),var(--copper-glow))] bg-clip-text text-transparent animate-gradient-shift">Local Trust.</span>
            <span className="block text-foreground">Always Authentic.</span>
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Premium quality cookware and essentials at honest prices — flat 50% off MRP. From triply kadai to pressure cookers, every product is carefully selected for your kitchen. Wholesale and retail rates available.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#catalog" className="gradient-copper magnetic-btn inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold text-copper-foreground shadow-[var(--shadow-glow)]">
              Browse Collection <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#visit" className="magnetic-btn inline-flex items-center gap-2 rounded-full border border-copper/35 bg-card px-7 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-accent">
              <MapPin className="h-4 w-4 text-copper" /> Visit Us Today
            </a>
          </div>
          <dl className="mt-10 grid grid-cols-3 gap-3 border-t border-border/80 pt-6">
            {highlights.map((h, i) => (
              <Reveal key={h.label} delay={i * 140}>
                <dt className="font-display text-sm font-bold sm:text-base">{h.label}</dt>
                <dd className="mt-0.5 text-xs text-muted-foreground">{h.sub}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
        <div className="relative">
          <div className="float-soft overflow-hidden rounded-[2rem] border border-border/60 shadow-[var(--shadow-lift)]">
            <img src="/images/pnb-triply-kadai-lid.png" alt="Premium cookware featured at SP-Store" width={1600} height={1200} className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl border border-border bg-card px-5 py-3 shadow-[var(--shadow-lift)] sm:left-8">
            <div className="flex">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-copper text-copper" />
              ))}
            </div>
            <span className="text-sm font-semibold">4.9 / 5 — 1,500+ Happy Customers</span>
          </div>
          <div className="absolute -right-2 top-4 rounded-full bg-red-500 px-4 py-2 text-xs font-bold text-white shadow-lg badge-pulse sm:right-4">FLAT 50% OFF</div>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  const stats = [
    { icon: ShoppingBag, value: 1500, suffix: "+", label: "Happy Families", hinglish: "Khush Grahak" },
    { icon: Percent, value: 50, suffix: "%", label: "Off on MRP", hinglish: "Har Product Pe Discount" },
    { icon: Award, value: 5, suffix: " Yrs", label: "Warranty", hinglish: "Pressure Cooker Pe" },
    { icon: ShieldCheck, value: 100, suffix: "%", label: "Authentic Products", hinglish: "Asli Guarantee" },
  ];
  return (
    <section className="border-y border-border/70 bg-steel py-10">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((s, i) => {
            const StatItem = () => {
              const { count, ref } = useCountUp(s.value, 2000);
              return (
                <Reveal key={s.label} delay={i * 100}>
                  <div ref={ref} className="text-center">
                    <s.icon className="mx-auto h-6 w-6 text-copper" />
                    <div className="mt-2 font-display text-3xl font-bold text-primary-foreground">{count}{s.suffix}</div>
                    <div className="text-sm font-medium text-primary-foreground/80">{s.label}</div>
                    <div className="text-xs text-primary-foreground/60">{s.hinglish}</div>
                  </div>
                </Reveal>
              );
            };
            return <StatItem key={s.label} />;
          })}
        </div>
      </div>
    </section>
  );
}

function Catalog() {
  const [active, setActive] = useState<(typeof CATEGORIES)[number]>("All");
  const items = active === "All" ? PRODUCTS : PRODUCTS.filter((p) => p.category === active);
  return (
    <section id="catalog" className="mx-auto max-w-7xl scroll-mt-20 px-5 py-16 md:py-24">
      <SectionHeading
        eyebrow="Our Collection"
        title="Quality Products for Every Kitchen"
        subtitle="Every item is carefully selected for durability and value. Honest pricing, authentic quality."
        hinglishSubtitle="Asli products, asli advice, asli commitment."
      />
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((c) => (
          <button key={c} onClick={() => setActive(c)} aria-pressed={active === c}
            className={active === c
              ? "gradient-copper magnetic-btn rounded-full px-5 py-2 text-sm font-semibold text-copper-foreground shadow-[var(--shadow-soft)]"
              : "magnetic-btn rounded-full border border-border bg-card px-5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-copper/40 hover:text-copper"
            }>{c}</button>
        ))}
      </div>
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product, index }: { product: Product; index: number }) {
  const [selectedVariant, setSelectedVariant] = useState(0);
  const variant = product.variants[selectedVariant];
  return (
    <Reveal delay={(index % 3) * 120} className="card-lift card-3d group flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-card)]">
      <Link to={`/product/${product.id}`} className="relative">
        <ImageGallery images={product.images} alt={product.name} />
        {product.badge && (
          <span className={`absolute left-3 top-3 rounded-full ${product.badgeColor} px-3 py-1 text-[11px] font-bold uppercase tracking-wider text-white shadow-lg badge-pulse`}>{product.badge}</span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-card/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-copper backdrop-blur">{product.category}</span>
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display text-lg font-bold leading-snug hover:text-copper transition-colors">{product.nameHinglish}</h3>
        </Link>
        <p className="mt-0.5 text-xs text-muted-foreground">{product.name}</p>
        <p className="mt-2 text-xs font-medium uppercase tracking-wide text-copper">{product.grade}</p>
        {product.variants.length > 1 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {product.variants.map((v, i) => (
              <button key={i} onClick={() => setSelectedVariant(i)}
                className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition-all ${i === selectedVariant ? "gradient-copper text-copper-foreground shadow-sm" : "border border-border bg-muted text-muted-foreground hover:border-copper/40 hover:text-copper"
                  }`}>{v.size}{v.capacity ? ` (${v.capacity})` : ""}</button>
            ))}
          </div>
        )}
        <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
          {product.featuresHinglish.slice(0, 3).map((f) => (
            <li key={f} className="flex items-start gap-2"><CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-copper" />{f}</li>
          ))}
        </ul>
        <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
          <div>
            <span className="text-sm text-muted-foreground line-through">₹{variant.mrp.toLocaleString()}</span>
            <div className="font-display text-2xl font-bold text-copper">₹{variant.salePrice.toLocaleString()}</div>
            <span className="text-[11px] font-semibold text-emerald-600">Flat 50% OFF — incl. taxes</span>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <Link to={`/product/${product.id}`} className="flex-1 magnetic-btn inline-flex items-center justify-center gap-2 rounded-xl border border-copper/35 bg-card px-4 py-2.5 text-sm font-semibold transition-colors hover:bg-accent">
            Details Dekho
          </Link>
          <a href={waLink(product.name, `${variant.size}${variant.capacity ? ` ${variant.capacity}` : ""}`)} target="_blank" rel="noopener noreferrer" onClick={openWhatsApp}
            className="flex-1 magnetic-btn inline-flex items-center justify-center gap-2 rounded-xl bg-whatsapp px-4 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
            <MessageCircle className="h-4 w-4" /> Order Karo
          </a>
        </div>
      </div>
    </Reveal>
  );
}

const TRUST = [
  { icon: ShieldCheck, title: "100% Authentic Products", titleHinglish: "Asli Products Only", text: "Authorized dealer committed to genuine products only. Every item comes with original branding, warranty card, and authentic packaging. No compromises on quality." },
  { icon: Flame, title: "Triply Technology", titleHinglish: "3 Layer — Steel, Aluminium, Steel", text: "SS-AL-SS construction for even heat distribution. No hot spots, no burning. Toxin-free surface — completely safe for your family." },
  { icon: BadgeIndianRupee, title: "Wholesale & Retail", titleHinglish: "Ek Piece Lo Ya Sau — Rate Wahi", text: "Walk-in customers get retail pricing. Bulk orders qualify for wholesale rates. Weddings, catering, corporate gifting — special rates available." },
  { icon: HeartHandshake, title: "Friendly Service", titleHinglish: "Family Jaisa Treatment", text: "Family-run store since 2011. We're here to help you choose the right product, not just make a sale. Let's discuss over chai!" },
];

function WhyUs() {
  return (
    <section id="why-us" className="surface-warm scroll-mt-20 border-y border-border/70">
      <div className="mx-auto max-w-7xl px-5 py-16 md:py-24">
        <SectionHeading eyebrow="Why Choose Us" title={`Mahavir Enclave families ka bharosa since ${STORE.since}`} subtitle="We'd rather lose a sale than sell you steel that won't last." hinglishSubtitle="Naam se zyada, quality se pehchaan banate hain." />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TRUST.map(({ icon: Icon, title, titleHinglish, text }, i) => (
            <Reveal key={title} delay={i * 110} className="card-lift rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
              <span className="gradient-copper mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl text-copper-foreground"><Icon className="h-6 w-6" /></span>
              <h3 className="font-display text-lg font-bold">{title}</h3>
              <p className="mt-1 text-xs font-medium text-copper">{titleHinglish}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function TriplyTech() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-16 md:py-24">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-border shadow-[var(--shadow-lift)]">
            <img src="/images/pnb-triply-kadai-features.png" alt="Triply cookware technology and construction layers" className="h-full w-full object-cover" />
          </div>
        </Reveal>
        <div>
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-copper">Technology</span>
          <h2 className="mt-3 font-display text-3xl font-bold sm:text-4xl">Triply Construction Kya Hai?</h2>
          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            Triply matlab 3 layers of metal bonded together — andar aur bahar food-grade stainless steel, beech mein aluminium core. Aluminium heat ko fast aur evenly spread karta hai, steel surface ko toxin-free aur durable banata hai.
          </p>
          <div className="mt-6 space-y-4">
            {[
              { icon: Zap, title: "Energy Efficient", desc: "Jaldi garam hota hai, gas bachti hai" },
              { icon: Flame, title: "No Hot Spots", desc: "Kahi se bhi jalega nahi, evenly pakega" },
              { icon: Timer, title: "Faster Cooking", desc: "Time bachao, nutrients bachao" },
              { icon: ShieldCheck, title: "Toxin Free", desc: "100% food grade, family safe" },
            ].map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 100}>
                <div className="flex items-start gap-4 rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-soft)]">
                  <span className="gradient-copper flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-copper-foreground"><Icon className="h-5 w-5" /></span>
                  <div><h4 className="font-display font-bold">{title}</h4><p className="text-sm text-muted-foreground">{desc}</p></div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const REVIEWS = [
  { name: "Anjali Sharma", role: "Homemaker, Dwarka", text: "The cookware I bought here has been amazing! After 6 months, it looks brand new. SP-Store's prices are unbeatable compared to online. Genuine quality guaranteed!" },
  { name: "Rakesh Verma", role: "Catering Business", text: "I bulk order from SP-Store every season. The wholesale prices are great and quality never drops. Used the warranty service once, and they handled it perfectly." },
  { name: "Fatima Khan", role: "Baking Enthusiast", text: "The triply cookware performs beautifully on induction. The staff patiently explained every option and never pushed expensive items. Honest shopkeepers like this are rare!" },
  { name: "Suresh Iyer", role: "Regular Customer, 8+ years", text: "I've been coming here since 2015. The cookware still looks new. The owner always gives genuine advice. It feels like shopping at a friend's store, not a commercial shop." },
];

function Reviews() {
  return (
    <section id="reviews" className="surface-warm scroll-mt-20 border-y border-border/70">
      <div className="mx-auto max-w-7xl px-5 py-16 md:py-24">
        <SectionHeading eyebrow="Customer Love" title="1,500+ families ka bharosa" subtitle="Real words from real customers — jo humse jud gaye hain, woh kabhi nahi gaye." hinglishSubtitle="Review fake nahi, customers asli hain." />
        <div className="snap-row mt-10 flex gap-5 overflow-x-auto pb-2 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4">
          {REVIEWS.map((r, i) => (
            <Reveal key={r.name} delay={i * 110} className="card-lift w-[86%] shrink-0 snap-center rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)] md:w-auto">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, s) => <Star key={s} className="h-4 w-4 fill-copper text-copper" />)}
              </div>
              <blockquote className="mt-4 text-sm leading-relaxed text-foreground/90">&ldquo;{r.text}&rdquo;</blockquote>
              <figcaption className="mt-5 flex items-center gap-3 border-t border-border pt-4">
                <span className="gradient-copper flex h-10 w-10 items-center justify-center rounded-full font-display text-sm font-bold text-copper-foreground">{r.name.charAt(0)}</span>
                <span><span className="block text-sm font-semibold">{r.name}</span><span className="block text-xs text-muted-foreground">{r.role}</span></span>
              </figcaption>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  return (
    <section id="faq" className="scroll-mt-24 border-t border-border/70 bg-background">
      <div className="mx-auto max-w-3xl px-5 py-16 md:py-24">
        <SectionHeading eyebrow="FAQ" title="Sawal jo sabse zyada puche jaate hain" subtitle="Timings, wholesale rates, delivery aur warranty — sab plain language mein." hinglishSubtitle="Aapke sawal, hamare jawaab — seedhi baat, no bakwaas." />
        <Reveal className="mt-10">
          <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-[var(--shadow-soft)]">
            {FAQS.map((f, i) => {
              const value = `faq-${i}`;
              const isOpen = openItem === value;
              return (
                <div key={f.q} className={`border-b border-border px-5 last:border-b-0 ${isOpen ? "bg-accent/40" : ""}`}>
                  <AccordionTrigger onClick={() => setOpenItem(isOpen ? null : value)} isOpen={isOpen} className="hover:text-copper hover:no-underline">{f.q}</AccordionTrigger>
                  <AccordionContent isOpen={isOpen} className="text-sm leading-relaxed text-muted-foreground">{f.a}</AccordionContent>
                </div>
              );
            })}
          </div>
        </Reveal>
        <Reveal delay={120} className="mt-8 rounded-2xl border border-copper/25 bg-cream p-6 text-center">
          <p className="text-sm text-muted-foreground">Abhi bhi kuch samajh nahi aaya? Direct WhatsApp pe pucho — din bhar reply karte hain.</p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            <a href={waLink()} target="_blank" rel="noopener noreferrer" onClick={openWhatsApp} className="pulse-glow magnetic-btn inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
              <MessageCircle className="h-4 w-4" /> WhatsApp Pe Pucho
            </a>
            <ContactActions />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function VisitUs() {
  return (
    <section id="visit" className="surface-warm scroll-mt-20 border-t border-border/70">
      <div className="mx-auto max-w-7xl px-5 py-16 md:py-24">
        <SectionHeading eyebrow="Visit Us" title="Dukaan pe aao, haath mein pakad ke dekho" subtitle="Chai peete hain, product compare karte hain, phir decide karte hain — no pressure." hinglishSubtitle="Online dekhne se achha, ek baar dukaan pe aa ke feel karo." />
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <Reveal className="space-y-4">
            <InfoCard icon={MapPin} title="Store Address" lines={[STORE.address]}>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={STORE.maps} target="_blank" rel="noopener noreferrer" className="magnetic-btn inline-flex items-center gap-2 rounded-full border border-copper/35 bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-accent">
                  <MapPin className="h-4 w-4 text-copper" /> Maps Mein Kholo
                </a>
                <a href={STORE.justdial} target="_blank" rel="noopener noreferrer" className="magnetic-btn inline-flex items-center gap-2 rounded-full bg-copper px-5 py-2.5 text-sm font-semibold text-copper-foreground transition-opacity hover:opacity-90">Justdial Pe Dekho</a>
              </div>
            </InfoCard>
            <InfoCard icon={Clock} title="Opening Hours" lines={[...STORE.hours.map((h) => `${h.day} — ${h.time}`), "Sunday including har din open hain."]} />
            <InfoCard icon={Phone} title="Call / WhatsApp" lines={[STORE.phone]}>
              <div className="mt-4 flex flex-wrap gap-3">
                <a href={waLink()} target="_blank" rel="noopener noreferrer" onClick={openWhatsApp} className="pulse-glow magnetic-btn inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                  <MessageCircle className="h-4 w-4" /> WhatsApp Karo
                </a>
                <ContactActions />
              </div>
            </InfoCard>
          </Reveal>
          <Reveal delay={120} className="min-h-[340px] overflow-hidden rounded-2xl border border-border shadow-[var(--shadow-soft)]">
            <iframe title="SP Bartan Store location on Google Maps" src="https://maps.google.com/maps?q=Sumit%20Purvanchal%20Bartan%20Store%2C%20Mahavir%20Enclave%2C%20New%20Delhi&z=16&output=embed" loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-full min-h-[340px] w-full border-0" allowFullScreen />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function InfoCard({ icon: Icon, title, lines, children }: { icon: typeof MapPin; title: string; lines: string[]; children?: ReactNode }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
      <div className="flex items-start gap-4">
        <span className="gradient-copper flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-copper-foreground"><Icon className="h-5 w-5" /></span>
        <div>
          <h3 className="font-display text-base font-bold">{title}</h3>
          {lines.map((l) => <p key={l} className="mt-1 text-sm leading-relaxed text-muted-foreground">{l}</p>)}
          {children}
        </div>
      </div>
    </div>
  );
}

function Footer() {
  return (
    <footer className="bg-steel text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3">
            <span className="gradient-copper flex h-10 w-10 items-center justify-center rounded-xl font-display text-lg font-bold text-copper-foreground">SP</span>
            <span className="font-display text-xl font-bold">{STORE.name}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed opacity-70">Your local essentials store since {STORE.since} — Mahavir Enclave, Delhi. Quality cookware, honest prices, genuine advice. Visit us today!</p>
        </div>
        <div>
          <h3 className="font-display text-base font-bold">Quick Links</h3>
          <ul className="mt-4 space-y-2 text-sm opacity-75">
            {NAV.map((n) => (<li key={n.href}><a href={n.href} className="transition-opacity hover:opacity-100">{n.label}</a></li>))}
          </ul>
        </div>
        <div>
          <h3 className="font-display text-base font-bold">Follow Us</h3>
          <div className="mt-4 flex gap-3">
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social media profile" className="magnetic-btn flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/20 transition-colors hover:bg-copper"><Icon className="h-4 w-4" /></a>
            ))}
          </div>
          <p className="mt-5 text-sm opacity-75">{STORE.phone}</p>
          <p className="mt-1 text-xs opacity-50">Quality Cookware & Essentials Store</p>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10 px-5 py-5 text-center text-xs opacity-60">
        © {new Date().getFullYear()} {STORE.name}. All rights reserved. | Quality Products Only
      </div>
    </footer>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <StatsBar />
        <Catalog />
        <WhyUs />
        <TriplyTech />
        <Reviews />
        <FaqSection />
        <VisitUs />
      </main>
      <Footer />
      <div className="fixed bottom-5 right-5 z-50 flex flex-col items-center gap-3">
        <a href={waLink()} target="_blank" rel="noopener noreferrer" onClick={openWhatsApp} aria-label="Chat with us on WhatsApp" className="pulse-glow flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-primary-foreground shadow-[var(--shadow-glow)] transition-transform hover:scale-110">
          <MessageCircle className="h-6 w-6" />
        </a>
        <a href={telHref} aria-label={`Call ${STORE.phone}`} className="flex h-12 w-12 items-center justify-center rounded-full border border-copper/30 bg-card text-copper shadow-[var(--shadow-soft)] transition-transform hover:scale-110">
          <PhoneCall className="h-5 w-5" />
        </a>
      </div>
    </div>
  );
}

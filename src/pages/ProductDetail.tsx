import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Reveal } from "@/components/Reveal";
import {
  MessageCircle, PhoneCall, ChevronLeft, ChevronRight, CheckCircle2,
  ArrowLeft, Star, Share2, Heart, Truck, ShieldCheck, Clock,
  Copy, MapPin, Instagram, Facebook, Youtube,
} from "lucide-react";
import { toast } from "sonner";
import { PRODUCTS, STORE, type Product } from "@/data/products";

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

function useCountUp(end: number, duration = 1500) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => setStarted(true), 300);
    return () => clearTimeout(timer);
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
  return count;
}

/* ------------------------------------------------------------------
 * Image Gallery with Thumbnails
 * ------------------------------------------------------------------ */
function ProductImageGallery({ images, name }: { images: string[]; name: string }) {
  const [current, setCurrent] = useState(0);
  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-2xl border border-border bg-muted shadow-[var(--shadow-card)]">
        <div className="flex h-full transition-transform duration-500 ease-out" style={{ transform: `translateX(-${current * 100}%)` }}>
          {images.map((img, i) => (
            <div key={i} className="img-zoom h-full w-full shrink-0">
              <img src={img} alt={`${name} — view ${i + 1}`} className="h-full w-full object-cover" />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <>
            <button onClick={() => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1))} className="absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-foreground backdrop-blur transition hover:bg-card shadow-lg" aria-label="Previous image">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button onClick={() => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1))} className="absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-card/90 text-foreground backdrop-blur transition hover:bg-card shadow-lg" aria-label="Next image">
              <ChevronRight className="h-5 w-5" />
            </button>
          </>
        )}
      </div>
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((img, i) => (
            <button key={i} onClick={() => setCurrent(i)} className={`relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all ${i === current ? "border-copper shadow-md" : "border-border opacity-60 hover:opacity-100"}`}>
              <img src={img} alt={`Thumbnail ${i + 1}`} className="h-full w-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------
 * Related Products
 * ------------------------------------------------------------------ */
function RelatedProducts({ currentProduct }: { currentProduct: Product }) {
  const related = PRODUCTS.filter((p) => p.category === currentProduct.category && p.id !== currentProduct.id).slice(0, 3);
  if (related.length === 0) {
    const others = PRODUCTS.filter((p) => p.id !== currentProduct.id).slice(0, 3);
    return <RelatedGrid products={others} />;
  }
  return <RelatedGrid products={related} />;
}

function RelatedGrid({ products }: { products: Product[] }) {
  return (
    <section className="mx-auto max-w-7xl px-5 py-12">
      <h2 className="font-display text-2xl font-bold">Aur bhi dekho is category mein</h2>
      <p className="mt-1 text-sm text-muted-foreground">Same quality, alag-alag sizes aur designs</p>
      <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <Link key={p.id} to={`/product/${p.id}`} className="card-lift group flex gap-4 rounded-xl border border-border bg-card p-4 shadow-[var(--shadow-soft)]">
            <div className="img-zoom h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-muted">
              <img src={p.images[0]} alt={p.name} className="h-full w-full object-cover" />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="font-display text-sm font-bold group-hover:text-copper transition-colors">{p.nameHinglish}</h3>
              <p className="text-xs text-muted-foreground">{p.name}</p>
              <p className="mt-1 text-xs text-copper font-semibold">{p.grade}</p>
              <div className="mt-2 flex items-center gap-2">
                <span className="text-sm font-bold text-copper">₹{p.variants[0].salePrice.toLocaleString()}</span>
                <span className="text-xs text-muted-foreground line-through">₹{p.variants[0].mrp.toLocaleString()}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------
 * Product Detail Page
 * ------------------------------------------------------------------ */
export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const product = PRODUCTS.find((p) => p.id === id);
  const [selectedVariant, setSelectedVariant] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
    setSelectedVariant(0);
  }, [id]);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background px-4">
        <div className="max-w-md text-center">
          <h1 className="text-7xl font-bold text-foreground">404</h1>
          <h2 className="mt-4 text-xl font-semibold">Product nahi mila</h2>
          <p className="mt-2 text-sm text-muted-foreground">Ye product exist nahi karta. Chalo, catalog pe wapas chalte hain.</p>
          <div className="mt-6">
            <Link to="/" className="inline-flex items-center gap-2 rounded-full bg-copper px-6 py-3 text-sm font-semibold text-copper-foreground">
              <ArrowLeft className="h-4 w-4" /> Catalog Pe Wapas Jao
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const variant = product.variants[selectedVariant];
  const discount = Math.round(((variant.mrp - variant.salePrice) / variant.mrp) * 100);
  const savings = variant.mrp - variant.salePrice;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-xl shadow-[var(--shadow-soft)]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3">
          <Link to="/" className="flex items-center gap-3">
            <span className="gradient-copper flex h-9 w-9 items-center justify-center rounded-xl font-display font-bold text-copper-foreground shadow-[var(--shadow-soft)] text-base">SP</span>
            <span className="font-display font-bold text-base">Bartan Store</span>
          </Link>
          <Link to="/" className="magnetic-btn inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:bg-accent">
            <ArrowLeft className="h-4 w-4" /> Back to Catalog
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 py-8 md:py-12">
        {/* Breadcrumb */}
        <nav className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-copper transition-colors">Home</Link>
          <ChevronLeft className="h-3 w-3 rotate-180" />
          <span className="text-copper font-medium">{product.category}</span>
          <ChevronLeft className="h-3 w-3 rotate-180" />
          <span className="text-foreground font-medium truncate max-w-[200px]">{product.nameHinglish}</span>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Left: Images */}
          <Reveal>
            <ProductImageGallery images={product.images} name={product.name} />
          </Reveal>

          {/* Right: Details */}
          <div>
            <Reveal>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-copper/10 px-3 py-1 text-xs font-semibold text-copper">
                    {product.category}
                  </span>
                  <h1 className="mt-3 font-display text-3xl font-bold sm:text-4xl">{product.nameHinglish}</h1>
                  <p className="mt-1 text-sm text-muted-foreground">{product.name}</p>
                </div>
                {product.badge && (
                  <span className={`shrink-0 rounded-full ${product.badgeColor} px-3 py-1.5 text-xs font-bold text-white shadow-lg badge-pulse`}>
                    {product.badge}
                  </span>
                )}
              </div>

              <p className="mt-2 text-xs font-medium uppercase tracking-wide text-copper">{product.grade}</p>

              {/* Rating */}
              <div className="mt-4 flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-copper text-copper" />
                  ))}
                </div>
                <span className="text-sm font-medium">4.9</span>
                <span className="text-sm text-muted-foreground">(200+ reviews)</span>
              </div>
            </Reveal>

            <Reveal delay={100}>
              {/* Price */}
              <div className="mt-6 rounded-2xl border border-border bg-card p-5 shadow-[var(--shadow-soft)]">
                <div className="flex items-baseline gap-3">
                  <span className="font-display text-4xl font-bold text-copper">₹{useCountUp(variant.salePrice).toLocaleString()}</span>
                  <span className="text-lg text-muted-foreground line-through">₹{variant.mrp.toLocaleString()}</span>
                  <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-bold text-emerald-700">{discount}% OFF</span>
                </div>
                <p className="mt-1 text-sm text-muted-foreground">Aap bachat kar rahe hain: <span className="font-semibold text-emerald-600">₹{savings.toLocaleString()}</span></p>
                <p className="mt-0.5 text-xs text-muted-foreground">Inclusive of all taxes · Free local delivery in Mahavir Enclave</p>
              </div>
            </Reveal>

            <Reveal delay={150}>
              {/* Variant Selector */}
              {product.variants.length > 1 && (
                <div className="mt-6">
                  <h3 className="text-sm font-semibold">Size / Capacity Chuno:</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {product.variants.map((v, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedVariant(i)}
                        className={`rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                          i === selectedVariant
                            ? "gradient-copper text-copper-foreground shadow-md"
                            : "border border-border bg-card text-muted-foreground hover:border-copper/40 hover:text-copper"
                        }`}
                      >
                        <div>{v.size}</div>
                        {v.capacity && <div className="text-[10px] opacity-80">{v.capacity}</div>}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </Reveal>

            <Reveal delay={200}>
              {/* CTA Buttons */}
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <a
                  href={waLink(product.name, `${variant.size}${variant.capacity ? ` ${variant.capacity}` : ""}`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={openWhatsApp}
                  className="pulse-glow magnetic-btn flex flex-1 items-center justify-center gap-2 rounded-xl bg-whatsapp px-6 py-4 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  <MessageCircle className="h-5 w-5" /> WhatsApp Pe Order Karo
                </a>
                <a href={telHref} className="magnetic-btn flex items-center justify-center gap-2 rounded-xl border border-copper/35 bg-card px-6 py-4 text-base font-semibold transition-colors hover:bg-accent">
                  <PhoneCall className="h-5 w-5 text-copper" /> Call Karo
                </a>
              </div>
              <button onClick={copyNumber} className="mt-3 w-full text-center text-sm text-muted-foreground hover:text-copper transition-colors">
                <Copy className="inline h-3.5 w-3.5 mr-1" /> Number copy karo: {STORE.phone}
              </button>
            </Reveal>

            <Reveal delay={250}>
              {/* Trust Badges */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                {[
                  { icon: ShieldCheck, title: "Authentic", sub: "Quality Guaranteed" },
                  { icon: Truck, title: "Free Delivery", sub: "Mahavir Enclave" },
                  { icon: Clock, title: "Same Day", sub: "Order & Pickup" },
                ].map(({ icon: Icon, title, sub }) => (
                  <div key={title} className="flex flex-col items-center rounded-xl border border-border bg-card p-3 text-center">
                    <Icon className="h-5 w-5 text-copper" />
                    <span className="mt-1 text-xs font-semibold">{title}</span>
                    <span className="text-[10px] text-muted-foreground">{sub}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>

        {/* Description & Features */}
        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
              <h2 className="font-display text-xl font-bold">Product Details</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
              <p className="mt-2 text-sm font-medium text-copper italic">{product.descriptionHinglish}</p>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div className="rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
              <h2 className="font-display text-xl font-bold">Features & Benefits</h2>
              <ul className="mt-4 space-y-3">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-copper" />
                    <div>
                      <p className="text-sm font-medium">{f}</p>
                      <p className="text-xs text-muted-foreground">{product.featuresHinglish[i]}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        {/* Price Table */}
        <Reveal>
          <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-[var(--shadow-soft)]">
            <h2 className="font-display text-xl font-bold">Sab Sizes Ka Price</h2>
            <p className="text-sm text-muted-foreground">Har size pe flat 50% off MRP — koi hidden charges nahi</p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="pb-3 font-semibold">Size</th>
                    <th className="pb-3 font-semibold">Capacity</th>
                    <th className="pb-3 font-semibold text-right">MRP</th>
                    <th className="pb-3 font-semibold text-right text-copper">Sale Price</th>
                    <th className="pb-3 font-semibold text-right text-emerald-600">You Save</th>
                  </tr>
                </thead>
                <tbody>
                  {product.variants.map((v, i) => (
                    <tr key={i} className={`border-b border-border/50 ${i === selectedVariant ? "bg-copper/5" : ""}`}>
                      <td className="py-3 font-medium">{v.size}</td>
                      <td className="py-3 text-muted-foreground">{v.capacity || "—"}</td>
                      <td className="py-3 text-right text-muted-foreground line-through">₹{v.mrp.toLocaleString()}</td>
                      <td className="py-3 text-right font-bold text-copper">₹{v.salePrice.toLocaleString()}</td>
                      <td className="py-3 text-right font-medium text-emerald-600">₹{(v.mrp - v.salePrice).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>

        {/* Related Products */}
        <RelatedProducts currentProduct={product} />

        {/* Store Info CTA */}
        <Reveal>
          <div className="mt-8 rounded-2xl border border-copper/25 bg-cream p-8 text-center">
            <h2 className="font-display text-2xl font-bold">Dukaan Pe Aake Dekho</h2>
            <p className="mt-2 text-sm text-muted-foreground">{STORE.address}</p>
            <p className="text-sm text-muted-foreground">Open daily: {STORE.hours[0].time}</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
              <a href={STORE.maps} target="_blank" rel="noopener noreferrer" className="magnetic-btn inline-flex items-center gap-2 rounded-full border border-copper/35 bg-card px-5 py-2.5 text-sm font-semibold transition-colors hover:bg-accent">
                <MapPin className="h-4 w-4 text-copper" /> Maps Pe Kholo
              </a>
              <a href={waLink(product.name)} target="_blank" rel="noopener noreferrer" onClick={openWhatsApp} className="pulse-glow magnetic-btn inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                <MessageCircle className="h-4 w-4" /> WhatsApp Pe Pucho
              </a>
            </div>
          </div>
        </Reveal>
      </main>

      {/* Footer */}
      <footer className="mt-12 bg-steel text-primary-foreground">
        <div className="mx-auto max-w-7xl px-5 py-10 text-center">
          <div className="flex items-center justify-center gap-3">
            <span className="gradient-copper flex h-10 w-10 items-center justify-center rounded-xl font-display text-lg font-bold text-copper-foreground">SP</span>
            <span className="font-display text-xl font-bold">{STORE.name}</span>
          </div>
          <p className="mt-3 text-sm opacity-70">Your local essentials store since {STORE.since}</p>
          <p className="mt-1 text-sm opacity-70">{STORE.phone}</p>
          <div className="mt-4 flex justify-center gap-3">
            {[Instagram, Facebook, Youtube].map((Icon, i) => (
              <a key={i} href="#" aria-label="Social media" className="magnetic-btn flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/20 transition-colors hover:bg-copper">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <p className="mt-6 text-xs opacity-50">© {new Date().getFullYear()} {STORE.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

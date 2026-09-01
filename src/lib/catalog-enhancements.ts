import type { Product } from "@/data/products";
import { PRODUCTS } from "@/data/products";

const sale40 = (mrp: number) => Math.round(mrp * 0.6);

const GENERAL_PRODUCTS: Product[] = [
  {
    id: "nayasa-store-in-set-3",
    name: "Nayasa Store In Food Storage Container — Set of 3",
    nameHinglish: "Nayasa Storage Containers — 3 Piece Set",
    category: "Kitchen Set",
    description: "Practical BPA-free food storage containers from Nayasa for grains, snacks, pulses and everyday kitchen organization.",
    descriptionHinglish: "Kitchen ko organized rakho — dal, chawal, snacks aur dry fruits ke liye handy Nayasa containers.",
    images: ["https://nayasa.com/cdn/shop/files/NE00406_2.jpg?v=1762499007"],
    grade: "BPA-Free Food Safe Plastic",
    features: ["BPA-free food-safe material", "Secure airtight-style lids", "Clear body for easy identification", "Reusable and recyclable", "Ideal for pantry organization"],
    featuresHinglish: ["BPA-free — daily kitchen use ke liye safe", "Secure lids — storage tension-free", "Transparent body — andar kya hai turant dikhe", "Reusable aur recyclable", "Dal, chawal, snacks sab ke liye useful"],
    variants: [{ size: "Set of 3", capacity: "950ml / 1500ml", mrp: 389, salePrice: sale40(389) }],
    badge: "40% OFF",
    badgeColor: "bg-red-500",
  },
  {
    id: "nayasa-store-in-jars",
    name: "Nayasa Store In Food Storage Jars — Set of 3",
    nameHinglish: "Nayasa Store-In Jars — Kitchen Storage Set",
    category: "Kitchen Set",
    description: "Large Nayasa storage jars designed for staples such as rice, flour, pulses and snacks, with sturdy lids and easy-to-organize shapes.",
    descriptionHinglish: "Bade pantry items ke liye proper storage — atta, chawal, dal aur snacks sab ek jagah neat rakho.",
    images: ["https://nayasa.com/cdn/shop/files/NE01975_6.jpg?v=1762500666"],
    grade: "Food-Safe Recyclable Plastic",
    features: ["Large pantry-friendly capacity", "Food-safe plastic construction", "Stackable everyday storage", "Secure snap-style lids", "Easy to clean and reuse"],
    featuresHinglish: ["Badi capacity — monthly ration ke liye useful", "Food-safe plastic", "Neatly stack karke space bachao", "Secure lids", "Wash karke baar-baar use karo"],
    variants: [{ size: "Set of 3", capacity: "Large Storage", mrp: 2399, salePrice: sale40(2399) }],
    badge: "40% OFF",
    badgeColor: "bg-red-500",
  },
  {
    id: "milton-hector",
    name: "Milton Hector PP Water Bottle",
    nameHinglish: "Milton Hector — Daily Use Plastic Bottle",
    category: "Bottle",
    description: "Milton's durable 1 litre PP water bottle with a compact, leakproof everyday design. Suitable for home, school, office and travel.",
    descriptionHinglish: "School, office, gym ya daily ghar ke liye simple Milton bottle — lightweight aur easy carry.",
    images: ["https://www.bbassets.com/media/uploads/p/xl/40296254_1-milton-hector-pet-water-bottle-bpa-free-leak-proof-grey.jpg"],
    grade: "PP Plastic | BPA-Free",
    features: ["1000ml capacity", "BPA-free plastic", "Leakproof screw cap", "Lightweight and portable", "Suitable for home, office and travel"],
    featuresHinglish: ["1 litre capacity", "BPA-free plastic", "Leakproof cap", "Lightweight — bag mein easy", "Home, office aur travel ke liye"],
    variants: [{ size: "1000ml", mrp: 225, salePrice: sale40(225) }],
    badge: "40% OFF",
    badgeColor: "bg-red-500",
  },
  {
    id: "milton-elfin-thermosteel",
    name: "Milton Elfin Thermosteel Vacuum Bottle",
    nameHinglish: "Milton Elfin — Vacuum Thermosteel Bottle",
    category: "Bottle",
    description: "Double-wall vacuum insulated Milton Elfin bottle made from food-grade stainless steel for keeping beverages hot or cold for long hours.",
    descriptionHinglish: "Chai garam, paani thanda — vacuum insulation ke saath Milton ki premium daily-use bottle.",
    images: ["https://www.nkartt.com/uploads/product_img/product_1768642876_0.jpg"],
    grade: "304 Stainless Steel | Vacuum Insulated",
    features: ["Double-wall vacuum insulation", "Food-grade stainless steel", "Leakproof lid", "Rust resistant and durable", "Suitable for hot and cold beverages"],
    featuresHinglish: ["Double-wall vacuum insulation", "Food-grade stainless steel", "Leakproof lid", "Rust resistant — long lasting", "Garam aur thande dono drinks ke liye"],
    variants: [
      { size: "300ml", mrp: 630, salePrice: sale40(630) },
      { size: "500ml", mrp: 690, salePrice: sale40(690) },
      { size: "750ml", mrp: 760, salePrice: sale40(760) },
    ],
    badge: "40% OFF",
    badgeColor: "bg-red-500",
  },
  {
    id: "milton-atlantis-thermosteel",
    name: "Milton Atlantis Thermosteel Water Bottle",
    nameHinglish: "Milton Atlantis — Premium Vacuum Bottle",
    category: "Bottle",
    description: "Milton Atlantis vacuum insulated stainless steel bottle with a secure lid and travel-friendly design for hot and cold beverages.",
    descriptionHinglish: "Premium Milton bottle — travel, office aur gym ke liye sleek look aur vacuum insulation dono.",
    images: ["https://n2.sdlcdn.com/imgs/b/v/l/Milton-Silver-Thermosteel-Bottle-1000-SDL259589446-1-d9d09.jpg"],
    grade: "18/8 Stainless Steel | Vacuum Insulated",
    features: ["Vacuum insulated stainless steel", "Hot and cold beverage retention", "Leak-resistant secure lid", "Rust-resistant body", "Travel-friendly design"],
    featuresHinglish: ["Vacuum insulation — temperature long time maintain", "Garam/thanda dono ke liye", "Secure leak-resistant lid", "Rust resistant body", "Travel aur office friendly"],
    variants: [{ size: "1000ml", mrp: 790, salePrice: sale40(790) }],
    badge: "40% OFF",
    badgeColor: "bg-red-500",
  },
];

// Keep the existing PNB cookware catalog untouched; append only general essentials.
for (const product of GENERAL_PRODUCTS) {
  if (!PRODUCTS.some((existing) => existing.id === product.id)) PRODUCTS.push(product);
}

// Product-card image controls live inside the outer React Router <Link>.
// Prevent the browser's default navigation while allowing the button's own React
// click handler to update the gallery index normally.
if (typeof document !== "undefined") {
  document.addEventListener("click", (event) => {
    const target = event.target as HTMLElement | null;
    const control = target?.closest<HTMLButtonElement>(
      'button[aria-label="Previous image"], button[aria-label="Next image"], button[aria-label^="Go to image "]'
    );
    if (control) event.preventDefault();
  }, true);
}

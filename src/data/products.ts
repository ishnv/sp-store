export type ProductVariant = {
  size: string;
  capacity?: string;
  mrp: number;
  salePrice: number;
};

export type Product = {
  id: string;
  name: string;
  nameHinglish: string;
  category: string;
  description: string;
  descriptionHinglish: string;
  images: string[];
  grade: string;
  features: string[];
  featuresHinglish: string[];
  variants: ProductVariant[];
  badge?: string;
  badgeColor?: string;
};

export const CATEGORIES = [
  "All",
  "Kadai",
  "Pressure Cooker",
  "Frypan",
  "Tawa",
  "Saucepan",
  "Handi",
  "Casserole",
  "Dinner Set",
  "Bottle",
  "Kitchen Set",
] as const;

export const PRODUCTS: Product[] = [
  {
    id: "triply-kadai",
    name: "Triply Stainless Steel Kadai with Lid",
    nameHinglish: "Triply Kadai — Steel Lid Ke Saath",
    category: "Kadai",
    description: "Premium triply stainless steel kadai with steel lid. Suitable for Indian cooking, sauces, stews, and soups. Induction and electric friendly with even heat distribution.",
    descriptionHinglish: "Asli triply stainless steel kadai — Indian cooking, sabzi, dal, curry sab ke liye perfect. Steel lid ke saath, induction aur gas dono pe chalega.",
    images: ["/images/pnb-triply-kadai-lid.png", "/images/pnb-triply-kadai-stove.png", "/images/pnb-triply-kadai-features.png"],
    grade: "SS 304 Triply Base (SS-AL-SS)",
    features: ["3-layer triply construction (Steel-Aluminium-Steel)", "Even heat distribution — no hot spots", "Toxin-free food grade surface", "Induction + Gas + Electric compatible", "Steel lid with cool-touch handle", "Riveted side handles for durability"],
    featuresHinglish: ["3-layer triply technology — andar se bahar tak premium", "Even heat distribution — kahi se bhi jalega nahi", "Toxin-free surface — family ke liye safe", "Induction, gas, electric — sab pe kaam karega", "Steel lid — steam lock karke nutrients bachata hai", "Riveted handles — mazboot, tootega nahi"],
    variants: [
      { size: "20cm", capacity: "1.5 Liter", mrp: 3130, salePrice: 1565 },
      { size: "22cm", capacity: "2 Liter", mrp: 3345, salePrice: 1673 },
      { size: "24cm", capacity: "2.7 Liter", mrp: 4130, salePrice: 2065 },
      { size: "26cm", capacity: "3.75 Liter", mrp: 4950, salePrice: 2475 },
      { size: "28cm", capacity: "4.5 Liter", mrp: 5625, salePrice: 2813 },
    ],
    badge: "FLAT 50% OFF",
    badgeColor: "bg-red-500",
  },
  {
    id: "triply-cooker",
    name: "Triply Stainless Steel Pressure Cooker (Inner Lid)",
    nameHinglish: "Triply Pressure Cooker — Inner Lid",
    category: "Pressure Cooker",
    description: "ISI certified triply stainless steel pressure cooker with inner lid. 5-year warranty, food grade SS 304, thick bottom base for fast and even cooking.",
    descriptionHinglish: "ISI certified triply pressure cooker — 5 saal ki warranty! Dal, chawal, rajma sab jaldi banega. Inner lid design se safety aur speed dono best hai.",
    images: ["/images/pnb-triply-cooker.png", "/images/pnb-triply-cooker-clean.png"],
    grade: "SS 304 Triply Base | ISI Certified",
    features: ["ISI certified with dual safety valve", "5-year manufacturer warranty", "Triply base for fast, even cooking", "100% food grade toxin-free surface", "Inner lid design for better pressure", "Induction + Gas compatible"],
    featuresHinglish: ["ISI certified — safety first, tension nahi", "5 saal ki warranty — long-term soch ke saath", "Triply base — jaldi garam, evenly pakata hai", "Food grade surface — bachon ke liye bhi safe", "Inner lid — pressure better lock hota hai", "Induction + gas — kisi bhi stove pe chalega"],
    variants: [
      { size: "2 Liter", mrp: 2648, salePrice: 1324 },
      { size: "3 Liter", mrp: 3095, salePrice: 1547 },
      { size: "3.5 Liter", mrp: 3705, salePrice: 1853 },
      { size: "5 Liter", mrp: 4635, salePrice: 2317 },
    ],
    badge: "BESTSELLER",
    badgeColor: "bg-amber-500",
  },
  {
    id: "triply-frypan",
    name: "Triply Stainless Steel Frypan with Honeycomb Coating",
    nameHinglish: "Triply Frypan — Honeycomb Non-Stick",
    category: "Frypan",
    description: "Triply stainless steel frypan with honeycomb textured surface. Scratch-resistant, induction friendly, and perfect for everyday frying with less oil.",
    descriptionHinglish: "Triply frypan — omelette se leke pakode tak sab fry kar sakte ho. Honeycomb texture se food chipakta nahi, scratch resistant bhi hai.",
    images: ["/images/pnb-triply-frypan.png"],
    grade: "SS 304 Triply with Honeycomb Texture",
    features: ["Honeycomb textured cooking surface", "Scratch resistant & metal spoon safe", "Cool-touch ergonomic handle", "Induction + Gas + Electric compatible", "Even heat distribution", "Easy to clean"],
    featuresHinglish: ["Honeycomb texture — food chipakta nahi easily", "Scratch resistant — metal spoon se bhi safe", "Cool-touch handle — haath jalega nahi", "Induction + gas + electric — sab pe chalega", "Even heat — pura frypan ek jaisa garam", "Easy clean — jaldi dhul jaata hai"],
    variants: [
      { size: "20cm", mrp: 1490, salePrice: 745 },
      { size: "22cm", mrp: 2080, salePrice: 1040 },
      { size: "24cm", mrp: 2600, salePrice: 1300 },
      { size: "26cm", mrp: 3225, salePrice: 1613 },
    ],
    badge: "NEW ARRIVAL",
    badgeColor: "bg-emerald-500",
  },
  {
    id: "triply-tawa",
    name: "Honeycomb Non-Stick Triply Dosa Tawa",
    nameHinglish: "Triply Dosa Tawa — Crispy Dosa Guarantee",
    category: "Tawa",
    description: "Extra-large triply dosa tawa with honeycomb non-stick coating. Perfect for crispy dosas, rotis, and parathas with even heat distribution.",
    descriptionHinglish: "Crispy dosa, soft roti, fluffy paratha — sab banega is tawa pe. Honeycomb coating se oil kam lagta hai, health bhi aur taste bhi.",
    images: ["/images/pnb-triply-tawa.png"],
    grade: "SS 304 Triply | Honeycomb Coated",
    features: ["Extra-large surface for big dosas", "Honeycomb non-stick coating", "Scratch resistant surface", "Induction + Gas compatible", "Even heat — no cold spots", "Sturdy riveted handle"],
    featuresHinglish: ["Bada surface — family size dosa bhi banega", "Honeycomb coating — non-stick, oil kam lagega", "Scratch resistant — chammach se bhi safe", "Induction + gas — dono pe chalega", "Even heat — kahi se bhi kacha nahi rahega", "Mazboot handle — pakad mein comfortable"],
    variants: [
      { size: "26cm", mrp: 2200, salePrice: 1100 },
      { size: "28cm", mrp: 2622, salePrice: 1311 },
      { size: "30cm", mrp: 2990, salePrice: 1495 },
    ],
    badge: "FAMILY FAVOURITE",
    badgeColor: "bg-violet-500",
  },
  {
    id: "triply-saucepan",
    name: "Triply Stainless Steel Saucepan with Glass Lid",
    nameHinglish: "Triply Saucepan — Chai, Soup, Sauce Sab Ke Liye",
    category: "Saucepan",
    description: "Compact triply stainless steel saucepan with glass lid and pour spout. Ideal for tea, soups, sauces, and boiling milk. Glass lid lets you monitor cooking without lifting.",
    descriptionHinglish: "Chai boil karni ho, soup garam karna ho, ya sauce banana ho — ye saucepan sab handle kar leta hai. Glass lid se bina khole dekh sakte ho.",
    images: ["/images/pnb-triply-saucepan.png", "/images/pnb-triply-saucepan-stove.png"],
    grade: "SS 304 Triply Base",
    features: ["Convenient pour spout design", "Glass lid with steam vent", "Triply base for quick heating", "Induction + Gas compatible", "Easy-grip handle", "Toxin-free food grade"],
    featuresHinglish: ["Pour spout — chai girane ka tension khatam", "Glass lid — bina khole cooking monitor karo", "Triply base — jaldi garam hota hai", "Induction + gas — flexibility poori", "Comfortable grip — haath nahi thakega", "Food grade — doodh, chai sab safe"],
    variants: [
      { size: "14cm", capacity: "1 Liter", mrp: 1300, salePrice: 650 },
      { size: "16cm", capacity: "1.5 Liter", mrp: 1700, salePrice: 850 },
      { size: "18cm", capacity: "2 Liter", mrp: 2100, salePrice: 1050 },
    ],
    badge: "DAILY USE",
    badgeColor: "bg-sky-500",
  },
  {
    id: "triply-handi",
    name: "Triply Stainless Steel Cook & Serve Handi with Glass Lid",
    nameHinglish: "Triply Handi — Cook & Serve Dono",
    category: "Handi",
    description: "Elegant triply stainless steel handi with glass lid that goes straight from stove to table. Perfect for biryani, pulao, and curries with a beautiful serving look.",
    descriptionHinglish: "Cook karo, table pe serve karo — same handi mein. Biryani, pulao, curry — sab ko restaurant wala look milega ghar pe. Glass lid se bhi dekh sakte ho.",
    images: ["/images/pnb-triply-handi.png", "/images/pnb-triply-handi-biryani.png"],
    grade: "SS 304 Triply | Mirror Finish",
    features: ["Cook & serve design — stove to table", "Mirror finish for elegant serving", "Triply base for even cooking", "Glass lid included", "Induction + Gas compatible", "Durable riveted handles"],
    featuresHinglish: ["Cook & serve — ek bartan mein kaam khatam", "Mirror finish — table pe rakhne layak look", "Triply base — biryani evenly pakegi", "Glass lid — steam lock, flavour bacha rahega", "Induction + gas — kisi bhi kitchen mein chalega", "Riveted handles — bhar ke uthane mein safe"],
    variants: [
      { size: "14.5cm", capacity: "1.5 Liter", mrp: 2100, salePrice: 1050 },
      { size: "16.5cm", capacity: "2 Liter", mrp: 2400, salePrice: 1200 },
      { size: "18.5cm", capacity: "2.5 Liter", mrp: 3200, salePrice: 1600 },
    ],
    badge: "PREMIUM",
    badgeColor: "bg-rose-500",
  },
  {
    id: "cosmos-casserole",
    name: "Cosmos Stainless Steel Insulated Casserole / Hot Pot",
    nameHinglish: "Cosmos Casserole — Garam Khana 4-5 Ghante Tak",
    category: "Casserole",
    description: "Double-wall insulated stainless steel casserole with BPA-free plastic lid. Keeps food hot for 4-5 hours. Perfect for chapati, rice, and curries. Leak-proof and rust-proof.",
    descriptionHinglish: "Double wall insulation — roti, dal, chawal 4-5 ghante tak garam rahega. BPA-free lid, leak proof, rust proof. Shaadi ya picnic ke liye best.",
    images: ["/images/pnb-casserole.png", "/images/pnb-casserole-open.png"],
    grade: "SS 304 | Double Wall Insulated",
    features: ["Double wall polyurethane foam insulation", "BPA-free food grade plastic lid", "Keeps food hot for 4-5 hours", "Leak-proof and rust-proof", "Easy carry handle", "Available in multiple sizes"],
    featuresHinglish: ["Double wall insulation — 4-5 ghante garam rakhta hai", "BPA-free lid — health ke liye safe", "Leak proof — travel mein bhi safe", "Rust proof — saalon tak chalega", "Carry handle — uthane mein aasan", "Multiple sizes — family size ke hisaab se lo"],
    variants: [
      { size: "900ml", mrp: 780, salePrice: 390 },
      { size: "1500ml", mrp: 980, salePrice: 490 },
      { size: "2500ml", mrp: 1250, salePrice: 625 },
      { size: "3500ml", mrp: 1550, salePrice: 775 },
    ],
    badge: "HOT PICK",
    badgeColor: "bg-orange-500",
  },
  {
    id: "dinner-set-elegant",
    name: "Stainless Steel Dinner Set — Elegant 51 Pieces",
    nameHinglish: "Dinner Set — 51 Pieces, Poori Family Ke Liye",
    category: "Dinner Set",
    description: "Complete 51-piece stainless steel dinner set including plates, bowls, glasses, spoons, and serving dishes. Mirror finish, food grade SS 304. Perfect for daily use or gifting.",
    descriptionHinglish: "51 pieces ka complete dinner set — plates, bowls, glasses, spoons, serving dishes sab included. Mirror finish, food grade steel. Ghar ke liye ya gift ke liye perfect.",
    images: ["/images/pnb-dinner-set-elegant.png", "/images/pnb-dinner-set-unique.png"],
    grade: "SS 304 | Mirror Finish",
    features: ["51 pieces complete family dinner set", "Mirror polished finish", "Food grade SS 304 stainless steel", "Includes plates, bowls, glasses, spoons", "Dishwasher safe", "Gift-worthy packaging"],
    featuresHinglish: ["51 pieces — poori family ka dinner handle karega", "Mirror finish — table pe royal look", "Food grade steel — bachon ke liye bhi safe", "Sab kuch included — alag se kuch nahi lena", "Dishwasher safe — safai mein aasan", "Gift packing — shaadi ya grah pravesh ke liye best"],
    variants: [
      { size: "51 Pcs", mrp: 12705, salePrice: 6353 },
      { size: "57 Pcs", mrp: 14200, salePrice: 7100 },
    ],
    badge: "POPULAR",
    badgeColor: "bg-pink-500",
  },
  {
    id: "cola-bottle",
    name: "Vacuum Insulated Stainless Steel Cola Bottle",
    nameHinglish: "Cola Bottle — Garmi Mein Thanda, Sardi Mein Garam",
    category: "Bottle",
    description: "Double wall vacuum insulated stainless steel cola bottle. Keeps beverages hot for 12 hours and cold for 24 hours. BPA-free, rust-resistant, and leak-proof. Perfect for office, gym, and travel.",
    descriptionHinglish: "Vacuum insulated bottle — chai 12 ghante garam, paani 24 ghante thanda. Office, gym, travel sab ke liye perfect. BPA-free, leak proof, rust resistant.",
    images: ["/images/pnb-cola-bottle.png", "/images/pnb-cola-bottle-box.png"],
    grade: "SS 304 | Double Wall Vacuum",
    features: ["Double wall vacuum insulation", "Hot for 12 hours, cold for 24 hours", "BPA-free and toxin-free", "Rust-resistant stainless steel", "Leak-proof screw cap", "Sleek cola bottle design"],
    featuresHinglish: ["Vacuum insulation — 12 ghante garam, 24 ghante thanda", "BPA-free — health ke liye safe", "Rust resistant — naya jaisa rahega", "Leak proof — bag mein bhi safe", "Sleek design — office mein style milega", "SS 304 — food grade quality"],
    variants: [
      { size: "750ml", mrp: 850, salePrice: 425 },
      { size: "1000ml", mrp: 1050, salePrice: 525 },
      { size: "1500ml", mrp: 1350, salePrice: 675 },
    ],
    badge: "USEFUL",
    badgeColor: "bg-teal-500",
  },
  {
    id: "kitchen-set",
    name: "Complete Stainless Steel Kitchen Set — 101 Pieces",
    nameHinglish: "Kitchen Set — 101 Pieces, Naye Ghar Ke Liye Perfect",
    category: "Kitchen Set",
    description: "Complete 101-piece stainless steel kitchen set with cookware, storage containers, utensils, and tools. Everything you need to start a new kitchen. Food grade SS 304, durable and long-lasting.",
    descriptionHinglish: "101 pieces ka complete kitchen set — bartan, dibbe, chammach, tools sab included. Naya ghar ya shaadi ke liye ekdum perfect. SS 304 steel, saalon tak chalega.",
    images: ["/images/pnb-kitchen-set-101.png", "/images/pnb-kitchen-set-121.png"],
    grade: "SS 304 | Complete Kitchen Solution",
    features: ["101 pieces complete kitchen solution", "Includes cookware, storage, utensils, tools", "Food grade SS 304 stainless steel", "Mirror and matte finish combination", "Durable and long-lasting", "Perfect for new home or wedding gift"],
    featuresHinglish: ["101 pieces — kitchen mein kuch bhi nahi chhuta", "Cookware + storage + tools — sab included", "Food grade steel — cooking safe", "Mirror + matte finish — stylish look", "Long lasting — ek baar lo, saalon chalo", "Wedding gift — shaadi ke liye best present"],
    variants: [
      { size: "101 Pcs", mrp: 19595, salePrice: 9798 },
      { size: "121 Pcs", mrp: 22800, salePrice: 11400 },
    ],
    badge: "WEDDING SPECIAL",
    badgeColor: "bg-indigo-500",
  },
];

export const STORE = {
  name: "SP Bartan Store",
  nameHinglish: "SP Bartan Store — Quality Cookware & Essentials",
  since: "2011",
  phone: "+91 93198 18118",
  whatsapp: "919319818118",
  address: "Sumit Purvanchal Bartan Store, Mahavir Enclave, New Delhi",
  justdial: "https://jsdl.in/DT-23YNVCWI",
  maps: "https://maps.app.goo.gl/aasUG6sDacDT1T7EA",
  hours: [{ day: "Open all days", time: "9:30 AM – 10:00 PM" }],
} as const;

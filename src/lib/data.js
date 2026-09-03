export const brand = {
  /** The mark on the artwork, and what the site calls itself throughout. */
  name: "PICKLEBALL",
  /**
   * The company behind it. Kept apart from `name` because the two are not
   * interchangeable: the storefront is branded PICKLEBALL, but an invoice, a
   * privacy notice and a terms page have to name the registered entity.
   */
  legalName: "Nishiland Sports Pvt. Ltd.",
  tagline: "Manufacturer of premium pickleballs, Mumbai.",

  /**
   * The one-line answer to "who are you?". `identity` is the line actually in
   * use — the alternates sit beside it so re-positioning the brand is an edit
   * here rather than a hunt through the components.
   */
  identity: "Manufacturer of premium pickleballs.",
  identityAlternates: [
    "Crafting world-class pickleballs for global players.",
    "Quality made in India, trusted on courts in the USA, Dubai and Belgium.",
    "Innovating the future of pickleball equipment.",
  ],

  /**
   * Short slogans keyed by the register each one strikes. A component pulls the
   * key that fits its slot instead of hard-coding a string, so the whole site
   * can be re-voiced from this one object.
   */
  taglines: {
    performance: "Built for precision. Born for victory.",
    origin: "Designed in India. Played in the USA and beyond.",
    passion: "Where skill meets fun.",
    manufacturing: "Crafted. Engineered. Perfected.",
    short: "Dink. Spin. Win.",
    premium: "Performance you can feel.",
    // both off the brochure, word for word
    promise: "Play better. Play stronger.",
    trust: "Quality you can trust, performance you can count on.",
    reach: "From India to the world of pickleball.",
  },

  /** Courts we export to. Quoted in the identity line and on the about page. */
  exportMarkets: ["USA", "Dubai", "Belgium"],
};

export const navLinks = [
  { label: "Shop all", href: "/shop" },
  { label: "Pickleballs", href: "/shop?category=Balls" },
  {
    label: "About",
    href: "/about",
  },
  { label: "Testing", href: "/certification" },
  { label: "Contact", href: "/contact" },
];

/**
 * The scrolling marquee. Slogans are interleaved with the promises rather than
 * grouped, so a reader catching two or three items in passing gets one of each
 * instead of a run of pure sloganeering.
 */
export const announcements = [
  "Dink. Spin. Win.",
  "Free shipping over ₹2,499",
  "Designed in India · played in the USA, Dubai & Belgium",
  "AIPA tournament approved",
  "Crafted. Engineered. Perfected.",
  "30-day play test — love it or return it",
  "Season 04 drop is live",
  "Weight-matched, tournament ready",
];

/**
 * The shop's category chips. Balls is the only category the store carries, but
 * "All" stays so the chip row still reads as a filter and `?category=Balls`
 * — the link every CTA on the site points at — remains a value the shop route
 * will accept rather than silently dropping.
 */
export const productFilters = ["All", "Balls"];

const GRIP_SIZES = ["4in", "4 1/8in", "4 1/4in"];

const catalogue = [
  {
    id: "trueflight-outdoor",
    name: "TrueFlight Outdoor 40",
    blurb: "12-ball tube · seamless rotational mold",
    description:
      "A premium-quality 40-hole rotomolded pickleball, produced using high-quality imported raw materials, ensuring exceptional durability, consistent flight, and outstanding playing performance comparable to leading international brands such as Franklin. Molded in one piece, so there is no seam to split.",
    category: "Balls",
    skill: "All levels",
    price: 2199,
    rating: 4.8,
    reviews: 2109,
    badge: "Tournament",
    sku: "PH-TFO-12",
    stock: 240,
    swatches: ["#d4ff3f", "#ff5c2b"],
    colorways: [
      { name: "Optic", hex: "#d4ff3f" },
      { name: "Clay", hex: "#ff5c2b" },
    ],
    optionLabel: "Pack size",
    options: ["3 balls", "12 balls", "36 balls"],
    highlights: [
      "Rotomolded in one piece — no seam to split",
      "Pressed from high-quality imported raw material",
      "40 holes, outdoor tournament spec",
      "Stays round through a full league season",
    ],
    specs: [
      { label: "Type", value: "Outdoor" },
      { label: "Construction", value: "One-piece rotomolded" },
      { label: "Material", value: "Imported raw material" },
      { label: "Holes", value: "40" },
      { label: "Diameter", value: "74mm" },
      { label: "Weight", value: "26.5 g" },
      { label: "Certification", value: "AIPA approved" },
    ],
    art: { kind: "ball", color: "#d4ff3f" },
  },
  {
    id: "trueflight-indoor",
    name: "TrueFlight Indoor 26",
    blurb: "6-ball sleeve · softer indoor compound",
    description:
      "The same imported raw material and one-piece rotomold as the outdoor ball, run in a softer compound with larger holes for gym floors. Quieter off the face and easier to control on a slick surface.",
    category: "Balls",
    skill: "All levels",
    price: 1499,
    rating: 4.6,
    reviews: 806,
    sku: "PH-TFI-06",
    stock: 180,
    swatches: ["#d4ff3f", "#f5f3ed"],
    colorways: [
      { name: "Optic", hex: "#d4ff3f" },
      { name: "Bone", hex: "#f5f3ed" },
    ],
    optionLabel: "Pack size",
    options: ["6 balls", "24 balls"],
    highlights: [
      "26-hole indoor pattern",
      "Rotomolded from the same imported raw material",
      "Softer compound for gym floors",
      "Noticeably quieter on impact",
    ],
    specs: [
      { label: "Type", value: "Indoor" },
      { label: "Construction", value: "One-piece rotomolded" },
      { label: "Material", value: "Imported raw material" },
      { label: "Holes", value: "26" },
      { label: "Diameter", value: "74mm" },
      { label: "Weight", value: "24.0 g" },
      { label: "Certification", value: "AIPA approved" },
    ],
    art: { kind: "ball", color: "#eaff9c" },
  },

  {
    id: "head-pro-40-outdoor",
    name: "HEAD Pro 40 Outdoor",
    blurb: "3-ball sleeve · 40-hole tournament spec",
    description:
      "HEAD's tournament outdoor ball in the standard three-ball sleeve. A hard shell that keeps its shape through a long third-shot rally and a flight that does not wobble in a crosswind.",
    category: "Balls",
    brand: "HEAD",
    skill: "All levels",
    price: 899,
    rating: 4.7,
    reviews: 1432,
    sku: "HD-P40-03",
    stock: 260,
    swatches: ["#d4ff3f", "#1c3f8f"],
    colorways: [
      { name: "Optic", hex: "#d4ff3f" },
      { name: "Blue sleeve", hex: "#1c3f8f" },
    ],
    optionLabel: "Pack size",
    options: ["3 balls"],
    highlights: [
      "40-hole outdoor pattern",
      "Hard shell holds its round through a season",
      "Tournament weight, matched sleeve to sleeve",
    ],
    specs: [
      { label: "Brand", value: "HEAD" },
      { label: "Type", value: "Outdoor" },
      { label: "Holes", value: "40" },
      { label: "Diameter", value: "74mm" },
      { label: "Pack", value: "3 balls" },
    ],
    art: { kind: "ball", color: "#d4ff3f" },
    image: "/photos/ballproduct2.png",
  },
  {
    id: "head-pro-40-case",
    name: "HEAD Pro 40 Outdoor · 4 sleeve case",
    blurb: "12 balls · four sealed sleeves",
    description:
      "Four sleeves of the Pro 40 in one case — the way club nights actually buy them. Works out cheaper per ball than the single sleeve and keeps a spare tube in every bag.",
    category: "Balls",
    brand: "HEAD",
    skill: "All levels",
    price: 3199,
    compareAt: 3596,
    rating: 4.8,
    reviews: 611,
    badge: "Club pack",
    sku: "HD-P40-12",
    stock: 84,
    swatches: ["#d4ff3f", "#c0342b"],
    colorways: [
      { name: "Optic", hex: "#d4ff3f" },
      { name: "Red case", hex: "#c0342b" },
    ],
    optionLabel: "Pack size",
    options: ["12 balls"],
    highlights: [
      "Four sealed three-ball sleeves",
      "Cheaper per ball than a single sleeve",
      "Same tournament spec as the single tube",
    ],
    specs: [
      { label: "Brand", value: "HEAD" },
      { label: "Type", value: "Outdoor" },
      { label: "Holes", value: "40" },
      { label: "Diameter", value: "74mm" },
      { label: "Pack", value: "12 balls" },
    ],
    art: { kind: "ball", color: "#d4ff3f" },
    image: "/photos/ballproduct1.png",
  },
  {
    id: "sixx-club-40",
    name: "SIXX Club 40 Outdoor",
    blurb: "3-ball pack · the open-play workhorse",
    description:
      "The ball we put out for Saturday open play. Softer than a tournament ball, which means it survives a beginner's mishit off the edge guard instead of cracking.",
    category: "Balls",
    brand: "SIXX",
    skill: "Beginner",
    price: 749,
    rating: 4.5,
    reviews: 528,
    sku: "SX-CL40-03",
    stock: 190,
    swatches: ["#f2c200", "#14171d"],
    colorways: [
      { name: "Yellow", hex: "#f2c200" },
      { name: "Black pack", hex: "#14171d" },
    ],
    optionLabel: "Pack size",
    options: ["3 balls"],
    highlights: [
      "Softer shell that survives edge-guard hits",
      "40-hole outdoor pattern",
      "The cheapest ball we are willing to stock",
    ],
    specs: [
      { label: "Brand", value: "SIXX" },
      { label: "Type", value: "Outdoor" },
      { label: "Holes", value: "40" },
      { label: "Diameter", value: "74mm" },
      { label: "Pack", value: "3 balls" },
    ],
    art: { kind: "ball", color: "#f2c200" },
    image: "/photos/ballproduct3.png",
  },
  {
    id: "sixx-tour-40",
    name: "SIXX Tour 40 Premium",
    blurb: "3-ball pack · one-piece molded",
    description:
      "SIXX's premium one-piece ball. No seam means no split, and the tighter weight tolerance is what tournament directors are actually paying for.",
    category: "Balls",
    brand: "SIXX",
    skill: "Advanced",
    price: 1099,
    rating: 4.8,
    reviews: 397,
    badge: "Tournament",
    sku: "SX-TR40-03",
    stock: 132,
    swatches: ["#d4ff3f", "#14171d"],
    colorways: [
      { name: "Optic", hex: "#d4ff3f" },
      { name: "Black pack", hex: "#14171d" },
    ],
    optionLabel: "Pack size",
    options: ["3 balls"],
    highlights: [
      "One-piece mold, no seam to split",
      "Tight weight tolerance sleeve to sleeve",
      "Approved for tournament play",
    ],
    specs: [
      { label: "Brand", value: "SIXX" },
      { label: "Type", value: "Outdoor" },
      { label: "Holes", value: "40" },
      { label: "Diameter", value: "74mm" },
      { label: "Pack", value: "3 balls" },
    ],
    art: { kind: "ball", color: "#d4ff3f" },
    image: "/photos/ballproduct4.png",
  },
  {
    id: "sixx-bulk-20",
    name: "SIXX 20-Ball Bulk Box",
    blurb: "20 balls · coaching and ball-machine stock",
    description:
      "Twenty Tour 40s in a plain carton. This is what our coaching partners order when they are feeding drills four nights a week and losing balls over the fence.",
    category: "Balls",
    brand: "SIXX",
    skill: "All levels",
    price: 5999,
    compareAt: 7326,
    rating: 4.9,
    reviews: 214,
    badge: "Best value",
    sku: "SX-BLK-20",
    stock: 47,
    swatches: ["#f5f3ed", "#14171d"],
    colorways: [{ name: "Bulk carton", hex: "#f5f3ed" }],
    optionLabel: "Pack size",
    options: ["20 balls"],
    highlights: [
      "Twenty Tour 40 balls in one carton",
      "Roughly a third off the sleeve price per ball",
      "Sized for a ball machine hopper",
    ],
    specs: [
      { label: "Brand", value: "SIXX" },
      { label: "Type", value: "Outdoor" },
      { label: "Holes", value: "40" },
      { label: "Diameter", value: "74mm" },
      { label: "Pack", value: "20 balls" },
    ],
    art: { kind: "ball", color: "#d4ff3f" },
    image: "/photos/ballproduct5.png",
  },
];

/**
 * Photography is resolved once, here, rather than at every call site.
 *
 * The convention is `/photos/products/<id>.png`, so an entry only spells out
 * `image` when the file breaks it (a `.webp` supplier shot) and only spells out
 * `gallery` when we hold more than one angle of that SKU.
 */
export const products = catalogue.map((product) => {
  const image = product.image ?? `/photos/products/${product.id}.png`;
  return { ...product, image, gallery: product.gallery ?? [image] };
});

/* ------------------------------------------------------------------ lookups */

export function findProduct(id) {
  return products.find((product) => product.id === id) ?? null;
}

export function relatedProducts(product, limit = 4) {
  if (!product) return [];
  const sameCategory = products.filter(
    (item) => item.category === product.category && item.id !== product.id,
  );
  const rest = products.filter(
    (item) => item.category !== product.category && item.id !== product.id,
  );
  return [...sameCategory, ...rest].slice(0, limit);
}

/* ------------------------------------------------------------ shop filters */

export const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced"];

export const PRICE_BANDS = [
  { id: "under-2000", label: "Under ₹2,000", min: 0, max: 2000 },
  { id: "2000-6000", label: "₹2,000 – ₹6,000", min: 2000, max: 6000 },
  { id: "6000-15000", label: "₹6,000 – ₹15,000", min: 6000, max: 15000 },
  { id: "over-15000", label: "₹15,000+", min: 15000, max: Infinity },
];

export const SORT_OPTIONS = [
  { id: "featured", label: "Featured" },
  { id: "price-asc", label: "Price: low to high" },
  { id: "price-desc", label: "Price: high to low" },
  { id: "rating", label: "Top rated" },
  { id: "reviews", label: "Most reviewed" },
];

/* -------------------------------------------------------------- page content */

/**
 * The manufacturing story for the rotomolded ball line, rendered by
 * <BallCraft /> on the home page. It replaced `paddleSpecs` and
 * `paddleLayers`, which described the pressed-paddle build — dropped with the
 * paddle line itself, along with the finder that recommended one.
 */
export const ballCraft = {
  eyebrow: "How they are made",
  /* The body is the client's supplied copy, kept word for word. The headline
     is not: it used to be "Premium-quality 40-hole rotomolded pickleballs",
     which is a spec line rather than a heading, and it now sits beside the
     client's own 48-hole product photograph — so it named a hole count the
     picture under it contradicts. The hole patterns belong in the build list
     and the spec table below, where they are stated per ball. */
  title: "Rotomolded in one piece, from imported resin.",
  titleAccent: "one piece",
  body: "Our pickleballs are produced using high-quality imported raw materials, ensuring exceptional durability, consistent flight, and outstanding playing performance comparable to leading international brands such as Franklin.",
  points: [
    {
      index: "01",
      title: "Imported raw material",
      copy: "The resin is bought to the same specification the international brands work to, so the shell keeps its hardness through a season of coarse outdoor courts.",
    },
    {
      index: "02",
      title: "One-piece rotomold",
      copy: "Rotationally molded rather than pressed as two halves and bonded. No seam means nothing to split on a hard drive off the face.",
    },
    {
      index: "03",
      title: "40-hole tournament pattern",
      copy: "The regulation outdoor pattern, drilled to a tolerance tight enough that the flight holds its line in a crosswind instead of wobbling.",
    },
    {
      index: "04",
      title: "Weight-matched sleeves",
      copy: "Every ball is checked for weight and roundness before it is sleeved, so a tube plays the same from the first ball to the last.",
    },
  ],
  specs: [
    { value: "40", label: "Hole pattern" },
    { value: "74mm", label: "Diameter" },
    { value: "26.5g", label: "Tournament weight" },
    { value: "3", label: "Export markets" },
  ],
};

/**
 * The four claims off the brochure, in its order. The headings are the
 * client's own words; the sentence under each is the storefront's expansion of
 * it, so the claim and the evidence stay together on one card.
 */
export const features = [
  {
    icon: "shield",
    title: "Durable quality",
    copy: "One-piece rotomolded from imported resin, so there is no seam to split and the shell holds its hardness through a season of coarse courts.",
  },
  {
    icon: "bolt",
    title: "Professional finish",
    copy: "Weight and roundness are checked before a ball is sleeved, so a tube plays the same from the first ball to the last.",
  },
  {
    icon: "school",
    title: "Made for clubs, schools and sports centres",
    copy: "Built for the courts that run four sessions a week, not for a display shelf.",
  },
  {
    icon: "package",
    title: "Available for bulk orders",
    copy: "Case quantities and academy pricing for clubs, schools and event organisers. Tell us the volume and we will quote.",
  },
];

/**
 * "Perfect for" off the back of the brochure. Rendered as a single strip
 * rather than cards: it is a list of audiences, not a set of claims, and each
 * one is two words.
 */
export const perfectFor = {
  intro:
    "Quality pickleballs designed for regular practice, sports academies, clubs, schools and professional use.",
  audiences: [
    { icon: "home", label: "Indoor play" },
    { icon: "sun", label: "Outdoor play" },
    { icon: "school", label: "Schools and colleges" },
    { icon: "shield", label: "Clubs and academies" },
    { icon: "trophy", label: "Sports events" },
  ],
};

export const stats = [
  { value: "180+", label: "Sponsored players" },
  { value: "4.9", label: "Average rating" },
  { value: "62k", label: "Pickleballs shipped" },
  { value: "48h", label: "Door to door" },
];

export const testimonials = [
  {
    quote:
      "The TrueFlight holds its line in a crosswind better than the imports we were paying twice as much for.",
    name: "Ananya Rao",
    role: "4.5 · Indiranagar, Bengaluru",
    rating: 5,
  },
  {
    quote:
      "Ordered Thursday, ran a tournament on them Saturday. Not one ball cracked across two days of outdoor play.",
    name: "Rohan Menon",
    role: "Club coach · Whitefield, Bengaluru",
    rating: 5,
  },
  {
    quote:
      "I coach eleven beginners a week and every session runs on these. A tube plays the same from the first ball to the last.",
    name: "Priya Nadar",
    role: "Certified instructor · HSR Layout, Bengaluru",
    rating: 5,
  },
];

export const productReviews = [
  {
    name: "Ananya Rao",
    rating: 5,
    date: "3 weeks ago",
    title: "Exactly the ball I hoped for",
    body: "Took a tube straight into a 4.5 round robin at Koramangala. Consistent bounce all afternoon and the flight never wobbled. No notes.",
    verified: true,
  },
  {
    name: "Karthik Iyer",
    rating: 5,
    date: "1 month ago",
    title: "Bounce is dead consistent",
    body: "Two tubes in and they still bounce true. We rotate them through four courts a week and the shells have not gone soft.",
    verified: true,
  },
  {
    name: "Sneha Kulkarni",
    rating: 4,
    date: "2 months ago",
    title: "Great, order the case",
    body: "Fantastic ball. A single tube goes quickly across a club session, so order the case. Four stars only for that.",
    verified: true,
  },
];

export const ratingBreakdown = [
  { stars: 5, count: 981 },
  { stars: 4, count: 224 },
  { stars: 3, count: 52 },
  { stars: 2, count: 18 },
  { stars: 1, count: 9 },
];

export const mockOrders = [
  {
    id: "PH-48211",
    date: "12 July 2026",
    status: "Delivered",
    total: 221.4,
    items: [
      { productId: "trueflight-outdoor", quantity: 1 },
      { productId: "head-pro-40-case", quantity: 2 },
    ],
  },
  {
    id: "PH-47096",
    date: "28 May 2026",
    status: "Delivered",
    total: 148.0,
    items: [{ productId: "sixx-tour-40", quantity: 1 }],
  },
  {
    id: "PH-46550",
    date: "3 April 2026",
    status: "Refunded",
    total: 32.0,
    items: [{ productId: "trueflight-indoor", quantity: 1 }],
  },
];

/* ------------------------------------------------------------- brand strip */

export const partners = [
  { name: "AIPA", note: "Approved equipment" },
  { name: "BENGALURU OPEN", note: "Official ball" },
  { name: "INDIA TOUR", note: "Player partner" },
  { name: "KITCHEN CLUB", note: "Coaching network" },
  { name: "HSR COURTS", note: "Retail stockist" },
];

/* ------------------------------------------------------------------ bundle */

export const starterBundle = {
  title: "The Season Starter",
  titleAccent: "Starter",
  blurb:
    "Outdoor, indoor and a club case — the three tubes a season runs on, priced as one.",
  items: ["trueflight-outdoor", "trueflight-indoor", "head-pro-40-case"],
  // matches the SEASON04 code the cart honours, so the advertised bundle price
  // is the price you actually reach at checkout
  discountRate: 0.1,
  code: "SEASON04",
};

/* --------------------------------------------------------------------- FAQ */

export const faqs = [
  {
    question: "Which ball do I need, indoor or outdoor?",
    answer:
      "Outdoor balls are the 40-hole pattern in a harder shell, built for coarse courts and wind. Indoor balls run 26 larger holes in a softer compound, so they stay controllable on a gym floor. If you play both, the Season Starter bundle covers you — for less than two tubes bought apart. Every order includes the same 30-day play test either way.",
  },
  {
    question: "Are your balls tournament legal?",
    answer:
      "Every ball we sell is AIPA approved and checked against the current weight, diameter and bounce limits before it ships. The approval number is printed on the sleeve.",
  },
  {
    question: "What does the 30-day play test cover?",
    answer:
      "Play with it outdoors, indoors, in a tournament — we do not care. If it does not suit your game within 30 days, we email you a prepaid label and refund the full amount. Normal scuffing from real play does not void it.",
  },
  {
    question: "How fast is delivery?",
    answer:
      "Free shipping on orders over ₹2,499, dispatched from Indiranagar or Delhi NCR depending on which is closer to you. Orders placed before 2pm IST go out the same day.",
  },
  {
    question: "How many balls should I order?",
    answer:
      "A tube of 12 covers a social session. A club running four courts a week gets through a case, which is why the case is priced below four tubes. Buy the case if you are stocking a court — a tube if you are stocking a bag.",
  },
  {
    question: "Do you replace a cracked ball?",
    answer:
      "A ball that splits or goes soft inside its first month of normal play is replaced free. Send a photo through the contact form and we ship the replacement without asking for the old one back first.",
  },
];

/* ------------------------------------------------------------------ photos */

/**
 * Editorial photographic slots — the shots that are not tied to a single SKU.
 *
 * All of these are served from /public/photos/, so nothing here depends on a
 * remote host being reachable at build time. Swap in a real shoot by dropping
 * the file in that folder and changing the `src` only.
 */
export const photos = {
  courtStill: {
    src: "/photos/pickleball-balls.png",
    alt: "A sleeve of 40-hole outdoor pickleballs on court",
  },
};

/* --------------------------------------------------------------- about page */

export const contact = {
  addressLines: ["Worli, Mumbai – 400013"],
  /**
   * Two numbers are published on the brochure. `phone` is the one every
   * tel: link and every "call us" line uses; `phoneAlt` is offered beside it
   * rather than replacing it, so neither is buried.
   */
  phone: "+91 99209 08076",
  phoneAlt: "+91 75260 02730",
  /** The WhatsApp line behind the brochure's QR code. */
  whatsapp: "+91 99209 08076",
  email: "nishilandsports@gmail.com",
  hours: "Monday – Saturday, 10.00 am – 6.00 pm",
  // used for the "Get directions" link on /contact
  mapQuery: "Worli, Mumbai 400013, Maharashtra, India",
};

export const aboutIntro = {
  eyebrow: "Our story",
  title: "Started on a repainted badminton court in Koramangala.",
  titleAccent: "badminton court",
  body: [
    "In 2023 there were four pickleball courts in Bengaluru and none of them had a ball you could buy locally. Everything came through a suitcase from the US, at twice the price and six weeks late, and half of it cracked inside a month.",
    "So we started molding our own. The first runs came out of a Peenya workshop, tested every Saturday morning by whoever turned up at the court, and reworked four times before we were willing to sell a tube.",
    "We still test that way. Every ball in this catalogue has been through a season of Bengaluru humidity, coarse outdoor courts and players who are on them four times a week.",
    "Three years on we rotomold the whole ball line under one roof, from imported raw material, and the same runs go out to courts in the USA, Dubai and Belgium. Designed in India, played well beyond it.",
  ],
};

export const milestones = [
  { year: "2023", title: "First run", copy: "A few hundred balls out of a Peenya workshop, sold to the Koramangala regulars." },
  { year: "2024", title: "AIPA approval", copy: "The 40-hole outdoor ball clears the weight, diameter and bounce tests." },
  { year: "2025", title: "Indiranagar store", copy: "A fitting room with a demo wall, so you can hit before you buy." },
  { year: "2026", title: "Season 04", copy: "Sixteen products, shipped nationwide in under 48 hours." },
];

export const values = [
  {
    title: "Built for this climate",
    copy: "A resin blend chosen for 90% monsoon humidity and coarse courts, not a dry Arizona surface.",
  },
  {
    title: "Priced without the import tax",
    copy: "Made here, so you are not paying freight and customs on top of a tube of balls.",
  },
  {
    title: "Tested by people who lose",
    copy: "Our testers are 3.0 club players, not just sponsored pros. Forgiveness matters more than headline power.",
  },
  {
    title: "Replace what fails early",
    copy: "A ball that splits or softens inside its first month is replaced free, no return shipping and no argument.",
  },
  {
    title: "Imported raw material",
    copy: "Carbon, polymer and ball resin are bought to international specification. Made in India is a manufacturing decision, not a compromise on what goes in.",
  },
  {
    title: "Held to an export standard",
    copy: "The same batches ship to courts in the USA, Dubai and Belgium, so every run is inspected against what those buyers will accept.",
  },
];

/* ------------------------------------------------------- lab certification */

/**
 * The AIPA equipment test report for order BST-251227-6ZV, rendered under
 * /certification as one route per page of the source document.
 *
 * This is a transcription, not a write-up. Every table, figure, compliance
 * range and Remarks line below is the laboratory's own — nothing is
 * summarised, re-explained or added to, because the whole value of these pages
 * is that they are the report rather than a description of it.
 *
 * Two omissions, both deliberate. The customer block on page 1 carries a
 * personal mobile number and private email address; those two lines are held
 * back rather than published to a public page. The two scanned signatures on
 * page 8 are left out for the same reason — a handwritten signature on a
 * public page is forgery material — and the signatories are named instead.
 */
export const certification = {
  documentTitle: "Test Report (Pickleball)",
  standard: "AIPA Equipment Standards and Testing Manual 2022",

  lab: {
    name: "Brainwave SportsTech",
    role: "All India Pickleball Association's Equipment Testing Laboratory",
    addressLines: [
      "Unit 403, 404 - Motibhai Smrutee Tower, Opposite Railway Station,",
      "Badlapur (W) - 421503, Maharashtra, INDIA",
    ],
    phone: "+91 74986499191",
    email: "admin@brainwavesportstech.com",
    website: "www.brainwavesportstech.com",
    href: "https://www.brainwavesportstech.com",
  },

  marks: [
    {
      id: "brainwave",
      src: "/certification/brainwave.png",
      alt: "Brainwave SportsTech seal",
    },
    {
      id: "aipa",
      src: "/certification/aipa.png",
      alt: "All India Pickleball Association seal — Sport for Life",
    },
  ],

  /** The accordion / route order — one entry per page of the document. */
  pages: [
    {
      id: "order",
      slug: "order-and-sample",
      page: "01",
      title: "Order and Sample Description",
      titleAccent: "Sample Description",
      navLabel: "Order and Sample",
      body: "order",
    },
    {
      id: "weight",
      slug: "weight-test",
      page: "02",
      title: "Pickleball Weight Test",
      titleAccent: "Weight Test",
      navLabel: "Weight Test",
      body: "test",
    },
    {
      id: "diameter",
      slug: "diameter-test",
      page: "03",
      title: "Pickleball Diameter Test",
      titleAccent: "Diameter Test",
      navLabel: "Diameter Test",
      body: "test",
    },
    {
      id: "bounce",
      slug: "bounce-test",
      page: "04",
      title: "Pickleball Bounce Test",
      titleAccent: "Bounce Test",
      navLabel: "Bounce Test",
      body: "test",
    },
    {
      id: "hardness",
      slug: "hardness-test",
      page: "05",
      title: "Pickleball Hardness Test",
      titleAccent: "Hardness Test",
      navLabel: "Hardness Test",
      body: "test",
    },
    {
      id: "compression",
      slug: "compression-test",
      page: "06",
      title: "Pickleball Compression Test",
      titleAccent: "Compression Test",
      navLabel: "Compression Test",
      body: "test",
    },
    {
      id: "conditioning",
      slug: "conditioning-and-instruments",
      page: "07",
      title: "Sample Conditioning and Instruments Used",
      titleAccent: "Instruments Used",
      navLabel: "Conditioning and Instruments",
      body: "conditioning",
    },
    {
      id: "certificate",
      slug: "certificate-of-recognition",
      page: "08",
      title: "Certificate of Recognition by AIPA",
      titleAccent: "Recognition by AIPA",
      navLabel: "Certificate of Recognition",
      body: "certificate",
    },
  ],

  /* ------------------------------------------------------------- page 1 */

  order: [
    { label: "Order ID", value: "BST-251227-6ZV" },
    { label: "Sample ID", value: "NSPB-1 to NSPB-6" },
    { label: "Manufacturer", value: "Nishiland Sports Private Limited" },
    { label: "Model Name / Model Number", value: "PICKLEBALL PRO" },
    { label: "Colour of the Pickleball", value: "Yellow" },
    { label: "Product Description", value: "TPE, Seamless, Outdoor Pickleball" },
    { label: "Number of Specimens Received", value: "6 (Six)" },
    { label: "Sample Received on", value: "December 30, 2025 at 6:25 PM" },
    { label: "Date of Payment of Testing Fee", value: "December 27, 2025 at 4:55 PM" },
    { label: "Sample Testing Completed on", value: "January 19, 2026 at 2:20 PM" },
    { label: "Report Generated on", value: "January 20, 2026 at 6:05 PM" },
    {
      label: "Customer Details",
      value: "Paresh Shah",
      // printed in full as the report prints it, at the client's instruction
      phone: "+91 9820001314",
      email: "nishilandsports@gmail.com",
    },
  ],

  disclaimer:
    "This equipment test report is based on the specific conditions, methodologies, and parameters outlined in the report. The results presented herein are valid only for the tested samples under the stated conditions and may vary under different conditions or in real-world applications. This report is confidential and intended solely for the recipient. Unauthorized reproduction, distribution, or use of this report is strictly prohibited.",

  /* --------------------------------------------------------- pages 2 to 6 */

  tests: [
    {
      id: "weight",
      number: "1)",
      name: "Pickleball Weight Test",
      columns: ["Sample Code", "Weight (g)", "Compliance Range", "Pass (Y / N)"],
      rows: [
        { code: "W1", value: "26.83 g" },
        { code: "W2", value: "26.82 g" },
        { code: "W3", value: "26.72 g" },
        { code: "W4", value: "26.71 g" },
        { code: "W5", value: "26.81 g" },
        { code: "W6", value: "26.80 g" },
        { code: "W7", value: "26.72 g" },
        { code: "W8", value: "26.72 g" },
        { code: "W9", value: "26.71 g" },
      ],
      average: { code: "Wavg", value: "26.76 g" },
      compliance: "22.10 g - 26.50 g",
      pass: "Conditionally Approved",
      passed: false,
      photoCaption: "Photographs - Pickleball Weight Test",
      photos: [
        { src: "/certification/weight-1.png", alt: "Pickleball Pro on the bench balance reading 26.83 g" },
        { src: "/certification/weight-2.png", alt: "Pickleball Pro on the bench balance reading 26.82 g" },
        { src: "/certification/weight-3.png", alt: "Pickleball Pro on the bench balance reading 26.72 g" },
        { src: "/certification/weight-4.png", alt: "Pickleball Pro on the bench balance reading 26.71 g" },
        { src: "/certification/weight-5.png", alt: "Pickleball Pro on the bench balance reading 26.81 g" },
        { src: "/certification/weight-6.png", alt: "Pickleball Pro on the bench balance reading 26.80 g" },
      ],
      remark:
        "Weight of “Pickleball Pro” pickleball exceeds compliance range, with all readings little above the upper limit. Average weight of “Pickleball Pro” was found to be 26.76 g. The readings are under 10 % deviation hence the ball is conditionally approved.",
    },
    {
      id: "diameter",
      number: "2)",
      name: "Pickleball Diameter Test",
      // The source table repeats its header in the data row; rendered as
      // gauge / result, which is what those two lines say.
      columns: ["Gauge", "Pass (Y / N)"],
      gauges: [
        { gauge: "Go 75.5 mm", result: "Pass" },
        { gauge: "No-Go 73 mm", result: "Pass" },
      ],
      pass: "Yes",
      passed: true,
      photoCaption: "Photographs - Pickleball Diameter Test",
      photos: [
        { src: "/certification/diameter-go.png", alt: "Pickleball Pro inside the GO GAUGE 75.50 MM" },
        { src: "/certification/diameter-nogo.png", alt: "Pickleball Pro against the NO GO GAUGE 73.00 MM" },
      ],
      remark:
        "All specimens of “Pickleball Pro” passed pickleball diameter test. All six pickleballs passed through GO 75.5 mm gauge but did not pass through NOGO 73 mm gauge in any orientation.",
    },
    {
      id: "bounce",
      number: "3)",
      name: "Pickleball Bounce Test",
      columns: ["Sample Code", "Bounce (cm)", "Compliance Range", "Pass (Y / N)"],
      rows: [
        { code: "B1", value: "80.4 cm" },
        { code: "B2", value: "82.5 cm" },
        { code: "B3", value: "80.0 cm" },
        { code: "B4", value: "77.4 cm" },
        { code: "B5", value: "79.1 cm" },
        { code: "B6", value: "78.7 cm" },
        { code: "B7", value: "76.5 cm" },
        { code: "B8", value: "75.3 cm" },
        { code: "B9", value: "81.2 cm" },
        { code: "B10", value: "81.7 cm" },
        { code: "B11", value: "78.2 cm" },
        { code: "B12", value: "77.8 cm" },
        { code: "B13", value: "78.2 cm" },
        { code: "B14", value: "83.1 cm" },
        { code: "B15", value: "80.6 cm" },
      ],
      average: { code: "Bavg", value: "79.38 cm" },
      compliance: "75 cm ≤ Bavg ≤ 85 cm",
      pass: "Yes",
      passed: true,
      photoCaption: "Photographs - Pickleball Bounce Test",
      photos: [
        { src: "/certification/bounce-1.png", alt: "Pickleball Pro photographed against the bounce scale" },
        { src: "/certification/bounce-2.png", alt: "Pickleball Pro photographed against the bounce scale" },
        { src: "/certification/bounce-3.png", alt: "Pickleball Pro photographed against the bounce scale" },
        { src: "/certification/bounce-4.png", alt: "Pickleball Pro photographed against the bounce scale" },
      ],
      remark:
        "All specimens of “Pickleball Pro” passed the pickleball bounce test. The first bounce of all the balls was within 75 cm to 85 cm. Average bounce was found to be 79.38 cm when dropped from 200 cm under free fall condition onto the 4” thick granite slab.",
    },
    {
      id: "hardness",
      number: "4)",
      name: "Pickleball Hardness Test",
      columns: ["Sample Code", "Reading", "Compliance Range", "Pass (Y / N)"],
      rows: [
        { code: "H1", value: "42.5" },
        { code: "H2", value: "45.5" },
        { code: "H3", value: "44.0" },
        { code: "H4", value: "45.0" },
        { code: "H5", value: "44.0" },
        { code: "H6", value: "43.0" },
        { code: "H7", value: "44.5" },
        { code: "H8", value: "44.5" },
        { code: "H9", value: "43.0" },
      ],
      average: { code: "Havg", value: "44.00" },
      compliance: "40 ≤ Havg ≤ 50",
      pass: "Yes",
      passed: true,
      photoCaption: "Photographs - Pickleball Hardness Test",
      photos: [
        { src: "/certification/hardness-1.png", alt: "Shore D durometer on the Pickleball Pro reading 42.5" },
        { src: "/certification/hardness-2.png", alt: "Shore D durometer on the Pickleball Pro reading 45.5" },
        { src: "/certification/hardness-3.png", alt: "Shore D durometer on the Pickleball Pro reading 44" },
        { src: "/certification/hardness-4.png", alt: "Shore D durometer on the Pickleball Pro reading 45" },
      ],
      remark:
        "Average hardness of “Pickleball Pro” pickleball was found to be 44.00 on Shore D scale which is well within the compliance range.",
    },
    {
      id: "compression",
      number: "5)",
      name: "Pickleball Compression Test",
      columns: ["Sample Code", "Reading (kgf)", "Compliance Range", "Pass (Y / N)"],
      rows: [
        { code: "C1", value: "10.449 kgf" },
        { code: "C2", value: "9.572 kgf" },
        { code: "C3", value: "11.142 kgf" },
        { code: "C4", value: "10.084 kgf" },
        { code: "C5", value: "11.376 kgf" },
        { code: "C6", value: "10.016 kgf" },
      ],
      average: { code: "Cavg", value: "10.440 kgf" },
      compliance: "Cavg ≤ 20 kgf",
      pass: "Yes",
      passed: true,
      photoCaption: "Photographs - Pickleball Compression Test",
      photos: [
        { src: "/certification/compression-1.png", alt: "Pickleball Pro under load in the compression tester" },
        { src: "/certification/compression-2.png", alt: "Pickleball Pro under load in the compression tester" },
      ],
      charts: [
        { src: "/certification/compression-graph-1.png", alt: "Load versus displacement plot for one specimen" },
        { src: "/certification/compression-graph-2.png", alt: "Load versus displacement plot for one specimen" },
        { src: "/certification/compression-graph-3.png", alt: "Load versus displacement plot for one specimen" },
        { src: "/certification/compression-graph-4.png", alt: "Load versus displacement plot for one specimen" },
      ],
      remark:
        "All the specimens of “Pickleball Pro” passed pickleball compression test and showed average compression force value of 10.440 kgf.",
    },
  ],

  /* ------------------------------------------------------------- page 7 */

  conditioning: {
    title: "Sample Conditioning Prior to Testing",
    columns: ["Parameter", "Actual Value", "Requirement Range"],
    rows: [
      { label: "Temperature", actual: "27 °C", required: "27 °C ± 5 °C" },
      { label: "Humidity", actual: "60.1 %", required: "60 % ± 10 %" },
      { label: "Conditioning Time", actual: "48 h", required: "48 h" },
    ],
    photos: [
      { src: "/certification/conditioning-chamber.png", alt: "Stability chamber controller reading 27.0 °C and 60.1 % humidity" },
      { src: "/certification/conditioning-rack.png", alt: "Pickleballs conditioning on the rack inside the stability chamber" },
    ],
  },

  instrumentColumns: ["Instrument Name", "Model", "Make", "Date of Calibration"],

  instruments: [
    { name: "Diameter Gauge", model: "Go NoGo Gauge", make: "BSpTech", calibrated: "25/01/2025" },
    { name: "Weighing Machine", model: "i-400c", make: "i-Scale", calibrated: "18/01/2025" },
    { name: "Hardness Tester", model: "Shore D", make: "Genex", calibrated: "22/01/2025" },
    { name: "Ball Compression Tester", model: "zeusUtimo", make: "PSTPL", calibrated: "19/01/2025" },
    { name: "Pickleball Drop Tower", model: "precision", make: "PrimeS", calibrated: "30/01/2025" },
    { name: "Digital Vernier Calliper", model: "-", make: "Vizbrite", calibrated: "25/01/2025" },
  ],

  footnotes: [
    "All testing done as per the AIPA Equipment Standards and Testing Manual 2022",
    "Only representative photographs are displayed in this report.",
  ],

  /* ------------------------------------------------------------- page 8 */

  authorisation: {
    title: "Certificate of Recognition by AIPA",
    lead: "This is to certify that,",
    /**
     * The certifying sentence, split where the document emphasises it: model,
     * manufacturer, model again, and the term of the authorisation. `body`
     * below is joined from these, so the plain and marked-up versions cannot
     * drift apart.
     */
    bodyParts: [
      { text: "Pickleball model " },
      { text: "Pickleball Pro", strong: true },
      { text: " submitted by " },
      { text: "Nishiland Sports Private Limited", strong: true },
      {
        text: " passed all the tests as per the AIPA Equipment Standards and Testing Manual 2022 and that ",
      },
      { text: "Pickleball Pro", strong: true },
      {
        text: " pickleball model is authorized for use in the sanctioned tournaments from ",
      },
      { text: "20th January 2026 till 19th January 2029", strong: true },
      { text: "." },
    ],
    place: "Mumbai",
    date: "20th January 2026",
    /**
     * Both signatures are images in the report, not text — the document's own
     * fonts are anonymised subsets, so there is no face to match. Each is
     * rendered out of page 8 at 600 dpi rather than reconstructed.
     */
    signatories: [
      {
        heading: "Name of Brainwave SportsTech Signatory:",
        name: "Dr Sunil Peshane, PhD DPATech",
        role: "Signature of Analyst / QC / QA Manager",
        signatureImage: "/certification/signature-sunil-peshane.png",
        signatureAlt:
          "Signature of Dr Sunil Peshane, Analyst / QC / QA Manager, Brainwave SportsTech",
      },
      {
        heading: "Name of the AIPA Signatory:",
        name: "Mr Chetan Sanil",
        role: "Signature of the AIPA Authority",
        signatureImage: "/certification/signature-chetan-sanil.png",
        signatureAlt: "Signature of Mr Chetan Sanil, AIPA Authority",
      },
    ],
  },

  /**
   * Set to { label, href } once the report PDF is in /public to add a download
   * button. Left null so nothing links to a missing file — and note the
   * report's own confidentiality clause before publishing it whole.
   */
  document: null,
};

/**
 * The plain-text certifying sentence, joined from the emphasised segments so
 * the index card and the page metadata cannot fall out of step with what the
 * certificate itself renders.
 */
certification.authorisation.body = certification.authorisation.bodyParts
  .map((part) => part.text)
  .join("");

/** One page of the report by its slug, for the `/certification/[slug]` route. */
export function findCertificationPage(slug) {
  return certification.pages.find((entry) => entry.slug === slug) ?? null;
}

/* ---------------------------------------------------------- pickleminton */

/**
 * The PickleMinton set's printed insert, as text.
 *
 * The client supplied both sheets as artwork. Artwork alone would not do the
 * job: at 390px the rules sheet's body text renders around 6px, search engines
 * read none of it, and a screen reader reads nothing at all. So every step and
 * every rule lives here as real content, and the original sheets are offered
 * beside it for anyone who wants the printed version.
 *
 * The set is not sold in this store — the storefront is pickleballs only — so
 * this is support content for people who already own one, reached by a short
 * URL that prints on the box.
 */
export const pickleminton = {
  name: "PickleMinton",
  /**
   * The wordmark splits orange/green in the client's artwork. Until the logo
   * file is in /public/pickleminton/, the page sets the two halves in the
   * site's own flame and green rather than printing a flat grey name.
   */
  nameParts: ["Pickle", "Minton"],
  logo: "/pickleminton/logo.png",
  kitImage: "/photos/pickleminton-kit.jpeg",
  kitImageAlt: "Complete PickleMinton net, paddles, balls and carry bag kit",
  tagline: "Play anywhere. Play anytime.",

  playingArea: {
    label: "Minimum playing area",
    imperial: "8 × 18 ft",
    metric: "2.40 × 5.50 m",
  },

  /**
   * The nine steps off the printed sheet.
   *
   * `image` is the panel artwork for that step, served from
   * /public/pickleminton/. A step with no image renders as a text-only card —
   * the section has to stay usable while the artwork is still being cut, and a
   * missing file would otherwise be a broken box in the middle of the grid.
   */
  setup: [
    {
      text: "Remove from the carry bag: frame, top bar, net.",
      image: "/pickleminton/step-1.png",
      alt: "The carry bag, folded net, frame tubes and connectors laid out",
    },
    {
      text: "Unfold the frame tubes from the foam holder.",
      image: "/pickleminton/step-2.png",
      alt: "The foam holder beside the unfolded frame tubes",
    },
    {
      text: "Plug the tubes together. They are connected with bungee ropes, which makes it really simple.",
      image: "/pickleminton/step-3.png",
      alt: "Two tubes plugged together, and the assembled rectangular frame",
    },
    {
      text: "Slide the net over the two tubes.",
      image: "/pickleminton/step-4.png",
      alt: "The net sliding onto the two horizontal tubes",
    },
    {
      text: "Remove one 2Way-Connector from the top bar.",
      image: "/pickleminton/step-5.png",
      alt: "A 2Way-Connector being pulled off the end of the top bar",
    },
    {
      text: "Slide the top bar through the top sleeve of the net.",
      image: "/pickleminton/step-6.png",
      alt: "The top bar threading through the sleeve along the top of the net",
    },
    {
      text: "Place the 2Way-Connector back onto the top bar.",
      image: "/pickleminton/step-7.png",
      alt: "The 2Way-Connector pushed back onto the end of the top bar",
    },
    {
      text: "Connect the 2Way-Connector to the frame.",
      image: "/pickleminton/step-8.png",
      alt: "The connector joining the top bar to the upright frame",
    },
    {
      text: "Attach the two bungee cords to the eyelets at the bottom of the net. This stretches the net out.",
      image: "/pickleminton/step-9.png",
      alt: "A bungee cord hooked into an eyelet at the base of the net",
    },
  ],

  setupTips: [
    "Ensure all connectors are securely attached.",
    "Make sure the net is stretched properly using the bungee cords.",
    "You are ready to play PickleMinton.",
  ],

  rules: [
    {
      id: "objective",
      icon: "target",
      title: "Objective",
      points: [
        "Score points by hitting the ball through the window so that your opponent cannot return it.",
      ],
    },
    {
      id: "first-serve",
      icon: "users",
      title: "Determine who serves first",
      points: [
        "Players begin with a rally by hitting the ball through the window.",
        "The winner of the rally earns the right to serve first.",
      ],
    },
    {
      id: "serving",
      icon: "serve",
      title: "Serving",
      points: [
        "The server must stand at least 6 feet (1.8 m) away from the net.",
        "All serves must be underhand.",
        "If the ball touches the net while serving but still passes through the window, the serve is a fault and must be replayed.",
        "The receiving player may stand at any distance of their choice.",
      ],
    },
    {
      id: "rotation",
      icon: "rotate",
      title: "Service rotation",
      points: [
        "In games played to 11 points, each player serves 2 consecutive serves before service changes.",
        "In games played to 21 points, each player serves 5 consecutive serves before service changes.",
        "At 10–10 (in games to 11) or 20–20 (in games to 21), players alternate one serve each until a player wins by 2 points.",
      ],
    },
    {
      id: "during-play",
      icon: "ball",
      title: "During play",
      points: [
        "Each player is allowed one paddle hit to return the ball through the window.",
        "To compensate for sun or wind, players may switch sides after every 5 points, if they want to.",
      ],
    },
    {
      id: "scoring",
      icon: "trophy",
      title: "Scoring",
      points: [
        "The game uses rally scoring: a point can be scored by either the serving or the receiving player.",
        "A rally ends when a player fails to return the ball through the window.",
        "Games are typically played to 11 or 21 points.",
        "A game must be won by a margin of at least 2 points.",
      ],
    },
  ],

  claims: [
    "Easy to set up",
    "Fun for all ages",
    "Play indoor or outdoor",
    "Compete and have fun",
  ],
};

export const team = [
  { name: "Ananya Rao", role: "Founder · product", note: "4.5 · ex-badminton state level" },
  { name: "Rohan Menon", role: "Head of testing", note: "Coaches eleven sessions a week" },
  { name: "Karthik Iyer", role: "Composites lead", note: "Twelve years in carbon layup" },
  { name: "Sneha Kulkarni", role: "Community", note: "Runs the Saturday open play" },
];

export const socials = [
  { label: "Instagram", icon: "instagram", href: "https://example.com" },
  { label: "YouTube", icon: "youtube", href: "https://example.com" },
  // the one social destination the brochure actually publishes
  { label: "WhatsApp", icon: "whatsapp", href: "https://wa.me/919920908076" },
];

export const footerColumns = [
  {
    title: "Shop",
    links: [
      { label: "All products", href: "/shop" },
      { label: "Pickleballs", href: "/shop?category=Balls" },
    ],
  },
  // Only destinations that exist. Shipping, Returns and Warranty used to point
  // at /shop for want of a page — a link that lands somewhere unrelated costs
  // more trust than the missing page does. Add them back with their pages.
  // Support's two entries fold in here: the footer now carries a Get in touch
  // column, and a third two-item column beside it left the row lopsided.
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Lab test report", href: "/certification" },
      // support content for the PickleMinton set, which the store does not
      // sell — the URL prints on the box, so it has to stay reachable
      { label: "PickleMinton setup and rules", href: "/pickleminton" },
      { label: "FAQs", href: "/#faq" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy policy", href: "/privacy-policy" },
      { label: "Terms and conditions", href: "/terms" },
    ],
  },
  {
    title: "Account",
    links: [
      // opens the sign-in modal rather than navigating to a route
      { label: "Sign in", action: "auth" },
      { label: "My account", href: "/account" },
      { label: "My orders", href: "/account/orders" },
      { label: "Wishlist", href: "/account/wishlist" },
      { label: "Cart", href: "/cart" },
    ],
  },
];

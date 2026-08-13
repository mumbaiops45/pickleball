export const brand = {
  name: "PADDLEHAUS",
  tagline: "Performance pickleball, engineered in Bengaluru.",
};

/**
 * Shoe taxonomy. Declared up here because both the navigation mega-menu and the
 * shop sidebar are built from it — the product entries below reference the same
 * strings, so a brand only ever exists in one place.
 */
export const SHOE_BRANDS = ["Asics", "Babolat", "Mizuno", "PADDLEHAUS"];
export const SHOE_TYPES = ["Men's", "Kid's"];

export const navLinks = [
  { label: "Shop all", href: "/shop" },
  { label: "Paddles", href: "/shop?category=Paddles" },
  { label: "Balls", href: "/shop?category=Balls" },
  {
    label: "Shoes",
    href: "/shop?category=Shoes",
    // rendered as a two-column mega-menu on desktop, nested links on mobile
    columns: [
      {
        title: "Brands",
        links: SHOE_BRANDS.map((brand) => ({
          label: brand,
          href: `/shop?category=Shoes&brand=${encodeURIComponent(brand)}`,
        })),
      },
      {
        title: "Type",
        links: SHOE_TYPES.map((type) => ({
          label: type,
          href: `/shop?category=Shoes&type=${encodeURIComponent(type)}`,
        })),
      },
    ],
  },
  { label: "Apparel", href: "/shop?category=Apparel" },
  { label: "Gear", href: "/shop?category=Gear" },
  { label: "About", href: "/about" },
];

export const announcements = [
  "Free shipping over ₹2,499",
  "AIPA tournament approved",
  "30-day play test — love it or return it",
  "Season 04 drop is live",
  "Lifetime edge-guard warranty",
];

export const productFilters = [
  "All",
  "Paddles",
  "Balls",
  "Apparel",
  "Gear",
  "Shoes",
];

const GRIP_SIZES = ["4in", "4 1/8in", "4 1/4in"];
const APPAREL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
const MENS_SHOE_SIZES = ["7", "8", "9", "10", "11", "12", "13"];
const KIDS_SHOE_SIZES = ["3", "4", "5", "6"];

const catalogue = [
  {
    id: "apex-carbon-16",
    name: "Apex Carbon 16",
    blurb: "Raw T700 face · 16mm thermoformed core",
    description:
      "The all-court paddle we build the rest of the line around. A raw T700 carbon face gives you the grit for a heavy topspin roll, while the 16mm thermoformed core keeps the drop soft enough to reset under pressure.",
    category: "Paddles",
    skill: "Advanced",
    price: 15999,
    compareAt: 18999,
    rating: 4.9,
    reviews: 1284,
    badge: "Best seller",
    sku: "PH-APX-16",
    stock: 34,
    swatches: ["#d4ff3f", "#ff5c2b", "#f5f3ed"],
    colorways: [
      { name: "Volt", hex: "#d4ff3f" },
      { name: "Clay", hex: "#ff5c2b" },
      { name: "Bone", hex: "#f5f3ed" },
    ],
    optionLabel: "Grip size",
    options: GRIP_SIZES,
    highlights: [
      "Peel-ply raw carbon face holds grit for a full season",
      "Foam-injected perimeter walls widen the sweet spot",
      "Hand-balanced to a swing weight window of ±3",
    ],
    specs: [
      { label: "Face", value: "Raw T700 carbon" },
      { label: "Core", value: "16mm polypropylene" },
      { label: "Shape", value: "Standard" },
      { label: "Weight", value: "8.0 oz" },
      { label: "Handle", value: "5.5 in" },
      { label: "Certification", value: "AIPA approved" },
    ],
    art: { kind: "paddle", face: "#d4ff3f", texture: "carbon" },
  },
  {
    id: "kitchen-control-14",
    name: "Kitchen Control 14",
    blurb: "Soft touch face · elongated 14mm build",
    description:
      "Built for the dink war. The 14mm core dampens pace on contact so blocks die in the kitchen instead of popping up, and the elongated shape adds reach on the stretch volley.",
    category: "Paddles",
    skill: "Intermediate",
    price: 13499,
    rating: 4.8,
    reviews: 742,
    badge: "Control",
    sku: "PH-KTC-14",
    stock: 52,
    swatches: ["#7dd3fc", "#0d0f13"],
    colorways: [
      { name: "Ice", hex: "#7dd3fc" },
      { name: "Onyx", hex: "#2a2f38" },
    ],
    optionLabel: "Grip size",
    options: GRIP_SIZES,
    highlights: [
      "14mm core absorbs pace for softer resets",
      "Elongated face adds 0.6in of reach",
      "Most-recommended paddle by our coaching partners",
    ],
    specs: [
      { label: "Face", value: "Toray carbon" },
      { label: "Core", value: "14mm polypropylene" },
      { label: "Shape", value: "Elongated" },
      { label: "Weight", value: "7.8 oz" },
      { label: "Handle", value: "5.75 in" },
      { label: "Certification", value: "AIPA approved" },
    ],
    art: { kind: "paddle", face: "#7dd3fc", texture: "honeycomb" },
  },
  {
    id: "drive-pro-x",
    name: "Drive Pro X",
    blurb: "Power profile · gritted spin surface",
    description:
      "A head-heavy balance and a stiff face make this the paddle for players who end points from the baseline. Expect a noticeably higher launch angle on the drive.",
    category: "Paddles",
    skill: "Advanced",
    price: 17499,
    rating: 4.7,
    reviews: 516,
    badge: "New",
    sku: "PH-DRV-X",
    stock: 18,
    swatches: ["#ff5c2b", "#d4ff3f"],
    colorways: [
      { name: "Clay", hex: "#ff5c2b" },
      { name: "Volt", hex: "#d4ff3f" },
    ],
    optionLabel: "Grip size",
    options: GRIP_SIZES,
    highlights: [
      "Head-heavy balance for a heavier ball",
      "Textured grit face rated near the spin limit",
      "Unibody handle kills twist on off-centre hits",
    ],
    specs: [
      { label: "Face", value: "Gritted carbon" },
      { label: "Core", value: "16mm polypropylene" },
      { label: "Shape", value: "Elongated" },
      { label: "Weight", value: "8.3 oz" },
      { label: "Handle", value: "5.5 in" },
      { label: "Certification", value: "AIPA approved" },
    ],
    art: { kind: "paddle", face: "#ff5c2b", texture: "grit" },
  },
  {
    id: "flux-elite",
    name: "Flux Elite Edgeless",
    blurb: "Edgeless frame · maximum sweet spot",
    description:
      "No edge guard, no dead zone. The moulded frame pushes the playable surface all the way to the perimeter, which is why our sponsored players keep one in the bag.",
    category: "Paddles",
    skill: "Advanced",
    price: 20999,
    compareAt: 23999,
    rating: 4.9,
    reviews: 318,
    badge: "Pro pick",
    sku: "PH-FLX-EL",
    stock: 9,
    swatches: ["#f5f3ed", "#14171d"],
    colorways: [
      { name: "Bone", hex: "#f5f3ed" },
      { name: "Onyx", hex: "#2a2f38" },
    ],
    optionLabel: "Grip size",
    options: GRIP_SIZES,
    highlights: [
      "Edgeless construction, no dead perimeter",
      "Widest measured sweet spot in the line",
      "Ships with a matched cover",
    ],
    specs: [
      { label: "Face", value: "Raw T700 carbon" },
      { label: "Core", value: "16mm polypropylene" },
      { label: "Shape", value: "Standard" },
      { label: "Weight", value: "8.1 oz" },
      { label: "Handle", value: "5.5 in" },
      { label: "Certification", value: "AIPA approved" },
    ],
    art: { kind: "paddle", face: "#f5f3ed", texture: "carbon" },
  },
  {
    id: "rally-starter",
    name: "Rally Starter",
    blurb: "Fibreglass face · forgiving 13mm core",
    description:
      "The paddle we hand to anyone in their first season. Light, cheap to replace and forgiving enough that mishits still clear the net.",
    category: "Paddles",
    skill: "Beginner",
    price: 4999,
    compareAt: 6499,
    rating: 4.5,
    reviews: 2043,
    badge: "Starter",
    sku: "PH-RLY-ST",
    stock: 120,
    swatches: ["#d4ff3f", "#7dd3fc"],
    colorways: [
      { name: "Volt", hex: "#d4ff3f" },
      { name: "Ice", hex: "#7dd3fc" },
    ],
    optionLabel: "Grip size",
    options: GRIP_SIZES,
    highlights: [
      "Lightest paddle in the line at 7.4 oz",
      "Cushioned grip for players new to the sport",
      "Same 30-day play test as the pro models",
    ],
    specs: [
      { label: "Face", value: "Fibreglass composite" },
      { label: "Core", value: "13mm polypropylene" },
      { label: "Shape", value: "Standard" },
      { label: "Weight", value: "7.4 oz" },
      { label: "Handle", value: "5.0 in" },
      { label: "Certification", value: "AIPA approved" },
    ],
    art: { kind: "paddle", face: "#a9dd00", texture: "honeycomb" },
  },
  {
    id: "night-shift-16",
    name: "Night Shift 16",
    blurb: "Matte black raw carbon · limited run",
    description:
      "The Apex platform in a blacked-out limited run of 500. Same 16mm thermoformed build, matte edge guard, numbered butt cap.",
    category: "Paddles",
    skill: "Advanced",
    price: 18499,
    rating: 4.8,
    reviews: 187,
    badge: "Limited",
    sku: "PH-NGT-16",
    stock: 6,
    swatches: ["#2a2f38", "#d4ff3f"],
    colorways: [{ name: "Blackout", hex: "#2a2f38" }],
    optionLabel: "Grip size",
    options: GRIP_SIZES,
    highlights: [
      "Numbered run of 500",
      "Matte edge guard and blacked-out hardware",
      "Identical layup to the Apex Carbon 16",
    ],
    specs: [
      { label: "Face", value: "Raw T700 carbon" },
      { label: "Core", value: "16mm polypropylene" },
      { label: "Shape", value: "Standard" },
      { label: "Weight", value: "8.0 oz" },
      { label: "Handle", value: "5.5 in" },
      { label: "Certification", value: "AIPA approved" },
    ],
    art: { kind: "paddle", face: "#2a2f38", texture: "carbon" },
  },
  {
    id: "trueflight-outdoor",
    name: "TrueFlight Outdoor 40",
    blurb: "12-ball tube · seamless rotational mould",
    description:
      "Rotationally moulded in one piece so there is no seam to split. 40 holes, tournament weight, and a flight path that stays true in wind.",
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
      "Seamless one-piece mould",
      "40 holes, outdoor tournament spec",
      "Stays round through a full league season",
    ],
    specs: [
      { label: "Type", value: "Outdoor" },
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
      "A softer compound and larger holes for gym floors. Quieter off the face and easier to control on a slick surface.",
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
      "Softer compound for gym floors",
      "Noticeably quieter off the paddle",
    ],
    specs: [
      { label: "Type", value: "Indoor" },
      { label: "Holes", value: "26" },
      { label: "Diameter", value: "74mm" },
      { label: "Weight", value: "24.0 g" },
      { label: "Certification", value: "AIPA approved" },
    ],
    art: { kind: "ball", color: "#eaff9c" },
  },
  {
    id: "baseline-tee",
    name: "Baseline Dry Tee",
    blurb: "Recycled poly mesh · UPF 40",
    description:
      "A recycled poly mesh that moves sweat off your back between points. Cut long enough to stay tucked through a full third-shot sequence.",
    category: "Apparel",
    skill: "All levels",
    price: 2499,
    rating: 4.6,
    reviews: 431,
    sku: "PH-BSL-TEE",
    stock: 88,
    swatches: ["#f5f3ed", "#14171d", "#d4ff3f"],
    colorways: [
      { name: "Bone", hex: "#f5f3ed" },
      { name: "Onyx", hex: "#2a2f38" },
      { name: "Volt", hex: "#d4ff3f" },
    ],
    optionLabel: "Size",
    options: APPAREL_SIZES,
    highlights: [
      "UPF 40 sun protection",
      "Made from 82% recycled polyester",
      "Flatlock seams that do not chafe under a strap",
    ],
    specs: [
      { label: "Fabric", value: "82% recycled poly / 18% elastane" },
      { label: "Fit", value: "Athletic" },
      { label: "UPF", value: "40" },
      { label: "Care", value: "Machine wash cold" },
    ],
    art: { kind: "tee", color: "#f5f3ed" },
  },
  {
    id: "kitchen-shorts",
    name: "Kitchen 7in Shorts",
    blurb: "Four-way stretch · two ball pockets",
    description:
      "Seven-inch inseam, four-way stretch and a deep pocket on each hip sized for an outdoor ball so you are not chasing spares between games.",
    category: "Apparel",
    skill: "All levels",
    price: 2999,
    rating: 4.7,
    reviews: 356,
    badge: "Staff pick",
    sku: "PH-KTC-SHT",
    stock: 64,
    swatches: ["#14171d", "#98a0ab"],
    colorways: [
      { name: "Onyx", hex: "#2a2f38" },
      { name: "Slate", hex: "#98a0ab" },
    ],
    optionLabel: "Size",
    options: APPAREL_SIZES,
    highlights: [
      "Two ball pockets sized for a 74mm ball",
      "7in inseam, four-way stretch woven",
      "Zip pocket for a key and a card",
    ],
    specs: [
      { label: "Fabric", value: "Recycled stretch woven" },
      { label: "Inseam", value: "7 in" },
      { label: "Pockets", value: "2 ball + 1 zip" },
      { label: "Care", value: "Machine wash cold" },
    ],
    art: { kind: "shorts", color: "#2a2f38" },
  },
  {
    id: "court-cap",
    name: "Court Cap",
    blurb: "Perforated crown · sweat-locked band",
    description:
      "A five-panel cap with a perforated crown and a band that actually holds sweat off your eyes in August.",
    category: "Apparel",
    skill: "All levels",
    price: 1299,
    rating: 4.5,
    reviews: 212,
    sku: "PH-CRT-CAP",
    stock: 140,
    swatches: ["#d4ff3f", "#14171d", "#f5f3ed"],
    colorways: [
      { name: "Volt", hex: "#d4ff3f" },
      { name: "Onyx", hex: "#2a2f38" },
      { name: "Bone", hex: "#f5f3ed" },
    ],
    optionLabel: "Size",
    options: ["One size"],
    highlights: [
      "Perforated crown panels",
      "Moisture-locked interior band",
      "Adjustable rear strap",
    ],
    specs: [
      { label: "Fabric", value: "Recycled nylon" },
      { label: "Panels", value: "5" },
      { label: "Closure", value: "Adjustable strap" },
      { label: "Care", value: "Spot clean" },
    ],
    art: { kind: "cap", color: "#d4ff3f" },
  },
  {
    id: "midcourt-hoodie",
    name: "Midcourt Hoodie",
    blurb: "Brushed loopback · warm-up weight",
    description:
      "Warm-up weight brushed loopback for cold morning sessions. Cut slim enough to play a game in before you shed it.",
    category: "Apparel",
    skill: "All levels",
    price: 4999,
    compareAt: 5999,
    rating: 4.8,
    reviews: 174,
    sku: "PH-MDC-HD",
    stock: 42,
    swatches: ["#14171d", "#98a0ab"],
    colorways: [
      { name: "Onyx", hex: "#2a2f38" },
      { name: "Slate", hex: "#98a0ab" },
    ],
    optionLabel: "Size",
    options: APPAREL_SIZES,
    highlights: [
      "Brushed loopback cotton blend",
      "Raglan sleeve for a clean swing path",
      "Ribbed cuffs that hold their shape",
    ],
    specs: [
      { label: "Fabric", value: "Cotton / recycled poly loopback" },
      { label: "Fit", value: "Slim" },
      { label: "Weight", value: "340 gsm" },
      { label: "Care", value: "Machine wash cold" },
    ],
    art: { kind: "tee", color: "#2a2f38", accent: "#98a0ab" },
  },
  {
    id: "tour-duffel",
    name: "Tour Duffel 40L",
    blurb: "Six paddles · vented shoe well",
    description:
      "Forty litres, a fleece-lined sleeve for six paddles and a vented shoe well at the base so your bag does not smell like a locker room.",
    category: "Gear",
    skill: "All levels",
    price: 6999,
    compareAt: 8499,
    rating: 4.9,
    reviews: 289,
    badge: "Staff pick",
    sku: "PH-TUR-40",
    stock: 27,
    swatches: ["#14171d", "#ff5c2b"],
    colorways: [
      { name: "Onyx", hex: "#2a2f38" },
      { name: "Clay", hex: "#ff5c2b" },
    ],
    optionLabel: "Capacity",
    options: ["40L"],
    highlights: [
      "Fleece-lined sleeve holds six paddles",
      "Vented shoe well at the base",
      "Insulated side pocket for two bottles",
    ],
    specs: [
      { label: "Volume", value: "40 L" },
      { label: "Paddle capacity", value: "6" },
      { label: "Material", value: "Recycled 900D poly" },
      { label: "Warranty", value: "Lifetime hardware" },
    ],
    art: { kind: "bag", color: "#2a2f38" },
  },
  {
    id: "sling-pack",
    name: "Sideline Sling",
    blurb: "Two paddles · one-strap carry",
    description:
      "For the session where you only need two paddles, a tube of balls and a water bottle. Sits flat against your back on the bike.",
    category: "Gear",
    skill: "All levels",
    price: 3499,
    rating: 4.6,
    reviews: 143,
    sku: "PH-SDL-SL",
    stock: 61,
    swatches: ["#14171d", "#d4ff3f"],
    colorways: [
      { name: "Onyx", hex: "#2a2f38" },
      { name: "Volt", hex: "#d4ff3f" },
    ],
    optionLabel: "Capacity",
    options: ["12L"],
    highlights: [
      "Holds two paddles and a ball tube",
      "Single-strap quick-swing access",
      "Water-resistant base panel",
    ],
    specs: [
      { label: "Volume", value: "12 L" },
      { label: "Paddle capacity", value: "2" },
      { label: "Material", value: "Recycled 600D poly" },
      { label: "Warranty", value: "Lifetime hardware" },
    ],
    art: { kind: "bag", color: "#2a2f38", accent: "#d4ff3f" },
  },
  {
    id: "court-grip-low",
    name: "CourtGrip Low",
    blurb: "Lateral cage · non-marking gum sole",
    description:
      "A lateral cage that holds your foot through the split-step and a gum outsole that will not mark an indoor floor.",
    category: "Shoes",
    brand: "PADDLEHAUS",
    type: "Men's",
    skill: "All levels",
    price: 5999,
    rating: 4.7,
    reviews: 655,
    sku: "PH-CGL-01",
    stock: 38,
    swatches: ["#f5f3ed", "#ff5c2b"],
    colorways: [
      { name: "Bone", hex: "#f5f3ed" },
      { name: "Clay", hex: "#ff5c2b" },
    ],
    optionLabel: "US size",
    options: MENS_SHOE_SIZES,
    highlights: [
      "TPU lateral cage for hard direction changes",
      "Non-marking gum outsole",
      "Six-month outsole durability guarantee",
    ],
    specs: [
      { label: "Drop", value: "8 mm" },
      { label: "Outsole", value: "Non-marking gum" },
      { label: "Surface", value: "Indoor + outdoor" },
      { label: "Weight", value: "11.2 oz" },
    ],
    art: { kind: "shoe", color: "#f5f3ed" },
  },
  {
    id: "tacky-overgrip",
    name: "Tacky Overgrip 3-pack",
    blurb: "Perforated · stays tacky when wet",
    description:
      "The overgrip our team re-wraps with every fortnight. Perforated, tacky when wet, and thin enough not to change your grip size.",
    category: "Gear",
    skill: "All levels",
    price: 599,
    rating: 4.7,
    reviews: 918,
    badge: "Restock",
    sku: "PH-TKY-03",
    stock: 310,
    swatches: ["#14171d", "#d4ff3f", "#ff5c2b"],
    colorways: [
      { name: "Onyx", hex: "#2a2f38" },
      { name: "Volt", hex: "#d4ff3f" },
      { name: "Clay", hex: "#ff5c2b" },
    ],
    optionLabel: "Pack size",
    options: ["3-pack", "10-pack"],
    highlights: [
      "Stays tacky through a sweaty session",
      "Perforated for grip in humidity",
      "0.6mm — will not change your grip size",
    ],
    specs: [
      { label: "Thickness", value: "0.6 mm" },
      { label: "Length", value: "1100 mm" },
      { label: "Finish", value: "Perforated tacky" },
      { label: "Pack", value: "3 grips" },
    ],
    art: { kind: "grip", color: "#2a2f38" },
  },

  /* ------------------------------------------------------------------ shoes */

  {
    id: "asics-solution-speed-ff3",
    name: "Asics Solution Speed FF 3",
    blurb: "FF Blast Plus cushioning · all-court outsole",
    description:
      "The lightest Solution in the line. FF Blast Plus foam keeps the ride quick under the split-step, and the DYNAWALL midsole stops the foot rolling over the edge when you push wide for a backhand dink.",
    category: "Shoes",
    brand: "Asics",
    type: "Men's",
    skill: "Advanced",
    price: 12999,
    compareAt: 14999,
    rating: 4.8,
    reviews: 486,
    badge: "Best seller",
    sku: "AS-SSF-03",
    stock: 24,
    swatches: ["#2f6b66", "#e0218a"],
    colorways: [
      { name: "Rich Teal", hex: "#2f6b66" },
      { name: "Pink Rave", hex: "#e0218a" },
    ],
    optionLabel: "US size",
    options: MENS_SHOE_SIZES,
    highlights: [
      "FF Blast Plus foam for a light, fast ride",
      "DYNAWALL midsole resists roll on hard lateral pushes",
      "Six-month outsole durability guarantee",
    ],
    specs: [
      { label: "Brand", value: "Asics" },
      { label: "Fit", value: "Men's · standard" },
      { label: "Outsole", value: "AHAR all-court" },
      { label: "Surface", value: "Indoor + outdoor" },
      { label: "Weight", value: "10.6 oz" },
    ],
    art: { kind: "shoe", color: "#2f6b66" },
    image: "/photos/products/asicsproduct1.png",
  },
  {
    id: "asics-solution-speed-ff3-black",
    name: "Asics Solution Speed FF 3 Blackout",
    blurb: "Blacked-out upper · mint green sole unit",
    description:
      "Same Solution Speed platform in a blacked-out mesh upper. The mint outsole is non-marking, so it is the pair we hand to players who split their week between a gym floor and an outdoor court.",
    category: "Shoes",
    brand: "Asics",
    type: "Men's",
    skill: "Advanced",
    price: 12499,
    rating: 4.7,
    reviews: 312,
    sku: "AS-SSF-03B",
    stock: 19,
    swatches: ["#14171d", "#3fd4a2"],
    colorways: [
      { name: "Black", hex: "#14171d" },
      { name: "Mint", hex: "#3fd4a2" },
    ],
    optionLabel: "US size",
    options: MENS_SHOE_SIZES,
    highlights: [
      "Non-marking outsole approved for indoor courts",
      "Engineered mesh upper that dries overnight",
      "Reinforced toe drag pad",
    ],
    specs: [
      { label: "Brand", value: "Asics" },
      { label: "Fit", value: "Men's · standard" },
      { label: "Outsole", value: "AHAR non-marking" },
      { label: "Surface", value: "Indoor + outdoor" },
      { label: "Weight", value: "10.6 oz" },
    ],
    art: { kind: "shoe", color: "#14171d" },
    image: "/photos/products/asicsproduct2.png",
  },
  {
    id: "asics-gel-dedicate-8",
    name: "Asics Gel-Dedicate 8",
    blurb: "GEL forefoot · the club-night workhorse",
    description:
      "The pair most of our league players actually buy. GEL cushioning under the forefoot, a wide flat last for stability, and a price that survives being replaced every season.",
    category: "Shoes",
    brand: "Asics",
    type: "Men's",
    skill: "Intermediate",
    price: 6499,
    compareAt: 7499,
    rating: 4.6,
    reviews: 874,
    badge: "Best value",
    sku: "AS-GDD-08",
    stock: 46,
    swatches: ["#8fb8cf", "#f5f3ed"],
    colorways: [
      { name: "Gris Blue", hex: "#8fb8cf" },
      { name: "White", hex: "#f5f3ed" },
    ],
    optionLabel: "US size",
    options: MENS_SHOE_SIZES,
    highlights: [
      "GEL cushioning under the forefoot",
      "Wide flat last for players who want stability first",
      "Synthetic overlays hold the midfoot on a hard cut",
    ],
    specs: [
      { label: "Brand", value: "Asics" },
      { label: "Fit", value: "Men's · wide" },
      { label: "Outsole", value: "All-court" },
      { label: "Surface", value: "Indoor + outdoor" },
      { label: "Weight", value: "11.4 oz" },
    ],
    art: { kind: "shoe", color: "#8fb8cf" },
    image: "/photos/products/asicsproduct3.png",
  },
  {
    id: "asics-gel-dedicate-8-gs",
    name: "Asics Gel-Dedicate 8 GS",
    blurb: "Junior grade-school build · US 3 – 6",
    description:
      "The Gel-Dedicate scaled for junior feet. Lighter throughout, with a softer heel counter so a growing foot is not fighting the shoe through a two-hour coaching session.",
    category: "Shoes",
    brand: "Asics",
    type: "Kid's",
    skill: "Beginner",
    price: 4999,
    rating: 4.7,
    reviews: 218,
    badge: "Junior",
    sku: "AS-GDD-08GS",
    stock: 33,
    swatches: ["#8fb8cf", "#f5f3ed"],
    colorways: [
      { name: "Gris Blue", hex: "#8fb8cf" },
      { name: "White", hex: "#f5f3ed" },
    ],
    optionLabel: "US size",
    options: KIDS_SHOE_SIZES,
    highlights: [
      "Junior last, 30% lighter than the adult build",
      "Softer heel counter for a growing foot",
      "Same non-marking all-court outsole",
    ],
    specs: [
      { label: "Brand", value: "Asics" },
      { label: "Fit", value: "Kid's · grade school" },
      { label: "Outsole", value: "All-court non-marking" },
      { label: "Surface", value: "Indoor + outdoor" },
      { label: "Weight", value: "7.8 oz" },
    ],
    art: { kind: "shoe", color: "#8fb8cf" },
    image: "/photos/products/asicsproduct4.png",
  },
  {
    id: "babolat-jet-tere-2",
    name: "Babolat Jet Tere 2 All Court",
    blurb: "Matryx upper · Michelin rubber outsole",
    description:
      "The fastest-feeling shoe we stock. The Matryx woven upper wraps the foot without break-in, and the Michelin compound holds grip on a dusty outdoor court long after a stock outsole has gone slick.",
    category: "Shoes",
    brand: "Babolat",
    type: "Men's",
    skill: "Advanced",
    price: 13499,
    rating: 4.8,
    reviews: 391,
    badge: "Pro pick",
    sku: "BB-JTR-02",
    stock: 21,
    swatches: ["#f5f3ed", "#1f3f8f", "#ff5c2b"],
    colorways: [
      { name: "White", hex: "#f5f3ed" },
      { name: "Estate Blue", hex: "#1f3f8f" },
    ],
    optionLabel: "US size",
    options: MENS_SHOE_SIZES,
    highlights: [
      "Matryx woven upper needs no break-in",
      "Michelin rubber outsole for dusty outdoor courts",
      "Lowest stack height in the shoe line",
    ],
    specs: [
      { label: "Brand", value: "Babolat" },
      { label: "Fit", value: "Men's · narrow" },
      { label: "Outsole", value: "Michelin rubber" },
      { label: "Surface", value: "All court" },
      { label: "Weight", value: "10.2 oz" },
    ],
    art: { kind: "shoe", color: "#1f3f8f" },
    image: "/photos/products/babolatproduct1.png",
  },
  {
    id: "babolat-jet-tere-2-junior",
    name: "Babolat Jet Tere 2 Junior",
    blurb: "Junior last · plum accents · US 3 – 6",
    description:
      "A junior cut of the Jet Tere with the same wrap-around upper. Light enough that a ten-year-old keeps moving their feet in the third game.",
    category: "Shoes",
    brand: "Babolat",
    type: "Kid's",
    skill: "Beginner",
    price: 7999,
    compareAt: 8999,
    rating: 4.6,
    reviews: 126,
    badge: "Junior",
    sku: "BB-JTR-02JR",
    stock: 28,
    swatches: ["#f5f3ed", "#7b3f5f"],
    colorways: [
      { name: "White", hex: "#f5f3ed" },
      { name: "Grape", hex: "#7b3f5f" },
    ],
    optionLabel: "US size",
    options: KIDS_SHOE_SIZES,
    highlights: [
      "Junior last with a padded collar",
      "Single-density midsole tuned for lighter players",
      "Non-marking outsole for school gym floors",
    ],
    specs: [
      { label: "Brand", value: "Babolat" },
      { label: "Fit", value: "Kid's · standard" },
      { label: "Outsole", value: "Non-marking rubber" },
      { label: "Surface", value: "All court" },
      { label: "Weight", value: "7.4 oz" },
    ],
    art: { kind: "shoe", color: "#7b3f5f" },
    image: "/photos/products/babolatproduct2.png",
  },
  {
    id: "babolat-jet-tere-2-navy",
    name: "Babolat Jet Tere 2 Navy",
    blurb: "Full navy knit · same Michelin outsole",
    description:
      "The Jet Tere in a full navy knit. Identical platform to the white pair — pick this one if you play on courts that turn a white upper grey in a fortnight.",
    category: "Shoes",
    brand: "Babolat",
    type: "Men's",
    skill: "Advanced",
    price: 13499,
    rating: 4.7,
    reviews: 208,
    sku: "BB-JTR-02N",
    stock: 16,
    swatches: ["#1b2a54", "#f5f3ed"],
    colorways: [
      { name: "Navy", hex: "#1b2a54" },
      { name: "White", hex: "#f5f3ed" },
    ],
    optionLabel: "US size",
    options: MENS_SHOE_SIZES,
    highlights: [
      "Dark knit upper hides court dust",
      "Michelin rubber outsole",
      "Same fit as the white Jet Tere 2",
    ],
    specs: [
      { label: "Brand", value: "Babolat" },
      { label: "Fit", value: "Men's · narrow" },
      { label: "Outsole", value: "Michelin rubber" },
      { label: "Surface", value: "All court" },
      { label: "Weight", value: "10.2 oz" },
    ],
    art: { kind: "shoe", color: "#1b2a54" },
    image: "/photos/products/babolatproduct3.png",
  },
  {
    id: "babolat-jet-mach-3",
    name: "Babolat Jet Mach 3",
    blurb: "Active Flexion upper · six-month outsole",
    description:
      "Babolat's flagship speed shoe. The Active Flexion upper tightens as you load into a lunge and releases when you push off, which is what makes it feel faster than its weight suggests.",
    category: "Shoes",
    brand: "Babolat",
    type: "Men's",
    skill: "Advanced",
    price: 14999,
    compareAt: 16999,
    rating: 4.9,
    reviews: 264,
    badge: "New",
    sku: "BB-JMC-03",
    stock: 12,
    swatches: ["#f5f3ed", "#1f3f8f"],
    colorways: [
      { name: "White", hex: "#f5f3ed" },
      { name: "Estate Blue", hex: "#1f3f8f" },
    ],
    optionLabel: "US size",
    options: MENS_SHOE_SIZES,
    highlights: [
      "Active Flexion upper tightens under load",
      "Michelin outsole with a six-month guarantee",
      "Kompressor shock absorption in the heel",
    ],
    specs: [
      { label: "Brand", value: "Babolat" },
      { label: "Fit", value: "Men's · standard" },
      { label: "Outsole", value: "Michelin rubber" },
      { label: "Surface", value: "All court" },
      { label: "Weight", value: "10.9 oz" },
    ],
    art: { kind: "shoe", color: "#f5f3ed" },
    image: "/photos/products/babolatproduct4.webp",
  },
  {
    id: "mizuno-wave-exceed-light",
    name: "Mizuno Wave Exceed Light 2",
    blurb: "Wave plate · the lightest pair we stock",
    description:
      "Nine and a half ounces with a Wave plate through the midfoot. If you play a fast hands game at the line and hate feeling anchored, this is the pair to try first.",
    category: "Shoes",
    brand: "Mizuno",
    type: "Men's",
    skill: "Intermediate",
    price: 9999,
    rating: 4.7,
    reviews: 347,
    badge: "Lightest",
    sku: "MZ-WXL-02",
    stock: 31,
    swatches: ["#f5f3ed", "#2f5fd8", "#d4ff3f"],
    colorways: [
      { name: "White", hex: "#f5f3ed" },
      { name: "Reflex Blue", hex: "#2f5fd8" },
      { name: "Volt", hex: "#d4ff3f" },
    ],
    optionLabel: "US size",
    options: MENS_SHOE_SIZES,
    highlights: [
      "9.5 oz — the lightest shoe in the catalogue",
      "Wave plate stiffens the midfoot without adding weight",
      "Non-marking outsole for indoor play",
    ],
    specs: [
      { label: "Brand", value: "Mizuno" },
      { label: "Fit", value: "Men's · standard" },
      { label: "Outsole", value: "D-Flex non-marking" },
      { label: "Surface", value: "Indoor + outdoor" },
      { label: "Weight", value: "9.5 oz" },
    ],
    art: { kind: "shoe", color: "#2f5fd8" },
    image: "/photos/products/mizunoproduct.png",
  },

  /* ------------------------------------------------------------ more balls */

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
    blurb: "3-ball pack · one-piece moulded",
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
      "One-piece mould, no seam to split",
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

  /* ---------------------------------------------------------- more paddles */

  {
    id: "engage-pursuit-pro1-ember",
    name: "Engage Pursuit Pro1 Ember",
    blurb: "Six-layer face · black on ember graphic",
    description:
      "Engage's control flagship. A six-layer face spreads the impact so the ball sits on the paddle a fraction longer, which is what makes the third-shot drop so repeatable with it.",
    category: "Paddles",
    brand: "Engage",
    skill: "Advanced",
    price: 19499,
    compareAt: 21999,
    rating: 4.8,
    reviews: 402,
    badge: "Control",
    sku: "EG-PP1-EM",
    stock: 14,
    swatches: ["#14171d", "#c0342b"],
    colorways: [
      { name: "Onyx", hex: "#14171d" },
      { name: "Ember", hex: "#c0342b" },
    ],
    optionLabel: "Grip size",
    options: GRIP_SIZES,
    highlights: [
      "Six-layer face for a longer dwell time",
      "Variable-release polymer core",
      "Hand-weighted in pairs for doubles teams",
    ],
    specs: [
      { label: "Brand", value: "Engage" },
      { label: "Face", value: "Six-layer composite" },
      { label: "Core", value: "16mm polymer" },
      { label: "Shape", value: "Standard" },
      { label: "Weight", value: "8.1 oz" },
      { label: "Certification", value: "AIPA approved" },
    ],
    art: { kind: "paddle", face: "#14171d", texture: "carbon" },
    image: "/photos/product1.png",
  },
  {
    id: "engage-pursuit-pro1-ice",
    name: "Engage Pursuit Pro1 Ice",
    blurb: "Six-layer face · black on ice graphic",
    description:
      "The Pursuit Pro1 in the ice colourway. Identical layup to the Ember — pick on looks, not on feel, because on court there is nothing between them.",
    category: "Paddles",
    brand: "Engage",
    skill: "Advanced",
    price: 19499,
    rating: 4.8,
    reviews: 268,
    sku: "EG-PP1-IC",
    stock: 11,
    swatches: ["#14171d", "#7dd3fc"],
    colorways: [
      { name: "Onyx", hex: "#14171d" },
      { name: "Ice", hex: "#7dd3fc" },
    ],
    optionLabel: "Grip size",
    options: GRIP_SIZES,
    highlights: [
      "Six-layer face for a longer dwell time",
      "Variable-release polymer core",
      "Same layup as the Ember colourway",
    ],
    specs: [
      { label: "Brand", value: "Engage" },
      { label: "Face", value: "Six-layer composite" },
      { label: "Core", value: "16mm polymer" },
      { label: "Shape", value: "Standard" },
      { label: "Weight", value: "8.1 oz" },
      { label: "Certification", value: "AIPA approved" },
    ],
    art: { kind: "paddle", face: "#14171d", texture: "carbon" },
    image: "/photos/product2.png",
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

/* --------------------------------------------------------------- categories */

const countIn = (filter) =>
  products.filter((product) => product.category === filter).length;

export const categories = [
  {
    id: "paddles",
    index: "01",
    name: "Paddles",
    filter: "Paddles",
    count: countIn("Paddles"),
    blurb: "Raw carbon, thermoformed cores, tuned by pros.",
    kind: "paddle",
    accent: "#d4ff3f",
    tint: "#eefcc4",
  },
  {
    id: "balls",
    index: "02",
    name: "Balls",
    filter: "Balls",
    count: countIn("Balls"),
    blurb: "Indoor and outdoor, true-flight moulded.",
    kind: "ball",
    accent: "#ff5c2b",
    tint: "#ffe6d5",
  },
  {
    id: "apparel",
    index: "03",
    name: "Apparel",
    filter: "Apparel",
    count: countIn("Apparel"),
    blurb: "Court-ready fits that breathe in August.",
    kind: "tee",
    accent: "#d4ff3f",
    tint: "#e2eeff",
  },
  {
    id: "bags",
    index: "04",
    name: "Bags",
    filter: "Gear",
    count: countIn("Gear"),
    blurb: "Six-paddle capacity with vented shoe wells.",
    kind: "bag",
    accent: "#d4ff3f",
    tint: "#ece8dc",
  },
  {
    id: "shoes",
    index: "05",
    name: "Shoes",
    filter: "Shoes",
    count: countIn("Shoes"),
    blurb: "Asics, Babolat and Mizuno — men's and kid's.",
    kind: "shoe",
    accent: "#ff5c2b",
    tint: "#dcf2e4",
  },
];

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

export const paddleSpecs = [
  { label: "Face", value: "Raw T700 carbon", note: "Peel-ply finish for grit that lasts a season." },
  { label: "Core", value: "16mm polymer", note: "Thermoformed and foam-injected walls." },
  { label: "Swing weight", value: "112 · balanced", note: "Tuned for a fast hand battle at the line." },
  { label: "Handle", value: "5.5in · 4⅛ grip", note: "Two-hand backhand friendly." },
];

/**
 * The paddle build, outside in. `art` keys into LAYER_ART, so a new layer is a
 * data edit plus one glyph rather than a change to the section itself.
 */
export const paddleLayers = [
  {
    id: "face",
    index: "01",
    art: "grit",
    title: "Peel-ply grit face",
    copy: "Cured against peel-ply, so the grit is the weave itself rather than a sprayed coating that wears off by August.",
  },
  {
    id: "carbon",
    index: "02",
    art: "weave",
    title: "Raw T700 carbon",
    copy: "Unidirectional sheets cross-laid at 45° — the reason the face resists twisting on a ball struck off centre.",
  },
  {
    id: "walls",
    index: "03",
    art: "foam",
    title: "Foam-injected walls",
    copy: "Closed-cell foam fills the perimeter channel, so a ball caught near the edge keeps most of its pace.",
  },
  {
    id: "core",
    index: "04",
    art: "honeycomb",
    title: "16mm honeycomb core",
    copy: "Polypropylene cells sized to swallow pace on a reset without flattening the pop on a drive.",
  },
  {
    id: "handle",
    index: "05",
    art: "unibody",
    title: "Unibody handle",
    copy: "Face, throat and handle press as a single piece. Nothing is bonded on, so nothing works loose.",
  },
];

export const features = [
  {
    icon: "bolt",
    title: "Thermoformed power",
    copy: "Unibody construction and foam-filled walls push the sweet spot to the edges of the face.",
  },
  {
    icon: "shield",
    title: "Tournament legal",
    copy: "Every paddle ships AIPA approved and tested against the current spin-rate limit.",
  },
  {
    icon: "truck",
    title: "48-hour delivery",
    copy: "Shipped from Indiranagar and Delhi NCR, so most orders land before your next league night.",
  },
  {
    icon: "repeat",
    title: "30-day play test",
    copy: "Take it on court. If it does not fit your game, send it back — we cover the label.",
  },
];

export const stats = [
  { value: "180+", label: "Sponsored players" },
  { value: "4.9", label: "Average rating" },
  { value: "62k", label: "Paddles shipped" },
  { value: "48h", label: "Door to door" },
];

export const testimonials = [
  {
    quote:
      "The Apex changed my third-shot drop. All the pop I wanted without giving up the soft game at the kitchen line.",
    name: "Ananya Rao",
    role: "4.5 · Indiranagar, Bengaluru",
    rating: 5,
  },
  {
    quote:
      "Ordered Thursday, played a tournament with it Saturday. The grit is still biting after four months of outdoor play.",
    name: "Rohan Menon",
    role: "Club coach · Whitefield, Bengaluru",
    rating: 5,
  },
  {
    quote:
      "I coach eleven beginners a week and I hand every one of them the Kitchen Control. Nothing else is this forgiving.",
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
    title: "Exactly the paddle I hoped for",
    body: "Took it straight into a 4.5 round robin at Koramangala. The face grabs the ball on the roll volley and the drop still lands soft. No notes.",
    verified: true,
  },
  {
    name: "Karthik Iyer",
    rating: 5,
    date: "1 month ago",
    title: "Sweet spot is huge",
    body: "Coming off a 13mm paddle, the extra core thickness took a session to adjust to. Now I would not go back — off-centre balls barely twist it.",
    verified: true,
  },
  {
    name: "Sneha Kulkarni",
    rating: 4,
    date: "2 months ago",
    title: "Great, but wrap the handle",
    body: "Fantastic paddle. The stock grip is thin for my hands so I added an overgrip on day one. Four stars only for that.",
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
      { productId: "apex-carbon-16", quantity: 1 },
      { productId: "tacky-overgrip", quantity: 2 },
    ],
  },
  {
    id: "PH-47096",
    date: "28 May 2026",
    status: "Delivered",
    total: 148.0,
    items: [{ productId: "tour-duffel", quantity: 1 }],
  },
  {
    id: "PH-46550",
    date: "3 April 2026",
    status: "Refunded",
    total: 32.0,
    items: [{ productId: "trueflight-outdoor", quantity: 1 }],
  },
];

/* ------------------------------------------------------------- brand strip */

export const partners = [
  { name: "AIPA", note: "Approved equipment" },
  { name: "BENGALURU OPEN", note: "Official paddle" },
  { name: "INDIA TOUR", note: "Player partner" },
  { name: "KITCHEN CLUB", note: "Coaching network" },
  { name: "HSR COURTS", note: "Retail stockist" },
];

/* ------------------------------------------------------------ paddle finder */

export const finderQuestions = [
  {
    id: "style",
    label: "How do you win points?",
    help: "Be honest — it changes the core thickness we suggest.",
    options: [
      { value: "power", label: "I drive and put it away", hint: "Power profile" },
      { value: "control", label: "I dink and out-patient them", hint: "Control profile" },
      { value: "all", label: "A bit of both", hint: "All-court profile" },
    ],
  },
  {
    id: "level",
    label: "Where is your game right now?",
    help: "Roughly — this maps to how forgiving the face should be.",
    options: [
      { value: "Beginner", label: "First season", hint: "Under 3.0" },
      { value: "Intermediate", label: "Playing leagues", hint: "3.0 – 4.0" },
      { value: "Advanced", label: "Playing tournaments", hint: "4.0+" },
    ],
  },
  {
    id: "budget",
    label: "What are you spending?",
    help: "Every paddle ships with the same 30-day play test.",
    options: [
      { value: "value", label: "Under ₹6,000", hint: "Best value" },
      { value: "mid", label: "₹6,000 – ₹15,000", hint: "Most popular" },
      { value: "premium", label: "₹15,000+", hint: "Tour spec" },
    ],
  },
];

/** Maps a finder answer set onto a real product id. */
export function recommendPaddle({ style, level, budget }) {
  if (level === "Beginner" || budget === "value") return "rally-starter";
  if (budget === "premium") return style === "power" ? "drive-pro-x" : "flux-elite";
  if (style === "power") return "drive-pro-x";
  if (style === "control") return "kitchen-control-14";
  return "apex-carbon-16";
}

/* ------------------------------------------------------------------ bundle */

export const starterBundle = {
  title: "The Season Starter",
  titleAccent: "Starter",
  blurb:
    "The three things every new player buys in their first month, priced as one.",
  items: ["apex-carbon-16", "trueflight-outdoor", "sling-pack"],
  // matches the SEASON04 code the cart honours, so the advertised bundle price
  // is the price you actually reach at checkout
  discountRate: 0.1,
  code: "SEASON04",
};

/* --------------------------------------------------------------------- FAQ */

export const faqs = [
  {
    question: "How do I know which paddle is right for me?",
    answer:
      "Run the paddle finder above — three questions and it points at a real product. If you would rather talk it through, every order includes a 30-day play test, so you can take two paddles on court and send back the one that loses.",
  },
  {
    question: "Are your paddles tournament legal?",
    answer:
      "Every paddle we sell is AIPA approved and tested against the current surface-roughness and spin-rate limits before it ships. The approval number is printed on the butt cap.",
  },
  {
    question: "What does the 30-day play test cover?",
    answer:
      "Play with it outdoors, indoors, in a tournament — we do not care. If it does not suit your game within 30 days, we email you a prepaid label and refund the full amount. Grit wear from real play does not void it.",
  },
  {
    question: "How fast is delivery?",
    answer:
      "Free shipping on orders over ₹2,499, dispatched from Indiranagar or Delhi NCR depending on which is closer to you. Orders placed before 2pm IST go out the same day.",
  },
  {
    question: "Which grip size should I order?",
    answer:
      "Measure from the middle crease of your palm to the tip of your ring finger. Under 4in go with 4in, 4 to 4.25in take the 4 1/8in. When you are between sizes, size down — you can always add an overgrip.",
  },
  {
    question: "Do you replace a cracked paddle?",
    answer:
      "Edge guard and delamination failures are covered for the life of the paddle. Send a photo through the contact form and we ship a replacement without asking for the old one back first.",
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
    src: "/photos/pickleball-gear.png",
    alt: "A tour duffel and a pair of court shoes packed for a session",
  },
};

/* --------------------------------------------------------------- about page */

export const contact = {
  addressLines: ["No. 42, 4th Block, Koramangala", "Bengaluru 560034, Karnataka"],
  phone: "+91 80 4718 2200",
  email: "hello@paddlehaus.in",
  hours: "Mon – Sat, 10am – 7pm IST",
};

export const aboutIntro = {
  eyebrow: "Our story",
  title: "Started on a repainted badminton court in Koramangala.",
  titleAccent: "badminton court",
  body: [
    "In 2023 there were four pickleball courts in Bengaluru and none of them had a paddle you could buy locally. Everything came through a suitcase from the US, at twice the price and six weeks late, and half of it delaminated in the first monsoon.",
    "So we started pressing our own. The first hundred paddles were made in a Peenya workshop, tested every Saturday morning by whoever turned up at the court, and rebuilt four times before we were willing to sell one.",
    "We still test that way. Every paddle in this catalogue has been through a season of Bengaluru humidity, coarse outdoor courts and players who use their gear four times a week.",
  ],
};

export const milestones = [
  { year: "2023", title: "First press", copy: "A hundred paddles out of a Peenya workshop, sold to the Koramangala regulars." },
  { year: "2024", title: "AIPA approval", copy: "The Apex platform clears the surface-roughness and spin-rate tests." },
  { year: "2025", title: "Indiranagar store", copy: "A fitting room with a demo wall, so you can hit before you buy." },
  { year: "2026", title: "Season 04", copy: "Sixteen products, shipped nationwide in under 48 hours." },
];

export const values = [
  {
    title: "Built for this climate",
    copy: "Adhesives and edge guards chosen for 90% monsoon humidity, not a dry Arizona court.",
  },
  {
    title: "Priced without the import tax",
    copy: "Made here, so you are not paying freight and customs on top of a paddle.",
  },
  {
    title: "Tested by people who lose",
    copy: "Our testers are 3.0 club players, not just sponsored pros. Forgiveness matters more than headline power.",
  },
  {
    title: "Repair before replace",
    copy: "Edge guards and grips are replaceable parts. We stock them and we will fit them for free in store.",
  },
];

export const team = [
  { name: "Ananya Rao", role: "Founder · product", note: "4.5 · ex-badminton state level" },
  { name: "Rohan Menon", role: "Head of testing", note: "Coaches eleven sessions a week" },
  { name: "Karthik Iyer", role: "Composites lead", note: "Twelve years in carbon layup" },
  { name: "Sneha Kulkarni", role: "Community", note: "Runs the Saturday open play" },
];

export const socials = [
  { label: "Instagram", icon: "instagram", href: "https://example.com" },
  { label: "YouTube", icon: "youtube", href: "https://example.com" },
  { label: "WhatsApp", icon: "whatsapp", href: "https://example.com" },
];

export const footerColumns = [
  {
    title: "Shop",
    links: [
      { label: "All products", href: "/shop" },
      { label: "Paddles", href: "/shop?category=Paddles" },
      { label: "Balls", href: "/shop?category=Balls" },
      { label: "Shoes", href: "/shop?category=Shoes" },
      { label: "Apparel", href: "/shop?category=Apparel" },
      { label: "Gear", href: "/shop?category=Gear" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About us", href: "/about" },
      { label: "Our story", href: "/about#story" },
      { label: "The team", href: "/about#team" },
      { label: "Technology", href: "/#tech" },
      { label: "Paddle finder", href: "/#finder" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Shipping", href: "/shop" },
      { label: "Returns", href: "/shop" },
      { label: "Warranty", href: "/shop" },
      { label: "FAQs", href: "/#faq" },
      { label: "Contact", href: "/about#contact" },
    ],
  },
  {
    title: "Account",
    links: [
      // opens the sign-in modal rather than navigating to a route
      { label: "Sign in", action: "auth" },
      { label: "My orders", href: "/account" },
      { label: "Cart", href: "/cart" },
    ],
  },
];

export type Category = "Furniture" | "Lighting" | "Decor" | "Seating";

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  description: string;
  features: string[];
}

export const products: Product[] = [
  {
    id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11",
    name: "Aura Lounge Chair",
    price: 850,
    category: "Seating",
    image:
      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=800&h=1000&fit=crop",
    description:
      "A sculptural lounge chair where comfort meets clean lines. The Aura wraps you in its winged silhouette, offering a private retreat within any room.",
    features: [
      "Solid oak frame with hand-brushed finish",
      "Italian wool upholstery in natural tones",
      "Reversible seat cushion with down blend",
    ],
  },
  {
    id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a12",
    name: "Noir Pendant Light",
    price: 320,
    category: "Lighting",
    image:
      "https://images.unsplash.com/photo-1540932239986-30128078f3c5?w=800&h=1000&fit=crop",
    description:
      "A minimalist pendant that balances raw black steel with warm internal glow. Suspended drama for dining or entry.",
    features: [
      "Powder-coated steel shade",
      "Adjustable cord drop up to 120 inches",
      "E26 socket, compatible with dimmer switches",
    ],
  },
  {
    id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a13",
    name: "Marble Side Table",
    price: 480,
    category: "Furniture",
    image:
      "https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=800&h=1000&fit=crop",
    description:
      "A solid honed marble top perched on a sinuous brass base. A functional sculpture that anchors any seating arrangement.",
    features: [
      "Honed Carrara marble with sealed surface",
      "Brass base with brushed nickel finish",
      "Felted bottom protects flooring",
    ],
  },
  {
    id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a14",
    name: "Wool Throw Blanket",
    price: 195,
    category: "Decor",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=1000&fit=crop",
    description:
      "Loomed from pure new wool in a heritage mill. A textural anchor for your sofa or bed, finished with hand-knotted fringe.",
    features: [
      "100% pure new wool from Scottish mills",
      "Hand-finished knotted fringe edges",
      "Dry clean only for lasting quality",
    ],
  },
  {
    id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a15",
    name: "Arc Floor Lamp",
    price: 680,
    category: "Lighting",
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057ab6fe?w=800&h=1000&fit=crop",
    description:
      "A sweeping arc of brushed brass that casts an ambient glow over reading and conversation. A mid-century icon reborn.",
    features: [
      "Brushed brass arm with marble base",
      "White linen shade for warm diffused light",
      "Foot dimmer switch for adjustable brightness",
    ],
  },
  {
    id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a16",
    name: "Oak Console Table",
    price: 1200,
    category: "Furniture",
    image:
      "https://images.unsplash.com/photo-1554295405-abb8fd54f153?w=800&h=1000&fit=crop",
    description:
      "A generous slab of European oak on tapered legs. Entryway anchor or sofa back statement — versatile in its simplicity.",
    features: [
      "Solid European oak with oiled finish",
      "Tapered legs with hidden cross-brace",
      "One central drawer for small essentials",
    ],
  },
  {
    id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a17",
    name: "Ceramic Vessel Set",
    price: 145,
    category: "Decor",
    image:
      "https://images.unsplash.com/photo-1612196808214-b4011b7ef9b4?w=800&h=1000&fit=crop",
    description:
      "Three hand-thrown ceramic vessels in graduated sizes. Each piece carries the maker's mark — subtle variation is by design.",
    features: [
      "Hand-thrown stoneware with reactive glaze",
      "Set of three: 6, 8, and 10 inches tall",
      "Each piece unique with natural variation",
    ],
  },
  {
    id: "a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a18",
    name: "Velvet Dining Chair",
    price: 420,
    category: "Seating",
    image:
      "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=1000&fit=crop",
    description:
      "A generous velvet shell on brushed brass legs. Dining chair by day, accent chair by night.",
    features: [
      "High-density foam seat with pocket springs",
      "Velvet upholstery in rich jewel tones",
      "Brass legs with anti-slip floor protectors",
    ],
  },
];

export const categories: Category[] = [
  "Furniture",
  "Lighting",
  "Decor",
  "Seating",
];

export const priceRanges = [
  { label: "Under $200", min: 0, max: 200 },
  { label: "$200 – $500", min: 200, max: 500 },
  { label: "$500 – $1,000", min: 500, max: 1000 },
  { label: "Over $1,000", min: 1000, max: Infinity },
];

// Centralized property data for the platform
export interface Property {
  id: string;
  name: string;
  location: string;
  price: number;
  description: string;
  fullDescription?: string;
  image?: string;
  images?: string[];
  bedrooms: number;
  bathrooms: number;
  sqm: number;
  type: string;
  yield: number;
  minInvestment: number;
  totalTokens: number;
  availableTokens?: number;
  capitalRaised?: number;
  targetCapital?: number;
  status: "funding" | "trading";
  currentTokenValue?: number;
  yearBuilt?: number;
  monthlyRent?: number;
  propertyTax?: number;
  hoa?: number;
  features?: string[];
  neighborhood?: string;
  walkScore?: number;
}

export const properties: Property[] = [
  {
    id: "modern-family-apartment",
    name: "Modern Family Apartment",
    location: "Leipzig, Germany",
    price: 320000,
    description:
      "78m² 3-bedroom apartment in residential area with modern amenities and excellent transport links.",
    fullDescription:
      "This modern 3-bedroom apartment in Leipzig offers comfortable family living with contemporary design and excellent connectivity. Located in a well-established residential area, the property features an open-plan living area, modern kitchen with integrated appliances, and three well-proportioned bedrooms. The apartment includes a private balcony, storage space, and access to a communal garden. With excellent public transport links and proximity to schools and shopping centers, this property represents an ideal investment opportunity in Germany's growing rental market.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop",
    ],
    bedrooms: 3,
    bathrooms: 1,
    sqm: 78,
    type: "Apartment",
    yield: 4.8,
    minInvestment: 1,
    totalTokens: 32000,
    status: "funding",
    capitalRaised: 180000,
    targetCapital: 320000,
    yearBuilt: 2019,
    monthlyRent: 1280,
    propertyTax: 85,
    hoa: 120,
    features: [
      "Modern Kitchen",
      "Private Balcony",
      "Storage Space",
      "Communal Garden",
      "Public Transport",
      "Near Schools",
    ],
    neighborhood: "Reudnitz-Thonberg",
    walkScore: 78,
  },
  {
    id: "suburban-house",
    name: "Suburban House",
    location: "Eindhoven, Netherlands",
    price: 285000,
    description:
      "110m² family home with small garden, perfect for young families in a quiet neighborhood.",
    fullDescription:
      "This charming family home in Eindhoven provides the perfect blend of suburban tranquility and urban convenience. The 110m² property features a spacious living room with large windows, a modern kitchen, three comfortable bedrooms, and two bathrooms. The highlight is the private garden, ideal for families with children. Located in a quiet residential neighborhood with excellent schools nearby, this property offers strong rental demand from young professionals and families. The area benefits from Eindhoven's thriving tech industry and proximity to major employers.",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop",
    ],
    bedrooms: 3,
    bathrooms: 2,
    sqm: 110,
    type: "House",
    yield: 5.2,
    minInvestment: 1,
    totalTokens: 28500,
    status: "funding",
    capitalRaised: 142500,
    targetCapital: 285000,
    yearBuilt: 2015,
    monthlyRent: 1235,
    propertyTax: 95,
    hoa: 0,
    features: [
      "Private Garden",
      "Modern Kitchen",
      "Two Bathrooms",
      "Quiet Neighborhood",
      "Near Schools",
      "Parking Space",
    ],
    neighborhood: "Woensel-Zuid",
    walkScore: 72,
  },
  {
    id: "city-apartment-building",
    name: "City Apartment Building",
    location: "Porto, Portugal",
    price: 240000,
    description:
      "65m² 2-bedroom apartment near city center with historic charm and modern renovations.",
    fullDescription:
      "This beautifully renovated 2-bedroom apartment in Porto combines historic Portuguese architecture with modern comfort. Located just minutes from the city center, the property features high ceilings, original architectural details, and contemporary finishes throughout. The apartment includes a bright living area, modern kitchen, two bedrooms, and a renovated bathroom. The building has been carefully restored while maintaining its historic character. With Porto's growing tourism industry and increasing demand for quality rental properties, this apartment offers excellent investment potential in one of Europe's most charming cities.",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&h=600&fit=crop",
    ],
    bedrooms: 2,
    bathrooms: 1,
    sqm: 65,
    type: "Apartment",
    yield: 4.1,
    minInvestment: 1,
    totalTokens: 1000,
    status: "trading",
    yearBuilt: 1920,
    monthlyRent: 1220,
    propertyTax: 45,
    hoa: 35,
    features: [
      "Historic Building",
      "High Ceilings",
      "City Center",
      "Modern Renovation",
      "Original Details",
      "Tourist Area",
    ],
    neighborhood: "Cedofeita",
    walkScore: 92,
  },
];

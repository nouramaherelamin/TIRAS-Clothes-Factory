/**
 * dataStore.js
 * 
 * Central localStorage keys for all admin-managed data.
 * Both the admin pages (write) and public pages (read) use these same keys,
 * so changes made in the admin panel are immediately reflected site-wide.
 * 
 * NOTE: React component references (icons) cannot be serialized to JSON.
 * Services use an iconKey string instead, mapped to components via ICON_MAP.
 */

import { products as seedProducts } from './products';
import { mockMessages as seedMessages } from './messages';
import p1 from '../assets/images/P1.jpg';
import p2 from '../assets/images/P2.jpg';
import p3 from '../assets/images/P3.webp';
import p4 from '../assets/images/P4.jpg';
import p5 from '../assets/images/P5.jpg';
import p6 from '../assets/images/P6.jpg';

export const STORE_KEYS = {
  PRODUCTS: 'z7_products',
  SERVICES: 'z7_services',
  BLOG: 'z7_blog',
  MESSAGES: 'z7_messages',
};

// Seed services with serializable icon keys
export const seedServices = [
  { id: 1, title: 'Fabric Production', description: 'High-quality textile manufacturing with advanced weaving and dyeing techniques.', iconKey: 'industry' },
  { id: 2, title: 'Garment Manufacturing', description: 'End-to-end apparel production tailored to modern market standards.', iconKey: 'tshirt' },
  { id: 3, title: 'Custom Production', description: 'Bespoke manufacturing services customized to your specific brand needs.', iconKey: 'cut' },
  { id: 4, title: 'Sourcing', description: 'Global material sourcing ensuring the best quality raw materials.', iconKey: 'globe' },
  { id: 5, title: 'Finishing', description: 'Premium detailing and finishing for a luxurious final product.', iconKey: 'box' },
  { id: 6, title: 'Quality Control', description: 'Rigorous inspection processes to ensure zero-defect consistency.', iconKey: 'check' },
];

// Seed blog posts with serializable data (no component refs)
export const seedBlogPosts = [
  {
    id: 1,
    title: 'The Future of Sustainable Fashion Manufacturing',
    category: 'Sustainability',
    date: 'Sep 15, 2026',
    excerpt: 'How modern factories are reducing environmental impact while maintaining premium quality standards.',
    content: 'The textile industry is undergoing a fundamental transformation. As consumer awareness around environmental impact grows, manufacturers are being pushed to adopt cleaner, more efficient production methods...',
    image: p1,
    published: true,
  },
  {
    id: 2,
    title: 'Denim Innovation: From Classic to Contemporary',
    category: 'Denim',
    date: 'Sep 08, 2026',
    excerpt: 'Exploring the latest innovations in denim fabric technology and production techniques.',
    content: 'Denim has been a staple of global fashion for over 150 years. Today, innovation in fabric technology is reshaping what denim can be...',
    image: p2,
    published: true,
  },
  {
    id: 3,
    title: 'Quality Control Best Practices in Garment Manufacturing',
    category: 'Quality',
    date: 'Sep 01, 2026',
    excerpt: 'A deep dive into the systems and standards that define world-class production quality.',
    content: 'Quality control is not a final step — it is woven into every phase of production. From material inspection to final packaging...',
    image: p3,
    published: true,
  },
  {
    id: 4,
    title: 'Building a Successful OEM Partnership',
    category: 'Business',
    date: 'Aug 22, 2026',
    excerpt: 'Key considerations for brands looking to establish long-term manufacturing partnerships.',
    content: 'A strong OEM relationship is built on transparency, clear communication, and aligned expectations from day one...',
    image: p4,
    published: true,
  },
  {
    id: 5,
    title: 'Leather Goods Manufacturing: Craft Meets Scale',
    category: 'Leather',
    date: 'Aug 15, 2026',
    excerpt: 'How we combine artisan craftsmanship with industrial efficiency in leather accessories production.',
    content: 'Leather working is one of the oldest crafts in human history. Translating traditional techniques to a modern production environment requires both deep expertise and careful planning...',
    image: p5,
    published: true,
  },
  {
    id: 6,
    title: 'The Rise of Formal Wear in Global Markets',
    category: 'Market Trends',
    date: 'Aug 08, 2026',
    excerpt: 'Analyzing the resurgence of demand for tailored formal wear across key international markets.',
    content: 'After years of casual wear dominance, formal attire is experiencing a renaissance. Corporate culture is evolving, and with it, the demand for well-crafted business clothing...',
    image: p6,
    published: true,
  },
];

/**
 * getStored(key, seed)
 * Reads from localStorage, falls back to seed data on first run.
 */
export const getStored = (key, seed) => {
  try {
    const raw = localStorage.getItem(key);
    if (raw !== null) return JSON.parse(raw);
    // First time: seed localStorage with initial data
    localStorage.setItem(key, JSON.stringify(seed));
    return seed;
  } catch {
    return seed;
  }
};

/**
 * setStored(key, value)
 * Writes to localStorage.
 */
export const setStored = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // Ignore storage errors
  }
};

// Lazy-initialize storage on first access
export const getProducts = () => getStored(STORE_KEYS.PRODUCTS, seedProducts);
export const getServices = () => getStored(STORE_KEYS.SERVICES, seedServices);
export const getBlogPosts = () => {
  const posts = getStored(STORE_KEYS.BLOG, seedBlogPosts);
  const localPosts = posts.map((post) => {
    const seed = seedBlogPosts.find((item) => item.id === post.id);
    return typeof post.image === 'string' && post.image.includes('unsplash.com') && seed ? { ...post, image: seed.image } : post;
  });
  if (localPosts.some((post, index) => post.image !== posts[index].image)) setStored(STORE_KEYS.BLOG, localPosts);
  return localPosts;
};
export const getMessages = () => getStored(STORE_KEYS.MESSAGES, seedMessages);

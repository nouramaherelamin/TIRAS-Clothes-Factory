/**
 * iconMap.js
 * Maps iconKey strings (stored in localStorage) to React icon components.
 * Used by Services admin and public Services page.
 */
import { FaCut, FaCheckCircle, FaTshirt, FaIndustry, FaBoxOpen, FaGlobe } from 'react-icons/fa';
import { FiSettings, FiPackage, FiGrid, FiFileText } from 'react-icons/fi';

export const ICON_MAP = {
  industry: FaIndustry,
  tshirt: FaTshirt,
  cut: FaCut,
  globe: FaGlobe,
  box: FaBoxOpen,
  check: FaCheckCircle,
  settings: FiSettings,
  package: FiPackage,
  grid: FiGrid,
  file: FiFileText,
};

export const ICON_OPTIONS = [
  { key: 'industry', label: 'Manufacturing' },
  { key: 'tshirt', label: 'Garments' },
  { key: 'cut', label: 'Cutting / Custom' },
  { key: 'globe', label: 'Global / Sourcing' },
  { key: 'box', label: 'Finishing / Box' },
  { key: 'check', label: 'Quality Check' },
  { key: 'settings', label: 'Settings' },
  { key: 'package', label: 'Package' },
];

export const getIcon = (iconKey) => ICON_MAP[iconKey] || FiSettings;

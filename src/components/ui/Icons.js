/**
 * Icon set, backed by lucide-react.
 *
 * These are thin named adapters rather than direct imports so that call sites
 * stay stable and every icon inherits the same stroke weight. Sizing comes
 * from Tailwind classes (`size-4`) — the CSS width/height overrides the
 * width/height attributes lucide renders.
 */
import {
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Leaf,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  User,
  X,
  Zap,
} from "lucide-react";

const STROKE = 1.75;

const adapt = (Component, overrides = {}) =>
  function Icon({ strokeWidth = STROKE, ...props }) {
    return <Component strokeWidth={strokeWidth} {...overrides} {...props} />;
  };

export const SearchIcon = adapt(Search);
export const BagIcon = adapt(ShoppingBag);
export const UserIcon = adapt(User);
export const MenuIcon = adapt(Menu);
export const CloseIcon = adapt(X);
export const ArrowIcon = adapt(ArrowRight);
export const ArrowUpRightIcon = adapt(ArrowUpRight);
export const ChevronDownIcon = adapt(ChevronDown);
export const ChevronLeftIcon = adapt(ChevronLeft);
export const ChevronRightIcon = adapt(ChevronRight);
export const PlusIcon = adapt(Plus);
export const TruckIcon = adapt(Truck);
export const ShieldIcon = adapt(ShieldCheck);
export const BoltIcon = adapt(Zap);
export const LeafIcon = adapt(Leaf);
export const RepeatIcon = adapt(RefreshCw);
export const MailIcon = adapt(Mail);
export const PhoneIcon = adapt(Phone);
export const PinIcon = adapt(MapPin);
/* Brand marks.
   lucide v1 removed third-party brand icons (`Instagram`, `Youtube` no longer
   exist), and icon libraries generally will not ship trademarked logos. These
   three stay as local glyphs — everything functional comes from lucide. */

const brandBase = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: STROKE,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  viewBox: "0 0 24 24",
  "aria-hidden": "true",
};

export function InstagramIcon(props) {
  return (
    <svg {...brandBase} {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function YoutubeIcon(props) {
  return (
    <svg {...brandBase} {...props}>
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" />
      <path d="m10.5 9.5 5 2.5-5 2.5Z" />
    </svg>
  );
}

export function WhatsappIcon(props) {
  return (
    <svg {...brandBase} {...props}>
      <path d="M3.5 20.5 5 16.6A8.2 8.2 0 1 1 8 19.4Z" />
      <path d="M9 9.2c.3 2.6 2.4 4.7 5 5 .8.1 1.4-.6 1.2-1.4l-.2-.7-1.9-.4-.8.9a6.4 6.4 0 0 1-2-2l.9-.8-.4-1.9-.7-.2c-.8-.2-1.5.4-1.4 1.2Z" />
    </svg>
  );
}

// ratings read as solid, not outlined
export const StarIcon = adapt(Star, { fill: "currentColor", strokeWidth: 0 });

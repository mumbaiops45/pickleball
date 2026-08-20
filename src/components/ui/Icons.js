
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Eye,
  EyeOff,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clock,
  Heart,
  LayoutGrid,
  LocateFixed,
  Leaf,
  LogOut,
  Mail,
  MapPin,
  Menu,
  MessageCircle,
  Package,
  Pencil,
  Phone,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  ShoppingBag,
  Star,
  Trash2,
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
export const CheckIcon = adapt(Check);
export const EyeIcon = adapt(Eye);
export const EyeOffIcon = adapt(EyeOff);
export const ChevronDownIcon = adapt(ChevronDown);
export const ChevronLeftIcon = adapt(ChevronLeft);
export const ChevronRightIcon = adapt(ChevronRight);
export const ChevronUpIcon = adapt(ChevronUp);
export const PlusIcon = adapt(Plus);
export const TruckIcon = adapt(Truck);
export const ShieldIcon = adapt(ShieldCheck);
export const BoltIcon = adapt(Zap);
export const LeafIcon = adapt(Leaf);
export const RepeatIcon = adapt(RefreshCw);
export const MailIcon = adapt(Mail);
export const PhoneIcon = adapt(Phone);
export const PinIcon = adapt(MapPin);
export const ClockIcon = adapt(Clock);
export const MessageIcon = adapt(MessageCircle);
export const LocateIcon = adapt(LocateFixed);
export const PencilIcon = adapt(Pencil);
export const HeartIcon = adapt(Heart);
export const PackageIcon = adapt(Package);
export const GridIcon = adapt(LayoutGrid);
export const LogOutIcon = adapt(LogOut);
export const TrashIcon = adapt(Trash2);
// saved items read as filled, the same way ratings do
export const HeartFilledIcon = adapt(Heart, {
  fill: "currentColor",
  strokeWidth: 0,
});


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

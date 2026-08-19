import { GridIcon, HeartIcon, PackageIcon } from "@/components/ui/Icons";

/**
 * The three signed-in destinations, shared by the navbar menu, the mobile
 * drawer and the account sidebar. The hero copy lives here too, so the account
 * layout can stay mounted across the routes and still retitle itself.
 */
export const ACCOUNT_SECTIONS = [
  {
    href: "/account",
    label: "My account",
    icon: GridIcon,
    eyebrow: "Account",
    title: "Your locker",
    titleAccent: "locker",
    copy: "Profile, credit and everything you have taken to the court.",
  },
  {
    href: "/account/orders",
    label: "My orders",
    icon: PackageIcon,
    eyebrow: "Orders",
    title: "Order history",
    titleAccent: "history",
    copy: "Track what shipped, reorder a favourite in one tap.",
  },
  {
    href: "/account/wishlist",
    label: "Wishlist",
    icon: HeartIcon,
    eyebrow: "Wishlist",
    title: "Saved gear",
    titleAccent: "gear",
    copy: "The paddles, shoes and kit you are keeping an eye on.",
  },
];

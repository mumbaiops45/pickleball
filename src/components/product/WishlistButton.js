"use client";

import { HeartFilledIcon, HeartIcon } from "@/components/ui/Icons";
import { useAuth } from "@/store/AuthProvider";
import { useWishlist } from "@/store/WishlistProvider";

/**
 * Heart toggle. Saving is a member feature, so a signed-out tap opens the login
 * modal instead of writing to the store.
 *
 * `variant="icon"` is the round button that floats over product art;
 * `variant="pill"` is the labelled button used beside Add to cart.
 */
export default function WishlistButton({
  productId,
  variant = "icon",
  className = "",
}) {
  const { user, openAuth } = useAuth();
  const { has, toggle, hydrated } = useWishlist();

  const saved = hydrated && Boolean(user) && has(productId);

  const onClick = (event) => {
    // product cards wrap the whole tile in a stretched link
    event.preventDefault();
    event.stopPropagation();
    if (!user) {
      openAuth();
      return;
    }
    toggle(productId);
  };

  const label = saved ? "Remove from wishlist" : "Save to wishlist";
  const Icon = saved ? HeartFilledIcon : HeartIcon;

  if (variant === "pill") {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-pressed={saved}
        className={`inline-flex h-11 items-center justify-center gap-2 rounded-full border px-6 text-sm font-medium transition-colors ${
          saved
            ? "border-clay text-clay"
            : "border-line-strong text-ink hover:border-volt-deep hover:text-volt-deep"
        } ${className}`}
      >
        <Icon className="size-4" />
        {saved ? "Saved" : "Save"}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      aria-pressed={saved}
      className={`grid size-9 place-items-center rounded-full border border-line bg-paper/90 backdrop-blur transition-colors duration-300 hover:border-clay hover:text-clay ${
        saved ? "text-clay" : "text-mist"
      } ${className}`}
    >
      <Icon className="size-4" />
    </button>
  );
}

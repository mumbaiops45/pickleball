import PageHero from "@/components/ui/PageHero";
import CartView from "@/components/cart/CartView";

export const metadata = {
  title: "Cart",
  description: "Review your bag before checkout.",
};

export default function CartPage() {
  return (
    <>
      <PageHero
        eyebrow="Step 1 of 2"
        title="Your cart"
        titleAccent="cart"
        copy="Free shipping over ₹2,499. Everything here is covered by the 30-day play test."
        crumbs={[{ label: "Cart" }]}
      />
      <CartView />
    </>
  );
}

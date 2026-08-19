import PageHero from "@/components/ui/PageHero";
import CheckoutView from "@/components/checkout/CheckoutView";

export const metadata = {
  title: "Checkout",
  description: "Confirm your delivery address and pay.",
};

export default function CheckoutPage() {
  return (
    <>
      <PageHero
        eyebrow="Step 2 of 2"
        title="Checkout"
        titleAccent="Checkout"
        copy="Confirm where it goes and how you want to pay. Free shipping over ₹2,499."
        crumbs={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]}
      />
      <CheckoutView />
    </>
  );
}

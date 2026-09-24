import OrderDetail from "@/components/account/OrderDetail";

export const metadata = {
  title: "Order details",
  description: "Track your order, from packing to your door.",
};

export default async function OrderPage({ params }) {
  const { id } = await params;
  return <OrderDetail id={id} />;
}

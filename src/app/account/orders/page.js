import OrdersView from "@/components/account/OrdersView";

export const metadata = {
  title: "My orders",
  description: "Track your orders and reorder your favourites.",
};

export default function OrdersPage() {
  return <OrdersView />;
}

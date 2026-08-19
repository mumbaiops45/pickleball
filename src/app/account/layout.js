import AccountShell from "@/components/account/AccountShell";
import { OrdersProvider } from "@/store/OrdersProvider";

/** The shell holds the hero, profile card and section nav, so it stays mounted
 *  while you move between account, orders and wishlist. Order history is
 *  fetched once here and shared by the sidebar count, the overview and the
 *  full list. */
export default function AccountLayout({ children }) {
  return (
    <OrdersProvider>
      <AccountShell>{children}</AccountShell>
    </OrdersProvider>
  );
}

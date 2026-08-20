import AccountShell from "@/components/account/AccountShell";
import { OrdersProvider } from "@/store/OrdersProvider";


export default function AccountLayout({ children }) {
  return (
    <OrdersProvider>
      <AccountShell>{children}</AccountShell>
    </OrdersProvider>
  );
}

import PageHero from "@/components/ui/PageHero";
import AccountView from "@/components/account/AccountView";

export const metadata = {
  title: "Your account",
  description: "Order history, saved details and store credit.",
};

export default function AccountPage() {
  return (
    <>
      <PageHero
        eyebrow="Account"
        title="Your locker"
        titleAccent="locker"
        copy="Orders, credit and everything you have taken to the court."
        crumbs={[{ label: "Account" }]}
      />
      <AccountView />
    </>
  );
}

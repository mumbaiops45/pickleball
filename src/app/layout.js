import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import AuthModal from "@/components/auth/AuthModal";
import Toaster from "@/components/ui/Toaster";
import { CartProvider } from "@/store/CartProvider";
import { AuthProvider } from "@/store/AuthProvider";
import { WishlistProvider } from "@/store/WishlistProvider";

export const metadata = {
  title: {
    default: "PICKLEBALL — Premium 40-hole rotomolded pickleballs",
    template: "%s · PICKLEBALL",
  },
  description:
    "India's premier pickleball manufacturing house. Premium-quality 40-hole rotomolded pickleballs made from high-quality imported raw materials — designed in India, played in the USA, Dubai and Belgium. AIPA approved, free shipping over ₹2,499 and a 30-day play test.",
};

export const viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      // tells Next not to animate the scroll on route transitions
      data-scroll-behavior="smooth"
      className="h-full antialiased"
      // The head script below stamps `data-reveal-ready` on this element
      // before React hydrates, which React reads as a server/client attribute
      // mismatch on <html>. As on <body>, this silences this one element's own
      // attributes and nothing inside it.
      suppressHydrationWarning
    >
      <head>
        {/* Arms the scroll-reveal styles. They start every revealed block at
            opacity 0 and rely on an IntersectionObserver to clear it, so they
            are gated on this attribute — set here, before first paint, so
            there is no flash, and never set at all if scripting is off or the
            bundle fails, which leaves the page plainly visible instead of
            blank. See the scroll-reveal block in globals.css. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              'document.documentElement.setAttribute("data-reveal-ready","")',
          }}
        />
      </head>
      {/* Extensions (Grammarly, password managers) stamp attributes on <body>
          before React hydrates, which reads as a mismatch. This silences that
          one element's attributes only — never its children. */}
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-paper text-ink"
      >
        <AuthProvider>
          <CartProvider>
            <WishlistProvider>
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
              <CartDrawer />
              <AuthModal />
              <Toaster />
            </WishlistProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

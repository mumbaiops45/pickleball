import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import AuthModal from "@/components/auth/AuthModal";
import Toaster from "@/components/ui/Toaster";
import { CartProvider } from "@/store/CartProvider";
import { AuthProvider } from "@/store/AuthProvider";
import { WishlistProvider } from "@/store/WishlistProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    default: "PADDLEHAUS — Performance pickleball paddles, balls & apparel",
    template: "%s · PADDLEHAUS",
  },
  description:
    "Thermoformed raw carbon paddles, true-flight balls and court apparel. AIPA approved, free shipping over ₹2,499 across India and a 30-day play test.",
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
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
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

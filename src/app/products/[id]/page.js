import { notFound } from "next/navigation";
import Link from "next/link";
import ProductDetail from "@/components/product/ProductDetail";
import ProductSpecs from "@/components/product/ProductSpecs";
import RelatedProducts from "@/components/product/RelatedProducts";
import { findProduct, products } from "@/lib/data";

// every product page is prerendered at build time
export function generateStaticParams() {
  return products.map((product) => ({ id: product.id }));
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = findProduct(id);
  if (!product) return { title: "Product not found" };

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = findProduct(id);

  if (!product) notFound();

  return (
    <>
      <nav aria-label="Breadcrumb" className="mx-auto w-full max-w-350 px-5 pt-32 sm:px-8">
        <ol className="flex flex-wrap items-center gap-2 text-xs text-mist">
          <li>
            <Link href="/" className="transition-colors hover:text-ink">
              Home
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="text-line-strong">/</span>
            <Link href="/shop" className="transition-colors hover:text-ink">
              Shop
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="text-line-strong">/</span>
            <Link
              href={`/shop?category=${product.category}`}
              className="transition-colors hover:text-ink"
            >
              {product.category}
            </Link>
          </li>
          <li className="flex items-center gap-2">
            <span aria-hidden="true" className="text-line-strong">/</span>
            <span className="text-ink">{product.name}</span>
          </li>
        </ol>
      </nav>

      <ProductDetail product={product} />
      <ProductSpecs product={product} />
      <RelatedProducts product={product} />
    </>
  );
}

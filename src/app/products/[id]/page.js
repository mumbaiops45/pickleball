import { cache } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import ProductDetail from "@/components/product/ProductDetail";
import ProductSpecs from "@/components/product/ProductSpecs";
import RelatedProducts from "@/components/product/RelatedProducts";
import { findIn, loadCatalogue } from "@/lib/services/products";

// The page shows what the store is selling right now — price, stock, images
// and copy come from the API on every request, so it cannot be prerendered.
export const dynamic = "force-dynamic";

// generateMetadata, the product and its neighbours all come off one read.
const getCatalogue = cache(loadCatalogue);

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = findIn(await getCatalogue(), id);
  if (!product) return { title: "Product not found" };

  return {
    title: product.name,
    description: product.description,
  };
}

export default async function ProductPage({ params }) {
  const { id } = await params;
  const catalogue = await getCatalogue();
  const product = findIn(catalogue, id);

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
      <RelatedProducts product={product} catalogue={catalogue} />
    </>
  );
}

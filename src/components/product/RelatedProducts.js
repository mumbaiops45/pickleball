import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/ui/Reveal";
import { relatedFrom } from "@/lib/services/products";
import { Accent } from "@/components/ui/Heading";

export default function RelatedProducts({ product, catalogue = [] }) {
  const related = relatedFrom(catalogue, product, 4);
  if (related.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-350 border-t border-line px-5 py-14 sm:px-8 lg:py-20">
      <Reveal>
        <span className="flex items-center text-[11px] font-medium uppercase tracking-[0.22em] text-volt-deep">
          Pairs well with
        </span>
        <h2 className="mt-5 text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold tracking-[-0.03em]">
          Complete the <Accent>bag</Accent>
        </h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((item) => (
          <div key={item.id} className="h-full *:h-full">
            <ProductCard product={item} />
          </div>
        ))}
      </div>
    </section>
  );
}

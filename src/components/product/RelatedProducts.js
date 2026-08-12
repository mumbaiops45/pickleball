import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/ui/Reveal";
import { relatedProducts } from "@/lib/data";
import { Accent } from "@/components/ui/Heading";

export default function RelatedProducts({ product }) {
  const related = relatedProducts(product, 4);
  if (related.length === 0) return null;

  return (
    <section className="mx-auto w-full max-w-350 border-t border-line px-5 py-14 sm:px-8 lg:py-20">
      <Reveal>
        <span className="flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-volt-deep">
          <span className="h-px w-8 bg-volt-deep/40" />
          Pairs well with
        </span>
        <h2 className="mt-5 text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold tracking-[-0.03em]">
          Complete the <Accent>bag</Accent>
        </h2>
      </Reveal>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((item, index) => (
          <Reveal
            key={item.id}
            delay={(index % 4) * 80}
            className="h-full *:h-full"
          >
            <ProductCard product={item} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}

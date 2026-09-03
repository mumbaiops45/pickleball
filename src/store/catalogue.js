"use client";

import { useCallback, useEffect } from "react";
import { catalogueProducts } from "@/lib/services/catalogue";
import { createMemoryStore, usePersistentStore } from "@/store/persistent";

/**
 * The store's catalogue, for client code that only holds a slug.
 *
 * Pages fetch their own products on the server — that is what renders. This is
 * for the pieces that cannot: a cart line, a saved wishlist id, a past order
 * row, all of which store a slug and need a name, a price and a photo to draw
 * it with. Without it those views silently drop every product that lives in
 * Mongo but not in `data.js`.
 *
 * `data.js` is the starting value, so the first render matches the server and
 * nothing flashes; the fetched catalogue replaces it once it lands. The fetch
 * is shared with the slug -> ObjectId index in `services/catalogue.js`, so a
 * page pays for the product list once at most.
 */

// starts empty and fills from the API; it used to start from the seeded
// catalogue, which showed repo products to anyone whose fetch had not landed
const catalogueStore = createMemoryStore([]);

// module-scoped: one request per page load, however many views ask for it
let requested = false;

/**
 * `enabled` keeps the request off pages with nothing to look up — an empty
 * cart on the about page should not pull the whole catalogue down.
 */
export function useCatalogue(enabled = true) {
  const catalogue = usePersistentStore(catalogueStore);

  useEffect(() => {
    if (!enabled || requested) return;
    requested = true;

    catalogueProducts()
      .then((products) => {
        if (products.length) catalogueStore.set(products);
      })
      .catch(() => {
        // nothing to fall back on now; let the next mount retry
        requested = false;
      });
  }, [enabled]);

  return catalogue;
}

/** Slug -> product, against whichever catalogue has loaded so far. */
export function useProductLookup(enabled = true) {
  const catalogue = useCatalogue(enabled);

  return useCallback(
    (productId) =>
      catalogue.find((product) => product.id === productId) ?? null,
    [catalogue],
  );
}

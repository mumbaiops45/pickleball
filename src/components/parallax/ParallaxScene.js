"use client";

import { useParallax } from "@/hooks/useParallax";

/**
 * Client wrapper that drives every `data-speed` / `data-speed-x` layer inside
 * it. Children stay Server Components — they only declare the data attributes,
 * this boundary does the animating.
 */
export default function ParallaxScene({
  as: Tag = "div",
  pointer = false,
  className = "",
  children,
  ...rest
}) {
  const ref = useParallax({ pointer });

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  );
}

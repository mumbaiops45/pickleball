/**
 * Wraps every route's content and re-mounts on each navigation, so the page
 * gets a short enter animation on every visit. Pure CSS (`.page-enter` in
 * globals.css); no-op under `prefers-reduced-motion`.
 */
export default function Template({ children }) {
  return <div className="page-enter">{children}</div>;
}

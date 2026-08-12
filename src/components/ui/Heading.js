/**
 * Two-tone headings.
 *
 * The hero established the pattern: the sentence sits in ink and the phrase
 * that carries the meaning switches to the brand green. `volt` itself is far
 * too light to read as text on paper (1.2:1), so light surfaces use
 * `volt-deep` (6.1:1) and dark surfaces use `volt` (16.4:1).
 */

export function Accent({ dark = false, children }) {
  return (
    <span className={dark ? "text-volt" : "text-volt-deep"}>{children}</span>
  );
}

/**
 * Highlights `accent` inside a plain string, for headings whose copy lives in
 * data.js. Falls back to the untouched string when the phrase is absent, so a
 * copy edit can never blank out a heading.
 */
export function TwoTone({ text, accent, dark = false }) {
  if (!accent) return text;

  const start = text.indexOf(accent);
  if (start === -1) return text;

  return (
    <>
      {text.slice(0, start)}
      <Accent dark={dark}>{accent}</Accent>
      {text.slice(start + accent.length)}
    </>
  );
}

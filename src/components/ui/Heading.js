

export function Accent({ dark = false, children }) {
  return (
    <span className={dark ? "text-volt" : "text-volt-deep"}>{children}</span>
  );
}


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

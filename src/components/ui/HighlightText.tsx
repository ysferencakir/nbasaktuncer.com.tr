type HighlightTextProps = {
  text: string;
  query?: string;
};

function escapeRegExp(input: string) {
  return input.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function HighlightText({ text, query = "" }: HighlightTextProps) {
  const normalized = query.trim();
  if (!normalized) return <>{text}</>;

  const pattern = new RegExp(`(${escapeRegExp(normalized)})`, "ig");
  const parts = text.split(pattern);

  return (
    <>
      {parts.map((part, index) => {
        const isMatch = part.toLowerCase() === normalized.toLowerCase();
        if (!isMatch) return <span key={`${part}-${index}`}>{part}</span>;

        return (
          <mark key={`${part}-${index}`} className="rounded-sm bg-accent-soft px-0.5 text-ink">
            {part}
          </mark>
        );
      })}
    </>
  );
}

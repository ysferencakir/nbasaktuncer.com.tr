import Image from "next/image";
import Link from "next/link";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";

import { urlForImage } from "@/lib/sanity/image";

type LinkMark = {
  href?: string;
  blank?: boolean;
};

type PortableTextRendererProps = {
  value: PortableTextBlock[] | null | undefined;
};

const components: PortableTextComponents = {
  block: {
    h1: ({ children }) => <h1 className="mt-8 text-3xl font-bold tracking-tight">{children}</h1>,
    h2: ({ children }) => <h2 className="mt-8 text-2xl font-semibold tracking-tight">{children}</h2>,
    h3: ({ children }) => <h3 className="mt-6 text-xl font-semibold">{children}</h3>,
    h4: ({ children }) => <h4 className="mt-6 text-lg font-semibold">{children}</h4>,
    normal: ({ children }) => <p className="mt-4 leading-8 text-ink-muted">{children}</p>,
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-4 border-zinc-300 pl-4 italic text-ink-muted">{children}</blockquote>
    ),
  },
  list: {
    bullet: ({ children }) => <ul className="mt-4 list-disc space-y-2 pl-6 text-ink-muted">{children}</ul>,
    number: ({ children }) => <ol className="mt-4 list-decimal space-y-2 pl-6 text-ink-muted">{children}</ol>,
  },
  marks: {
    link: ({ children, value }) => {
      const mark = value as LinkMark;
      if (!mark?.href) return <>{children}</>;

      const isExternal = mark.href.startsWith("http");
      return (
        <Link
          href={mark.href}
          target={mark.blank || isExternal ? "_blank" : undefined}
          rel={mark.blank || isExternal ? "noopener noreferrer" : undefined}
          className="text-accent underline underline-offset-4 hover:text-accent-hover"
        >
          {children}
        </Link>
      );
    },
  },
  types: {
    image: ({ value }) => {
      const src = urlForImage(value).width(1200).fit("max").auto("format").url();
      const alt = (value as { alt?: string })?.alt ?? "Makale görseli";
      const caption = (value as { caption?: string })?.caption;

      return (
        <figure className="my-8">
          <Image src={src} alt={alt} width={1200} height={675} className="h-auto w-full rounded-xl border border-zinc-200" />
          {caption ? <figcaption className="mt-2 text-sm text-ink-subtle">{caption}</figcaption> : null}
        </figure>
      );
    },
  },
};

export function PortableTextRenderer({ value }: PortableTextRendererProps) {
  if (!value || value.length === 0) return null;
  return <PortableText value={value} components={components} />;
}

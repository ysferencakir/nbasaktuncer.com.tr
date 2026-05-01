import { PortableTextRenderer } from "@/components/portable-text/PortableTextRenderer";
import type { ArticleDetail } from "@/types/sanity";

type ArticleBodyProps = {
  article: ArticleDetail;
};

export function ArticleBody({ article }: ArticleBodyProps) {
  return (
    <section className="w-full max-w-measure">
      <PortableTextRenderer value={article.body} />
    </section>
  );
}

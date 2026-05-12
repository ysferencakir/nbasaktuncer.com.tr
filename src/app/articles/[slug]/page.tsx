import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleBody } from "@/components/article/ArticleBody";
import { ArticlePrevNextNav } from "@/components/article/ArticlePrevNextNav";
import { ReadingProgressBar } from "@/components/article/ReadingProgressBar";
import { RelatedArticles } from "@/components/article/RelatedArticles";
import { TableOfContents } from "@/components/article/TableOfContents";
import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { estimateReadingMinutes, extractTocItems } from "@/lib/content-utils";
import { fetchAdjacentArticlesBySlug, fetchArticleBySlug, fetchRelatedArticles } from "@/lib/queries/articles";
import { urlForImage } from "@/lib/sanity/image";
import { sitePublicUrl } from "@/lib/site-config";

export const revalidate = 60;

type ArticlePageProps = {
  params: Promise<{ slug: string }>;
};

function formatDate(value: string) {
  return new Intl.DateTimeFormat("tr-TR", { day: "2-digit", month: "long", year: "numeric" }).format(new Date(value));
}

export async function generateMetadata({ params }: ArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) {
    return {
      title: "Makale bulunamadı",
      description: "İstenen makale yayında değil veya bulunamadı.",
    };
  }

  return {
    title: article.seoTitle ?? article.title,
    description: article.seoDescription ?? article.excerpt,
  };
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params;
  const article = await fetchArticleBySlug(slug);

  if (!article) notFound();

  const [relatedArticles, adjacent] = await Promise.all([
    fetchRelatedArticles(article._id, article.categories?.map((category) => category.slug) ?? [], 3),
    fetchAdjacentArticlesBySlug(slug),
  ]);
  const coverUrl = article.coverImage ? urlForImage(article.coverImage).width(1400).height(788).fit("crop").url() : null;
  const readingMinutes = estimateReadingMinutes(`${article.title} ${article.excerpt}`);
  const tocItems = extractTocItems(article.body as Array<{ _type: string; [key: string]: unknown }> | null | undefined);
  const articleUrl = `${sitePublicUrl}/articles/${article.slug}`;

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.seoDescription ?? article.excerpt,
    datePublished: article.publishedAt,
    author: {
      "@type": "Person",
      name: article.author?.name ?? "Naciye Başak Tuncer",
    },
    mainEntityOfPage: articleUrl,
    image: coverUrl ?? undefined,
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Ana Sayfa", item: sitePublicUrl },
      { "@type": "ListItem", position: 2, name: "Makaleler", item: `${sitePublicUrl}/articles` },
      { "@type": "ListItem", position: 3, name: article.title, item: articleUrl },
    ],
  };

  return (
    <Container className="space-y-8">
      <ReadingProgressBar />
      <JsonLd data={articleJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />
      <article className="space-y-6">
        <header className="space-y-3 border-b border-[#e8dccf] pb-5 dark:border-[#352b1f]">
          <p className="text-sm font-medium text-ink-subtle">
            {formatDate(article.publishedAt)} · {readingMinutes} dk okuma
          </p>
          <h1 className="max-w-3xl font-serif text-4xl font-bold tracking-tight text-ink">{article.title}</h1>
          <p className="max-w-measure text-sm leading-7 text-ink-muted">{article.excerpt}</p>
          {article.author?.name ? <p className="text-sm text-ink-muted">{article.author.name}</p> : null}
        </header>

        {coverUrl ? (
          <Image
            src={coverUrl}
            alt={article.coverImage?.alt ?? article.title}
            width={1400}
            height={788}
            className="h-auto w-full rounded-2xl border border-[#e7d8c6] object-cover dark:border-[#352b1f]"
            priority
          />
        ) : null}

        <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
          <ArticleBody article={article} />
          <div className="lg:sticky lg:top-24 lg:h-fit">
            <TableOfContents items={tocItems} />
          </div>
        </div>
        <ArticlePrevNextNav newer={adjacent.newer} older={adjacent.older} />
        <RelatedArticles articles={relatedArticles} />
      </article>
    </Container>
  );
}

import Image from "next/image";
import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { fetchAuthors } from "@/lib/queries/authors";
import { urlForImage } from "@/lib/sanity/image";
import { defaultAuthorName } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Hakkında",
  description: "Site ve yazarlar hakkında kısa bilgiler.",
};

export default async function AboutPage() {
  const authors = await fetchAuthors();
  const primaryAuthor = authors[0] ?? null;
  const avatarUrl = primaryAuthor?.image ? urlForImage(primaryAuthor.image).width(240).height(240).fit("crop").url() : null;

  return (
    <Container className="space-y-10">
      <section className="space-y-3 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Hakkında</h1>
        <p className="mx-auto max-w-measure text-sm leading-7 text-ink-muted">
          Bu platform, Sanity Studio üzerinden kolay içerik üretimi için tasarlandı. İlk hedef; makale oluşturma, listeleme ve
          detay sayfası akışını sade ama güçlü bir yapı ile sunmak.
        </p>
      </section>

      <section className="mx-auto w-full max-w-2xl rounded-2xl border border-[#e7d8c6] bg-surface-card p-8 text-center shadow-[0_2px_12px_rgba(66,42,20,0.05)]">
        <h2 className="text-lg font-semibold uppercase tracking-[0.16em] text-accent">Yazar</h2>
        {primaryAuthor ? (
          <div className="mt-5 space-y-4">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={primaryAuthor.image?.alt ?? primaryAuthor.name}
                width={120}
                height={120}
                className="mx-auto h-28 w-28 rounded-full border border-[#dcc8b3] object-cover"
              />
            ) : (
              <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-[#dcc8b3] bg-surface-muted text-2xl font-semibold text-ink">
                {primaryAuthor.name.charAt(0)}
              </div>
            )}
            <p className="text-2xl font-semibold tracking-tight">{primaryAuthor.name}</p>
            <p className="mx-auto max-w-measure text-sm leading-7 text-ink-muted">
              {primaryAuthor.bio ??
                "Bu alanda yazarın kısa biyografisi yer alır. Şu anda tek yazarlık yapısı ile sade bir içerik deneyimi sunulur."}
            </p>
          </div>
        ) : (
          <div className="mt-5 space-y-3">
            <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-[#dcc8b3] bg-surface-muted text-2xl font-semibold text-ink">
              {defaultAuthorName.charAt(0)}
            </div>
            <p className="text-2xl font-semibold tracking-tight">{defaultAuthorName}</p>
            <p className="text-sm text-ink-muted">Sanity üzerinden yazar profili eklendiğinde burada otomatik gösterilecektir.</p>
          </div>
        )}
      </section>
    </Container>
  );
}

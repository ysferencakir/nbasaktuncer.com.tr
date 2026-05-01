import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { fetchAuthors } from "@/lib/queries/authors";

export const metadata: Metadata = {
  title: "Hakkında",
  description: "Site ve yazarlar hakkında kısa bilgiler.",
};

export default async function AboutPage() {
  const authors = await fetchAuthors();

  return (
    <Container className="space-y-8">
      <section className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight">Hakkında</h1>
        <p className="max-w-measure text-sm leading-7 text-ink-muted">
          Bu platform, Sanity Studio üzerinden kolay içerik üretimi için tasarlandı. İlk hedef; makale oluşturma, listeleme ve
          detay sayfası akışını sade ama güçlü bir yapı ile sunmak.
        </p>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Yazarlar</h2>
        {authors.length === 0 ? (
          <p className="text-sm text-ink-muted">Henüz yazar bilgisi eklenmedi.</p>
        ) : (
          <ul className="space-y-3">
            {authors.map((author) => (
              <li key={author._id} className="rounded-lg border border-zinc-200 bg-white p-4">
                <p className="font-medium">{author.name}</p>
                {author.bio ? <p className="mt-1 text-sm text-ink-muted">{author.bio}</p> : null}
              </li>
            ))}
          </ul>
        )}
      </section>
    </Container>
  );
}

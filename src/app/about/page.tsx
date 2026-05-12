import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";

import { JsonLd } from "@/components/seo/JsonLd";
import { Container } from "@/components/ui/Container";
import { fetchAuthors } from "@/lib/queries/authors";
import { urlForImage } from "@/lib/sanity/image";
import { defaultAuthorName, sitePublicUrl } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Hakkında",
  description: "N. Başak Tuncer — Hacettepe Üniversitesi Uluslararası İlişkiler öğrencisi, araştırmacı ve yazar.",
};

const experience = [
  {
    org: "Ankara Kriz ve Siyaset Araştırmaları Merkezi (ANKASAM)",
    role: "Stajyer",
    period: "Mart 2026 – Devam ediyor",
  },
  {
    org: "Hacettepe University Model United Nations Society (HUMUN)",
    role: "Başkan Yardımcısı",
    period: "Haziran 2025 – Devam ediyor",
  },
  {
    org: "HUMUN",
    role: "Akademik Departman Direktörü",
    period: "Haziran 2024 – Haziran 2025",
  },
  {
    org: "MUNTurkeycom",
    role: "Tutor",
    period: "Aralık 2022 – Devam ediyor",
  },
  {
    org: "EUROPolitika",
    role: "Stajyer",
    period: "Eylül 2023 – Ocak 2024",
  },
];

const education = [
  {
    school: "Hacettepe Üniversitesi",
    degree: "Lisans, Uluslararası İlişkiler",
    period: "Ekim 2023 – Haziran 2027",
  },
  {
    school: "Europa-Universität Viadrina Frankfurt (Oder)",
    degree: "Erasmus+, Cultural and Social Studies",
    period: "Ekim 2025 – Mart 2026",
  },
  {
    school: "İbrahim Cinkaya Sosyal Bilimler Lisesi",
    degree: "Lise Diploması",
    period: "",
  },
];

const skills = ["Akademik Araştırma", "Kamuoyu Konuşmaları", "Staj Deneyimi"];
const languages = [
  { name: "İngilizce", level: "Ana dil düzeyinde" },
  { name: "Almanca", level: "Başlangıç" },
];

export default async function AboutPage() {
  const authors = await fetchAuthors();
  const primaryAuthor = authors[0] ?? null;
  const avatarUrl = primaryAuthor?.image ? urlForImage(primaryAuthor.image).width(240).height(240).fit("crop").url() : null;
  const personName = primaryAuthor?.name ?? defaultAuthorName;

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: personName,
    description: primaryAuthor?.bio ?? "Uluslararası İlişkiler Öğrencisi",
    image: avatarUrl ?? undefined,
    url: `${sitePublicUrl}/about`,
    sameAs: ["https://www.linkedin.com/in/n-ba%C5%9Fak-tuncer-064a72272/"],
  };

  return (
    <Container className="space-y-12">
      <JsonLd data={personJsonLd} />

      {/* Hero */}
      <section className="flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={primaryAuthor?.image?.alt ?? personName}
            width={120}
            height={120}
            className="h-28 w-28 shrink-0 rounded-full border border-[#dcc8b3] object-cover shadow-md dark:border-[#352b1f]"
          />
        ) : (
          <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-[#dcc8b3] bg-surface-muted text-3xl font-semibold text-ink dark:border-[#352b1f]">
            {personName.charAt(0)}
          </div>
        )}
        <div className="space-y-2">
          <h1 className="font-serif text-4xl font-bold tracking-tight text-ink">{personName}</h1>
          <p className="text-base text-ink-muted">Uluslararası İlişkiler Öğrencisi · Hacettepe Üniversitesi</p>
          <p className="text-sm text-ink-subtle">Ankara, Türkiye</p>
          <div className="flex flex-wrap justify-center gap-3 pt-2 sm:justify-start">
            <Link
              href="https://www.linkedin.com/in/n-ba%C5%9Fak-tuncer-064a72272/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[#0A66C2] px-4 py-2 text-sm font-medium text-white transition hover:bg-[#0958a8]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
              LinkedIn
            </Link>
            <Link
              href="/articles"
              className="inline-flex items-center rounded-md border border-[#dcc8b3] px-4 py-2 text-sm font-medium text-ink transition hover:border-accent hover:text-accent dark:border-[#352b1f]"
            >
              Yazılarım
            </Link>
          </div>
        </div>
      </section>

      {/* Bio */}
      {primaryAuthor?.bio ? (
        <section className="rounded-2xl border border-[#e7d8c6] bg-surface-card p-7 dark:border-[#352b1f]">
          <h2 className="font-serif text-xl font-semibold text-ink">Hakkında</h2>
          <p className="mt-3 text-sm leading-7 text-ink-muted">{primaryAuthor.bio}</p>
        </section>
      ) : null}

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Deneyim */}
        <section className="space-y-4">
          <h2 className="font-serif text-xl font-semibold tracking-tight text-ink">Deneyim</h2>
          <div className="space-y-3">
            {experience.map((item, i) => (
              <div key={i} className="rounded-xl border border-[#e7d8c6] bg-surface-card px-5 py-4 dark:border-[#352b1f]">
                <p className="text-sm font-semibold text-ink">{item.role}</p>
                <p className="mt-0.5 text-sm text-accent">{item.org}</p>
                <p className="mt-1 text-xs text-ink-subtle">{item.period}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="space-y-8">
          {/* Eğitim */}
          <section className="space-y-4">
            <h2 className="font-serif text-xl font-semibold tracking-tight text-ink">Eğitim</h2>
            <div className="space-y-3">
              {education.map((item, i) => (
                <div key={i} className="rounded-xl border border-[#e7d8c6] bg-surface-card px-5 py-4 dark:border-[#352b1f]">
                  <p className="text-sm font-semibold text-ink">{item.school}</p>
                  <p className="mt-0.5 text-sm text-ink-muted">{item.degree}</p>
                  {item.period ? <p className="mt-1 text-xs text-ink-subtle">{item.period}</p> : null}
                </div>
              ))}
            </div>
          </section>

          {/* Beceriler & Diller */}
          <section className="space-y-4">
            <h2 className="font-serif text-xl font-semibold tracking-tight text-ink">Beceriler & Diller</h2>
            <div className="rounded-xl border border-[#e7d8c6] bg-surface-card px-5 py-4 dark:border-[#352b1f]">
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <span key={skill} className="rounded-full border border-[#e2d3c1] bg-surface-muted px-3 py-1 text-xs font-medium text-ink-muted dark:border-[#352b1f]">
                    {skill}
                  </span>
                ))}
              </div>
              <div className="mt-4 space-y-1.5">
                {languages.map((lang) => (
                  <div key={lang.name} className="flex items-center justify-between text-sm">
                    <span className="font-medium text-ink">{lang.name}</span>
                    <span className="text-xs text-ink-subtle">{lang.level}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </Container>
  );
}

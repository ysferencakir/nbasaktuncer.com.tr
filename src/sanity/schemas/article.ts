import { defineArrayMember, defineField, defineType } from "sanity";

const portableTextBlocks = defineField({
  name: "body",
  title: "Makale metni",
  type: "array",
  description:
    "Word benzeri düzenleyici: başlık, paragraf, kalın/italik, liste, link, alıntı ve görsel ekleyebilirsiniz.",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Paragraf", value: "normal" },
        { title: "Başlık 1", value: "h1" },
        { title: "Başlık 2", value: "h2" },
        { title: "Başlık 3", value: "h3" },
        { title: "Başlık 4", value: "h4" },
        { title: "Alıntı", value: "blockquote" },
      ],
      lists: [
        { title: "Madde işaretli liste", value: "bullet" },
        { title: "Numaralı liste", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Kalın", value: "strong" },
          { title: "İtalik", value: "em" },
          { title: "Kod", value: "code" },
        ],
        annotations: [
          defineArrayMember({
            name: "link",
            type: "object",
            title: "Link",
            fields: [
              defineField({
                name: "href",
                title: "Adres (URL)",
                type: "url",
                validation: (Rule) => Rule.required().uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
              }),
              defineField({
                name: "blank",
                title: "Yeni sekmede aç",
                type: "boolean",
                initialValue: true,
              }),
            ],
          }),
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      title: "Görsel",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternatif metin",
          description: "Görseli tarif edin (SEO ve erişilebilirlik).",
          validation: (Rule) => Rule.required().min(3).max(200),
        }),
        defineField({
          name: "caption",
          type: "string",
          title: "Altyazı",
          description: "İsteğe bağlı; görsel altında küçük yazı olarak gösterilir.",
        }),
      ],
    }),
    defineArrayMember({
      name: "tipBox",
      type: "object",
      title: "İpucu kutusu",
      fields: [
        defineField({
          name: "title",
          type: "string",
          title: "Başlık",
          initialValue: "İpucu",
          validation: (Rule) => Rule.required().min(2).max(80),
        }),
        defineField({
          name: "text",
          type: "text",
          rows: 3,
          title: "İçerik",
          validation: (Rule) => Rule.required().min(10).max(500),
        }),
      ],
    }),
    defineArrayMember({
      name: "quoteCard",
      type: "object",
      title: "Alıntı kartı",
      fields: [
        defineField({
          name: "quote",
          type: "text",
          rows: 3,
          title: "Alıntı",
          validation: (Rule) => Rule.required().min(10).max(500),
        }),
        defineField({
          name: "source",
          type: "string",
          title: "Kaynak",
          description: "Istege bagli: alintinin sahibi veya kaynak bilgisi.",
        }),
      ],
    }),
  ],
  validation: (Rule) => Rule.required().min(1),
});

export default defineType({
  name: "article",
  title: "Makale",
  type: "document",
  groups: [
    { name: "content", title: "İçerik", default: true },
    { name: "meta", title: "Yayın ve SEO" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Başlık",
      type: "string",
      group: "content",
      description: "Makalenin ana başlığı; arama sonuçlarında da kullanılabilir.",
      validation: (Rule) => Rule.required().min(3).max(200),
    }),
    defineField({
      name: "slug",
      title: "URL adresi (slug)",
      type: "slug",
      group: "content",
      description: "Örnek: /articles/yazi-basligi — başlıktan otomatik üretilebilir.",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Özet",
      type: "text",
      group: "content",
      rows: 3,
      description: "Liste ve önizleme kartlarında gösterilir. 1–2 cümle yeterlidir.",
      validation: (Rule) => Rule.required().max(400),
    }),
    defineField({
      name: "coverImage",
      title: "Kapak görseli",
      type: "image",
      group: "content",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternatif metin",
          validation: (Rule) => Rule.required().min(3).max(200),
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    portableTextBlocks,
    defineField({
      name: "author",
      title: "Yazar",
      type: "reference",
      group: "content",
      to: [{ type: "author" }],
      description: "Bu yazının imzası.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Kategoriler",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "reference", to: [{ type: "category" }] })],
      description: "Birden fazla kategori seçebilirsiniz.",
      validation: (Rule) => Rule.unique(),
    }),
    defineField({
      name: "publishedAt",
      title: "Yayın tarihi ve saati",
      type: "datetime",
      group: "meta",
      description: "Listelerde sıralama için kullanılır.",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "status",
      title: "Yayın durumu",
      type: "string",
      group: "meta",
      description: "Taslak: sitede görünmez. Yayında: ziyaretçilere açıktır.",
      options: {
        list: [
          { title: "Taslak", value: "draft" },
          { title: "Yayında", value: "published" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "featuredRank",
      title: "Editör seçkisi sırası",
      type: "number",
      group: "meta",
      description: "Ana sayfadaki Editör Seçkisi için isteğe bağlı sıra değeri (1 en yüksek).",
      validation: (Rule) => Rule.min(1).max(20).integer(),
    }),
    defineField({
      name: "seoTitle",
      title: "SEO başlığı",
      type: "string",
      group: "meta",
      description: "İsteğe bağlı. Boşsa makale başlığı kullanılır.",
      validation: (Rule) => Rule.max(70),
    }),
    defineField({
      name: "seoDescription",
      title: "SEO açıklaması",
      type: "text",
      group: "meta",
      rows: 3,
      description: "İsteğe bağlı. Boşsa özet kullanılır.",
      validation: (Rule) => Rule.max(200),
    }),
  ],
  preview: {
    select: {
      title: "title",
      date: "publishedAt",
      status: "status",
      media: "coverImage",
    },
    prepare({ title, date, status, media }) {
      const d = date ? new Date(date).toLocaleDateString("tr-TR") : "";
      const st = status === "published" ? "Yayında" : "Taslak";
      return {
        title: title || "Başlıksız",
        subtitle: [d, st].filter(Boolean).join(" · "),
        media,
      };
    },
  },
});

import { defineField, defineType } from "sanity";

export default defineType({
  name: "category",
  title: "Kategori",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Başlık",
      type: "string",
      description: "Kategori adı (örn. “Deneme”, “Günlük”).",
      validation: (Rule) => Rule.required().min(2).max(80),
    }),
    defineField({
      name: "slug",
      title: "URL adresi (slug)",
      type: "slug",
      description: "Adres çubuğunda kullanılır; boşluk yerine tire kullanılır.",
      options: {
        source: "title",
        maxLength: 96,
        slugify: (input) =>
          input
            .toLowerCase()
            .trim()
            .replace(/\s+/g, "-")
            .replace(/[^\w-]+/g, "")
            .slice(0, 96),
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
    prepare({ title, subtitle }) {
      return { title: title || "Kategori", subtitle: subtitle ? `/${subtitle}` : "" };
    },
  },
});

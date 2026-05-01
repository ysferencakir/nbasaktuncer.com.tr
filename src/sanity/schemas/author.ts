import { defineField, defineType } from "sanity";

export default defineType({
  name: "author",
  title: "Yazar",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Ad soyad",
      type: "string",
      description: "Sitede görünecek yazar adı.",
      validation: (Rule) => Rule.required().min(2).max(120),
    }),
    defineField({
      name: "bio",
      title: "Biyografi",
      type: "text",
      rows: 4,
      description: "Kısa tanıtım metni (hakkında sayfasında kullanılabilir).",
      validation: (Rule) => Rule.max(2000),
    }),
    defineField({
      name: "image",
      title: "Fotoğraf",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({
          name: "alt",
          type: "string",
          title: "Alternatif metin",
          description: "Erişilebilirlik için kısa açıklama.",
        }),
      ],
    }),
  ],
  preview: {
    select: { title: "name", media: "image" },
    prepare({ title, media }) {
      return { title: title || "İsimsiz yazar", media };
    },
  },
});

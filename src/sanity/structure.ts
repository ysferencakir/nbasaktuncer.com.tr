import type { StructureResolver } from "sanity/structure";

/**
 * Studio sol menüsü: teknik kullanıcıyı yormayan sade yapı.
 */
export const structure: StructureResolver = (S) =>
  S.list()
    .title("İçerik")
    .items([
      S.listItem()
        .title("Makaleler")
        .schemaType("article")
        .child(S.documentTypeList("article").title("Makaleler").defaultOrdering([{ field: "publishedAt", direction: "desc" }])),
      S.listItem()
        .title("Kategoriler")
        .schemaType("category")
        .child(S.documentTypeList("category").title("Kategoriler").defaultOrdering([{ field: "title", direction: "asc" }])),
      S.listItem()
        .title("Yazarlar")
        .schemaType("author")
        .child(S.documentTypeList("author").title("Yazarlar").defaultOrdering([{ field: "name", direction: "asc" }])),
    ]);

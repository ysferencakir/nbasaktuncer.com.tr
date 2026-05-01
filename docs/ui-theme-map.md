# Warm Editorial Theme Map

Bu dokuman, tema tokenlarinin hangi UI parcalarinda kullanildigini hizlica gosterir.

## Color Tokens

- `surface.DEFAULT`: Sayfa arka plani
- `surface.muted`: Kategori etiketleri, ikincil bloklar
- `surface.card`: Kartlar, header/footer yuzeyi
- `ink.DEFAULT`: Basliklar ve birincil metin
- `ink.muted`: Govde metni
- `ink.subtle`: Tarih ve ikincil metin
- `accent.DEFAULT`: Birincil aksiyon rengi
- `accent.hover`: Buton hover durumu
- `accent.soft`: Secim/vurgu arka plani

## Component Mapping

- Header: `surface.card`, `ink`, `accent`
- Footer: `surface.card`, `ink.muted`
- Featured Article: `surface.card`, `accent`, `ink`
- Article Card: `surface.card`, `surface.muted`, `ink`, `accent`
- Article Body/Detail Header: `ink`, `ink.muted`, `ink.subtle`

## Typography Notes

- Basliklar: daha guclu kontrast, sikistirilmis tracking (`tracking-tight`)
- Govde metni: `leading-7` ile okunabilir satir araligi
- Meta metin: kucuk puntoda ama dusuk kontrastli olmayan ton

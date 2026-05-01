# Studio Subdomain Migration Plan

Hedef: Studio'yu ana siteden ayirarak `studio.nbasaktuncer.com.tr` uzerinden yayina almak.

## Current State

- Studio route: `/studio`
- Header baglantisi varsayilan olarak `/studio`
- `NEXT_PUBLIC_STUDIO_URL` env tanimliysa header baglantisi bu adrese gider

## Migration Steps

1. Vercel'de `studio.nbasaktuncer.com.tr` domainini projeye ekle.
2. DNS'te `studio` icin CNAME kaydini Vercel hedefiyle eslestir.
3. Vercel env'e ekle:
   - `NEXT_PUBLIC_STUDIO_URL=https://studio.nbasaktuncer.com.tr`
4. Yeni deployment al.
5. Header'daki Studio butonunun yeni subdomain'e gittigini dogrula.

## Access Model

- URL public olur.
- Icerik duzenleme yalnizca Sanity login ile yapilir.

## Optional Hardening (Future)

- Vercel Authentication ekleme
- Basic Auth reverse proxy
- IP allowlist

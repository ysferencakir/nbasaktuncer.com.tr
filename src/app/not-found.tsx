import Link from "next/link";

import { Container } from "@/components/ui/Container";

export default function NotFound() {
  return (
    <Container className="py-20 text-center">
      <h1 className="text-3xl font-bold tracking-tight">Sayfa bulunamadı</h1>
      <p className="mt-3 text-sm text-ink-muted">Bağlantı hatalı olabilir veya içerik yayından kaldırılmış olabilir.</p>
      <Link href="/" className="mt-6 inline-flex rounded-md bg-ink px-4 py-2 text-sm font-medium text-white hover:bg-zinc-800">
        Ana sayfaya dön
      </Link>
    </Container>
  );
}

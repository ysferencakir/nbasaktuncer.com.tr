import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-zinc-200 bg-white">
      <Container className="py-8 text-sm text-ink-muted">
        <p>Sanity + Next.js ile oluşturuldu. Bu temel yapı ileride görsel bloklar ve animasyonlar için genişletilebilir.</p>
      </Container>
    </footer>
  );
}

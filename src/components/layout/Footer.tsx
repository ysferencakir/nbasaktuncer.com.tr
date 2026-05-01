import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[#e8dccf] bg-surface-card">
      <Container className="py-8 text-sm leading-7 text-ink-muted">
        <p>Sanity + Next.js ile oluşturuldu. Bu temel yapı ileride görsel bloklar ve animasyonlar için genişletilebilir.</p>
      </Container>
    </footer>
  );
}

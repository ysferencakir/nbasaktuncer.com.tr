import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="mt-16 border-t border-[#e8dccf] bg-surface-card dark:border-[#352b1f]">
      <Container className="py-8 text-sm leading-7 text-ink-muted">
        <p>© 2026 N. Başak Tuncer · Yusuf Eren Çakır tarafından sevgiyle hazırlandı</p>
      </Container>
    </footer>
  );
}

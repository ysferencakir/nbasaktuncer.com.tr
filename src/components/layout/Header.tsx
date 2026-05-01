import Link from "next/link";

import { Container } from "@/components/ui/Container";
import { isExternalUrl, studioPublicUrl } from "@/lib/site-config";

const navItems = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/articles", label: "Makaleler" },
  { href: "/about", label: "Hakkında" },
];

export function Header() {
  const studioIsExternal = isExternalUrl(studioPublicUrl);

  return (
    <header className="border-b border-[#e8dccf] bg-surface-card/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="text-base font-semibold tracking-tight text-ink hover:text-accent">
          Makale Platformu
        </Link>
        <nav className="flex items-center gap-5 text-sm text-ink-muted">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-accent">
              {item.label}
            </Link>
          ))}
          <Link
            href={studioPublicUrl}
            target={studioIsExternal ? "_blank" : undefined}
            rel={studioIsExternal ? "noopener noreferrer" : undefined}
            className="rounded-md border border-[#dcc8b3] bg-[#fff9f1] px-3 py-1.5 font-medium text-ink hover:border-accent"
          >
            Studio
          </Link>
        </nav>
      </Container>
    </header>
  );
}

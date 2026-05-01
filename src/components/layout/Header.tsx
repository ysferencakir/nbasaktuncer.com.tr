import Link from "next/link";

import { Container } from "@/components/ui/Container";

const navItems = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/articles", label: "Makaleler" },
  { href: "/about", label: "Hakkında" },
];

export function Header() {
  return (
    <header className="border-b border-zinc-200 bg-white">
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
          <Link href="/studio" className="rounded-md border border-zinc-300 px-3 py-1.5 font-medium text-ink hover:border-accent">
            Studio
          </Link>
        </nav>
      </Container>
    </header>
  );
}

import Image from "next/image";
import Link from "next/link";
import logo from "../../../N.Başak Tuncer.svg";

import { Container } from "@/components/ui/Container";

const navItems = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/articles", label: "Makaleler" },
  { href: "/about", label: "Hakkında" },
];

export function Header() {
  return (
    <header className="border-b border-[#e8dccf] bg-surface-card/80 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-base font-semibold tracking-tight text-ink hover:text-accent">
          <Image src={logo} alt="N. Başak Tuncer logo" width={28} height={28} className="h-7 w-7 rounded-sm object-contain" />
          <span>N. Başak Tuncer</span>
        </Link>
        <nav className="flex items-center gap-5 text-sm text-ink-muted">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-accent">
              {item.label}
            </Link>
          ))}
        </nav>
      </Container>
    </header>
  );
}

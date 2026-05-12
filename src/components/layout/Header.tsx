import Image from "next/image";
import Link from "next/link";
import logo from "../../../N.Başak Tuncer.svg";
import logoDark from "../../../N.Başak Tuncer-white.svg";

import { Container } from "@/components/ui/Container";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navItems = [
  { href: "/", label: "Ana Sayfa" },
  { href: "/articles", label: "Makaleler" },
  { href: "/about", label: "Hakkında" },
];

export function Header() {
  return (
    <header className="border-b border-[#e8dccf] bg-surface-card/80 backdrop-blur dark:border-[#352b1f]">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center text-ink hover:text-accent">
          <Image src={logo} alt="N. Başak Tuncer logo" width={400} height={200} className="h-[150px] w-[300px] object-contain dark:hidden" />
          <Image src={logoDark} alt="N. Başak Tuncer logo" width={400} height={200} className="hidden h-[150px] w-[300px] object-contain dark:block" />
        </Link>
        <nav className="flex items-center gap-5 text-sm text-ink-muted">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-accent">
              {item.label}
            </Link>
          ))}
          <ThemeToggle />
        </nav>
      </Container>
    </header>
  );
}

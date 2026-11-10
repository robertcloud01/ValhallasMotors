"use client";

import { Icon } from "@/components/editorial/Icon";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, useState } from "react";

const pages = [
  { href: "/estoque", label: "Coleção" },
  { href: "/sobre", label: "O projeto" },
  { href: "/contato", label: "Contato" },
];

export function BrandMark() {
  return (
    <span className="vm-brand">
      <svg viewBox="0 0 44 40" width="40" height="36" aria-hidden="true" fill="none">
        <path d="M3 5h8l12 23L35 5h6L22 36 3 5Z" fill="currentColor" />
        <path d="m16 5 7 13 7-13" stroke="currentColor" strokeWidth="1.5" />
      </svg>
      <span>VALHALLAS<small>MOTORS</small></span>
    </span>
  );
}

export function Header() {
  const pathname = usePathname();
  const button = useRef<HTMLButtonElement>(null);
  const [openForPath, setOpenForPath] = useState<string | null>(null);
  const open = openForPath === pathname;

  return (
    <header className="vm-header" onKeyDown={(event) => {
      if (event.key === "Escape" && open) {
        setOpenForPath(null);
        button.current?.focus();
      }
    }}>
      <div className="vm-wrap vm-header-inner">
        <Link href="/" aria-label="Valhallas Motors, início" onClick={() => setOpenForPath(null)}><BrandMark /></Link>
        <button
          ref={button}
          type="button"
          className="vm-menu"
          aria-expanded={open}
          aria-controls="vm-navigation"
          onClick={() => setOpenForPath(open ? null : pathname)}
        >
          {open ? "Fechar" : "Menu"} <Icon name={open ? "close" : "menu"} />
        </button>
        <nav id="vm-navigation" aria-label="Principal" data-open={open}>
          {pages.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href || pathname.startsWith(href + "/") ? "page" : undefined}
              onClick={() => setOpenForPath(null)}
            >{label}</Link>
          ))}
        </nav>
        <Link className="vm-header-cta" href="/estoque">Explorar coleção <span aria-hidden="true"><Icon /></span></Link>
      </div>
    </header>
  );
}

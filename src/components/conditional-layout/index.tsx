"use client";

import { usePathname } from "next/navigation";
import { Header } from "../header";

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();

  const noHeaderPages = ["/", "/signup"];
  const shouldShowHeader = !noHeaderPages.includes(pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      {children}
    </>
  );
}

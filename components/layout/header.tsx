"use client";

import Link from "next/link";

import { Menu } from "lucide-react";

import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { mainNav } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-zinc-800 dark:bg-zinc-950/95 dark:supports-[backdrop-filter]:bg-zinc-950/60">
      <div className="container flex h-16 items-center">
        {/* Desktop Navigation */}
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold text-xl">{siteConfig.name}</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-zinc-900 dark:hover:text-zinc-50 text-zinc-600 dark:text-zinc-400"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>

        {/* Mobile Menu */}
        <Sheet>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left">
            <SheetHeader>
              <SheetTitle>{siteConfig.name}</SheetTitle>
            </SheetHeader>
            <nav className="mt-6 flex flex-col space-y-3">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium transition-colors hover:text-zinc-900 dark:hover:text-zinc-50 text-zinc-600 dark:text-zinc-400"
                >
                  {item.title}
                </Link>
              ))}
            </nav>
          </SheetContent>
        </Sheet>

        {/* Logo for Mobile */}
        <Link
          href="/"
          className="flex items-center space-x-2 md:hidden ml-2 flex-1"
        >
          <span className="font-bold text-xl">{siteConfig.name}</span>
        </Link>

        <div className="flex flex-1 items-center justify-end space-x-2 md:flex-none">
          <nav className="flex items-center">
            <ThemeToggle />
          </nav>
        </div>
      </div>
    </header>
  );
}

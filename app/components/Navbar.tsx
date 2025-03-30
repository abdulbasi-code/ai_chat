"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const routes = [
  { title: "Home", href: "/" },
  { title: "About", href: "/#about" },
  { title: "Projects", href: "/#projects" },
  { title: "Skills", href: "/#skills" },
  { title: "Contact", href: "/#contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("/");

  // Function to check if a path is active (includes the hash part)
  const isActive = (href: string) => {
    if (href === "/") return pathname === "/" && !activeSection.includes("#");
    return activeSection === href;
  };

  // Update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = routes.map((route) => {
        if (route.href === "/") return { id: "top", href: route.href };
        const id = route.href.split("#")[1];
        return { id, href: route.href };
      });

      const currentSection = sections.find((section) => {
        if (section.id === "top") return window.scrollY < 100;
        const element = document.getElementById(section.id);
        if (!element) return false;

        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      });

      if (currentSection) {
        setActiveSection(currentSection.href);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div className="container flex h-16 items-center justify-between">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="flex items-center gap-2"
        >
          <Link href="/" className="font-bold text-xl ml-4">
            <span className="text-primary">AA</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex">
          <NavigationMenuList>
            {routes.map((route, index) => (
              <motion.div
                key={route.href}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              >
                <NavigationMenuItem>
                  <Link href={route.href} legacyBehavior passHref>
                    <NavigationMenuLink
                      className={cn(
                        navigationMenuTriggerStyle(),
                        isActive(route.href) &&
                          "text-blue-500 hover:text-blue-500 font-semibold"
                      )}
                    >
                      {route.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              </motion.div>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* Mobile Navigation */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="p-0">
            <div className="flex flex-col h-full bg-gradient-to-b from-background to-background/95">
              <div className="p-6 border-b">
                <Link
                  href="/"
                  className="font-bold text-xl inline-block"
                  onClick={() => setOpen(false)}
                >
                  <span className="text-primary">Your</span>Name
                </Link>
              </div>
              <nav className="flex flex-col p-6 space-y-6">
                {routes.map((route, index) => (
                  <motion.div
                    key={route.href}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.1 * index, duration: 0.3 }}
                  >
                    <Link
                      href={route.href}
                      className={cn(
                        "text-lg font-medium transition-all hover:text-primary flex items-center",
                        isActive(route.href)
                          ? "text-primary font-semibold"
                          : "text-muted-foreground"
                      )}
                      onClick={() => setOpen(false)}
                    >
                      {route.title}
                      {isActive(route.href) && (
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full bg-primary ml-2"
                          layoutId="activeIndicator"
                        />
                      )}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="mt-auto p-6 border-t">
                <div className="text-sm text-muted-foreground">
                  © {new Date().getFullYear()} Your Portfolio
                </div>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </motion.header>
  );
}

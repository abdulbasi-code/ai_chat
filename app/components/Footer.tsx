import Link from "next/link";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="bg-background py-6 md:py-12">
      <div className="container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-8">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/" className="font-bold text-xl">
              <span className="text-primary">Your</span>Name
            </Link>
            <p className="text-muted-foreground mt-1 text-center md:text-left">
              Frontend Developer with Backend Experience
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              GitHub
            </Link>
            <Link
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              LinkedIn
            </Link>
            <Link
              href="mailto:your.email@example.com"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Email
            </Link>
          </div>
        </div>

        <Separator className="my-6" />

        <div className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} YourName. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

import { Button } from "@/components/ui/button";
import { Link, Outlet, useRouter } from "@tanstack/react-router";
import { BookOpen, Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { to: "/quran", label: "Quran" },
  { to: "/hadith", label: "Hadith" },
  { to: "/prayer", label: "Prayer Times" },
  { to: "/calendar", label: "Calendar" },
  { to: "/knowledge", label: "Knowledge" },
];

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const router = useRouter();
  const currentPath = router.state.location.pathname;

  return (
    <header className="sticky top-0 z-50 w-full bg-forest-dark shadow-md">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Brand */}
        <Link
          to="/"
          className="flex items-center gap-2 text-white hover:opacity-90 transition-opacity"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gold text-forest-darker">
            <BookOpen className="h-5 w-5" />
          </div>
          <span className="font-serif text-xl font-bold tracking-wide text-white">
            Al-<span className="text-gold">Ilm</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav
          className="hidden md:flex items-center gap-1"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              data-ocid={`nav.${link.label.toLowerCase().replace(" ", "-")}.link`}
              className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
                currentPath === link.to
                  ? "text-gold"
                  : "text-white/80 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            asChild
            data-ocid="nav.start_learning.button"
            className="rounded-full bg-gold text-forest-darker font-semibold hover:bg-gold-light transition-colors px-5"
          >
            <Link to="/quran">Start Learning</Link>
          </Button>
        </div>

        {/* Mobile menu */}
        <button
          type="button"
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-forest-darker px-4 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMenuOpen(false)}
              className="block py-3 text-white/80 hover:text-gold border-b border-white/10 last:border-0 font-medium"
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  const utmLink = `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`;

  return (
    <footer className="bg-forest-darker text-white/80 mt-auto">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gold text-forest-darker">
                <BookOpen className="h-4 w-4" />
              </div>
              <span className="font-serif text-lg font-bold text-white">
                Al-<span className="text-gold">Ilm</span>
              </span>
            </div>
            <p className="text-sm text-white/60 leading-relaxed">
              Authentic Islamic knowledge for the modern Muslim.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">
              Learn
            </h4>
            <ul className="space-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-white/60 hover:text-gold transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">
              Resources
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>Quran Translation</li>
              <li>Hadith Collections</li>
              <li>Islamic Calendar</li>
              <li>Prayer Schedule</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3 text-sm uppercase tracking-wider">
              Topics
            </h4>
            <ul className="space-y-2 text-sm text-white/60">
              <li>Aqeedah</li>
              <li>Fiqh</li>
              <li>Seerah</li>
              <li>Tafseer</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center text-sm text-white/40">
          © {year}. Built with ❤️ using{" "}
          <a
            href={utmLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gold hover:underline"
          >
            caffeine.ai
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

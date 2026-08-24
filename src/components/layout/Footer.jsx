import { Link } from "react-router-dom";
import logo from "@assets/logo.png";

const footerLinks = [
  { label: "Privacy Policy", to: "/legal?tab=privacy" },
  { label: "Terms of Service", to: "/legal?tab=terms" },
  { label: "Contact Support", to: "/contact" },
  { label: "Partner with Us", to: "/contact" },
  { label: "Careers", to: "/contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0C0E11] px-4 py-8 text-[#c8c7b8] sm:px-6">
      <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div className="flex flex-col gap-3">
          <Link to="/" className="inline-flex w-fit items-center">
            <img src={logo} alt="Derby" className="h-8 w-auto object-contain" />
          </Link>
          <p className="text-sm text-[#b8b7a8]">
            &copy; 2026 Derby Sports Ecosystem. All Rights Reserved.
          </p>
        </div>

        <nav className="flex flex-wrap gap-x-7 gap-y-3 font-mono text-[11px] tracking-[0.08em] text-[#a9a897]">
          {footerLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className="transition-colors duration-200 hover:text-[#c8f13a]"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}

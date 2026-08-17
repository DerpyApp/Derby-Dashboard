import logo from '../assets/logo.png';

export default function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo Section */}
          <div className="flex items-center">
            <img src={logo} alt="Derby Logo" className="h-8" />
          </div>

          {/* Center - Empty for balance */}
          <div></div>

          {/* Links Section */}
          <div className="flex flex-col md:flex-row gap-6 md:justify-end">
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Business Metrics
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Services
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Contact Support
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Partner with us
            </a>
            <a href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
              Français
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-slate-800 mb-6"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-gray-500 text-sm">
            © 2025 Derby Sports Ecosystem. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

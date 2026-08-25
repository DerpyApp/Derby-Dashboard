import { Link, NavLink } from 'react-router-dom';
import { ROUTES } from '@config/constants';
import { useAuth } from '@features/auth/hooks/useAuth';
import logo from '@/assets/logo.png';

const navigationLinks = [
  { label: 'Home', to: ROUTES.HOME },
  { label: 'Tournaments', to: '/tournaments' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact', to: '/contact' },
  { label: 'About us', to: '/about' },
];

export default function Navbar() {
  const { isAuthenticated, user, token, logout } = useAuth();
  const isLoggedIn = isAuthenticated || Boolean(user || token);
  const displayName = user?.name || user?.fullName || user?.userName || user?.email || 'User';
  const avatarInitial = displayName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-50 border-b border-white/5 bg-[#121417]/95 backdrop-blur-md">
      <nav className="mx-auto flex h-20 w-full max-w-[1400px] items-center justify-between px-4 sm:px-6">
        
        {/* Logo Image */}
        <Link to={ROUTES.HOME} className="flex items-center gap-2">
          <img src={logo} alt="Derby Logo" className="h-8 sm:h-9 w-auto object-contain" />
        </Link>

        {/* Navigation Links with Active/Hover Underline Animation */}
        <div className="hidden items-center gap-8 lg:flex">
          {navigationLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                [
                  'relative py-1.5 text-sm font-semibold transition-colors duration-200',
                  'after:absolute after:bottom-0 after:left-0 after:h-[2.5px] after:w-full after:rounded-full after:transition-transform after:duration-300 after:ease-out',
                  isActive
                    ? 'text-[#a8ff00] after:bg-[#a8ff00] after:scale-x-100'
                    : 'text-gray-300 hover:text-white after:bg-gray-500 after:scale-x-0 hover:after:scale-x-100',
                ].join(' ')
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-5">
          {isLoggedIn ? (
            <>
              <div className="hidden items-center gap-3 sm:flex">
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#a8ff00] text-sm font-bold text-black">
                  {avatarInitial}
                </div>
                <span className="max-w-36 truncate text-sm font-semibold text-white">
                  {displayName}
                </span>
              </div>
              <button
                type="button"
                onClick={logout}
                className="rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white/90 transition-colors hover:border-white/30 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to={ROUTES.LOGIN}
                className="text-sm font-semibold text-white/90 transition-colors hover:text-white"
              >
                Sign in
              </Link>
              <Link
                to={ROUTES.REGISTER}
                className="inline-flex rounded-full bg-[#a8ff00] px-6 py-2.5 text-sm font-bold text-black hover:bg-[#96e600] transition-colors duration-200 shadow-[0_0_15px_rgba(168,255,0,0.15)]"
              >
                Sign up
              </Link>
            </>
          )}
        </div>

      </nav>
    </header>
  );
}

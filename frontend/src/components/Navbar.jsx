import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useAuth } from "../hooks/useAuth";

const navLinkBase =
  "relative block font-semibold text-gray-700 transition-colors duration-200 hover:text-orange-500";

const navLinkActive = "text-orange-600";

const authLinkBase =
  "text-sm font-semibold text-gray-600 transition-colors hover:text-orange-600";

const authLinkActive = "text-orange-600";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Rooms & Amenities", path: "/rooms" },
  { name: "Gallery", path: "/gallery" },
  { name: "Famous Attractions", path: "/famous-attractions" },
  { name: "About", path: "/about" },
  { name: "Reservation", path: "/reservation" },
  { name: "Contact", path: "/contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isAuthenticated, signOut } = useAuth();

  return (
    <nav className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <NavLink
          to="/"
          className="shrink-0 text-lg sm:text-xl font-semibold tracking-wide text-orange-500"
          onClick={() => setMenuOpen(false)}
        >
          LOGO
        </NavLink>

        <ul className="hidden lg:flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `${navLinkBase} ${isActive ? navLinkActive : ""}`
                }
              >
                {item.name}
              </NavLink>
            </li>
          ))}
        </ul>

        <div className="hidden lg:flex items-center gap-3 shrink-0">
          {isAuthenticated ? (
            <button
              type="button"
              onClick={() => signOut()}
              className="text-sm font-semibold text-gray-600 hover:text-orange-600"
            >
              Sign out
            </button>
          ) : (
            <>
              <NavLink
                to="/sign-in"
                className={({ isActive }) =>
                  `${authLinkBase} ${isActive ? authLinkActive : ""}`
                }
              >
                Sign in
              </NavLink>
              <NavLink
                to="/sign-up"
                className={({ isActive }) =>
                  `${authLinkBase} ${isActive ? authLinkActive : ""}`
                }
              >
                Sign up
              </NavLink>
            </>
          )}
          <Link
            to="/booking"
            className="inline-flex rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Booking
          </Link>
        </div>

        <button
          type="button"
          className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-orange-500 transition focus:outline-none focus:ring-2 focus:ring-orange-500"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${
          menuOpen ? "max-h-[520px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col px-4 pb-4 pt-2 gap-1 border-t border-gray-100">
          {navItems.map((item) => (
            <li key={item.name}>
              <NavLink
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  `block py-3 px-3 rounded-md ${navLinkBase} ${isActive ? navLinkActive : ""}`
                }
                onClick={() => setMenuOpen(false)}
              >
                {item.name}
              </NavLink>
            </li>
          ))}
          <li className="border-t border-gray-100 pt-2 mt-1">
            {isAuthenticated ? (
              <button
                type="button"
                className="block w-full text-left py-3 px-3 rounded-md text-sm font-semibold text-gray-600 hover:bg-gray-50 hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500"
                onClick={() => {
                  signOut();
                  setMenuOpen(false);
                }}
              >
                Sign out
              </button>
            ) : (
              <div className="flex flex-col gap-1">
                <NavLink
                  to="/sign-in"
                  className={({ isActive }) =>
                    `block py-3 px-3 rounded-md ${navLinkBase} ${isActive ? navLinkActive : ""}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Sign in
                </NavLink>
                <NavLink
                  to="/sign-up"
                  className={({ isActive }) =>
                    `block py-3 px-3 rounded-md ${navLinkBase} ${isActive ? navLinkActive : ""}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  Sign up
                </NavLink>
              </div>
            )}
          </li>
          <li className="pt-2">
            <Link
              to="/booking"
              className="block w-full rounded-md bg-orange-500 px-5 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              onClick={() => setMenuOpen(false)}
            >
              Booking
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
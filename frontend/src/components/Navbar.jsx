import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const navLinkBase =
  "relative font-semibold text-gray-700 transition-colors duration-200 hover:text-orange-500";

const navLinkActive = "text-orange-600";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Rooms & Amenities", path: "/rooms" },
  { name: "Gallery", path: "/gallery" },
  { name: "Blog", path: "/blog" },
  { name: "About", path: "/about" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-20 bg-white/95 backdrop-blur border-b border-gray-200">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-lg sm:text-xl font-semibold tracking-wide text-orange-500"
          onClick={() => setMenuOpen(false)}
        >
          LOGO
        </NavLink>

        {/* Desktop Nav Links */}
        <ul className="hidden lg:flex items-center gap-8 text-sm">
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
                <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-orange-500 transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Desktop Booking Button */}
        <div className="hidden lg:block">
          <button className="rounded-md bg-orange-500 px-5 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 hover:shadow-md">
            Booking
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          className="lg:hidden p-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-orange-500 transition"
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu panel */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-out ${
          menuOpen ? "max-h-[320px] opacity-100" : "max-h-0 opacity-0"
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
          <li className="pt-2">
            <button className="w-full rounded-md bg-orange-500 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-orange-600">
              Booking
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const { data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/#services" },
    { name: "My Bookings", href: "/my-bookings" },
  ];

  return (
    <div className="navbar bg-base-100 shadow-md sticky top-0 z-50">
      {/* Mobile Menu Button */}
      <div className="navbar-start">
        <div className="dropdown">
          <button
            className="btn btn-ghost lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
          {isMenuOpen && (
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              {navLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* Logo */}
        <Link href="/" className="btn btn-ghost text-xl font-bold text-primary">
          CareNest
        </Link>
      </div>

      {/* Desktop Nav Links */}
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-2">
          {navLinks.map((link) => (
            <li key={link.name}>
              <Link href={link.href} className="font-medium">
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      {/* Auth Buttons */}
      <div className="navbar-end gap-2">
        {session ? (
          <div className="dropdown dropdown-end">
            <button className="btn btn-ghost btn-circle avatar placeholder">
              <div className="bg-primary text-primary-content rounded-full w-10">
                <span>{session.user?.name?.charAt(0) || <User size={20} />}</span>
              </div>
            </button>
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li className="menu-title">
                <span>{session.user?.name}</span>
              </li>
              <li>
                <Link href="/my-bookings">My Bookings</Link>
              </li>
              <li>
                <button onClick={() => signOut()}>
                  <LogOut size={16} />
                  Logout
                </button>
              </li>
            </ul>
          </div>
        ) : (
          <>
            <Link href="/login" className="btn btn-ghost btn-sm">
              Login
            </Link>
            <Link href="/register" className="btn btn-primary btn-sm">
              Register
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;

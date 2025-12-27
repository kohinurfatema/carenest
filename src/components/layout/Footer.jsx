import Link from "next/link";
import { Heart, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="footer footer-center p-10 bg-base-200 text-base-content">
      <nav className="grid grid-flow-col gap-4">
        <Link href="/" className="link link-hover">
          Home
        </Link>
        <Link href="/#services" className="link link-hover">
          Services
        </Link>
        <Link href="/#about" className="link link-hover">
          About Us
        </Link>
        <Link href="/my-bookings" className="link link-hover">
          My Bookings
        </Link>
      </nav>

      <nav>
        <div className="grid grid-flow-col gap-6">
          <div className="flex items-center gap-2">
            <Phone size={18} />
            <span>+880 1234-567890</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail size={18} />
            <span>support@carenest.com</span>
          </div>
        </div>
      </nav>

      <aside>
        <p className="flex items-center gap-1">
          Made with <Heart size={16} className="text-red-500" /> by CareNest Team
        </p>
        <p>Copyright © {new Date().getFullYear()} - All rights reserved</p>
      </aside>
    </footer>
  );
};

export default Footer;

import Icons from "@/components/atoms/Icons";
import { logout } from "@/services/authService";
import Link from "next/link";
import React from "react";

const HeaderItemLg = ({ authStatus, username, isAdmin }) => {
  return (
    <>
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-blue-500">
        E-Commerce
      </Link>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-6">
        <Link href="/" className="hover:text-blue-500 transition-colors">
          Home
        </Link>
        {isAdmin && (
          <Link href="/admin/dashboard" className="hover:text-blue-500 transition-colors">
            Dashboard
          </Link>
        )}
        <Link href="/cart" className="hover:text-blue-500 transition-colors">
          Cart
        </Link>
        <Link href="/order" className="hover:text-blue-500 transition-colors">
          Order
        </Link>
      </nav>

      {/* Profile / Login */}
      {authStatus ? (
        <div className="hidden md:flex space-x-4">
          <Link href={`/profile`} className="hover:bg-blue-800 transition-colors text-white px-4 py-2 rounded-md">
            <Icons.Profile />
          </Link>
          <button onClick={logout} className="hover:bg-red-600 transition-colors text-white px-4 py-2 rounded-md">
            <Icons.Logout />
          </button>
        </div>
      ) : (
        <Link
          href="/login"
          className="hidden md:block hover:bg-blue-800 transition-colors text-white px-4 py-2 rounded-md"
        >
          <div className="flex">
            <Icons.Login /> Login
          </div>
        </Link>
      )}
    </>
  );
};

export default HeaderItemLg;
